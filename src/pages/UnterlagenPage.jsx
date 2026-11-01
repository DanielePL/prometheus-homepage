import { useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import {
  ArrowRight, Building2, Dumbbell, Smartphone, Users, Check, Lock, Loader2, Mail, Phone, DoorClosed,
} from 'lucide-react'
import { Section, SectionHeader, Reveal } from '../components/site/Section'
import { HomeNav, HomeFooter } from '../components/home/HomeChrome'
import { GYM_APP, SIGNUP_GYM } from '../lib/links'
import { getSupabase } from '../lib/supabase'

/* /unterlagen/?c=<token> — confidential material behind a signed NDA (owner,
 * 2026-10-30: "können wir das strategie doc ähnlich wie den case gestalten").
 * Layout of /business-case/. Nothing confidential is in this bundle: the page
 * asks the edge function website-nda-sign (prometheus-admin, action
 * "material", content in materials.ts) and gets the material only when the
 * NDA behind the token is signed. Public parts (products, screens, team
 * photos) are the same as on /business-case/.
 *
 * noindex, robots.txt disallows it, linked only from the NDA page. */

const PRODUCTS = [
  { icon: Building2, name: 'Enterprise', who: 'Studios und Ketten', price: 'CHF 149 / 249 / 399', unit: 'pro Standort und Monat' },
  { icon: Dumbbell, name: 'Studio Light', who: 'Einzelstudios, CrossFit-Boxen', price: '79', unit: 'pro Monat oder 790 pro Jahr, CHF oder USD' },
  { icon: Users, name: 'Coach', who: 'Personal Trainer', price: 'USD 19–89', unit: 'pro Monat, nach Kundenzahl' },
  { icon: Smartphone, name: 'Mitglieder-App', who: 'iOS und Android', price: 'inbegriffen', unit: 'für Kunden eines Studios oder Trainers, sonst USD 59–99 pro Jahr' },
]

const SCREENS = [
  { src: '/images/enterprise/stage-light.webp', title: 'Für das Studio: die Kommandozentrale.', text: 'Was heute eine Entscheidung braucht, die Kennzahlen des Tages, Termine und wer gerade im Studio ist.', wide: true },
  { src: '/images/coach/app-dashboard.webp', title: 'Für Personal Trainer: Coach.', text: 'Kunden, Termine, Trainingspläne, Rechnungen und ein KI-Briefing am Morgen.', wide: true },
  { src: '/images/coach/app-mobile-training.webp', title: 'Für die Mitglieder: die App.', text: 'Die Trainingswoche, verpasste Einheiten nachholen, Workouts starten.' },
  { src: '/images/teamsport/vbt.webp', title: 'Messung per Handykamera.', text: 'Wie schnell sich die Hantel bewegt, ohne Zusatzgerät.' },
]

const PHOTOS = {
  'Daniele Pauli': 'team-daniele',
  'Thomas Bachmann': 'team-thomas',
  'Dr. Basil Achermann': 'team-basil',
  'Christopher Linter': 'team-christopher',
  'Madeleine Linter': 'team-madeleine',
  'Chloé Borge': 'team-chloe',
  'Severin Blindenbacher': 'team-severin',
}

function Gate({ state }) {
  return (
    <main className="min-h-[80svh] bg-tint pt-36 pb-20 px-5 sm:px-8">
      <div className="max-w-xl mx-auto rounded-lg border border-line bg-white p-8 sm:p-10 text-center">
        {state === 'loading' ? (
          <Loader2 className="mx-auto animate-spin text-muted" />
        ) : (
          <>
            <span className="inline-flex w-14 h-14 items-center justify-center rounded-md bg-accent/10 text-accent-dark"><Lock size={26} /></span>
            <h1 className="display text-3xl mt-6">Vertrauliche Unterlagen.</h1>
            <p className="mt-4 text-muted">
              Diese Seite öffnet sich nur über den persönlichen Link nach unterschriebener
              Geheimhaltungsvereinbarung. Fragen: management@prometheus.coach.
            </p>
          </>
        )}
      </div>
    </main>
  )
}

function Hero({ m, name }) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white min-h-[88svh] flex items-end">
      <img src="/images/gym/hall-opening.webp" alt="" aria-hidden="true" className="absolute inset-0 -z-20 w-full h-full object-cover" />
      <div className="photo-scrim-hero absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-gradient-to-b from-transparent to-graphite" aria-hidden="true" />
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-36 pb-20 lg:pb-28">
        <div className="max-w-[58rem] hero-rise">
          <h1>
            <span className="eyebrow eyebrow-photo">{m.eyebrow}</span>
            <span className="block display text-[2.6rem] leading-[1.03] sm:text-6xl lg:text-[4.6rem]">
              {m.headline}{' '}
              <span className="text-white/50 font-medium">{m.headlineSoft}</span>
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-white/75 leading-relaxed max-w-2xl">
            Für {name.replace(/^\[QA\]\s*/, '')}. {m.lead}
          </p>
          <p className="mt-6 inline-flex items-start gap-2 text-sm text-white/60 max-w-2xl">
            <Lock size={15} className="mt-0.5 shrink-0" /> {m.confidential}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a href="#auftrag" className="btn btn-primary btn-lg">Worum es geht <ArrowRight size={18} /></a>
            <a href="#fragen" className="btn btn-ghost-light btn-lg">Fragen an den Tag</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Mandate({ p }) {
  return (
    <Section id="auftrag" tone="raised">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
        <Reveal>
          <span className="eyebrow">Worum es geht</span>
          <h2 className="display text-4xl sm:text-5xl text-ink mt-5">
            {p.title} <span className="display-soft">{p.soft}</span>
          </h2>
          <p className="mt-6 text-lg text-muted leading-relaxed">{p.text}</p>
        </Reveal>
        <Reveal delay={0.06} className="card rounded-3xl p-7 sm:p-9">
          <p className="flex gap-3 text-lg font-semibold text-ink">
            <DoorClosed className="text-accent-dark shrink-0 mt-0.5" size={22} /> {p.ask}
          </p>
          <p className="mt-6 text-sm font-semibold text-accent-dark">Am Ende des Tages wissen wir:</p>
          <ol className="mt-4 space-y-4">
            {p.outcomes.map((o, i) => (
              <li key={o} className="flex gap-4">
                <span className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold bg-accent text-white">{i + 1}</span>
                <span className="text-ink leading-relaxed pt-1">{o}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}

function Company({ facts, ambition }) {
  return (
    <Section>
      <SectionHeader eyebrow="Peakforce in Kürze" title="Stand Oktober 2026." accent="Gebaut, im Betrieb, am Anfang des Vertriebs." />
      <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-4 mt-14">
        <Reveal className="card rounded-3xl overflow-hidden">
          {facts.map(([k, v], i) => (
            <div key={k} className={`grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6 p-6 sm:px-8 ${i ? 'border-t border-line' : ''}`}>
              <p className="font-semibold text-accent-dark">{k}</p>
              <p className="text-ink leading-relaxed">{v}</p>
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.06} className="rounded-3xl bg-night text-white p-8 flex flex-col justify-center">
          <p className="text-sm text-white/60">Unser Ziel</p>
          <p className="display text-5xl mt-2 text-accent-light">{ambition.number}</p>
          <p className="mt-2 font-semibold">{ambition.label}</p>
          <p className="mt-4 text-white/65 leading-relaxed">{ambition.text}</p>
        </Reveal>
      </div>
    </Section>
  )
}

function Products() {
  return (
    <Section tone="raised">
      <SectionHeader
        eyebrow="Was wir verkaufen"
        title="Vier Produkte, eine Datenbank."
        accent="Wer wächst, wechselt ohne Datenumzug."
        subline="Die Mitglieder kommen mit jedem gewonnenen Studio über die App mit. Dazu LED Pro: Lichtsteuerung per Tablet für Studios."
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-14">
        {PRODUCTS.map(({ icon: Icon, name, who, price, unit }, i) => (
          <Reveal key={name} delay={i * 0.05} className="card rounded-3xl p-7">
            <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-accent/10 text-accent-dark"><Icon size={22} /></span>
            <h3 className="mt-5 text-2xl font-semibold text-ink">{name}</h3>
            <p className="text-sm text-muted">{who}</p>
            <p className="display text-3xl mt-5 text-ink">{price}</p>
            <p className="text-sm text-muted">{unit}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Screens() {
  return (
    <Section>
      <SectionHeader eyebrow="So sieht es aus" title="Echte Screens," accent="keine Entwürfe." />
      <div className="grid md:grid-cols-2 gap-4 mt-14">
        {SCREENS.map((s, i) => (
          <Reveal key={s.src} delay={i * 0.05} className={`card rounded-3xl overflow-hidden ${s.wide ? 'md:col-span-2' : ''}`}>
            <img src={s.src} alt={s.title} loading="lazy" className={`w-full object-cover object-top bg-tint ${s.wide ? 'max-h-[34rem]' : 'h-80'}`} />
            <div className="p-6 sm:px-8">
              <p className="font-semibold text-ink">{s.title}</p>
              <p className="mt-1 text-muted">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Opportunities({ groups }) {
  const total = groups.reduce((n, g) => n + g.items.length, 0)
  return (
    <Section tone="raised" id="moeglichkeiten">
      <SectionHeader
        eyebrow="Alle Möglichkeiten auf dem Tisch"
        title={`${total} Türen sind offen.`}
        accent="Nichts davon ist schlecht. Zusammen ist es zu viel."
      />
      <div className="grid lg:grid-cols-2 gap-4 mt-14">
        {groups.map((g, gi) => (
          <Reveal key={g.group} delay={gi * 0.05} className="card rounded-3xl overflow-hidden">
            <p className="px-6 sm:px-8 pt-6 text-sm font-semibold text-accent-dark">{g.group}</p>
            {g.items.map((o, i) => (
              <div key={o.name} className={`px-6 sm:px-8 py-5 ${i ? 'border-t border-line' : ''}`}>
                <p className="font-semibold text-ink">{o.name}</p>
                <p className="mt-1 text-muted">{o.value}</p>
                <p className="mt-2 inline-block rounded-full bg-tint px-3 py-1 text-xs font-medium text-ink">{o.status}</p>
              </div>
            ))}
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Decided({ items }) {
  return (
    <Section>
      <SectionHeader
        eyebrow="Was wir schon entschieden haben"
        title="Damit du siehst, wo wir stehen,"
        accent="und es hinterfragen kannst."
      />
      <ol className="mt-14 max-w-4xl mx-auto space-y-4">
        {items.map(([t, x], i) => (
          <Reveal key={t} delay={i * 0.05} className="card rounded-2xl p-6 flex gap-5">
            <span className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${i === 0 ? 'bg-accent text-white' : 'bg-accent/10 text-accent-dark'}`}><Check size={18} /></span>
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

function Team({ team, note }) {
  return (
    <Section tone="night">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-x-12 gap-y-4 items-end">
        <Reveal>
          <span className="eyebrow">Wer was tun kann</span>
          <h2 className="display text-4xl sm:text-5xl text-white mt-5">
            Ein kleines Team. <span className="display-soft">Jede Stunde zählt.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.05}><p className="text-lg text-white/65 leading-relaxed">{note}</p></Reveal>
      </div>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 xl:gap-4">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.04} className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
            {PHOTOS[m.name] ? (
              <img src={`/images/teamsport/${PHOTOS[m.name]}.webp`} alt={m.name} width="480" height="600" loading="lazy" className="w-full aspect-[4/5] object-cover object-top" />
            ) : (
              <div className="w-full aspect-[4/5] flex items-center justify-center bg-white/[0.03] text-white/30"><Users size={40} /></div>
            )}
            <div className="p-3">
              <p className="font-semibold text-white leading-tight">{m.name}</p>
              <p className="mt-1 text-xs text-white/60 leading-snug">{m.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-5 text-xs text-white/30">Foto S. Blindenbacher: Pumpido75, CC BY-SA 4.0, Wikimedia Commons</p>
    </Section>
  )
}

function Questions({ questions, businessCase }) {
  return (
    <Section id="fragen" tone="raised">
      <SectionHeader eyebrow="Fragen an den Strategietag" title="Fünf Fragen," accent="eine Richtung." />
      <ol className="mt-14 max-w-4xl mx-auto space-y-4">
        {questions.map((q, i) => (
          <Reveal key={q} delay={i * 0.05} className="card rounded-2xl p-6 flex gap-5 items-start">
            <span className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-semibold bg-accent/10 text-accent-dark">{i + 1}</span>
            <span className="text-lg text-ink leading-relaxed pt-1">{q}</span>
          </Reveal>
        ))}
      </ol>
      <Reveal className="mt-10 max-w-4xl mx-auto rounded-3xl bg-night text-white p-7 sm:p-9 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
        <p className="text-white/75 leading-relaxed max-w-xl">{businessCase}</p>
        <a href="/business-case/" target="_blank" rel="noopener" className="btn btn-primary shrink-0">Business Case <ArrowRight size={18} /></a>
      </Reveal>
    </Section>
  )
}

function Closing({ organisation }) {
  return (
    <Section tone="night" width="narrow" className="text-center overflow-hidden isolate lg:py-36">
      <img src="/club/hero-end.webp" alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 -z-20 w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 -z-10" aria-hidden="true" style={{ background: 'linear-gradient(180deg, rgba(15,15,18,0.6) 0%, rgba(15,15,18,0.75) 55%, #0F0F12 100%)' }} />
      <Reveal className="relative">
        <span className="light-line mx-auto mb-8" aria-hidden="true" />
        <h2 className="display text-4xl sm:text-5xl text-white">Organisation</h2>
        <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl mx-auto">{organisation}</p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="mailto:management@prometheus.coach?subject=Strategietag" className="btn btn-primary btn-lg"><Mail size={18} /> management@prometheus.coach</a>
          <a href="tel:+41772481755" className="btn btn-ghost-light btn-lg"><Phone size={18} /> +41 77 248 17 55</a>
        </div>
        <p className="mt-8 text-sm text-white/45">Daniele Pauli · Gründer & CEO · Peakforce GmbH, Zollikon</p>
      </Reveal>
    </Section>
  )
}

export default function UnterlagenPage() {
  const [state, setState] = useState('loading')
  const [data, setData] = useState(null)

  useEffect(() => {
    const token = (new URLSearchParams(window.location.search).get('c') || '').trim().toLowerCase()
    if (!/^[0-9a-f]{64}$/.test(token)) { setState('locked'); return }
    getSupabase().functions.invoke('website-nda-sign', { body: { action: 'material', token } })
      .then(({ data: d, error }) => {
        if (error || !d?.material) throw error ?? new Error('locked')
        setData(d)
        setState('ready')
      })
      .catch(() => setState('locked'))
  }, [])

  const m = data?.material
  return (
    <>
      <Head>
        <html lang="de-CH" />
        <title>Unterlagen | Peakforce</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <HomeNav overDark={state === 'ready'} links={[]} login={GYM_APP} signup={SIGNUP_GYM} loginLabel="Login" signupLabel="30 Tage testen" />
      {state !== 'ready' ? <Gate state={state} /> : (
        <main>
          <Hero m={m} name={data.recipient_name} />
          <Mandate p={m.problem} />
          <Company facts={m.facts} ambition={m.ambition} />
          <Products />
          <Screens />
          <Opportunities groups={m.opportunities} />
          <Decided items={m.decided} />
          <Team team={m.team} note={m.teamNote} />
          <Questions questions={m.questions} businessCase={m.businessCase} />
          <Closing organisation={m.organisation} />
        </main>
      )}
      <HomeFooter de />
    </>
  )
}
