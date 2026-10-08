/* What the coach comparison pages (Trainerize, Everfit, TrueCoach) say about
 * us, kept in one place so three pages cannot drift into three versions of
 * the facts. Source: the product fact sheet checked against the code on
 * 2026-10-01, and the price ladder in prometheus_coach stripe/config.ts.
 *
 * Every line is about Prometheus. Nothing here describes another product.
 */

export const COACH_FACTS = [
  ['Free plan', 'No. A 14-day trial, no card needed.'],
  ['Monthly cost', '$19 to $89 a month, by how many clients you coach (5 to 70). Yearly billing is ten times the monthly price.'],
  ['In every plan', 'Every feature. Only the number of clients changes.'],
  ['Programming', 'Workout and program builder, plus a periodization and season planner.'],
  ['Nutrition', 'A nutrition library and a nutrition tab for each client, including meal photos.'],
  ['Video review', 'Clients send a video; you answer with drawn annotations on it.'],
  ['Video calls', '1-on-1 and team calls in the browser.'],
  ['Getting paid', 'Invoices, quotes and recurring invoices. Client payments through Stripe, Xendit, Razorpay or dLocal, priced in 18 currencies.'],
  ['Client app', 'iPhone and Android, free for every client you coach.'],
]

export const COACH_WORTH = [
  'You pay for nutrition, video or invoicing in separate tools today',
  'You want programming, feedback and calls in one place',
  'You coach clients in other countries and need their currency',
  'You also run classes in a room of your own',
]

export const COACH_NOT_WORTH = [
  'You need a permanently free plan — we do not have one',
  'You coach two clients and a spreadsheet still works',
  'You coach more than 70 clients on one account — talk to us first',
]

/* Honest about what the migration centre is: a way to bring the client list
   across. Programmes are rebuilt in the builder; we do not promise an import
   of them. */
export const COACH_STEPS = [
  {
    title: 'Start the trial',
    body: 'Fourteen days, no card. Pick the plan by how many clients you coach; you can change it later.',
  },
  {
    title: 'Bring your clients across',
    body: 'The migration centre in the app moves your client list over from the tool you use today, so you are not retyping a roster.',
  },
  {
    title: 'Rebuild this week’s programmes',
    body: 'Start with the programmes your clients are on right now in the workout and program builder. The rest can follow as each block ends.',
  },
  {
    title: 'Invite clients to the app',
    body: 'They download the free Prometheus app on iPhone or Android and see their training, nutrition and your messages there.',
  },
  {
    title: 'Connect payments, then cancel the old tool',
    body: 'Connect Stripe, Xendit, Razorpay or dLocal and send the next invoice from Prometheus. Keep the old subscription until its billing period ends.',
  },
]

export const COACH_ARGUMENT = [
  'Everything in the list above is in every plan. You pay for how many clients you coach, not for which parts of the product you may open, and the app your clients use costs them nothing.',
  'Whether you end up paying less we cannot tell you — it depends on what you use today. Add up every tool and subscription you pay for, type it in below, and compare that figure with ours.',
]

export const COACH_FAQ_BASE = [
  {
    q: 'How much does Prometheus cost?',
    a: 'From $19 a month for up to 5 clients to $89 a month for up to 70. The most common plan is $35 for up to 15 clients. Paying yearly costs ten times the monthly price. Every feature is in every plan.',
  },
  {
    q: 'Is there a free plan?',
    a: 'No. There is a 14-day trial that does not ask for a card. After that it is a paid product.',
  },
  {
    q: 'Do my clients pay for the app?',
    a: 'No. The client app is free on iPhone and Android for every client you coach.',
  },
  {
    q: 'Can I bring my clients over?',
    a: 'Yes. The migration centre moves your client list across from the tool you use today. Programmes are rebuilt in the builder, starting with the ones in use this week.',
  },
  {
    q: 'Can I run a studio or a gym on it as well?',
    a: 'Yes. Studio Light adds classes, bookings, memberships, front-desk check-in, point of sale, shifts and accounting for one location, at $79 a month. Gyms with more members or several sites use our gym software, from €149 a month.',
  },
]
