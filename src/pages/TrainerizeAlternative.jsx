import ComparisonPage from '../components/site/ComparisonPage'
import {
  COACH_FACTS, COACH_WORTH, COACH_NOT_WORTH, COACH_STEPS, COACH_ARGUMENT, COACH_FAQ_BASE,
} from './compare/shared'

/* /trainerize-alternative/ — the first switching page, rewritten 2026-10-08
 * from Caitlin's Stage 1 audit: the old page "doesn't actually compare and
 * only mentions Trainerize once". It now carries the switching steps and the
 * price comparison the searcher came for.
 *
 * Searches (Caitlin, US, 2026-09): "trainerize alternative" 140 a month,
 * "trainerize review" 70 (difficulty 8), "trainerize cost" 70 (difficulty 6).
 * Small, and that is the point: nobody types them who is not weighing a
 * switch.
 *
 * The comparison stays our rule, not hers: the name is in the title and the
 * search line only, every claim is about us, and the price difference is the
 * visitor's own bill against ours (components/site/ComparisonPage.jsx says
 * why). A "review" here is a review of what we offer, not of them.
 */

const faq = [
  ...COACH_FAQ_BASE,
  {
    q: 'Is this a Trainerize review?',
    a: 'No. We do not describe or rate other products. This page states what Prometheus includes and costs, so you can hold it against what you use today.',
  },
]

export default function TrainerizeAlternative() {
  return (
    <ComparisonPage
      path="/trainerize-alternative/"
      title="Trainerize alternative: everything in one plan | Prometheus"
      description="Weighing the cost of Trainerize? Prometheus has programming, nutrition, video review, calls and payments in every plan, $19–$89 a month. 14-day trial."
      crumb="Trainerize alternative"
      product="coach"
      eyebrow="Trainerize alternative"
      headline="Looking for a Trainerize alternative?"
      accent="Here is ours, in plain numbers."
      intro="Most coaches who go looking are not unhappy with the training side. They are tired of paying for several tools to coach one client. Here is what Prometheus costs, what is in it and how to move over — no sign-up needed to read it."
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
        { label: 'Nutrition coaching', to: '/nutrition/' },
      ]}
      ctaTitle="Move one client over."
      ctaBody="Not the whole roster — one. If the week runs better, move the rest. Fourteen days, no card."
    />
  )
}
