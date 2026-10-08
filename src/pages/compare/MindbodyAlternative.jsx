import ComparisonPage from '../../components/site/ComparisonPage'

/* /mindbody-alternative/ — for studio and gym owners weighing a switch.
 *
 * Searches (Caitlin, US, 2026-09): "mindbody alternative" 260 a month,
 * "mindbody pricing" another 590 (no difficulty score yet). Caitlin's angle:
 * the single-location studio. That is Studio Light ($79). A gym with more
 * members or several sites lands on the gym product on the homepage (from
 * €149), so the page shows both doors.
 *
 * Same rules as every comparison page (components/site/ComparisonPage.jsx):
 * the name names the search, every claim is about us, the price comparison is
 * the visitor's own bill against Studio Light. The "not worth switching for"
 * list is the fact sheet's "must not promise" list said out loud — a studio
 * owner who needs family accounts or spot booking should hear it here, not
 * after the migration.
 */

const facts = [
  ['Free plan', 'No. Studio Light has a 14-day trial, the gym software 30 days. No card for either.'],
  ['Monthly cost', 'Studio Light: $79 a month for one location. Gym software: from €149 a month, by active members.'],
  ['Classes', 'Class schedule, bookings, a public schedule page and workout-of-the-day programming.'],
  ['Waitlists', 'Members join a waitlist and are emailed automatically when a spot opens.'],
  ['Memberships', 'Subscriptions, punch cards, session packages, trial and day passes, online drop-ins.'],
  ['Contracts', 'Membership contracts with e-signature.'],
  ['Front desk', 'Staff look up a member and check them in. Point of sale for cash, card, TWINT, PromptPay and vouchers, with end-of-day cash reports.'],
  ['Staff and books', 'Shift planning, payroll runs from the planned shifts, invoices, dunning, profit and loss.'],
  ['Coaching', 'Programming, nutrition and video review from our coaching software are in Studio Light too.'],
  ['Member app', 'iPhone and Android, free for your members.'],
]

const doors = [
  {
    title: 'Studio Light',
    price: '$79 / month',
    body: 'One studio, every trainer, every member. Classes, memberships, front desk, point of sale, shifts and books, plus coaching on the same client list.',
    href: '/studios/',
    cta: 'See Studio Light',
    internal: true,
  },
  {
    title: 'Gym software',
    price: 'from €149 / month',
    body: 'For larger gyms and groups with several sites: plans by active members, unlimited staff accounts and a head-office view across locations.',
    href: '/',
    cta: 'See the gym software',
    internal: true,
  },
]

const faq = [
  {
    q: 'How much does Prometheus cost for a studio?',
    a: 'Studio Light is $79 a month for one location, or ten times that paid yearly. Larger gyms use the gym software: €149 a month for up to 250 active members, €249 for up to 1,000, and €399 per location for several sites. Every feature is in every plan.',
  },
  {
    q: 'How does this compare with Mindbody pricing?',
    a: 'We do not quote other companies’ prices — only they can state them correctly. Type what you pay today into the calculator on this page and hold it against $79.',
  },
  {
    q: 'Can members check themselves in?',
    a: 'In Studio Light, check-in is done by staff at the front desk: they look the member up and check them in. There is no self check-in kiosk in Studio Light.',
  },
  {
    q: 'Can I run a dance or martial arts school on it?',
    a: 'Not well yet. Studio Light has no family or household accounts, no term registration and no belt or grading tracking. Yoga studios, CrossFit and HYROX boxes and personal-training studios fit today.',
  },
  {
    q: 'Can I bring my members over?',
    a: 'Yes. The migration centre in the app brings an existing client list across, so you do not retype your members. Class times and membership types are set up once in the app.',
  },
]

const steps = [
  {
    title: 'Start the trial',
    body: 'Studio Light for one location (14 days), or the gym software for larger gyms and groups (30 days). No card for either.',
  },
  {
    title: 'Set up your timetable and memberships',
    body: 'Enter your class schedule, then the memberships you sell: subscriptions, punch cards, session packages, trial and day passes.',
  },
  {
    title: 'Bring your members across',
    body: 'The migration centre moves your existing member list over, so the front desk can find everyone on the first day.',
  },
  {
    title: 'Open the front desk',
    body: 'Check members in at the desk, sell at the point of sale and send new contracts for e-signature from the same screen.',
  },
  {
    title: 'Run both until the month ends',
    body: 'Keep the old system until its billing period runs out, then cancel it. Point members to your public schedule page to book.',
  },
]

export default function MindbodyAlternative() {
  return (
    <ComparisonPage
      path="/mindbody-alternative/"
      title="Mindbody alternative for single studios | Prometheus"
      description="A Mindbody alternative for one studio: classes, memberships, front desk, point of sale and staff in one plan, $79 a month. Larger gyms from €149."
      crumb="Mindbody alternative"
      product="studio"
      eyebrow="Mindbody alternative"
      headline="Looking for a Mindbody alternative?"
      accent="One studio, one price, everything in it."
      intro="If you run one studio and pay for more system than you use, here is what Prometheus Studio Light includes for $79 a month — and where it is not the right fit yet."
      facts={facts}
      factsNote="Studio Light is priced in US dollars; the gym software in euros (Swiss francs in Switzerland, same number)."
      doors={doors}
      argument={[
        'Everything in the list above is in Studio Light. One price for the location — not per trainer, not per feature — and the app your members use costs them nothing.',
        'Whether you end up paying less depends on what you pay today. Add up your studio software and the tools around it, type it in below, and hold it against ours.',
      ]}
      worth={[
        'You run one studio and pay for more system than you use',
        'You also coach clients one-to-one or online',
        'You want shifts, payroll and books next to the timetable',
        'Your members pay with TWINT or PromptPay at the desk',
      ]}
      notWorth={[
        'You need family or household accounts — not built',
        'You sell term or semester registrations — not built',
        'Members pick their own reformer or bike — we book by place count',
        'You need belt or grading tracking in Studio Light',
        'You need a self check-in kiosk in Studio Light',
      ]}
      steps={steps}
      faq={faq}
      related={[
        { label: 'Studio Light', to: '/studios/' },
        { label: 'Gym software', to: '/' },
        { label: 'Every plan and price', to: '/pricing/' },
      ]}
      ctaTitle="Try it on your own studio."
      ctaBody="Set up this week’s timetable and check a few members in. Fourteen days, no card."
    />
  )
}
