import { Suspense, lazy } from 'react'
import HomePage from './pages/HomePage'

/* Routes as data, not JSX.
 *
 * vite-react-ssg needs the route table at build time so it can walk it, render
 * each path in Node and write real HTML to disk. A <Routes> tree only exists
 * once React is running in a browser, which is exactly the problem this file
 * solves: the site was shipping 67 characters of text to Google — no content,
 * no <h1>, nothing to rank.
 *
 * The homepage is imported eagerly; it is the only route most visitors see, and
 * lazy-loading it would keep it out of the prerendered output for no gain.
 */
const StudiosPage = lazy(() => import('./pages/StudiosPage'))
const TrainerizeAlternative = lazy(() => import('./pages/TrainerizeAlternative'))
const EnterprisePage = lazy(() => import('./pages/EnterprisePage'))
const NotFound = lazy(() => import('./pages/NotFound'))
const LegalLayout = lazy(() => import('./layouts/LegalLayout'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const Impressum = lazy(() => import('./pages/Impressum'))
const Goodbye = lazy(() => import('./pages/Goodbye'))
const GrowthPitch = lazy(() => import('./pages/GrowthPitch'))
const AuthCallback = lazy(() => import('./pages/AuthCallback'))
const StripeTitanSuccess = lazy(() => import('./pages/StripeTitanSuccess'))

const wrap = (node) => (
  <Suspense fallback={<div className="min-h-screen bg-paper" />}>{node}</Suspense>
)

export const routes = [
  { path: '/', element: <HomePage /> },

  /* The studio door. Lazy because a coach arriving on the homepage never needs
     it, but prerendered like the homepage — it has to rank on its own. */
  { path: '/studios', element: wrap(<StudiosPage />) },

  /* The pilot call for the multi-site product. Prerendered so a chain owner
     who searches for it finds a page, not a bundle. */
  { path: '/enterprise', element: wrap(<EnterprisePage />) },

  /* Answers the highest-intent query in the category. Prerendered — an AI
     answer can only quote numbers it can read in the first response. */
  { path: '/trainerize-alternative', element: wrap(<TrainerizeAlternative />) },

  { path: '/growth', element: wrap(<GrowthPitch />) },

  /* NOT prerendered — see PRERENDERED_PATHS and vite.config.js.
   *
   * Both read window.location during render to pick the value out of the URL
   * fragment, which has no meaning in Node and would crash the build. They are
   * also pure runtime redirects: an OAuth return and a Stripe return. There is
   * nothing here a crawler should index. */
  { path: '/auth/callback', element: wrap(<AuthCallback />) },
  { path: '/stripe/success', element: wrap(<StripeTitanSuccess />) },

  {
    element: wrap(<LegalLayout />),
    children: [
      { path: '/privacy', element: wrap(<PrivacyPolicy />) },
      { path: '/terms', element: wrap(<TermsOfService />) },
      { path: '/impressum', element: wrap(<Impressum />) },
      { path: '/goodbye', element: wrap(<Goodbye />) },
    ],
  },

  /* Prerendered at /404 and copied to dist/404.html, which the host serves —
     with a real 404 status — for anything that matches no file. The wildcard
     catches the same case client-side, after a wrong in-app link. */
  { path: '/404', element: wrap(<NotFound />) },
  { path: '*', element: wrap(<NotFound />) },
]
