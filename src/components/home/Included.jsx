import { Dumbbell, Apple, MessageSquareText, Video, Receipt, Smartphone } from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../site/Section'
import ShotVideo from '../site/ShotVideo'

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
 * Three rows. Training and Nutrition each carry a screenshot side by side —
 * the two things every coach sells, and the two the competition charges extra
 * for. Then the three short cards. Then Payments across the full width with a
 * moving loop of the invoice list, because "recurring billing" is a claim and
 * a list of paid invoices is a fact.
 *
 * Captures: public/images/coach/*.webp and public/videos/app-*.{mp4,webm},
 * taken from the Coach app's demo dataset on the QA account (2026-09-24),
 * dark theme, English. Demo names, no customer.
 */

function Icon({ icon: I }) {
  return (
    <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent-dark flex items-center justify-center mb-5">
      <I size={21} />
    </div>
  )
}

function ShotCard({ icon, title, body, src, alt, delay = 0 }) {
  return (
    <Reveal delay={delay} y={24} className="card rounded-3xl overflow-hidden flex flex-col">
      <div className="p-7 pb-6">
        <Icon icon={icon} />
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-2 text-muted leading-relaxed max-w-md">{body}</p>
      </div>
      <div className="px-7 pt-1 mt-auto">
        <div className="shot rounded-t-xl overflow-hidden border-b-0">
          <img src={src} alt={alt} width="1600" height="1000" loading="lazy" className="w-full block" />
        </div>
      </div>
    </Reveal>
  )
}

function SmallCard({ icon, title, body, delay = 0 }) {
  return (
    <Reveal delay={delay} y={24} className="card rounded-3xl p-7 flex flex-col">
      <Icon icon={icon} />
      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-muted leading-relaxed">{body}</p>
    </Reveal>
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

        <div className="mt-12 grid lg:grid-cols-2 gap-4">
          <ShotCard
            icon={Dumbbell}
            title="Training"
            body="Programmes, periodisation, your exercise library, reusable routines."
            src="/images/coach/app-library.webp"
            alt="Building a programme from the exercise library"
          />
          <ShotCard
            icon={Apple}
            title="Nutrition"
            body="Meal plans with calorie and macro targets, assigned to a client in one click. Your own food library — not a separate subscription."
            src="/images/coach/app-nutrition.webp"
            alt="The nutrition library: meal-plan templates with calories and macros, ready to assign to a client"
            delay={0.05}
          />
        </div>

        <div className="mt-4 grid md:grid-cols-3 gap-4">
          <SmallCard icon={MessageSquareText} title="Feedback" body="Video review with annotations, check-ins and messaging in one thread." />
          <SmallCard icon={Video} title="Video calls" body="Built in. Not a link to somewhere else that you paste by hand." delay={0.05} />
          <SmallCard icon={Smartphone} title="Your clients’ app" body="iPhone and Android, free for every client you coach." delay={0.1} />
        </div>

        <Reveal delay={0.1} y={24} className="mt-4 card rounded-3xl overflow-hidden grid lg:grid-cols-[0.8fr_1.2fr] items-center">
          <div className="p-7 lg:p-9">
            <Icon icon={Receipt} />
            <h3 className="text-xl font-semibold tracking-tight">Payments</h3>
            <p className="mt-2 text-muted leading-relaxed max-w-md">
              Invoices, subscriptions, recurring billing and the bookkeeping behind them.
              Who has paid, who has not, and what is due — without a spreadsheet.
            </p>
          </div>
          <div className="px-7 lg:pl-0 lg:pr-9 pb-7 lg:py-9">
            <ShotVideo
              src="/videos/app-invoices"
              poster="/images/coach/loop-invoices.webp"
              alt="The invoice list: paid, sent and overdue invoices with amounts and due dates"
              width={1600}
              height={1000}
              className="shot rounded-xl overflow-hidden"
            />
          </div>
        </Reveal>
      </Section>
    </>
  )
}
