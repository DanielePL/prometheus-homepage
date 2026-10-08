import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Dumbbell, Building2, UserRound } from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { FinalCta } from '../components/home/Closing'
import StackCalculator, { COACH_ROWS } from '../components/site/StackCalculator'
import { CONTACT, SIGNUP, SIGNUP_STUDIO, SIGNUP_GYM } from '../lib/links'

/* /pricing/ — every price we charge, on the marketing domain.
 *
 * Rewritten 2026-10-08 from Caitlin's Stage 1 audit: the page has to answer
 * "what will this cost me as I grow?" for each of the three buyers. Until
 * then it was a coach-only ladder, while the homepage (since 2026-10-04)
 * sells the gym product — a gym owner clicking "Pricing" found coach rungs.
 * Now: a chooser at the top, then one block per product, then the growth
 * steps in our own numbers, then the cost questions.
 *
 * Sources of truth — if a price changes there, it changes here, never the
 * other way round:
 *   Gym:          Prometheus-Enterprise/src/config/plans.ts (PAID_PLANS,
 *                 TRIAL_DURATION_DAYS = 30). EUR in DE/AT, CHF in CH, same
 *                 number. Every feature in every plan; tiers differ by active
 *                 members and multi-location only. AI credits are the one paid
 *                 add-on, so this page never says "no add-ons".
 *   Coach/Studio: prometheus_coach/webapp/src/integrations/stripe/config.ts,
 *                 PRICING_PLANS. Ten coach rungs 5–70 clients, USD, yearly =
 *                 10 × monthly, Studio Light $79 flat, 14-day trial.
 *
 * Deliberately not here: any competitor or their prices (the calculator lets
 * visitors type in their own bill), "1,400+ exercises", "unlimited" for
 * Studio Light (the app carries a client cap), anything free beyond trials.
 */

const LADDER = [
  [5, 19], [10, 29], [15, 35], [20, 39], [25, 45],
  [30, 49], [40, 59], [50, 69], [60, 79], [70, 89],
]
const POPULAR = 15
const STUDIO = 79

/* plans.ts, in the order of the public grid. Same wording as the homepage. */
const GYM_PLANS = [
  { name: 'Starter', price: 149, members: 'Up to 250 active members', site: 'One location' },
  { name: 'Studio', price: 249, members: 'Up to 1,000 active members', site: 'One location', popular: true },
  { name: 'Pro', price: 399, members: 'Unlimited members', site: 'Several locations, one head-office view', perSite: true },
]

const GYM_EVERY_PLAN = [
  'Every feature in every plan — the price follows your members, never the features',
  'Unlimited staff accounts',
  'No setup fee, no migration fee, no minimum term',
  '30 days to try it, no card',
]

/* The three doors. Each answers "is this me?" in one line and jumps to its
   block further down. */
const DOORS = [
  {
    id: 'gym',
    icon: Building2,
    who: 'I run a gym or a box',
    line: 'Members, desk, classes, point of sale, staff and books — one location or several.',
    from: 'From €149 a month',
  },
  {
    id: 'studio',
    icon: Dumbbell,
    who: 'I coach and run one studio',
    line: 'Everything a coach has, plus classes, memberships, check-in and the till.',
    from: '$79 a month, flat',
  },
  {
    id: 'coach',
    icon: UserRound,
    who: 'I coach clients',
    line: 'In person or online: programmes, nutrition, video review, invoices.',
    from: 'From $19 a month',
  },
]

