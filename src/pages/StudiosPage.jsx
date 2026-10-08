import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ScanLine, CalendarDays, CreditCard,
  ShoppingBag, Users, Receipt, Check, FileSignature, Inbox,
} from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import PhotoBreak from '../components/site/PhotoBreak'
import PhotoHero from '../components/site/PhotoHero'
import StackCalculator, { STUDIO_ROWS } from '../components/site/StackCalculator'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { FinalCta } from '../components/home/Closing'
import { SIGNUP_STUDIO } from '../lib/links'

/* /studios/ — with the trailing slash, and that matters.
 *
 * The host answers /studios (no slash) with the SPA catch-all, i.e. the
 * homepage, and only resolves /studios/ to this page's file. A visitor never
 * notices — React Router renders the right page either way once the bundle
 * loads — but the first response is all a crawler reads. So the canonical tag,
 * the sitemap entry and every internal link use the slashed form, which is the
 * one the server actually serves.
 *
 * /studios — the depth behind the "small studio" door on the homepage.
 *
 * Why this is a page and not another homepage section: the homepage has to rank
 * for coaching vocabulary (`coaching software`, `trainerize alternative`). A
 * full studio block drags in a second vocabulary — check-in, memberships, point
 * of sale, shifts — and a page that says two things half ranks for neither.
 * Split, each page owns one intent, and the homepage keeps a three-line door
 * that links here.
 *
 * In English, unlike the rest of the site, because the market is: 156'100
 * monthly searches against 250 in German (GROWTH_PLAN §3). The homepage follows.
 *
 * Rebuilt as the Studio front door (2026-10-08), from Caitlin's Stage 1
 * audit: the page owns "fitness studio software" (480/mo, difficulty 36),
 * "fitness studio management software" (260, 35), "studio management
 * software" (170, 16) and "boutique fitness software" (110, 7), and carries
 * "gym management software" only as wording. It becomes the hub the
 * studio-type pages link up to. Every studio claim matches the fact sheet
 * checked against the code on 2026-10-01: check-in is done by staff at the
 * desk, classes book by place count (no spot or bike picking), and there are
 * no family accounts, term registration or belt tracking — so the studio
 * types listed are the ones Studio Light can back today, nothing more.
 *
 * The line this page must not cross: Studio Light is a switch inside the Coach
 * product, not a gym-management suite. The gym product (Enterprise, the
 * homepage since 2026-10-04) appears here as one sentence and a link. Blurring the two is exactly what the current German
 * homepage does ("Ich führe ein Studio oder eine Kette"), and why it is being
 * rewritten.
 */

/* Six surfaces, in the order a studio owner meets them on an ordinary day:
   the door, the schedule, the money coming in, the counter, the staff, the
   books. Not ordered by how impressive they are to build. */
const surfaces = [
  {
    icon: ScanLine,
    title: 'Check-in at the front desk',
    /* Staff-operated (CheckInTerminal.tsx): there is no member self check-in
       or QR kiosk in Studio Light. Corrected 2026-10-02. */
    body: 'Two letters of a name at the desk and the member is checked in, with membership and open balance on the same screen. Not a separate check-in system.',
  },
  {
    icon: CalendarDays,
    title: 'Classes, bookings, waitlists',
    body: 'A class schedule with a public schedule page and WOD programming. When a class is full, members join the waitlist and get an email the moment a place opens.',
  },
  {
    icon: CreditCard,
    title: 'Memberships and packs',
    body: 'Subscriptions, punch cards, session packages, trial passes and day passes, and drop-ins who buy a day pass online. Active, lapsed and about to lapse, on one list.',
  },
  {
    icon: FileSignature,
    title: 'Contracts, signed',
    body: 'Membership contracts signed on the spot or online, by signature pad or e-signature, and stored with the member. No binder behind the desk.',
  },
  {
    icon: ShoppingBag,
    title: 'Point of sale',
    body: 'Drinks, supplements, vouchers. Cash, card, TWINT or PromptPay, sold against the member account, with a cash report at the end of the day.',
  },
  {
    icon: Users,
    title: 'Shifts and payroll',
    body: 'Who works when, and a time clock for staff. Planned shifts become payroll hours, so the plan you already made is the timesheet.',
  },
  {
    icon: Receipt,
    title: 'Invoices and books',
    body: 'Invoices, profit and loss, a tax overview and a period close, plus reminders for late payments. Done as the month runs, not in one bad evening after it.',
  },
  {
    icon: Inbox,
    title: 'Leads',
    body: 'Every enquiry in one list, followed up until the person books a trial class or says no.',
  },
]

