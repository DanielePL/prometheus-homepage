import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ArrowRight, Instagram, Linkedin, Youtube } from 'lucide-react'
import { APP, SIGNUP, SOCIAL } from '../../lib/links'

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

const LINKS = [
  { label: 'What you get', href: '/#included' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'For studios', href: '/studios/' },
  { label: 'For chains', href: '/enterprise/' },
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

export function HomeNav() {
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

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'nav-solid border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          <Link to="/" className="flex items-center" aria-label="Prometheus — home">
            <Logo />
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) =>
              item(l, 'text-sm font-medium text-muted hover:text-ink transition-colors'),
            )}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href={APP} className="btn btn-secondary h-10 px-4 text-sm">
              Log in
            </a>
            <a href={SIGNUP} className="btn btn-primary h-10 px-4 text-sm">
              Start free <ArrowRight size={15} />
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="home-mobile-nav"
            className="lg:hidden p-2 -mr-2 text-ink"
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
          {LINKS.map((l) =>
            item(l, 'block px-4 py-3 text-base text-ink hover:bg-tint rounded-xl transition-colors'),
          )}
          <a href={APP} className="block px-4 py-3 text-base text-ink hover:bg-tint rounded-xl">
            Log in
          </a>
          <a href={SIGNUP} className="btn btn-primary w-full mt-3">
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
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr] gap-10">
          <div>
            <Logo dark className="mb-4" />
            <p className="text-sm text-white/55 max-w-xs leading-relaxed">
              Coaching software that covers the whole job — programming, nutrition,
              feedback, calls and payments in one account.
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

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/#included" className="text-white/55 hover:text-white transition-colors">What you get</a></li>
              <li><a href="/#pricing" className="text-white/55 hover:text-white transition-colors">Pricing</a></li>
              <li><Link to="/studios/" className="text-white/55 hover:text-white transition-colors">For studios</Link></li>
              <li><Link to="/enterprise/" className="text-white/55 hover:text-white transition-colors">For chains — pilot programme</Link></li>
              <li><Link to="/trainerize-alternative/" className="text-white/55 hover:text-white transition-colors">Switching from Trainerize</Link></li>
              <li><a href={APP} className="text-white/55 hover:text-white transition-colors">Log in</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-4 text-white">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/impressum/" className="text-white/55 hover:text-white transition-colors">Imprint</Link></li>
              <li><Link to="/privacy/" className="text-white/55 hover:text-white transition-colors">Privacy</Link></li>
              <li><Link to="/terms/" className="text-white/55 hover:text-white transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} PeakForce OÜ · Prometheus</p>
          <p className="text-xs text-white/40">Built by Peakforce Solutions</p>
        </div>
      </div>
    </footer>
  )
}
