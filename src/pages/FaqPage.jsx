import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { Section, SectionHeader } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { FinalCta } from '../components/home/Closing'
import { FAQ as COACH_FAQ } from '../components/home/Faq'
import { SIGNUP_GYM } from '../lib/links'

/* /faq/ — the questions asked before buying, for all three products.
 *
 * Part of the SEO package (Caitlin, Stage 1): one page an AI answer or a
 * featured snippet can quote, grouped the way a buyer arrives — gym, studio,
 * coach. The coach answers are imported from components/home/Faq.jsx rather
 * than copied, so the two can never disagree. Gym answers use the same facts as
 * the homepage pricing block (plans.ts); Studio Light and payment answers come
 * from the product fact sheet checked against the code on 2026-10-01.
 *
 * Answers say what is missing as plainly as what is there: an owner believes
 * the vendor that names its gaps.
 */

const URL = 'https://prometheus.coach/faq/'
const TITLE = 'Prometheus FAQ: pricing, features, switching'
const DESCRIPTION = 'Answers for gym owners, studio owners and coaches: what Prometheus costs, what is included, what is not, and how switching works.'

const GROUPS = [
  {
    id: 'gyms',
    title: 'Gyms',
    link: { to: '/', label: 'Gym software' },
    items: [
      {
        q: 'What does the gym software cost?',
        a: 'Starter is €149 a month for up to 250 active members, Studio is €249 a month for up to 1,000, both for one location. Pro is €399 a month per location with unlimited members and a head-office view across sites. Gyms in Switzerland are billed in CHF.',
      },
      {
        q: 'Which features are in which plan?',
        a: 'Every feature is in every plan. The price follows your number of members and locations, never the features. Staff accounts are unlimited.',
      },
      {
        q: 'Is there a setup fee or a minimum term?',
        a: 'No setup fee, no migration fee and no minimum term. You can try it for 30 days without a card.',
      },
      {
        q: 'Is anything charged on top?',
        a: 'Only AI credits, for the assistant and for generating workouts and nutrition plans. They are prepaid and metered, so there is no surprise invoice. Everything else is in the base plan.',
      },
      {
        q: 'Can I bring my existing member list?',
        a: 'Yes. Migration tools bring an existing member list across, at no extra cost.',
      },
      {
        q: 'What does it not do yet?',
        a: 'It is not certified for German fiscal cash-register rules (KassenSichV / TSE). There is no public API and no integration marketplace. The interface is in German, English and French; other languages on request.',
      },
    ],
  },
  {
    id: 'studios',
    title: 'Studios',
    link: { to: '/studios/', label: 'Studio software' },
    items: [
      {
        q: 'What is Studio Light?',
        a: 'Studio Light runs one studio, front desk to back office, on the same client list as your coaching. It costs $79 a month or $790 a year and includes everything in the coach product.',
      },
      {
        q: 'Studio Light or the gym software: which one fits?',
        a: 'Studio Light is for a coach with a room: one location, classes, memberships and the books. The gym software is for a gym with a reception desk, member check-in at the door, staff clock-in and, if you grow, several locations.',
      },
      {
        q: 'Can members book a specific bike or reformer?',
        a: 'Not yet. Classes are booked by the number of places, not by spot. Waitlists work: when a place opens, the next member is emailed automatically.',
      },
    ],
  },
  {
    id: 'coaches',
    title: 'Coaches',
    link: { to: '/online-coaching-software/', label: 'Coaching software' },
    items: COACH_FAQ,
  },
  {
    id: 'payments',
    title: 'Payments and languages',
    link: { to: '/payments/', label: 'Payments' },
    items: [
      {
        q: 'How do my clients pay me?',
        a: 'Through Stripe Connect, Xendit, Razorpay or dLocal, depending on your country. dLocal takes one-off payments only, no subscriptions. Plans can be priced in 18 currencies.',
      },
      {
        q: 'Which languages does the coach and studio app speak?',
        a: 'English, German, French and Italian.',
      },
    ],
  },
]

export default function FaqPage() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': URL,
        url: URL,
        name: TITLE,
        isPartOf: { '@id': 'https://prometheus.coach/#site' },
        inLanguage: 'en',
        mainEntity: GROUPS.flatMap((g) => g.items).map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://prometheus.coach/' },
          { '@type': 'ListItem', position: 2, name: 'FAQ', item: URL },
        ],
      },
    ],
  }

  return (
    <>
      <Head>
        <html lang="en" />
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Prometheus FAQ" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content="https://prometheus.coach/images/og/faq.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav />

        <section className="relative pt-32 lg:pt-40 pb-6 px-5 sm:px-8 overflow-hidden">
          <div className="hero-glow absolute inset-x-0 top-0 h-[60vh] pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-4xl mx-auto hero-rise">
            <h1>
              <span className="eyebrow">Frequently asked questions</span>
              <span className="block display text-[2.6rem] leading-[1.02] sm:text-6xl">
                Asked before{' '}
                <span className="display-soft">starting.</span>
              </span>
            </h1>
            <nav aria-label="Topics" className="mt-8 flex flex-wrap gap-2">
              {GROUPS.map((g) => (
                <a key={g.id} href={`#${g.id}`} className="inline-flex items-center h-10 px-4 rounded-full border border-line-strong text-sm font-medium hover:border-ink">
                  {g.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {GROUPS.map((g, i) => (
          <Section key={g.id} id={g.id} tone={i % 2 === 0 ? 'default' : 'raised'} width="narrow" className="scroll-mt-20">
            <SectionHeader align="left" title={g.title} />
            <div className="mt-8 divide-y divide-line border-y border-line">
              {g.items.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-lg font-semibold tracking-tight">{f.q}</h3>
                    <span aria-hidden="true" className="mt-1 w-6 h-6 rounded-full border border-line-strong flex items-center justify-center text-muted shrink-0 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-muted leading-relaxed max-w-2xl">{f.a}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-sm">
              <Link to={g.link.to} className="font-semibold text-accent-dark hover:underline">{g.link.label} →</Link>
            </p>
          </Section>
        ))}

        <FinalCta
          title="Still a question?"
          body="Write to management@prometheus.coach, or try it in your own gym for 30 days without a card."
          href={SIGNUP_GYM}
          cta="Try it 30 days, no card"
        />
        <HomeFooter />
      </div>
    </>
  )
}
