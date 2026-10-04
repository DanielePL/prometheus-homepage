import { Head } from 'vite-react-ssg'
import {
  ArrowRight, Network, Monitor, ScanLine, ShoppingBag, CalendarDays,
  Users, Receipt, Check,
} from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { FinalCta } from '../components/home/Closing'
import PhotoHero from '../components/site/PhotoHero'
import PhotoBreak from '../components/site/PhotoBreak'
import { Link } from 'react-router-dom'
import { CONTACT, SOCIAL, SIGNUP, SIGNUP_STUDIO, SIGNUP_GYM, GYM_APP } from '../lib/links'

/* / — the gym product first (owner, 2026-10-04).
 *
 * Why the homepage is the gym product: the first gym customer runs on it, and
 * the next gym owners will arrive by recommendation and google the brand.
 * They land here, and they have to see the gym product, not a coaching tool.
 * The coach product moved to /coach/ with all its SEO intact; its own search
 * traffic needs months of ads and content before it carries weight.
 *
 * Who it is for (owner, 2026-10-04): private gyms, small personal-training
 * studios and CrossFit boxes first — a single location is the normal case —
 * and chains with several sites. Not a pilot any more: one gym runs on it for
 * real, and the owner's verdict is that it does what it promises. So no
 * "pilot" anywhere on the page, and the price stands next to the product,
 * the way the coach page does it (price and performance in five seconds).
 *
 * Prices: Prometheus-Enterprise/src/config/plans.ts, wired to Stripe. EUR in
 * DE/AT, CHF in CH, same number. Every feature in every plan; plans differ
 * only by active members and multi-location. The one paid add-on there is
 * (AI credits, see the app's own pricing page) means this page never says
 * "no add-ons". 30-day trial starts in the setup wizard, no card.
 *
 * Rules that apply here as everywhere: no invented numbers, no customer
 * names, nothing free beyond the trial, no compliance promises we have not
 * shipped. The screenshots (public/images/enterprise/) come from the demo
 * tenant "Studio Apex" with the app switched to English — fictional data, not
 * a customer.
 *
 * Product truth: Prometheus-Enterprise/src/App.tsx routes (desk, booking,
 * programming, leaderboard, memberships, pos, shifts, accounting/*, hq, ceo,
 * migration-center).
 */

/* The homepage nav points at the gym product; every other page keeps the
   default links in HomeChrome. */
const NAV = [
  { label: 'What it does', href: '/#included' },
  { label: 'Pricing', href: '/#pricing' },
  { label: 'For coaches', href: '/coach/' },
]

const MAIL = `${CONTACT}?subject=Prometheus%20for%20my%20gym`

/* In the order a gym owner meets them: the door and the desk, the floor, the
   money, the staff, the books — and the head office once there is a second
   site. */
const surfaces = [
  {
    icon: Monitor,
    title: 'Reception desk',
    body: 'The front desk on one screen: who is in, who needs cover today, the day’s takings and the facility checks that are due.',
  },
  {
    icon: ScanLine,
    title: 'Check-in and staff clock-in',
    body: 'Members check themselves in at the door. Staff clock in on an entrance tablet with a rotating QR code or a PIN.',
  },
  {
    icon: CalendarDays,
    title: 'Classes, programming, leaderboard',
    body: 'Class schedule and booking, the workout of the day, and a leaderboard the box can see on the screen by the rig.',
  },
  {
    icon: ShoppingBag,
    title: 'Memberships and point of sale',
    body: 'Recurring billing, renewals, drop-ins and the shop — all sold against the same member account.',
  },
  {
    icon: Users,
    title: 'Shifts, wages, payroll export',
    body: 'Planned hours become worked hours, variances get approved with a reason, and the month goes to your accountant as a file, not as a phone call.',
  },
  {
    icon: Receipt,
    title: 'Invoices and books',
    body: 'Invoicing, dunning and bookkeeping run as the month runs. Migration tools bring an existing member list across.',
  },
  {
    icon: Network,
    title: 'More than one site',
    body: 'A head-office view over every location — members, revenue, visits side by side — and the group’s numbers on the owner’s phone.',
  },
]

/* plans.ts, in the order of the public grid. `site` is the one line that
   differs; everything else is the same in every plan. */
const plans = [
  { name: 'Starter', price: 149, members: 'Up to 250 active members', site: 'One location' },
  { name: 'Studio', price: 249, members: 'Up to 1,000 active members', site: 'One location', popular: true },
  { name: 'Pro', price: 399, members: 'Unlimited members', site: 'Several locations, one head-office view', perSite: true },
]

