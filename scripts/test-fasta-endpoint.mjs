// Acceptance checks for the Fasta Blogging publish endpoint
// (docs/fasta-blog-endpoint.md, section "Acceptance checks").
//
//   node scripts/test-fasta-endpoint.mjs          endpoint + database checks
//   node scripts/test-fasta-endpoint.mjs --live   also the published pages (after a rebuild)
//
// Needs the token in ~/.prometheus-fasta-token and VITE_SUPABASE_URL /
// VITE_SUPABASE_ANON_KEY in the environment (the anon key sees only live
// posts, exactly like the site build). Test posts are titled "[QA] …" with
// slugs "qa-…"; they stay in blog_posts and must be soft-deleted afterwards
// (is_deleted = true) — nothing is ever hard-deleted.
import { readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { randomUUID } from 'node:crypto'

const ENDPOINT = 'https://zzluhirmmnkfkifriult.supabase.co/functions/v1/fasta-blog-publish'
const TOKEN = readFileSync(`${homedir()}/.prometheus-fasta-token`, 'utf8').trim()
const SB = process.env.VITE_SUPABASE_URL
const ANON = process.env.VITE_SUPABASE_ANON_KEY
const LIVE = process.argv.includes('--live')
const IMG = 'https://prometheus.coach/images/gym/front-desk.webp'

let failed = 0
const check = (name, ok, extra = '') => {
  console.log(`${ok ? '✓' : '✗'} ${name}${extra ? `  (${extra})` : ''}`)
  if (!ok) failed++
}

const post = async (body, token = TOKEN) => {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'FastaBlogging-Publisher/1', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  })
  return { status: res.status, body: await res.json().catch(() => null) }
}

const anonRead = async (externalId) => {
  const res = await fetch(`${SB}/rest/v1/blog_posts?external_id=eq.${externalId}&select=*`, { headers: { apikey: ANON, Authorization: `Bearer ${ANON}` } })
  return (await res.json())[0] ?? null
}

const stamp = Date.now().toString(36)
const make = (over = {}) => ({
  external_id: randomUUID(),
  version: 1,
  status: 'draft',
  publish_at: new Date(Date.now() - 60_000).toISOString(),
  title: `[QA] Endpoint test ${stamp}`,
  slug: `qa-endpoint-test-${stamp}`,
  meta_title: '[QA] Endpoint test | Prometheus',
  meta_description: 'Test post for the Fasta publishing endpoint.',
  excerpt: 'Test post.',
  content_html: `<p>Opening paragraph.</p><h2>A heading</h2><p>Text with <a href="https://prometheus.coach/" onclick="x()">a link</a>.</p><script>alert(1)</script><figure><img src="${IMG}" alt="Front desk" width="1696" height="960" onerror="x()"><figcaption>Caption</figcaption></figure>`,
  content_markdown: 'Opening paragraph.\n\n## A heading',
  featured_image: { url: IMG, alt: 'Front desk of a gym', filename: `qa-${stamp}.webp`, width: 1696, height: 960 },
  images: [{ url: IMG, alt: 'Front desk', caption: 'Caption', filename: `qa-${stamp}.webp`, width: 1696, height: 960 }],
  author: 'Prometheus',
  category: 'QA',
  focus_keyword: 'qa',
  ...over,
})

// 1. Auth
check('no token → 401', (await post(make(), null)).status === 401)
check('wrong token → 401', (await post(make(), 'nope')).status === 401)

// 2. Draft is saved but invisible
const a = make()
const r1 = await post(a)
check('draft saved', [200, 201].includes(r1.status) && r1.body?.status === 'draft', `${r1.status} ${JSON.stringify(r1.body)}`)
check('draft not visible to the site', (await anonRead(a.external_id)) === null)

// 3. Same post as publish, past date → live at the returned url
const r2 = await post({ ...a, status: 'publish' })
check('publish → live', r2.status === 200 && r2.body?.status === 'published' && r2.body?.id === r1.body?.id, `${r2.status} ${JSON.stringify(r2.body)}`)
const live1 = await anonRead(a.external_id)
check('live post visible to the site', !!live1)
check('url is /blog/<slug>/', r2.body?.url === `https://prometheus.coach/blog/${a.slug}/`)

// Images on our storage, HTML sanitised
const ours = (src) => typeof src === 'string' && src.startsWith(`${SB}/storage/v1/object/public/blog-images/`)
check('featured image on our storage', ours(live1?.featured_image?.src), live1?.featured_image?.src)
const imgSrcs = [...(live1?.content_html ?? '').matchAll(/<img[^>]*src="([^"]+)"/g)].map((m) => m[1])
check('body images on our storage', imgSrcs.length > 0 && imgSrcs.every(ours), imgSrcs.join(', '))
check('alt text kept', /alt="Front desk"/.test(live1?.content_html ?? ''))
check('script / event handlers stripped', !/<script|onclick|onerror/i.test(live1?.content_html ?? ''))

// 4. Edit: version + 1 updates the same page, keeps url, id and first date
const r3 = await post({ ...a, status: 'publish', version: 2, title: `${a.title} (edited)`, publish_at: new Date().toISOString() })
const live2 = await anonRead(a.external_id)
check('edit keeps id and url', r3.body?.id === r1.body?.id && r3.body?.url === r2.body?.url)
check('edit changes the title', live2?.title === `${a.title} (edited)`)
check('edit keeps the original publish date', live2?.first_published_at === live1?.first_published_at && live2?.publish_at === live1?.publish_at)

// 5. Older version changes nothing
await post({ ...a, status: 'publish', version: 1, title: 'SHOULD NOT APPEAR' })
check('older version ignored', (await anonRead(a.external_id))?.title === `${a.title} (edited)`)

// 6. Future post stays hidden
const f = make({ status: 'publish', slug: `qa-future-${stamp}`, publish_at: new Date(Date.now() + 86_400_000 * 365).toISOString() })
const r4 = await post(f)
check('future post → scheduled', r4.body?.status === 'scheduled', JSON.stringify(r4.body))
check('future post not visible to the site', (await anonRead(f.external_id)) === null)

// 7. Slug clash
const r5 = await post(make({ slug: a.slug }))
check('slug of another post → 409', r5.status === 409, JSON.stringify(r5.body))

// 8. Bad payload
check('invalid payload → 422', (await post({ ...make(), slug: 'Not A Slug' })).status === 422)

// 9. Pages (after the site has been rebuilt)
if (LIVE) {
  const page = await fetch(`https://prometheus.coach/blog/${a.slug}/`)
  const html = await page.text()
  check('post page 200', page.status === 200)
  check('page source has title, description, canonical, JSON-LD',
    html.includes('(edited)') && html.includes('name="description"') && html.includes(`rel="canonical" href="https://prometheus.coach/blog/${a.slug}/"`) && html.includes('BlogPosting'))
  check('unknown slug → 404', (await fetch(`https://prometheus.coach/blog/qa-does-not-exist-${stamp}/`)).status === 404)
}

console.log(`\nTest posts: ${a.external_id}, ${f.external_id} — soft-delete them afterwards.`)
console.log(failed ? `${failed} check(s) failed` : 'All checks passed')
process.exit(failed ? 1 : 0)