/* Studio types Studio Light can back today (fact sheet, 2026-10-01). Martial
   arts and dance are left out on purpose: no belt tracking, no family
   accounts, no term registration yet. Pilates and spin say plainly that
   booking is by place, not by reformer or bike. */
const studioTypes = [
  {
    title: 'Yoga studios',
    body: 'A timetable, bookings with waitlists, class packs and memberships. What a yoga studio runs on, every week.',
  },
  {
    title: 'CrossFit and HYROX boxes',
    body: 'WOD programming next to the class schedule, memberships and drop-ins, and competitions and team tests on the coaching side.',
  },
  {
    title: 'Pilates and spin studios',
    body: 'Class booking, packs and memberships. Booking is by place in the class; members do not pick a specific reformer or bike.',
  },
  {
    title: 'Personal-training studios',
    body: 'One-to-one sessions from the calendar, programming and nutrition per client, and the membership side for those who train on their own.',
  },
]

const FAQ = [
  {
    q: 'What does the fitness studio software cost?',
    a: '$79 a month, or $790 a year, for one location. Every coaching feature is included, and members use the client app for free. There is a 14-day trial without a card.',
  },
  {
    q: 'Can members check themselves in?',
    a: 'Not yet. Check-in happens at the front desk: staff find the member in two letters and see membership and open balance on the same screen.',
  },
  {
    q: 'Can members book classes online?',
    a: 'Yes. The schedule has a public page for booking. Full classes have a waitlist, and the next person gets an email when a place opens. Booking is by place in the class, not by a specific bike or reformer.',
  },
  {
    q: 'We have more than one location. Is Studio Light right for us?',
    a: 'Studio Light is built for one location. Several sites, a head office or a large front-desk team are the gym product, from €149 a month.',
  },
  {
    q: 'Do I need a separate coaching app for my trainers?',
    a: 'No. Studio Light is part of the Prometheus coaching account: programming, nutrition, video review and video calls are in the same place as the members.',
  },
]

/* The studio product as structured data: one price, one location, the same
   sentence as the page. */
const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Prometheus Studio Light',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      url: 'https://prometheus.coach/studios/',
      description:
        'Fitness studio software for one location: classes, bookings and waitlists, memberships, check-in at the desk, point of sale, shifts and accounting, in the same account used for coaching.',
      publisher: { '@type': 'Organization', '@id': 'https://prometheus.coach/#org', name: 'Prometheus' },
      offers: { '@type': 'Offer', price: '79', priceCurrency: 'USD', url: 'https://prometheus.coach/studios/' },
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

