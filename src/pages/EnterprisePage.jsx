import { Head } from 'vite-react-ssg'
import {
  ArrowRight, Network, Monitor, Smartphone, ScanLine, ShoppingBag,
  Users, Receipt, Check, Minus,
} from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { FinalCta } from '../components/home/Closing'
import { CONTACT } from '../lib/links'

/* /enterprise/ — the pilot call for the multi-site product.
 *
 * Why this page exists (2026-09-18): Enterprise becomes shippable only with a
 * pilot chain running it for real, and nobody can volunteer for a pilot that
 * is not announced anywhere. The owner's instruction: it has to be on the site
 * now. So this is not a product page pretending the product is finished — it
 * is an honest description of what exists, what a pilot gets, what a pilot
 * gives, and how to get in touch.
 *
 * Why it is a page and not a homepage section: the homepage ranks for coach
 * vocabulary and a coach who reads "head office" and "regions" leaves — that
 * was the failure of the August page. One page, one intent. The homepage
 * keeps a door (a strip under the three doors, a nav link, a footer link).
 *
 * Rules that apply here as everywhere: no invented numbers, no customer
 * names, nothing free, no compliance promises we have not shipped. The
 * screenshots come from the demo tenant "Studio Apex" — fictional data, not
 * a customer. Prices are not on this page: pilot terms are agreed per pilot.
 *
 * Product truth: Prometheus-Enterprise/src/pages (HQ, Desk, CoachDay,
 * CheckInTerminal, POSTerminalPage, Memberships, accounting/*,
 * MigrationCenter) and docs/CHANGELOG_2026-05_PILOT_PREP.md.
 */

const MAIL = `${CONTACT}?subject=Enterprise%20pilot`

/* In the order a chain meets them: the owner's view first, then the people
   on the floor, then the money. */
const surfaces = [
  {
    icon: Network,
    title: 'HQ across every site',
    body: 'Every location side by side — members, revenue, visits — live, without a spreadsheet export. Search a member across all studios at once.',
  },
  {
    icon: Smartphone,
    title: 'CEO pulse on the phone',
    body: 'The numbers of the whole group in a pocket, plus the points that deserve a second look, flagged for you rather than found by you.',
  },
  {
    icon: Monitor,
    title: 'Reception desk',
    body: 'The week at a glance for the front desk: shifts, coach sessions and group classes, with member search and today’s check-ins.',
  },
  {
    icon: ScanLine,
    title: 'Check-in and staff clock-in',
    body: 'Members check themselves in at the door. Staff clock in on an entrance tablet with a rotating QR code or a PIN, and the shift bar follows them through the app.',
  },
  {
    icon: ShoppingBag,
    title: 'Memberships and point of sale',
    body: 'Recurring billing, renewals, drop-ins and the shop — all sold against the same member account, in every location.',
  },
  {
    icon: Users,
    title: 'Shifts, wages, payroll export',
    body: 'Planned hours become worked hours, variances get approved with a reason, and the month goes to your accountant as a file, not as a phone call.',
  },
  {
    icon: Receipt,
    title: 'Invoices and books',
    body: 'Invoicing, dunning and bookkeeping run as the month runs. Migration tools for bringing an existing member list across.',
  },
]

const youGet = [
  'The full product, every site, every surface — nothing held back for a later tier',
  'A named person on our side who sets it up with you and moves your member list across',
  'A direct line to the people building it, not a ticket queue',
  'Your operation shapes what gets built next',
]

const youGive = [
  'Real operation in at least one location, with real members and real staff',
  'A weekly conversation about what worked and what did not',
  'Patience with rough edges — this is a pilot, and we will say so',
  'Pilot terms agreed per site, in writing, before day one',
]

/* Named on purpose. A chain that has read four vendor pages believes the one
   that says what is missing. Everything here is a claim about us. */
const notYet = [
  'Not certified for German fiscal cash-register rules (KassenSichV / TSE)',
  'No public API and no integration marketplace — the closed system is deliberate',
  'Interface in German and English; other languages on request, not on the roadmap yet',
]

