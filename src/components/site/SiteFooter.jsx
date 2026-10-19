import { Link } from 'react-router-dom'

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/8 px-5 sm:px-8 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="mb-4">
              <img src="/images/logo-white.png" alt="Prometheus" className="h-8" />
            </div>
            <p className="text-sm text-white/45 max-w-xs leading-relaxed">
              Das geschlossene Software-Ökosystem für Fitness-Unternehmen. Vom Empfangstablet bis zur Zentrale.
            </p>
          </div>

          <FooterCol title="Produkt" links={[
            { label: 'Plattform', href: '#plattform' },
            { label: 'Studio Light', href: '/studios/' },
            { label: 'Ökosystem', href: '#oekosystem' },
            { label: 'Einstieg', href: '#einstieg' },
            { label: 'Branchen', href: '#branchen' },
            { label: 'Preise', href: '#preise' },
          ]} />

          <FooterCol title="Zugang" links={[
            { label: 'Login', href: 'https://enterprise.prometheus.coach', external: true },
            { label: 'Mitglieder-App', href: 'https://play.google.com/store/apps/details?id=prometheus.coach', external: true },
          ]} />

          <div>
            <h4 className="font-semibold text-sm mb-4">Rechtliches</h4>
            <ul className="space-y-2.5">
              <li><Link to="/impressum/" className="text-sm text-white/45 hover:text-white transition-colors">Impressum</Link></li>
              <li><Link to="/privacy/" className="text-sm text-white/45 hover:text-white transition-colors">Datenschutz</Link></li>
              <li><Link to="/terms/" className="text-sm text-white/45 hover:text-white transition-colors">AGB</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-7 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/35">
            © {new Date().getFullYear()} Peakforce GmbH · Zürich · Prometheus
          </p>
          <p className="text-xs text-white/35">Ein Produkt von Peakforce</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-4">{title}</h4>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="text-sm text-white/45 hover:text-white transition-colors">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
