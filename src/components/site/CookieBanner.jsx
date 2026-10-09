import { useEffect, useState } from 'react'
import { GA4_ID, META_PIXEL_ID, readConsent, saveConsent } from '../../lib/tracking'

/* The cookie banner. Shown only when GA4 or the Meta Pixel is configured
 * (lib/tracking.js) and the visitor has not chosen yet; reopened from the
 * footer link "Cookie settings".
 *
 * Mounted as its own React root from main.jsx, outside the prerendered page:
 * it depends on localStorage, which does not exist at build time, and a
 * banner baked into the HTML would flash for visitors who already chose.
 *
 * "Reject" is as prominent as "Accept" on purpose — EU regulators treat a
 * hidden or weaker reject as invalid consent.
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false)
  const [details, setDetails] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    const c = readConsent()
    if (!c) setOpen(true)
    else {
      setAnalytics(!!c.analytics)
      setMarketing(!!c.marketing)
    }
    const reopen = () => { setDetails(true); setOpen(true) }
    window.addEventListener('prometheus:open-consent', reopen)
    return () => window.removeEventListener('prometheus:open-consent', reopen)
  }, [])

  if (!open) return null

  const choose = (c) => {
    saveConsent(c)
    setOpen(false)
  }

  return (
    <div role="dialog" aria-label="Cookie settings" className="fixed inset-x-3 bottom-3 sm:inset-x-auto sm:right-5 sm:bottom-5 z-[100] sm:max-w-md rounded-2xl border border-line bg-paper text-ink shadow-2xl p-5 font-body">
      <p className="font-semibold">Cookies, only if you agree</p>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        {GA4_ID && 'Google Analytics tells us which pages help. '}
        {META_PIXEL_ID && 'The Meta Pixel lets us show our ads to people who visited. '}
        {GA4_ID && META_PIXEL_ID
          ? 'Both set cookies and send data to Google or Meta, so they stay off until you say yes.'
          : `It sets cookies and sends data to ${GA4_ID ? 'Google' : 'Meta'}, so it stays off until you say yes.`}{' '}
        Our own visit counter uses no cookies and runs either way.{' '}
        <a href="/privacy/" className="underline underline-offset-2">Privacy policy</a>
      </p>

      {details && (
        <div className="mt-4 space-y-2 text-sm">
          {GA4_ID && (
            <label className="flex items-center justify-between gap-3 rounded-lg bg-tint px-3 py-2">
              <span>Statistics (Google Analytics)</span>
              <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-4 w-4 accent-[#E67E22]" />
            </label>
          )}
          {META_PIXEL_ID && (
            <label className="flex items-center justify-between gap-3 rounded-lg bg-tint px-3 py-2">
              <span>Marketing (Meta Pixel)</span>
              <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="h-4 w-4 accent-[#E67E22]" />
            </label>
          )}
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => choose({ analytics: false, marketing: false })} className="btn btn-secondary h-11 text-sm">
          Reject
        </button>
        <button type="button" onClick={() => choose({ analytics: true, marketing: true })} className="btn btn-primary h-11 text-sm">
          Accept all
        </button>
      </div>
      {details ? (
        <button type="button" onClick={() => choose({ analytics, marketing })} className="mt-2 w-full text-sm font-medium underline underline-offset-2">
          Save my choice
        </button>
      ) : (
        <button type="button" onClick={() => setDetails(true)} className="mt-2 w-full text-sm text-muted underline underline-offset-2">
          Choose
        </button>
      )}
    </div>
  )
}
