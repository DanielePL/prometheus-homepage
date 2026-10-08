import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowRight, Instagram, Linkedin, Youtube } from 'lucide-react'
import { APP, SIGNUP, SOCIAL, GYM_APP } from '../../lib/links'
import { livePostCount } from '../../content/blog/meta.generated.js'

const SOCIAL_ICON = { Instagram, LinkedIn: Linkedin, YouTube: Youtube }

/* Navigation and footer for the English pages — the homepage, /studios and
 * the switching page.
 *
 * SiteNav/SiteFooter still exist and are still German. They belong to the old
 * enterprise-first page: their links are its scroll anchors (#plattform,
 * #einstieg) and their CTA opens the demo modal. This site sells a product a
 * coach can buy without talking to anyone, so the primary action is the trial,
 * not a booked call.
 */

/* Gym product first (owner, 2026-10-04): the homepage is the gym product, and
   gym owners arriving by recommendation must see it before anything else.
   These are the links of every other page; the homepage passes its own. */
const LINKS = [
  { label: 'For gyms', href: '/' },
  { label: 'For studios', href: '/studios/' },
  { label: 'For coaches', href: '/coach/' },
  { label: 'Pricing', href: '/pricing/' },
]

/* Both logo PNGs carry a white wordmark, which vanishes on a white page. The
   wordmark is therefore set as text next to the flame; `dark` flips it to
   white for the night footer. */
export function Logo({ dark = false, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img src="/images/flame.png" alt="" aria-hidden="true" width="500" height="500" className="h-7 w-7" />
      <span className={`font-semibold tracking-tight text-[1.05rem] ${dark ? 'text-white' : 'text-ink'}`}>
        Prometheus
      </span>
    </span>
  )
}

/* `overDark`: the page opens on a full-bleed photograph (homepage, /studios,
   /enterprise). Until the visitor scrolls, the bar is transparent and its type
   white so it sits on the picture; once scrolled it turns into the white bar.
   The mobile panel is always the white panel.
   `links`, `login`, `signup`: the homepage sells the gym product, so its bar
   logs in to and signs up for the gym app, not the coach app. */
export function HomeNav({ overDark = false, links = LINKS, login = APP, signup = SIGNUP }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Plain <a> for the hash links rather than react-router's <Link>: they have to
     work both as an in-page jump on the homepage and as a cross-page jump from
     /studios, and a full navigation does both without a scroll-restoration
     dance. */
  const item = (l, cls) =>
    l.href.startsWith('/#') ? (
      <a key={l.href} href={l.href} className={cls} onClick={() => setOpen(false)}>{l.label}</a>
    ) : (
      <Link key={l.href} to={l.href} className={cls} onClick={() => setOpen(false)}>{l.label}</Link>
    )

  const onPhoto = overDark && !scrolled && !open

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'nav-solid border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          <Link to="/" className="flex items-center" aria-label="Prometheus — home">
            <Logo dark={onPhoto} />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) =>
              item(l, `text-sm font-medium transition-colors ${
                onPhoto ? 'text-white/75 hover:text-white' : 'text-muted hover:text-ink'
              }`),
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href={login} className={`btn h-10 px-4 text-sm ${onPhoto ? 'btn-ghost-light' : 'btn-secondary'}`}>
              Log in
            </a>
            <a href={signup} className="btn btn-primary h-10 px-4 text-sm">
              Start free <ArrowRight size={15} />
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="home-mobile-nav"
            className={`lg:hidden p-2 -mr-2 ${onPhoto ? 'text-white' : 'text-ink'}`}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        id="home-mobile-nav"
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-[calc(100dvh_-_4rem)]' : 'max-h-0'
        }`}
      >
        <div className="nav-panel border-t border-line px-5 py-4 space-y-1">
          {links.map((l) =>
            item(l, 'block px-4 py-3 text-base text-ink hover:bg-tint rounded-xl transition-colors'),
          )}
          <a href={login} className="block px-4 py-3 text-base text-ink hover:bg-tint rounded-xl">
            Log in
          </a>
          <a href={signup} className="btn btn-primary w-full mt-3">
            Start free <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </nav>
  )
}

/* The footer sits inside the dark closing block, so it is always on night. */
export function HomeFooter() {
  return (
    <footer className="section-night border-t border-white/10 px-5 sm:px-8 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Every indexable page is linked from here at least once (2026-10-08):
            the SEO package added the coach front door, three switching pages
            and the trust pages, and a page nothing links to is hard to find. */}
        <div className="grid sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-10">
          <div className="sm:col-span-2 md:col-span-1">
            <Logo dark className="mb-4" />
            <p className="text-sm text-white/55 max-w-xs leading-relaxed">
              Software for gyms, studios and coaches: members, classes, payments,
              programming and the books in one system.
            </p>
            <ul className="mt-5 flex items-center gap-2">
              {SOCIAL.map((s) => {
                const Icon = SOCIAL_ICON[s.name]
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener"
                      aria-label={`Prometheus on ${s.name}`}
                      className="w-9 h-9 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/50 flex items-center justify-center transition-colors"
                    >
                      {Icon ? <Icon size={16} /> : s.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <FooterColumn title="For gyms" links={[
            { to: '/', label: 'Gym software' },
            { to: '/studios/', label: 'Studio software' },
            { to: '/pricing/', label: 'Pricing' },
            { href: GYM_APP, label: 'Gym log in' },
          ]} />

          <FooterColumn title="For coaches" links={[
            { to: '/online-coaching-software/', label: 'Online coaching software' },
            { to: '/coach/', label: 'Coach software' },
            { to: '/nutrition/', label: 'Nutrition coaching' },
            { to: '/video-review/', label: 'Video review & check-ins' },
            { to: '/payments/', label: 'Invoicing & payments' },
            { to: '/sales-assistant/', label: 'Sales assistant' },
            { href: APP, label: 'Coach log in' },
          ]} />

          <FooterColumn title="Switching" links={[
            { to: '/mindbody-alternative/', label: 'From Mindbody' },
            { to: '/trainerize-alternative/', label: 'From Trainerize' },
            { to: '/everfit-alternative/', label: 'From Everfit' },
            { to: '/truecoach-alternative/', label: 'From TrueCoach' },
          ]} />

          <FooterColumn title="Company" links={[
            { to: '/about/', label: 'About' },
            { to: '/contact/', label: 'Contact' },
            { to: '/faq/', label: 'FAQ' },
            // The blog joins the footer with its first live post (spec: a link
            // to /blog in the nav or footer); until then it is noindex.
            ...(livePostCount > 0 ? [{ to: '/blog/', label: 'Blog' }] : []),
            { to: '/impressum/', label: 'Imprint' },
            { to: '/privacy/', label: 'Privacy' },
            { to: '/terms/', label: 'Terms' },
          ]} />
        </div>

        <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} PeakForce OÜ · Prometheus</p>
          <p className="text-xs text-white/40">Built by Peakforce Solutions</p>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, links }) {
  const cls = 'text-white/55 hover:text-white transition-colors'
  return (
    <div>
      <h4 className="font-semibold text-sm mb-4 text-white">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            {l.to ? <Link to={l.to} className={cls}>{l.label}</Link> : <a href={l.href} className={cls}>{l.label}</a>}
          </li>
        ))}
      </ul>
    </div>
  )
}
