/* Counts this page view. Nothing else.
 *
 * No cookie, no localStorage, no sessionStorage, no identifier — so there is
 * nothing to consent to and nothing to leak. The cost is that "unique visitors"
 * is unanswerable; we can count visits, not people. That is the trade we chose
 * (supabase/functions/site-beacon/index.ts explains why).
 *
 * The number this feeds is visits-to-signups, which decides whether the
 * advertising is worth its money — see docs/CONTENT_PLAN.md §2 in the admin
 * repo. Without it every budget decision is a guess.
 *
 * sendBeacon rather than fetch: it survives the page being closed mid-flight
 * and never delays a navigation. Failures are silent by design — a counter must
 * not be able to break a page.
 */
// Same project as the signup forms (src/lib/supabase.js); Render sets VITE_SUPABASE_URL (Zurich since 2026-10-15).
const ENDPOINT = `${import.meta.env.VITE_SUPABASE_URL || 'https://api.prometheus.coach'}/functions/v1/site-beacon`

export function countVisit() {
  if (typeof window === 'undefined' || !navigator.sendBeacon) return

  try {
    const q = new URLSearchParams(window.location.search)
    const body = JSON.stringify({
      event: 'site.page_view',
      route: window.location.pathname,
      referrer: document.referrer || null,
      // Only forwarded when present. gclid is what ties an ad click to the
      // signup it produced; without it the ad spend cannot be judged.
      gclid: q.get('gclid'),
      utm_source: q.get('utm_source'),
      utm_medium: q.get('utm_medium'),
      utm_campaign: q.get('utm_campaign'),
      viewport: window.innerWidth < 768 ? 'mobile' : 'desktop',
    })
    navigator.sendBeacon(ENDPOINT, new Blob([body], { type: 'application/json' }))
  } catch {
    /* A visitor must never notice that this exists. */
  }
}
