import { useEffect, useRef, useState } from 'react'
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
/* `pop`: the media draws its own rounded clip, so the screenshot inside may
   grow past the frame on hover (owner, 2026-10-18: "expandieren, wenn man mit
   der Maus darüber fährt"). It grows towards the text column. */
function Job({ eyebrow, title, accent, children, media, flip, pop, tone = 'default' }) {
  return (
    <Section tone={tone}>
      <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <Reveal
          className={`group relative rounded-3xl aspect-[16/10] ${pop ? 'z-10 hover:z-30' : 'overflow-hidden bg-night'}`}
          style={pop ? { '--pop-origin': flip ? 'right center' : 'left center' } : undefined}
        >
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

/* A light product screen on a dark studio photo. Owner, 2026-10-18: the bright
   Enterprise screens vanished against the light page, so each one now floats
   on a darkened photo from /images/gym, like the dark zone on the home page. */
function OnPhoto({ photo, src, alt }) {
  return (
    <div className="absolute inset-0 isolate">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-night" aria-hidden="true">
        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-night/60 via-night/30 to-night/75" />
      </div>
      <div className="absolute inset-4 sm:inset-8 overflow-hidden rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-[transform,box-shadow] duration-500 ease-out [transform-origin:var(--pop-origin,center)] group-hover:scale-[2] group-hover:shadow-[0_40px_120px_-20px_rgba(0,0,0,0.75)]">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-left-top" />
      </div>
    </div>
  )
}

/* The command centre as a short show (owner, 2026-10-18: "zuerst das helle,
   dann das dunkle, am Schluss alle Farben im Schnelldurchlauf. CI ist uns
   wichtig."). Light and dark get time to be read, then the twelve brand
   palettes follow (light, close on logo, menu and quick actions, where the
   accent lives), slow enough to see (owner, same day: "zu nervös, etwas langsamer"). The palette frames are the real dashboard with each
   palette's CSS variables from Enterprise's own brandingCssVars(). Every frame
   shows the whole dashboard (owner 2026-10-19: "dashboard voll zeigen auch beim
   farbwechsel"), and hovering pauses the run so it can be read. Starts only
   in view; with reduced motion it stays on the light frame. */
const STAGE = [
  ['light', 'Hell', 3600],
  ['dark', 'Dunkel', 3000],
  ...['ocean', 'azure', 'emerald', 'forest', 'royal', 'plum', 'crimson', 'sunset', 'gold', 'slate', 'midnight', 'prometheus']
    .map((id) => [id, id[0].toUpperCase() + id.slice(1), id === 'prometheus' ? 2200 : 1500]),
]

function Stage() {
  const ref = useRef(null)
  const [live, setLive] = useState(false)
  const [i, setI] = useState(0)
  const [hold, setHold] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(([e]) => setLive(e.isIntersecting), { threshold: 0.4 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!live || hold) return
    const t = setTimeout(() => setI((n) => (n + 1) % STAGE.length), STAGE[i][2])
    return () => clearTimeout(t)
  }, [live, hold, i])

  const fast = i >= 2
  return (
    <div ref={ref} className="absolute inset-0 isolate" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-night" aria-hidden="true">
        <img src="/images/gym/front-desk.webp" alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-night/60 via-night/30 to-night/75" />
      </div>
      <div className="absolute inset-4 sm:inset-8 overflow-hidden rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] bg-night transition-[transform,box-shadow] duration-500 ease-out [transform-origin:var(--pop-origin,center)] group-hover:scale-[2] group-hover:shadow-[0_40px_120px_-20px_rgba(0,0,0,0.75)]">
        {STAGE.map(([id], n) => (n < 2 || live || n === i) && (
          <img
            key={id}
            src={`/images/enterprise/stage-${id}.webp`}
            alt={n === 0 ? 'Prometheus Kommandozentrale: Entscheidungen des Tages, Mitglieder, Check-ins, Termine und To-dos, hell, dunkel und in zwölf Markenfarben' : ''}
            aria-hidden={n === 0 ? undefined : 'true'}
            loading={n === 0 ? 'lazy' : undefined}
            className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity ${fast ? 'duration-500' : 'duration-700'} ${n === i ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
      <span className="absolute right-7 bottom-7 sm:right-11 sm:bottom-11 rounded-full bg-night/80 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur" aria-hidden="true">
        {STAGE[i][1]}
      </span>
    </div>
  )
}

/* Three whole iOS screens (simulator, 2026-10-17), not cropped at the top. */
const PHONES = [
  ['/images/coach/app-mobile-training.webp', 'Mitglieder-App: Trainingswoche, Schnellstart und eigene Workouts'],
  ['/images/coach/app-mobile-workout.webp', 'Mitglieder-App: Training läuft, Sätze, Gewicht und Wiederholungen'],
  ['/images/coach/app-mobile-nutrition.webp', 'Mitglieder-App: Kalorien, Makros und Mahlzeiten des Tages'],
]

function Phones() {
  return (
    <div className="absolute inset-0 isolate flex items-center justify-center gap-3 sm:gap-5 px-4">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-night" aria-hidden="true">
        <img src="/images/gym/strength-dusk.webp" alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/30 to-night/80" />
      </div>
      {PHONES.map(([src, alt], i) => (
        <div
          key={src}
          className={`h-[88%] aspect-[640/1385] rounded-[16%/7.4%] bg-neutral-900 p-[2.2%] ring-1 ring-white/30 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out hover:z-20 hover:scale-[1.65] ${i === 1 ? 'z-10 scale-105' : ''}`}
        >
          <img src={src} alt={alt} loading="lazy" className="h-full w-full rounded-[14%/6.5%]" />
        </div>
      ))}
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
      <Reveal className="relative isolate overflow-hidden rounded-3xl mt-14 max-w-6xl mx-auto p-4 sm:p-10 bg-night">
        <img src="/images/gym/reception-dusk.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-night/60 via-night/30 to-night/75" aria-hidden="true" />
        <div className="overflow-hidden rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] transition-transform duration-500 ease-out hover:scale-[1.1]">
          <img
            src="/images/surfaces/accounting-de.webp"
            alt="Buchhaltung in Prometheus: Lieferantenrechnungen in CHF, MWST-Abrechnung, Export für den Treuhänder"
            loading="lazy"
            className="w-full block"
          />
        </div>
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
        subline="Der Preis hängt nur an der Zahl deiner aktiven Mitglieder. Die App für deine Mitglieder, Coach Web für deine Trainer und der KI-Assistent sind dabei. 30 Tage testen, ohne Kreditkarte."
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
          pop
          eyebrow="Übersicht"
          title="Dein Studio auf einem Bildschirm."
          accent="Vom Handy oder vom Rechner."
          media={<Stage />}
        >
          <p>Was heute eine Entscheidung braucht, wer eingecheckt ist, welche Termine anstehen. Der Schichtplan wird zur Lohnabrechnung, die Kasse zur Buchhaltung.</p>
          <p>Und Prometheus zeigt dir, wer seltener kommt, bevor er kündigt.</p>
        </Job>
        <Job
          flip
          pop
          eyebrow="Coach Web für deine Trainer"
          title="Deine Trainer planen."
          accent="Du siehst, wer sich reinhängt."
          media={<OnPhoto photo="/images/gym/coaching-floor.webp" src="/images/coach/web-de.webp" alt="Coach Web: Trainingspläne aus der Übungsbibliothek bauen" />}
        >
          <p>Jeder Trainer bekommt Coach Web im Browser. Er baut Pläne aus der Übungsbibliothek und weist sie zu, der Plan erscheint sofort in der App des Mitglieds, und jeder Satz kommt zurück. Videos prüfen und Ernährung begleiten gehören dazu.</p>
          <p>Du siehst pro Trainer, wie schnell er antwortet, wie viele Pläne er von sich aus schreibt und wie seine Mitglieder ihn bewerten. So erkennst du, wer mit Herzblut dabei ist, ohne danebenzustehen.</p>
        </Job>
        <Job
          tone="raised"
          pop
          eyebrow="Rundgänge"
          title="Garderobe sauber, belegt."
          accent="Statt Strichliste an der Tür."
          media={<OnPhoto photo="/images/gym/hall-opening.webp" src="/images/enterprise/rounds-de.webp" alt="Rundgänge: Verwarnungs-Dossier und Erfüllung pro Bereich" />}
        >
          <p>Garderoben-Turnus, WC-Rundgang, Getränke-Check: Du legst fest, was wann zu tun ist. Dein Team scannt vor Ort den QR-Code und hakt ab. Wer in Sekunden durch eine Liste klickt, fällt auf.</p>
          <p>Meldet ein Mitglied eine schmutzige Dusche, landet das im selben Bereich. Du siehst, wann zuletzt kontrolliert wurde und von wem.</p>
        </Job>
        <Job
          flip
          pop
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