const inEveryPlan = [
  'Every feature in every plan — the price follows your members, never the features',
  'Unlimited staff accounts',
  'No setup fee, no migration fee, no minimum term',
  '30 days to try it, no card',
]

/* Named on purpose. An owner who has read four vendor pages believes the one
   that says what is missing. Everything here is a claim about us. */
const notYet = [
  'Not certified for German fiscal cash-register rules (KassenSichV / TSE)',
  'No public API and no integration marketplace — the closed system is deliberate',
  'Interface in German, English and French; other languages on request',
]

const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://prometheus.coach/#org',
      name: 'Prometheus',
      legalName: 'PeakForce OÜ',
      url: 'https://prometheus.coach/',
      logo: 'https://prometheus.coach/images/flame.png',
      email: 'management@prometheus.coach',
      sameAs: SOCIAL.map((s) => s.href),
    },
    {
      '@type': 'WebSite',
      '@id': 'https://prometheus.coach/#site',
      url: 'https://prometheus.coach/',
      name: 'Prometheus',
      publisher: { '@id': 'https://prometheus.coach/#org' },
      inLanguage: 'en',
    },
    {
      /* Same numbers as the visible pricing block, nothing more. */
      '@type': 'SoftwareApplication',
      name: 'Prometheus for gyms',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      url: 'https://prometheus.coach/',
      description:
        'Gym management software for private gyms, personal-training studios, CrossFit boxes and chains: reception desk, check-in and staff clock-in, classes and programming, memberships, point of sale, shifts with payroll export, invoices and books, and a head-office view across sites.',
      offers: plans.map((p) => ({
        '@type': 'Offer',
        name: p.name,
        price: String(p.price),
        priceCurrency: 'EUR',
        description: `${p.members}. ${p.site}.${p.perSite ? ' Price per location.' : ''}`,
      })),
      publisher: { '@id': 'https://prometheus.coach/#org' },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Head>
        <html lang="en" />
        <title>Gym management software from €149 a month | Prometheus</title>
        <meta
          name="description"
          content="Software for gyms, PT studios and CrossFit boxes: check-in, desk, classes, memberships, point of sale, shifts and books. Every feature, from €149 a month."
        />
        <link rel="canonical" href="https://prometheus.coach/" />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Gym management software — everything in it, from €149 a month" />
        <meta
          property="og:description"
          content="One system for the whole gym: check-in, reception desk, classes, memberships, point of sale, shifts and books. Every feature in every plan, 30 days to try it."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prometheus.coach/" />
        <meta property="og:image" content="https://prometheus.coach/images/og/home.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(LD)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav overDark links={NAV} login={GYM_APP} signup={SIGNUP_GYM} />

        {/* Dark zone one (2026-10-03): the opening-day hall carries on
            behind the desk screenshot, who this is for and what is in it. */}
        <div className="zone-dark relative isolate">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
          {/* Price and performance in the h1, the same argument as the coach
              page (owner, 2026-10-03). The desk, not the HQ table, rises out
              of the photo: the visitor who matters runs one gym. */}
          <PhotoHero
            photo="/images/gym/hall-opening.webp"
            focus="60% center"
            eyebrow="Gym management software"
            title="Software for gyms, studios and boxes."
            accent="Everything in it, from €149 a month."
            body="Check-in at the door, reception desk, classes, memberships, point of sale, shifts and books — one system, every feature in every plan. The price follows your member count, never the features."
            shot={
              <img
                src="/images/enterprise/desk.webp"
                alt="The reception desk: cover gaps, member check-in, today's point-of-sale takings and facility checks on one screen (demo data)"
                width="1600" height="1000"
                className="w-full block"
              />
            }
          >
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a href={SIGNUP_GYM} className="btn btn-primary btn-lg">
                Try it 30 days, no card <ArrowRight size={18} />
              </a>
              <a href="#pricing" className="btn btn-ghost-light btn-lg">
                See the prices
              </a>
            </div>
            <p className="mt-5 text-sm text-white/60">
              Rather talk first?{' '}
              <a href={MAIL} className="underline underline-offset-4 hover:text-white">One email</a>,
              answered by a person. We speak German and English.
            </p>
          </PhotoHero>

          <div className="relative isolate">
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none fade-y" aria-hidden="true">
                <img src="/images/gym/coaching-floor.webp" alt="" loading="lazy" className="w-full h-full object-cover object-[center_55%] opacity-[0.13]" />
              </div>
        {/* ── Who this is for ──────────────────────────────────────────── */}
            <Section tone="raised" width="narrow">
              <SectionHeader
                align="left"
                eyebrow="Who this is for"
                title="One gym or twenty,"
                accent="one system from the door to the books."
              />
              <Reveal delay={0.06} className="mt-7 max-w-2xl space-y-5 text-lg text-muted leading-relaxed">
                <p>
                  A private gym, a personal-training studio, a CrossFit box — the door, the
                  desk, the classes, the shop, the staff and the books usually live in five
                  different tools, and the owner is the one who copies between them.
                </p>
                <p>
                  Prometheus runs all of it in one place, and every member has one account
                  across all of it. Open a second location and the same system gets a
                  head-office layer on top: every site side by side, without a spreadsheet
                  export on a Sunday.
                </p>
              </Reveal>
            </Section>

            {/* ── What is in it ────────────────────────────────────────────── */}
            <Section id="included">
              <SectionHeader
                align="left"
                eyebrow="What is in it"
                title="What runs today,"
                accent="in the order a gym meets it."
                subline="Running in a real gym now. None of it is a mock-up, and none of it is held back for a bigger plan."
              />

              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* The phone is the third cell and spans two rows on desktop;
                    seven text cards then fill the grid as 2 + 2 + 3 without a
                    hole. */}
                {[...surfaces.slice(0, 2), 'phone', ...surfaces.slice(2)].map((s, i) =>
                  s === 'phone' ? (
                    <Reveal key="phone" delay={0.1} y={24} className="card-night rounded-3xl p-7 flex flex-col items-center justify-end overflow-hidden relative min-h-[24rem] lg:row-span-2">
                      <div className="absolute inset-x-[20%] top-[10%] bottom-0 bg-accent/25 blur-[70px] rounded-full pointer-events-none" aria-hidden="true" />
                      <div className="relative w-[62%] max-w-[230px] -mb-20">
                        <div className="phone-shell">
                          {/* No island here: this capture has no status bar, so the pill
                              would sit on the first line of text. */}
                          <div className="phone-screen">
                            <img
                              src="/images/enterprise/ceo.webp"
                              alt="The owner's view on a phone: the gym's numbers and the points that deserve a look (demo data)"
                              width="860" height="1864" loading="lazy"
                            />
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ) : (
                    <Reveal key={s.title} delay={i * 0.05} y={24} className="card rounded-3xl p-7 flex flex-col">
                      <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent-dark flex items-center justify-center mb-5">
                        <s.icon size={21} />
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                      <p className="mt-2 text-muted leading-relaxed">{s.body}</p>
                    </Reveal>
                  ),
                )}
              </div>

              <Reveal delay={0.1} y={24} className="mt-4 shot rounded-2xl overflow-hidden">
                <img
                  src="/images/enterprise/hq.webp"
                  alt="The head-office view: every location of a group side by side, with members, recurring revenue and visits (demo data)"
                  width="1600" height="1000" loading="lazy" className="w-full block"
                />
              </Reveal>
            </Section>

          </div>
        </div>
        <div className="dusk-to-day" aria-hidden="true" />

        {/* ── Pricing ──────────────────────────────────────────────────── */}
        <Section id="pricing" tone="raised">
          <SectionHeader
            eyebrow="Pricing"
            title="From €149 a month."
            accent="Every feature, every plan."
            subline="You pay for how many members you have. Never for features — the smallest plan has everything the largest one has."
          />

          <div className="mt-12 grid lg:grid-cols-3 gap-4">
            {plans.map((p, i) => (
              <Reveal
                key={p.name}
                delay={i * 0.06}
                y={24}
                className={`rounded-3xl p-7 flex flex-col ${p.popular ? 'card-night' : 'card'}`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{p.name}</p>
                  {/* plans.ts marks Studio as the popular tier; with one gym
                      live, "most common" would be a claim we cannot back. */}
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
              {inEveryPlan.map((l) => (
                <div key={l} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/12 text-accent-dark flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  <span className="text-ink/80 leading-snug">{l}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href={SIGNUP_GYM} className="btn btn-primary btn-lg">
                Try it 30 days, no card <ArrowRight size={18} />
              </a>
              <a href={MAIL} className="btn btn-secondary btn-lg">
                Talk to us first
              </a>
            </div>

            <p className="mt-6 text-sm text-muted leading-relaxed">
              Prices in euros in Germany and Austria, in Swiss francs in Switzerland — the same number.
            </p>
          </Reveal>

          <Reveal delay={0.14} y={24} className="mt-4 card rounded-3xl p-8">
            <h3 className="text-xl font-semibold tracking-tight">What it does not do</h3>
            <p className="mt-2 text-muted leading-relaxed max-w-2xl">
              So that nobody finds out in month two.
            </p>
            <ul className="mt-5 grid md:grid-cols-3 gap-x-8 gap-y-3">
              {notYet.map((l) => (
                <li key={l} className="text-ink/75 leading-snug text-[0.95rem]">{l}</li>
              ))}
            </ul>
          </Reveal>
        </Section>

        {/* ── Coaches ───────────────────────────────────────────────────── */}
        {/* Coaches have their own product. Studio Light is the room a coach
            runs on the side, bought inside the coach account; a gym with its
            own desk and staff is the product above. */}
        <Section>
          <SectionHeader
            align="left"
            eyebrow="Not a gym?"
            title="Coaching first,"
            accent="the room second."
          />
          <div className="mt-12 grid md:grid-cols-2 gap-4">
            <Reveal delay={0.05} y={24} className="card rounded-3xl overflow-hidden flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/gym/coaching-floor.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-[center_60%]" />
                <div className="absolute inset-0 photo-scrim-card" aria-hidden="true" />
                <p className="absolute left-7 bottom-5 text-white text-xl font-semibold tracking-tight">Personal trainers and online coaches</p>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <p className="text-muted leading-relaxed flex-1">
                  Programming, nutrition, video review, calls and payments in one account,
                  with a free app for every client. From $19 a month by client count, every
                  feature in every plan.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a href={SIGNUP} className="btn btn-primary text-sm">Start free <ArrowRight size={16} /></a>
                  <Link to="/coach/" className="btn btn-secondary text-sm">The coach product</Link>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1} y={24} className="card rounded-3xl overflow-hidden flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img src="/images/gym/front-desk.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-[center_45%]" />
                <div className="absolute inset-0 photo-scrim-card" aria-hidden="true" />
                <p className="absolute left-7 bottom-5 text-white text-xl font-semibold tracking-tight">A coach with a room: Studio Light</p>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <p className="text-muted leading-relaxed flex-1">
                  Check-in, class booking, memberships, point of sale and invoices for the
                  room you coach in — a switch inside the coaching account. $79 a month,
                  all in, 14-day trial without a card.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <a href={SIGNUP_STUDIO} className="btn btn-primary text-sm">Start free <ArrowRight size={16} /></a>
                  <Link to="/studios/" className="btn btn-secondary text-sm">What Studio Light adds</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Dark zone two: the reception at dusk runs edge to edge into
            graphite; "How it starts" stands in it and hands straight over to
            the closing photograph. */}
        <PhotoBreak
          bleed
          src="/images/gym/reception-dusk.webp"
          focus="60% center"
          statement="One desk, one door, one set of books."
          accent="However many sites you run."
        />
        <div className="zone-dark relative isolate">
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none fade-y" aria-hidden="true">
            <img src="/images/gym/front-desk.webp" alt="" loading="lazy" className="w-full h-full object-cover object-[center_45%] opacity-[0.12]" />
          </div>
        {/* ── How it starts ────────────────────────────────────────────── */}
          <Section width="narrow">
            <SectionHeader
              align="left"
              eyebrow="How it starts"
              title="Set it up yourself,"
              accent="or with us next to you."
            />
            <Reveal delay={0.06} className="mt-7 max-w-2xl space-y-5 text-lg text-muted leading-relaxed">
              <p>
                Register, and a setup wizard walks you through your gym, your memberships
                and your staff. Bring your member list across with the migration tools.
                The first 30 days cost nothing and need no card.
              </p>
              <p>
                Rather have someone look at it with you? Write to us with what you run
                today. The same people who answer the email build the product.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-9 flex flex-col sm:flex-row gap-3">
              <a href={SIGNUP_GYM} className="btn btn-primary btn-lg">
                Try it 30 days, no card <ArrowRight size={18} />
              </a>
              <a href={MAIL} className="btn btn-ghost-light btn-lg">
                Write to us
              </a>
            </Reveal>
          </Section>

        </div>
        <FinalCta
          title="Your gym, in one system."
          body="Every feature from the first day, from €149 a month. Try it for 30 days on your own gym, without a card."
          href={SIGNUP_GYM}
          cta="Try it 30 days, no card"
        />
        <HomeFooter />
      </div>
    </>
  )
}
