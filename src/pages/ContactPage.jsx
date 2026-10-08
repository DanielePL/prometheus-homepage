import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { Mail, LogIn, Building2, ArrowRight } from 'lucide-react'
import { Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { APP, CONTACT, GYM_APP, SIGNUP, SIGNUP_GYM } from '../lib/links'

/* /contact/ — how to reach us, in one screen.
 *
 * Part of the SEO package's trust pages (Caitlin, Stage 1). A buyer who has
 * read a comparison page wants to know there is a company and a person on the
 * other end before starting a trial. One address that is actually read
 * (management@, the same as CONTACT everywhere else), the company details,
 * and the two logins for people who are already customers.
 *
 * No contact form: it would need a backend and a spam filter, and a mail link
 * reaches the same inbox without either.
 */

const URL = 'https://prometheus.coach/contact/'
const TITLE = 'Contact Prometheus | Gym and coaching software'
const DESCRIPTION = 'Questions about Prometheus for your gym, studio or coaching business? Write to us directly. Company details and customer logins.'

const mail = (subject) => `${CONTACT}?subject=${encodeURIComponent(subject)}`

const CARDS = [
  {
    icon: Building2,
    title: 'For your gym or studio',
    body: 'Several sites, a migration from another system, or a question before you start: tell us about your gym and we reply by email.',
    cta: 'Write about my gym',
    href: mail('Prometheus for my gym'),
  },
  {
    icon: Mail,
    title: 'For coaches',
    body: 'Most coaches start the 14-day trial and set up one client. If something is unclear before or during the trial, write to us.',
    cta: 'Write as a coach',
    href: mail('Prometheus for my coaching business'),
  },
]

export default function ContactPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
        '@id': URL,
        url: URL,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { '@id': 'https://prometheus.coach/#site' },
        about: { '@id': 'https://prometheus.coach/#org' },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://prometheus.coach/' },
          { '@type': 'ListItem', position: 2, name: 'Contact', item: URL },
        ],
      },
    ],
  }

  return (
    <>
      <Head>
        <html lang="en" />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Contact Prometheus" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content="https://prometheus.coach/images/og/contact.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav />

        <section className="relative pt-32 lg:pt-40 pb-24 px-5 sm:px-8 overflow-hidden">
          <div className="hero-glow absolute inset-x-0 top-0 h-[60vh] pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-5xl mx-auto">
            <div className="max-w-3xl hero-rise">
              <h1>
                <span className="eyebrow">Contact</span>
                <span className="block display text-[2.6rem] leading-[1.02] sm:text-6xl">
                  Write to us.{' '}
                  <span className="display-soft">A person answers.</span>
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed">
                One address for everything:{' '}
                <a href={CONTACT} className="text-ink font-semibold underline underline-offset-4">management@prometheus.coach</a>.
              </p>
            </div>

            <div className="mt-14 grid md:grid-cols-2 gap-5">
              {CARDS.map(({ icon: Icon, title, body, cta, href }, i) => (
                <Reveal key={title} delay={0.04 * i} className="rounded-2xl border border-line p-7 flex flex-col">
                  <span className="w-10 h-10 rounded-xl bg-accent/12 text-accent-dark flex items-center justify-center"><Icon size={20} /></span>
                  <h2 className="mt-5 text-xl font-semibold tracking-tight">{title}</h2>
                  <p className="mt-2 text-muted leading-relaxed flex-1">{body}</p>
                  <a href={href} className="btn btn-secondary mt-6 self-start">{cta} <ArrowRight size={16} /></a>
                </Reveal>
              ))}
            </div>

            <div className="mt-5 grid md:grid-cols-2 gap-5">
              <Reveal delay={0.08} className="rounded-2xl bg-tint p-7">
                <span className="w-10 h-10 rounded-xl bg-paper text-ink flex items-center justify-center"><LogIn size={20} /></span>
                <h2 className="mt-5 text-xl font-semibold tracking-tight">Already a customer?</h2>
                <ul className="mt-3 space-y-2 text-muted">
                  <li><a href={GYM_APP} className="underline underline-offset-4 hover:text-ink">Log in to the gym app</a></li>
                  <li><a href={APP} className="underline underline-offset-4 hover:text-ink">Log in to the coach and studio app</a></li>
                </ul>
              </Reveal>
              <Reveal delay={0.12} className="rounded-2xl bg-tint p-7">
                <h2 className="text-xl font-semibold tracking-tight">Company</h2>
                <address className="mt-3 not-italic text-muted leading-relaxed">
                  Peakforce OÜ<br />
                  Sepapaja tn 6, 15551 Tallinn, Estonia<br />
                  Registry code 17389924
                </address>
                <p className="mt-3 text-sm text-muted">
                  More in the <Link to="/impressum/" className="underline underline-offset-4 hover:text-ink">imprint</Link> and on the{' '}
                  <Link to="/about/" className="underline underline-offset-4 hover:text-ink">about page</Link>.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="mt-12 flex flex-col sm:flex-row gap-3">
              <a href={SIGNUP_GYM} className="btn btn-primary btn-lg">Try it in your gym, 30 days <ArrowRight size={18} /></a>
              <a href={SIGNUP} className="btn btn-secondary btn-lg">Start as a coach, 14 days</a>
            </Reveal>
          </div>
        </section>

        <HomeFooter />
      </div>
    </>
  )
}
