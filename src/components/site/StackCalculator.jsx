import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './Section'

/* "Add up what you pay today."
 *
 * The first gym customer bought on price alone (owner, 2026-09-24): he paid
 * less with us than with the tools he had. The obvious way to sell that is a
 * table of competitor prices with a line through them. We do not do that:
 * under EU and Swiss comparative-advertising rules a printed competitor price
 * has to be correct on the day it is read, and theirs change monthly. A
 * stale one is misleading advertising, and it would drag competitor names
 * onto pages that deliberately carry none.
 *
 * So the visitor types in his own bill. Every line is a tool category, not a
 * vendor; the number is his; the total is his; and the line through it is
 * through his own number. Nothing on this component is a claim about anyone
 * else. The only figure we supply is our own price, from stripe/config.ts.
 *
 * Renders usable HTML without JavaScript (inputs and a zero total); the live
 * sum needs hydration, which is fine below the fold.
 */

const LADDER = [
  [5, 19], [10, 29], [15, 35], [20, 39], [25, 45],
  [30, 49], [40, 59], [50, 69], [60, 79], [70, 89],
]

export const COACH_ROWS = [
  'Programming and client management',
  'Nutrition and macro tracking',
  'Video review and feedback',
  'Video calls',
  'Invoicing and payment fees',
  'Scheduling and booking',
  'The app your clients use',
]

export const STUDIO_ROWS = [
  'Member management and billing',
  'Class schedule and booking',
  'Check-in and access at the door',
  'Point of sale',
  'Shifts and staff planning',
  'Coaching and programming app for members',
  'Invoicing and bookkeeping',
]

function money(n) {
  return `$${Math.round(n).toLocaleString('en-US')}`
}

/* `mode="coach"` shows the client-count picker and our rung; `mode="studio"`
   compares against the flat Studio Light price. */
export default function StackCalculator({ mode = 'coach', rows, cta, href, className = '' }) {
  const [values, setValues] = useState(() => rows.map(() => ''))
  const [clients, setClients] = useState(15)

  const total = values.reduce((sum, v) => sum + (parseFloat(String(v).replace(',', '.')) || 0), 0)
  const ours = mode === 'studio' ? 79 : (LADDER.find(([c]) => c === clients) || LADDER[2])[1]
  const filled = total > 0
  const saving = total - ours

  const set = (i, v) => setValues((prev) => prev.map((x, j) => (j === i ? v : x)))

  return (
    <Reveal className={`card rounded-3xl overflow-hidden ${className}`}>
      <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: his bill */}
        <div className="p-7 lg:p-9 border-b lg:border-b-0 lg:border-r border-line">
          <h3 className="text-xl font-semibold tracking-tight">Add up what you pay today.</h3>
          <p className="mt-2 text-muted leading-relaxed max-w-md">
            Per month, per tool. Include the ones billed per client or as a percentage of
            what your clients pay you. Nothing you type here leaves your browser.
          </p>
          <div className="mt-6 space-y-1">
            {rows.map((label, i) => (
              <label key={label} className="flex items-center justify-between gap-4 py-2 border-b border-line">
                <span className="text-sm text-ink/80 leading-snug">{label}</span>
                <span className="flex items-center gap-1 shrink-0">
                  <span className="text-muted text-sm">$</span>
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="1"
                    placeholder="0"
                    value={values[i]}
                    onChange={(e) => set(i, e.target.value)}
                    className="w-24 h-9 rounded-lg border border-line-strong bg-paper px-3 text-right text-sm tabular-nums focus:outline-none focus:border-ink"
                    aria-label={`${label}, dollars per month`}
                  />
                </span>
              </label>
            ))}
          </div>
          <div className="mt-5 flex items-baseline justify-between gap-4">
            <span className="text-sm font-semibold">Your total per month</span>
            <span
              className={`text-2xl font-semibold tracking-tight tabular-nums ${
                filled && saving > 0 ? 'line-through decoration-accent decoration-[3px] text-muted' : ''
              }`}
              aria-live="polite"
            >
              {money(total)}
            </span>
          </div>
        </div>

        {/* Right: ours */}
        <div className="p-7 lg:p-9 bg-tint flex flex-col">
          <p className="text-sm text-muted">All of the above, with us</p>
          {mode === 'coach' ? (
            <>
              <label className="mt-3 flex items-center justify-between gap-3 text-sm">
                <span className="text-ink/80">How many clients do you coach?</span>
                <select
                  value={clients}
                  onChange={(e) => setClients(Number(e.target.value))}
                  className="h-9 rounded-lg border border-line-strong bg-paper px-2 text-sm"
                  aria-label="Number of clients"
                >
                  {LADDER.map(([c]) => (
                    <option key={c} value={c}>up to {c}</option>
                  ))}
                </select>
              </label>
            </>
          ) : (
            <p className="mt-3 text-sm text-ink/80">One location, every trainer, every member.</p>
          )}
          <p className="mt-5 text-5xl font-semibold tracking-tight tabular-nums">
            {money(ours)}<span className="text-base font-normal text-muted"> /month</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            {mode === 'coach'
              ? 'Every feature in every plan. Client app free.'
              : 'Studio Light, all in. Client app free for every member.'}
          </p>

          <div className="mt-6 min-h-[3.5rem]" aria-live="polite">
            {filled && saving > 0 && (
              <p className="text-ink leading-snug">
                <span className="font-semibold">{money(saving)} a month stays with you.</span>
                {' '}{money(saving * 12)} a year, and more in the account than you have now.
              </p>
            )}
            {filled && saving <= 0 && (
              <p className="text-muted leading-snug">
                Then price is not your reason to switch. One account instead of several is.
              </p>
            )}
            {!filled && (
              <p className="text-muted leading-snug">
                If your total is more than {money(ours)}, the difference is yours to keep — and you get more for it.
              </p>
            )}
          </div>

          <a href={href} className="btn btn-primary mt-auto">
            {cta} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </Reveal>
  )
}