export default function StudiosPage() {
  return (
    <>
      <Head>
        <html lang="en" />
        {/* Titled for Caitlin's main search, "fitness studio software"
            (480/mo, difficulty 36, Stage 1 audit 2026-09-25); the
            description carries the management and gym wording. */}
        <title>Fitness studio software for one location | Prometheus</title>
        <meta
          name="description"
          content="Fitness studio software for one location: classes, bookings, memberships, check-in, point of sale, shifts and accounting in one account. $79 a month."
        />
        <link rel="canonical" href="https://prometheus.coach/studios/" />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Fitness studio software — Prometheus Studio Light" />
        <meta
          property="og:description"
          content="One studio, one account: classes, memberships, check-in, point of sale, shifts and books, next to your programming and nutrition. $79 a month."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prometheus.coach/studios/" />
        <meta property="og:image" content="https://prometheus.coach/images/og/studios.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(LD)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">

        <div className="relative z-10">
          <HomeNav overDark />

          {/* Dark zone one (2026-10-03): the front desk at dusk carries on
              behind the problem and the studio surfaces, then dusk to day. */}
          <div className="zone-dark relative isolate">
          {/* ── Hero ─────────────────────────────────────────────────────── */}
            {/* The front desk at dusk (2026-10-02): the studio side of the
                product starts at the counter, so the page opens there. */}
            <PhotoHero
              photo="/images/gym/reception-dusk.webp"
              focus="65% center"
              eyebrow="Fitness studio software"
              title="Coach on the floor."
              accent="Run the studio from the same account."
              body="Studio management software for one location: classes and bookings, memberships, check-in at the desk, point of sale, shifts and the books. One switch in the account you coach from, $79 a month."
            >
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <a href={SIGNUP_STUDIO} className="btn btn-primary btn-lg">
                  Start free — 14 days, no card <ArrowRight size={18} />
                </a>
                <a href="#included" className="btn btn-ghost-light btn-lg">
                  What&rsquo;s included
                </a>
              </div>
            </PhotoHero>

            <div className="relative isolate">
              <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none fade-y" aria-hidden="true">
                <img src="/images/gym/front-desk.webp" alt="" loading="lazy" className="w-full h-full object-cover object-[center_45%] opacity-[0.14]" />
              </div>
          {/* ── The problem ──────────────────────────────────────────────── */}
              <Section tone="raised" width="narrow">
                <SectionHeader
                  align="left"
                  eyebrow="Why this exists"
                  title="Two systems, one member,"
                  accent="twice the typing."
                />
                <Reveal delay={0.06} className="mt-7 max-w-2xl space-y-5 text-muted leading-relaxed text-lg">
                  <p>
                    Studio software assumes an administrator behind a desk. Coaching software
                    assumes a coach with a client list. A small studio is both — usually the
                    same person, often on the same afternoon.
                  </p>
                  <p>
                    So the member gets entered twice, the two lists drift apart, and you find
                    out at the worst possible moment: at the door, with the member standing
                    in front of you, in a system that says their membership ended.
                  </p>
                </Reveal>
              </Section>

              {/* ── What's included ──────────────────────────────────────────── */}
              <Section id="included">
                <SectionHeader
                  align="left"
                  eyebrow="Included"
                  title="The studio side,"
                  accent="in the order your day happens."
                  subline="Turned on with one switch. Everything below is part of Studio Light, at one price."
                />

                <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {surfaces.map((s, i) => (
                    <Reveal key={s.title} delay={i * 0.06} y={24} className="card rounded-3xl p-7 flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent-dark flex items-center justify-center mb-5">
                        <s.icon size={22} />
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight">{s.title}</h3>
                      <p className="mt-3.5 text-muted leading-relaxed">{s.body}</p>
                    </Reveal>
                  ))}
                </div>

                {/* The coaching side is the reason a coach is on this page at all —
                    stating it here prevents the page from reading as "gym admin
                    software that also does training". */}
                <Reveal delay={0.1} y={24} className="mt-6 card-strong rounded-3xl p-8 lg:p-10">
                  <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight">
                    And everything you coach with stays.
                  </h3>
                  <p className="mt-4 text-muted leading-relaxed max-w-2xl">
                    Studio Light is added to the coaching product, not carved out of it. Nothing
                    below is a separate plan.
                  </p>
                  <div className="mt-7 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {[
                      'Programming, periodisation and your exercise library',
                      'Nutrition plans, macros and your own food library',
                      'Video review with annotations and check-ins',
                      'Video calls, built in — not a link to somewhere else',
                      'The client app on iPhone and Android, free for every member',
                      'Invoices, subscriptions and recurring billing',
                    ].map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <Check size={16} className="text-accent-dark shrink-0 mt-1" />
                        <span className="text-ink/80 leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </Section>

            </div>
          </div>
          <div className="dusk-to-day" aria-hidden="true" />

          {/* ── Studio types ───────────────────────────────────────────── */}
          <Section tone="raised">
            <SectionHeader
              align="left"
              eyebrow="Boutique fitness software"
              title="The studios it fits today."
              accent="And what it does not do yet."
              subline="A studio owner wants to see their own world. These are the ones Studio Light covers now; pages for each type follow."
            />
            <div className="mt-12 grid sm:grid-cols-2 gap-5">
              {studioTypes.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.05} y={22} className="card rounded-3xl p-7">
                  <h3 className="text-xl font-semibold tracking-tight">{t.title}</h3>
                  <p className="mt-3 text-muted leading-relaxed">{t.body}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.1} className="mt-6 text-muted leading-relaxed max-w-3xl">
              Martial arts schools and dance studios need belt gradings, family accounts and
              term registration. Studio Light does not have those yet, so we do not sell it to
              them yet.
            </Reveal>
          </Section>

          <PhotoBreak
            bleed
            src="/images/gym/strength-dusk.webp"
            focus="center 50%"
            statement="The work happens on the floor."
            accent="The software belongs there too — not in a back office."
          />
          {/* Dark zone two: the strength room runs edge to edge into graphite;
              the switch and the honest sizing stand in it. */}
          <div className="zone-dark relative isolate">
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none fade-y" aria-hidden="true">
              <img src="/images/gym/coaching-floor.webp" alt="" loading="lazy" className="w-full h-full object-cover object-[center_60%] opacity-[0.12]" />
            </div>


            {/* ── It's a switch ────────────────────────────────────────────── */}
            <Section tone="raised" width="narrow">
              <SectionHeader
                align="left"
                eyebrow="How it turns on"
                title="It is a switch,"
                accent="not a migration."
              />
              <Reveal delay={0.06} className="mt-7 max-w-2xl space-y-5 text-muted leading-relaxed text-lg">
                <p>
                  Studio Light is part of your Prometheus account rather than a product you
                  buy next to it. Turn it on and the studio surfaces appear. Your clients,
                  programmes and history stay exactly where they are.
                </p>
                <p>
                  Nothing to import, nothing to reconcile, and no week spent typing your
                  member list into a second place. Turn it off again and the studio side
                  disappears — the coaching side never noticed.
                </p>
              </Reveal>
            </Section>

            {/* ── Honest about size ────────────────────────────────────────── */}
            <Section width="narrow">
              <SectionHeader
                align="left"
                eyebrow="Who it fits"
                title="Built for one location,"
                accent="and honest about it."
              />
              <Reveal delay={0.06} className="mt-7 max-w-2xl space-y-5 text-muted leading-relaxed text-lg">
                <p>
                  One studio and a handful of trainers: that is what Studio Light is for. A
                  box, a boutique, a personal-training studio with a door that needs opening.
                </p>
                <p>
                  A gym with its own front desk, staff and a thousand members, or several
                  sites with a head office, is the full gym product: every feature, from
                  €149 a month.{' '}
                  <Link to="/" className="text-accent-dark hover:text-accent underline underline-offset-4">
                    Prometheus for gyms
                  </Link>
                  .
                </p>
              </Reveal>
            </Section>

          </div>
          <div className="dusk-to-day" aria-hidden="true" />

          {/* ── What you pay today ───────────────────────────────────────── */}
          <Section>
            <SectionHeader
              align="left"
              eyebrow="The comparison"
              title="Add up what the studio pays today."
              accent="Then look at one number."
              subline="Member billing here, class booking there, a check-in system, a till, a coaching app for the trainers. Type in what each one costs the studio per month."
            />
            <StackCalculator
              mode="studio"
              rows={STUDIO_ROWS}
              cta="Start free — 14 days, no card"
              href={SIGNUP_STUDIO}
              className="mt-10"
            />
          </Section>

          {/* ── Questions ───────────────────────────────────────────────── */}
          <Section width="narrow">
            <SectionHeader align="left" eyebrow="Questions" title="What studio owners" accent="ask first." />
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
            <Reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <Link to="/mindbody-alternative/" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
                <ArrowRight size={14} className="text-accent-dark" /> Coming from Mindbody
              </Link>
              <Link to="/pricing/" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
                <ArrowRight size={14} className="text-accent-dark" /> All prices
              </Link>
              <Link to="/" className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
                <ArrowRight size={14} className="text-accent-dark" /> Gym management software for bigger gyms
              </Link>
            </Reveal>
          </Section>

          {/* ── Price ────────────────────────────────────────────────────── */}
          <Section tone="raised" width="narrow">
            <Reveal className="card-strong rounded-3xl p-9 lg:p-12 text-center">
              <p className="eyebrow mb-5">Price</p>
              <p className="display text-5xl lg:text-6xl">$79<span className="text-2xl text-muted"> / month</span></p>
              <p className="mt-3 text-muted">or $790 a year — two months free</p>
              <p className="mt-7 text-muted leading-relaxed max-w-xl mx-auto">
                One price for the studio. Every coaching feature is included, and your
                members never pay to use the app you coach them in.
              </p>
              <a
                href={SIGNUP_STUDIO}
                className="btn btn-primary btn-lg mt-9"
              >
                Start free — 14 days, no card <ArrowRight size={18} />
              </a>
            </Reveal>
          </Section>

          <FinalCta
            title="Try it on next week’s schedule."
            body="Put one week of classes in and see whether the door starts running itself. That takes an evening and costs nothing."
            href={SIGNUP_STUDIO}
          />

          <HomeFooter />
        </div>
      </div>
    </>
  )
}
