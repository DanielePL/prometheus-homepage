import { useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import {
  ArrowRight, Building2, Dumbbell, Smartphone, Users, Check, Mail, Phone,
  Handshake, Megaphone, Target, Landmark, Database, Activity, ShieldCheck, Cpu,
  Network, Trophy, Globe, UserCheck,
} from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { GYM_APP, SIGNUP_GYM } from '../lib/links'

/* /business-case/ — the business case behind Prometheus, in German, sent as a
 * link to advisors, partners and investors. First reader: an advisor who
 * asked for the business model (2026-10-26).
 *
 * Owner, 2026-10-29: generic, nobody is addressed by name, and it has to read
 * at board level ("professioneller, nicht wie ich es bin, besser"). So: no
 * du, no Swiss-German warmth, no anecdotes; a business case structure
 * (summary, problem, model, economics, market, timing, position, traction,
 * go-to-market, milestones, team).
 *
 * Same scenes, screens and team photos as /schweiz/. Not public: no link,
 * noindex, Disallow in robots.txt, not in the sitemap.
 *
 * Rules carried over from the investor material (Enterprise docs/INVESTOR_*):
 * - No competitor prices; competitors only as market validation, the price
 *   argument is our cost structure.
 * - No "Pilot". Customer figures of Xcellent stay off the page (their data).
 * - Prices from Enterprise src/config/plans.ts and /pricing/.
 * Market figures: DSSV/Deloitte "Eckdaten DACH 2026", Swiss Active
 * Eckdatenstudie 2025, SIX/PostFinance (LSV end 30.09.2028). */

const SUMMARY = [
  ['Problem', 'Fitnessbetriebe arbeiten mit fünf bis sieben nicht verbundenen Programmen für Mitglieder, Zahlungen, Zutritt, Personal und Buchhaltung. Die Integration leistet der Betreiber von Hand.'],
  ['Lösung', 'Prometheus ist eine Plattform mit einem Datenmodell für den gesamten Betrieb, vom Vertrag bis zur Trainingsfläche. Vier Produkte decken Ketten, Einzelstudios, Trainer und Mitglieder ab.'],
  ['Erlösmodell', 'Wiederkehrende Lizenzerlöse pro Standort zu festen Preisen, ergänzt durch Abonnements in der Mitglieder-App. Kein Anteil an den Mitgliederbeiträgen.'],
  ['Wirtschaftlichkeit', '97–99 % Bruttomarge auf den Web-Produkten. KI-native Entwicklung hält die Fixkosten strukturell tief.'],
  ['Stand', 'Plattform vollständig im Betrieb. Erster Referenzbetrieb seit 1. Oktober 2026. Markteintritt Schweiz läuft, Südostasien folgt im November 2026.'],
  ['Fokus', 'Zehn zahlende Betreiber bis Ende März 2027. Danach Kapital für den Aufbau des Vertriebs.'],
]

const KPIS = [
  ['4', 'Produkte, ein Datenmodell', 'Kette, Studio, Trainer, Mitglied'],
  ['97–99 %', 'Bruttomarge Web-Produkte', 'nach Zahlungsgebühren, vor Personal'],
  ['0 %', 'Anteil an Mitgliederbeiträgen', 'Beiträge fliessen direkt an den Betrieb'],
  ['1’441', 'Fitnessanlagen in der Schweiz', 'Kernmarkt der ersten Phase'],
]

const PRODUCTS = [
  {
    icon: Building2,
    name: 'Enterprise',
    who: 'Fitnessstudios und Ketten',
    price: 'CHF 149 / 249 / 399',
    unit: 'pro Standort und Monat',
    text: 'Mitglieder, Verträge, Zahlungsverkehr, Mahnwesen, Zutritt, Kasse, Kurse, Personalplanung, Lohn, MWST und Buchhaltung. Die Preisstufe richtet sich ausschliesslich nach den aktiven Mitgliedern; jede Stufe enthält den vollen Funktionsumfang.',
  },
  {
    icon: Dumbbell,
    name: 'Studio Light',
    who: 'Boxen, Boutique- und PT-Studios',
    price: 'CHF 79',
    unit: 'pauschal pro Monat, ein Standort',
    text: 'Coaching und Studiobetrieb in einem Konto. Pauschalpreis ohne Mitgliederstaffel. Beim zweiten Standort erfolgt der Wechsel auf Enterprise ohne Datenmigration.',
  },
  {
    icon: Users,
    name: 'Coach',
    who: 'Personal Trainer und Online-Coaches',
    price: 'USD 19–89',
    unit: 'pro Monat, nach Anzahl Kunden',
    text: 'Trainingsplanung, Ernährung, Video-Analyse, Videocalls und Zahlungsabwicklung. Vollständig im Self-Service verkauft, ohne Vor-Ort-Termin und ohne Landesgrenze.',
  },
  {
    icon: Smartphone,
    name: 'Mitglieder-App',
    who: 'iOS und Android',
    price: 'Basis gratis',
    unit: 'Premium, Elite, Titan im Abonnement',
    text: 'Zutritt, Kursbuchung, Training und Ernährung in einer App, im Erscheinungsbild des Betriebs. Für den Betrieb inbegriffen; Mitglieder buchen KI-Coach und Ernährung selbst hinzu.',
  },
]

const REVENUE = [
  ['Software-Lizenzen', 'Fester Monatspreis pro Standort, Studio oder Trainer. Wiederkehrend und planbar.'],
  ['Mitglieder-Abonnements', 'Jeder gewonnene Betrieb bringt seine Mitglieder auf die Plattform. Ein Teil bucht Premium-Funktionen hinzu, ohne zusätzliche Akquisitionskosten.'],
  ['KI-Kontingente', 'Der KI-Assistent ist inbegriffen; intensive Nutzung wird über zusätzliche Kontingente abgerechnet.'],
  ['Projektgeschäft', 'Websites für Betriebe, direkt an die Plattform angebunden, zu Festpreisen.'],
]

const ECONOMICS = [
  ['Web-Produkte', 'Enterprise, Studio Light, Coach', '97–99 %', 'Abrechnung über Stripe (1,5 % + CHF 0.25 pro Zahlung). Kein App-Store, keine Installation, kein Aussendienst.'],
  ['Mitglieder-App', 'iOS und Android', '85 %', 'Store-Anteil von 15 % bei Apple und Google unter USD 1 Mio. Jahreserlös.'],
  ['Einführung', 'Migration und Einrichtung', 'einmalig', 'Datenübernahme aus dem Altsystem weitgehend automatisiert; für den Kunden ohne Aufpreis, vertraglich zugesichert.'],
]

const MARKET = [
  { n: '1’441', l: 'Fitnessanlagen Schweiz', s: '1,45 Mio. Mitglieder' },
  { n: '12’495', l: 'Fitnessanlagen DACH', s: '15,16 Mio. Mitglieder · über EUR 8 Mrd. Umsatz' },
  { n: '67’515', l: 'Fitnessclubs Europa', s: 'DACH ist einer von acht Sprachräumen' },
]

const CH_SITES = 1441
const SHARES = [0.01, 0.03, 0.05]

const TIERS = [
  { name: 'Starter', price: 149 },
  { name: 'Studio', price: 249 },
  { name: 'Pro', price: 399 },
]

const WHY_NOW = [
  ['Regulatorischer Wechselzwang', 'Seit Januar 2026 nimmt SIX keine neuen Rechnungssteller ins LSV-Lastschriftverfahren auf; am 30. September 2028 wird es eingestellt. Jeder Betrieb, der heute per LSV einzieht, muss seinen Zahlungsverkehr umstellen und öffnet damit die Softwarefrage.'],
  ['Betrieb ohne Personal', 'Schweizer Anlagen sind durchschnittlich 99 Stunden pro Woche geöffnet, 22 davon ohne Fachpersonal. Selbstanmeldung, digitale Zahlung und Zutritt per Smartphone werden zur Grundausstattung.'],
  ['Wechselbereitschaft im Markt', 'Der deutsche Branchenverband DSSV beendete 2024 die Kooperation mit dem grössten Softwareanbieter im deutschsprachigen Raum, mit Verweis auf dessen Preis- und Firmenpolitik. Einseitige Preiserhöhungen bei laufenden Verträgen sind in Gesprächen mit Betreibern ein wiederkehrendes Thema.'],
]

const POSITION = [
  { icon: Database, title: 'Ein Datenmodell statt Schnittstellen', text: 'Mitglied, Vertrag, Zahlung, Zutritt, Schicht und Buchung liegen in derselben Datenbank. Kennzahlen stimmen in Echtzeit, ohne Exporte und ohne Integrationsprojekte.' },
  { icon: Activity, title: 'Über den Empfang hinaus', text: 'Klassische Studiosoftware endet am Empfang. Prometheus reicht bis auf die Trainingsfläche: Trainingspläne, Protokolle und Fortschritt in der App, mit der das Mitglied auch eintritt. Das erhöht die Bindung und erschliesst einen zweiten Erlösstrom.' },
  { icon: ShieldCheck, title: 'Schweizer Anforderungen nativ', text: 'Abrechnung in CHF, QR-Rechnung, MWST nach effektiver Methode oder Saldosteuersatz, Treuhänderzugang, Datenhaltung in Zürich. Vertragspartner ist eine Schweizer Gesellschaft.' },
  { icon: Cpu, title: 'KI-native Kostenstruktur', text: 'Etablierte Anbieter finanzieren mit ihren Preisen grosse Entwicklungs- und Vertriebsorganisationen. Prometheus wird KI-nativ von einem kleinen Team entwickelt. Der Preis finanziert das Produkt, nicht die Organisation.' },
]

const STATUS = [
  { k: 'Produkt', v: 'Enterprise, Studio Light, Coach Web und die Mitglieder-App für iOS und Android sind im Betrieb, auf einer gemeinsamen Datenbank mit einer Anmeldung.' },
  { k: 'Referenzbetrieb', v: 'Xcellent Gym, Thal, seit 1. Oktober 2026: Self-Service-Betrieb von 5 bis 24 Uhr ohne Empfang, Onlineanmeldung, Zahlung per Karte oder TWINT, Zutritt per Smartphone.' },
  { k: 'Markteintritt', v: 'Schweiz: Direktansprache von über 50 Betreibern, gedruckte Verkaufsunterlagen ab November 2026. Südostasien: Präsentation von Studio Light vor Boxen in Manila und Bangkok im November 2026.' },
  { k: 'Infrastruktur und Struktur', v: 'Datenhaltung in Zürich seit 15. Oktober 2026. Vertragspartner für Geschäftskunden in der Schweiz ist die Peakforce GmbH, Zollikon.' },
]

const GTM = [
  { icon: Network, title: 'Betreiber-Netzwerke', text: 'Direktansprache inhabergeführter Studios über bestehende Betreiber-Netzwerke, ausgehend vom Referenzbetrieb.' },
  { icon: UserCheck, title: 'Referenzbetriebe', text: 'Dokumentierte Fallstudien mit Vorher-nachher-Kennzahlen als zentrales Verkaufsargument gegenüber dem nächsten Betreiber.' },
  { icon: Trophy, title: 'Spitzensport', text: 'Botschafter aus dem Spitzensport und Athletiktrainer in Clubs als Zugang zu Vereinen, Verbänden und deren Umfeld.' },
  { icon: Globe, title: 'Self-Service international', text: 'Coach und Studio Light werden ohne Vertriebsaufwand online abgeschlossen und erschliessen Märkte ausserhalb des DACH-Raums.' },
]

const STEPS = [
  ['Fallstudie Referenzbetrieb', 'Messbare Ergebnisse aus dem ersten Betrieb: Aufwand am Empfang, offene Beiträge, Anmeldungen ausserhalb der Öffnungszeiten.'],
  ['Erste Betreiber nach der Referenz', 'Abschlüsse im Netzwerk des Referenzbetriebs, mit vollständiger Datenübernahme durch Prometheus.'],
  ['Zehn zahlende Betreiber bis Ende März 2027', 'Inhabergeführte Studios in der Schweiz und CrossFit-Boxen in Südostasien.'],
  ['Wachstumskapital für den Vertrieb', 'Die Plattform ist gebaut und bezahlt. Kapital fliesst in Vertrieb und Markenaufbau, nicht in die Entwicklung.'],
  ['Spitzensport, Forschung, Verbände', 'Geschwindigkeitsbasiertes Training per Smartphone-Kamera, Methodik aus dem Prometheus Lab, Zusammenarbeit mit Clubs und Verbänden.'],
]

const PARTNERS = [
  { icon: Megaphone, title: 'Markenaufbau und Go-to-Market', text: 'Erfahrung im Aufbau einer Marke und eines Marktes im Sport, von den ersten Referenzen bis zur Skalierung.' },
  { icon: Handshake, title: 'Referenzprogramm', text: 'Struktur für Fallstudien und Empfehlungen, die aus einzelnen Kunden einen wiederholbaren Vertriebskanal machen.' },
  { icon: Target, title: 'Zugang zu Entscheidern', text: 'Kontakte zu Betreibern, Ketten, Verbänden und Marken, die bereits in Fitnessbetrieben präsent sind.' },
  { icon: Landmark, title: 'Wachstumskapital', text: 'Nach Erreichen von zehn zahlenden Betreibern: Kapital für den Aufbau eines Vertriebsteams im DACH-Raum.' },
]

const TEAM = [
  { name: 'Daniele Pauli', role: 'Gründer & CEO', img: 'team-daniele', line: 'Entwickelt die Plattform. IPF-Weltmeister 2018, Europameister Masters Gewichtheben 2023 und 2024, Athletiktrainer seit 2007.' },
  { name: 'Dr. Basil Achermann', role: 'Chief Science Officer', img: 'team-basil', line: 'Doktor der Sportwissenschaft, Universität Zürich. Leitet das Prometheus Lab.' },
  { name: 'Thomas Bachmann', role: 'Backend Security Engineer', img: 'team-thomas', line: 'Datensicherheit, Betrieb und Wartung der Plattform.' },
  { name: 'Christopher Linter', role: 'CFO', img: 'team-christopher', line: 'Betriebswirtschaft und Unternehmensführung, Universität St. Gallen (HSG).' },
  { name: 'Madeleine Linter', role: 'Strategie & Legal', img: 'team-madeleine', line: 'Rechtsanwältin, Ökonomin HSG. Ehemals McKinsey, Aufbau von drei KMU.' },
  { name: 'Chloé Borge', role: 'Marketing & Social Media', img: 'team-chloe', line: 'Marke, Inhalte und Community, auf Englisch und Französisch.' },
  { name: 'Severin Blindenbacher', role: 'Ambassador', img: 'team-severin', line: 'Ehemaliger Verteidiger und Assistenzcaptain der ZSC Lions. Drei Olympische Spiele für die Schweiz.' },
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

function Hero() {
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
            <span className="eyebrow eyebrow-photo">Business Case · Oktober 2026</span>
            <span className="block display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.6rem]">
              Das Betriebssystem für Fitnessbetriebe.{' '}
              <span className="text-white/50 font-medium">Eine Plattform für Studio, Trainer und Mitglied.</span>
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl">
            Prometheus ersetzt die fragmentierte Softwarelandschaft eines Fitnessbetriebs durch ein einziges
            System, von der Mitgliedschaft über Zahlungsverkehr, Zutritt und Personal bis zur Buchhaltung und
            zum Training auf der Fläche. Entwickelt und betrieben in der Schweiz.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="#summary" className="btn btn-primary btn-lg">Executive Summary <ArrowRight size={18} /></a>
            <a href="#rechner" className="btn btn-ghost-light btn-lg">Szenariorechner</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Summary() {
  return (
    <Section id="summary" tone="raised">
      <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
        <Reveal>
          <span className="eyebrow">Executive Summary</span>
          <h2 className="display text-4xl sm:text-5xl text-ink mt-5">
            Die Plattform ist gebaut.{' '}
            <span className="display-soft">Jetzt beginnt die Kommerzialisierung.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.06} className="card rounded-3xl overflow-hidden">
          {SUMMARY.map(([k, v], i) => (
            <div key={k} className={`grid sm:grid-cols-[10rem_1fr] gap-1 sm:gap-6 p-6 sm:px-8 ${i ? 'border-t border-line' : ''}`}>
              <p className="font-semibold text-accent-dark">{k}</p>
              <p className="text-ink leading-relaxed">{v}</p>
            </div>
          ))}
        </Reveal>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        {KPIS.map(([n, l, s], i) => (
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
            <p className="eyebrow eyebrow-photo">Ausgangslage</p>
            <p className="display text-3xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl mt-6">
              Mitgliederverwaltung, Kasse, Zutritt, Personalplanung, Inkasso, Buchhaltung.{' '}
              <span className="text-white/55 font-medium">Fünf bis sieben Systeme pro Betrieb, keines mit dem anderen verbunden. Die Integration leistet der Betreiber, von Hand.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Model() {
  return (
    <Section id="modell">
      <SectionHeader
        eyebrow="Lösung und Produktportfolio"
        title="Vier Produkte, ein Datenmodell."
        accent="Jedes eigenständig verkäuflich, alle auf derselben Plattform."
        subline="Kunden wechseln zwischen den Produkten ohne Datenmigration. Wächst ein Kunde, wechselt er das Produkt innerhalb der Plattform, nicht den Anbieter."
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
          Ein Betrieb wird einzeln gewonnen.{' '}
          <span className="text-white/50 font-medium">Trainer und Mitglieder folgen auf die Plattform.</span>
        </p>
        <p className="text-white/70 leading-relaxed">
          Trainer planen in Coach Web, Mitglieder trainieren in der App, mit der sie auch eintreten. Jeder neue
          Betrieb erhöht damit die Zahl der Nutzer, die Premium-Funktionen direkt abonnieren können, ohne dass
          zusätzliche Marketingkosten entstehen.
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
          <SectionHeader align="left" eyebrow="Erlösmodell" title="Wiederkehrende Erlöse." accent="Unabhängig vom Umsatz des Kunden." />
          <Reveal delay={0.06}>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
              Prometheus erhebt weder einen Anteil an den Mitgliederbeiträgen noch Transaktionsgebühren. Der Betrieb
              zahlt einen festen Preis und behält die volle Kontrolle über seine Einnahmen. Im Vertrieb ist das
              eines der stärksten Argumente gegenüber Anbietern mit umsatzabhängigen Modellen.
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
  return (
    <Section>
      <SectionHeader
        eyebrow="Kostenstruktur und Margen"
        title="Hohe Bruttomargen,"
        accent="tiefe Fixkosten."
        subline="Bruttomarge = Umsatz abzüglich Zahlungs- bzw. Store-Gebühren, vor Personalkosten."
      />
      <Reveal className="card rounded-3xl overflow-hidden mt-12 max-w-5xl mx-auto">
        {ECONOMICS.map(([k, sub, m, t], i) => (
          <div key={k} className={`grid sm:grid-cols-[1.1fr_0.5fr_1.6fr] gap-2 sm:gap-6 p-6 sm:px-8 ${i ? 'border-t border-line' : ''}`}>
            <div>
              <p className="font-semibold text-ink">{k}</p>
              <p className="text-sm text-muted">{sub}</p>
            </div>
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

/* Every default is an assumption and labelled as one. App net per paying
   member: ~USD 67 after store share (investor dossier), ≈ CHF 55. */
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
        eyebrow="Szenariorechner"
        title="Wiederkehrender Jahresumsatz."
        accent="Nach eigenen Annahmen."
        subline="Software-Lizenzen nach Preisstufe, zuzüglich Mitglieder-Abonnements mit rund CHF 55 Nettoerlös pro zahlendem Mitglied und Jahr nach Store-Anteil. Eine Schweizer Anlage zählt im Durchschnitt rund 1’000 Mitglieder."
      />
      <Reveal className="card rounded-3xl overflow-hidden mt-12 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 sm:p-8 space-y-7">
            <Slider label="Standorte" value={sites} set={setSites} min={1} max={250} step={1} fmt={(v) => v} />
            <div>
              <p className="text-[0.95rem] text-ink">Durchschnittliche Preisstufe</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {TIERS.map((t, i) => (
                  <button key={t.name} type="button" onClick={() => setTier(i)} className={`h-9 px-3 rounded-full text-sm border transition ${i === tier ? 'bg-accent border-accent text-white' : 'border-line text-ink hover:border-accent'}`}>
                    {t.name} · CHF {t.price}
                  </button>
                ))}
              </div>
            </div>
            <Slider label="Mitglieder pro Standort" value={members} set={setMembers} min={100} max={3000} step={50} fmt={(v) => v.toLocaleString('de-CH')} />
            <Slider label="Anteil Mitglieder mit Abonnement" value={rate} set={setRate} min={0} max={10} step={0.5} fmt={(v) => `${v} %`} />
          </div>
          <div className="bg-night text-white p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <p className="text-sm text-white/60">Software-Lizenzen</p>
              <p className="display text-3xl mt-1">{chf(software)}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Mitglieder-Abonnements</p>
              <p className="display text-3xl mt-1">{chf(app)}</p>
            </div>
            <div className="border-t border-white/15 pt-6">
              <p className="text-sm text-white/60">Wiederkehrender Umsatz pro Jahr</p>
              <p className="display text-5xl mt-1 text-accent-light">{chf(total)}</p>
              <p className="text-sm text-white/55 mt-2">entspricht {(sites / CH_SITES * 100).toFixed(1)} % der Schweizer Anlagen</p>
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
        eyebrow="Marktpotenzial"
        title="Schweiz als Kernmarkt,"
        accent="DACH als nächster Schritt, Self-Service international."
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
          <p className="font-semibold text-ink">Szenario Schweiz: nur Software-Lizenzen, Preisstufe Studio (CHF {perSite.toLocaleString('de-CH')} pro Standort und Jahr)</p>
          <p className="text-sm text-muted mt-1">Ohne Mitglieder-Abonnements, ohne Coach, ohne Ausland. Marktanteil bezogen auf 1’441 Anlagen.</p>
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
        Im DACH-Raum entsprechen 5 % Marktanteil 625 Standorten und rund EUR 1,9 Mio. wiederkehrendem Software-Umsatz pro Jahr.
        Quellen: DSSV/Deloitte, Eckdaten DACH 2026; Swiss Active, Eckdatenstudie Schweizer Fitnesswirtschaft 2025.
      </p>
    </Section>
  )
}

function WhyNow() {
  return (
    <Section tone="raised">
      <SectionHeader eyebrow="Marktzeitpunkt" title="Drei Faktoren" accent="öffnen den Markt jetzt." />
      <div className="grid md:grid-cols-3 gap-4 mt-14">
        {WHY_NOW.map(([t, x], i) => (
          <Reveal key={t} delay={i * 0.06} className="card rounded-2xl p-7">
            <span className="display text-4xl text-accent-dark">{i + 1}</span>
            <h3 className="mt-3 text-xl font-semibold text-ink">{t}</h3>
            <p className="mt-2 text-muted leading-relaxed">{x}</p>
          </Reveal>
        ))}
      </div>
      <p className="text-sm text-muted mt-6">Quellen: SIX / PostFinance, KMU-Portal des Bundes; Swiss Active 2025; DSSV, Mitteilung vom 16.04.2024.</p>
    </Section>
  )
}

function Position() {
  return (
    <Section>
      <SectionHeader eyebrow="Wettbewerbsposition" title="Was Prometheus unterscheidet." accent="Strukturell, nicht über den Preis." />
      <div className="grid sm:grid-cols-2 gap-4 mt-14 max-w-5xl mx-auto">
        {POSITION.map(({ icon: Icon, title, text }, i) => (
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

function Product() {
  return (
    <Section tone="raised">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <Reveal className="relative rounded-3xl aspect-[16/10] overflow-hidden bg-night">
          <img src="/images/gym/front-desk.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-night/60 via-night/30 to-night/75" />
          <div className="absolute inset-4 sm:inset-8 overflow-hidden rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            <img src="/images/enterprise/stage-light.webp" alt="Prometheus Kommandozentrale: Entscheidungen des Tages, Mitglieder, Check-ins, Termine und Aufgaben" loading="lazy" className="h-full w-full object-cover object-left-top" />
          </div>
        </Reveal>
        <div>
          <SectionHeader align="left" eyebrow="Produkt" title="Der gesamte Betrieb auf einem Bildschirm." accent="KI als Teil der Architektur." />
          <Reveal delay={0.08}>
            <ul className="mt-6 space-y-3 text-muted leading-relaxed max-w-xl">
              {[
                'Digitale Anmeldung mit Vertrag, Gesundheitsangaben und elektronischer Unterschrift',
                'Automatisierter Einzug, konfigurierbare Mahnstufen bis zur Zutrittssperre',
                'Zutritt per QR-Code oder Smartphone, integrierte Kasse',
                'Personalplanung mit Übergabe an die Lohnabrechnung, MWST-Abrechnung für die ESTV',
                'KI-Assistent mit Zugriff auf die Kennzahlen des Betriebs, Kündigungsprognose',
                'Geschwindigkeitsmessung per Smartphone-Kamera, Methodik aus dem Prometheus Lab',
              ].map((t) => (
                <li key={t} className="flex gap-2.5"><Check size={18} className="text-accent mt-1 shrink-0" /><span>{t}</span></li>
              ))}
            </ul>
            <a href="/schweiz/" target="_blank" rel="noopener" className="mt-7 inline-flex items-center gap-2 font-semibold text-accent-dark hover:gap-3 transition-all">
              Produktseite für Betreiber <ArrowRight size={18} />
            </a>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Status() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Stand Oktober 2026"
        title="Produkt im Betrieb,"
        accent="Kommerzialisierung am Anfang."
        subline="Die Plattform ist gebaut und bezahlt. Der Schwerpunkt liegt jetzt auf Referenzbetrieben, die den Vertrieb tragen."
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
    <Section width="narrow" tone="raised">
      <Reveal className="text-center">
        <p className="eyebrow mx-auto">Referenzbetrieb</p>
        <p className="display text-3xl sm:text-5xl mt-6">
          Xcellent Gym, Thal.{' '}
          <span className="display-soft">Self-Service von 5 bis 24 Uhr, seit dem Eröffnungstag auf Prometheus.</span>
        </p>
        <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
          Vollständige Datenübernahme aus dem Vorsystem und eine neue, an die Plattform angebundene Website:
          Onlinemitgliedschaft in fünf Schritten, Zahlung per Karte oder TWINT, Tarife live aus Prometheus.{' '}
          <a href="https://www.xcellentgym.ch/" target="_blank" rel="noopener" className="text-accent-dark underline underline-offset-4">xcellentgym.ch</a>
        </p>
      </Reveal>
    </Section>
  )
}

function GoToMarket() {
  return (
    <Section>
      <SectionHeader eyebrow="Go-to-Market" title="Vier Kanäle," accent="von der Referenz zur Skalierung." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-14">
        {GTM.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 0.05} className="card rounded-2xl p-7">
            <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-accent/10 text-accent-dark"><Icon size={20} /></span>
            <h3 className="mt-4 text-lg font-semibold text-ink">{title}</h3>
            <p className="mt-2 text-muted leading-relaxed">{text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Steps() {
  return (
    <Section tone="raised">
      <SectionHeader
        eyebrow="Meilensteine"
        title="Ein Kriterium für jede Entscheidung:"
        accent="Führt sie zu zahlenden Betreibern?"
      />
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

function Partners() {
  return (
    <Section id="partner">
      <SectionHeader
        eyebrow="Strategische Partner"
        title="Was Prometheus in dieser Phase sucht."
        accent="Erfahrung, Zugang und Kapital."
        subline="Der grösste Hebel liegt jetzt nicht in der Entwicklung, sondern im Aufbau von Referenzen und Vertrieb. Dafür sucht Prometheus Partner, die Märkte im Sport aufgebaut haben."
      />
      <div className="grid sm:grid-cols-2 gap-4 mt-14 max-w-5xl mx-auto">
        {PARTNERS.map(({ icon: Icon, title, text }, i) => (
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
          <span className="eyebrow">Team</span>
          <h2 className="display text-4xl sm:text-5xl text-white mt-5">
            Sport, Wissenschaft und Unternehmensführung.{' '}
            <span className="display-soft">Entwickelt in Zürich.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-lg text-white/65 leading-relaxed">
            Spitzensportler, Trainer und Sportwissenschaftler, ergänzt durch Finanzen, Recht und Strategie aus der
            HSG. Die Plattform wird KI-nativ entwickelt; das hält die Organisation schlank und die Fixkosten tief.
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

function Closing() {
  return (
    <Section tone="night" width="narrow" className="text-center overflow-hidden isolate lg:py-40">
      <img src="/club/hero-end.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 -z-10" aria-hidden="true" style={{ background: 'linear-gradient(180deg, rgba(15,15,18,0.6) 0%, rgba(15,15,18,0.75) 55%, #0F0F12 100%)' }} />
      <Reveal className="relative">
        <span className="light-line mx-auto mb-8" aria-hidden="true" />
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white">Kontakt</h2>
        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
          Für ein vertiefendes Gespräch, weitere Unterlagen oder einen Einblick in die Plattform.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="mailto:management@prometheus.coach?subject=Prometheus%20Business%20Case" className="btn btn-primary btn-lg">
            <Mail size={18} /> management@prometheus.coach
          </a>
          <a href="tel:+41772481755" className="btn btn-ghost-light btn-lg"><Phone size={18} /> +41 77 248 17 55</a>
        </div>
        <p className="mt-8 text-sm text-white/45">Daniele Pauli · Gründer & CEO · Peakforce GmbH, Zollikon</p>
      </Reveal>
    </Section>
  )
}

export default function BusinessCasePage() {
  return (
    <>
      <Head>
        <html lang="de-CH" />
        <title>Business Case | Prometheus</title>
        <meta name="description" content="Prometheus Business Case: Produktportfolio, Erlösmodell, Margen, Marktpotenzial, Stand und Meilensteine." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:title" content="Prometheus · Business Case" />
        <meta property="og:description" content="Das Betriebssystem für Fitnessbetriebe. Erlösmodell, Marktpotenzial und Meilensteine." />
        <meta property="og:image" content="https://prometheus.coach/club/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <HomeNav overDark links={[]} login={GYM_APP} signup={SIGNUP_GYM} loginLabel="Login" signupLabel="30 Tage testen" />
      <main>
        <Hero />
        <Summary />
        <Pain />
        <Model />
        <Revenue />
        <Economics />
        <Calculator />
        <Market />
        <WhyNow />
        <Position />
        <Product />
        <Status />
        <Reference />
        <GoToMarket />
        <Steps />
        <Partners />
        <Team />
        <Closing />
      </main>
      <HomeFooter de />
    </>
  )
}
