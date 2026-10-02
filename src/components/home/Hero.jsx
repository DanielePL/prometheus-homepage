import { ArrowRight } from 'lucide-react'
import { SIGNUP } from '../../lib/links'

/* The one line a coach has to recognise as his own within two seconds.
 *
 * Not "we are the operating system for fitness businesses" — that is what the
 * old German hero said, and it describes us rather than him. The pain is not
 * "I have no software", it is "I have five, and none of them talk to each
 * other". Everything else on the page argues from that sentence.
 *
 * Since 2026-10-02 the hero is a room, not a gradient: a full-bleed photograph
 * of a gym before opening, orange light lines on dark concrete (owner: "dezent
 * und powerful"). The type sits left on a scrim, white. The page below stays
 * light — the photograph is the one heavy moment above the fold.
 *
 * The screenshot is still the proof. There is no adoption number to show, and
 * a small number answers "does anyone use this?" with no. The dashboard rises
 * out of the photograph into the white page, so the first scroll lands on the
 * working product, not on a promise.
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

        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-36 lg:pt-48 pb-40 sm:pb-48 lg:pb-64">
          <div className="max-w-[58rem] hero-rise">
            {/* The search phrase is the first line of the <h1>, styled as the
                chip, so the heading itself says what the page ranks for. "app"
                because the largest measured query is "personal training apps
                for personal trainers" (Keyword Planner, 2026-08-20). */}
            <h1>
              <span className="eyebrow eyebrow-photo">Personal trainer software &amp; app</span>
              <span className="block display text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[5rem]">
                Five tools, one client.{' '}
                <span className="text-white/50 font-medium">That was never the plan.</span>
              </span>
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-white/72 leading-relaxed max-w-xl">
              Programming, nutrition, check-ins, video calls and payments in one account
              and one client app — so the work you sell is the work you actually do, not
              the admin around it.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <a href={SIGNUP} className="btn btn-primary btn-lg">
                Start free — 14 days, no card <ArrowRight size={18} />
              </a>
              <a href="#included" className="btn btn-ghost-light btn-lg">
                See what&rsquo;s included
              </a>
            </div>
            {/* The price, in the hero, because the first gym customer bought on
                price alone (owner, 2026-09-24). The comparison is in the
                structure of the sentence, not in anyone else's number. */}
            <div className="mt-10 flex items-center gap-4">
              <span className="light-line" aria-hidden="true" />
              <p className="text-base text-white/65">
                <span className="font-semibold text-white">From $19 a month, all of it.</span>{' '}
                Not a base price plus nutrition, plus video, plus invoicing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The product, rising out of the room into the page. */}
      <div className="relative z-10 px-5 sm:px-8 -mt-28 sm:-mt-36 lg:-mt-48 pb-12 lg:pb-20">
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
