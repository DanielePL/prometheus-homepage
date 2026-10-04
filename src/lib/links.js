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

/* The gym product (Prometheus Enterprise) lives on its own app. Registration
   leads straight into the setup wizard, which starts the 30-day trial without
   a card (Prometheus-Enterprise/src/components/onboarding/OnboardingWizard.tsx). */
export const GYM_APP = 'https://enterprise.prometheus.coach'
export const SIGNUP_GYM = `${GYM_APP}/auth/register`

/* Public channels. Rendered as footer icons and as Organization.sameAs in the
   homepage's structured data, which is how a search engine ties the profiles
   to the site. Only channels we actually run; nothing placeholder. */
export const SOCIAL = [
  { name: 'Instagram', href: 'https://www.instagram.com/prometheuscoach/' },
  { name: 'YouTube', href: 'https://www.youtube.com/@prometheuscoach' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/prometheus-coach/' },
]
