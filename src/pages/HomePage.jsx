import { Head } from 'vite-react-ssg'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import Hero from '../components/home/Hero'
import Included from '../components/home/Included'
import SalesAssistant from '../components/home/SalesAssistant'
import PhotoBreak from '../components/site/PhotoBreak'
import Doors from '../components/home/Doors'
import ClientApp from '../components/home/ClientApp'
import { Makers, Pricing, FinalCta } from '../components/home/Closing'
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
 * Order of the argument, set by the owner: everything in one system → the sales
 * assistant → everything included → VBT as a footnote, never a headline.
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
 * Light ground since 2026-09-16 (owner: "zu dunkel, zu altmodisch"). White
 * paper, warm off-white second ground, one dark closing block. The ground
 * rhythm down the page: paper · tint · paper · tint · photo · paper · tint ·
 * paper · tint · night.
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
          content="Five tools, one client. That was never the plan. Programming, nutrition, feedback, video calls and payments in one account."
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
        <HomeNav />
        <Hero />
        <Included />
        <SalesAssistant />
        <PhotoBreak
          src="/images/photos/coach-floor.webp"
          focus="center 35%"
          statement="The coaching is the product."
          accent="Everything else is what gets in its way."
        />
        <Doors />
        <ClientApp />
        <Makers />
        <Pricing />
        <Faq />
        <FinalCta />
        <HomeFooter />
      </div>
    </>
  )
}