/* "As you grow" — only our own numbers, worked through. */
const GROWTH = [
  {
    who: 'A coach',
    steps: [
      ['15 clients', '$35 a month'],
      ['30 clients', '$49 a month'],
      ['70 clients', '$89 a month'],
    ],
    note: 'Ten sizes between 5 and 70 clients, so each step up is small. Move down again when a client leaves.',
  },
  {
    who: 'A studio',
    steps: [
      ['Opening day', '$79 a month'],
      ['Busy year two', '$79 a month'],
    ],
    note: 'Studio Light is one flat price for one location. It does not climb with your class numbers.',
  },
  {
    who: 'A gym',
    steps: [
      ['Up to 250 members', '€149 a month'],
      ['Up to 1,000 members', '€249 a month'],
      ['A second location', '€399 per location'],
    ],
    note: 'The price follows active members and locations. Every plan has every feature, so growing never unlocks anything — it just costs the next step.',
  },
]

/* Same order as the product's own pricing card, which the owner set on
   2026-08-15: nutrition high, VBT low. "Check-ins" is phrased as
   questionnaires: a dedicated weekly check-in form is not confirmed. */
const COACH_INCLUDED = [
  'Programme and workout builder, periodisation, season and competition planning',
  'Exercise library with video demonstrations',
  'Nutrition plans, macro targets, meal-photo logging and your own food library',
  'Video review with annotations, questionnaires and messaging',
  'Video calls, built in',
  'Invoices, quotes, subscriptions and recurring billing',
  'Calendar and scheduling',
  'Progress tracking',
  'The assistant: follows up on enquiries and flags clients who are drifting',
  'Bar-speed tracking with the phone camera (VBT)',
  'The client app on iPhone and Android, free for every client',
]

const FAQ = [
  {
    q: 'How much does gym software cost?',
    a: 'Prometheus for gyms costs €149 a month for up to 250 active members, €249 for up to 1,000, and €399 per location for unlimited members across several sites. In Switzerland the same numbers are in Swiss francs.',
  },
  {
    q: 'Is anything locked behind a higher plan?',
    a: 'No. Every feature is in every plan, for gyms and for coaches. Gym plans differ only by active members and locations; coach plans only by how many clients you coach.',
  },
  {
    q: 'Is there anything I pay on top?',
    a: 'For gyms, AI credits for the assistant are sold separately. There is no setup fee, no migration fee and no minimum term. Card fees from your payment provider are charged by the provider.',
  },
  {
    q: 'What happens when I outgrow my plan?',
    a: 'You move to the next step: the next client rung for a coach, the next member band for a gym, Pro when a gym opens a second location. Studio Light stays at one flat price for one location.',
  },
  {
    q: 'How does the yearly price work?',
    a: 'For coach plans and Studio Light, a year costs ten months: pay for twelve up front and two of them are free.',
  },
  {
    q: 'What do the trials include?',
    a: 'The full product, no card. Gyms get 30 days, coaches and Studio Light 14. Nothing is charged until you choose a plan.',
  },
  {
    q: 'Do my clients or members pay for the app?',
    a: 'No. The client app on iPhone and Android is free for every client you coach and every member of your studio.',
  },
  {
    q: 'Which currency are the prices in?',
    a: 'Gym plans in euros in Germany and Austria and in Swiss francs in Switzerland, the same number. Coach plans and Studio Light in US dollars everywhere.',
  },
]

const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://prometheus.coach/pricing/',
      url: 'https://prometheus.coach/pricing/',
      name: 'Gym and fitness software pricing',
      isPartOf: { '@id': 'https://prometheus.coach/#site' },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Prometheus for gyms',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      url: 'https://prometheus.coach/',
      offers: GYM_PLANS.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: String(p.price),
        priceCurrency: 'EUR',
        description: `${p.members}. ${p.site}.${p.perSite ? ' Price per location.' : ''}`,
        url: 'https://prometheus.coach/pricing/',
      })),
      publisher: { '@id': 'https://prometheus.coach/#org' },
    },
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

