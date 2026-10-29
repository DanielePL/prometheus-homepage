import { useEffect, useRef, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { ArrowRight, Check, Loader2, Lock } from 'lucide-react'
import { getSupabase } from '../lib/supabase'

/* /nda/?c=<token> — sign a non-disclosure agreement online (owner,
 * 2026-10-29). Daniele creates the NDA in the Forge (Enterprise → NDAs) and
 * sends this link to one person. They read the text, type name and place,
 * sign with finger or mouse; the edge function website-nda-sign (in
 * prometheus-admin) stores it, mails both sides a copy and only then returns
 * the link to the confidential material.
 *
 * noindex, robots.txt disallows it, linked from nowhere. Without a valid token
 * the page shows only "not found". */

const field = 'w-full h-12 px-4 rounded-md border border-line bg-white text-base text-ink placeholder-muted/60 focus:outline-none focus:border-accent transition-colors'
const label = 'block text-sm font-medium text-ink mb-1.5'

async function sha256(s) {
  const d = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s))
  return [...new Uint8Array(d)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

const chDateTime = (iso) =>
  new Date(iso).toLocaleString('de-CH', { dateStyle: 'medium', timeStyle: 'short' })

async function call(body) {
  const { data, error } = await getSupabase().functions.invoke('website-nda-sign', { body })
  if (error) {
    const status = error.context?.status
    let detail = null
    try { detail = await error.context?.json() } catch { /* no body */ }
    const e = new Error(detail?.error ?? 'failed')
    e.status = status
    e.fields = detail?.fields
    throw e
  }
  return data
}

function SignaturePad({ onChange }) {
  const ref = useRef(null)
  const drawing = useRef(false)
  const dirty = useRef(false)

  useEffect(() => {
    const c = ref.current
    const ratio = window.devicePixelRatio || 1
    c.width = c.offsetWidth * ratio
    c.height = c.offsetHeight * ratio
    const ctx = c.getContext('2d')
    ctx.scale(ratio, ratio)
    ctx.lineWidth = 2.2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.strokeStyle = '#111'
  }, [])

  const pos = (e) => {
    const r = ref.current.getBoundingClientRect()
    return [e.clientX - r.left, e.clientY - r.top]
  }
  const down = (e) => {
    e.preventDefault()
    ref.current.setPointerCapture(e.pointerId)
    drawing.current = true
    const ctx = ref.current.getContext('2d')
    const [x, y] = pos(e)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + 0.1, y + 0.1)
    ctx.stroke()
  }
  const move = (e) => {
    if (!drawing.current) return
    const ctx = ref.current.getContext('2d')
    const [x, y] = pos(e)
    ctx.lineTo(x, y)
    ctx.stroke()
    dirty.current = true
  }
  const up = () => {
    if (!drawing.current) return
    drawing.current = false
    if (dirty.current) onChange(ref.current.toDataURL('image/png'))
  }
  const clear = () => {
    const c = ref.current
    c.getContext('2d').clearRect(0, 0, c.width, c.height)
    dirty.current = false
    onChange('')
  }

  return (
    <div>
      <div className="relative rounded-md border border-line bg-white">
        <canvas
          ref={ref}
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={up}
          onPointerCancel={up}
          className="block w-full h-44 touch-none cursor-crosshair"
          aria-label="Unterschriftfeld"
        />
        <span className="pointer-events-none absolute left-4 right-4 bottom-10 border-b border-dashed border-line" />
      </div>
      <div className="mt-2 flex justify-between text-sm text-muted">
        <span>Mit Finger oder Maus unterschreiben</span>
        <button type="button" onClick={clear} className="underline underline-offset-4">Neu</button>
      </div>
    </div>
  )
}

