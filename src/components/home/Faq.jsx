import { Section, SectionHeader } from '../site/Section'

/* Five questions a coach asks before signing up, answered in plain prose.
 *
 * Two jobs. For the visitor: the answers to the objections that stop a trial
 * (is it really all included, do my clients pay, is there a free plan). For
 * search: an AI answer or a featured snippet can only quote a sentence that
 * exists on the page in extractable form, and the homepage had none — every
 * fact lived in a card or a headline. The same answers go out as FAQPage
 * JSON-LD from HomePage.jsx; keep FAQ and the structured data identical.
 *
 * Native <details>: no JS, works in the prerendered HTML, and the text is in
 * the DOM whether the item is open or not.
 */
export const FAQ = [
  {
    q: 'What does the personal trainer software cost?',
    a: 'From $19 a month for up to 5 clients, rising to $89 a month for up to 70. Every feature is in every plan — you pay for how many clients you coach, not for which parts of the product you may open. Paying yearly gives you two months free.',
  },
  {
    q: 'Is there a free plan?',
    a: 'No. There is a 14-day trial that does not ask for a card. After that it is a paid product; that is what pays for the support and the development behind it.',
  },
  {
    q: 'Do my clients have to pay for the app?',
    a: 'No. The client app is free on iPhone and Android for every client you coach, for as long as you coach them.',
  },
  {
    q: 'Are nutrition, video review and video calls extra?',
    a: 'No. Nutrition plans and macro tracking, video review with annotations, built-in video calls, messaging and invoicing are in every plan. There is no tier that unlocks them.',
  },
  {
    q: 'Can I use it for a studio as well as for coaching?',
    a: 'Yes. Studio Light adds check-in at the door, class scheduling, memberships, point of sale, shifts and bookkeeping to the same account for $79 a month. Chains with several sites are a separate product currently in pilot.',
  },
]

export default function Faq() {
  return (
    <Section width="narrow">
      <SectionHeader
        align="left"
        eyebrow="Questions"
        title="Asked before"
        accent="starting a trial."
      />
      <div className="mt-10 divide-y divide-line border-y border-line">
        {FAQ.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-lg font-semibold tracking-tight">{f.q}</h3>
              <span
                aria-hidden="true"
                className="mt-1 w-6 h-6 rounded-full border border-line-strong flex items-center justify-center text-muted shrink-0 transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-muted leading-relaxed max-w-2xl">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  )
}
