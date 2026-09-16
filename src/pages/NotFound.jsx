import { Head } from 'vite-react-ssg'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { SIGNUP } from '../lib/links'

/* Prerendered to dist/404.html, which a static host serves — with a real 404
 * status — for any path that matches no file.
 *
 * It only gets that chance once the blanket "/* → /index.html" rewrite is gone
 * from the Render dashboard. Until then every unknown URL answers 200 with the
 * homepage: a soft 404, which search engines treat as an endless supply of
 * duplicate homepages, and which hides broken internal links because nothing
 * ever fails visibly.
 *
 * Also mounted on path="*" so a wrong link followed inside the app lands here
 * rather than on a blank screen.
 */
export default function NotFound() {
  return (
    <>
      <Head>
        <html lang="en" />
        <title>Page not found · Prometheus</title>
        {/* Nothing here should ever be indexed, whatever URL it was reached by. */}
        <meta name="robots" content="noindex, follow" />
      </Head>

      <div className="min-h-screen bg-paper text-ink font-body flex flex-col">

        <div className="relative z-10 flex-1 flex flex-col">
          <HomeNav />

          <Section width="narrow" className="flex-1 pt-40 lg:pt-52">
            <Reveal>
              <p className="eyebrow mb-5">404</p>
              <h1 className="display text-4xl sm:text-6xl leading-[1.05]">
                That page is not here.{' '}
                <span className="display-soft">The coaching still is.</span>
              </h1>
              <p className="mt-7 text-lg text-muted leading-relaxed max-w-xl">
                Either the link is wrong or the page has moved. Both are our fault, not
                yours.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3.5">
                <Link
                  to="/"
                  className="btn btn-primary btn-lg"
                >
                  Back to the start <ArrowRight size={18} />
                </Link>
                <a
                  href={SIGNUP}
                  className="btn btn-secondary btn-lg"
                >
                  Start free — 14 days, no card
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <Link to="/studios/" className="text-muted hover:text-ink transition-colors">
                  For studios
                </Link>
                <Link to="/trainerize-alternative/" className="text-muted hover:text-ink transition-colors">
                  Switching from Trainerize
                </Link>
                <a href="/#pricing" className="text-muted hover:text-ink transition-colors">
                  Pricing
                </a>
              </div>
            </Reveal>
          </Section>

          <HomeFooter />
        </div>
      </div>
    </>
  )
}
