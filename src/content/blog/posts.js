import { rows, redirects as slugRedirects } from './posts.generated.js'

/* Published blog posts — the source of /blog and /blog/<slug>/.
 *
 * Posts come from Fasta Blogging (Caitlin's tool): it sends each approved post
 * to the edge function fasta-blog-publish (prometheus-admin), which stores it
 * in Supabase. scripts/fetch-blog-posts.mjs pulls the live ones into
 * posts.generated.js before every build; this file maps them onto the shape
 * the template uses. With no posts, /blog stays noindex and out of the
 * sitemap and nav.
 *
 * Plain data only: vite.config.js and the postbuild script import this file in
 * Node to know which post URLs to prerender and list.
 */

const toPost = (r) => ({
  slug: r.slug,
  title: r.title,
  seo_title: r.meta_title || undefined,
  meta_description: r.meta_description ?? r.excerpt ?? '',
  excerpt: r.excerpt ?? '',
  content_html: r.content_html,
  featured_image: r.featured_image
    ? { src: r.featured_image.src, alt: r.featured_image.alt ?? '', width: r.featured_image.width, height: r.featured_image.height }
    : null,
  author: { name: r.author || 'Prometheus' },
  tags: r.category ? [r.category] : [],
  // The RLS policy only returns live posts; the status is mapped anyway so the
  // template's own live filter keeps working.
  status: r.status === 'publish' ? 'published' : 'draft',
  // The visible "published" date is the day it first went live (spec).
  publish_at: r.first_published_at ?? r.publish_at,
  // updated_at moves on every save, including the one that published the
  // post, so "Updated" only shows for an edit made after it went live.
  updated_at: Date.parse(r.updated_at) - Date.parse(r.first_published_at ?? r.publish_at) > 3_600_000 ? r.updated_at : undefined,
})

export const posts = rows.map(toPost)

/* Old slugs of live posts → current slug. Rendered as redirect pages. */
export const redirects = slugRedirects
