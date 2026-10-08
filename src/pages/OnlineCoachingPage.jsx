import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Dumbbell, Video, MessageSquare, Salad, Wallet, Target, Check,
} from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import PhotoHero from '../components/site/PhotoHero'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { FinalCta } from '../components/home/Closing'
import { SIGNUP } from '../lib/links'

/* /online-coaching-software/ — the Coach front door (2026-10-08).
 *
 * Why this page exists next to /coach/: Caitlin's Stage 1 audit (25 Sep 2026)
 * found no page owning the searches a trainer types when choosing a tool:
 * "online coaching platform" (480/mo, difficulty 13), "software for personal
 * trainers" (480, 21), "online personal trainer software" (320, 24) and, long
 * term, "personal trainer software" (480, 67). /coach/ is the former homepage
 * and sells the product as a story (win, coach, keep, get paid). This page
 * answers the shopping question instead: what does an online coach need, and
 * which part of Prometheus does each job. Each job links down to its feature
 * page, so the feature pages get a parent and the reader gets depth on demand.
 *
 * Facts are the ones checked against the code on 2026-10-01 (fact sheet for
 * Caitlin). Deliberately not said: no weekly check-in form (we have intake
 * questionnaires), no exercise-video count, nothing about where data is
 * stored. Wise and Revolut are not payment providers here.
 *
 * Competitor names appear only as labels of links to the switching pages,
 * where they are allowed (repo CLAUDE.md, Inhaltsregeln).
 */

const PATH = 'https://prometheus.coach/online-coaching-software/'

/* The six jobs of a coach whose clients are not in the room, in the order a
   week runs: plan, watch, talk, feed, get paid, find the next client. */
const jobs = [
  {
    icon: Dumbbell,
    title: 'Programme the training',
    body: 'Build workouts and programmes from your exercise library, plan seasons and blocks, and assign them. Clients log every set in the free client app on iPhone or Android.',
  },
  {
    icon: Video,
    title: 'Check form from a distance',
    body: 'Clients send a video of the lift. You answer on the video itself, drawing on the frame, so the correction sits where the problem is.',
    link: { to: '/video-review/', label: 'Video review' },
  },
  {
    icon: MessageSquare,
    title: 'Stay in touch',
    body: 'Messages in one inbox, and video calls built in, one-to-one or with a whole team. No link to another service, no second login for the client.',
  },
  {
    icon: Salad,
    title: 'Coach the nutrition',
    body: 'Meal plans with calorie and macro targets, your own food library, and clients who log meals by photo, next to their training.',
    link: { to: '/nutrition/', label: 'Nutrition coaching' },
  },
  {
    icon: Wallet,
    title: 'Get paid, wherever the client is',
    body: 'Invoices, quotes and recurring invoices. Clients pay through Stripe, Xendit, Razorpay or dLocal, and you can price your plans in 18 currencies.',
    link: { to: '/payments/', label: 'Invoicing and payments' },
  },
  {
    icon: Target,
    title: 'Win the next client',
    body: 'A sales pipeline for leads and discovery calls, intake questionnaires and documents for the start, and a public booking page for the first call.',
    link: { to: '/sales-assistant/', label: 'Sales assistant' },
  },
]

const FAQ = [
  {
    q: 'Is this for online coaches or for personal trainers in a gym?',
    a: 'Both. Online coaches use the client app, video review, messaging and video calls to coach people they rarely see. Personal trainers in a gym use the same account for programming, a calendar with a booking page, and team sessions with a live floor view.',
  },
  {
    q: 'What does it cost?',
    a: 'From $19 a month for up to 5 clients, up to $89 a month for 70. Every plan has every feature; the price only follows how many clients you coach. There is a 14-day trial without a card, and no free plan.',
  },
  {
    q: 'Do my clients pay for the app?',
    a: 'No. The client app is free on iPhone and Android for every client you coach.',
  },
  {
    q: 'Can clients in other countries pay me?',
    a: 'Yes. Client payments run through Stripe, Xendit, Razorpay or dLocal (dLocal for one-off payments only), and you can price your plans in 18 currencies, from US dollars and euros to Thai baht and Indian rupees.',
  },
  {
    q: 'I already use another coaching app. How do I move my clients?',
    a: 'The app has a migration centre for moving clients over from another tool. The trial runs 14 days, so you can move a few clients first and keep the rest where they are until you are sure.',
  },
]

