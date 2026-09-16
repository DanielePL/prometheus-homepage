import { useEffect } from 'react'
import { Head } from 'vite-react-ssg'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { HomeFooter, Logo } from '../components/home/HomeChrome'

/* Titles per route. Without these the legal pages inherited whatever the
   template carried; now they say what they are. /goodbye is noindex — it is the
   page you land on after deleting an account, not a search result. */
const META = {
  '/privacy': ['Datenschutzerklärung · Prometheus', 'Wie Prometheus personenbezogene Daten verarbeitet.'],
  '/terms': ['AGB · Prometheus', 'Allgemeine Geschäftsbedingungen für die Nutzung von Prometheus.'],
  '/impressum': ['Impressum · Prometheus', 'Anbieterkennzeichnung der PeakForce OÜ.'],
  '/goodbye': ['Konto gelöscht · Prometheus', ''],
}

export default function LegalLayout() {
  const { pathname } = useLocation()
  const [title, description] = META[pathname] ?? ['Prometheus', '']

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="legal-light min-h-screen bg-paper text-ink font-body">
      <Head>
        <html lang="de" />
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {pathname === '/goodbye' && <meta name="robots" content="noindex" />}
      </Head>

      {/* Simplified Navbar */}
      <nav className="sticky top-0 z-50 nav-solid border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <Outlet />
      </main>

      <HomeFooter />
    </div>
  )
}
