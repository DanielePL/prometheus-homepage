import FeaturePage from '../../components/site/FeaturePage'

/* /sales-assistant/ — the part nobody else has: it helps a coach sell.
 * Product truth: Sales page with discovery-call pipeline (New lead,
 * Scheduled, Call done, Follow-up, Won, Lost), permanent call link, call
 * transcript and follow-up email draft (sales.ts strings); the assistant
 * answers "who needs attention right now" and "what is still unpaid"
 * (assistant.ts). Screenshot: app-sales.webp, demo dataset, 2026-09-25,
 * e-mail addresses hidden. The chat screen is deliberately not shown — its
 * welcome text names a third-party product. */
export default function AssistantPage() {
  return (
    <FeaturePage
      path="/sales-assistant/"
      title="Sales assistant for personal trainers and online coaches | Prometheus"
      description="A discovery-call pipeline, calls with the notes and follow-up written for you, and an assistant that tells you who is drifting before they cancel. In every plan, from $19 a month."
      ogImage="/images/og/sales-assistant.jpg"
      chip="Sales assistant for coaches"
      headline="Most coaching software stops at delivery."
      accent="This one helps you sell."
      intro="Enquiries become discovery calls, calls become notes and a follow-up, and the pipeline shows where every prospect stands. Meanwhile the assistant watches your clients and tells you who needs a message this week."
      hero={{ src: '/images/coach/app-sales.webp', alt: 'The sales pipeline: new leads, scheduled calls, calls done, follow-ups, won and lost, with a permanent call link at the top', width: 1600, height: 700 }}
      sections={[
        {
          eyebrow: 'Discovery calls',
          title: 'One link, one call,',
          accent: 'the notes written for you.',
          body: [
            'A prospect books, joins your permanent call link, and you talk. Afterwards the call has a transcript, a summary and a follow-up email draft waiting — you read, adjust, send. The offer does not depend on whether you felt like writing on a Sunday evening.',
            'Every prospect moves across the board: new lead, scheduled, call done, follow-up, won or lost. You see at a glance who is waiting on you.',
          ],
        },
        {
          eyebrow: 'Retention',
          title: 'Who is drifting,',
          accent: 'while you can still do something.',
          body: [
            'Ask the assistant who needs attention right now and it answers from your own data: who has not trained in ten days, who skipped a check-in, whose subscription is about to end. The client list shows the same thing as numbers.',
            'A message on Tuesday is worth more than a cancellation email on the first of the month.',
          ],
          shot: { src: '/images/coach/loop-clients.webp', alt: 'The client list with days since last training, check-in and message', width: 1600, height: 1000 },
        },
        {
          eyebrow: 'Everyday',
          title: 'Ask it what you would ask',
          accent: 'an assistant.',
          body: [
            '“How are my clients performing this week?” “What is still unpaid?” “Create a session for tomorrow.” It reads your clients, your calendar and your invoices and answers in plain language, then does the thing if you tell it to.',
            'It can make mistakes, and it says so. You verify what matters; it saves you the looking-up.',
          ],
        },
      ]}
      included={[
        'Discovery-call pipeline from new lead to won or lost',
        'Permanent call link for prospects and clients',
        'Call transcript, summary and follow-up email draft',
        'Who-needs-attention answers from your own client data',
        'Unpaid invoices and this week’s performance on request',
        'Session creation and messages on request',
      ]}
      faq={[
        { q: 'Is the assistant in every plan?', a: 'Yes. The sales pipeline, discovery calls with notes and the assistant are included from $19 a month. Nothing is unlocked by a higher tier.' },
        { q: 'Does it message my clients on its own?', a: 'No. It drafts and suggests; you send. It tells you who is drifting, and you decide what to say.' },
        { q: 'What does it know about my business?', a: 'Your clients, sessions, check-ins, calendar and invoices inside Prometheus. It answers from that data and nothing else.' },
        { q: 'Can it be wrong?', a: 'Yes, and it says so on screen. Treat it as a fast first read, not a final answer, especially on money.' },
      ]}
      ctaTitle="Run one discovery call through it."
      ctaBody="Send your call link to the next enquiry and read the follow-up it drafts. Fourteen days, no card."
    />
  )
}
