import { useCallback, useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { ArrowRight, MapPin, UserCheck, Phone, ClipboardCheck } from 'lucide-react'
import { Section, SectionHeader, Reveal } from './Section'
import { HomeNav, HomeFooter } from '../home/HomeChrome'
import AskModal from './AskModal'

/* The public page of the team product for one sport (/fussball/,
 * /eishockey/). Born as /fussball/ on 2026-10-22; when the owner asked for
 * the same page for ice hockey the same day, the layout moved here and each
 * sport became data (pages/FussballPage.jsx, pages/EishockeyPage.jsx).
 *
 * The long form for a meeting is /praesentation-team/; these pages are the
 * link a club opens on its own. Built on three sentences: one platform for
 * the whole staff, data that carries decisions (the staff decides, never the
 * software), Swiss data sovereignty.
 *
 * Copy rules, the same as the presentation: every claim is built
 * (prometheus_coach/webapp/docs/CONCEPT_hockey_team_sc.md §5b, sports via
 * the registry src/lib/sports.ts), no invented numbers, no "pilot", no RPE as
 * a selling point (owner, 2026-10-16), no Swiss-made label, no club names in
 * the code — ?fuer=<Club> personalises the closing in the browser only.
 * Sie-Form: the reader is a club's staff, not a studio owner.
 *
 * Photos are AI scenes (Higgsfield), neutral kits, no crests. They never
 * pretend to be product; the product proof is the real screens from the
 * Team-Demo squads of Coach Web. */

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

/* The player's app, three whole iOS screens from the team deck (simulator,
   2026-10-17): his week, an exercise with its technique guide, and his stats
   with the check-in before training. Same frames as /schweiz/. Nothing on
   them belongs to one sport. */
const PHONES = [
  ['/images/teamsport/ios-training.webp', 'Spieler-App: Trainingswoche, verpasste Einheiten nachholen, Schnellstart'],
  ['/images/teamsport/ios-exercise.webp', 'Spieler-App: Übung mit Video-Anleitung und Technik-Guide'],
  ['/images/teamsport/ios-stats.webp', 'Spieler-App: Statistik mit Readiness aus Energie, Schlaf, Ernährung und Stress'],
]

const SWISS = [
  { icon: MapPin, title: 'Daten in Zürich', text: 'Die Datenbank läuft in einem Rechenzentrum in Zürich. Gesundheits- und Leistungsdaten verlassen die Schweiz nicht.' },
  { icon: UserCheck, title: 'Die Daten gehören dem Spieler', text: 'Ein Kader verknüpft Spieler, er kopiert sie nicht. Wechselt ein Junior in die erste Mannschaft, nimmt er Tests, Belastung und Verletzungen mit.' },
  { icon: ClipboardCheck, title: 'Einwilligungen digital', text: 'Bei Junioren holt das System die Einwilligung der Eltern digital ein. Der Verein legt fest, wer im Staff was sieht.' },
  { icon: Phone, title: 'Ansprechpartner in Zürich', text: 'Gleiche Zeitzone, gleiche Sprache. Sie reden mit den Leuten, die das System bauen.' },
]

function Hero({ hero, dir, onAsk }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white min-h-[92svh] flex items-end">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <img src={`${dir}/hero.webp`} alt="" aria-hidden="true" className={`photo-zoom-slow w-full h-full object-cover ${hero.position ?? 'object-[35%_center]'}`} />
      </div>
      <div className="photo-scrim-hero absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-gradient-to-b from-transparent to-graphite" aria-hidden="true" />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-20 lg:pb-28">
        <div className="max-w-[56rem] hero-rise">
          <h1>
            <span className="eyebrow eyebrow-photo">{hero.eyebrow}</span>
            <span className="block display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.6rem]">
              Jeden Morgen wissen, wer bereit ist.{' '}
              <span className="text-white/50 font-medium">Ein System für den ganzen Staff.</span>
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl">{hero.lead}</p>
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

function Pain({ pain, dir }) {
  return (
    <section className="relative isolate overflow-hidden bg-graphite text-white">
      <div className="relative h-[70svh] min-h-[28rem] max-h-[52rem]">
        <img src={`${dir}/kabine.webp`} alt="" aria-hidden="true" loading="lazy" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite via-transparent to-graphite" aria-hidden="true" />
        <div className="absolute inset-0 bg-night/45" aria-hidden="true" />
        <Reveal className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full">
            <p className="display text-3xl sm:text-5xl lg:text-6xl leading-[1.08] max-w-4xl">
              {pain}{' '}
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

function Phones({ photo }) {
  return (
    <div className="absolute inset-0 isolate flex items-center justify-center gap-3 sm:gap-5 px-4">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-night" aria-hidden="true">
        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
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

/* One job of the staff beside its screen. Even jobs sit on the raised tone
   with the media left, odd ones on paper with the media right, so the page
   does not read as a list. `pop` lets the media grow past its frame on hover
   (the phones), as on /schweiz/. */
function Job({ i, id, eyebrow, title, accent, text, media, pop }) {
  const flip = i % 2 === 1
  return (
    <Section id={id} tone={flip ? 'default' : 'raised'}>
      <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <Reveal className={`relative rounded-3xl aspect-[16/10] ${pop ? 'z-10 hover:z-30' : 'overflow-hidden bg-night'}`}>
          {media}
        </Reveal>
        <div>
          <SectionHeader align="left" eyebrow={eyebrow} title={title} accent={accent} />
          <Reveal delay={0.08}>
            <div className="mt-6 space-y-4 text-lg text-muted leading-relaxed max-w-xl">
              {text.map((t) => <p key={t}>{t}</p>)}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function Swiss({ lead, dir }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <img src={`${dir}/alpen.webp`} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-night/50 to-night" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-36">
        <Reveal>
          <span className="eyebrow eyebrow-photo">Schweizer Datenhoheit</span>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl mt-6 max-w-4xl">
            Aus Zürich,{' '}
            <span className="text-white/55 font-medium">nicht aus Übersee.</span>
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">{lead}</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4 mt-14">
          {SWISS.map(({ icon: Icon, title, text }, i) => (
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

function Closing({ text, dir, onAsk }) {
  const [club, setClub] = useState('')
  /* Read in an effect, never during render: the prerendered HTML carries no
     club name, and hydration must match it. */
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get('fuer')
    if (c) setClub(c.replace(/[^\p{L}\p{N}\s.'&-]/gu, '').trim().slice(0, 60))
  }, [])
  return (
    <Section id="kontakt" tone="night" width="narrow" className="text-center overflow-hidden isolate lg:py-40">
      <img src={`${dir}/hero.webp`} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-50" />
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
        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl mx-auto">{text}</p>
        <div className="mt-9 flex justify-center">
          <button type="button" onClick={() => onAsk()} className="btn btn-primary btn-lg">
            Anfrage senden <ArrowRight size={18} />
          </button>
        </div>
      </Reveal>
    </Section>
  )
}

/* `sport` is one page's data: slug (= URL and the folder in public/ that
   holds hero, kabine, alpen and og), head, hero, pain, jobs, app, swiss,
   closing. See pages/FussballPage.jsx for the shape. */
export default function TeamSportPage({ sport }) {
  const [ask, setAsk] = useState(null)
  const close = useCallback(() => setAsk(null), [])
  const onAsk = (topics = []) => setAsk(topics)
  const dir = `/${sport.slug}`
  const url = `https://prometheus.coach/${sport.slug}/`
  return (
    <>
      <Head>
        <html lang="de-CH" />
        <title>{sport.head.title}</title>
        <meta name="description" content={sport.head.description} />
        <link rel="canonical" href={url} />
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content="de_CH" />
        <meta property="og:title" content="Jeden Morgen wissen, wer bereit ist." />
        <meta property="og:description" content={sport.head.ogDescription} />
        <meta property="og:image" content={`${url}og.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <HomeNav overDark links={[]} loginLabel="Login" signup="#kontakt" signupLabel="Anfrage" />
      <main>
        <Hero hero={sport.hero} dir={dir} onAsk={onAsk} />
        <Pain pain={sport.pain} dir={dir} />
        {sport.jobs.map((j, i) => (
          <Job
            key={j.title}
            i={i}
            id={i === 0 ? 'staff' : undefined}
            {...j}
            media={<ScreenOnPhoto photo={j.photo} src={j.screen} alt={j.alt} />}
          />
        ))}
        <Job
          i={sport.jobs.length}
          pop
          eyebrow="Spieler-App"
          title="Der Spieler hat sein Training auf dem Handy."
          accent="Von Athleten für Athleten."
          text={sport.app.text}
          media={<Phones photo={sport.app.photo} />}
        />
        <Swiss lead={sport.swiss} dir={dir} />
        <Closing text={sport.closing} dir={dir} onAsk={onAsk} />
      </main>
      <HomeFooter de />
      {ask && <AskModal topics={TOPICS} preset={ask} source={`prometheus.coach/${sport.slug}`} copy={COPY} onClose={close} />}
    </>
  )
}
