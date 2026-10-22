import { useCallback, useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { ArrowRight, MapPin, UserCheck, Phone, ClipboardCheck } from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import AskModal from '../components/site/AskModal'

/* /fussball/ — the team product for professional football clubs, German,
 * public (owner, 2026-10-22: "das wird immer wieder ein Thema"). The long
 * form for a meeting is /praesentation-team/; this page is the link a club
 * can open on its own.
 *
 * Built on the same three sentences the owner sent a national football club:
 * one platform for the whole staff, data that carries decisions (the staff
 * decides, never the software), Swiss data sovereignty.
 *
 * Copy rules, the same as the presentation: every claim is built
 * (prometheus_coach/webapp/docs/CONCEPT_hockey_team_sc.md §5b, football via
 * the sport registry since 2026-09-10), no invented numbers, no "pilot", no
 * RPE (owner, 2026-10-16), no Swiss-made label, no club names in the code —
 * ?fuer=<Club> personalises the closing in the browser only. Sie-Form: the
 * reader is a club's staff, not a studio owner.
 *
 * Photos are AI scenes (Higgsfield, 2026-10-22), neutral kits, no crests.
 * They never pretend to be product; the product proof is the real screens,
 * captured from the Team-Demo squad "FC Seewald U18" in Coach Web. */

const TOPICS = [
  { key: 'demo', label: 'Demo mit unserem Staff' },
  { key: 'youth', label: 'Nachwuchs und erste Mannschaft' },
  { key: 'data', label: 'Datenschutz und Einwilligungen' },
  { key: 'questions', label: 'Erst ein paar Fragen' },
]

const COPY = {
  title: 'Erzählen Sie uns von Ihrem Staff.',
  lead: 'Unverbindlich. Das Prometheus-Team meldet sich bei Ihnen.',
  org: 'Verein',
  message: 'Wie arbeitet Ihr Staff heute? Welche Mannschaften, welche Tools?',
  thanks: 'Ihre Anfrage ist bei uns. Das Prometheus-Team meldet sich bei Ihnen.',
  error: 'Das hat nicht geklappt. Schreiben Sie uns direkt an',
  subject: 'Prometheus für unseren Verein',
}

function Hero({ onAsk }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white min-h-[92svh] flex items-end">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img src="/fussball/hero.webp" alt="" aria-hidden="true" className="photo-zoom-slow w-full h-full object-cover object-[35%_center]" />
      </div>
      <div className="photo-scrim-hero absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-gradient-to-b from-transparent to-graphite" aria-hidden="true" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-20 lg:pb-28">
        <div className="max-w-[56rem] hero-rise">
          <h1>
            <span className="eyebrow eyebrow-photo">Athletik-Software für den Profifussball</span>
            <span className="block display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.6rem]">
              Jeden Morgen wissen, wer bereit ist.{' '}
              <span className="text-white/50 font-medium">Ein System für den ganzen Staff.</span>
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl">
            Tests, Kraftraum, Spieltag-Planung, Verletzungen und Return-to-Play für den ganzen
            Kader, an einem Ort. Software aus Zürich, die Daten in Zürich.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={() => onAsk()} className="btn btn-primary btn-lg">
              Unverbindlich anfragen <ArrowRight size={18} />
            </button>
            <a href="#staff" className="btn btn-ghost-light btn-lg">So sieht es aus</a>
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
        <img src="/fussball/kabine.webp" alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite via-transparent to-graphite" aria-hidden="true" />
        <div className="absolute inset-0 bg-night/45" aria-hidden="true" />
        <Reveal className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
            <p className="display text-3xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl">
              Tests im Excel. Belastung in einer zweiten App. Verletzungen im Notizbuch des Physios.
              Nachrichten in fünf WhatsApp-Gruppen.{' '}
              <span className="text-white/55 font-medium">Und jeden Morgen dieselbe Frage: Wer ist heute bereit?</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* A real screen floating on a darkened scene, the way /schweiz/ shows its
   product screens. */
function ScreenOnPhoto({ photo, src, alt }) {
  return (
    <div className="absolute inset-0 isolate">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-night" aria-hidden="true">
        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-night/60 via-night/30 to-night/75" />
      </div>
      <div className="absolute inset-4 sm:inset-8 overflow-hidden rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] bg-night">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-left-top" />
      </div>
    </div>
  )
}

/* One job of the staff beside its screen. `flip` alternates the side so the
   page does not read as a list. `pop` lets the media grow past its frame on
   hover (the phones), as on /schweiz/. */
function Job({ id, eyebrow, title, accent, children, media, flip, pop, tone = 'default' }) {
  return (
    <Section id={id} tone={tone}>
      <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <Reveal className={`relative rounded-3xl aspect-[16/10] ${pop ? 'z-10 hover:z-30' : 'overflow-hidden bg-night'}`}>
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

/* The player's app, three whole iOS screens from the team deck (simulator,
   2026-10-17): his week, an exercise with its technique guide, and his stats
   with the check-in before training. Same frames as /schweiz/. */
const PHONES = [
  ['/images/teamsport/ios-training.webp', 'Spieler-App: Trainingswoche, verpasste Einheiten nachholen, Schnellstart'],
  ['/images/teamsport/ios-exercise.webp', 'Spieler-App: Übung mit Video-Anleitung und Technik-Guide'],
  ['/images/teamsport/ios-stats.webp', 'Spieler-App: Statistik mit Readiness aus Energie, Schlaf, Ernährung und Stress'],
]

function Phones() {
  return (
    <div className="absolute inset-0 isolate flex items-center justify-center gap-3 sm:gap-5 px-4">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-night" aria-hidden="true">
        <img src="/fussball/kraftraum.webp" alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/30 to-night/80" />
      </div>
      {PHONES.map(([src, alt], i) => (
        <div
          key={src}
          className={`h-[88%] aspect-[900/1955] rounded-[16%/7.4%] bg-neutral-900 p-[2.2%] ring-1 ring-white/30 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out hover:z-20 hover:scale-[1.65] ${i === 1 ? 'z-10 scale-105' : ''}`}
        >
          <img src={src} alt={alt} loading="lazy" className="h-full w-full rounded-[14%/6.5%]" />
        </div>
      ))}
    </div>
  )
}

function Swiss() {
  const items = [
    { icon: MapPin, title: 'Daten in Zürich', text: 'Die Datenbank läuft in einem Rechenzentrum in Zürich. Gesundheits- und Leistungsdaten verlassen die Schweiz nicht.' },
    { icon: UserCheck, title: 'Die Daten gehören dem Spieler', text: 'Ein Kader verknüpft Spieler, er kopiert sie nicht. Wechselt ein Junior in die erste Mannschaft, nimmt er Tests, Belastung und Verletzungen mit.' },
    { icon: ClipboardCheck, title: 'Einwilligungen digital', text: 'Bei Junioren holt das System die Einwilligung der Eltern digital ein. Der Verein legt fest, wer im Staff was sieht.' },
    { icon: Phone, title: 'Ansprechpartner in Zürich', text: 'Gleiche Zeitzone, gleiche Sprache. Sie reden mit den Leuten, die das System bauen.' },
  ]
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <img src="/fussball/alpen.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-night/50 to-night" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-36">
        <Reveal>
          <span className="eyebrow eyebrow-photo">Schweizer Datenhoheit</span>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl mt-6 max-w-4xl">
            Aus Zürich,{' '}
            <span className="text-white/55 font-medium">nicht aus Übersee.</span>
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            Im Profifussball sind Gesundheits- und Leistungsdaten das Sensibelste, was ein Verein hat.
            Sie gehören in die Schweiz und dem Spieler.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4 mt-14">
          {items.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.05} className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur p-6 sm:p-7">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-accent/15 text-accent-light">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-white/65 leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Closing({ onAsk }) {
  const [club, setClub] = useState('')
  /* Read in an effect, never during render: the prerendered HTML carries no
     club name, and hydration must match it. */
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get('fuer')
    if (c) setClub(c.replace(/[^\p{L}\p{N}\s.'&-]/gu, '').trim().slice(0, 60))
  }, [])
  return (
    <Section id="kontakt" tone="night" width="narrow" className="text-center overflow-hidden isolate lg:py-40">
      <img src="/fussball/hero.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-50" />
      <div
        className="absolute inset-0 -z-10"
        aria-hidden="true"
        style={{ background: 'linear-gradient(180deg, rgba(15,15,18,0.6) 0%, rgba(15,15,18,0.75) 55%, #0F0F12 100%)' }}
      />
      <Reveal className="relative">
        <span className="light-line mx-auto mb-8" aria-hidden="true" />
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white">
          {club ? `Prometheus für ${club}.` : 'Reden wir.'}
        </h2>
        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
          Schreiben Sie uns kurz, wie Ihr Staff heute arbeitet. Wir zeigen Ihnen Ihren Kader in
          Prometheus, mit Ihrem Spielplan und Ihren Tests.
        </p>
        <div className="mt-9 flex justify-center">
          <button type="button" onClick={() => onAsk()} className="btn btn-primary btn-lg">
            Anfrage senden <ArrowRight size={18} />
          </button>
        </div>
      </Reveal>
    </Section>
  )
}

export default function FussballPage() {
  const [ask, setAsk] = useState(null)
  const close = useCallback(() => setAsk(null), [])
  const onAsk = (topics = []) => setAsk(topics)
  return (
    <>
      <Head>
        <html lang="de-CH" />
        <title>Athletik-Software für Profifussball | Prometheus</title>
        <meta name="description" content="Tests, Kraftraum, Spieltag-Planung und Return-to-Play für den ganzen Kader in einem System. Software aus Zürich, Daten in Zürich." />
        <link rel="canonical" href="https://prometheus.coach/fussball/" />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:title" content="Jeden Morgen wissen, wer bereit ist." />
        <meta property="og:description" content="Athletik-Software für den Profifussball. Ein System für den ganzen Staff, Daten in Zürich." />
        <meta property="og:image" content="https://prometheus.coach/fussball/og.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <HomeNav overDark links={[]} loginLabel="Login" signup="#kontakt" signupLabel="Anfrage" />
      <main>
        <Hero onAsk={onAsk} />
        <Pain />
        <Job
          id="staff"
          tone="raised"
          eyebrow="Ein Staff, eine Plattform"
          title="Cheftrainer, Athletik und Physio."
          accent="Alle sehen dasselbe Bild."
          media={<ScreenOnPhoto photo="/fussball/staff.webp" src="/fussball/screen-board.webp" alt="Team-Board: jeder Spieler mit Bereitschaft, Belastung und Verfügbarkeit, die kritischen zuerst" />}
        >
          <p>Am Morgen ein Bild für den ganzen Kader: Bereitschaft, Belastung und Verfügbarkeit jedes Spielers in einer Zeile, die kritischen zuerst. Statt Berichten aus drei Abteilungen.</p>
          <p>Die Spieler melden sich vor dem Training per App. Kein Abtippen, keine Rundfrage in der Kabine.</p>
        </Job>
        <Job
          flip
          eyebrow="Spieltag"
          title="Die Woche richtet sich nach dem Spiel."
          accent="Jeder Tag relativ zum nächsten Anpfiff."
          media={<ScreenOnPhoto photo="/fussball/kabine.webp" src="/fussball/screen-season.webp" alt="Saisonplanung: Spiele und Einheiten in einem Kalender, jeder Tag relativ zum nächsten Spiel markiert" />}
        >
          <p>Der Spielplan wird importiert, nicht abgetippt. Jeder Tag ist relativ zum nächsten Spiel markiert, von MD-4 bis zur Regeneration danach.</p>
          <p>Die Saison in Phasen, ein Plan fürs Team. Jeder Spieler bekommt seine eigene Kopie, und Staff und Spieler sehen dieselbe Woche.</p>
        </Job>
        <Job
          tone="raised"
          eyebrow="Daten, die Entscheidungen tragen"
          title="Einmal planen, in Prozent vom Maximum."
          accent="Die Kilos rechnet das System."
          media={<ScreenOnPhoto photo="/fussball/kraftraum.webp" src="/fussball/screen-plan.webp" alt="Wochenplan des Teams: Tage relativ zum Spiel, Gruppen nach Position, Zielbereich in Prozent vom Maximum und der Team-Assistent" />}
        >
          <p>Das Training gilt für die ganze Gruppe, die Kilos stimmen für jeden Spieler. Neues Maximum, neue Kilos, ohne Neuplanung.</p>
          <p>Velocity-Based Training ohne Messgerät pro Spieler: Ein Handy filmt den Satz, das System misst jede Wiederholung und zeigt, ob der Spieler gegen seinen eigenen Normalwert bereit ist.</p>
          <p>Der KI-Assistent kennt jeden Spieler und entwirft die Trainingswoche des Teams auf Zuruf. Entscheiden tut der Staff.</p>
        </Job>
        <Job
          flip
          eyebrow="Return-to-Play"
          title="Vom Ausfall zurück auf den Platz."
          accent="Physio und Athletik auf demselben Stand."
          media={<ScreenOnPhoto photo="/fussball/return-to-play.webp" src="/fussball/screen-injury.webp" alt="Verletzung erfassen: Status von Ausfall über fünf Rückkehrstufen bis spielbereit" />}
        >
          <p>Verletzung erfasst, dann fünf Rückkehrstufen bis spielbereit. Physio und Athletiktrainer sehen denselben Stand, ohne Übergabe am Telefon.</p>
          <p>Der Status wird einmal gesetzt, die Verfügbarkeit im Board folgt von selbst.</p>
        </Job>
        <Job
          tone="raised"
          pop
          eyebrow="Spieler-App"
          title="Der Spieler hat sein Training auf dem Handy."
          accent="Von Athleten für Athleten."
          media={<Phones />}
        >
          <p>Seine Woche, jede Übung mit Technik-Anleitung, seine Bestwerte und sein Verlauf. Der Staff schickt nichts per WhatsApp herum: Was im Plan freigegeben ist, steht beim Spieler.</p>
          <p>Vor dem Training meldet er Schlaf, Energie und Stress in derselben App. Daraus wird die Bereitschaft, die der Staff am Morgen im Board sieht. Ernährung mit Kalorien und Makros gehört dazu.</p>
        </Job>
        <Swiss />
        <Closing onAsk={onAsk} />
      </main>
      <HomeFooter de />
      {ask && <AskModal topics={TOPICS} preset={ask} source="prometheus.coach/fussball" copy={COPY} onClose={close} />}
    </>
  )
}
