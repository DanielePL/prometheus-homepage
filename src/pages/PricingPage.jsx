import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { FinalCta } from '../components/home/Closing'
import { SIGNUP, SIGNUP_STUDIO } from '../lib/links'

/* /pricing/ — the whole ladder, on the marketing domain.
 *
 * The homepage shows four rungs and links to the app's pricing page for the
 * rest. That page sits behind app.prometheus.coach and is not prerendered, so
 * "personal trainer software pricing" had no page on this domain that a
 * crawler could read. This one exists to be that page: every rung, the yearly
 * price, Studio Light, what is in every plan, and the questions people ask
 * before paying.
 *
 * Source of truth: prometheus_coach/webapp/src/integrations/stripe/config.ts,
 * PRICING_PLANS, read on 2026-09-23. Ten coach rungs at 5–70 clients, USD,
 * yearly = 10 × monthly, Studio Light $79 flat, 14-day trial (TRIAL_CONFIG).
 * If the ladder changes there, it changes here — never the other way round.
 *
 * What is deliberately not here: "1,400+ exercises" (the library's video
 * coverage was partial on the date the config was read; a number the database
 * does not back is not a number we print), any competitor, anything free.
 */

const LADDER = [
  [5, 19], [10, 29], [15, 35], [20, 39], [25, 45],
  [30, 49], [40, 59], [50, 69], [60, 79], [70, 89],
]
const POPULAR = 15
const STUDIO = 79

/* Same order as the product's own pricing card, which the owner set on
   2026-08-15: nutrition high, VBT low. */
const INCLUDED = [
  'Programme and workout builder, periodisation, season and competition planning',
  'Exercise library with video demonstrations',
  'Nutrition plans, macro targets, meal-photo logging and your own food library',
  'Video review with annotations, check-ins and messaging',
  'Video calls, built in',
  'Invoices, quotes, subscriptions and recurring billing',
  'Calendar and scheduling',
  'Progress tracking and questionnaires',
  'The assistant: follows up on enquiries and flags clients who are drifting',
  'Bar-speed tracking with the phone camera (VBT)',
  'The client app on iPhone and Android, free for every client',
]

const FAQ = [
  {
    q: 'What happens when I reach my client limit?',
    a: 'You move to the next rung. There are ten sizes between 5 and 70 clients, so the step up is small, and you can move down again when a client leaves.',
  },
  {
    q: 'Is anything locked behind a higher plan?',
    a: 'No. Every feature is in every plan. The only thing that changes with the price is how many clients you can coach.',
  },
  {
    q: 'How does the yearly price work?',
    a: 'A year costs ten months: pay for twelve months up front and two of them are free. The yearly price of each rung is exactly ten times the monthly one.',
  },
  {
    q: 'What does the trial include?',
    a: 'Fourteen days of the full product, no card required. When the trial ends you choose a rung; nothing is charged before you do.',
  },
  {
    q: 'Do my clients pay anything?',
    a: 'No. The client app is free for every client you coach, on iPhone and Android, for as long as you coach them.',
  },
  {
    q: 'What currency are the prices in?',
    a: 'US dollars, the same everywhere. Your bank converts at its own rate if your account is in another currency.',
  },
]