export default function EnterprisePage() {
  return (
    <>
      <Head>
        <html lang="en" />
        <title>Gym chain management software — pilot programme | Prometheus Enterprise</title>
        <meta
          name="description"
          content="Multi-site management software for gym chains and studio groups: HQ view across every location, check-in, memberships, point of sale, shifts and payroll export, invoices and books. In pilot with studios now — we are taking a small number of further pilots."
        />
        <link rel="canonical" href="https://prometheus.coach/enterprise/" />
        <meta property="og:title" content="Gym chain management software — Prometheus Enterprise pilot programme" />
        <meta
          property="og:description"
          content="One system for every site: HQ, reception desk, check-in, memberships, point of sale, shifts and books. We are looking for pilot gyms."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prometheus.coach/enterprise/" />
        <meta property="og:image" content="https://prometheus.coach/images/hero-bg.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav />

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="relative pt-32 lg:pt-40 pb-12 lg:pb-16 px-5 sm:px-8 overflow-hidden">
          <div className="hero-glow absolute inset-x-0 top-0 h-[70vh] pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-3xl hero-rise">
              <p className="eyebrow mb-6">Prometheus Enterprise · pilot programme</p>
              <h1 className="display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
                Software for gym chains.{' '}
                <span className="display-soft">We are looking for pilot gyms.</span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
                One system for every location: head-office view, reception desk, check-in,
                memberships, point of sale, shifts and books. It is running with pilot
                studios now, and we are taking a small number of further pilots — chains
                that would rather shape it than wait for it.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <a href={MAIL} className="btn btn-primary btn-lg">
                  Talk to us about a pilot <ArrowRight size={18} />
                </a>
                <a href="#included" className="btn btn-secondary btn-lg">
                  What is in it
                </a>
              </div>
              <p className="mt-5 text-sm text-muted">
                One email, answered by a person. We speak German and English.
              </p>
            </div>

            <Reveal delay={0.1} y={30} className="mt-14 lg:mt-20 relative">
              <div className="absolute inset-x-[10%] top-1/3 bottom-0 bg-accent/15 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
              <div className="shot relative rounded-2xl overflow-hidden">
                <div className="shot-bar" aria-hidden="true"><i /><i /><i /></div>
                <img
                  src="/images/surfaces/dark-hq.webp"
                  alt="The HQ dashboard: every studio of a chain side by side, with members, recurring revenue and visits (demo data)"
                  width="1600" height="954"
                  className="w-full block"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Who this is for ──────────────────────────────────────────── */}
        <Section tone="raised" width="narrow">
          <SectionHeader
            align="left"
            eyebrow="Who this is for"
            title="Several locations,"
            accent="one answer to how the group is doing."
          />
          <Reveal delay={0.06} className="mt-7 max-w-2xl space-y-5 text-lg text-muted leading-relaxed">
            <p>
              Studio software is built for one front desk. Once there are two, three or
              twenty of them, the owner is back to spreadsheets on a Sunday, one export
              per location, and a number that was true last Tuesday.
            </p>
            <p>
              Prometheus Enterprise is the same system in every site, with a head-office
              layer over the top: every studio, region and member in one view, and the
              day-to-day — door, desk, classes, shop, shifts — handled where it happens.
            </p>
            <p>
              A single studio does not need this. For one location the switch is{' '}
              <a href="/studios/" className="text-accent-dark hover:text-accent underline underline-offset-4">Studio Light</a>,
              inside the coach product, bought without talking to anyone.
            </p>
          </Reveal>
        </Section>

        {/* ── What is in it ────────────────────────────────────────────── */}
        <Section id="included">
          <SectionHeader
            align="left"
            eyebrow="What is in it"
            title="What runs today,"
            accent="in the order a chain meets it."
            subline="All of it is live with pilot studios. None of it is a mock-up, and none of it is a tier."
          />

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {surfaces.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.05}
                y={24}
                className={`card rounded-3xl p-7 flex flex-col ${i === surfaces.length - 1 ? 'lg:col-span-2' : ''}`}
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent-dark flex items-center justify-center mb-5">
                  <s.icon size={21} />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-muted leading-relaxed">{s.body}</p>
              </Reveal>
            ))}

            {/* The eighth cell is the phone: the owner's view is the one that
                sells a chain, and it belongs next to the surfaces it summarises. */}
            <Reveal delay={0.35} y={24} className="card-night rounded-3xl p-7 flex flex-col items-center justify-end overflow-hidden relative min-h-[22rem]">
              <div className="absolute inset-x-[20%] top-[10%] bottom-0 bg-accent/25 blur-[70px] rounded-full pointer-events-none" aria-hidden="true" />
              <div className="relative w-[62%] max-w-[210px] -mb-16">
                <div className="phone-shell">
                  {/* No island here: this capture has no status bar, so the pill
                      would sit on the first line of text. */}
                  <div className="phone-screen">
                    <img
                      src="/images/surfaces/dark-ceo.webp"
                      alt="CEO pulse on a phone: the group's numbers and the studios that deserve a look (demo data)"
                      width="860" height="1862" loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={24} className="mt-4 shot rounded-2xl overflow-hidden">
            <img
              src="/images/surfaces/dark-desk.webp"
              alt="The reception desk view: the week's shifts, coach sessions and group classes on one screen (demo data)"
              width="1600" height="877" loading="lazy" className="w-full block"
            />
          </Reveal>
        </Section>

        {/* ── The pilot deal ───────────────────────────────────────────── */}
        <Section tone="raised">
          <SectionHeader
            align="left"
            eyebrow="The pilot"
            title="What a pilot gets,"
            accent="and what a pilot gives."
            subline="Stated up front, because a pilot that surprises either side in month two is not a pilot, it is a support case."
          />

          <div className="mt-12 grid lg:grid-cols-2 gap-4">
            <Reveal delay={0.05} y={24} className="card rounded-3xl p-8">
              <h3 className="text-xl font-semibold tracking-tight">You get</h3>
              <ul className="mt-5 space-y-3">
                {youGet.map((l) => (
                  <li key={l} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/12 text-accent-dark flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-ink/80 leading-snug">{l}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} y={24} className="card rounded-3xl p-8">
              <h3 className="text-xl font-semibold tracking-tight">You give</h3>
              <ul className="mt-5 space-y-3">
                {youGive.map((l) => (
                  <li key={l} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-tint-deep text-ink/60 flex items-center justify-center shrink-0">
                      <Minus size={12} strokeWidth={3} />
                    </span>
                    <span className="text-ink/80 leading-snug">{l}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.14} y={24} className="mt-4 card rounded-3xl p-8">
            <h3 className="text-xl font-semibold tracking-tight">Not there yet</h3>
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

        {/* ── How it starts ────────────────────────────────────────────── */}
        <Section width="narrow">
          <SectionHeader
            align="left"
            eyebrow="How it starts"
            title="One email,"
            accent="then one site."
          />
          <Reveal delay={0.06} className="mt-7 max-w-2xl space-y-5 text-lg text-muted leading-relaxed">
            <p>
              Write to us with how many locations you run and what you use today. We reply
              with a call, walk you through the product on your own numbers, and if it
              fits, we start with one site. The rest follow when the first one runs.
            </p>
            <p>
              Not a sales funnel. The same people who answer the email build the product.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a href={MAIL} className="btn btn-primary btn-lg mt-9">
              Talk to us about a pilot <ArrowRight size={18} />
            </a>
          </Reveal>
        </Section>

        <FinalCta
          title="Bring one site. We bring the rest."
          body="A pilot starts with one location and a conversation. Write to management@prometheus.coach with how many sites you run."
          href={MAIL}
          cta="Talk to us about a pilot"
        />
        <HomeFooter />
      </div>
    </>
  )
}