function Tick({ dark = false }) {
  return (
    <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${dark ? 'bg-accent text-white' : 'bg-accent/12 text-accent-dark'}`}>
      <Check size={12} strokeWidth={3} />
    </span>
  )
}

export default function PricingPage() {
  return (
    <>
      <Head>
        <html lang="en" />
        <title>Gym and fitness software pricing | Prometheus</title>
        <meta
          name="description"
          content="Gym software from €149 a month, Studio Light $79, coach plans from $19. Every feature in every plan, priced by members or clients. Trial, no card."
        />
        <link rel="canonical" href="https://prometheus.coach/pricing/" />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Gym and fitness software pricing — what it costs as you grow" />
        <meta
          property="og:description"
          content="Gyms from €149 a month, Studio Light $79, coaches from $19. Every feature in every plan. Trial, no card."
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
              <span className="eyebrow">Gym and fitness software pricing</span>
              <span className="block display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
                What it costs.{' '}
                <span className="display-soft">And what it costs as you grow.</span>
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
              Every feature is in every plan. You pay for how many members or clients you
              have, never for which parts of the product you may open. Pick the one that
              sounds like you.
            </p>
          </div>
        </section>

        {/* ── Which one is mine? ─────────────────────────────────────────── */}
        <Section className="pt-6 lg:pt-8">
          <div className="grid md:grid-cols-3 gap-4">
            {DOORS.map((d, i) => (
              <Reveal key={d.id} delay={i * 0.06} y={20}>
                <a href={`#${d.id}`} className="card rounded-3xl p-7 flex flex-col h-full group hover:border-ink transition-colors">
                  <span className="w-10 h-10 rounded-full bg-accent/12 text-accent-dark flex items-center justify-center">
                    <d.icon size={18} />
                  </span>
                  <p className="mt-5 text-xl font-semibold tracking-tight">{d.who}</p>
                  <p className="mt-2 text-muted leading-relaxed flex-1">{d.line}</p>
                  <p className="mt-5 font-semibold inline-flex items-center gap-2">
                    {d.from} <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Gym ────────────────────────────────────────────────────────── */}
        <Section id="gym" tone="raised" className="scroll-mt-16">
          <SectionHeader
            align="left"
            eyebrow="For gyms and boxes"
            title="From €149 a month."
            accent="The price follows your members."
            subline="One system for the whole gym: check-in, reception desk, classes, memberships, point of sale, shifts and books."
          />

          <div className="mt-12 grid lg:grid-cols-3 gap-4">
            {GYM_PLANS.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 0.06}
                y={24}
                className={`rounded-3xl p-7 flex flex-col ${p.popular ? 'card-night' : 'card'}`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{p.name}</p>
                  {p.popular && (
                    <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-accent-light">
                      Established studios
                    </span>
                  )}
                </div>
                <p className="mt-4 text-5xl font-semibold tracking-tight">
                  €{p.price}
                  <span className={`text-base font-normal ${p.popular ? 'text-white/50' : 'text-muted'}`}>
                    {p.perSite ? ' /mo per location' : ' /mo'}
                  </span>
                </p>
                <ul className={`mt-5 space-y-1.5 text-sm flex-1 ${p.popular ? 'text-white/70' : 'text-muted'}`}>
                  <li>{p.members}</li>
                  <li>{p.site}</li>
                </ul>
                <a
                  href={SIGNUP_GYM}
                  className={`btn mt-6 w-full text-sm ${p.popular ? 'btn-primary' : 'btn-secondary'}`}
                >
                  Try it 30 days
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1} y={24} className="mt-4 card rounded-3xl p-8 lg:p-10">
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-3">
              {GYM_EVERY_PLAN.map((l) => (
                <div key={l} className="flex items-start gap-3">
                  <Tick />
                  <span className="text-ink/80 leading-snug">{l}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted leading-relaxed">
              Prices in euros in Germany and Austria, in Swiss francs in Switzerland — the same
              number. AI credits for the assistant are sold separately.{' '}
              <Link to="/" className="font-semibold text-ink underline underline-offset-4 decoration-line-strong hover:decoration-ink">
                What the gym product does
              </Link>
            </p>
          </Reveal>
        </Section>

        {/* ── Studio Light ───────────────────────────────────────────────── */}
        <Section id="studio" className="scroll-mt-16">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">
            <SectionHeader
              align="left"
              eyebrow="One studio, coached by you"
              title="Studio Light."
              accent="One flat price for the whole studio."
              subline="For a coach with a room: classes and bookings, memberships and class packs, check-in at the desk, point of sale, shifts and invoices — on top of every coaching feature, in the same account."
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
                  'Classes, bookings and waitlists, memberships, point of sale',
                  'Shifts, invoices and books',
                  'The client app free for every member',
                ].map((l) => (
                  <li key={l} className="flex items-start gap-3 text-white/80 leading-snug">
                    <Tick dark />
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

        {/* ── Coach ladder ───────────────────────────────────────────────── */}
        <Section id="coach" tone="raised" className="scroll-mt-16">
          <SectionHeader
            align="left"
            eyebrow="For coaches"
            title="From $19 a month."
            accent="Priced by how many clients you coach."
            subline="Personal trainers and online coaches pay for client count, not features. Ten sizes, so the next step is always a small one."
          />
          <Reveal className="mt-10 card rounded-3xl overflow-hidden">
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
            every plan, no card, nothing charged until you choose.{' '}
            <Link to="/online-coaching-software/" className="font-semibold text-ink underline underline-offset-4 decoration-line-strong hover:decoration-ink">
              What coaches get
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 card rounded-3xl p-8 lg:p-10">
            <h3 className="text-xl font-semibold tracking-tight">In every coach plan</h3>
            <div className="mt-6 grid md:grid-cols-2 gap-x-10 gap-y-3">
              {COACH_INCLUDED.map((l) => (
                <div key={l} className="flex items-start gap-3">
                  <Tick />
                  <span className="text-ink/80 leading-snug">{l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {/* ── As you grow ────────────────────────────────────────────────── */}
        <Section>
          <SectionHeader
            align="left"
            eyebrow="As you grow"
            title="The next step,"
            accent="before you need it."
            subline="What the bill looks like a year from now, in our own numbers."
          />
          <div className="mt-10 grid lg:grid-cols-3 gap-4">
            {GROWTH.map((g, i) => (
              <Reveal key={g.who} delay={i * 0.06} y={20} className="card rounded-3xl p-7 flex flex-col">
                <p className="font-semibold">{g.who}</p>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {g.steps.map(([when, cost]) => (
                    <div key={when} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-muted">{when}</dt>
                      <dd className="font-semibold tracking-tight">{cost}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-sm text-muted leading-relaxed">{g.note}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── What you pay today ─────────────────────────────────────────── */}
        <Section tone="raised">
          <SectionHeader
            align="left"
            eyebrow="The comparison"
            title="Add up what you pay today."
            accent="Then look at one number."
            subline="Most coaches run three or four subscriptions to coach one client. Type in yours; the total is yours, the line through it is ours."
          />
          <StackCalculator
            mode="coach"
            rows={COACH_ROWS}
            cta="Start free — 14 days, no card"
            href={SIGNUP}
            className="mt-10"
          />
        </Section>

        {/* ── FAQ ────────────────────────────────────────────────────────── */}
        <Section width="narrow">
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
          <p className="mt-8 text-muted">
            Something not answered here?{' '}
            <a href={`${CONTACT}?subject=Pricing%20question`} className="font-semibold text-ink underline underline-offset-4 decoration-line-strong hover:decoration-ink">
              Write to us
            </a>
            .
          </p>
        </Section>

        <FinalCta
          title="Try it before you choose."
          body="Thirty days for gyms, fourteen for coaches and studios. The full product, no card. Pick a plan when you know what you need."
          href={SIGNUP_GYM}
          cta="Try it 30 days, no card"
        />
        <HomeFooter />
      </div>
    </>
  )
}
