import { ArrowRight, Check } from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../site/Section'
import ShotVideo from '../site/ShotVideo'
import { SIGNUP } from '../../lib/links'

/* The differentiator. Everyone else helps a coach deliver; this also helps him
 * sell, and that is the part that decides whether he earns more this year.
 *
 * The headline points at the category, not at the reader. An earlier draft read
 * "Selling is the part nobody taught you" and was cut for exactly that reason —
 * it tells a stranger what he was never taught, which is a claim about him we
 * have no standing to make. Aiming the same argument at the competition keeps
 * the punch and is provable.
 */

const points = [
  'Turn enquiries into paying clients instead of unanswered messages',
  'Discovery calls in the app, with the notes written for you',
  'See who is drifting while you can still do something about it',
]

export default function SalesAssistant() {
  return (
    <Section tone="raised">
      <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 items-center">
        <div>
          <SectionHeader
            align="left"
            eyebrow="The assistant"
            title="Most coaching software"
            accent="stops at delivery."
          />
          <Reveal delay={0.06} className="mt-7 space-y-5 text-lg text-muted leading-relaxed">
            <p>
              This one also helps you sell. The assistant follows up on enquiries, drafts
              the offer, and tells you which client is drifting before they cancel.
            </p>
            <p>
              Growth stops depending on whether you felt like writing that message on a
              Sunday evening.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-8 space-y-3">
            {points.map((p) => (
              <div key={p} className="flex items-start gap-3">
                <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/12 text-accent-dark flex items-center justify-center shrink-0">
                  <Check size={12} strokeWidth={3} />
                </span>
                <span className="text-ink/80 leading-snug">{p}</span>
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.16}>
            <a href={SIGNUP} className="btn btn-primary btn-lg mt-9">
              Start free — 14 days, no card <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={26} className="relative">
          <div className="absolute inset-2 bg-accent/15 blur-[70px] rounded-full pointer-events-none" aria-hidden="true" />
          {/* A moving loop of the client list, not a still: the point of this
              block is that the list tells you who is drifting, and a list that
              scrolls reads as live. Poster first, video only near the viewport,
              nothing above the fold hangs on it (see ShotVideo). */}
          <ShotVideo
            src="/videos/app-clients"
            poster="/images/coach/loop-clients.webp"
            alt="The client list, showing who is active and who has gone quiet"
            width={1600}
            height={1000}
            className="shot rounded-2xl overflow-hidden lg:rotate-[-1deg] lg:translate-x-4"
          />
        </Reveal>
      </div>
    </Section>
  )
}
