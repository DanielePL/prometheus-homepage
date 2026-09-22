/* Every outbound link to the product, in one place.
 *
 * /onboarding is the route paid traffic already converts through — "/" in the
 * coach app is behind the login and would bounce an ad click straight to a
 * password field. Do not point a CTA at the bare domain.
 */
export const APP = 'https://app.prometheus.coach'
export const SIGNUP = `${APP}/onboarding`
export const SIGNUP_STUDIO = `${APP}/onboarding?plan=studio_light`
export const PRICING = `${APP}/pricing`
export const CONTACT = 'mailto:management@prometheus.coach'

/* Public channels. Rendered as footer icons and as Organization.sameAs in the
   homepage's structured data, which is how a search engine ties the profiles
   to the site. Only channels we actually run; nothing placeholder. */
export const SOCIAL = [
  { name: 'Instagram', href: 'https://www.instagram.com/prometheuscoach/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@PrometheusCoaching' },
  // LinkedIn: only the PeakForce company page exists (2026-09-22); a Prometheus
  // page is still to be created. Add it here once it is.
]
