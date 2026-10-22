import { useEffect, useState } from 'react'
import { ArrowRight, Check, X, Loader2 } from 'lucide-react'
import { getSupabase } from '../../lib/supabase'

/* The German request form behind every contact button on /schweiz/ and
   /fussball/. It goes through the same edge function as the English demo form
   (`website-demo-request`, owned by the Enterprise repo): validated,
   rate-limited per IP, stored in demo_requests and mailed to the sales inbox.
   `website` is the honeypot. `source` tells the inbox which page sent it.

   The defaults are the /schweiz/ copy (du, studio); a page with another
   audience passes its own `copy`. */
const STUDIO_COPY = {
  title: 'Erzähl uns von deinem Studio.',
  lead: 'Unverbindlich. Das Prometheus-Team meldet sich bei dir.',
  org: 'Studio',
  message: 'Was möchtest du wissen? Welches System hast du heute, wie viele Mitglieder?',
  thanks: 'Deine Anfrage ist bei uns. Das Prometheus-Team meldet sich bei dir.',
  error: 'Das hat nicht geklappt. Schreib uns direkt an',
  subject: 'Prometheus für mein Studio',
}

export default function AskModal({ topics: allTopics, preset = [], source, copy = STUDIO_COPY, onClose }) {
  const [form, setForm] = useState({ name: '', studio: '', email: '', phone: '', message: '', website: '' })
  const [topics, setTopics] = useState(preset)
  const [state, setState] = useState('idle')
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const mail = 'mailto:management@prometheus.coach?subject=' + encodeURIComponent(copy.subject)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  async function submit(e) {
    e.preventDefault()
    setState('loading')
    const picked = allTopics.filter((t) => topics.includes(t.key)).map((t) => t.label)
    const message = [
      picked.length ? `Interesse: ${picked.join(', ')}` : '',
      form.message.trim(),
    ].filter(Boolean).join('\n\n')
    try {
      const { data, error } = await getSupabase().functions.invoke('website-demo-request', {
        body: {
          name: form.name,
          company: form.studio,
          email: form.email,
          phone: form.phone,
          message,
          website: form.website,
          source,
        },
      })
      if (error || !data?.ok) throw error ?? new Error('rejected')
      setState('done')
    } catch {
      setState('error')
    }
  }

  const input = 'w-full h-12 px-4 rounded-md bg-white/[0.05] border border-white/15 text-base text-white placeholder-white/35 focus:outline-none focus:border-accent/60 transition-colors'
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label="Anfrage senden" className="modal-scrim fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div onClick={(e) => e.stopPropagation()} className="modal-card relative w-full max-w-xl max-h-[92svh] overflow-y-auto rounded-xl bg-night border border-white/10 p-6 sm:p-9 text-white shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
        <button type="button" onClick={onClose} aria-label="Schliessen" className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-colors">
          <X size={20} />
        </button>
        {state === 'done' ? (
          <div className="text-center py-8">
            <span className="inline-flex w-14 h-14 items-center justify-center rounded-md bg-accent/15 text-accent"><Check size={28} /></span>
            <h3 className="display text-3xl mt-5">Danke{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</h3>
            <p className="mt-3 text-white/65 max-w-sm mx-auto">{copy.thanks}</p>
            <button type="button" onClick={onClose} className="btn btn-primary mt-7 !rounded-md">Schliessen</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="eyebrow">Anfrage</p>
            <h3 className="display text-3xl mt-4">{copy.title}</h3>
            <p className="mt-2 text-white/60">{copy.lead}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {allTopics.map((t) => {
                const on = topics.includes(t.key)
                return (
                  <button
                    key={t.key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setTopics(on ? topics.filter((k) => k !== t.key) : [...topics, t.key])}
                    className={`h-10 px-4 rounded-md text-sm border transition-colors ${on ? 'bg-accent border-accent text-white' : 'border-white/20 text-white/75 hover:border-white/50'}`}
                  >
                    {t.label}
                  </button>
                )
              })}
            </div>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <input className={input} required placeholder="Name *" autoComplete="name" value={form.name} onChange={set('name')} />
              <input className={input} placeholder={copy.org} autoComplete="organization" value={form.studio} onChange={set('studio')} />
              <input className={input} required type="email" placeholder="E-Mail *" autoComplete="email" value={form.email} onChange={set('email')} />
              <input className={input} type="tel" placeholder="Telefon" autoComplete="tel" value={form.phone} onChange={set('phone')} />
            </div>
            <textarea
              rows={4}
              placeholder={copy.message}
              value={form.message}
              onChange={set('message')}
              className={`${input} h-auto py-3 mt-3 resize-none`}
            />
            <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} className="absolute -left-[9999px] w-px h-px opacity-0" />
            {state === 'error' && (
              <p className="mt-4 text-sm text-red-300">
                {copy.error} <a href={mail} className="underline">management@prometheus.coach</a>.
              </p>
            )}
            <button type="submit" disabled={state === 'loading'} className="btn btn-primary btn-lg w-full mt-6 justify-center !rounded-md disabled:opacity-60">
              {state === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <>Anfrage senden <ArrowRight size={18} /></>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
