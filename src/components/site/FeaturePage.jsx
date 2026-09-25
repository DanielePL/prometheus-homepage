import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Section, SectionHeader, Reveal } from './Section'
import { HomeNav, HomeFooter } from '../home/HomeChrome'
import { FinalCta } from '../home/Closing'
import { SIGNUP } from '../../lib/links'

/* One layout for the four feature pages (nutrition, video review, payments,
 * the assistant). Each page is a data file; this is the shape.
 *
 * Why feature pages at all: the domain had six pages of ~800 words. A coach
 * who searches for one thing — "nutrition coaching software", "invoicing for
 * personal trainers" — found a homepage that mentions it in one card. Each
 * page now owns one of those intents, with a real screenshot, the search
 * phrase as the first line of the H1, a FAQ that can be quoted, and the same
 * price truth as everywhere else.
 *
 * Every claim on these pages is a claim about us. No competitor, no invented
 * number, nothing free beyond the 14-day trial.
 */

export default function FeaturePage({
  path, title, description, ogImage,
  chip, headline, accent, intro,
  hero,            // { src, alt, width, height, frame: 'browser' | 'plain' }
  sections = [],   // [{ eyebrow, title, accent, body: [..], shot?: {src, alt, width, height}, phones?: [[src, alt], ...] }]
  included = [],   // bullet list under "In every plan"
  faq = [],
  ctaTitle, ctaBody,
}) {
  const url = `https://prometheus.coach${path}`
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': url,
        url,
        name: title,
        description,
        isPartOf: { '@id': 'https://prometheus.coach/#site' },
        about: { '@id': 'https://prometheus.coach/#app' },
        inLanguage: 'en',
      },
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
        <meta property="og:title" content={title.replace(/ \| Prometheus$/, '')} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`https://prometheus.coach${ogImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(ld)}</script>
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body">
        <HomeNav />

        <section className="relative pt-32 lg:pt-40 pb-12 lg:pb-16 px-5 sm:px-8 overflow-hidden">
          <div className="hero-glow absolute inset-x-0 top-0 h-[70vh] pointer-events-none" aria-hidden="true" />
          <div className="relative max-w-7xl mx-auto">
            <div className="max-w-3xl hero-rise">
              <h1>
                <span className="eyebrow">{chip}</span>
                <span className="block display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.5rem]">
                  {headline}{' '}
                  <span className="display-soft">{accent}</span>
                </span>
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">{intro}</p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <a href={SIGNUP} className="btn btn-primary btn-lg">
                  Start free — 14 days, no card <ArrowRight size={18} />
                </a>
                <Link to="/pricing/" className="btn btn-secondary btn-lg">
                  See pricing
                </Link>
              </div>
              <p className="mt-7 text-base text-muted">
                <span className="font-semibold text-ink">Included from $19 a month.</span>{' '}
                Not an add-on, not a higher tier.
              </p>
            </div>

            {hero && (
              <Reveal delay={0.1} y={30} className="mt-14 lg:mt-20 relative">
                <div className="absolute inset-x-[10%] top-1/3 bottom-0 bg-accent/15 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
                <div className="shot relative rounded-2xl overflow-hidden">
                  {hero.frame !== 'plain' && <div className="shot-bar" aria-hidden="true"><i /><i /><i /></div>}
                  <img src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} className="w-full block" />
                </div>
              </Reveal>
            )}
          </div>
        </section>

        {sections.map((s, i) => (
          <Section key={s.title} tone={i % 2 === 0 ? 'raised' : 'default'}>
            <div className={`grid gap-12 lg:gap-16 items-center ${s.shot || s.phones ? 'lg:grid-cols-[1fr_1.05fr]' : ''}`}>
              <div className={s.shot || s.phones ? (i % 2 === 1 ? 'lg:order-2' : '') : 'max-w-3xl'}>
                <SectionHeader align="left" eyebrow={s.eyebrow} title={s.title} accent={s.accent} />
                <Reveal delay={0.06} className="mt-7 space-y-5 text-lg text-muted leading-relaxed">
                  {s.body.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
                </Reveal>
              </div>
              {s.shot && (
                <Reveal delay={0.1} y={26} className={`relative ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="absolute inset-2 bg-accent/12 blur-[70px] rounded-full pointer-events-none" aria-hidden="true" />
                  <div className="shot relative rounded-2xl overflow-hidden">
                    <img src={s.shot.src} alt={s.shot.alt} width={s.shot.width} height={s.shot.height} loading="lazy" className="w-full block" />
                  </div>
                </Reveal>
              )}
              {s.phones && (
                <Reveal delay={0.1} y={26} className={`relative flex justify-center gap-5 sm:gap-8 py-6 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="absolute inset-x-[15%] top-[20%] bottom-[10%] bg-accent/15 blur-[90px] rounded-full pointer-events-none" aria-hidden="true" />
                  {s.phones.map(([src, alt], n) => (
                    <div key={src} className={`${n === 1 ? 'mt-12' : ''} relative w-[46%] max-w-[230px]`}>
                      <div className="phone-shell"><div className="phone-screen"><span className="phone-island" aria-hidden="true" /><img src={src} alt={alt} width="640" height="1385" loading="lazy" /></div></div>
                    </div>
                  ))}
                </Reveal>
              )}
            </div>
          </Section>
        ))}

        {included.length > 0 && (
          <Section tone={sections.length % 2 === 0 ? 'raised' : 'default'}>
            <SectionHeader align="left" eyebrow="In every plan" title="What this includes." accent="At every price." />
            <Reveal delay={0.06} className="mt-10 grid md:grid-cols-2 gap-x-10 gap-y-3 max-w-5xl">
              {included.map((l) => (
                <div key={l} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-accent/12 text-accent-dark flex items-center justify-center shrink-0"><Check size={12} strokeWidth={3} /></span>
                  <span className="text-ink/80 leading-snug">{l}</span>
                </div>
              ))}
            </Reveal>
          </Section>
        )}

        {faq.length > 0 && (
          <Section tone={(sections.length + 1) % 2 === 0 ? 'raised' : 'default'} width="narrow">
            <SectionHeader align="left" eyebrow="Questions" title="Asked before" accent="starting." />
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
          </Section>
        )}

        <FinalCta title={ctaTitle} body={ctaBody} />
        <HomeFooter />
      </div>
    </>
  )
}
