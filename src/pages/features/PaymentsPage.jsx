import FeaturePage from '../../components/site/FeaturePage'

/* /payments/ — invoices, subscriptions, recurring billing, books.
 * Product truth: Finance page with Dashboard, Invoices, Quotes, Expenses,
 * Documents, Income, Reports, Recurring, Bank tabs (app-finance.webp,
 * app-invoices.webp / loop-invoices, 2026-09-24). Six payment providers as
 * stated on the homepage door: Stripe, Wise, Revolut, dLocal, Razorpay,
 * Xendit. No claim about fees or percentages: we do not print numbers the
 * repo does not carry. */
export default function PaymentsPage() {
  return (
    <FeaturePage
      path="/payments/"
      title="Invoicing and payments software for personal trainers | Prometheus"
      description="Invoices, quotes, subscriptions and recurring billing in the account you coach from, with the bookkeeping behind them. Six payment providers so clients anywhere can pay you. From $19 a month."
      ogImage="/images/og/payments.jpg"
      chip="Invoicing & payments for coaches"
      headline="Get paid from the same place"
      accent="you coach from."
      intro="Invoices go out, subscriptions renew, and the month closes with a report instead of a spreadsheet — for every client, in the same account as their programme."
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
            'Six payment providers are connected: Stripe, Wise, Revolut, dLocal, Razorpay and Xendit. A client in Brazil, India or Indonesia can pay you in a way that works where they live.',
          ],
        },
        {
          eyebrow: 'Books',
          title: 'The month closes',
          accent: 'as the month runs.',
          body: [
            'Income, expenses, profit and the tax you are building up, month to date and year to date. Receipts captured as they happen, reports when you need them, and a bank view that matches what came in.',
            'Nothing here is a separate accounting subscription. It is the finance side of the account you already pay for.',
          ],
        },
      ]}
      included={[
        'Invoices and quotes, with status and due dates',
        'Subscriptions and recurring billing',
        'Six payment providers: Stripe, Wise, Revolut, dLocal, Razorpay, Xendit',
        'Income, expenses, profit and tax overview',
        'Receipts, documents and reports',
        'Bank view',
      ]}
      faq={[
        { q: 'Is invoicing an add-on?', a: 'No. Invoices, quotes, subscriptions, recurring billing and the finance overview are in every plan from $19 a month.' },
        { q: 'Which payment providers can I use?', a: 'Stripe, Wise, Revolut, dLocal, Razorpay and Xendit. You connect the ones that suit where you and your clients are.' },
        { q: 'Can I bill a client automatically every month?', a: 'Yes. Set up the subscription once and the invoice goes out on schedule. You are told when a renewal fails.' },
        { q: 'Does this replace my accounting software?', a: 'It covers income, expenses, profit, tax liability, receipts and reports for a coaching business. Whether your accountant needs more than that is a question for your accountant; the reports export.' },
      ]}
      ctaTitle="Send one invoice from here."
      ctaBody="Set up one client, send one invoice, see it get paid. Fourteen days, no card."
    />
  )
}
