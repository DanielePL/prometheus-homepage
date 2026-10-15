import { useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import {
  ArrowRight, Check, QrCode, Receipt, Landmark, FileSpreadsheet, MapPin, Phone,
} from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { GYM_APP, SIGNUP_GYM } from '../lib/links'

/* /club/ — a private pitch for one circle of Swiss gym owners (2026-10-15).
 *
 * Anas Eneballi (Xcellent Gym, Thal — our first gym customer) sits in a chat
 * with twenty gym owners who are all unhappy with their current software. He
 * asked for a flyer or a deck; the owner wanted neither ("keine ausgelutschte
 * PowerPoint"). So this is a link: filmed scenes (Higgsfield) between real
 * product screens, in German, prices in CHF.
 *
 * Not for search: noindex, robots Disallow, not in the sitemap. It is still
 * prerendered so the WhatsApp link preview has a title and an image.
 *
 * `?n=<Vorname>` greets one owner by name in the closing block. Nothing is
 * stored; the site beacon only counts the visit as on every page.
 *
 * Content rules from the owner: fixed prices, no "ab" ("von ab-Preisen haben
 * die die Schnauze voll"); Swissness up front. No Swiss cross and no "Swiss
 * made" while the company seat is not yet in Switzerland (Peakforce GmbH in
 * formation). "Daten in Zürich" only once the database move is verified —
 * flip DATA_IN_ZURICH then. Clips are AI-generated scenes, never shown as
 * product; the product proof is the real screenshots. */

const DATA_IN_ZURICH = false

const BOOK = 'mailto:management@prometheus.coach?subject=' +
  encodeURIComponent('Prometheus für mein Studio — 20 Minuten')

const PLANS = [
  { name: 'Starter', price: 149, members: 'bis 250 aktive Mitglieder' },
  { name: 'Studio', price: 249, members: 'bis 1’000 aktive Mitglieder', popular: true },
  { name: 'Pro', price: 399, members: 'unbegrenzt, pro Standort' },
]

const STACK = [
  'Mitgliederverwaltung und Verträge',
  'Zahlungen, Mahnwesen',
  'Check-in und Zutritt',
  'Kasse',
  'Kurse und Buchungen',
  'Schichtplan und Lohn',
  'Mitglieder-App',
  'Buchhaltung, MWST',
]

function chf(n) {
  return `CHF ${Math.round(n).toLocaleString('de-CH')}`
}

/* A silent, looping scene. The poster is the clip's first frame, so nothing
   jumps when the video starts; reduced-motion users keep the still. */
function Scene({ src, poster, className = '' }) {
  const [still, setStill] = useState(false)
  useEffect(() => {
    setStill(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  }, [])
  return still ? (
    <img src={poster} alt="" aria-hidden="true" className={`w-full h-full object-cover ${className}`} />
  ) : (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      className={`w-full h-full object-cover ${className}`}
    />
  )
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white min-h-[92svh] flex items-end">
      <div className="absolute inset-0 -z-20">
        <Scene src="/club/hero.mp4" poster="/club/hero.webp" className="object-[45%_center]" />
      </div>
      <div className="photo-scrim-hero absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-gradient-to-b from-transparent to-graphite" aria-hidden="true" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-20 lg:pb-28">
        <div className="max-w-[54rem] hero-rise">
          <h1>
            <span className="eyebrow eyebrow-photo">Studio-Software für die Schweiz</span>
            <span className="block display text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[5rem]">
              Dein Studio läuft.{' '}
              <span className="text-white/50 font-medium">Auch wenn du nicht da bist.</span>
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl">
            Mitglieder melden sich selbst an, zahlen selbst, kommen selbst rein. Verträge,
            Mahnungen, Kasse, Buchhaltung und die App deiner Mitglieder laufen in einem
            System, in Franken, gebaut für Schweizer Studios.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href={BOOK} className="btn btn-primary btn-lg">
              20 Minuten mit Daniele <ArrowRight size={18} />
            </a>
            <a href="#preise" className="btn btn-ghost-light btn-lg">Preise ansehen</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pain() {
  return (
    <section className="relative isolate overflow-hidden bg-graphite text-white">
      <div className="relative h-[70svh] min-h-[28rem] max-h-[52rem]">
        <Scene src="/club/frust.mp4" poster="/club/frust.webp" className="opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite via-transparent to-graphite" aria-hidden="true" />
        <div className="absolute inset-0 bg-night/35" aria-hidden="true" />
        <Reveal className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
            <p className="display text-3xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl">
              Mitglieder hier. Kasse dort. Schichtplan im Excel. Belege im Ordner für den Treuhänder.{' '}
              <span className="text-white/55 font-medium">Und keins davon redet mit dem anderen.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* The visitor's own bill against ours — the only price comparison the site
   makes (see CLAUDE.md, "Preisvergleich nur gegen die eigene Rechnung"). */
function Calculator() {
  const [values, setValues] = useState(() => STACK.map(() => ''))
  const [plan, setPlan] = useState(0)
  const total = values.reduce((s, v) => s + (parseFloat(String(v).replace(',', '.')) || 0), 0)
  const ours = PLANS[plan].price
  const filled = total > 0

  return (
    <Section tone="raised">
      <SectionHeader
        eyebrow="Deine Rechnung"
        title="Was zahlst du heute?"
        accent="Trag es ein."
        subline="Pro Monat, so wie es auf deinen Rechnungen steht. Leer lassen, was du nicht hast."
      />
      <Reveal className="card rounded-3xl overflow-hidden mt-12 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 sm:p-8 space-y-3">
            {STACK.map((row, i) => (
              <label key={row} className="flex items-center justify-between gap-4">
                <span className="text-[0.95rem] text-ink">{row}</span>
                <span className="flex items-center gap-2 shrink-0">
                  <span className="text-sm text-muted">CHF</span>
                  <input
                    inputMode="decimal"
                    value={values[i]}
                    onChange={(e) => setValues((p) => p.map((x, j) => (j === i ? e.target.value : x)))}
                    placeholder="0"
                    className="w-24 h-10 rounded-xl border border-line bg-paper px-3 text-right text-ink focus:outline-none focus:border-accent"
                  />
                </span>
              </label>
            ))}
          </div>
          <div className="bg-night text-white p-6 sm:p-8 flex flex-col justify-between gap-8">
            <div>
              <p className="text-sm text-white/60">Heute</p>
              <p className="display text-4xl mt-1">{chf(total)}<span className="text-white/50 text-xl font-medium"> / Monat</span></p>
            </div>
            <div>
              <p className="text-sm text-white/60">Mit Prometheus</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {PLANS.map((p, i) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPlan(i)}
                    className={`h-9 px-3 rounded-full text-sm border transition ${i === plan ? 'bg-accent border-accent text-white' : 'border-white/20 text-white/75 hover:border-white/50'}`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
              <p className="display text-4xl mt-4">{chf(ours)}<span className="text-white/50 text-xl font-medium"> / Monat</span></p>
              <p className="text-sm text-white/55 mt-1">{PLANS[plan].members}, alles drin</p>
            </div>
            <p className="text-lg leading-snug">
              {filled && total > ours
                ? <>Du sparst <span className="text-accent-light font-semibold">{chf((total - ours) * 12)}</span> im Jahr.</>
                : filled
                  ? 'Günstiger bist du schon. Dann geht es um die Abende, die du zurückbekommst.'
                  : 'Trag links ein, was du heute zahlst.'}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* One filmed scene beside its job. `flip` alternates the side so the page
   does not read as a list. */
function Job({ eyebrow, title, accent, body, src, poster, shot, flip, tone = 'default' }) {
  return (
    <Section tone={tone}>
      <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <Reveal className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-night">
          {shot ? (
            <img src={shot} alt="" loading="lazy" className="w-full h-full object-cover object-top" />
          ) : (
            <Scene src={src} poster={poster} />
          )}
        </Reveal>
        <div>
          <SectionHeader align="left" eyebrow={eyebrow} title={title} accent={accent} />
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-lg text-muted leading-relaxed max-w-xl">
              {body}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Swiss() {
  const items = [
    { icon: Landmark, title: 'Franken, feste Preise', text: 'Abgerechnet in CHF. Kein Wechselkurs, kein Ab-Preis, keine Stufen nach Funktionen.' },
    { icon: QrCode, title: 'QR-Rechnung', text: 'Rechnungen an Mitglieder mit Schweizer QR-Zahlteil, direkt aus dem System.' },
    { icon: Receipt, title: 'MWST-Abrechnung', text: 'Effektive Methode oder Saldosteuersatz, vorbereitet für die Abrechnung mit der ESTV.' },
    { icon: FileSpreadsheet, title: 'Für den Treuhänder', text: 'Abschlüsse und Export fertig aufbereitet. Er bekommt einen eigenen Zugang mit Leserecht.' },
    DATA_IN_ZURICH
      ? { icon: MapPin, title: 'Daten in Zürich', text: 'Die Datenbank läuft in einem Rechenzentrum in Zürich. Deine Daten gehören dir, Export jederzeit.' }
      : { icon: MapPin, title: 'Deine Daten', text: 'Verschlüsselt, mit Rollen pro Mitarbeiter. Deine Daten gehören dir, Export jederzeit.' },
    { icon: Phone, title: 'Ansprechpartner in Zürich', text: 'Kein Callcenter. Du redest mit den Leuten, die das System bauen.' },
  ]
  return (
    <Section tone="raised">
      <SectionHeader
        eyebrow="Gebaut für die Schweiz"
        title="Gebaut für Schweizer Studios."
        accent="Franken, MWST, QR-Rechnung, Treuhänder. Von Anfang an."
      />
      <Reveal className="shot relative rounded-2xl overflow-hidden mt-14 max-w-6xl mx-auto">
        <div className="shot-bar" aria-hidden="true"><i /><i /><i /></div>
        <img
          src="/images/surfaces/dark-accounting.webp"
          alt="Buchhaltung in Prometheus: Lieferantenrechnungen in CHF, MWST-Abrechnung, Export für den Treuhänder"
          loading="lazy"
          className="w-full block"
        />
      </Reveal>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {items.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.05} className="card rounded-2xl p-6">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-accent/10 text-accent-dark">
              <Icon size={20} />
            </span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-muted leading-relaxed">{text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Reference() {
  return (
    <Section width="narrow">
      <Reveal className="text-center">
        <p className="eyebrow mx-auto">Live im Einsatz</p>
        <p className="display text-3xl sm:text-5xl mt-6">
          Xcellent Gym, Thal.{' '}
          <span className="display-soft">Offen von 5 bis 24 Uhr. Ohne Empfang. Seit dem 1. Oktober mit Prometheus.</span>
        </p>
      </Reveal>
    </Section>
  )
}

function Prices() {
  return (
    <Section id="preise" tone="raised">
      <SectionHeader
        eyebrow="Preise"
        title="Drei Preise. Punkt."
        accent="Jeder Tarif hat alle Funktionen."
        subline="Der Preis hängt nur an der Zahl deiner aktiven Mitglieder. Die App für deine Mitglieder ist dabei. 30 Tage testen, ohne Kreditkarte."
      />
      <div className="grid md:grid-cols-3 gap-4 mt-14 max-w-5xl mx-auto">
        {PLANS.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.06} className={`card rounded-3xl p-7 ${p.popular ? 'ring-2 ring-accent' : ''}`}>
            <p className="text-sm font-medium text-muted">{p.name}</p>
            <p className="display text-5xl mt-3">CHF {p.price}</p>
            <p className="text-muted mt-1">pro Monat</p>
            <p className="mt-6 flex items-center gap-2 text-ink"><Check size={18} className="text-accent" /> {p.members}</p>
            <p className="mt-2 flex items-center gap-2 text-ink"><Check size={18} className="text-accent" /> alle Funktionen</p>
            <p className="mt-2 flex items-center gap-2 text-ink"><Check size={18} className="text-accent" /> Mitarbeiter unbegrenzt</p>
          </Reveal>
        ))}
      </div>
      <p className="text-center text-sm text-muted mt-8">Preise exkl. MWST. Monatlich kündbar.</p>
    </Section>
  )
}

function Closing() {
  const [name, setName] = useState('')
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get('n')
    if (n) setName(n.replace(/[^\p{L}\s'-]/gu, '').trim().slice(0, 40))
  }, [])
  return (
    <Section tone="night" width="narrow" className="text-center overflow-hidden isolate lg:py-40">
      <div className="absolute inset-0 -z-20 opacity-60">
        <Scene src="/club/hero.mp4" poster="/club/hero.webp" />
      </div>
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{ background: 'linear-gradient(180deg, rgba(15,15,18,0.6) 0%, rgba(15,15,18,0.75) 55%, #0F0F12 100%)' }}
      />
      <Reveal className="relative">
        <span className="light-line mx-auto mb-8" aria-hidden="true" />
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white">
          {name ? `${name}, lass uns reden.` : 'Lass uns reden.'}
        </h2>
        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
          Anas hat dir diesen Link geschickt. In 20 Minuten zeigen wir dir dein Studio in
          Prometheus, mit deinen Tarifen und deinen Zahlen.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <a href={BOOK} className="btn btn-primary btn-lg">
            Termin anfragen <ArrowRight size={18} />
          </a>
          <a href={SIGNUP_GYM} className="btn btn-ghost-light btn-lg">30 Tage selbst testen</a>
        </div>
      </Reveal>
    </Section>
  )
}

export default function ClubPage() {
  return (
    <>
      <Head>
        <html lang="de-CH" />
        <title>Dein Studio läuft. | Prometheus</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="Studio-Software für die Schweiz: Mitglieder, Verträge, Zahlungen, Zutritt, Kasse und Buchhaltung in einem System. CHF 149, 249 oder 399 im Monat." />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:title" content="Dein Studio läuft. Auch wenn du nicht da bist." />
        <meta property="og:description" content="Studio-Software für die Schweiz. Drei feste Preise, alle Funktionen." />
        <meta property="og:image" content="https://prometheus.coach/club/og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <HomeNav overDark links={[]} login={GYM_APP} signup={SIGNUP_GYM} loginLabel="Login" signupLabel="30 Tage testen" />
      <main>
        <Hero />
        <Pain />
        <Calculator />
        <Job
          eyebrow="Anmeldung"
          title="Kein Formular. Kein Tablet."
          accent="Keine Person am Tresen."
          src="/club/signup.mp4"
          poster="/club/signup.webp"
          body={<>
            <p>Dein Mitglied lädt die App, gibt den Code deines Studios ein, wählt sein Abo und bezahlt per Karte oder Lastschrift. Der Vertrag entsteht von selbst, die Verlängerung wird zum Ablauf eingezogen.</p>
            <p>Das Geld geht direkt auf dein Konto. Wir behalten keinen Anteil an den Mitgliederbeiträgen.</p>
          </>}
        />
        <Job
          flip
          tone="raised"
          eyebrow="Zutritt"
          title="Wer bezahlt, kommt rein."
          accent="Wer nicht bezahlt, nicht."
          src="/club/door.mp4"
          poster="/club/door.webp"
          body={<>
            <p>Check-in mit dem Handy am Eingang. Schlägt eine Zahlung fehl, läuft die Mahnung automatisch, und der Zutritt ist gesperrt, bis bezahlt ist. Danach ist das Mitglied von selbst wieder frei.</p>
            <p>Du musst nie wieder selbst mahnen.</p>
          </>}
        />
        <Job
          eyebrow="Übersicht"
          title="Dein Studio auf einem Bildschirm."
          accent="Vom Handy oder vom Rechner."
          shot="/images/enterprise/desk.webp"
          body={<>
            <p>Check-in, Kasse, Kurse, offene Zahlungen und wer heute arbeitet. Der Schichtplan wird zur Lohnabrechnung, die Kasse zur Buchhaltung.</p>
            <p>Und Prometheus zeigt dir, wer seltener kommt, bevor er kündigt.</p>
          </>}
        />
        <Job
          flip
          tone="raised"
          eyebrow="Mitglieder-App"
          title="Eine App, die deine Mitglieder wirklich öffnen."
          accent="In deinem Logo."
          src="/club/train.mp4"
          poster="/club/train.webp"
          body={<>
            <p>Über 1&apos;200 Übungen mit Video, Trainingspläne, Fortschritt und Rekorde. Dazu Ernährung und ein AI Coach, die deine Mitglieder selbst dazubuchen können.</p>
            <p>Für dich ist die App im Preis drin.</p>
          </>}
        />
        <Swiss />
        <Reference />
        <Prices />
        <Closing />
      </main>
      <HomeFooter />
    </>
  )
}
