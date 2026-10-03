import { ArrowRight } from 'lucide-react'
import { SIGNUP } from '../../lib/links'

/* Five seconds: what the app does for a coach, and what it costs.
 *
 * Owner, 2026-10-03: price and capability decide at the same height. An app
 * that does nothing is worth nothing even free; one that does everything but
 * costs a lot draws "I don't need that feature, can we talk about price?". So
 * both go into the <h1> itself — not the pain ("Five tools, one client", which
 * was here until then and named the problem but neither the answer nor the
 * price), and not a price line under the buttons, which on a phone sat below
 * the fold.
 *
 * The headline names the jobs in the coach's words (win clients, coach them,
 * get paid); the section below takes them one by one. The price line answers
 * the feature objection before it is raised: the price follows client count,
 * never features, so there is nothing to take out.
 *
 * Since 2026-10-02 the hero is a room: a full-bleed photograph of a gym before
 * opening (owner: "dezent und powerful"). The dashboard rises out of it, so
 * the first scroll lands on the working product, not on a promise.
 */
export default function Hero() {
  return (
    <>
      <section id="hero" className="relative isolate overflow-hidden bg-night text-white">
        <img
          src="/images/gym/hall-opening.webp"
          alt=""
          aria-hidden="true"
          width="1696"
          height="960"
          fetchPriority="high"
          className="photo-push absolute inset-0 -z-20 w-full h-full object-cover object-[60%_center]"
        />
        <div className="photo-scrim-hero absolute inset-0 -z-10" aria-hidden="true" />
        {/* The photograph does not end at an edge: its lower third dissolves
            into graphite, the ground of the zone below. */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 -z-10 bg-gradient-to-b from-transparent to-graphite" aria-hidden="true" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-36 lg:pt-48 pb-40 sm:pb-48 lg:pb-64">
          <div className="max-w-[58rem] hero-rise">
            {/* The search phrase is the first line of the <h1>, styled as the
                chip, so the heading itself says what the page ranks for. "app"
                because the largest measured query is "personal training apps
                for personal trainers" (Keyword Planner, 2026-08-20). */}
            <h1>
              <span className="eyebrow eyebrow-photo">Personal trainer software &amp; app</span>
              <span className="block display text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[5rem]">
                Win clients, coach them, get paid.{' '}
                <span className="text-white/50 font-medium">One app, from <span className="text-white">$19</span> a month.</span>
              </span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-white/72 leading-relaxed max-w-xl">
              Programmes, nutrition, check-ins, video calls, payments and a sales assistant
              in one account — and a free app for your clients on iPhone and Android.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a href={SIGNUP} className="btn btn-primary btn-lg">
                Start free — 14 days, no card <ArrowRight size={18} />
              </a>
              <a href="#included" className="btn btn-ghost-light btn-lg">
                See what it does
              </a>
            </div>
            {/* The objection a coach raises when the list is long — "I don't
                need all of that, can we do something on price?" — answered
                before it is asked. */}
            <div className="mt-10 flex items-center gap-4">
              <span className="light-line" aria-hidden="true" />
              <p className="text-base text-white/65">
                <span className="font-semibold text-white">You pay for how many clients you coach.</span>{' '}
                Never for features — the smallest plan has all of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The product, floating in the room. Behind it the same photograph
          carries on, blurred and darker, and fades out downward — so the hero
          and the zone below read as one continuous space. */}
      <div className="relative z-10 px-5 sm:px-8 -mt-28 sm:-mt-36 lg:-mt-48 pb-16 lg:pb-24">
        <div className="absolute inset-x-0 top-24 sm:top-36 lg:top-48 h-[115%] -z-10 overflow-hidden pointer-events-none fade-down" aria-hidden="true">
          <img
            src="/images/gym/hall-opening.webp"
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-[60%_85%] scale-110 blur-2xl opacity-45"
          />
        </div>
        {/* hero-rise, not Reveal: this sits above the fold on load, and
            nothing above the fold may wait for JS to become visible. */}
        <div className="max-w-6xl mx-auto relative hero-rise" style={{ animationDelay: '0.15s' }}>
          <div className="absolute inset-x-[12%] top-1/4 bottom-0 bg-accent/20 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
          <div className="shot relative rounded-2xl overflow-hidden">
            <div className="shot-bar" aria-hidden="true"><i /><i /><i /></div>
            <img
              src="/images/coach/app-dashboard.webp"
              alt="The Prometheus coach dashboard: today's sessions, client activity and outstanding check-ins"
              width="2048"
              height="1282"
              className="w-full block"
            />
          </div>
        </div>
      </div>
    </>
  )
}