export default function NdaPage() {
  const [token, setToken] = useState('')
  const [nda, setNda] = useState(null)
  const [state, setState] = useState('loading') // loading | missing | ready | sending | done | error
  const [f, setF] = useState({ signer_name: '', signer_place: '', accepted: false })
  const [signature, setSignature] = useState('')
  const [error, setError] = useState('')
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }))

  useEffect(() => {
    const t = (new URLSearchParams(window.location.search).get('c') || '').trim().toLowerCase()
    setToken(t)
    if (!/^[0-9a-f]{64}$/.test(t)) { setState('missing'); return }
    call({ action: 'get', token: t })
      .then((d) => {
        setNda(d)
        setF((s) => ({ ...s, signer_name: d.recipient_name }))
        setState(d.status === 'signed' ? 'done' : 'ready')
      })
      .catch(() => setState('missing'))
  }, [])

  async function submit(e) {
    e.preventDefault()
    if (!signature) { setError('Bitte unterschreibe im Feld.'); return }
    setState('sending')
    setError('')
    try {
      const d = await call({
        action: 'sign', token, ...f, signature, text_sha256: await sha256(nda.nda_text),
      })
      setNda((n) => ({ ...n, status: 'signed', signer_name: f.signer_name, signed_at: d.signed_at, release_url: d.release_url }))
      setState('done')
      window.scrollTo({ top: 0 })
    } catch (err) {
      setError(err.fields?.length
        ? `Bitte prüfen: ${err.fields.join(', ')}.`
        : 'Das hat nicht geklappt. Schreib uns an management@prometheus.coach.')
      setState('ready')
    }
  }

  return (
    <>
      <Head>
        <html lang="de-CH" />
        <title>Geheimhaltungsvereinbarung | Peakforce GmbH</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <main className="min-h-screen bg-tint pt-16 pb-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <a href="/" className="inline-flex items-center gap-2 text-ink">
            <img src="/images/flame.png" alt="" aria-hidden="true" width="500" height="500" className="h-7 w-7" />
            <span className="font-semibold">Peakforce</span>
          </a>

          {state === 'loading' && (
            <div className="mt-20 flex justify-center text-muted"><Loader2 className="animate-spin" /></div>
          )}

          {state === 'missing' && (
            <div className="mt-12 rounded-lg border border-line bg-white p-8 text-center">
              <h1 className="display text-3xl">Link nicht gefunden.</h1>
              <p className="mt-4 text-muted">Der Link ist unvollständig oder nicht mehr gültig. Schreib uns an management@prometheus.coach.</p>
            </div>
          )}

          {state === 'done' && nda && (
            <div className="mt-12 rounded-lg border border-line bg-white p-8 sm:p-12 text-center">
              <span className="inline-flex w-14 h-14 items-center justify-center rounded-md bg-accent/10 text-accent-dark"><Check size={28} /></span>
              <h1 className="display text-4xl mt-6">Danke, {nda.signer_name?.split(' ')[0]}.</h1>
              <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
                Die Geheimhaltungsvereinbarung ist unterschrieben{nda.signed_at ? `, am ${chDateTime(nda.signed_at)}` : ''}.
                Eine Kopie geht per E-Mail an dich.
              </p>
              {nda.release_url && (
                <a href={nda.release_url} className="btn btn-primary btn-lg mt-8 inline-flex !rounded-md">
                  Zu den Unterlagen <ArrowRight size={18} />
                </a>
              )}
            </div>
          )}

          {(state === 'ready' || state === 'sending') && nda && (
            <>
              <h1 className="display text-4xl sm:text-5xl mt-10">Geheimhaltungsvereinbarung</h1>
              <p className="mt-4 text-lg text-muted">
                Für {nda.recipient_name}{nda.recipient_company ? `, ${nda.recipient_company}` : ''}. Bitte lies den Text und
                unterschreibe unten. Danach bekommst du den Zugang zu den Unterlagen.
              </p>

              <article className="mt-8 rounded-lg border border-line bg-white p-6 sm:p-8 whitespace-pre-wrap text-ink leading-relaxed">
                {nda.nda_text}
              </article>
              <p className="mt-2 text-xs text-muted">{nda.text_version}</p>

              <form onSubmit={submit} className="mt-8 rounded-lg border border-line bg-white p-6 sm:p-8 space-y-5">
                <h2 className="text-xl font-semibold text-ink">Unterschrift</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label>
                    <span className={label}>Vor- und Nachname<span className="text-accent"> *</span></span>
                    <input required value={f.signer_name} onChange={(e) => set('signer_name', e.target.value)} autoComplete="name" className={field} />
                  </label>
                  <label>
                    <span className={label}>Ort<span className="text-accent"> *</span></span>
                    <input required value={f.signer_place} onChange={(e) => set('signer_place', e.target.value)} autoComplete="address-level2" className={field} />
                  </label>
                </div>
                <SignaturePad onChange={setSignature} />
                <label className="flex gap-3 items-start cursor-pointer">
                  <input type="checkbox" required checked={f.accepted} onChange={(e) => set('accepted', e.target.checked)} className="mt-1 w-5 h-5 accent-[#E67E22]" />
                  <span className="text-ink">
                    Ich habe die Vereinbarung gelesen, bin einverstanden und unterschreibe sie hiermit elektronisch.
                    Datum und Uhrzeit werden gespeichert.
                  </span>
                </label>
                {error && <p className="text-red-700">{error}</p>}
                <button type="submit" disabled={state === 'sending'} className="btn btn-primary btn-lg w-full justify-center !rounded-md disabled:opacity-60">
                  {state === 'sending' ? <Loader2 size={18} className="animate-spin" /> : <><Lock size={18} /> Unterschreiben</>}
                </button>
                <p className="text-center text-sm text-muted">Peakforce GmbH · Niederfelbenweg 4, 8702 Zollikon · CHE-438.502.677</p>
              </form>
            </>
          )}
        </div>
      </main>
    </>
  )
}
