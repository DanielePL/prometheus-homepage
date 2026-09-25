import FeaturePage from '../../components/site/FeaturePage'

/* /nutrition/ — nutrition coaching inside the same account.
 * Product truth: Nutrition Library (meal-plan templates with kcal and macros,
 * assign to client), meal-photo logging in the client app, own food library
 * (planFeatures.nutrition, planFeatures.mealPhoto in stripe/config.ts).
 * Screenshot: app-nutrition.webp, demo dataset, 2026-09-24. */
export default function NutritionPage() {
  return (
    <FeaturePage
      path="/nutrition/"
      title="Nutrition coaching software for personal trainers | Prometheus"
      description="Meal plans with calorie and macro targets, your own food library, and clients who log meals by photo — in the same account as their training. From $19 a month, no add-on."
      ogImage="/images/og/nutrition.jpg"
      chip="Nutrition coaching software"
      headline="Nutrition in the same account as training."
      accent="Not a second app, not a second bill."
      intro="Build a plan with calorie and macro targets, assign it to a client in one click, and see what they actually ate — next to the sets they actually did."
      hero={{ src: '/images/coach/app-nutrition.webp', alt: 'The nutrition library: meal-plan templates with calories and macros, ready to assign to a client', width: 1600, height: 1000 }}
      sections={[
        {
          eyebrow: 'Plans',
          title: 'Templates you build once,',
          accent: 'assigned in a click.',
          body: [
            'A cutting block, a maintenance reset, a mass phase: each plan carries its calories, protein, carbs and fat, and how many days it runs. Keep them in your library and assign the right one when a client changes phase.',
            'Your own food library sits underneath, so the foods you actually recommend are the ones your clients see first.',
          ],
        },
        {
          eyebrow: 'Logging',
          title: 'Clients log meals by photo.',
          accent: 'You see it the same day.',
          body: [
            'A photo of the plate in the client app, macros estimated from it, and the day’s totals against the target you set. No third-party food app, no export, no screenshot pasted into a chat.',
            'Adherence shows up in the same client record as training and check-ins, so the conversation on Friday is about the whole week, not one half of it.',
          ],
          phones: [
            ['/images/coach/app-mobile-training.webp', "The client app: this week's training, next to the nutrition plan"],
            ['/images/coach/app-mobile-workout.webp', 'Logging inside the client app'],
          ],
        },
        {
          eyebrow: 'Price',
          title: 'Included from $19 a month.',
          accent: 'Every plan, every client.',
          body: [
            'Nutrition is the part of coaching that most software sells as an upgrade. Here it is in every plan, for every client you coach, and the client app is free for them.',
          ],
        },
      ]}
      included={[
        'Meal-plan templates with calorie and macro targets',
        'Assign a plan to a client, change it when the phase changes',
        'Your own food library',
        'Meal-photo logging in the client app',
        'Daily totals against the target, in the client record',
        'Client app free on iPhone and Android',
      ]}
      faq={[
        { q: 'Is nutrition an add-on?', a: 'No. Meal plans, macro targets, the food library and meal-photo logging are in every plan from $19 a month. There is no tier that unlocks them.' },
        { q: 'Do my clients need a separate nutrition app?', a: 'No. They log meals in the same Prometheus client app they train with, which is free for them on iPhone and Android.' },
        { q: 'Can I reuse a plan for several clients?', a: 'Yes. Plans live in your nutrition library as templates. Assign one to any client, adjust the targets for that person, and keep the template for the next one.' },
        { q: 'Can I see nutrition and training together?', a: 'Yes. A client’s meals, training, check-ins and messages are one record, so you read the week as a whole.' },
      ]}
      ctaTitle="Put one client on a plan."
      ctaBody="Build one template, assign it, and watch a week of meals come in. Fourteen days, no card."
    />
  )
}
