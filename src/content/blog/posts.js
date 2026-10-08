/* Published blog posts — the source of /blog and /blog/<slug>/.
 *
 * Empty on purpose (2026-10-08). The posts will come from Fasta Blogging
 * (Caitlin's tool): it sends each approved post to a publish endpoint, which
 * stores it; the build then reads the stored posts instead of this array. That
 * endpoint is not built yet — its spec (docs/fasta-blog-endpoint.md) is still
 * with Caitlin. Until then /blog renders, is noindex and is in no nav, no
 * sitemap: a blog page with nothing on it should not be found.
 *
 * Plain data only, no imports: vite.config.js and the postbuild script read
 * this file in Node to know which post URLs to prerender and list.
 *
 * Shape of a post (field names follow Fasta's naming so the endpoint can map
 * one to one):
 * {
 *   slug, title, seo_title?, meta_description, excerpt,
 *   content_html,                       // sanitised by the endpoint
 *   featured_image: { src, alt, width, height, caption? },
 *   og_image?,                          // 1200×630, falls back to featured_image
 *   author: { name, role?, bio?, image?, url? },
 *   tags: [],
 *   status: 'published' | 'draft',
 *   publish_at,                         // ISO; a future date keeps the post hidden
 *   updated_at?,                        // ISO; shown only when after publish_at
 *   cta?: { title, body, href, label }, // editable call to action below the article
 * }
 */
export const posts = []
