import { useCallback, useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { ArrowRight, MapPin, UserCheck, Phone, ClipboardCheck, Maximize2, X } from 'lucide-react'
import { Section, SectionHeader, Reveal } from './Section'
import { HomeNav, HomeFooter } from '../home/HomeChrome'
import AskModal from './AskModal'
import { UI } from './teamSportUi'

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

/* The player's app, three whole iOS screens from the team deck (simulator,
   2026-10-17): his week, an exercise with its technique guide, and his stats
   with the check-in before training. Same frames as /schweiz/. Nothing on
   them belongs to one sport. */
const PHONES = [
  '/images/teamsport/ios-training.webp',
  '/images/teamsport/ios-exercise.webp',
  '/images/teamsport/ios-stats.webp',
]

/* Icons of the four Swiss cards, in the order of UI[lang].swiss. */
const SWISS_ICONS = [MapPin, UserCheck, ClipboardCheck, Phone]

function Hero({ hero, dir, ui, onAsk }) {
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
              {ui.h1}{' '}
              <span className="text-white/50 font-medium">{ui.h1Accent}</span>
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl">{hero.lead}</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={() => onAsk()} className="btn btn-primary btn-lg">
              {ui.ask} <ArrowRight size={18} />
            </button>
            <a href="#staff" className="btn btn-ghost-light btn-lg">{ui.look}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Pain({ pain, dir, ui }) {
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
              <span className="text-white/55 font-medium">{ui.painAccent}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* A real screen floating on a darkened scene, the way /schweiz/ shows its
   product screens. */
function ScreenOnPhoto({ photo, src, alt, ui, onZoom }) {
  return (
    <button type="button" onClick={() => onZoom({ src, alt })} aria-label={ui.zoomAria(alt)} className="group absolute inset-0 isolate cursor-zoom-in text-left">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-night" aria-hidden="true">
        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-night/60 via-night/30 to-night/75" />
      </div>
      <div className="absolute inset-4 sm:inset-8 overflow-hidden rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] bg-night">
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover object-left-top" />
      </div>
      <DemoLabel text={ui.demo} />
      <ZoomHint text={ui.zoom} />
    </button>
  )
}

/* The screens are real app windows at 1418 × 840, too small to read inside
   the frame on a laptop or a beamer (owner, 2026-10-23: "per Klick gross").
   A click opens the whole image; any click or Esc closes it. */
function ZoomHint({ text }) {
  return (
    <span className="absolute right-6 bottom-6 sm:right-10 sm:bottom-10 inline-flex items-center gap-1.5 rounded-full bg-night/80 px-3 py-1.5 text-xs font-medium text-white ring-1 ring-white/15 backdrop-blur opacity-80 transition-opacity group-hover:opacity-100" aria-hidden="true">
      <Maximize2 size={13} /> {text}
    </span>
  )
}

/* Every screen comes from a fictional demo club, and its numbers are demo
   numbers (owner, 2026-10-23: "keine Fantasiezahlen"). The label says so on
   the page and in the zoom, so no reader takes a demo figure for a club's. */
function DemoLabel({ text, className = 'absolute left-6 bottom-6 sm:left-10 sm:bottom-10' }) {
  return (
    <span className={`${className} inline-flex items-center rounded-full bg-night/80 px-3 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/15 backdrop-blur`}>
      {text}
    </span>
  )
}

function Zoom({ shot, ui, onClose }) {
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
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" aria-label={shot.alt} className="modal-scrim fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-8 cursor-zoom-out overflow-auto">
      <button type="button" onClick={onClose} aria-label={ui.close} className="fixed top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20">
        <X size={22} />
      </button>
      <img
        src={shot.src}
        alt={shot.alt}
        className={shot.tall ? 'max-h-[94svh] w-auto rounded-[2rem] ring-1 ring-white/15 shadow-2xl' : 'max-w-full max-h-[94svh] w-auto rounded-xl ring-1 ring-white/15 shadow-2xl'}
      />
      {!shot.tall && <DemoLabel text={ui.demo} className="fixed left-4 bottom-4" />}
    </div>
  )
}

function Phones({ photo, ui, onZoom }) {
  return (
    <div className="absolute inset-0 isolate flex items-center justify-center gap-3 sm:gap-5 px-4">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-3xl bg-night" aria-hidden="true">
        <img src={photo} alt="" loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/50 via-night/30 to-night/80" />
      </div>
      {PHONES.map((src, i) => { const alt = ui.phones[i]; return (
        <div
          key={src}
          className={`h-[88%] aspect-[900/1955] rounded-[16%/7.4%] bg-neutral-900 p-[2.2%] ring-1 ring-white/30 shadow-[0_24px_50px_-10px_rgba(0,0,0,0.85)] transition-transform duration-500 ease-out hover:z-20 hover:scale-[1.65] ${i === 1 ? 'z-10 scale-105' : ''}`}
        >
          <button type="button" onClick={() => onZoom({ src, alt, tall: true })} aria-label={ui.zoomAria(alt)} className="block h-full w-full cursor-zoom-in">
            <img src={src} alt={alt} loading="lazy" className="h-full w-full rounded-[14%/6.5%]" />
          </button>
        </div>
      ) })}
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

function Swiss({ lead, dir, ui }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <img src={`${dir}/alpen.webp`} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-night/70 via-night/50 to-night" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-36">
        <Reveal>
          <span className="eyebrow eyebrow-photo">{ui.swissEyebrow}</span>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl mt-6 max-w-4xl">
            {ui.swissTitle}{' '}
            <span className="text-white/55 font-medium">{ui.swissAccent}</span>
          </h2>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">{lead}</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-4 mt-14">
          {ui.swiss.map(([title, text], i) => { const Icon = SWISS_ICONS[i]; return (
            <Reveal key={title} delay={i * 0.05} className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur p-6 sm:p-7">
              <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-accent/15 text-accent-light">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-white/65 leading-relaxed">{text}</p>
            </Reveal>
          ) })}
        </div>
      </div>
    </section>
  )
}

function Closing({ text, dir, ui, onAsk }) {
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
          {club ? ui.closingClub(club) : ui.closingTitle}
        </h2>
        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl mx-auto">{text}</p>
        <div className="mt-9 flex justify-center">
          <button type="button" onClick={() => onAsk()} className="btn btn-primary btn-lg">
            {ui.send} <ArrowRight size={18} />
          </button>
        </div>
      </Reveal>
    </Section>
  )
}

/* `sport` is one page's data: slug (= URL), head, hero, pain, jobs, app,
   swiss, closing; optionally `lang` (de, fr, it, en; default de), `assets`
   (the folder in public/ that holds hero, kabine, alpen and og, when the URL
   differs from it) and `languages` (the same page in other languages, for the
   switch in the bar and hreflang). See pages/FussballPage.jsx for the shape. */
export default function TeamSportPage({ sport }) {
  const [ask, setAsk] = useState(null)
  const close = useCallback(() => setAsk(null), [])
  const onAsk = (topics = []) => setAsk(topics)
  const [zoom, setZoom] = useState(null)
  const closeZoom = useCallback(() => setZoom(null), [])
  const lang = sport.lang ?? 'de'
  const ui = UI[lang]
  const dir = `/${sport.assets ?? sport.slug}`
  const url = `https://prometheus.coach/${sport.slug}/`
  const og = sport.head.ogImage ?? `${url}og.jpg`
  const languages = sport.languages ?? []
  return (
    <>
      <Head>
        <html lang={ui.htmlLang} />
        <title>{sport.head.title}</title>
        <meta name="description" content={sport.head.description} />
        <link rel="canonical" href={url} />
        {languages.map((l) => (
          <link key={l.lang} rel="alternate" hrefLang={UI[l.lang].htmlLang} href={`https://prometheus.coach/${l.slug}/`} />
        ))}
        {languages.length > 0 && (
          <link rel="alternate" hrefLang="x-default" href={`https://prometheus.coach/${languages[0].slug}/`} />
        )}
        <meta property="og:site_name" content="Prometheus" />
        <meta property="og:locale" content={ui.ogLocale} />
        <meta property="og:title" content={ui.h1} />
        <meta property="og:description" content={sport.head.ogDescription} />
        <meta property="og:image" content={og} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <HomeNav
        overDark
        links={languages.filter((l) => l.lang !== lang).map((l) => ({ label: l.label, href: `/${l.slug}/` }))}
        loginLabel={ui.login}
        signup="#kontakt"
        signupLabel={ui.signup}
      />
      <main>
        <Hero hero={sport.hero} dir={dir} ui={ui} onAsk={onAsk} />
        <Pain pain={sport.pain} dir={dir} ui={ui} />
        {sport.jobs.map((j, i) => (
          <Job
            key={j.title}
            i={i}
            id={i === 0 ? 'staff' : undefined}
            {...j}
            media={<ScreenOnPhoto photo={j.photo} src={j.screen} alt={j.alt} ui={ui} onZoom={setZoom} />}
          />
        ))}
        <Job
          i={sport.jobs.length}
          pop
          eyebrow={ui.app.eyebrow}
          title={ui.app.title}
          accent={ui.app.accent}
          text={sport.app.text}
          media={<Phones photo={sport.app.photo} ui={ui} onZoom={setZoom} />}
        />
        <Swiss lead={sport.swiss} dir={dir} ui={ui} />
        <Closing text={sport.closing} dir={dir} ui={ui} onAsk={onAsk} />
      </main>
      <HomeFooter de={lang === 'de'} lang={lang} />
      {zoom && <Zoom shot={zoom} ui={ui} onClose={closeZoom} />}
      {ask && <AskModal topics={ui.topics} preset={ask} source={`prometheus.coach/${sport.slug}`} copy={ui.form} labels={ui.labels} onClose={close} />}
    </>
  )
}
