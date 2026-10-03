import { Head } from 'vite-react-ssg'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import Hero from '../components/home/Hero'
import Outcomes from '../components/home/Outcomes'
import { Pricing, FinalCta } from '../components/home/Closing'
import Faq, { FAQ } from '../components/home/Faq'
import { SOCIAL } from '../lib/links'

/* The homepage sells the Coach product to coaches, in English.
 *
 * What it replaced and why: the previous page opened with "I run a studio or a
 * chain" and argued about reception desks, contracts in binders and queues at
 * the front counter. That is Enterprise language for a product that is parked —
 * and an online coach arriving from `trainerize alternative` read it and left.
 *
 * English because that is where the market is: 156'100 searches a month against
 * 250 in German (docs/GROWTH_PLAN.md §3 in prometheus-admin).
 *
 * One audience: coaches. Studios and chains have their own pages (/studios/,
 * /enterprise/) and reach them through their own searches; here they get one
 * nav link ("For gyms") and a footer column, nothing in the argument. A coach
 * looking for a coaching tool does not want to see a chain product (owner,
 * 2026-10-03).
 *
 * The argument, since 2026-10-03: in five seconds a visitor sees what the app
 * does for him and what it costs — the two things he decides on, at the same
 * height (owner: "Preis und Skills. Ich zahle, um mir das Leben zu vereinfachen
 * und mehr Erfolg zu haben."). Hero (both, in the <h1>) → four jobs it does
 * (win, coach, keep, get paid) → price → questions → ask. Each block answers
 * the question the previous one raises, and none repeats another; the SEO
 * review that triggered this found the pain stated three times and "no
 * add-ons" four times. VBT is not on the page. "Who builds this" (Makers) is
 * out until it can be "who already uses this" — that is what a buyer asks.
 *
 * No proof-by-numbers section. On 2026-08-18 the honest figures were seven coach
 * accounts and zero coach-client links; a number smaller than the reader expects
 * answers "does anyone use this?" with no, and an invented one ends the brand the
 * first time someone asks in a Facebook group. The screenshots do the proving
 * until the numbers are worth printing.
 *
 * No free tier, no founding-coach offer, no vouchers — owner's rule, 2026-08-18:
 * "was nichts kostet ist nichts wert". The 14-day trial stays; it is a look at
 * the product, not a giveaway.
 *
 * Ground: the hero photograph dissolves into one graphite zone that carries
 * the four jobs, then dusk to day, and price and questions stand on the light
 * page before the dark close.
 *
 * Parked, complete, still in the repo — the German enterprise-first sections,
 * which are the basis for an Enterprise page when that product ships:
 *   HeroOperator, PainSection, ProofSection, EntryPoints, PricingSection,
 *   FinalCta, SiteNav, SiteFooter (all German)
 *   BentoGrid, EcosystemDiagram, SurfacesSection, MemberSection,
 *   VerticalsSection, TrustSection
 */
/* Repeated as structured data because that is what machines read. One
   organisation, one product, one FAQ — the same facts as the visible page,
   never a second set. */
const LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://prometheus.coach/#org',
      name: 'Prometheus',
      legalName: 'PeakForce OÜ',
      url: 'https://prometheus.coach/',
      logo: 'https://prometheus.coach/images/flame.png',
      email: 'management@prometheus.coach',
      sameAs: SOCIAL.map((s) => s.href),
    },
    {
      '@type': 'WebSite',
      '@id': 'https://prometheus.coach/#site',
      url: 'https://prometheus.coach/',
      name: 'Prometheus',
      publisher: { '@id': 'https://prometheus.coach/#org' },
      inLanguage: 'en',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://prometheus.coach/#app',
      name: 'Prometheus Coach',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      url: 'https://prometheus.coach/',
      description:
        'Personal trainer software with a free client app: programming, nutrition, video review, built-in video calls, messaging, payments and a sales assistant in one account.',
      publisher: { '@id': 'https://prometheus.coach/#org' },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '19',
        highPrice: '89',
        offerCount: '10',
        url: 'https://prometheus.coach/#pricing',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Head>
        <html lang="en" />
        {/* Aimed at the measured demand, not at how we describe ourselves.
            "personal training apps for personal trainers" (1'600/mo) and
            "personal trainer software app" (880/mo) are the largest queries
            (Keyword Planner, 2026-08-20); "coaching software", which this said
            before, is a phrase we like and nobody types. Titles stay under
            ~60 characters and descriptions under ~155 so Google shows them
            whole instead of cutting mid-sentence. */}
        <title>Personal trainer software & app, all in one | Prometheus</title>
        <meta
          name="description"
          content="Software and client app for personal trainers: programming, nutrition, video review, calls and payments in one account. From $19 a month, 14-day trial, no card."
        />
        <link rel="canonical" href="https://prometheus.coach/" />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content="Personal trainer software & app, all in one" />
        <meta
          property="og:description"
          content="Win clients, coach them, get paid. One app, from $19 a month — every feature in every plan, and a free app for your clients."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://prometheus.coach/" />
        <meta property="og:image" content="https://prometheus.coach/images/og/home.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* Structured data: who we are, what the product is and costs, and the
            FAQ — the three things an answer engine quotes. Prices are the same
            four numbers as on the page, verified against stripe/config.ts. */}
        <script type="application/ld+json">{JSON.stringify(LD)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav overDark />
        {/* Dark zone: hero, dashboard and the four jobs share one graphite
            room; the coaching floor shows faintly behind them. Then dusk to
            day, and the page turns light for the price. */}
        <div className="zone-dark relative isolate">
          <Hero />
          <div className="relative isolate">
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none fade-y" aria-hidden="true">
              <img
                src="/images/gym/coaching-floor.webp"
                alt=""
                loading="lazy"
                className="w-full h-full object-cover object-center opacity-[0.16]"
              />
            </div>
            <Outcomes />
          </div>
        </div>
        {/* The price and the questions stay in the room (2026-10-03, owner:
            the white price block broke the run). The hall behind them, then
            straight into the closing photograph — the page never goes light
            again after the outcomes. */}
        <div className="zone-dark relative isolate">
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none fade-y" aria-hidden="true">
            <img
              src="/images/gym/hall-opening.webp"
              alt=""
              loading="lazy"
              className="w-full h-full object-cover object-[center_70%] opacity-[0.13]"
            />
          </div>
          <Pricing />
          <Faq />
        </div>
        <FinalCta />
        <HomeFooter />
      </div>
    </>
  )
}
