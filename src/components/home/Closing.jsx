import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../site/Section'
import { SIGNUP, PRICING } from '../../lib/links'

/* The last three blocks: who built it, what it costs, and the ask.
 *
 * They live in one file because none of them is more than a screenful and they
 * only ever appear together, in this order, at the bottom of the homepage.
 */

/* Verified against prometheus_coach/src/integrations/stripe/config.ts on
   2026-08-18. Four rungs of a ten-rung ladder — the full ladder belongs on the
   pricing page, and printing ten near-identical numbers here reads as
   complication rather than choice. */
const tiers = [
  { clients: 5, price: 19 },
  { clients: 15, price: 35, popular: true },
  { clients: 30, price: 49 },
  { clients: 70, price: 89 },
]

export function Makers() {
  return (
    <Section>
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16">
        <SectionHeader
          align="left"
          eyebrow="Who builds this"
          title="Built by coaches,"
          accent="not by a software company."
        />
        <Reveal delay={0.06} className="space-y-5 text-lg text-muted leading-relaxed lg:pt-12">
          <p>
            We are coaches, sport scientists, developers and athletes. The training logic
            comes from people who have run the sessions, and the software from people who
            have shipped before.
          </p>
          <p>
            {/* No "founded by a world champion". The owner cut it himself: it makes the
                company depend on one person, and the first question a buyer asks is what
                happens when that person stops. */}
            That is also why nothing here is named after one person. You are buying
            software for your business, and it has to outlast any of us.
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

export function Pricing() {
  return (
    <Section id="pricing" tone="raised">
      <SectionHeader
        eyebrow="Pricing"
        title="From $19 a month."
        accent="Every feature, every plan."
        subline="You pay for how many clients you coach — not for which parts of the product you are allowed to open."
      />

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiers.map((t, i) => (
          <Reveal
            key={t.clients}
            delay={i * 0.06}
            y={24}
            className={`rounded-3xl p-7 ${t.popular ? 'card-night' : 'card'}`}
          >
            <div className="flex items-center justify-between">
              <p className={`text-sm ${t.popular ? 'text-white/60' : 'text-muted'}`}>
                up to {t.clients} clients
              </p>
              {t.popular && (
                <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-accent-light">
                  Most common
                </span>
              )}
            </div>
            <p className="mt-4 text-5xl font-semibold tracking-tight">
              ${t.price}
              <span className={`text-base font-normal ${t.popular ? 'text-white/50' : 'text-muted'}`}> /mo</span>
            </p>
            <a
              href={SIGNUP}
              className={`btn mt-6 w-full text-sm ${t.popular ? 'btn-primary' : 'btn-secondary'}`}
            >
              Start free
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} y={24} className="mt-4 card rounded-3xl p-8 lg:p-10">
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-3">
          {[
            'Ten sizes between 5 and 70 clients — move up or down as you go',
            'Two months free when you pay yearly',
            'The client app is free for every client, on both platforms',
            'Running a studio? Studio Light is $79 a month, all in',
          ].map((l) => (
            <div key={l} className="flex items-start gap-3">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/12 text-accent-dark flex items-center justify-center shrink-0">
                <Check size={12} strokeWidth={3} />
              </span>
              <span className="text-ink/80 leading-snug">{l}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a href={SIGNUP} className="btn btn-primary btn-lg">
            Start free — 14 days, no card <ArrowRight size={18} />
          </a>
          <a href={PRICING} className="btn btn-secondary btn-lg">
            See every plan
          </a>
        </div>

        <p className="mt-6 text-sm text-muted leading-relaxed">
          Prices in US dollars, the same everywhere. Studio owners:{' '}
          <Link to="/studios/" className="text-accent-dark hover:text-accent underline underline-offset-4">
            what Studio Light adds
          </Link>
          .
        </p>
      </Reveal>
    </Section>
  )
}

/* The one dark block on the page. The footer follows it on the same ground,
   so the page closes dark the way the product opens dark. */
export function FinalCta({ title = 'Try it with one client.', body, href = SIGNUP, children }) {
  return (
    <Section tone="night" width="narrow" className="text-center overflow-hidden">
      <div
        className="absolute inset-x-0 -top-40 h-[32rem] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(50% 60% at 50% 40%, rgba(230,126,34,0.28) 0%, rgba(230,126,34,0) 70%)' }}
      />
      <Reveal className="relative">
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white">{title}</h2>
        <p className="mt-6 text-lg text-white/65 leading-relaxed max-w-xl mx-auto">
          {body ?? 'Set up a single client and see whether it saves you an evening. That takes a few minutes and costs nothing.'}
        </p>
        <a href={href} className="btn btn-primary btn-lg mt-9">
          Start free — 14 days, no card <ArrowRight size={18} />
        </a>
        {children}
      </Reveal>
    </Section>
  )
}
