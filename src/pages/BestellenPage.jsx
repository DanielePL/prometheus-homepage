import { useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { GYM_APP, SIGNUP_GYM } from '../lib/links'
import { getSupabase } from '../lib/supabase'

/* /bestellen/ — the order form for gyms (owner, 2026-10-25: "lass uns das in
 * die homepage einbauen", open but not findable). A gym gets the link after
 * talking to us, fills in studio, plan, start and billing and signs
 * electronically. Same content as the Claude Doc "Bestellformular Prometheus
 * für Fitnessstudios". noindex, not in the sitemap, robots.txt disallows it,
 * linked from nowhere.
 *
 * The edge function website-gym-order (prometheus-admin) validates, sets the
 * price itself, stores the order in admin_gym_orders and mails Peakforce and
 * the gym. The Forge lists it under Vertrieb → Bestellungen.
 *
 * TERMS_READY stays false until Madeleine has delivered the general terms for
 * gyms and the data processing agreement; until then a banner says orders are
 * not binding. Flip it, link the two documents, done. */
const TERMS_READY = false

const PLANS = [
  { key: 'starter', name: 'Starter', price: 149, members: 'bis 250 aktive Mitglieder' },
  { key: 'studio', name: 'Studio', price: 249, members: 'bis 1’000 aktive Mitglieder' },
  { key: 'pro', name: 'Pro', price: 399, members: 'unbegrenzt, pro Standort' },
]

const INCLUDED = [
  'Prometheus Enterprise: Mitglieder, Verträge, Zahlungen und Mahnwesen, Check-in und Zutritt, Kasse, Kurse, Schichtplan und Lohn, Buchhaltung mit MWST',
  'Mitglieder-App im Logo des Studios',
  'Coach Web für deine Trainerinnen und Trainer',
  'KI-Assistent im Umfang des Tarifs',
  'Einrichtung des Studios durch Peakforce',
  'Datenübernahme aus deinem bisherigen System, vollständig und ohne Aufpreis',
  'Support durch das Prometheus-Team',
]

const field = 'w-full h-12 px-4 rounded-md border border-line bg-white text-base text-ink placeholder-muted/60 focus:outline-none focus:border-accent transition-colors'
const label = 'block text-sm font-medium text-ink mb-1.5'

function today() {
  return new Date().toISOString().slice(0, 10)
}

function Field({ name, title, required, type = 'text', value, onChange, placeholder, autoComplete, className = '' }) {
  return (
    <label className={className}>
      <span className={label}>{title}{required && <span className="text-accent"> *</span>}</span>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={(e) => onChange(name, e.target.value)}
        className={field}
      />
    </label>
  )
}

function Block({ n, title, children }) {
  return (
    <section className="rounded-lg border border-line bg-white p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-ink">
        <span className="text-accent-dark mr-2">{n}.</span>{title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  )
}

export default function BestellenPage() {
  const [f, setF] = useState({
    studio_name: '', company_name: '', street: '', postal_code: '', city: '', location: '',
    contact_name: '', email: '', phone: '',
    plan: 'studio', billing: 'yearly', billing_email: '', billing_address: '',
    start_date: '', website_offer: false, notes: '',
    signer_name: '', signer_role: '', accepted: false, website: '',
  })
  const [state, setState] = useState('idle')
  const [error, setError] = useState('')
  const set = (k, v) => setF((s) => ({ ...s, [k]: v }))

  // ?tarif=starter|studio|pro preselects the plan from a link.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('tarif')
    if (PLANS.some((p) => p.key === t)) set('plan', t)
  }, [])

  const plan = PLANS.find((p) => p.key === f.plan)

  async function submit(e) {
    e.preventDefault()
    setState('loading')
    setError('')
    try {
      const { data, error: err } = await getSupabase().functions.invoke('website-gym-order', {
        body: { ...f, source: TERMS_READY ? 'prometheus.coach/bestellen' : 'prometheus.coach/bestellen (Entwurf)' },
      })
      if (err || !data?.ok) throw err ?? new Error('rejected')
      setState('done')
      window.scrollTo({ top: 0 })
    } catch {
      setError('Das hat nicht geklappt. Schreib uns an management@prometheus.coach, wir erfassen die Bestellung von Hand.')
      setState('error')
    }
  }

  return (
    <>
      <Head>
        <html lang="de-CH" />
        <title>Prometheus bestellen | Peakforce GmbH</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <HomeNav links={[]} login={GYM_APP} signup={SIGNUP_GYM} loginLabel="Login" signupLabel="30 Tage testen" />
      <main className="bg-tint pt-28 pb-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto">
          {!TERMS_READY && (
            <p className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              Entwurf: Die Vertragsbedingungen werden gerade fertiggestellt. Bestellungen über diese Seite sind noch nicht verbindlich.
            </p>
          )}

          {state === 'done' ? (
            <div className="rounded-lg border border-line bg-white p-8 sm:p-12 text-center">
              <span className="inline-flex w-14 h-14 items-center justify-center rounded-md bg-accent/10 text-accent-dark"><Check size={28} /></span>
              <h1 className="display text-4xl mt-6">Danke, {f.contact_name.split(' ')[0]}.</h1>
              <p className="mt-4 text-lg text-muted max-w-xl mx-auto">
                Deine Bestellung für {f.studio_name} ist bei uns. Eine Bestätigung mit allen Angaben geht an {f.email}.
                Wir zeichnen gegen und melden uns für die Einrichtung und die Datenübernahme.
              </p>
            </div>
          ) : (
            <>
              <h1 className="display text-4xl sm:text-5xl">Prometheus bestellen.</h1>
              <p className="mt-4 text-lg text-muted">
                Für dein Studio bei der Peakforce GmbH, Zollikon. Du füllst Studio, Tarif, Start und Zahlung aus und
                unterschreibst elektronisch. Danach zeichnen wir gegen, und der Vertrag ist geschlossen.
              </p>

              <form onSubmit={submit} className="mt-10 space-y-5">
                <Block n={1} title="Dein Studio">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field name="studio_name" title="Name des Studios" required value={f.studio_name} onChange={set} autoComplete="organization" />
                    <Field name="company_name" title="Firma laut Handelsregister" value={f.company_name} onChange={set} placeholder="falls anders als der Studioname" />
                    <Field name="street" title="Strasse und Nummer" value={f.street} onChange={set} autoComplete="street-address" className="sm:col-span-2" />
                    <Field name="postal_code" title="PLZ" value={f.postal_code} onChange={set} autoComplete="postal-code" />
                    <Field name="city" title="Ort" value={f.city} onChange={set} autoComplete="address-level2" />
                    <Field name="location" title="Standort des Studios" value={f.location} onChange={set} placeholder="falls anders als die Adresse" className="sm:col-span-2" />
                    <Field name="contact_name" title="Kontaktperson" required value={f.contact_name} onChange={set} autoComplete="name" />
                    <Field name="phone" title="Telefon" type="tel" value={f.phone} onChange={set} autoComplete="tel" />
                    <Field name="email" title="E-Mail" type="email" required value={f.email} onChange={set} autoComplete="email" className="sm:col-span-2" />
                  </div>
                </Block>

                <Block n={2} title="Tarif">
                  <p className="text-muted">Der Preis hängt nur an der Zahl deiner aktiven Mitglieder. Jeder Tarif hat alle Funktionen und unbegrenzt viele Mitarbeitende. CHF, exkl. MWST, fest für die Vertragsdauer.</p>
                  <div className="mt-5 grid sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Tarif">
                    {PLANS.map((p) => {
                      const on = f.plan === p.key
                      return (
                        <button
                          key={p.key}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => set('plan', p.key)}
                          className={`text-left rounded-md border p-4 transition-colors ${on ? 'border-accent ring-2 ring-accent bg-accent/5' : 'border-line hover:border-ink/40'}`}
                        >
                          <span className="text-sm font-medium text-muted">{p.name}</span>
                          <span className="block display text-3xl mt-1">CHF {p.price}</span>
                          <span className="block text-sm text-muted">pro Monat</span>
                          <span className="block text-sm text-ink mt-2">{p.members}</span>
                        </button>
                      )
                    })}
                  </div>
                  <p className="mt-4 text-sm text-muted">Wächst dein Studio über die Grenze seines Tarifs, gilt ab dem Folgemonat der nächste Tarif. Wir kündigen das vorher per E-Mail an.</p>
                </Block>

                <Block n={3} title="Im Preis enthalten">
                  <ul className="space-y-2">
                    {INCLUDED.map((t) => (
                      <li key={t} className="flex gap-2.5 text-ink">
                        <Check size={18} className="text-accent mt-0.5 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-muted">Für die Datenübernahme lieferst du den Export deines bisherigen Systems und prüfst die übernommenen Daten vor der Umstellung. Eine Einrichtungsgebühr fällt nicht an.</p>
                </Block>

                <Block n={4} title="Zusatz: Website (freiwillig)">
                  <label className="flex gap-3 items-start cursor-pointer">
                    <input type="checkbox" checked={f.website_offer} onChange={(e) => set('website_offer', e.target.checked)} className="mt-1 w-5 h-5 accent-[#E67E22]" />
                    <span className="text-ink">Ich möchte eine Offerte für eine neue Website, verbunden mit Prometheus.</span>
                  </label>
                  <p className="mt-3 text-sm text-muted">
                    Abos und Preise live aus Prometheus, Online-Anmeldung neuer Mitglieder, Bestätigung für die Krankenkasse.
                    Referenz: <a href="https://www.xcellentgym.ch/" target="_blank" rel="noopener" className="text-accent-dark underline underline-offset-4">xcellentgym.ch</a>.
                    Nicht im Tarif enthalten; die Offerte gilt erst, wenn du sie separat unterschreibst.
                  </p>
                </Block>

                <Block n={5} title="Zahlung">
                  <p className="text-muted">Du bekommst eine Rechnung mit Schweizer QR-Zahlteil und überweist auf unser Bankkonto. Zahlbar innert 30 Tagen.</p>
                  <div className="mt-5 grid sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Zahlungsart">
                    {[
                      { key: 'yearly', title: 'Jährlich', text: `Eine Rechnung pro Vertragsjahr im Voraus: CHF ${(plan.price * 12).toLocaleString('de-CH')}` },
                      { key: 'monthly', title: 'Monatlich', text: `Jeden Monat automatisch per E-Mail im Voraus: CHF ${plan.price}` },
                    ].map((b) => {
                      const on = f.billing === b.key
                      return (
                        <button
                          key={b.key}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => set('billing', b.key)}
                          className={`text-left rounded-md border p-4 transition-colors ${on ? 'border-accent ring-2 ring-accent bg-accent/5' : 'border-line hover:border-ink/40'}`}
                        >
                          <span className="font-semibold text-ink">{b.title}</span>
                          <span className="block text-sm text-muted mt-1">{b.text}, exkl. MWST</span>
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-5 grid sm:grid-cols-2 gap-4">
                    <Field name="billing_email" title="E-Mail für Rechnungen" type="email" value={f.billing_email} onChange={set} placeholder="falls anders als oben" />
                    <label>
                      <span className={label}>Rechnungsadresse</span>
                      <textarea rows={2} value={f.billing_address} onChange={(e) => set('billing_address', e.target.value)} placeholder="falls anders als die Studio-Adresse" className={`${field} h-auto py-3 resize-none`} />
                    </label>
                  </div>
                </Block>

                <Block n={6} title="Start, Laufzeit und Kündigung">
                  <Field name="start_date" title="Vertragsbeginn" type="date" required value={f.start_date} onChange={set} className="block max-w-xs" />
                  <ul className="mt-5 space-y-2 text-muted">
                    <li>Ab dem Vertragsbeginn läuft der Preis. Einrichtung und Datenübernahme davor sind kostenlos.</li>
                    <li>Unbefristet. Beide Seiten können jederzeit auf Ende eines Kalendermonats kündigen, mit 30 Tagen Frist, per E-Mail.</li>
                    <li>Wer jährlich bezahlt hat und vorher kündigt, erhält die nicht genutzten Monate zurück.</li>
                    <li>Nach dem Vertragsende erhältst du alle deine Daten als Export.</li>
                  </ul>
                </Block>

                <Block n={7} title="Vertragsbestandteile">
                  <ol className="list-decimal pl-5 space-y-1.5 text-ink">
                    <li>dieses Bestellformular</li>
                    <li>die Vereinbarung zur Auftragsbearbeitung: Du bist verantwortlich für die Daten deiner Mitglieder, wir bearbeiten sie in deinem Auftrag, gespeichert in Zürich</li>
                    <li>die Allgemeinen Vertragsbedingungen für Fitnessstudios der Peakforce GmbH</li>
                    <li>eine allfällige Website-Offerte, wenn separat unterschrieben</li>
                  </ol>
                  <p className="mt-3 text-sm text-muted">Es gilt Schweizer Recht. Gerichtsstand ist Zollikon.</p>
                </Block>

                <Block n={8} title="Unterschrift">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field name="signer_name" title="Vor- und Nachname" required value={f.signer_name} onChange={set} autoComplete="name" />
                    <Field name="signer_role" title="Funktion" required value={f.signer_role} onChange={set} placeholder="z. B. Inhaber, Geschäftsführerin" />
                  </div>
                  <label className="mt-5 flex gap-3 items-start cursor-pointer">
                    <input type="checkbox" required checked={f.accepted} onChange={(e) => set('accepted', e.target.checked)} className="mt-1 w-5 h-5 accent-[#E67E22]" />
                    <span className="text-ink">
                      Ich bestelle Prometheus für das oben genannte Studio zu diesen Bedingungen, bin dazu berechtigt und
                      unterschreibe hiermit elektronisch. Datum und Uhrzeit werden gespeichert.
                    </span>
                  </label>
                  <label className="mt-5 block">
                    <span className={label}>Bemerkungen</span>
                    <textarea rows={3} value={f.notes} onChange={(e) => set('notes', e.target.value)} placeholder="z. B. welches System du heute nutzt, Wunschtermin für die Einrichtung" className={`${field} h-auto py-3 resize-none`} />
                  </label>
                  <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={(e) => set('website', e.target.value)} className="absolute -left-[9999px] w-px h-px opacity-0" />
                </Block>

                {state === 'error' && <p className="text-red-700">{error}</p>}

                <button type="submit" disabled={state === 'loading'} className="btn btn-primary btn-lg w-full justify-center !rounded-md disabled:opacity-60">
                  {state === 'loading'
                    ? <Loader2 size={18} className="animate-spin" />
                    : <>{TERMS_READY ? 'Verbindlich bestellen' : 'Bestellung absenden'}: {plan.name}, CHF {plan.price} pro Monat <ArrowRight size={18} /></>}
                </button>
                <p className="text-center text-sm text-muted">Peakforce GmbH · Niederfelbenweg 4, 8702 Zollikon · CHE-438.502.677</p>
              </form>
            </>
          )}
        </div>
      </main>
      <HomeFooter de />
    </>
  )
}
