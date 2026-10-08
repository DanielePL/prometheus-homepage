import ComparisonPage from '../../components/site/ComparisonPage'
import {
  COACH_FACTS, COACH_WORTH, COACH_NOT_WORTH, COACH_STEPS, COACH_ARGUMENT, COACH_FAQ_BASE,
} from './shared'

/* /everfit-alternative/ — for coaches weighing what they pay for Everfit.
 *
 * Searches (Caitlin, US, 2026-09): "everfit pricing" 260 a month at
 * difficulty 1; "everfit alternative" has no data yet. So the page leads with
 * price — but with our price only. The searcher brings theirs and types it
 * into the calculator; we never print it (components/site/ComparisonPage.jsx).
 */

const faq = [
  ...COACH_FAQ_BASE,
  {
    q: 'Where can I see Everfit’s pricing?',
    a: 'On Everfit’s own website — we do not quote other companies’ prices, because they change and only they can state them correctly. Type what you pay today into the calculator on this page and compare it with ours.',
  },
]

export default function EverfitAlternative() {
  return (
    <ComparisonPage
      path="/everfit-alternative/"
      title="Weighing Everfit pricing? Compare it with ours | Prometheus"
      description="Prometheus costs $19–$89 a month by client count, with programming, nutrition, video review, calls and payments in every plan. Compare it with your bill."
      ogTitle="An Everfit alternative, priced by client count"
      crumb="Everfit alternative"
      product="coach"
      eyebrow="Everfit pricing and alternative"
      headline="Weighing what you pay for coaching software?"
      accent="Put your bill next to ours."
      intro="Prometheus has one price per client count and every feature in every plan, from $19 a month. Below is what that includes, a calculator for your current bill and the steps to move over."
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
        { label: 'Invoicing and payments', to: '/payments/' },
      ]}
      ctaTitle="Try it with one client."
      ctaBody="Set up one client and see whether the week runs easier. Fourteen days, no card."
    />
  )
}
