import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { FinalCta } from '../components/home/Closing'
import { SIGNUP_GYM } from '../lib/links'

/* /about/ — who is behind Prometheus.
 *
 * Asked for by the SEO audit (Caitlin, Stage 1, Sept 2026): no page on the site
 * named a person, and the comparison and pricing pages make claims a reader
 * wants to see someone stand behind. The owner decided on 2026-10-02: Daniele
 * as founder, plus the team.
 *
 * This is the one page where the founder appears. The homepage still sells the
 * product without him on purpose (CLAUDE.md, "Kein Gründerkult"): the company
 * must not hang on one person, and a buyer asks who uses it, not who built it.
 *
 * Every sporting fact below is from "Daniele Pauli: Athletic and Coaching
 * Record" (2026-10-02), which cites OpenPowerlifting / OpenIPF, the 2023
 * European Masters results and the press features. Nothing rounded up.
 * The team section waits until names, roles and photos are confirmed.
 */

const URL = 'https://prometheus.coach/about/'
const TITLE = 'About Prometheus: built by a coach | Prometheus'
const DESCRIPTION = 'Prometheus is gym and coaching software from Peakforce OÜ, founded by Daniele Pauli: IPF world champion and strength coach since 2007.'

const RECORD = [
  ['IPF World Classic Powerlifting Champion', '2018, Masters 1, −105 kg, Calgary'],
  ['Swiss all-time powerlifting record', '840 kg total, 2018'],
  ['European Masters Weightlifting Champion', '2023 and 2024'],
  ['Masters World Weightlifting Championships', 'Silver, 2023'],
]

const COACHING = [
  'Strength and conditioning coach since 2007, CSCS-certified since 2008.',
  'Conditioning and strength coach of the ZSC Lions (Swiss National League ice hockey), 2008 to 2012.',
  'Personal conditioning coach of Ronnie Schildknecht, 11-time Ironman winner.',
  'Head of fitness at arena225 Zurich, 2007 to 2010, leading a team of 18.',
]

export default function AboutPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': URL,
        url: URL,
        name: TITLE,
        description: DESCRIPTION,
        isPartOf: { '@id': 'https://prometheus.coach/#site' },
        about: { '@id': 'https://prometheus.coach/#org' },
        inLanguage: 'en',
      },
      {
        '@type': 'Person',
        '@id': `${URL}#daniele`,
        name: 'Daniele Pauli',
        jobTitle: 'Founder',
        worksFor: { '@id': 'https://prometheus.coach/#org' },
        image: 'https://prometheus.coach/images/team/daniele-pauli.png',
        award: RECORD.map(([what, when]) => `${what} (${when})`),
        sameAs: ['https://www.openpowerlifting.org/u/danielepauli'],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://prometheus.coach/' },
          { '@type': 'ListItem', position: 2, name: 'About', item: URL },
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
        <meta property="og:title" content="About Prometheus" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content="https://prometheus.coach/images/og/about.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav />

        <section className="relative pt-32 lg:pt-40 pb-16 px-5 sm:px-8 overflow-hidden">
          <div className="hero-glow absolute inset-x-0 top-0 h-[60vh] pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
            <div className="hero-rise">
              <h1>
                <span className="eyebrow">About Prometheus</span>
                <span className="block display text-[2.6rem] leading-[1.02] sm:text-6xl">
                  Built by a coach{' '}
                  <span className="display-soft">who ran the floor.</span>
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
                Prometheus is software for gyms, studios and coaches: one system from a
                member&apos;s first booking to the books. It is made by Peakforce OÜ and was
                founded by Daniele Pauli, a strength coach since 2007.
              </p>
            </div>
            {/* No Reveal here: above the fold it would hide the photo until the
                bundle has loaded. */}
            <div className="relative hero-rise">
              <img
                src="/images/team/daniele-pauli.png"
                alt="Daniele Pauli, founder of Prometheus"
                width="670"
                height="566"
                className="w-full max-w-md mx-auto rounded-2xl border border-line"
              />
            </div>
          </div>
        </section>

        <Section tone="raised">
          <SectionHeader align="left" eyebrow="Why it exists" title="One system" accent="instead of seven." />
          <Reveal delay={0.06} className="mt-7 max-w-3xl space-y-5 text-lg text-muted leading-relaxed">
            <p>
              A gym usually buys member management, point of sale, payroll, training plans, a
              member app and accounting from different providers. They don&apos;t talk to each
              other, so the same member is typed in several times and the numbers are
              reconciled by hand.
            </p>
            <p>
              Prometheus puts all of it on one shared database. A member exists once and is
              visible at every desk, in every app and at every location their permissions allow.
              The same system runs a coach with a handful of clients and a gym with several sites.
            </p>
          </Reveal>
        </Section>

        <Section>
          <SectionHeader align="left" eyebrow="The founder" title="Daniele Pauli." accent="Athlete and coach." />
          <div className="mt-10 grid lg:grid-cols-2 gap-10 lg:gap-14">
            <Reveal delay={0.04}>
              <h3 className="text-lg font-semibold">On the platform</h3>
              <dl className="mt-4 divide-y divide-line border-y border-line">
                {RECORD.map(([what, when]) => (
                  <div key={what} className="py-4 flex flex-col sm:flex-row sm:justify-between gap-1">
                    <dt className="font-medium">{what}</dt>
                    <dd className="text-muted">{when}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-muted">
                Full competition history on{' '}
                <a href="https://www.openpowerlifting.org/u/danielepauli" className="underline underline-offset-4 hover:text-ink" rel="noopener">OpenPowerlifting</a>.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="text-lg font-semibold">On the coaching side</h3>
              <ul className="mt-4 space-y-3 text-ink/80 leading-relaxed">
                {COACHING.map((c) => (
                  <li key={c} className="flex gap-3">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Section>

        <Section tone="raised">
          <SectionHeader align="left" eyebrow="The company" title="Peakforce OÜ." accent="Registered in Estonia." />
          <Reveal delay={0.06} className="mt-7 max-w-3xl text-lg text-muted leading-relaxed">
            <p>
              Prometheus is developed and operated by Peakforce OÜ, registry code 17389924,
              Tallinn, Estonia. Company details are in the{' '}
              <Link to="/impressum/" className="text-accent-dark underline underline-offset-4">imprint</Link>.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-9 flex flex-col sm:flex-row gap-3">
            <Link to="/contact/" className="btn btn-secondary btn-lg">Contact us</Link>
            <Link to="/pricing/" className="btn btn-secondary btn-lg">See pricing <ArrowRight size={18} /></Link>
          </Reveal>
        </Section>

        <FinalCta
          title="See it in your own gym."
          body="Every feature in every plan. Try it for 30 days, no card."
          href={SIGNUP_GYM}
          cta="Try it 30 days, no card"
        />
        <HomeFooter />
      </div>
    </>
  )
}
