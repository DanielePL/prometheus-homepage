import { useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, ChevronRight, Link2, Mail, Check, Linkedin, Facebook, MessageCircle } from 'lucide-react'
import { HomeNav, HomeFooter } from '../../components/home/HomeChrome'
import { FinalCta } from '../../components/home/Closing'
import NotFound from '../NotFound'
import { findPost, findRedirect, formatDate, postUrl, readingMinutes, relatedPosts, withHeadingIds } from '../../lib/blog'
import { SIGNUP_GYM } from '../../lib/links'

/* /blog/<slug>/ — one article.
 *
 * Built to Caitlin's template brief (Creative SEO Coach, 2026-10-01):
 * breadcrumbs over a large H1, linked author, dates and reading time, featured
 * image, a ~70-character article column, a table of contents that is sticky on
 * desktop and collapsible on mobile, sharing, author bio, related articles and
 * an editable call to action. BlogPosting and BreadcrumbList JSON-LD carry the
 * same facts as the visible page and nothing more.
 */

const SITE = 'https://prometheus.coach'

/* Google's "Add as a preferred source" link. Off until Caitlin confirms that
   prometheus.coach is eligible — Google only honours it for sites it already
   shows in Top Stories, and a button that does nothing looks broken. */
const PREFERRED_SOURCE = false
const PREFERRED_SOURCE_URL = 'https://www.google.com/preferences/source?q=prometheus.coach'

/* Shown when a post brings no call to action of its own. The homepage sells
   the gym product, so the blog does too. */
const DEFAULT_CTA = {
  title: 'One system for the whole gym.',
  body: 'Check-in, reception desk, classes, memberships, point of sale, shifts and books. Every feature in every plan, 30 days to try it, no card.',
  href: SIGNUP_GYM,
  label: 'Try it 30 days, no card',
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = findPost(slug)
  if (!post) {
    const to = findRedirect(slug)
    return to ? <SlugRedirect to={to} /> : <NotFound />
  }

  const url = `${SITE}${postUrl(post.slug)}`
  const { html, toc } = withHeadingIds(post.content_html)
  const minutes = readingMinutes(post.content_html)
  const updated = post.updated_at && Date.parse(post.updated_at) > Date.parse(post.publish_at) ? post.updated_at : null
  const img = post.featured_image
  const ogImage = post.og_image ?? img?.src
  const title = post.seo_title ?? `${post.title} | Prometheus`
  const cta = { ...DEFAULT_CTA, ...post.cta }
  const related = relatedPosts(post)
  const abs = (src) => (src?.startsWith('http') ? src : `${SITE}${src}`)

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        mainEntityOfPage: url,
        headline: post.title,
        description: post.meta_description,
        ...(img && { image: abs(img.src) }),
        datePublished: post.publish_at,
        dateModified: updated ?? post.publish_at,
        author: {
          // Fasta sends a plain name; "Prometheus" is the company, not a person.
          '@type': post.author.name === 'Prometheus' ? 'Organization' : 'Person',
          name: post.author.name,
          ...(post.author.url && { url: post.author.url }),
        },
        publisher: { '@id': `${SITE}/#org` },
        isPartOf: { '@id': `${SITE}/#site` },
        inLanguage: 'en',
        ...(post.tags?.length && { keywords: post.tags.join(', ') }),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog/` },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    ],
  }

  return (
    <>
      <Head>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={post.meta_description} />
        <link rel="canonical" href={url} />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.meta_description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        {ogImage && <meta property="og:image" content={abs(ogImage)} />}
        <meta property="article:published_time" content={post.publish_at} />
        {updated && <meta property="article:modified_time" content={updated} />}
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav />

        <article className="pt-28 lg:pt-36 pb-20 px-5 sm:px-8">
          <header className="max-w-6xl mx-auto">
            {/* Same left edge as the article column below. */}
            <div className="max-w-[70ch] mx-auto lg:mx-0">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
                <li><Link to="/" className="hover:text-ink">Home</Link></li>
                <li aria-hidden="true"><ChevronRight size={14} /></li>
                <li><Link to="/blog/" className="hover:text-ink">Blog</Link></li>
                <li aria-hidden="true"><ChevronRight size={14} /></li>
                <li aria-current="page" className="text-ink/70 line-clamp-1">{post.title}</li>
              </ol>
            </nav>

            <h1 className="mt-6 display text-[2.3rem] leading-[1.05] sm:text-5xl lg:text-[3.5rem]">{post.title}</h1>

            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.95rem] text-muted">
              <a href="#author" className="font-semibold text-ink hover:text-accent-dark">{post.author.name}</a>
              <span aria-hidden="true">·</span>
              <span>Published <time dateTime={post.publish_at}>{formatDate(post.publish_at)}</time></span>
              {updated && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>Updated <time dateTime={updated}>{formatDate(updated)}</time></span>
                </>
              )}
              <span aria-hidden="true">·</span>
              <span>{minutes} min read</span>
            </p>
            </div>
          </header>

          {img && (
            <figure className="mt-10 max-w-6xl mx-auto">
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                fetchPriority="high"
                decoding="async"
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="w-full h-auto rounded-2xl border border-line"
              />
              {img.caption && <figcaption className="mt-3 text-sm text-muted text-center">{img.caption}</figcaption>}
            </figure>
          )}

          <div className="mt-12 max-w-6xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14 justify-center">
            <div className="min-w-0 max-w-[70ch] mx-auto lg:mx-0 w-full">
              {toc.length > 1 && (
                <details className="lg:hidden mb-10 rounded-xl border border-line bg-tint px-5 py-4">
                  <summary className="cursor-pointer font-semibold">On this page</summary>
                  <TocList toc={toc} className="mt-3" />
                </details>
              )}

              <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />

              <ShareBar url={url} title={post.title} />

              {PREFERRED_SOURCE && (
                <a href={PREFERRED_SOURCE_URL} target="_blank" rel="noopener" className="btn btn-secondary mt-6">
                  Add Prometheus as a preferred source on Google
                </a>
              )}

              <AuthorBio author={post.author} />
            </div>

            {toc.length > 1 && (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">On this page</p>
                  <TocList toc={toc} className="mt-4" spy />
                </div>
              </aside>
            )}
          </div>
        </article>

        {related.length > 0 && (
          <section className="px-5 sm:px-8 pb-24">
            <div className="max-w-6xl mx-auto">
              <h2 className="display text-2xl sm:text-3xl">Related articles</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {related.map((p) => <PostCard key={p.slug} post={p} />)}
              </div>
            </div>
          </section>
        )}

        <FinalCta title={cta.title} body={cta.body} href={cta.href} cta={cta.label} />
        <HomeFooter />
      </div>
    </>
  )
}

/* An old slug of a live post. The prerendered file carries an instant meta
   refresh and a canonical to the new URL, which search engines treat like a
   permanent redirect; in the app, Navigate does the same. */
function SlugRedirect({ to }) {
  const url = `${SITE}${postUrl(to)}`
  return (
    <>
      <Head>
        <title>Moved | Prometheus</title>
        <link rel="canonical" href={url} />
        <meta httpEquiv="refresh" content={`0; url=${url}`} />
        <meta name="robots" content="noindex, follow" />
      </Head>
      <Navigate to={postUrl(to)} replace />
      <p className="p-8"><a href={url}>This article has moved.</a></p>
    </>
  )
}

function TocList({ toc, className = '', spy = false }) {
  const [active, setActive] = useState(null)

  /* Desktop only: highlight the section being read — the last heading that
     has scrolled past the nav bar. A scroll listener rather than an
     IntersectionObserver: an observer only fires when a heading crosses its
     band, so long sections left the previous heading highlighted. */
  useEffect(() => {
    if (!spy) return
    const els = toc.map((t) => document.getElementById(t.id)).filter(Boolean)
    /* Measured on every scroll event: a handful of headings, cheaper than it
       sounds, and unlike requestAnimationFrame it also runs in a tab that is
       not in front. */
    const update = () => {
      const passed = els.filter((el) => el.getBoundingClientRect().top < 140)
      setActive(passed.length ? passed[passed.length - 1].id : null)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [toc, spy])

  return (
    <ol className={`space-y-2 text-sm ${className}`}>
      {toc.map((t) => (
        <li key={t.id} className={t.level === 3 ? 'pl-4' : ''}>
          <a
            href={`#${t.id}`}
            className={`block leading-snug transition-colors ${active === t.id ? 'text-accent-dark font-semibold' : 'text-muted hover:text-ink'}`}
          >
            {t.text}
          </a>
        </li>
      ))}
    </ol>
  )
}

