import { posts as published } from '../content/blog/posts.js'
import { samplePosts } from '../content/blog/samples.js'

/* Blog helpers: which posts are live, the table of contents, reading time.
 *
 * Everything here has to give the same answer in Node (prerender) and in the
 * browser (hydration), so no DOM APIs and dates are formatted in UTC.
 */

/* The sample article exists to test the template on a long post. It only
   enters the dev server: import.meta.env.DEV is replaced by `false` in the
   production build, so the sample is tree-shaken out of the bundle. */
const all = import.meta.env.DEV ? [...published, ...samplePosts] : published

/* A post is live when it is published and its publish date has passed. This
   is a filter at render time, not a scheduler: on a static site "render time"
   is the build, so a post dated in the future appears with the first deploy
   after that date. */
export function isLive(post, now = Date.now()) {
  return post.status === 'published' && Date.parse(post.publish_at) <= now
}

export function livePosts() {
  return all
    .filter((p) => isLive(p))
    .sort((a, b) => Date.parse(b.publish_at) - Date.parse(a.publish_at))
}

export function findPost(slug) {
  return livePosts().find((p) => p.slug === slug)
}

export const postUrl = (slug) => `/blog/${slug}/`

const stripTags = (html) => html.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()

const decode = (s) => s
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;/g, "'")

const slugify = (s) => s.toLowerCase()
  .normalize('NFKD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'

/* Gives every h2/h3 an id (keeping one the author set) and returns the
   headings for the table of contents. Done on the HTML string rather than the
   DOM so the prerendered page already carries the anchors. */
export function withHeadingIds(html) {
  const toc = []
  const used = new Set()
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_, level, attrs, inner) => {
    const text = decode(stripTags(inner))
    const existing = attrs.match(/\sid=["']([^"']+)["']/i)
    let id = existing ? existing[1] : slugify(text)
    if (!existing) {
      let n = 2
      const base = id
      while (used.has(id)) id = `${base}-${n++}`
    }
    used.add(id)
    toc.push({ level: Number(level), id, text })
    const nextAttrs = existing ? attrs : `${attrs} id="${id}"`
    return `<h${level}${nextAttrs}>${inner}</h${level}>`
  })
  return { html: out, toc }
}

/* 230 words a minute, the usual figure for screen reading. */
export function readingMinutes(html) {
  const words = stripTags(html).split(' ').filter(Boolean).length
  return Math.max(1, Math.ceil(words / 230))
}

const DATE = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
export const formatDate = (iso) => DATE.format(new Date(iso))

/* Shared tags first, then the most recent. */
export function relatedPosts(post, n = 3) {
  const tags = new Set(post.tags ?? [])
  return livePosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: (p.tags ?? []).filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.score - a.score || Date.parse(b.p.publish_at) - Date.parse(a.p.publish_at))
    .slice(0, n)
    .map(({ p }) => p)
}
