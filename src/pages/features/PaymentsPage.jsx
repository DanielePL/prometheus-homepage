import { Link } from 'react-router-dom'
import FeaturePage from '../../components/site/FeaturePage'

/* /payments/ — invoices, subscriptions, recurring billing, books.
 * Product truth: Finance page with Dashboard, Invoices, Quotes, Expenses,
 * Documents, Income, Reports, Recurring, Bank tabs (app-finance.webp,
 * app-invoices.webp / loop-invoices, 2026-09-24). Four payment providers take
 * client payments: Stripe, dLocal, Razorpay, Xendit (corrected 2026-10-02:
 * Wise and Revolut are "coming soon" in the app and only match bank payments
 * to invoices, so they are not named). No claim about fees or percentages: we do not print numbers the
 * repo does not carry.
 * SEO pass 2026-10-08 (Caitlin's audit): main search "gym payment software"
 * in title and H1; the studio side (Studio Light: memberships, class packs,
 * point of sale, dunning) is named so the search is honest, with links up
 * to both front doors. dLocal takes one-off payments only, so it is no
 * longer implied for recurring billing; the bank view no longer claims to
 * match payments (that matching is the "coming soon" part). */
export default function PaymentsPage() {
  return (
    <FeaturePage
      path="/payments/"
      title="Gym payment software for studios and coaches | Prometheus"
      description="Gym payment software for studios and coaches: invoices, subscriptions, recurring billing and the books behind them, with four payment providers. From $19."
      ogImage="/images/og/payments.jpg"
      chip="Gym payment software"
      headline="Get paid from the same place"
      accent="you coach from."
      intro={<>Invoices go out, subscriptions renew, and the month closes with a report instead of a spreadsheet — for every client, in the same account as their programme. For <Link to="/online-coaching-software/" className="font-semibold text-ink underline underline-offset-4 decoration-line-strong hover:decoration-ink">coaches</Link>, and for a studio on <Link to="/studios/" className="font-semibold text-ink underline underline-offset-4 decoration-line-strong hover:decoration-ink">Studio Light</Link>, where memberships and the till run on the same books.</>}
      hero={{ src: '/images/coach/app-finance.webp', alt: 'The finance overview: revenue, expenses, profit and tax liability for the month and the year, plus the quote pipeline', width: 1600, height: 1000 }}
      sections={[
        {
          eyebrow: 'Invoices',
          title: 'Who has paid,',
          accent: 'who has not, what is due.',
          body: [
            'Every invoice with its status — paid, sent, viewed, overdue — and its due date, in one list you can search by client. A client who is late shows up before you have to remember to check.',
            'Quotes turn into invoices, invoices turn into income, and the numbers land in the same place your programming does.',
          ],
          shot: { src: '/images/coach/loop-invoices.webp', alt: 'The invoice list with paid, sent and overdue invoices', width: 1600, height: 1000 },
        },
        {
          eyebrow: 'Subscriptions',
          title: 'Recurring billing',
          accent: 'that runs without you.',
          body: [
            'Set a client up once — monthly coaching, a twelve-week block, a quarterly plan — and the invoice goes out on schedule. Renewals happen; you get told when one does not.',
            'Four payment providers are connected: Stripe, Xendit and Razorpay, plus dLocal for one-off payments. A client in Brazil, India or Indonesia can pay you in a way that works where they live.',
          ],
        },
        {
          eyebrow: 'Books',
          title: 'The month closes',
          accent: 'as the month runs.',
          body: [
            'Income, expenses, profit and the tax you are building up, month to date and year to date. Receipts captured as they happen, and reports when you need them.',
            'Nothing here is a separate accounting subscription. It is the finance side of the account you already pay for.',
          ],
        },
        {
          eyebrow: 'For a studio',
          title: 'Memberships and the till',
          accent: 'on the same books.',
          body: [
            'With Studio Light a studio sells subscriptions, punch cards, session packages and day passes, takes payment at the desk by cash, card, TWINT or PromptPay, and closes the day with a cash report.',
            'Late payments get dunning reminders, and every sale lands in the same profit and loss as your coaching income.',
          ],
        },
      ]}
      included={[
        'Invoices and quotes, with status and due dates',
        'Subscriptions and recurring billing',
        'Four payment providers: Stripe, Xendit, Razorpay, dLocal (one-off)',
        'Income, expenses, profit and tax overview',
        'Receipts, documents and reports',
        'With Studio Light: memberships, class packs, point of sale, dunning',
      ]}
      faq={[
        { q: 'Is invoicing an add-on?', a: 'No. Invoices, quotes, subscriptions, recurring billing and the finance overview are in every plan from $19 a month.' },
        { q: 'Which payment providers can I use?', a: 'Stripe, Xendit and Razorpay, and dLocal for one-off payments. You connect the ones that suit where you and your clients are.' },
        { q: 'Does this work for a gym or studio?', a: 'Yes. Studio Light adds memberships, class packs, day passes, point of sale and dunning for one location at $79 a month. Gyms with several locations or a reception team use the gym product, from €149 a month.' },
        { q: 'Can I bill a client automatically every month?', a: 'Yes. Set up the subscription once and the invoice goes out on schedule. You are told when a renewal fails.' },
        { q: 'Does this replace my accounting software?', a: 'It covers income, expenses, profit, tax liability, receipts and reports for a coaching business. Whether your accountant needs more than that is a question for your accountant; the reports export.' },
      ]}
      ctaTitle="Send one invoice from here."
      ctaBody="Set up one client, send one invoice, see it get paid. Fourteen days, no card."
    />
  )
}