const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://prometheus.coach/#app',
      name: 'Prometheus Coach',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      url: 'https://prometheus.coach/pricing/',
      offers: [
        ...LADDER.map(([clients, price]) => ({
          '@type': 'Offer',
          name: `Coach ${clients} — up to ${clients} clients`,
          price: String(price),
          priceCurrency: 'USD',
          url: 'https://prometheus.coach/pricing/',
        })),
        {
          '@type': 'Offer',
          name: 'Studio Light — one location',
          price: String(STUDIO),
          priceCurrency: 'USD',
          url: 'https://prometheus.coach/studios/',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

export default function PricingPage() {
  return (
    <>
      <Head>
        <html lang="en" />
        <title>Personal trainer software pricing — from $19 a month | Prometheus</title>
        <meta
          name="description"
          content="Ten plans from $19 to $89 a month, priced by how many clients you coach. Every feature in every plan, client app free. Studio Light $79. 14-day trial, no card."
        />
        <link rel="canonical" href="https://prometheus.coach/pricing/" />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Personal trainer software pricing — from $19 a month" />
        <meta
          property="og:description"
          content="Ten plans from $19 to $89 a month by client count. Every feature in every plan. Studio Light $79. 14-day trial, no card."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prometheus.coach/pricing/" />
        <meta property="og:image" content="https://prometheus.coach/images/og/pricing.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(LD)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav />

        <section className="relative pt-32 lg:pt-40 pb-6 px-5 sm:px-8 overflow-hidden">
          <div className="hero-glow absolute inset-x-0 top-0 h-[60vh] pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-3xl mx-auto text-center hero-rise">
            <h1>
              <span className="eyebrow">Personal trainer software pricing</span>
              <span className="block display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
                From $19 a month.{' '}
                <span className="display-soft">Every feature, every plan.</span>
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              You pay for how many clients you coach, not for which parts of the product
              you are allowed to open. Ten sizes, so the next step is always a small one.
            </p>
          </div>
        </section>

        {/* ── The ladder ─────────────────────────────────────────────────── */}
        <Section className="pt-6 lg:pt-8">
          <Reveal className="card rounded-3xl overflow-hidden">
            <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1.4fr_1fr_1fr_auto] items-center gap-x-4 px-5 sm:px-8 py-4 text-xs font-medium uppercase tracking-wider text-muted border-b border-line">
              <span>Clients</span>
              <span className="text-right">Monthly</span>
              <span className="text-right hidden sm:block">Yearly</span>
              <span className="w-24 sm:w-28" />
            </div>
            {LADDER.map(([clients, price]) => {
              const popular = clients === POPULAR
              return (
                <div
                  key={clients}
                  className={`grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1.4fr_1fr_1fr_auto] items-center gap-x-4 px-5 sm:px-8 py-4 border-b border-line last:border-b-0 ${
                    popular ? 'bg-tint' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold tracking-tight">up to {clients} clients</span>
                    {popular && (
                      <span className="hidden sm:inline text-[0.6875rem] font-semibold uppercase tracking-wider text-accent-dark">
                        Most common
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-semibold tracking-tight">${price}</span>
                    <span className="text-sm text-muted"> /mo</span>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-lg font-medium tracking-tight">${price * 10}</span>
                    <span className="text-sm text-muted"> /yr</span>
                  </div>
                  <a
                    href={SIGNUP}
                    className={`btn text-sm h-10 w-24 sm:w-28 ${popular ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    Start free
                  </a>
                </div>
              )
            })}
          </Reveal>
          <Reveal delay={0.06} className="mt-4 text-sm text-muted leading-relaxed">
            Prices in US dollars. Yearly is ten months for twelve. Fourteen-day trial on
            every plan, no card, nothing charged until you choose.
          </Reveal>
        </Section>

        {/* ── Studio Light ───────────────────────────────────────────────── */}
        <Section tone="raised">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">
            <SectionHeader
              align="left"
              eyebrow="One location"
              title="Studio Light."
              accent="One price for the whole studio."
              subline="Check-in at the door, class booking, memberships, point of sale, shifts and invoices — a switch inside the same account, on top of everything above."
            />
            <Reveal delay={0.08} y={24} className="card-night rounded-3xl p-8 lg:p-10">
              <p className="text-sm text-white/60">Studio Light</p>
              <p className="mt-3 text-5xl font-semibold tracking-tight">
                ${STUDIO}<span className="text-base font-normal text-white/50"> /mo</span>
              </p>
              <p className="mt-2 text-white/60">or ${STUDIO * 10} a year — two months free</p>
              <ul className="mt-6 space-y-2.5">
                {[
                  'Every coaching feature, for every trainer in the studio',
                  'Check-in, classes and WODs, memberships, point of sale',
                  'Shifts, invoices and books',
                  'The client app free for every member',
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3 text-white/80 leading-snug">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    {l}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a href={SIGNUP_STUDIO} className="btn btn-primary">
                  Start free — 14 days <ArrowRight size={16} />
                </a>
                <Link to="/studios/" className="btn btn-secondary">
                  What Studio Light adds
                </Link>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ── In every plan ──────────────────────────────────────────────── */}
        <Section>
          <SectionHeader
            align="left"
            eyebrow="In every plan"
            title="Nothing is an add-on."
            accent="Not nutrition, not video, not payments."
          />
          <Reveal delay={0.06} className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-3 max-w-5xl">
            {INCLUDED.map((l) => (
              <div key={l} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/12 text-accent-dark flex items-center justify-center shrink-0">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-ink/80 leading-snug">{l}</span>
              </div>
            ))}
          </Reveal>
        </Section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <Section tone="raised" width="narrow">
          <SectionHeader align="left" eyebrow="Questions" title="Asked before" accent="paying." />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold tracking-tight">{f.q}</h3>
                  <span aria-hidden="true" className="mt-1 w-6 h-6 rounded-full border border-line-strong flex items-center justify-center text-muted shrink-0 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>

        <FinalCta
          title="Start with one client."
          body="Fourteen days of the full product, no card. Pick a rung when you know how many clients you are bringing."
        />
        <HomeFooter />
      </div>
    </>
  )
}
