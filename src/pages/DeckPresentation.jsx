import { useCallback, useEffect, useRef, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { ArrowRight, Maximize } from 'lucide-react'

/* /praesentation/?d=<slug> — a slide deck for one meeting, fullscreen, on our
 * own domain (owner, 2026-11-05: no claude.ai bar, fast, protected).
 *
 * public/decks/<slug>.json holds only ciphertext, made by
 * scripts/encrypt-deck.mjs. The access code derives the key here in the
 * browser, so the prerendered page and the static file carry no slide. The
 * code stays in this tab's sessionStorage so a reload in a meeting does not ask
 * again. Speaker notes never reach this page: the script removes them first.
 *
 * A deck written with --open (no code) is shown straight away; /balboa is one,
 * on its own path (owner, 2026-11-12).
 *
 * Unlisted, noindex, Disallow in robots.txt, not in the sitemap.
 *
 * Keys: → / space / PageDown (clickers send these) forward, ← / PageUp back,
 * F fullscreen, Home/End. Click the right part to go on, swipe on a tablet.
 */

const WIDTH = 1920
const HEIGHT = 1080

const COPY = {
  de: { title: 'Präsentation', label: 'Zugangscode', open: 'Öffnen', wrong: 'Dieser Code stimmt nicht.', missing: 'Diese Präsentation gibt es nicht.', hint: 'Sie haben den Code von Ihrem Ansprechpartner erhalten.', fullscreen: 'Vollbild' },
  en: { title: 'Presentation', label: 'Access code', open: 'Open', wrong: 'That code is not right.', missing: 'This presentation does not exist.', hint: 'Your Prometheus contact gave you the code.', fullscreen: 'Fullscreen' },
}

/* The slide format assumes these defaults; the site's reset removes them. */
const SLIDE_CSS = `
.deck-slide>section{position:absolute;left:0;top:0;width:${WIDTH}px;height:${HEIGHT}px;overflow:hidden;box-sizing:border-box}
.deck-slide h1,.deck-slide h2,.deck-slide h3,.deck-slide p,.deck-slide ul,.deck-slide table{margin:0}
.deck-slide ul{list-style:disc;padding-left:1.1em}
.deck-slide li+li{margin-top:.15em}
.deck-slide table{border-collapse:collapse}
.deck-slide th,.deck-slide td{padding:.35em .6em;text-align:left;border-bottom:1px solid #DCD8CF}
.deck-slide th{font-weight:600}
.deck-slide img{display:block;max-width:none}
`

const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))

async function decrypt(file, code) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(code.trim().toLowerCase()), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt: fromB64(file.salt), iterations: file.iterations },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt'],
  )
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(file.iv) }, key, fromB64(file.ct))
  return JSON.parse(new TextDecoder().decode(plain))
}

function Gate({ copy, busy, error, onSubmit }) {
  const [code, setCode] = useState('')
  return (
    <main className="fixed inset-0 flex items-center justify-center bg-[#17181C] px-5 text-white">
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(code) }}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8"
      >
        <img src="/images/flame.png" alt="" aria-hidden="true" width="500" height="500" className="h-10 w-10" />
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="mt-2 text-white/60">{copy.hint}</p>
        <label htmlFor="deck-code" className="mt-6 block text-sm font-medium text-white/80">{copy.label}</label>
        <input
          id="deck-code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          autoFocus
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          className="mt-2 h-12 w-full rounded-xl border border-white/15 bg-black/30 px-4 text-base text-white outline-none focus:border-accent"
        />
        {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
        <button type="submit" disabled={busy || !code.trim()} className="btn btn-primary mt-5 w-full justify-center disabled:opacity-50">
          {copy.open} <ArrowRight size={16} />
        </button>
      </form>
    </main>
  )
}

