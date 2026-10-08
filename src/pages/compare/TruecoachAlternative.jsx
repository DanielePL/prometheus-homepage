import ComparisonPage from '../../components/site/ComparisonPage'
import {
  COACH_FACTS, COACH_WORTH, COACH_NOT_WORTH, COACH_STEPS, COACH_ARGUMENT, COACH_FAQ_BASE,
} from './shared'

/* /truecoach-alternative/ — for coaches already paying for TrueCoach.
 *
 * Searches (Caitlin, US, 2026-09): "truecoach alternative" 10 a month
 * (difficulty 26), "truecoach pricing" 110. Tiny volume, and Caitlin's point
 * stands: everyone who types it already pays for a coaching tool, so each
 * visitor is a likely switcher. Same rules as every comparison page
 * (components/site/ComparisonPage.jsx): the name names the search, every
 * claim is about us, the price comparison is the visitor's own bill.
 */

const faq = [
  ...COACH_FAQ_BASE,
  {
    q: 'How does this compare with TrueCoach pricing?',
    a: 'We do not quote other companies’ prices — only they can state them correctly. Ours is $19 to $89 a month by client count, everything included. Type what you pay today into the calculator on this page and you have the comparison.',
  },
]

export default function TruecoachAlternative() {
  return (
    <ComparisonPage
      path="/truecoach-alternative/"
      title="TrueCoach alternative with everything included | Prometheus"
      description="A TrueCoach alternative with programming, nutrition, video review, calls and payments in every plan. $19–$89 a month by client count, 14-day trial."
      crumb="TrueCoach alternative"
      product="coach"
      eyebrow="TrueCoach alternative"
      headline="Looking for a TrueCoach alternative?"
      accent="Programming, nutrition and payments in one plan."
      intro="If you already pay for a coaching tool and keep adding others around it, here is what Prometheus puts in one account, what it costs at your client count and how to move over without losing a week."
      facts={COACH_FACTS}
      factsNote="Prices in US dollars, from the same billing configuration the app charges with."
      argument={COACH_ARGUMENT}
      worth={COACH_WORTH}
      notWorth={COACH_NOT_WORTH}
      steps={COACH_STEPS}
      faq={faq}
      related={[
        { label: 'Online coaching software', to: '/online-coaching-software/' },
        { label: 'Every plan and price', to: '/pricing/' },
        { label: 'Video review', to: '/video-review/' },
      ]}
      ctaTitle="Move one client over."
      ctaBody="Not the whole roster — one. If the week runs better, move the rest. Fourteen days, no card."
    />
  )
}
