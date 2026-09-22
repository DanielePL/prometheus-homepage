import { ArrowRight } from 'lucide-react'
import { Reveal } from '../site/Section'
import { SIGNUP } from '../../lib/links'

/* The one line a coach has to recognise as his own within two seconds.
 *
 * Not "we are the operating system for fitness businesses" — that is what the
 * old German hero said, and it describes us rather than him. The pain is not
 * "I have no software", it is "I have five, and none of them talk to each
 * other". Everything else on the page argues from that sentence.
 *
 * The screenshot is the proof section. There is no adoption number to show
 * (seven coach accounts, zero coach-client links on 2026-08-18), and a small
 * number answers "does anyone use this?" with no. Showing the working product
 * answers the question a coach actually asks first: is this real, or a landing
 * page for something half-built.
 *
 * Centered, on white, with a warm glow behind the frame: the dark dashboard
 * sits in a browser frame so it reads as an object on the page. Dark app on a
 * light page is contrast, not inconsistency.
 */
export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 lg:pt-40 pb-12 lg:pb-20 px-5 sm:px-8 overflow-hidden">
      <div className="hero-glow absolute inset-x-0 top-0 h-[70vh] pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center hero-rise">
          {/* The search phrase is the first line of the <h1>, styled as the
              chip, so the heading itself says what the page ranks for. The
              hook stays what it is — it is the line a coach recognises, and
              no keyword is worth trading it for. "app" because the largest
              measured query is "personal training apps for personal trainers"
              (Keyword Planner, 2026-08-20), and the page said only "software". */}
          <h1>
            <span className="eyebrow">Personal trainer software &amp; app</span>
            <span className="block display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.75rem]">
              Five tools, one client.{' '}
              <span className="display-soft">That was never the plan.</span>
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl mx-auto">
            Programming, nutrition, check-ins, video calls and payments in one account
            and one client app — so the work you sell is the work you actually do, not
            the admin around it.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <a href={SIGNUP} className="btn btn-primary btn-lg">
              Start free — 14 days, no card <ArrowRight size={18} />
            </a>
            <a href="#included" className="btn btn-secondary btn-lg">
              See what&rsquo;s included
            </a>
          </div>
        </div>

        <Reveal delay={0.1} y={30} className="mt-14 lg:mt-20 relative">
          <div className="absolute inset-x-[10%] top-1/3 bottom-0 bg-accent/15 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
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
        </Reveal>
      </div>
    </section>
  )
}