function Slides({ deck, copy }) {
  const [i, setI] = useState(0)
  const [scale, setScale] = useState(0)
  const total = deck.slides.length
  const go = useCallback((n) => setI((cur) => Math.max(0, Math.min(total - 1, typeof n === 'function' ? n(cur) : n))), [total])

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / WIDTH, window.innerHeight / HEIGHT))
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  /* The slide number lives in the hash, so a reload returns to the same slide. */
  useEffect(() => {
    const start = parseInt(window.location.hash.slice(1), 10)
    if (start >= 1 && start <= total) setI(start - 1)
  }, [total])
  useEffect(() => {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${i + 1}`)
  }, [i])

  const fullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen?.()
    else document.documentElement.requestFullscreen?.()
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (['ArrowRight', ' ', 'PageDown', 'Enter'].includes(e.key)) { e.preventDefault(); go((c) => c + 1) }
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); go((c) => c - 1) }
      else if (e.key === 'Home') go(0)
      else if (e.key === 'End') go(total - 1)
      else if (e.key === 'f' || e.key === 'F') fullscreen()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, total, fullscreen])

  const x0 = useRef(null)

  return (
    <main
      className="fixed inset-0 overflow-hidden bg-black select-none"
      onClick={(e) => {
        if (e.target.closest('button')) return
        go((c) => c + (e.clientX > window.innerWidth / 3 ? 1 : -1))
      }}
      onTouchStart={(e) => { x0.current = e.touches[0].clientX }}
      onTouchEnd={(e) => {
        if (x0.current === null) return
        const dx = e.changedTouches[0].clientX - x0.current
        if (Math.abs(dx) > 50) go((c) => c + (dx < 0 ? 1 : -1))
        x0.current = null
      }}
    >
      <style>{SLIDE_CSS}</style>
      {scale > 0 && (
        <div
          className="deck-slide absolute left-1/2 top-1/2"
          style={{ width: WIDTH, height: HEIGHT, transform: `translate(-50%, -50%) scale(${scale})` }}
          dangerouslySetInnerHTML={{ __html: deck.slides[i] }}
        />
      )}
      <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-xs text-white/60 opacity-0 transition-opacity hover:opacity-100 focus-within:opacity-100">
        <span className="tabular-nums">{i + 1} / {total}</span>
        <button type="button" aria-label={copy.fullscreen} title={copy.fullscreen} onClick={fullscreen} className="rounded-full p-1 hover:text-white">
          <Maximize size={15} />
        </button>
      </div>
    </main>
  )
}

export default function DeckPresentation({ slug: fixedSlug }) {
  const [file, setFile] = useState(null)
  const [deck, setDeck] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [missing, setMissing] = useState(false)
  const [slug, setSlug] = useState('')
  const copy = COPY[file?.lang] || COPY.de

  /* Read in an effect: the prerendered page knows no deck. */
  useEffect(() => {
    const s = fixedSlug || new URLSearchParams(window.location.search).get('d') || ''
    if (!/^[a-z0-9-]{1,60}$/.test(s)) { setMissing(true); return }
    setSlug(s)
    fetch(`/decks/${s}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error('missing'))))
      .then(async (f) => {
        setFile(f)
        if (f.open) { setDeck({ title: f.title, slides: f.slides }); return }
        let saved = null
        try { saved = sessionStorage.getItem(`deck:${s}`) } catch { /* blocked storage: ask for the code */ }
        if (saved) {
          try { setDeck(await decrypt(f, saved)) } catch { /* a changed code: ask again */ }
        }
      })
      .catch(() => setMissing(true))
  }, [fixedSlug])

  const unlock = async (code) => {
    setBusy(true)
    setError('')
    try {
      const d = await decrypt(file, code)
      try { sessionStorage.setItem(`deck:${slug}`, code) } catch { /* private mode: ask again after a reload */ }
      setDeck(d)
    } catch {
      setError(copy.wrong)
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Head>
        <title>Prometheus</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Archivo:wght@400;500;600;700&display=swap" />
      </Head>
      {deck ? (
        <Slides deck={deck} copy={copy} />
      ) : missing ? (
        <main className="fixed inset-0 flex items-center justify-center bg-[#17181C] text-white/70">{copy.missing}</main>
      ) : file ? (
        <Gate copy={copy} busy={busy} error={error} onSubmit={unlock} />
      ) : (
        <main className="fixed inset-0 bg-[#17181C]" />
      )}
    </>
  )
}