const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': PATH,
      url: PATH,
      name: 'Online coaching platform for personal trainers',
      description:
        'Software for personal trainers and online coaches: programming, form checks, messaging, video calls, nutrition and payments in one account.',
      isPartOf: { '@id': 'https://prometheus.coach/#site' },
      about: { '@id': 'https://prometheus.coach/#app' },
      inLanguage: 'en',
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

export default function OnlineCoachingPage() {
  return (
    <>
      <Head>
        <html lang="en" />
        <title>Online coaching platform for personal trainers | Prometheus</title>
        <meta
          name="description"
          content="Software for personal trainers and online coaches: programming, nutrition, form checks, calls and payments in one account. From $19 a month, 14-day trial."
        />
        <link rel="canonical" href={PATH} />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Online coaching platform for personal trainers" />
        <meta
          property="og:description"
          content="Programme, check form, talk, coach nutrition and get paid, for clients you rarely see. From $19 a month."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PATH} />
        <meta property="og:image" content="https://prometheus.coach/images/og/online-coaching.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(LD)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav overDark />

        <PhotoHero
          photo="/images/gym/coaching-floor.webp"
          focus="center 55%"
          eyebrow="Online coaching platform"
          title="Software for personal trainers"
          accent="whose clients train somewhere else."
          body="Programming, form checks, messages, video calls, nutrition and payments in one account, with a free app for your clients. From $19 a month."
          shot={
            <img
              src="/images/coach/app-dashboard.webp"
              alt="The Prometheus coach dashboard: today's sessions, client activity and outstanding check-ins"
              width="2048"
              height="1282"
              className="w-full block"
            />
          }
        >
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href={SIGNUP} className="btn btn-primary btn-lg">
              Start free — 14 days, no card <ArrowRight size={18} />
            </a>
            <Link to="/pricing/" className="btn btn-ghost-light btn-lg">
              See every plan
            </Link>
          </div>
        </PhotoHero>

        {/* ── The jobs ───────────────────────────────────────────────── */}
        <Section>
          <SectionHeader
            align="left"
            eyebrow="What it does"
            title="Six jobs of an online coach."
            accent="One place for each."
            subline="The week of a coach whose clients are not in the room, and the part of Prometheus that does each job."
          />
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((j, i) => (
              <Reveal key={j.title} delay={i * 0.05} y={24} className="card rounded-3xl p-7 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent-dark flex items-center justify-center mb-5">
                  <j.icon size={22} />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{j.title}</h3>
                <p className="mt-3.5 text-muted leading-relaxed flex-1">{j.body}</p>
                {j.link && (
                  <Link to={j.link.to} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark hover:text-accent">
                    {j.link.label} <ArrowRight size={14} />
                  </Link>
                )}
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ── Client app ─────────────────────────────────────────────── */}
        <Section tone="raised">
          <div className="grid gap-12 lg:gap-16 items-center lg:grid-cols-[1fr_1.05fr]">
            <div>
              <SectionHeader
                align="left"
                eyebrow="The client app"
                title="Your clients get an app."
                accent="It costs them nothing."
              />
              <Reveal delay={0.06} className="mt-7 space-y-5 text-lg text-muted leading-relaxed">
                <p>
                  The programme, the log, the meal plan, the messages and the video calls sit in
                  one app on iPhone and Android. Your clients download it, you invite them, and
                  the coaching happens there.
                </p>
                <p>
                  No spreadsheet, no PDF plan, no chat app on the side. When a client trains at
                  6 a.m. in another time zone, the sets are in your client record when you open it.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} y={26} className="relative flex justify-center gap-5 sm:gap-8 py-6">
              <div className="absolute inset-x-[15%] top-[20%] bottom-[10%] bg-accent/15 blur-[90px] rounded-full pointer-events-none" aria-hidden="true" />
              {[
                ['/images/coach/app-mobile-training.webp', "The client app: this week's training"],
                ['/images/coach/app-mobile-workout.webp', 'Logging a set inside the client app'],
              ].map(([src, alt], n) => (
                <div key={src} className={`${n === 1 ? 'mt-12' : ''} relative w-[46%] max-w-[230px]`}>
                  <div className="phone-shell"><div className="phone-screen"><span className="phone-island" aria-hidden="true" /><img src={src} alt={alt} width="640" height="1385" loading="lazy" /></div></div>
                </div>
              ))}
            </Reveal>
          </div>
        </Section>

        {/* ── In the gym too ─────────────────────────────────────────── */}
        <Section width="narrow">
          <SectionHeader
            align="left"
            eyebrow="Fitness trainer software"
            title="Coach in person as well?"
            accent="Same account."
          />
          <Reveal delay={0.06} className="mt-7 space-y-5 text-lg text-muted leading-relaxed max-w-2xl">
            <p>
              Most coaches do both. The calendar has a public booking page for sessions, teams
              get team tests and a live floor view, and competitions have their own planning
              and a competition-day view.
            </p>
            <p>
              If you run your own room, Studio Light adds classes, memberships, check-in at the
              desk and a till to the same account:{' '}
              <Link to="/studios/" className="text-accent-dark hover:text-accent underline underline-offset-4">
                software for a fitness studio
              </Link>
              .
            </p>
          </Reveal>
        </Section>

        {/* ── Price ──────────────────────────────────────────────────── */}
        <Section tone="raised" width="narrow">
          <Reveal className="card-strong rounded-3xl p-9 lg:p-12 text-center">
            <p className="eyebrow mb-5">Price</p>
            <p className="display text-5xl lg:text-6xl">From $19<span className="text-2xl text-muted"> / month</span></p>
            <p className="mt-3 text-muted">up to 5 clients · $35 for 15 · $89 for 70</p>
            <p className="mt-7 text-muted leading-relaxed max-w-xl mx-auto">
              Every plan has every feature. The price follows how many clients you coach,
              never which parts of the product you may use. Paying yearly gives you two
              months free.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <a href={SIGNUP} className="btn btn-primary btn-lg">
                Start free — 14 days, no card <ArrowRight size={18} />
              </a>
              <Link to="/pricing/" className="btn btn-secondary btn-lg">
                All ten plans
              </Link>
            </div>
          </Reveal>
        </Section>

        {/* ── Switching ──────────────────────────────────────────────── */}
        <Section width="narrow">
          <SectionHeader
            align="left"
            eyebrow="Switching"
            title="Already paying for a coaching app?"
            accent="Move a few clients first."
          />
          <Reveal delay={0.06} className="mt-7 text-lg text-muted leading-relaxed max-w-2xl">
            <p>
              The migration centre moves clients over from another tool. Start with a handful
              during the trial and keep the rest where they are until you are sure.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 grid sm:grid-cols-3 gap-3">
            {[
              ['/trainerize-alternative/', 'Coming from Trainerize'],
              ['/truecoach-alternative/', 'Coming from TrueCoach'],
              ['/everfit-alternative/', 'Coming from Everfit'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="card rounded-2xl px-5 py-4 flex items-center justify-between gap-3 font-semibold hover:border-ink transition-colors">
                {label} <ArrowRight size={16} className="text-accent-dark shrink-0" />
              </Link>
            ))}
          </Reveal>
        </Section>

        {/* ── Questions ──────────────────────────────────────────────── */}
        <Section tone="raised" width="narrow">
          <SectionHeader align="left" eyebrow="Questions" title="Asked before" accent="starting." />
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
            {[
              ['/nutrition/', 'Nutrition coaching'],
              ['/video-review/', 'Video review'],
              ['/payments/', 'Invoicing and payments'],
              ['/sales-assistant/', 'Sales assistant'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="inline-flex items-center gap-1.5 text-muted hover:text-ink">
                <Check size={14} className="text-accent-dark" /> {label}
              </Link>
            ))}
          </Reveal>
        </Section>

        <FinalCta
          title="Try it with one client."
          body="Invite one client, send one programme and one meal plan, and see whether it saves you an evening. Fourteen days, no card."
        />
        <HomeFooter />
      </div>
    </>
  )
}
