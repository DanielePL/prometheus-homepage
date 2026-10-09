import { ViteReactSSG } from 'vite-react-ssg'
import './index.css'
import { routes } from './routes.jsx'
import { countVisit } from './lib/beacon'
import { initTracking, needsConsent, trackPageview } from './lib/tracking'

/* ViteReactSSG instead of createRoot.
 *
 * At build time it renders every route in PRERENDERED_PATHS to static HTML; in
 * the browser it hydrates that HTML instead of mounting into an empty div. The
 * router is created for us, so BrowserRouter is gone — wrapping the tree twice
 * would break hydration.
 *
 * Why this exists: prometheus.coach served 67 characters of text and no <h1>.
 * A page with no content in its HTML cannot rank for anything, including its
 * own brand name.
 */
export const createRoot = ViteReactSSG({ routes }, ({ isClient, router }) => {
  /* Count each page view, in the browser only — during the build this runs in
     Node, where there is no visitor to count.
     Subscribing to the router rather than firing once: this is a single-page
     app, so a move from / to /studios/ never reloads and would otherwise go
     unrecorded. */
  if (!isClient) return
  countVisit()
  router?.subscribe?.(() => {
    countVisit()
    trackPageview()
  })

  /* GA4 / PostHog / Meta Pixel (lib/tracking.js). All off while their IDs
     are empty; GA4 and the Pixel additionally wait for consent. The banner
     gets its own root so it never touches the prerendered page. */
  initTracking()
  if (needsConsent) {
    Promise.all([import('react-dom/client'), import('./components/site/CookieBanner')]).then(([{ createRoot }, { default: CookieBanner }]) => {
      const el = document.createElement('div')
      document.body.appendChild(el)
      createRoot(el).render(<CookieBanner />)
    })
  }
})
