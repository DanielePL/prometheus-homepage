/* Third-party measurement on prometheus.coach: GA4, PostHog, Meta Pixel —
 * and the consent they need.
 *
 * Why this exists (2026-10-09): the SEO audit (Caitlin) asks for GA4 with a
 * cookie banner, PostHog and a Meta Pixel for retargeting; the owner agreed.
 * Our own cookieless counter (lib/beacon.js → site-beacon) keeps running
 * untouched — it needs no consent and stays the source for visits → signups.
 *
 * The rules:
 *   - GA4 and the Meta Pixel set cookies and send data to Google / Meta, so
 *     they load ONLY after the visitor says yes ("basic" consent: nothing is
 *     sent before). Analytics and marketing are separate choices.
 *   - PostHog runs cookieless (memory persistence, no session recording) and
 *     therefore without the banner.
 *   - An empty ID switches that tool off completely. With all three empty the
 *     site behaves exactly as before: no banner, no extra request.
 *
 * The IDs are public by design (they ship in every page of every site that
 * uses these tools), so they live here, not in an env var.
 */

export const GA4_ID = 'G-W2HY7HEGRH'  // GA4 property "prometheus.coach" (account Daniele Pauli, created 2026-10-09)
export const POSTHOG_KEY = ''      // 'phc_…' — project API key (public)
export const POSTHOG_HOST = 'https://eu.i.posthog.com'
export const META_PIXEL_ID = ''    // numeric pixel id

/* The banner only appears when a tool that needs consent is configured. */
export const needsConsent = Boolean(GA4_ID || META_PIXEL_ID)

const KEY = 'prometheus-consent-v1'

export function readConsent() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? null
  } catch {
    return null
  }
}

export function saveConsent({ analytics, marketing }) {
  const before = readConsent()
  try {
    localStorage.setItem(KEY, JSON.stringify({ analytics, marketing, ts: Date.now() }))
  } catch { /* private mode: the choice holds for this page view only */ }
  // Withdrawing consent after a tool has loaded: the cleanest way to stop it
  // is a reload, which then simply never loads it.
  if ((before?.analytics && !analytics) || (before?.marketing && !marketing)) {
    window.location.reload()
    return
  }
  apply({ analytics, marketing })
}

export const openConsentSettings = () => window.dispatchEvent(new Event('prometheus:open-consent'))

let gaLoaded = false
let pixelLoaded = false
let posthog = null

function loadScript(src) {
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function loadGA() {
  if (gaLoaded || !GA4_ID) return
  gaLoaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() { window.dataLayer.push(arguments) }
  window.gtag('js', new Date())
  // Page views are sent by trackPageview, once per route change (SPA).
  window.gtag('config', GA4_ID, { send_page_view: false, anonymize_ip: true })
  loadScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`)
}

function loadPixel() {
  if (pixelLoaded || !META_PIXEL_ID) return
  pixelLoaded = true
  /* Meta's standard loader, unrolled. */
  const fbq = function fbq() {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments)
  }
  fbq.push = fbq
  fbq.loaded = true
  fbq.version = '2.0'
  fbq.queue = []
  window.fbq = window._fbq = fbq
  loadScript('https://connect.facebook.net/en_US/fbevents.js')
  window.fbq('init', META_PIXEL_ID)
}

async function loadPosthog() {
  if (posthog || !POSTHOG_KEY) return
  const { default: ph } = await import('posthog-js')
  ph.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    persistence: 'memory',          // no cookie, no localStorage → no consent needed
    disable_session_recording: true,
    capture_pageview: false,        // sent by trackPageview
    capture_pageleave: true,
    autocapture: true,
  })
  posthog = ph
  trackPageview()
}

function apply(consent) {
  if (consent?.analytics) loadGA()
  if (consent?.marketing) loadPixel()
  trackPageview()
}

let lastPath = null
export function trackPageview() {
  if (typeof window === 'undefined') return
  const path = window.location.pathname + window.location.search
  if (path === lastPath) return
  lastPath = path
  if (gaLoaded) window.gtag('event', 'page_view', { page_path: path, page_location: window.location.href, page_title: document.title })
  if (pixelLoaded) window.fbq('track', 'PageView')
  posthog?.capture('$pageview')
}

/* A click on a signup link is the conversion Caitlin and the ads need. One
   delegated listener instead of an onClick on every CTA. */
function trackSignupClicks() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest?.('a[href]')
    if (!a) return
    const href = a.getAttribute('href')
    const product = href.includes('enterprise.prometheus.coach/auth/register') ? 'gym'
      : href.includes('app.prometheus.coach/onboarding') ? (href.includes('studio_light') ? 'studio' : 'coach')
      : null
    if (!product) return
    if (gaLoaded) window.gtag('event', 'sign_up_start', { product })
    if (pixelLoaded) window.fbq('track', 'Lead', { content_name: product })
    posthog?.capture('sign_up_start', { product })
  }, { capture: true })
}

/* Called once in the browser from main.jsx. */
export function initTracking() {
  if (!GA4_ID && !POSTHOG_KEY && !META_PIXEL_ID) return
  trackSignupClicks()
  loadPosthog()
  apply(readConsent())
}
