import { Dumbbell, Apple, MessageSquareText, Video, Receipt, Smartphone } from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../site/Section'

/* The problem, then the answer — deliberately adjacent.
 *
 * The problem is stated in three sentences and no bullet list: a coach reading
 * a bulleted list of his own frustrations skims it. A paragraph he recognises
 * he finishes.
 *
 * The included grid is the counterpunch to add-on pricing, which is how the
 * competition prices nutrition, video and payments. It names no competitor:
 * comparative advertising is legal but only with current, provable prices, and
 * theirs change. Describing the pattern lands harder than a name anyway.
 *
 * Laid out as a bento: the two cards that have a screenshot get the width to
 * show it, the other four stay compact. Six equal tiles was the part of the
 * old page that looked most like every other product page.
 */

const included = [
  {
    icon: Dumbbell,
    title: 'Training',
    body: 'Programmes, periodisation, your exercise library, reusable routines.',
    shot: ['/images/coach/app-library.webp', 'Building a programme from the exercise library'],
  },
  {
    icon: Apple,
    title: 'Nutrition',
    body: 'Plans, macros and your own food library — not a separate subscription.',
  },
  {
    icon: MessageSquareText,
    title: 'Feedback',
    body: 'Video review with annotations, check-ins and messaging in one thread.',
  },
  {
    icon: Video,
    title: 'Video calls',
    body: 'Built in. Not a link to somewhere else that you paste by hand.',
  },
  {
    icon: Smartphone,
    title: 'Your clients’ app',
    body: 'iPhone and Android, free for every client you coach.',
  },
  {
    icon: Receipt,
    title: 'Payments',
    body: 'Invoices, subscriptions, recurring billing and the bookkeeping behind them.',
    shot: ['/images/coach/app-invoices.webp', 'Invoices and recurring billing inside the coaching app'],
  },
]

function Icon({ icon: I }) {
  return (
    <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent-dark flex items-center justify-center mb-5">
      <I size={21} />
    </div>
  )
}

export default function Included() {
  return (
    <>
      <Section tone="raised" width="narrow">
        <SectionHeader
          align="left"
          eyebrow="The problem"
          title="You did not become a coach"
          accent="to copy numbers between apps."
        />
        <Reveal delay={0.06} className="mt-7 max-w-2xl space-y-5 text-lg text-muted leading-relaxed">
          <p>
            Programmes in one app, macros in another, feedback in a chat thread, calls on
            a link you paste by hand, invoices in a document you rewrite every month.
          </p>
          <p>
            Every handover is a place where something gets lost — and every one of them is
            time you cannot bill.
          </p>
        </Reveal>
      </Section>

      <Section id="included">
        <SectionHeader
          align="left"
          eyebrow="What you get"
          title="Everything included."
          accent="Not “available as an add-on”."
          subline="One price covers the list below. Nutrition is not an upgrade, video is not an upgrade, and your clients never pay to use the app you coach them in."
        />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {included.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 0.05}
              y={24}
              className={`card rounded-3xl overflow-hidden flex flex-col ${
                f.shot ? 'md:col-span-2' : ''
              }`}
            >
              <div className="p-7 pb-6">
                <Icon icon={f.icon} />
                <h3 className="text-xl font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-muted leading-relaxed max-w-md">{f.body}</p>
              </div>
              {f.shot && (
                <div className="px-7 pt-1 mt-auto">
                  <div className="shot rounded-t-xl overflow-hidden border-b-0">
                    <img
                      src={f.shot[0]}
                      alt={f.shot[1]}
                      width="1400" height="876" loading="lazy" className="w-full block"
                    />
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
