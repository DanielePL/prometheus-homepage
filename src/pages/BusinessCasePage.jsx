import { useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import {
  ArrowRight, Building2, Dumbbell, Smartphone, Users, Check, Mail, Phone,
  Handshake, Megaphone, Target, Route,
} from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { GYM_APP, SIGNUP_GYM } from '../lib/links'

/* /business-case/ — the business case behind Prometheus, in German, for an
 * advisor who asked "Was ist das Businessmodell dahinter?" (Fabio Lenzlinger,
 * via Severin Blindenbacher, 2026-10-26). Owner, 2026-10-28: "muss gut
 * aussehen, wie /schweiz, aber businesslevel hoch und detailliert".
 *
 * Same scenes, screens and team as /schweiz/. Not public: no link, noindex,
 * Disallow in robots.txt, not in the sitemap. `?n=Fabio` greets by name.
 *
 * Rules carried over from the investor material (Enterprise docs/INVESTOR_*):
 * - No competitor prices. Competitors appear only as market validation; the
 *   price argument is our cost structure, never a price list.
 * - No "Pilot". Customer figures of Xcellent stay off the page (their data).
 * - Prices from Enterprise src/config/plans.ts and /pricing/.
 * Market figures: DSSV/Deloitte "Eckdaten DACH 2026", Swiss Active
 * Eckdatenstudie 2025, SIX/PostFinance (LSV end 30.09.2028). */

const PRODUCTS = [
  {
    icon: Building2,
    name: 'Enterprise',
    who: 'Studios und Ketten',
    price: 'CHF 149 / 249 / 399',
    unit: 'pro Standort und Monat',
    text: 'Mitglieder, Verträge, Zahlungen, Mahnwesen, Zutritt, Kasse, Kurse, Schichten, Lohn, MWST und Buchhaltung in einem System. Der Preis hängt nur an den aktiven Mitgliedern, jeder Tarif hat alle Funktionen.',
  },
  {
    icon: Dumbbell,
    name: 'Studio Light',
    who: 'Boxen, Boutique- und PT-Studios',
    price: 'CHF 79',
    unit: 'pauschal pro Monat, ein Standort',
    text: 'Coaching und Studiobetrieb in einem Konto. Wächst die Box, bleibt der Preis. Beim zweiten Standort wechselt sie auf Enterprise, ohne Datenumzug.',
  },
  {
    icon: Users,
    name: 'Coach',
    who: 'Personal Trainer und Online-Coaches',
    price: '$19 bis $89',
    unit: 'pro Monat, nach Anzahl Kunden',
    text: 'Pläne, Ernährung, Video-Review, Calls und Zahlungen. Verkauft sich ohne Termin und ohne Landesgrenze: der Trainer meldet sich selbst an.',
  },
  {
    icon: Smartphone,
    name: 'Mitglieder-App',
    who: 'Mitglieder und Athleten, iOS und Android',
    price: 'gratis · Premium',
    unit: 'Premium, Elite, Titan im Jahresabo',
    text: 'Für das Studio im Preis drin. Zutritt, Kurse, Training, Ernährung. Das Mitglied kann AI Coach und Ernährung selbst dazubuchen.',
  },
]

const REVENUE = [
  ['Software-Abo', 'Fester Monatspreis pro Standort, Studio oder Trainer. Wiederkehrend, monatlich kündbar.'],
  ['Mitglieder-App', 'Jedes gewonnene Studio bringt seine Mitglieder mit. Ein Teil davon bucht Premium dazu, ohne Werbebudget von uns.'],
  ['KI-Credits', 'Der KI-Assistent ist dabei; wer ihn intensiv nutzt, kauft Credits dazu.'],
  ['Websites', 'Auf Wunsch bauen wir die Website des Studios neu und hängen sie an Prometheus. Feste Offerte.'],
]

/* Swiss Active / DSSV-Deloitte. CH members per facility ≈ 1.45 M / 1'441. */
const MARKET = [
  { n: '1’441', l: 'Fitnessanlagen in der Schweiz', s: '1,45 Mio. Mitglieder' },
  { n: '12’495', l: 'Anlagen im DACH-Raum', s: '15,16 Mio. Mitglieder, über 8 Mrd. € Umsatz' },
  { n: '67’515', l: 'Clubs in Europa', s: 'DACH ist ein Sprachraum von acht' },
]

const CH_SITES = 1441
const SHARES = [0.01, 0.03, 0.05]

const TIERS = [
  { name: 'Starter', price: 149 },
  { name: 'Studio', price: 249 },
  { name: 'Pro', price: 399 },
]

const WHY_NOW = [
  ['Die LSV-Lastschrift läuft aus', 'Seit Januar 2026 nimmt SIX keine neuen Rechnungssteller mehr auf, am 30. September 2028 ist Schluss. Jedes Studio, das per LSV einzieht, muss umstellen. Wer ohnehin umstellt, wechselt eher auch die Software.'],
  ['Studios laufen ohne Personal', 'Schweizer Studios sind im Schnitt 99 Stunden pro Woche offen, 22 davon ohne Fachpersonal. Selbstanmeldung, Zahlung und Zutritt per Handy sind kein Extra mehr, sondern Grundausstattung.'],
  ['Die Branche ist wechselbereit', 'Der deutsche Branchenverband DSSV hat 2024 die Kooperation mit dem grössten Softwareanbieter im deutschsprachigen Raum beendet, wegen Preis- und Firmenpolitik. Laufende Verträge mit Preiserhöhungen ohne Ankündigung sind das häufigste Thema, wenn Owner mit uns reden.'],
]

const STATUS = [
  { k: 'Gebaut', v: 'Enterprise, Studio Light, Coach Web und die Mitglieder-App für iOS und Android laufen auf einer Datenbank. Eine Anmeldung, keine Schnittstellen dazwischen.' },
  { k: 'Live', v: 'Xcellent Gym in Thal seit dem 1. Oktober 2026: Self-Service von 5 bis 24 Uhr, ohne Empfang. Mitglieder melden sich online an, zahlen per Karte oder TWINT, kommen mit dem Handy rein.' },
  { k: 'Im Markt', v: 'Die Schweizer Pitch-Seite ist an über 50 Gym-Owner verschickt. Eine gedruckte Verkaufsmappe geht im November raus. Im November stellen wir Studio Light Boxen in Manila und Bangkok vor.' },
  { k: 'Infrastruktur', v: 'Datenbank in Zürich seit dem 15. Oktober 2026. Vertragspartner für Schweizer Geschäftskunden ist die Peakforce GmbH, Zollikon.' },
]

const STEPS = [
  ['Xcellent als Fallstudie', 'Vorher und nachher in Zahlen: Zeit am Empfang, offene Beiträge, Anmeldungen ausserhalb der Öffnungszeiten.'],
  ['Die ersten Owner nach Xcellent', 'Aus dem Netzwerk von Anas und den Owner-Gruppen, die er uns geöffnet hat. Persönlich, mit Datenübernahme durch uns.'],
  ['Zehn zahlende Owner bis Ende März 2027', 'Unabhängige, vom Owner geführte Gyms in der Schweiz und CrossFit-Boxen in Südostasien.'],
  ['Kapital für Vertrieb', 'Das Produkt ist gebaut. Geld geht in den Markt, nicht in die Entwicklung.'],
  ['Spitzensport, Lab und Verbände', 'Messung der Hantelgeschwindigkeit per Handykamera, Athletiktrainer in Clubs, später Verbände.'],
]

const HELP = [
  { icon: Target, title: 'Positionierung', text: 'Wie erklären wir ein System, das sechs Programme ersetzt, in einem Satz, ohne über den Preis zu verkaufen?' },
  { icon: Handshake, title: 'Aus einer Referenz zehn machen', text: 'Wie baut man Success Cases so, dass der nächste Owner sie glaubt? Was muss die Xcellent-Fallstudie zeigen?' },
  { icon: Megaphone, title: 'Markt aufbauen', text: 'Du hast für On einen Markt aufgebaut. Welche Hebel aus dieser Zeit lassen sich auf Gyms und Trainer übertragen?' },
  { icon: Route, title: 'Türen', text: 'Wo sitzen die Owner, die heute wechseln wollen? Ketten, Verbände, Marken, die schon im Studio stehen.' },
]

const TEAM = [
  { name: 'Daniele Pauli', role: 'Gründer · baut die Software', img: 'team-daniele', line: 'IPF-Weltmeister 2018, Europameister Masters Gewichtheben 2023 und 2024. Athletiktrainer seit 2007.' },
  { name: 'Dr. Basil Achermann', role: 'Chief Science Officer', img: 'team-basil', line: 'Doktor der Sportwissenschaft, Universität Zürich. Leitet das Prometheus Lab.' },
  { name: 'Thomas Bachmann', role: 'Backend Security Engineer', img: 'team-thomas', line: 'Datenschutz, Betrieb, Wartung und Updates.' },
  { name: 'Christopher Linter', role: 'CFO', img: 'team-christopher', line: 'Betriebswirtschaft und Unternehmensführung, HSG.' },
  { name: 'Madeleine Linter', role: 'Strategie & Legal', img: 'team-madeleine', line: 'Rechtsanwältin, Ökonomin HSG. Früher McKinsey, hat drei KMU aufgebaut.' },
  { name: 'Chloé Borge', role: 'Social Media & Marketing', img: 'team-chloe', line: 'Marke, Inhalte und Community, auf Englisch und Französisch.' },
  { name: 'Severin Blindenbacher', role: 'Ambassador', img: 'team-severin', line: 'Ehemaliger Verteidiger und Assistenzcaptain der ZSC Lions. Drei Olympische Spiele.' },
]

function chf(n) {
  return `CHF ${Math.round(n).toLocaleString('de-CH')}`
}

function Scene({ src, poster, loop = true, className = '' }) {
  const [still, setStill] = useState(false)
  useEffect(() => {
    setStill(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  }, [])
  return still ? (
    <img src={poster} alt="" aria-hidden="true" className={`w-full h-full object-cover ${className}`} />
  ) : (
    <video src={src} poster={poster} autoPlay muted loop={loop} playsInline preload="auto" aria-hidden="true" className={`w-full h-full object-cover ${className}`} />
  )
}

function useName() {
  const [name, setName] = useState('')
  useEffect(() => {
    const n = new URLSearchParams(window.location.search).get('n')
    if (n) setName(n.replace(/[^\p{L}\s'-]/gu, '').trim().slice(0, 40))
  }, [])
  return name
}

function Hero({ name }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white min-h-[92svh] flex items-end">
      <div className="absolute inset-0 -z-20">
        <Scene src="/club/hero.mp4" poster="/club/hero.webp" loop={false} className="object-[45%_center]" />
      </div>
      <div className="photo-scrim-hero absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-gradient-to-b from-transparent to-graphite" aria-hidden="true" />
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-20 lg:pb-28">
        <div className="max-w-[58rem] hero-rise">
          <h1>
            <span className="eyebrow eyebrow-photo">Business Case · Vertraulich · Oktober 2026</span>
            <span className="block display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.6rem]">
              Die Software, auf der ein Fitnessbetrieb läuft.{' '}
              <span className="text-white/50 font-medium">Vom Empfang bis zur Trainingsfläche, in einem System.</span>
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl">
            {name ? `${name}, du` : 'Du'} hast gefragt, was das Geschäftsmodell hinter Prometheus ist.
            Hier ist es: was wir verkaufen, woran wir verdienen, wie gross der Markt ist,
            wo wir heute stehen und wobei uns deine Erfahrung am meisten bringt.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="#modell" className="btn btn-primary btn-lg">Zum Geschäftsmodell <ArrowRight size={18} /></a>
            <a href="#hilfe" className="btn btn-ghost-light btn-lg">Wo du helfen kannst</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Glance() {
  const items = [
    ['4', 'Produkte auf einer Datenbank', 'Studio, Box, Trainer, Mitglied'],
    ['97–99 %', 'Marge auf den Web-Produkten', 'nach Zahlungsgebühr, vor Löhnen'],
    ['0 %', 'Anteil an Mitgliederbeiträgen', 'das Geld geht direkt ans Studio'],
    ['1.10.2026', 'erstes Gym live', 'Xcellent Gym, Thal, ohne Empfang'],
  ]
  return (
    <Section tone="raised">
      <SectionHeader eyebrow="Auf einen Blick" title="Gebaut und bezahlt." accent="Jetzt geht es um den Markt." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
        {items.map(([n, l, s], i) => (
          <Reveal key={l} delay={i * 0.05} className="card rounded-2xl p-7">
            <p className="display text-4xl sm:text-5xl text-ink">{n}</p>
            <p className="mt-3 font-semibold text-ink">{l}</p>
            <p className="mt-1 text-sm text-muted">{s}</p>
          </Reveal>
        ))}
      </div>
    </Section>
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
            <p className="eyebrow eyebrow-photo">Das Problem</p>
            <p className="display text-3xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl mt-6">
              Ein typisches Studio arbeitet mit sechs Programmen. Mitglieder, Kasse, Zutritt, Schichtplan, Mahnungen, Belege.{' '}
              <span className="text-white/55 font-medium">Keins redet mit dem anderen. Die Lücken füllt der Owner, abends am Küchentisch.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* The four doors, and the one line that makes it a model: every door leads
   into the same member app. */
function Model() {
  return (
    <Section id="modell">
      <SectionHeader
        eyebrow="Geschäftsmodell"
        title="Vier Türen, eine Datenbank."
        accent="Jede verkauft sich einzeln, jede führt in dieselbe App."
        subline="Keine Hierarchie: Eine Box kann dauerhaft bei Studio Light bleiben, ein Trainer dauerhaft unabhängig. Wer wächst, wechselt das Produkt ohne Datenumzug. Wachstum kostet uns den Kunden nicht."
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-14">
        {PRODUCTS.map(({ icon: Icon, name, who, price, unit, text }, i) => (
          <Reveal key={name} delay={i * 0.05} className="card rounded-3xl p-7 flex flex-col">
            <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-accent/10 text-accent-dark">
              <Icon size={22} />
            </span>
            <h3 className="mt-5 text-2xl font-semibold text-ink">{name}</h3>
            <p className="text-sm text-muted">{who}</p>
            <p className="display text-3xl mt-5 text-ink">{price}</p>
            <p className="text-sm text-muted">{unit}</p>
            <p className="mt-5 text-muted leading-relaxed">{text}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-6 rounded-3xl bg-night text-white p-7 sm:p-10 grid lg:grid-cols-[1fr_1.3fr] gap-8 items-center">
        <p className="display text-2xl sm:text-3xl leading-snug">
          Ein Studio wird einzeln gewonnen.{' '}
          <span className="text-white/50 font-medium">Seine Trainer und Mitglieder kommen mit.</span>
        </p>
        <p className="text-white/70 leading-relaxed">
          Die Trainer planen in Coach Web, die Mitglieder trainieren in der App, mit der sie auch reinkommen.
          Andere Studio-Software hört am Empfang auf. Bei uns geht sie auf der Trainingsfläche weiter, und dort
          entsteht der zweite Umsatz: Mitglieder, die Premium selbst dazubuchen.
        </p>
      </Reveal>
    </Section>
  )
}

function Revenue() {
  return (
    <Section tone="raised">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <SectionHeader align="left" eyebrow="Woran wir verdienen" title="Wiederkehrend." accent="Und nicht am Geld des Studios." />
          <Reveal delay={0.06}>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
              Wir nehmen bewusst keinen Anteil an den Mitgliederbeiträgen und keine Transaktionsgebühr.
              Das Studio zahlt einen festen Preis und weiss, was es kostet. Das ist im Verkauf das
              stärkste Vertrauensargument, das wir haben.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.08} className="card rounded-3xl p-7 sm:p-8">
          <ol className="space-y-5">
            {REVENUE.map(([k, v], i) => (
              <li key={k} className="flex gap-4">
                <span className="mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-accent/10 text-accent-dark">{i + 1}</span>
                <span><span className="font-semibold text-ink">{k}.</span> <span className="text-muted">{v}</span></span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}

function Economics() {
  const rows = [
    ['Web-Produkte (Enterprise, Studio Light, Coach)', '97–99 %', 'Abgerechnet über Stripe, 1,5 % + CHF 0.25 pro Zahlung. Kein App-Store dazwischen, keine Installation, kein Aussendienst.'],
    ['Mitglieder-App', '85 %', '15 % Store-Anteil bei Apple und Google unter 1 Mio. $ Jahreserlös.'],
    ['Einführung beim Studio', 'einmalig', 'Datenübernahme und Einrichtung machen wir, ohne Aufpreis. Bestandsdaten kommen automatisch aus dem alten System.'],
  ]
  return (
    <Section>
      <SectionHeader
        eyebrow="Kostenstruktur"
        title="Unser Preis bezahlt Produkt,"
        accent="nicht Organisation."
        subline="Etablierte Anbieter finanzieren mit ihrem Preis grosse Entwicklungs- und Vertriebsapparate. Prometheus ist KI-nativ gebaut, von einem kleinen Team. Deshalb sind die laufenden Kosten niedrig und die Margen hoch. Margen = Umsatz minus Zahlungs- oder Store-Gebühr, vor Löhnen."
      />
      <Reveal className="card rounded-3xl overflow-hidden mt-12 max-w-5xl mx-auto">
        {rows.map(([k, m, t], i) => (
          <div key={k} className={`grid sm:grid-cols-[1.1fr_0.5fr_1.6fr] gap-2 sm:gap-6 p-6 sm:px-8 ${i ? 'border-t border-line' : ''}`}>
            <p className="font-semibold text-ink">{k}</p>
            <p className="display text-2xl text-accent-dark">{m}</p>
            <p className="text-muted leading-relaxed">{t}</p>
          </div>
        ))}
      </Reveal>
    </Section>
  )
}

function Slider({ label, value, set, min, max, step, fmt }) {
  return (
    <label className="block">
      <span className="flex justify-between text-[0.95rem] text-ink">
        <span>{label}</span>
        <span className="font-semibold">{fmt(value)}</span>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} className="w-full mt-2 accent-accent" />
    </label>
  )
}

/* The visitor sets the assumptions; every default is labelled as one. App
   net per paying member: ~$67 after store share (dossier), ≈ CHF 55. */
function Calculator() {
  const [sites, setSites] = useState(25)
  const [tier, setTier] = useState(1)
  const [members, setMembers] = useState(1000)
  const [rate, setRate] = useState(2)
  const software = sites * TIERS[tier].price * 12
  const app = sites * members * (rate / 100) * 55
  const total = software + app

  return (
    <Section id="rechner" tone="raised">
      <SectionHeader
        eyebrow="Rechne das Modell"
        title="Wiederkehrender Umsatz pro Jahr."
        accent="Deine Annahmen."
        subline="Software nach festem Tarif. Dazu die App: Ein Anteil der Mitglieder bucht Premium, netto rund CHF 55 pro zahlendes Mitglied und Jahr nach Store-Anteil. Ein Schweizer Studio hat im Schnitt rund 1’000 Mitglieder."
      />
      <Reveal className="card rounded-3xl overflow-hidden mt-12 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 sm:p-8 space-y-7">
            <Slider label="Standorte" value={sites} set={setSites} min={1} max={250} step={1} fmt={(v) => v} />
            <div>
              <p className="text-[0.95rem] text-ink">Ø Tarif pro Standort</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {TIERS.map((t, i) => (
                  <button key={t.name} type="button" onClick={() => setTier(i)} className={`h-9 px-3 rounded-full text-sm border transition ${i === tier ? 'bg-accent border-accent text-white' : 'border-line text-ink hover:border-accent'}`}>
                    {t.name} · CHF {t.price}
                  </button>
                ))}
              </div>
            </div>
            <Slider label="Mitglieder pro Standort" value={members} set={setMembers} min={100} max={3000} step={50} fmt={(v) => v.toLocaleString('de-CH')} />
            <Slider label="Anteil Mitglieder mit Premium" value={rate} set={setRate} min={0} max={10} step={0.5} fmt={(v) => `${v} %`} />
          </div>
          <div className="bg-night text-white p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <p className="text-sm text-white/60">Software</p>
              <p className="display text-3xl mt-1">{chf(software)}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Mitglieder-App</p>
              <p className="display text-3xl mt-1">{chf(app)}</p>
            </div>
            <div className="border-t border-white/15 pt-6">
              <p className="text-sm text-white/60">Zusammen pro Jahr</p>
              <p className="display text-5xl mt-1 text-accent-light">{chf(total)}</p>
              <p className="text-sm text-white/55 mt-2">{(sites / CH_SITES * 100).toFixed(1)} % der Schweizer Anlagen</p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}

function Market() {
  const perSite = 249 * 12
  return (
    <Section>
      <SectionHeader
        eyebrow="Markt"
        title="Die Schweiz ist der Anfang."
        accent="Der Sprachraum ist DACH, das Produkt ist international."
      />
      <div className="grid md:grid-cols-3 gap-4 mt-14">
        {MARKET.map(({ n, l, s }, i) => (
          <Reveal key={l} delay={i * 0.05} className="card rounded-2xl p-7">
            <p className="display text-5xl text-ink">{n}</p>
            <p className="mt-3 font-semibold text-ink">{l}</p>
            <p className="mt-1 text-sm text-muted">{s}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="card rounded-3xl overflow-hidden mt-6">
        <div className="p-6 sm:p-8">
          <p className="font-semibold text-ink">Schweiz, nur Studio-Software (Ø Tarif Studio, CHF {perSite.toLocaleString('de-CH')} pro Standort und Jahr)</p>
          <p className="text-sm text-muted mt-1">Ohne Mitglieder-App, ohne Coach, ohne Ausland. Gerechnet als Anteil der 1’441 Anlagen.</p>
        </div>
        <div className="grid grid-cols-3 border-t border-line">
          {SHARES.map((s, i) => {
            const n = Math.round(CH_SITES * s)
            return (
              <div key={s} className={`p-6 sm:p-8 ${i ? 'border-l border-line' : ''}`}>
                <p className="text-sm text-muted">{Math.round(s * 100)} % · {n} Standorte</p>
                <p className="display text-2xl sm:text-4xl text-ink mt-2">{chf(n * perSite)}</p>
              </div>
            )
          })}
        </div>
      </Reveal>
      <p className="text-sm text-muted mt-6 max-w-4xl">
        Im DACH-Raum sind 5 % der Anlagen 625 Standorte, rund 1,9 Mio. € Software-Umsatz im Jahr, und 95 % des Marktes bleiben offen.
        Studio Light und Coach verkaufen sich ohne Vor-Ort-Termin auch ausserhalb Europas. Quellen: DSSV/Deloitte, Eckdaten DACH 2026;
        Swiss Active, Eckdatenstudie Schweizer Fitnesswirtschaft 2025.
      </p>
    </Section>
  )
}

function WhyNow() {
  return (
    <Section tone="raised">
      <SectionHeader eyebrow="Warum jetzt" title="Drei Gründe," accent="warum Studios gerade wechseln." />
      <div className="grid md:grid-cols-3 gap-4 mt-14">
        {WHY_NOW.map(([t, x], i) => (
          <Reveal key={t} delay={i * 0.06} className="card rounded-2xl p-7">
            <span className="display text-4xl text-accent-dark">{i + 1}</span>
            <h3 className="mt-3 text-xl font-semibold text-ink">{t}</h3>
            <p className="mt-2 text-muted leading-relaxed">{x}</p>
          </Reveal>
        ))}
      </div>
      <p className="text-sm text-muted mt-6">Quellen: SIX / PostFinance, KMU-Portal des Bundes; Swiss Active 2025; DSSV, Meldung vom 16.04.2024.</p>
    </Section>
  )
}

function Product() {
  return (
    <Section>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal className="relative rounded-3xl aspect-[16/10] overflow-hidden bg-night">
          <img src="/images/gym/front-desk.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-night/60 via-night/30 to-night/75" />
          <div className="absolute inset-4 sm:inset-8 overflow-hidden rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <img src="/images/enterprise/stage-light.webp" alt="Prometheus Kommandozentrale: Entscheidungen des Tages, Mitglieder, Check-ins, Termine und To-dos" loading="lazy" className="h-full w-full object-cover object-left-top" />
          </div>
        </Reveal>
        <div>
          <SectionHeader align="left" eyebrow="Das Produkt" title="Ein Bildschirm für das ganze Studio." accent="Mit KI im Kern, nicht angeflickt." />
          <Reveal delay={0.08}>
            <ul className="mt-6 space-y-3 text-muted leading-relaxed max-w-xl">
              {[
                'Anmeldung, Vertrag, Gesundheitsfragen und Unterschrift am Tablet oder per App',
                'Automatischer Einzug, Mahnstufen und Zutrittssperre nach den Regeln des Owners',
                'Zutritt per QR oder Handy, Kasse auf das Mitgliederkonto',
                'Schichtplan wird zur Lohnabrechnung, MWST für die ESTV vorbereitet',
                'Ein Assistent, der die Zahlen des Studios kennt, und eine Prognose, wer bald kündigt',
                'Hantelgeschwindigkeit per Handykamera, Methodik aus dem Prometheus Lab',
              ].map((t) => (
                <li key={t} className="flex gap-2.5"><Check size={18} className="text-accent mt-1 shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
            <a href="/schweiz/" target="_blank" rel="noopener" className="mt-7 inline-flex items-center gap-2 font-semibold text-accent-dark hover:gap-3 transition-all">
              Das Produkt so, wie ein Gym-Owner es sieht <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Status() {
  return (
    <Section tone="raised">
      <SectionHeader
        eyebrow="Wo wir stehen"
        title="Ehrlich gesagt:"
        accent="Das Produkt ist weiter als der Umsatz."
        subline="Gebaut ist alles, was ein Studio braucht. Der Umsatz steht am Anfang. Was jetzt zählt, sind Referenzen, die der nächste Owner glaubt."
      />
      <div className="grid md:grid-cols-2 gap-4 mt-14 max-w-5xl mx-auto">
        {STATUS.map(({ k, v }, i) => (
          <Reveal key={k} delay={i * 0.05} className="card rounded-2xl p-7">
            <p className="text-sm font-semibold text-accent-dark">{k}</p>
            <p className="mt-2 text-ink leading-relaxed">{v}</p>
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
        <p className="eyebrow mx-auto">Referenz</p>
        <p className="display text-3xl sm:text-5xl mt-6">
          Xcellent Gym, Thal.{' '}
          <span className="display-soft">Offen von 5 bis 24 Uhr, ohne Empfang, seit dem ersten Tag auf Prometheus.</span>
        </p>
        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
          Daten aus dem alten System übernommen, Website von Wix neu gebaut: Online Mitglied werden in fünf Schritten,
          Bezahlung per Karte oder TWINT, Abos und Preise live aus Prometheus.{' '}
          <a href="https://www.xcellentgym.ch/" target="_blank" rel="noopener" className="text-accent-dark underline underline-offset-4">xcellentgym.ch</a>
        </p>
      </Reveal>
    </Section>
  )
}

function Steps() {
  return (
    <Section tone="raised">
      <SectionHeader eyebrow="Die nächsten Schritte" title="Ein Filter für jede Gelegenheit:" accent="Bringt es uns zahlende Owner?" />
      <ol className="mt-14 max-w-4xl mx-auto space-y-4">
        {STEPS.map(([t, x], i) => (
          <Reveal key={t} delay={i * 0.05} className="card rounded-2xl p-6 flex gap-5">
            <span className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold ${i === 0 ? 'bg-accent text-white' : 'bg-accent/10 text-accent-dark'}`}>{i + 1}</span>
            <span>
              <span className="block text-lg font-semibold text-ink">{t}</span>
              <span className="block mt-1 text-muted leading-relaxed">{x}</span>
            </span>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

function Help({ name }) {
  return (
    <Section id="hilfe">
      <SectionHeader
        eyebrow="Wo du helfen kannst"
        title={name ? `${name}, du hast es selbst gesagt:` : 'Du hast es selbst gesagt:'}
        accent="Referenzkunden und Success Cases bauen und gewinnen."
        subline="Genau da stehen wir. Vier Fragen, bei denen uns deine Erfahrung mehr bringt als jedes Werbebudget. Dreissig Minuten bis eine Stunde reichen für den Anfang."
      />
      <div className="grid sm:grid-cols-2 gap-4 mt-14 max-w-5xl mx-auto">
        {HELP.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.05} className="card rounded-2xl p-7">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-accent/10 text-accent-dark"><Icon size={20} /></span>
            <h3 className="mt-4 text-xl font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-muted leading-relaxed">{text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Team() {
  return (
    <Section tone="night">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-x-12 gap-y-4 items-end">
        <Reveal>
          <span className="eyebrow">Das Team</span>
          <h2 className="display text-4xl sm:text-5xl text-white mt-5">
            Gebaut in Zürich, <span className="display-soft">von Leuten, die selbst unter der Stange stehen.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lg text-white/65 leading-relaxed">
            Coaches, Elite-Athleten und Sportwissenschaftler, dazu Finanzen und Recht aus der HSG. Kein grosser
            Entwicklungsapparat: Die Software entsteht KI-nativ, deshalb bleiben die Fixkosten klein.
          </p>
        </Reveal>
      </div>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 xl:gap-4">
        {TEAM.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.04} className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
            <img src={`/images/teamsport/${m.img}.webp`} alt={m.name} width="480" height="600" loading="lazy" className="w-full aspect-[4/5] object-cover object-top" />
            <div className="p-3">
              <p className="font-semibold text-white leading-tight">{m.name}</p>
              <p className="mt-0.5 text-xs text-accent-light leading-snug">{m.role}</p>
              <p className="mt-1.5 text-xs text-white/60 leading-snug">{m.line}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-sm text-white/45">
        Peakforce GmbH · Zollikon
        {/* CC BY-SA 4.0 requires the credit wherever the photo is shown. */}
        <span className="ml-3 text-xs text-white/30">Foto S. Blindenbacher: Pumpido75, CC BY-SA 4.0, Wikimedia Commons</span>
      </p>
    </Section>
  )
}

function Closing({ name }) {
  return (
    <Section tone="night" width="narrow" className="text-center overflow-hidden isolate lg:py-40">
      <img src="/club/hero-end.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 -z-10" aria-hidden="true" style={{ background: 'linear-gradient(180deg, rgba(15,15,18,0.6) 0%, rgba(15,15,18,0.75) 55%, #0F0F12 100%)' }} />
      <Reveal className="relative">
        <span className="light-line mx-auto mb-8" aria-hidden="true" />
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white">
          {name ? `Danke, ${name}.` : 'Danke für deine Zeit.'}
        </h2>
        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
          Sag uns, wann dir dreissig Minuten passen. Wir bringen die Zahlen mit, du die Fragen.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="mailto:management@prometheus.coach?subject=Prometheus%20Business%20Case" className="btn btn-primary btn-lg">
            <Mail size={18} /> Daniele schreiben
          </a>
          <a href="tel:+41772481755" className="btn btn-ghost-light btn-lg"><Phone size={18} /> +41 77 248 17 55</a>
        </div>
        <p className="mt-8 text-sm text-white/45">Daniele Pauli · Gründer · Peakforce GmbH, Zollikon</p>
      </Reveal>
    </Section>
  )
}

export default function BusinessCasePage() {
  const name = useName()
  return (
    <>
      <Head>
        <html lang="de-CH" />
        <title>Business Case | Prometheus</title>
        <meta name="description" content="Das Geschäftsmodell hinter Prometheus: Produkte, Umsatzquellen, Kostenstruktur, Markt und nächste Schritte." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:title" content="Prometheus · Business Case" />
        <meta property="og:description" content="Die Software, auf der ein Fitnessbetrieb läuft. Geschäftsmodell, Markt und nächste Schritte." />
        <meta property="og:image" content="https://prometheus.coach/club/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <HomeNav overDark links={[]} login={GYM_APP} signup={SIGNUP_GYM} loginLabel="Login" signupLabel="30 Tage testen" />
      <main>
        <Hero name={name} />
        <Glance />
        <Pain />
        <Model />
        <Revenue />
        <Economics />
        <Calculator />
        <Market />
        <WhyNow />
        <Product />
        <Status />
        <Reference />
        <Steps />
        <Help name={name} />
        <Team />
        <Closing name={name} />
      </main>
      <HomeFooter de />
    </>
  )
}
