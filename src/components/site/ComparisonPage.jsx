import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, X } from 'lucide-react'
import { Section, SectionHeader, Reveal } from './Section'
import StackCalculator, { COACH_ROWS, STUDIO_ROWS } from './StackCalculator'
import { HomeNav, HomeFooter } from '../home/HomeChrome'
import { FinalCta } from '../home/Closing'
import { SIGNUP, SIGNUP_STUDIO } from '../../lib/links'

/* One layout for the "<tool> alternative" pages (Trainerize, Everfit,
 * TrueCoach, Mindbody). Each page is a data file; this is the shape.
 *
 * Why these pages exist (Caitlin's Stage 1 audit, 2026-09-25): someone who
 * types "<tool> alternative" or "<tool> pricing" already pays for software and
 * is weighing a switch. Small searches, the highest intent on the site.
 *
 * The rule that shapes every word: the competitor's name appears only where it
 * names the search — title, the H1's search line, meta, URL. That is
 * nominative use. Every claim on the page is a claim about us: what we
 * include, what we charge, what we do not have. We never say what the other
 * product costs, can or cannot do — under EU and Swiss comparative-advertising
 * rules an implied comparison counts too, and a competitor's price printed
 * here would be wrong the day they change it. The price comparison the visitor
 * came for is his own bill against ours (StackCalculator): he types his
 * number, the line goes through his number.
 *
 * Facts: the product fact sheet checked against the code on 2026-10-01, the
 * price ladder in stripe/config.ts, and Studio Light at $79. Nothing in
 * "What pages must not promise" (family accounts, spot booking, member self
 * check-in in Studio Light, exercise-video counts, data location) appears here
 * as something we have.
 */

const SITE = 'https://prometheus.coach'

/* `product` decides the calculator, the trial and the primary sign-up. */
const PRODUCT = {
  coach: {
    signup: SIGNUP,
    cta: 'Start free — 14 days, no card',
    rows: COACH_ROWS,
    offer: {
      '@type': 'SoftwareApplication',
      name: 'Prometheus Coach',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      url: `${SITE}/online-coaching-software/`,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '19',
        highPrice: '89',
        offerCount: '10',
        url: `${SITE}/pricing/`,
      },
    },
  },
  studio: {
    signup: SIGNUP_STUDIO,
    cta: 'Start free — 14 days, no card',
    rows: STUDIO_ROWS,
    offer: {
      '@type': 'SoftwareApplication',
      name: 'Prometheus Studio Light',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web, iOS, Android',
      url: `${SITE}/studios/`,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '79',
        url: `${SITE}/pricing/`,
      },
    },
  },
}

/* Social preview per page, rendered by scripts/og-images.mjs. The Trainerize
   page keeps the original 'switch' image it has carried since September. */
const OG_IMAGE = {
  '/mindbody-alternative/': 'mindbody',
  '/everfit-alternative/': 'everfit',
  '/truecoach-alternative/': 'truecoach',
}

