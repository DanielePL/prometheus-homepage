import { readFile, writeFile } from 'node:fs/promises'
import { posts } from '../src/content/blog/posts.js'

/* Adds /blog/ and every live post to dist/sitemap.xml.
 *
 * public/sitemap.xml stays hand-maintained for the fixed pages; posts change
 * with every publish, so they are appended here from the same data the
 * prerender used. Same live rule as src/lib/blog.js isLive(): drafts and posts
 * dated in the future are left out. With no live post, /blog/ is left out too
 * (it is noindex while empty).
 */
const SITE = 'https://prometheus.coach'
const FILE = 'dist/sitemap.xml'

const live = posts
  .filter((p) => p.status === 'published' && Date.parse(p.publish_at) <= Date.now())
  .sort((a, b) => Date.parse(b.publish_at) - Date.parse(a.publish_at))

if (live.length === 0) {
  console.log('[blog] no live posts, sitemap unchanged')
} else {
  const day = (iso) => iso.slice(0, 10)
  const lastmod = (p) => day(p.updated_at && p.updated_at > p.publish_at ? p.updated_at : p.publish_at)
  const urls = [
    `  <url>\n    <loc>${SITE}/blog/</loc>\n    <lastmod>${lastmod(live[0])}</lastmod>\n    <priority>0.7</priority>\n  </url>`,
    ...live.map((p) => `  <url>\n    <loc>${SITE}/blog/${p.slug}/</loc>\n    <lastmod>${lastmod(p)}</lastmod>\n    <priority>0.6</priority>\n  </url>`),
  ]
  const xml = await readFile(FILE, 'utf8')
  await writeFile(FILE, xml.replace('</urlset>', `${urls.join('\n')}\n</urlset>`))
  console.log(`[blog] sitemap: /blog/ + ${live.length} posts`)
}