function ShareBar({ url, title }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)
  const links = [
    { label: 'Email', icon: Mail, href: `mailto:?subject=${t}&body=${u}` },
    { label: 'LinkedIn', icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'Facebook', icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'WhatsApp', icon: MessageCircle, href: `https://wa.me/?text=${t}%20${u}` },
    { label: 'X', icon: null, href: `https://x.com/intent/post?url=${u}&text=${t}` },
  ]

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* clipboard blocked — the address bar still works */ }
  }

  const pill = 'inline-flex items-center gap-2 h-10 px-4 rounded-full border border-line-strong text-sm font-medium hover:border-ink transition-colors'

  return (
    <div className="mt-14 pt-8 border-t border-line">
      <p className="text-sm font-semibold">Share this article</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={copy} className={pill}>
          {copied ? <Check size={16} /> : <Link2 size={16} />} {copied ? 'Copied' : 'Copy link'}
        </button>
        {links.map(({ label, icon: Icon, href }) => (
          <a key={label} href={href} target={label === 'Email' ? undefined : '_blank'} rel="noopener" className={pill}>
            {Icon ? <Icon size={16} /> : <span aria-hidden="true" className="font-bold">𝕏</span>} {label}
          </a>
        ))}
      </div>
    </div>
  )
}

function AuthorBio({ author }) {
  return (
    <section id="author" className="mt-12 rounded-2xl bg-tint p-6 sm:p-8 flex gap-5 items-start scroll-mt-28">
      {author.image && (
        <img src={author.image} alt={author.name} width="72" height="72" loading="lazy" className="w-[72px] h-[72px] rounded-full object-cover bg-paper shrink-0" />
      )}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Written by</p>
        <p className="mt-1 text-lg font-semibold">{author.name}</p>
        {author.role && <p className="text-sm text-muted">{author.role}</p>}
        {author.bio && <p className="mt-3 text-ink/80 leading-relaxed">{author.bio}</p>}
        {author.url && (
          <a href={author.url} rel="author" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark hover:underline">
            Author profile <ArrowRight size={14} />
          </a>
        )}
      </div>
    </section>
  )
}

export function PostCard({ post }) {
  const img = post.featured_image
  return (
    <Link to={postUrl(post.slug)} className="group block rounded-2xl border border-line overflow-hidden bg-paper hover:border-line-strong transition-colors">
      {img && (
        <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" className="w-full aspect-[16/9] object-cover" />
      )}
      <div className="p-5">
        <p className="text-xs text-muted"><time dateTime={post.publish_at}>{formatDate(post.publish_at)}</time> · {readingMinutes(post.content_html)} min read</p>
        <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-accent-dark transition-colors">{post.title}</h3>
        {post.excerpt && <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">{post.excerpt}</p>}
      </div>
    </Link>
  )
}
