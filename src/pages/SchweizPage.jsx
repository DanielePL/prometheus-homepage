import { useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import {
  ArrowRight, Check, QrCode, Receipt, Landmark, FileSpreadsheet, MapPin, Phone,
  ConciergeBell, Smartphone, Clock,
} from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { GYM_APP, SIGNUP_GYM } from '../lib/links'

/* /schweiz/ — the gym product for Swiss studios, in German, prices in CHF.
 *
 * Born 2026-10-15 as a private pitch (/club/) for a chat of twenty gym owners
 * that Anas (Xcellent Gym, Thal — our first gym customer) brought us into.
 * The owner wanted no PowerPoint, so it is a page: filmed scenes (Higgsfield)
 * between real product screens. 2026-10-16 the owner made it public ("so kann
 * jedes Gym für sich selbst rechnen und entscheiden"). /club/ still renders
 * the same page with the line about Anas in the closing block, noindex,
 * canonical pointing here.
 *
 * Owner rules for the copy:
 * - Fixed prices, never "ab" ("von ab-Preisen haben die die Schnauze voll").
 * - No studio philosophy. Every gym runs differently — with a front desk,
 *   unstaffed around the clock, or both. The page shows that Prometheus is set
 *   to the way the owner runs it; Xcellent is one example, not the model.
 * - Dunning is told as a sequence the owner configures, from reminder to
 *   access block, never as one hard stance. Every step can be switched off;
 *   in the product nobody is blocked automatically unless the studio turns it
 *   on (Enterprise accounting.json, dunning + installment_policy).
 * - Swissness up front. No Swiss cross and no "Swiss made" while the company
 *   seat is not in Switzerland (Peakforce GmbH in formation). The database
 *   moved to Zürich on 2026-10-15 (prometheus-admin docs/SUPABASE_UMZUG_ZUERICH.md).
 *
 * Clips are AI scenes and never pretend to be product; the product proof is
 * the real screenshots. */

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

/* A silent scene. `loop` clips are cut with a crossfade at the seam, so they
   run forward forever; the hero plays once and stops on its last frame (owner:
   "einfach hinzoomen, langsam"). Reduced-motion users keep the still. */
function Scene({ src, poster, loop = true, className = '' }) {
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
      loop={loop}
      playsInline
      preload="auto"
      aria-hidden="true"
      className={`w-full h-full object-cover ${className}`}
    />
  )
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white min-h-[92svh] flex items-end">
      <div className="absolute inset-0 -z-20">
        <Scene src="/club/hero.mp4" poster="/club/hero.webp" loop={false} className="object-[45%_center]" />
      </div>
      <div className="photo-scrim-hero absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-gradient-to-b from-transparent to-graphite" aria-hidden="true" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-20 lg:pb-28">
        <div className="max-w-[56rem] hero-rise">
          <h1>
            <span className="eyebrow eyebrow-photo">Fitnessstudio-Software Schweiz</span>
            <span className="block display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.6rem]">
              Dein ganzes Studio in einem System.{' '}
              <span className="text-white/50 font-medium">CHF 149, 249 oder 399 im Monat. Alles drin.</span>
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl">
            Mitglieder, Verträge, Zahlungen, Zutritt, Kasse, Kurse, Schichten und Buchhaltung.
            Ob mit Empfang oder rund um die Uhr ohne Personal: Prometheus läuft so, wie du dein
            Studio führst.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="#rechner" className="btn btn-primary btn-lg">
              Selbst nachrechnen <ArrowRight size={18} />
            </a>
            <a href={BOOK} className="btn btn-ghost-light btn-lg">20 Minuten mit Daniele</a>
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
   makes (CLAUDE.md, "Preisvergleich nur gegen die eigene Rechnung"). */
function Calculator() {
  const [values, setValues] = useState(() => STACK.map(() => ''))
  const [plan, setPlan] = useState(0)
  const total = values.reduce((s, v) => s + (parseFloat(String(v).replace(',', '.')) || 0), 0)
  const ours = PLANS[plan].price
  const filled = total > 0

  return (
    <Section id="rechner" tone="raised">
      <SectionHeader
        eyebrow="Deine Rechnung"
        title="Was zahlst du heute?"
        accent="Rechne selbst."
        subline="Pro Monat, so wie es auf deinen Rechnungen steht. Leer lassen, was du nicht hast. Nichts davon wird gespeichert oder verschickt."
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
                ? <>Das sind <span className="text-accent-light font-semibold">{chf((total - ours) * 12)}</span> weniger im Jahr.</>
                : filled
                  ? 'Günstiger bist du heute schon. Dann geht es um die Stunden, die du zurückbekommst.'
                  : 'Trag links ein, was du heute zahlst.'}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

/* Three ways studios actually run. Same software, other settings — this is
   the answer to "jedes Gym hat seine eigene Philosophie". */
function Ways() {
  const ways = [
    {
      icon: ConciergeBell,
      title: 'Mit Empfang',
      text: 'Dein Team checkt ein, verkauft an der Kasse, nimmt Tageseintritte und neue Mitglieder am Tresen auf. Prometheus ist der Bildschirm dahinter.',
    },
    {
      icon: Smartphone,
      title: 'Ohne Personal',
      text: 'Mitglieder melden sich per App mit dem Code deines Studios an, schliessen ihr Abo ab, bezahlen und kommen mit dem Handy rein.',
    },
    {
      icon: Clock,
      title: 'Beides',
      text: 'Tagsüber mit Team, abends und am Wochenende in Selbstbedienung. Dieselben Mitglieder, dieselben Verträge, ein System.',
    },
  ]
  return (
    <Section>
      <SectionHeader
        eyebrow="Deine Art, dein Studio zu führen"
        title="Jedes Studio läuft anders."
        accent="Prometheus läuft so wie deins."
        subline="Wir schreiben dir keine Philosophie vor. Was automatisch läuft, was dein Team macht und wie streng du bist, stellst du ein."
      />
      <div className="grid md:grid-cols-3 gap-4 mt-14">
        {ways.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.06} className="card rounded-2xl p-7">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-accent/10 text-accent-dark">
              <Icon size={20} />
            </span>
            <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-muted leading-relaxed">{text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

/* One filmed scene (or real screens) beside its job. `flip` alternates the
   side so the page does not read as a list. */
function Job({ eyebrow, title, accent, children, media, flip, tone = 'default' }) {
  return (
    <Section tone={tone}>
      <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <Reveal className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-night">
          {media}
        </Reveal>
        <div>
          <SectionHeader align="left" eyebrow={eyebrow} title={title} accent={accent} />
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-lg text-muted leading-relaxed max-w-xl">
              {children}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

/* Dunning as the sequence it is in the product. Owner, 2026-10-16: "von bis,
   nicht einfach peng eine Haltung". */
const DUNNING = [
  ['Vor der Fälligkeit', 'Das Mitglied bekommt eine Erinnerung, dein Team sieht es im Dashboard.'],
  ['Zahlung bleibt aus', 'Warn-Mail mit Frist, automatisch.'],
  ['Mahnstufen', 'Zweite und letzte Mahnung, mit Mahngebühren in CHF, die du festlegst.'],
  ['Inkasso', 'Als letzte Stufe, wenn du sie willst.'],
  ['Zutritt sperren', 'Nur wenn du es einschaltest: als Vorschlag, über den du entscheidest, oder automatisch nach einer Frist, die du setzt. Sobald bezahlt ist, ist das Mitglied wieder frei.'],
]

function Dunning() {
  return (
    <ol className="space-y-4 !text-base">
      {DUNNING.map(([step, text], i) => (
        <li key={step} className="flex gap-4">
          <span className={`mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold ${i === DUNNING.length - 1 ? 'border border-accent text-accent-dark' : 'bg-accent/10 text-accent-dark'}`}>
            {i + 1}
          </span>
          <span><span className="font-semibold text-ink">{step}.</span> {text}</span>
        </li>
      ))}
    </ol>
  )
}

function Phones() {
  return (
    <div className="absolute inset-0 flex items-end justify-center gap-4 sm:gap-6 pt-8 px-6 bg-gradient-to-b from-night to-graphite">
      <div
        className="absolute inset-x-[15%] bottom-0 h-2/3 bg-accent/25 blur-[90px] rounded-full pointer-events-none"
        aria-hidden="true"
      />
      <img
        src="/images/coach/app-mobile-workout.webp"
        alt="Mitglieder-App: Training läuft, Sätze, Gewicht und Wiederholungen"
        loading="lazy"
        className="relative w-[38%] max-w-[15rem] rounded-t-[1.6rem] border border-white/10 border-b-0 shadow-2xl"
      />
      <img
        src="/images/coach/app-mobile-training.webp"
        alt="Mitglieder-App: Trainingswoche, Schnellstart und eigene Workouts"
        loading="lazy"
        className="relative w-[38%] max-w-[15rem] translate-y-6 rounded-t-[1.6rem] border border-white/10 border-b-0 shadow-2xl"
      />
    </div>
  )
}

function Swiss() {
  const items = [
    { icon: Landmark, title: 'Franken, feste Preise', text: 'Abgerechnet in CHF. Kein Wechselkurs, kein Ab-Preis, keine Stufen nach Funktionen.' },
    { icon: QrCode, title: 'QR-Rechnung', text: 'Rechnungen an Mitglieder mit Schweizer QR-Zahlteil, direkt aus dem System.' },
    { icon: Receipt, title: 'MWST-Abrechnung', text: 'Effektive Methode oder Saldosteuersatz, vorbereitet für die Abrechnung mit der ESTV.' },
    { icon: FileSpreadsheet, title: 'Für den Treuhänder', text: 'Abschlüsse und Export fertig aufbereitet. Er bekommt einen eigenen Zugang mit Leserecht.' },
    { icon: MapPin, title: 'Daten in Zürich', text: 'Die Datenbank läuft in einem Rechenzentrum in Zürich. Deine Daten gehören dir, Export jederzeit.' },
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
          <span className="display-soft">Seit dem 1. Oktober mit Prometheus, offen von 5 bis 24 Uhr ohne Empfang.</span>
        </p>
        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
          Das ist ihre Art, ein Studio zu führen. Mit Team am Empfang läuft dieselbe Software, nur anders eingestellt.
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

function Closing({ club }) {
  const [name, setName] = useState('')
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get('n')
    if (n) setName(n.replace(/[^\p{L}\s'-]/gu, '').trim().slice(0, 40))
  }, [])
  return (
    <Section tone="night" width="narrow" className="text-center overflow-hidden isolate lg:py-40">
      <img src="/club/hero-end.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-60" />
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
          {club && 'Anas hat dir diesen Link geschickt. '}
          In 20 Minuten zeigen wir dir dein Studio in Prometheus, mit deinen Tarifen und so
          eingestellt, wie du arbeitest. Oder du probierst es 30 Tage selbst aus.
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

/* `club` = the /club/ link Anas shares: same page, one extra sentence,
   noindex, canonical to /schweiz/. */
export default function SchweizPage({ club = false }) {
  return (
    <>
      <Head>
        <html lang="de-CH" />
        <title>Fitnessstudio-Software Schweiz, CHF 149 | Prometheus</title>
        <meta name="description" content="Fitnessstudio-Software für die Schweiz: Mitglieder, Verträge, Mahnwesen, Zutritt, Kasse, MWST und Buchhaltung. CHF 149, 249 oder 399, alles drin." />
        <link rel="canonical" href="https://prometheus.coach/schweiz/" />
        {club && <meta name="robots" content="noindex, follow" />}
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:title" content="Dein ganzes Studio in einem System. CHF 149, 249 oder 399." />
        <meta property="og:description" content="Fitnessstudio-Software für die Schweiz. Drei feste Preise, alle Funktionen, Daten in Zürich." />
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
        <Ways />
        <Job
          tone="raised"
          eyebrow="Anmeldung"
          title="Neue Mitglieder, ohne Papier."
          accent="Am Tresen oder per App."
          media={<Scene src="/club/signup.mp4" poster="/club/signup.webp" />}
        >
          <p>Dein Team nimmt neue Mitglieder am Empfang auf, oder sie melden sich selbst an: App laden, Code deines Studios eingeben, Abo wählen, per Karte oder Lastschrift bezahlen. Der Vertrag entsteht in beiden Fällen von selbst.</p>
          <p>Das Geld geht direkt auf dein Konto. Wir behalten keinen Anteil an den Mitgliederbeiträgen.</p>
        </Job>
        <Job
          flip
          eyebrow="Zahlungen und Mahnwesen"
          title="Von der Erinnerung bis zur Sperre."
          accent="Du legst fest, wie weit es geht."
          media={<Scene src="/club/door.mp4" poster="/club/door.webp" />}
        >
          <p>Offene Beiträge laufen durch einen Ablauf, den du einstellst. Jede Stufe kannst du anpassen oder weglassen.</p>
          <Dunning />
        </Job>
        <Job
          tone="raised"
          eyebrow="Übersicht"
          title="Dein Studio auf einem Bildschirm."
          accent="Vom Handy oder vom Rechner."
          media={<img src="/images/enterprise/desk.webp" alt="Prometheus Desk: Check-in, Kasse in CHF, Kurse des Tages" loading="lazy" className="w-full h-full object-cover object-top" />}
        >
          <p>Check-in, Kasse, Kurse, offene Zahlungen und wer heute arbeitet. Der Schichtplan wird zur Lohnabrechnung, die Kasse zur Buchhaltung.</p>
          <p>Und Prometheus zeigt dir, wer seltener kommt, bevor er kündigt.</p>
        </Job>
        <Job
          flip
          eyebrow="Mitglieder-App"
          title="Eine App, die deine Mitglieder wirklich öffnen."
          accent="In deinem Logo."
          media={<Phones />}
        >
          <p>Über 1&apos;200 Übungen mit Video, Trainingspläne, jeder Satz protokolliert, Fortschritt und Rekorde. Dazu Ernährung und ein AI Coach, die deine Mitglieder selbst dazubuchen können.</p>
          <p>Für dich ist die App im Preis drin.</p>
        </Job>
        <Swiss />
        <Reference />
        <Prices />
        <Closing club={club} />
      </main>
      <HomeFooter />
    </>
  )
}