export default function ComparisonPage({
  path, title, description, ogTitle, crumb,
  product = 'coach',
  eyebrow,          // the search, e.g. "Trainerize alternative"
  headline, accent, intro,
  facts = [],       // [[label, value]] — the short version, all about us
  factsNote,        // one line under the table
  argument = [],    // paragraphs above the calculator
  worth = [], notWorth = [],
  doors,            // optional [{ title, price, body, href, cta, internal }] — two products side by side
  steps = [],       // [{ title, body }] — how to switch
  faq = [],
  related = [],     // [{ label, to }]
  ctaTitle, ctaBody,
}) {
  const url = `${SITE}${path}`
  const p = PRODUCT[product]

  /* The same facts as the visible page, never a second set. */
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: title,
        description,
        isPartOf: { '@id': `${SITE}/#site` },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: crumb, item: url },
        ],
      },
      { ...p.offer, description },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <>
      <Head>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:title" content={ogTitle ?? title.replace(/ \| Prometheus$/, '')} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${SITE}/images/og/${OG_IMAGE[path] ?? 'switch'}.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav />

        <Section className="pt-32 lg:pt-44 pb-14" width="narrow">
          <Reveal>
            <h1>
              <span className="eyebrow">{eyebrow}</span>
              <span className="block display text-4xl sm:text-6xl lg:text-7xl leading-[1.05]">
                {headline}{' '}
                <span className="display-soft">{accent}</span>
              </span>
            </h1>
            <p className="mt-7 text-lg text-muted leading-relaxed max-w-2xl">{intro}</p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
              <a href={p.signup} className="btn btn-primary btn-lg">
                {p.cta} <ArrowRight size={18} />
              </a>
              <Link to="/pricing/" className="btn btn-secondary btn-lg">
                See every plan
              </Link>
            </div>
          </Reveal>
        </Section>

        {/* The short version: what we cost and what is in it, stated plainly so
            an AI answer can quote it. */}
        <Section tone="raised" width="narrow">
          <SectionHeader align="left" eyebrow="The short version" title="What Prometheus costs" accent="and what is in it." />
          <Reveal delay={0.06} className="mt-10 card rounded-3xl overflow-hidden">
            <dl>
              {facts.map(([k, v], i) => (
                <div
                  key={k}
                  className={`grid sm:grid-cols-[13rem_1fr] gap-1 sm:gap-6 px-6 sm:px-8 py-5 ${i ? 'border-t border-line' : ''}`}
                >
                  <dt className="text-sm font-semibold text-accent-dark">{k}</dt>
                  <dd className="text-ink/80 leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          {factsNote && <p className="mt-5 text-sm text-muted leading-relaxed">{factsNote}</p>}
        </Section>

        {doors && (
          <Section width="narrow">
            <SectionHeader align="left" eyebrow="Two ways in" title="One room or several." accent="Pick the size you are." />
            <Reveal delay={0.06} className="mt-10 grid sm:grid-cols-2 gap-5">
              {doors.map((d) => (
                <div key={d.title} className="card rounded-3xl p-7 flex flex-col">
                  <h3 className="text-xl font-semibold tracking-tight">{d.title}</h3>
                  <p className="mt-2 text-3xl font-semibold tracking-tight">{d.price}</p>
                  <p className="mt-3 text-muted leading-relaxed">{d.body}</p>
                  {d.internal ? (
                    <Link to={d.href} className="btn btn-secondary mt-6 self-start">{d.cta} <ArrowRight size={16} /></Link>
                  ) : (
                    <a href={d.href} className="btn btn-secondary mt-6 self-start">{d.cta} <ArrowRight size={16} /></a>
                  )}
                </div>
              ))}
            </Reveal>
          </Section>
        )}

        <Section tone={doors ? 'raised' : 'default'} width="narrow">
          <SectionHeader align="left" eyebrow="The actual difference" title="One number," accent="and it is the one you pay." />
          <Reveal delay={0.06} className="mt-7 space-y-5 text-lg text-muted leading-relaxed">
            {argument.map((t) => <p key={t.slice(0, 40)}>{t}</p>)}
          </Reveal>

          {/* The comparison the visitor came for, without a claim about anyone
              else: his own bill, his own number crossed out. */}
          <StackCalculator mode={product} rows={p.rows} cta={p.cta} href={p.signup} className="mt-10" />

          <Reveal delay={0.12} className="mt-6 grid sm:grid-cols-2 gap-5">
            <div className="card rounded-3xl p-7">
              <h3 className="text-xl font-semibold tracking-tight mb-4">Worth switching for</h3>
              {worth.map((l) => (
                <div key={l} className="flex items-start gap-2.5 mt-3">
                  <Check size={17} className="text-accent-dark shrink-0 mt-1" />
                  <span className="text-ink/80 leading-snug">{l}</span>
                </div>
              ))}
            </div>
            {/* Naming what we do not do is the fastest way to be believed by
                someone who has read four vendor pages already. */}
            <div className="card rounded-3xl p-7">
              <h3 className="text-xl font-semibold tracking-tight mb-4">Not worth switching for</h3>
              {notWorth.map((l) => (
                <div key={l} className="flex items-start gap-2.5 mt-3">
                  <X size={17} className="text-ink/30 shrink-0 mt-1" />
                  <span className="text-muted leading-snug">{l}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </Section>

        {steps.length > 0 && (
          <Section tone={doors ? 'default' : 'raised'} width="narrow">
            <SectionHeader align="left" eyebrow="How to switch" title="Move over one step at a time," accent="with your clients on board." />
            <ol className="mt-10 space-y-4">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <Reveal delay={i * 0.04} className="card rounded-2xl p-6 flex gap-5">
                    <span aria-hidden="true" className="w-9 h-9 rounded-full bg-accent/12 text-accent-dark font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
                    <div>
                      <h3 className="font-semibold text-lg">{s.title}</h3>
                      <p className="mt-1.5 text-muted leading-relaxed">{s.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </Section>
        )}

        <Section tone={doors ? 'raised' : 'default'} width="narrow">
          <SectionHeader align="left" eyebrow="Questions" title="Asked before" accent="switching." />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faq.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex items-start justify-between gap-6 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold tracking-tight">{f.q}</h3>
                  <span aria-hidden="true" className="mt-1 w-6 h-6 rounded-full border border-line-strong flex items-center justify-center text-muted shrink-0 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted leading-relaxed max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
          {related.length > 0 && (
            <p className="mt-10 text-muted leading-relaxed">
              Read next:{' '}
              {related.map((r, i) => (
                <span key={r.to}>
                  {i > 0 && ' · '}
                  <Link to={r.to} className="text-accent-dark font-medium hover:underline underline-offset-4">{r.label}</Link>
                </span>
              ))}
            </p>
          )}
        </Section>

        <FinalCta title={ctaTitle} body={ctaBody} href={p.signup} cta={p.cta} />
        <HomeFooter />
      </div>
    </>
  )
}
