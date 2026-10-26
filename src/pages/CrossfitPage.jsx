import { useCallback, useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import {
  ArrowRight, Check, Coins, Clock, Languages, MapPin, Maximize2, X,
} from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import AskModal from '../components/site/AskModal'
import { SIGNUP_STUDIO } from '../lib/links'

/* /crossfit/ — Studio Light for CrossFit boxes and PT studios in Asia, in English, USD.
 *
 * Born 2026-10-26 as /crossfit/, renamed /crossfit/ the same day, for a call with a country head who wants to take Prometheus
 * to boxes across South Asia (owner: "Coach Studio wie /schweiz/, die Mobiles
 * müssen rein wegen Class-Buchungen und Bezahlen"). Same build as /schweiz/
 * and /fussball/: Higgsfield scenes between real product screens, one request
 * form. Unlinked, noindex, Disallow, not in the sitemap until the owner makes
 * it public. ?for=<Name> personalises the closing in the browser only.
 *
 * Every claim was checked against the code on 2026-10-26 (prometheus_coach
 * webapp HEAD 80353659, member apps iOS + Android):
 * - $79 / $790, USD outside CH/EU (webapp src/lib/billingCurrency.ts), 14-day
 *   trial. "No card" is NOT verified for studio_light, so it is not here.
 * - Members book and cancel classes in the iOS and Android app
 *   (BoxScheduleRepository / BoxScheduleService), join with a 6-digit studio
 *   code (studio-member-link-claim). WOD on the class with scaling, scores,
 *   benchmark WODs, coach whiteboard Rx before Scaled.
 * - Do NOT claim: memberships bought in the app (Enterprise only), local
 *   wallets (UPI, PayNow, GrabPay), INR or India as a studio country, GST
 *   filing, card-terminal integration, Hindi/Thai/Malay UI, several sites.
 * - Payments: drop-ins run on the studio's own Stripe account, but
 *   stripe-connect-init still creates every account as CH. Until the country
 *   is passed through, payments are told as "set up with you per country",
 *   the same as the point of sale (owner: "POS würden wir bei regem Interesse
 *   in den entsprechenden Ländern anmelden").
 *
 * Scenes are AI (public/crossfit/), no logos, no faces in focus. They never
 * pretend to be product; the product proof is the real screens. */

const TOPICS = [
  { key: 'partner', label: 'Bringing Prometheus to my country' },
  { key: 'switch', label: 'Moving from our current system' },
  { key: 'boxes', label: 'Several boxes' },
  { key: 'questions', label: 'Just a few questions' },
]

const COPY = {
  title: 'Tell us about your box.',
  lead: 'No commitment. The Prometheus team gets back to you.',
  org: 'Box or studio',
  message: 'How does your box run today? Which system, how many members, which country?',
  thanks: 'We have your request. The Prometheus team gets back to you.',
  error: 'That did not work. Write to us directly at',
  subject: 'Prometheus for our box',
}

const LABELS = { eyebrow: 'Request', name: 'Name *', email: 'Email *', phone: 'Phone', send: 'Send request', close: 'Close', thanks: 'Thank you' }

/* The member app, three whole iOS screens (simulator, 2026-10-17), the same
   frames as /schweiz/ and /fussball/. */
const PHONES = [
  ['/images/teamsport/ios-training.webp', 'Member app: the training week, catch up on missed sessions, quick start'],
  ['/images/teamsport/ios-exercise.webp', 'Member app: an exercise with video and technique guide'],
  ['/images/teamsport/ios-stats.webp', 'Member app: stats and readiness from energy, sleep, nutrition and stress'],
]

const INCLUDED = [
  'Class schedule and bookings',
  'WODs with scaling and scores',
  'Members and memberships',
  'Member app, iPhone and Android',
  'Check-in at the desk',
  'Point of sale',
  'Shifts and payroll hours',
  'Programming, nutrition, video review',
]

const REGION = [
  { icon: Coins, title: 'Your currency', text: 'Set the box to SGD, MYR, THB, IDR, PHP, VND or USD. Prices, drop-ins and the books run in it.' },
  { icon: Clock, title: 'Your time zone', text: 'The schedule, bookings and cancellation windows run on your local time, not ours.' },
  { icon: Languages, title: 'In English', text: 'Coach Web and the member app on iPhone and Android are fully in English.' },
  { icon: MapPin, title: 'Set up per country', text: 'Payments and the point of sale follow local rules. We set them up with the first boxes in each country.' },
]

function Hero({ onAsk }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white min-h-[92svh] flex items-end">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img src="/crossfit/hero.webp" alt="" aria-hidden="true" className="photo-zoom-slow w-full h-full object-cover object-[40%_center]" />
      </div>
      <div className="photo-scrim-hero absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-gradient-to-b from-transparent to-graphite" aria-hidden="true" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-20 lg:pb-28">
        <div className="max-w-[56rem] hero-rise">
          <h1>
            <span className="eyebrow eyebrow-photo">Software for boxes and PT studios in Asia</span>
            <span className="block display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.6rem]">
              Your whole box in one system.{' '}
              <span className="text-white/50 font-medium">$79 a month. Everything in it.</span>
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl">
            Classes, bookings, WODs, members, point of sale, shifts and the books, for one location.
            Your members book their class and train in the Prometheus app on iPhone and Android.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href={SIGNUP_STUDIO} className="btn btn-primary btn-lg">
              Try it for 14 days <ArrowRight size={18} />
            </a>
            <button type="button" onClick={() => onAsk()} className="btn btn-ghost-light btn-lg">Talk to us</button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pain() {
  return (
    <section className="relative isolate overflow-hidden bg-graphite text-white">
      <div className="relative h-[70svh] min-h-[28rem] max-h-[52rem]">
        <img src="/crossfit/pain.webp" alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite via-transparent to-graphite" aria-hidden="true" />
        <div className="absolute inset-0 bg-night/45" aria-hidden="true" />
        <Reveal className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
            <p className="display text-3xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl">
              Sign-up sheets on a clipboard. Bookings in five chat groups. Cash in a box.
              The WOD as a photo of the whiteboard.{' '}
              <span className="text-white/55 font-medium">And every evening the same question: who is coming at six?</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Scene({ photo }) {
  return <img src={photo} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
}

/* A real screen floating on a darkened scene, as on /schweiz/ and /fussball/. */
function ScreenOnPhoto({ photo, src, alt, onZoom }) {
  return (
    <button type="button" onClick={() => onZoom({ src, alt })} aria-label={`${alt}, show large`} className="group absolute inset-0 isolate cursor-zoom-in text-left">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-night" aria-hidden="true">
        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-night/60 via-night/30 to-night/75" />
      </div>
      <div className="absolute inset-4 sm:inset-8 overflow-hidden rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] bg-night">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-left-top" />
      </div>
      <span className="absolute right-6 bottom-6 sm:right-10 sm:bottom-10 inline-flex items-center gap-1.5 rounded-full bg-night/80 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur opacity-80 transition-opacity group-hover:opacity-100" aria-hidden="true">
        <Maximize2 size={13} /> Show large
      </span>
    </button>
  )
}

function Phones({ photo, onZoom }) {
  return (
    <div className="absolute inset-0 isolate flex items-center justify-center gap-3 sm:gap-5 px-4">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-night" aria-hidden="true">
        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/30 to-night/80" />
      </div>
      {PHONES.map(([src, alt], i) => (
        <div
          key={src}
          className={`h-[88%] aspect-[900/1955] rounded-[16%/7.4%] bg-neutral-900 p-[2.2%] ring-1 ring-white/30 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out hover:z-20 hover:scale-[1.65] ${i === 1 ? 'z-10 scale-105' : ''}`}
        >
          <button type="button" onClick={() => onZoom({ src, alt, tall: true })} aria-label={`${alt}, show large`} className="block h-full w-full cursor-zoom-in">
            <img src={src} alt={alt} loading="lazy" className="h-full w-full rounded-[14%/6.5%]" />
          </button>
        </div>
      ))}
    </div>
  )
}

function Zoom({ shot, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={shot.alt} className="modal-scrim fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-8 cursor-zoom-out overflow-auto">
      <button type="button" onClick={onClose} aria-label="Close" className="fixed top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20">
        <X size={22} />
      </button>
      <img
        src={shot.src}
        alt={shot.alt}
        className={shot.tall ? 'max-h-[94svh] w-auto rounded-[2rem] ring-1 ring-white/15 shadow-2xl' : 'max-w-full max-h-[94svh] w-auto rounded-xl ring-1 ring-white/15 shadow-2xl'}
      />
    </div>
  )
}

/* One job beside its scene or screen; even jobs on the raised tone with the
   media left, odd ones on paper with the media right. */
function Job({ i, id, eyebrow, title, accent, children, media, pop }) {
  const flip = i % 2 === 1
  return (
    <Section id={id} tone={flip ? 'default' : 'raised'}>
      <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <Reveal className={`relative rounded-3xl aspect-[16/10] ${pop ? 'z-10 hover:z-30' : 'overflow-hidden bg-night'}`}>
          {media}
        </Reveal>
        <div>
          <SectionHeader align="left" eyebrow={eyebrow} title={title} accent={accent} />
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-lg text-muted leading-relaxed max-w-xl">{children}</div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Region() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <img src="/crossfit/skyline.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-night/50 to-night" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-36">
        <Reveal>
          <span className="eyebrow eyebrow-photo">Built for the region</span>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl mt-6 max-w-4xl">
            Your currency, your time zone,{' '}
            <span className="text-white/55 font-medium">your rules.</span>
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            A box in Singapore does not run like a box in Zürich. Prometheus is set up for the country
            the box is in, and we go country by country with the boxes that start first.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4 mt-14">
          {REGION.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.05} className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur p-6 sm:p-7">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-accent/15 text-accent-light">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-white/65 leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Price() {
  return (
    <Section id="price" tone="raised">
      <SectionHeader
        eyebrow="Price"
        title="One box, one price."
        accent="Everything in it."
        subline="No modules, no tiers by feature. The member app on iPhone and Android is part of it."
      />
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-4 mt-14 max-w-5xl mx-auto">
        <Reveal className="card rounded-3xl p-8 ring-2 ring-accent">
          <p className="text-sm font-medium text-muted">Studio Light</p>
          <p className="display text-6xl mt-3">$79</p>
          <p className="text-muted mt-1">a month, one location</p>
          <p className="mt-4 text-ink">or $790 a year, two months free</p>
          <p className="mt-6 text-sm text-muted">14 days to try it. Billed in USD.</p>
          <a href={SIGNUP_STUDIO} className="btn btn-primary mt-7 w-full justify-center">
            Start the trial <ArrowRight size={16} />
          </a>
        </Reveal>
        <Reveal delay={0.06} className="card rounded-3xl p-8">
          <p className="text-sm font-medium text-muted">Included</p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-3">
            {INCLUDED.map((x) => (
              <li key={x} className="flex items-start gap-2 text-ink">
                <Check size={18} className="text-accent mt-0.5 shrink-0" /> {x}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}

function Closing({ onAsk }) {
  const [name, setName] = useState('')
  /* Read in an effect, never during render: the prerendered HTML carries no
     name, and hydration must match it. */
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get('for')
    if (n) setName(n.replace(/[^\p{L}\p{N}\s.'&-]/gu, '').trim().slice(0, 60))
  }, [])
  return (
    <Section id="contact" tone="night" width="narrow" className="text-center overflow-hidden isolate lg:py-40">
      <img src="/crossfit/hero.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-50" />
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{ background: 'linear-gradient(180deg, rgba(15,15,18,0.6) 0%, rgba(15,15,18,0.75) 55%, #0F0F12 100%)' }}
      />
      <Reveal className="relative">
        <span className="light-line mx-auto mb-8" aria-hidden="true" />
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white">
          {name ? `Prometheus for ${name}.` : 'Let’s talk.'}
        </h2>
        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
          Tell us how your box runs today. We show you your schedule, your memberships and your WODs in
          Prometheus, and what it takes to start in your country.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <button type="button" onClick={() => onAsk()} className="btn btn-primary btn-lg">
            Send a request <ArrowRight size={18} />
          </button>
          <a href={SIGNUP_STUDIO} className="btn btn-ghost-light btn-lg">Try it for 14 days</a>
        </div>
      </Reveal>
    </Section>
  )
}

export default function CrossfitPage() {
  const [ask, setAsk] = useState(null)
  const close = useCallback(() => setAsk(null), [])
  const onAsk = (topics = []) => setAsk(topics)
  const [zoom, setZoom] = useState(null)
  const closeZoom = useCallback(() => setZoom(null), [])
  return (
    <>
      <Head>
        <html lang="en" />
        <title>Box and studio software for Asia | Prometheus</title>
        <meta name="description" content="Classes, bookings, WODs, members, point of sale and shifts for one location, with the member app on iPhone and Android. $79 a month, everything in it." />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://prometheus.coach/crossfit/" />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:title" content="Your whole box in one system. $79 a month." />
        <meta property="og:description" content="Classes, bookings, WODs, members and point of sale, with the member app on iPhone and Android." />
        <meta property="og:image" content="https://prometheus.coach/crossfit/og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <HomeNav overDark links={[]} signup="#contact" signupLabel="Talk to us" />
      <main>
        <Hero onAsk={onAsk} />
        <Pain />

        <Job i={0} id="classes" eyebrow="Classes and bookings" title="They book the six o’clock" accent="from their phone." media={<Scene photo="/crossfit/community.webp" />}>
          <p>Your members see the week’s classes in the Prometheus app on iPhone and Android, book a spot and cancel it again. No chat group, no list at the door.</p>
          <p>Full is full: the app checks the places left, the membership and the credits before a spot is taken, and closes cancellations when your window closes. You see who is coming before the class starts.</p>
        </Job>

        <Job i={1} pop eyebrow="Member app" title="The WOD is on the phone" accent="before they walk in." media={<Phones photo="/crossfit/app.webp" onZoom={setZoom} />}>
          <p>You put the WOD on the class, with its scaling. Members see it ahead of time, log their score in the app, and find the benchmark WODs to test themselves against.</p>
          <p>On the coach’s screen the class whiteboard ranks the scores, Rx before Scaled. Training plans, every exercise with a video, personal records and nutrition live in the same app.</p>
        </Job>

        <Job i={2} eyebrow="Joining and paying" title="New members join with your code." accent="The money goes to you." media={<Scene photo="/crossfit/pay.webp" />}>
          <p>A new member downloads the app and enters your box’s six-digit code, or your team signs them up at the desk. Either way they are in your system, with their membership.</p>
          <p>Payments run through your box’s own payment account, so the money goes straight to you, not through us. Which ways to pay your members get depends on the country; we set that up with you when your box starts.</p>
        </Job>

        <Job i={3} eyebrow="Coach Web for your coaches" title="Program once." accent="Every set comes back." media={<ScreenOnPhoto photo="/crossfit/coach.webp" src="/images/coach/app-library.webp" alt="Coach Web: building a programme from the exercise library" onZoom={setZoom} />}>
          <p>Every coach gets Coach Web in the browser. They build programmes from the exercise library and assign them; the plan shows up in the member’s app at once, and every set comes back.</p>
          <p>Personal training clients sit in the same account as the box: video review, nutrition and messages included.</p>
        </Job>

        <Job i={4} eyebrow="The desk" title="Check-in, the counter," accent="the shifts and the books." media={<Scene photo="/crossfit/desk.webp" />}>
          <p>Your team checks members in at the desk and sells shakes, drop-ins and merchandise at the point of sale: cash, card, vouchers or transfer. Shifts are planned in the same place, and the hours go to payroll.</p>
          <p>Every country has its own rules for receipts and tax. We register the point of sale in each country as boxes there start, so it fits where you are.</p>
        </Job>

        <Region />
        <Price />
        <Closing onAsk={onAsk} />
      </main>
      <HomeFooter />
      {zoom && <Zoom shot={zoom} onClose={closeZoom} />}
      {ask && <AskModal topics={TOPICS} preset={ask} source="prometheus.coach/crossfit" copy={COPY} labels={LABELS} onClose={close} />}
    </>
  )
}
