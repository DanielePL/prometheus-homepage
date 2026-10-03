import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../site/Section'
import ShotVideo from '../site/ShotVideo'

/* What the app does for a coach, told as four jobs rather than a feature list.
 *
 * Owner, 2026-10-03: a visitor decides on two things at the same height — what
 * the app does for him, and what it costs. "Ich zahle, um mir das Leben zu
 * vereinfachen und mehr Erfolg zu haben." So the page no longer lists tools
 * (Training, Nutrition, Feedback …) and leaves the translation to the reader;
 * it names the four jobs every coach has — win clients, coach them, keep them,
 * get paid — and puts the tools underneath as proof.
 *
 * This replaced four sections (Included, SalesAssistant, Doors, ClientApp)
 * after our SEO lead found the page had no thread: the pain was stated three
 * times, "no add-ons" four times, and studio and chain doors sat in the middle
 * of the argument. Studios and chains now have their own pages and one nav link.
 *
 * The client app is part of "coach them", not a section of its own: the coach
 * buys one account, and the app his clients hold is half of it. VBT is not on
 * this page at all (owner: "das sind wir VBT-Nerds im Hintergrund").
 *
 * Every fact below is the one already checked on the feature pages
 * (/sales-assistant/, /nutrition/, /video-review/, /payments/). Captures:
 * public/images/coach/ and public/videos/app-*, demo dataset, 2026-09-24/25.
 */

const JOBS = [
  {
    title: 'Win clients.',
    accent: 'Not only look after the ones you have.',
    body: 'Most coaching software stops at delivery. Here an enquiry becomes a discovery call, and every call ends with a transcript, a summary and a follow-up email draft waiting for you.',
    points: [
      'A pipeline from new lead to won, so nobody waits on you unnoticed',
      'One permanent call link for prospects and clients',
      'The follow-up is drafted — you read, adjust, send',
    ],
    more: [['/sales-assistant/', 'How the sales assistant works']],
    media: { kind: 'shot', src: '/images/coach/app-sales.webp', alt: 'The sales pipeline: new leads, scheduled calls, calls done, follow-ups, won and lost', width: 1600, height: 700 },
  },
  {
    title: 'Coach them properly.',
    accent: 'Without typing everything twice.',
    body: 'Programmes, meal plans and feedback live in one place, and your clients get the app they train with — free, on iPhone and Android. They log every set, photograph their meals and send their videos; you see it while it happens.',
    points: [
      'Programmes from your own exercise library, reusable routines',
      'Meal plans with calorie and macro targets, assigned in one click',
      'Video review with annotations, messaging and calls built in',
    ],
    more: [['/nutrition/', 'Nutrition'], ['/video-review/', 'Video review']],
    media: { kind: 'pair', src: '/images/coach/app-library.webp', alt: 'Building a programme from the exercise library', phone: '/images/coach/app-mobile-workout.webp', phoneAlt: 'The client app: logging a set during the session' },
  },
  {
    title: 'Keep them.',
    accent: 'See who is drifting before they cancel.',
    body: 'The client list shows how many days it has been since each client last trained, checked in or wrote. Ask the assistant who needs attention and it answers from your own data.',
    points: [
      'Who has gone quiet, at a glance, at the top of the list',
      'Check-ins and progress photos in one thread per client',
      'A message on Tuesday instead of a cancellation on the first',
    ],
    media: { kind: 'video', src: '/videos/app-clients', poster: '/images/coach/loop-clients.webp', alt: 'The client list, showing who is active and who has gone quiet' },
  },
  {
    title: 'Get paid.',
    accent: 'Without a spreadsheet.',
    body: 'Invoices, subscriptions and recurring billing in the account you coach from, with the books behind them. Who has paid, who has not and what is due.',
    points: [
      'Recurring billing for monthly coaching, blocks and plans',
      'Four payment providers: Stripe, dLocal, Razorpay, Xendit',
      'Income, expenses and the tax building up, month and year to date',
    ],
    more: [['/payments/', 'Invoicing & payments']],
    media: { kind: 'video', src: '/videos/app-invoices', poster: '/images/coach/loop-invoices.webp', alt: 'The invoice list: paid, sent and overdue invoices with amounts and due dates' },
  },
]

function Media({ m }) {
  if (m.kind === 'video') {
    return (
      <ShotVideo src={m.src} poster={m.poster} alt={m.alt} width={1600} height={1000} className="shot rounded-2xl overflow-hidden" />
    )
  }
  if (m.kind === 'pair') {
    /* The coach's screen with the client's phone in front of it: the one
       picture of what is being bought — an account for you, an app for them. */
    return (
      <div className="relative pr-8 sm:pr-14 pb-10">
        <div className="shot rounded-2xl overflow-hidden">
          <img src={m.src} alt={m.alt} width="1600" height="1000" loading="lazy" className="w-full block" />
        </div>
        <div className="absolute right-0 bottom-0 w-[30%] max-w-[180px]">
          <div className="phone-shell">
            <div className="phone-screen">
              <span className="phone-island" aria-hidden="true" />
              <img src={m.phone} alt={m.phoneAlt} width="640" height="1385" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="shot rounded-2xl overflow-hidden">
      <img src={m.src} alt={m.alt} width={m.width} height={m.height} loading="lazy" className="w-full block" />
    </div>
  )
}

export default function Outcomes() {
  return (
    <Section id="included">
      <SectionHeader
        align="left"
        eyebrow="What it does for you"
        title="Four jobs every coach has."
        accent="One app does all four."
        subline="Every one of them is in every plan, from the smallest to the largest."
      />

      <div className="mt-16 lg:mt-20 space-y-20 lg:space-y-28">
        {JOBS.map((j, i) => (
          <div key={j.title} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal y={24} className={i % 2 ? 'lg:order-2' : ''}>
              <p className="text-sm font-semibold text-accent-dark tabular-nums">0{i + 1}</p>
              <h3 className="display mt-3 text-3xl sm:text-4xl">
                {j.title} <span className="display-soft">{j.accent}</span>
              </h3>
              <p className="mt-5 text-lg text-muted leading-relaxed">{j.body}</p>
              <ul className="mt-6 space-y-3">
                {j.points.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/12 text-accent-dark flex items-center justify-center shrink-0">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span className="text-ink/80 leading-snug">{p}</span>
                  </li>
                ))}
              </ul>
              {j.more && (
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                  {j.more.map(([to, label]) => (
                    <Link key={to} to={to} className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-dark hover:text-accent">
                      {label} <ArrowRight size={14} />
                    </Link>
                  ))}
                </div>
              )}
            </Reveal>
            <Reveal delay={0.08} y={26} className={i % 2 ? 'lg:order-1' : ''}>
              <Media m={j.media} />
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  )
}
