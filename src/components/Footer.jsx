import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Instagram, Linkedin, Youtube, Twitter } from 'lucide-react'

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Science', href: '#lab' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Technology', href: '#technology' },
  { label: 'Team', href: '#team' },
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'Free Trial', href: '#trial' },
]

const socials = [
  { icon: Instagram, href: 'https://www.instagram.com/prometheuscoach/', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'X' },
]

const legal = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Impressum', to: '/impressum' },
]

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (e, href) => {
    e.preventDefault()
    if (location.pathname === '/') {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/' + href)
    }
  }

  return (
    <footer className="border-t border-dark-border bg-dark-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/images/logo-white.png" alt="Prometheus" className="h-7" />
            </div>
            <p className="text-sm text-[#999] mb-6 max-w-sm">
              Where Science Meets Strength. AI-powered fitness and health ecosystem built by
              scientists and world-class athletes.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 bg-dark-card border border-dark-border rounded-lg flex items-center justify-center text-[#999] hover:text-accent hover:border-accent/30 transition-all"
                >
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-sm text-[#999] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
            <a
              href="mailto:hello@prometheus.coach"
              className="text-sm text-[#999] hover:text-accent transition-colors"
            >
              hello@prometheus.coach
            </a>

            <h4 className="text-sm font-semibold text-white mt-8 mb-4">Legal</h4>
            <ul className="space-y-2">
              {legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-[#999] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">
              © 2026 Peakforce GmbH — Zollikon, Switzerland | Prometheus
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-dark-card border border-dark-border rounded-full">
                <span className="text-xs">🇪🇺</span>
                <span className="text-[10px] text-[#999] font-medium">GDPR Compliant</span>
              </div>
              <span className="text-xs">🇨🇭</span>
              <span className="text-xs">🇪🇪</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
