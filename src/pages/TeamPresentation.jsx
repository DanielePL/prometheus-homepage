import { useCallback, useEffect, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { ArrowLeft, ArrowRight, Maximize } from 'lucide-react'

/* /praesentation-team/ — the team-sport presentation (owner, 2026-10-16).
 *
 * First shown to the sports director of a National League ice-hockey club.
 * A sports director does not plan sessions; he answers "who is ready on game
 * day, who is about to tip over, do my juniors become first-team players,
 * what does it cost my staff". So the deck follows one sentence — know every
 * morning who is ready. Since 2026-10-16 (owner) it walks the S&C coach's
 * season chapter by chapter — integrate, anamnesis, test, group, programme,
 * periodise, accompany, VBT, performance drop, injury, mental, the director's
 * board — each a question with the real screen as the answer. A chapter
 * without a screen means the screen gets built, not that the chapter goes.
 *
 * Not public: no link, not in the sitemap, noindex, Disallow in robots.txt.
 * The club's name is not in the code either (no customer names without
 * written consent): it comes from the URL, ?fuer=…, and is rendered in the
 * browser only, so the prerendered HTML carries none.
 *
 * Content rules: no invented numbers, no "pilot" (owner, 2026-10-16), never
 * name what is missing and no RPE (owner, 2026-10-16: not shown), no
 * swiss-made-software label until it is granted (needs a Swiss seat in the
 * commercial register and approval). Everything claimed here is built:
 * prometheus_coach/webapp/docs/CONCEPT_hockey_team_sc.md §5b (slices S0–S6,
 * C1 consent, T1 floor). Data in Zurich since 2026-10-15 (WORKFLOW.md).
 *
 * Keys: → / space / PageDown (presentation clickers send these) forward,
 * ← / PageUp back, F fullscreen, Home/End. Click the right half to go on.
 */

const PHOTO = {
  strength: '/images/gym/strength-dusk.webp',
  floor: '/images/gym/coaching-floor.webp',
  hall: '/images/gym/hall-opening.webp',
  dusk: '/images/gym/reception-dusk.webp',
  exterior: '/images/gym/exterior-entrance.webp',
}

function Title({ eyebrow, title, accent, children, className = '' }) {
  return (
    <div className={className}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white mt-6 max-w-4xl">
        {title}{accent && <> <span className="display-soft">{accent}</span></>}
      </h2>
      {children && <div className="mt-6 text-lg lg:text-xl text-white/65 leading-relaxed max-w-3xl space-y-4">{children}</div>}
    </div>
  )
}

function Card({ k, title, children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:p-7">
      {k && <p className="text-sm font-semibold text-accent-light">{k}</p>}
      <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-white/60 leading-relaxed">{children}</p>
    </div>
  )
}

/* A chapter of the coach's journey (owner, 2026-10-16): the question a
   sports director would ask, one or two sentences of answer, and the real
   screen that answers it. Since 2026-10-17 (owner) every chapter slide is the
   same: text left, exactly one screen right, every screen the same format and
   scale (full app window, 1418 x 840, never cropped). Images live in
   public/images/teamsport/, captured from the Team-Demo of Coach Web
   (fictional squad "HC Seewald U20 Elit"). */
function ChapterText({ n, q, a, children }) {
  return (
    <div>
      <p className="text-sm font-semibold text-accent-light tabular-nums">Kapitel {n}</p>
      <h2 className="display text-4xl xl:text-5xl text-white mt-3">{q}</h2>
      {a && <p className="mt-5 text-lg text-white/65 leading-relaxed">{a}</p>}
      {children}
    </div>
  )
}

/* One frame for every screen: same ratio, width capped by the viewport
   height so the whole window always fits one beamer frame. */
function Screen({ src }) {
  return (
    <div className="shot w-full max-w-[calc((100vh-15rem)*1.688)] justify-self-end rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      <div className="shot-bar" aria-hidden="true"><i /><i /><i /></div>
      <img src={src} alt="" width="1418" height="840" data-zoom className="block w-full h-auto cursor-zoom-in" />
    </div>
  )
}

const SPLIT = 'grid lg:grid-cols-[minmax(0,25rem)_1fr] gap-10 xl:gap-16 items-center'

function Chapter({ n, q, a, shot }) {
  return (
    <div className={SPLIT}>
      <ChapterText n={n} q={q} a={a} />
      <Screen src={shot} />
    </div>
  )
}

/* Velocity zones after Mann (2016), the common VBT reference. The point of
   the slide: hockey lives in speed-strength, and only a velocity measure
   shows whether a player got faster under the same load. */
const ZONES = [
  { name: 'Maximalkraft', range: 'unter 0,5', w: 5 },
  { name: 'Kraft-Beschleunigung', range: '0,5–0,75', w: 2.5 },
  { name: 'Kraft-Schnelligkeit', range: '0,75–1,0', w: 2.5 },
  { name: 'Schnellkraft', range: '1,0–1,3', w: 3, hot: true },
  { name: 'Startkraft', range: 'über 1,3', w: 2.5 },
]

function VelocityZones() {
  return (
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-sm font-semibold text-white/60">Geschwindigkeit der Stange, m/s</p>
      <div className="mt-4 grid gap-1.5">
        {[...ZONES].reverse().map((z) => (
          <div
            key={z.name}
            className={`flex items-center justify-between gap-4 rounded-xl px-4 py-2 ${z.hot ? 'bg-accent text-white shadow-[0_0_30px_rgba(230,126,34,0.45)]' : 'bg-white/[0.06] text-white/75'}`}
          >
            <span className="font-semibold">{z.name}{z.hot && <span className="block text-xs font-medium text-white/85">Antritt, Schuss, Check</span>}</span>
            <span className="text-sm tabular-nums whitespace-nowrap">{z.range}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/40">Zonen nach Mann (2016)</p>
    </div>
  )
}

/* Who builds it (owner, 2026-10-17): at the end, not the start, with the
   founder's record and the whole Peakforce team. Everyone named is still
   active: coaching and competing internationally. Facts from AboutPage and
   the team bios in GrowthPitch; the ambassador named on the owner's word. */
const TEAM = [
  { name: 'Dr. Basil Achermann', role: 'Chief Science Officer', img: 'team-basil', line: 'Doktor der Sportwissenschaft, Universität Zürich. Messmethodik für beschleunigungsbasiertes Training. Leitet das Prometheus Lab.' },
  { name: 'Thomas Bachmann', role: 'Backend Security Engineer', img: 'team-thomas', line: 'Prüft, wie die Daten geschützt und gespeichert werden. Wartung, Updates und Fehlerbehebung im Betrieb.' },
  { name: 'Chloé Borge', role: 'Social Media & Marketing', img: 'team-chloe', line: 'Marke, Inhalte und Community, auf Englisch und Französisch, bis in die Romandie.' },
  { name: 'Severin Blindenbacher', role: 'Ambassador', line: 'Eishockey.' },
]

function Avatar({ name, img, className = 'w-14 h-14' }) {
  if (img) return <img src={`${T}${img}.webp`} alt="" className={`${className} shrink-0 rounded-2xl object-cover`} />
  const t = name.replace('Dr. ', '').split(' ').map((w) => w[0]).join('').slice(0, 2)
  return <span className={`${className} shrink-0 rounded-2xl bg-white/10 text-white font-semibold flex items-center justify-center`}>{t}</span>
}

function Builders() {
  return (
    <div className="grid lg:grid-cols-[minmax(0,28rem)_1fr] gap-10 xl:gap-16 items-center">
      <div>
        <span className="eyebrow">Wer es baut</span>
        <h2 className="display text-4xl xl:text-5xl text-white mt-6">
          Gebaut in Zürich, <span className="display-soft">von Leuten, die selbst unter der Stange stehen.</span>
        </h2>
        <p className="mt-6 text-lg text-white/65 leading-relaxed">
          Coaches, Elite-Athleten und Sportwissenschaftler. Wir coachen bis heute und starten bis heute an
          internationalen Wettkämpfen. Jede Funktion beantwortet eine Frage aus dem Alltag eines
          Athletiktrainers: Wer ist heute bereit, wer kippt gerade, wer wird schneller?
        </p>
      </div>
      <div className="grid gap-4">
        <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-5 flex gap-5">
          <Avatar name="Daniele Pauli" img="team-daniele" className="w-28 h-36" />
          <div>
            <p className="text-xl font-semibold text-white">Daniele Pauli</p>
            <p className="text-sm text-accent-light">Gründer · Athletiktrainer seit 2007 · baut die Software</p>
            <ul className="mt-3 grid xl:grid-cols-2 gap-x-6 gap-y-1.5 text-[15px] text-white/70">
              <li>IPF-Weltmeister Classic Powerlifting 2018</li>
              <li>Europameister Masters Gewichtheben 2023 und 2024</li>
              <li>WM-Silber Masters Gewichtheben 2023</li>
              <li>CSCS-zertifiziert seit 2008, über 14’000 Trainings</li>
              <li>Erster 9-Achsen-VBT-Prototyp 2017</li>
              <li>Konditionstrainer von Ronnie Schildknecht, 11-facher Ironman-Sieger</li>
            </ul>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {TEAM.map((m) => (
            <div key={m.name} className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 flex gap-4">
              <Avatar name={m.name} img={m.img} className="w-16 h-20" />
              <div>
                <p className="font-semibold text-white">{m.name}</p>
                <p className="text-sm text-accent-light">{m.role}</p>
                <p className="mt-1 text-sm text-white/60 leading-relaxed">{m.line}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-white/45">PeakForce · Zürich</p>
      </div>
    </div>
  )
}

/* The thread (owner, 2026-10-17): the twelve chapters as a rail along the
   bottom, so the room always sees where in the coach's season we are. */
const CHAPTERS = [
  'Kader', 'Anamnese', 'Tests', 'Gruppen', 'Training', 'Periodisierung',
  'Begleitung', 'VBT', 'Leistung', 'Verletzung', 'Mentales', 'Sportchef',
]

function ChapterRail({ current, onJump }) {
  return (
    <nav aria-label="Kapitel" className="hidden lg:flex absolute left-1/2 -translate-x-1/2 bottom-5 items-center gap-1 rounded-full bg-black/55 border border-white/10 px-2 py-1.5 backdrop-blur">
      {CHAPTERS.map((label, k) => {
        const n = k + 1
        const done = current && n < current
        const on = n === current
        return (
          <button
            key={label}
            type="button"
            onClick={() => onJump(n)}
            className={`px-3 py-1.5 rounded-full text-[15px] xl:text-base font-medium tracking-tight whitespace-nowrap transition-colors ${
              on ? 'bg-accent text-white' : done ? 'text-white/85 hover:text-white' : 'text-white/55 hover:text-white'
            }`}
          >
            <span className="tabular-nums opacity-60 mr-1">{String(n).padStart(2, '0')}</span>{label}
          </button>
        )
      })}
    </nav>
  )
}

const T = '/images/teamsport/'

/* One entry per slide. `photo` sets the room behind it; `render` gets the
   club name (may be empty). */
const SLIDES = [
  {
    photo: PHOTO.hall,
    render: (club) => (
      <div>
        <span className="eyebrow">Prometheus Team{club ? ` · für ${club}` : ''}</span>
        <h1 className="display text-5xl sm:text-6xl lg:text-7xl text-white mt-8 max-w-5xl">
          Jeden Morgen wissen, wer bereit ist. <span className="display-soft">Software aus Zürich.</span>
        </h1>
        <p className="mt-8 text-lg lg:text-xl text-white/60 max-w-2xl">
          Eine Saison mit dem Athletiktrainer, vom ersten Testtag bis zum Spieltag. Jeder Bildschirm in dieser Präsentation ist echte Software.
        </p>
      </div>
    ),
  },
  {
    ch: 1,
    photo: PHOTO.floor,
    render: () => (
      <Chapter
        n="01"
        q="Wie kommen 25 Spieler ins System?"
        a="Einladungslink aufs Handy, der Spieler ist im Kader. Bei Junioren holt das System die Einwilligung der Eltern digital ein."
        shot={`${T}roster.webp`}
      />
    ),
  },
  {
    ch: 2,
    photo: PHOTO.dusk,
    render: () => (
      <Chapter
        n="02"
        q="Was weiss der Coach über jeden Einzelnen?"
        a="Die Anamnese vor der ersten Einheit: Verletzungen, Vorerkrankungen, Notfallkontakt, Einwilligungen."
        shot={`${T}anamnesis.webp`}
      />
    ),
  },
  {
    ch: 3,
    photo: PHOTO.strength,
    render: () => (
      <Chapter
        n="03"
        q="Wo steht jeder Spieler?"
        a="Der Testtag nach Magglingen-Standard, am selben Tag erfasst. Jeder Wert mit Rang im Team."
        shot={`${T}tests.webp`}
      />
    ),
  },
  {
    ch: 4,
    photo: PHOTO.floor,
    render: () => (
      <Chapter
        n="04"
        q="Nach welchen Kriterien teilt er sie ein?"
        a="Nach Position, Jahrgang oder Testergebnis. Das System schlägt die Gruppen vor, der Coach verschiebt von Hand."
        shot={`${T}groups.webp`}
      />
    ),
  },
  {
    ch: 5,
    photo: PHOTO.strength,
    render: () => (
      <Chapter
        n="05"
        q="Wie baut er das Training auf?"
        a="Einmal planen, in Prozent vom Maximum. Die Kilos rechnet das System für jeden Spieler aus."
        shot={`${T}program.webp`}
      />
    ),
  },
  {
    ch: 6,
    photo: PHOTO.hall,
    render: () => (
      <Chapter
        n="06"
        q="Wie sieht die Periodisierung aus?"
        a="Die Saison in Phasen, ein Plan fürs Team. Jeder Spieler bekommt seine eigene Kopie."
        shot={`${T}season-plan.webp`}
      />
    ),
  },
  {
    ch: 6,
    photo: PHOTO.hall,
    render: () => (
      <Chapter
        n="06"
        q="Und die Woche?"
        a="Der Spielplan steuert die Woche: jeder Tag relativ zum nächsten Spiel markiert."
        shot={`${T}season.webp`}
      />
    ),
  },
  {
    ch: 7,
    photo: PHOTO.dusk,
    render: () => (
      <Chapter
        n="07"
        q="Wie begleitet er sie?"
        a="Vor jeder Einheit meldet der Spieler Schlaf, Energie und Stress. Die Hantel sagt, ob es stimmt."
        shot={`${T}player.webp`}
      />
    ),
  },
  {
    ch: 7,
    photo: PHOTO.dusk,
    render: () => (
      <Chapter
        n="07"
        q="Wie redet er mit der Mannschaft?"
        a="Team-Chat und Einzelgespräch an einem Ort, mit Staff und Physio."
        shot={`${T}inbox.webp`}
      />
    ),
  },
  {
    ch: 8,
    photo: PHOTO.strength,
    render: () => (
      <div className={SPLIT}>
        <ChapterText
          n="08"
          q="Wie misst er, was unter der Stange passiert?"
          a="22 Spieler, kein Messgerät pro Spieler. Ein Handy filmt den Satz von der Seite, das System erkennt die Hantelscheibe, zeichnet den Weg der Stange und misst jede Wiederholung."
        >
          <p className="mt-6 text-sm text-white/45">Snatch Pull, 150 kg, Wiederholung 2: 0,58 m/s.</p>
        </ChapterText>
        {/* A real tracked lift from the owner's own account, people in the
            background cleared by the owner (2026-10-17). Portrait, as filmed. */}
        <img
          src={`${T}vbt-lift.webp`}
          alt=""
          width="720"
          height="1100"
          data-zoom
          className="justify-self-center h-[calc(100vh-10rem)] w-auto rounded-2xl border border-white/10 shadow-2xl cursor-zoom-in"
        />
      </div>
    ),
  },
  {
    ch: 8,
    photo: PHOTO.strength,
    render: () => (
      <Chapter
        n="08"
        q="Was macht das System aus dem Video?"
        a="Geschwindigkeit jeder Wiederholung, Geschwindigkeitsverlust im Satz, geschätztes Maximum, Bereitschaft gegen den eigenen Normalwert."
        shot={`${T}vbt.webp`}
      />
    ),
  },
  {
    ch: 8,
    photo: PHOTO.strength,
    render: () => (
      <div className={SPLIT}>
        <ChapterText
          n="08"
          q="Ein Hockeyspieler braucht Schnellkraft."
          a="Ein Lasttest alle paar Wochen genügt: dieselben Gewichte, gemessen in Metern pro Sekunde. Bewegt der Spieler dieselbe Last schneller, ist er explosiver geworden."
        >
          <VelocityZones />
        </ChapterText>
        <Screen src={`${T}vbt-lvp.webp`} />
      </div>
    ),
  },
  {
    ch: 9,
    photo: PHOTO.floor,
    render: () => (
      <Chapter
        n="09"
        q="Wie sieht er einen Leistungseinbruch kommen?"
        a="Belastung im Verhältnis zur Gewohnheit. Steigt die Kurve zu schnell, steht der Spieler im Board oben, bevor etwas passiert."
        shot={`${T}loadlab.webp`}
      />
    ),
  },
  {
    ch: 10,
    photo: PHOTO.dusk,
    render: () => (
      <Chapter
        n="10"
        q="Wie geht er mit Verletzungen um?"
        a="Verletzung erfasst, dann fünf Rückkehrstufen bis spielbereit. Physio und Athletiktrainer sehen denselben Stand, die Verfügbarkeit im Board folgt von selbst."
        shot={`${T}injury.webp`}
      />
    ),
  },
  {
    ch: 11,
    photo: PHOTO.hall,
    render: () => (
      <Chapter
        n="11"
        q="Protokolliert er Mentales?"
        a="Ein kurzer Check pro Tag, gemessen am eigenen Normalwert des Spielers. Gespräche hält der Staff als Notiz fest."
        shot={`${T}mental-player.webp`}
      />
    ),
  },
  {
    ch: 11,
    photo: PHOTO.hall,
    render: () => (
      <Chapter
        n="11"
        q="Und die ganze Mannschaft?"
        a="Vier Wochen Mentales auf einen Blick. Rot heisst: deutlich unter dem eigenen Normalwert."
        shot={`${T}mental-team.webp`}
      />
    ),
  },
  {
    ch: 12,
    photo: PHOTO.exterior,
    render: () => (
      <Chapter
        n="12"
        q="Und der Sportchef?"
        a="Ein Bild am Morgen: jeder Spieler, die kritischen zuerst. Bereitschaft, Belastung, Mentales, Verfügbarkeit."
        shot={`${T}board-mental.webp`}
      />
    ),
  },
  {
    photo: PHOTO.dusk,
    render: () => (
      <Title eyebrow="Der Spieler gehört sich" title="Die Daten wandern mit dem Spieler," accent="vom Nachwuchs in die erste Mannschaft.">
        <p>
          Ein Kader verknüpft Spieler, er kopiert sie nicht. Wechselt ein Junior in die erste
          Mannschaft oder ins Nationalteam, nimmt er seine Geschichte mit: Tests, Belastung,
          Verletzungen.
        </p>
      </Title>
    ),
  },
  {
    photo: PHOTO.exterior,
    render: () => (
      <div>
        <Title eyebrow="Schweiz" title="Aus Zürich," accent="nicht aus Übersee." />
        <div className="mt-10 grid lg:grid-cols-2 gap-4 max-w-6xl">
          <Card title="Daten in Zürich">
            Die Datenbank läuft in einem Rechenzentrum in Zürich.
          </Card>
          <Card title="Ansprechpartner in Zürich">
            Gleiche Zeitzone, gleiche Sprache. Wer anruft, redet mit jemandem, der die Kabine kennt.
          </Card>
          <Card title="Magglingen als Standard">
            Der Eintrittstest von Swiss Olympic ist als Vorlage hinterlegt. Vier Sprachen: Deutsch, Französisch, Italienisch, Englisch.
          </Card>
          <Card title="Messen ohne Zusatzgeräte">
            Geschwindigkeit mit der Handykamera statt einem Gerät pro Spieler.
          </Card>
        </div>
      </div>
    ),
  },
  {
    photo: PHOTO.strength,
    render: () => <Builders />,
  },
  {
    photo: PHOTO.hall,
    render: () => (
      <div>
        <Title eyebrow="Der Vorschlag" title="Eine Mannschaft, eine Saison." accent="Vier Zahlen, an denen wir uns messen lassen." />
        <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-5xl">
          <Card k="01" title="Mindestens 80 % der Spieler">
            melden ihre Bereitschaft vor dem Training.
          </Card>
          <Card k="02" title="Unter einer Stunde">
            für die Wochenplanung einer ganzen Mannschaft.
          </Card>
          <Card k="03" title="Verfügbare Spielertage">
            pro Monat, sichtbar statt geschätzt.
          </Card>
          <Card k="04" title="Der Testtag">
            am selben Tag vollständig erfasst.
          </Card>
        </div>
        <p className="mt-8 text-xl text-white/75">Danach entscheiden Sie.</p>
      </div>
    ),
  },
  {
    photo: PHOTO.exterior,
    render: () => (
      <div className="text-center mx-auto">
        <span className="light-line mx-auto mb-8" aria-hidden="true" />
        <h2 className="display text-5xl sm:text-6xl lg:text-7xl text-white">
          Jeden Morgen wissen, wer bereit ist.
        </h2>
        <p className="mt-8 text-lg text-white/60">Prometheus · management@prometheus.coach</p>
      </div>
    ),
  },
]

export default function TeamPresentation() {
  const [i, setI] = useState(0)
  /* Read in an effect, never during render: the prerendered HTML must carry
     no club name, and hydration must match it. */
  const [club, setClub] = useState('')
  /* A screen opened full size. Two screens side by side are too small for a
     beamer, so a click on one opens it; any key or click closes it. */
  const [zoom, setZoom] = useState(null)
  useEffect(() => {
    const p = new URLSearchParams(window.location.search)
    setClub((p.get('fuer') || '').slice(0, 60))
    const start = parseInt(window.location.hash.replace('#', ''), 10)
    if (start >= 1 && start <= SLIDES.length) setI(start - 1)
  }, [])

  const go = useCallback((n) => setI((cur) => Math.max(0, Math.min(SLIDES.length - 1, typeof n === 'function' ? n(cur) : n))), [])

  /* The slide number lives in the hash so a reload during the meeting comes
     back to the same slide. */
  useEffect(() => {
    if (typeof window !== 'undefined') history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${i + 1}`)
  }, [i])

  useEffect(() => {
    const onKey = (e) => {
      if (zoom) { e.preventDefault(); setZoom(null); return }
      if (['ArrowRight', ' ', 'PageDown', 'Enter'].includes(e.key)) { e.preventDefault(); go((c) => c + 1) }
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(e.key)) { e.preventDefault(); go((c) => c - 1) }
      else if (e.key === 'Home') go(0)
      else if (e.key === 'End') go(SLIDES.length - 1)
      else if (e.key === 'f' || e.key === 'F') {
        if (document.fullscreenElement) document.exitFullscreen?.()
        else document.documentElement.requestFullscreen?.()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, zoom])

  /* Swipe on a tablet. */
  useEffect(() => {
    let x0 = null
    const down = (e) => { x0 = e.touches[0].clientX }
    const up = (e) => {
      if (x0 === null) return
      const dx = e.changedTouches[0].clientX - x0
      if (Math.abs(dx) > 50) go((c) => c + (dx < 0 ? 1 : -1))
      x0 = null
    }
    window.addEventListener('touchstart', down, { passive: true })
    window.addEventListener('touchend', up, { passive: true })
    return () => { window.removeEventListener('touchstart', down); window.removeEventListener('touchend', up) }
  }, [go])

  const s = SLIDES[i]

  return (
    <>
      <Head>
        <html lang="de-CH" />
        <title>Prometheus Team</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main
        className="zone-dark fixed inset-0 overflow-hidden select-none"
        onClick={(e) => {
          if (e.target.closest('button, a')) return
          if (zoom) { setZoom(null); return }
          if (e.target.matches('img[data-zoom]')) { setZoom(e.target.currentSrc || e.target.src); return }
          go((c) => c + (e.clientX > window.innerWidth / 3 ? 1 : -1))
        }}
      >
        {/* Every room preloaded and cross-faded, so no slide waits on an image. */}
        {Object.values(PHOTO).map((src) => (
          <img
            key={src}
            src={src}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: s.photo === src ? 0.32 : 0 }}
          />
        ))}
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: 'linear-gradient(90deg, rgba(20,20,23,0.92) 0%, rgba(20,20,23,0.7) 55%, rgba(20,20,23,0.45) 100%)' }}
        />

        <div className="relative h-full overflow-y-auto">
          <div key={i} className="hero-rise min-h-full max-w-[1840px] mx-auto px-6 sm:px-12 lg:px-16 pt-14 pb-24 flex flex-col justify-center">
            {s.render(club)}
          </div>
        </div>

        {zoom && (
          <div className="absolute inset-0 z-20 bg-black/90 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out">
            <img src={zoom} alt="" className="max-w-full max-h-full rounded-xl shadow-2xl" />
          </div>
        )}

        <ChapterRail
          current={s.ch}
          onJump={(n) => go(SLIDES.findIndex((x) => x.ch === n))}
        />

        {/* Progress, and controls for a mouse. */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/10">
          <div className="h-full bg-accent transition-all duration-500" style={{ width: `${((i + 1) / SLIDES.length) * 100}%` }} />
        </div>
        <div className="absolute right-5 top-5 flex items-center gap-2 text-white/50 text-sm">
          <span className="tabular-nums mr-2">{i + 1} / {SLIDES.length}</span>
          <button type="button" aria-label="Zurück" onClick={() => go((c) => c - 1)} className="p-2 rounded-full hover:bg-white/10 hover:text-white"><ArrowLeft size={18} /></button>
          <button type="button" aria-label="Weiter" onClick={() => go((c) => c + 1)} className="p-2 rounded-full hover:bg-white/10 hover:text-white"><ArrowRight size={18} /></button>
          <button
            type="button"
            aria-label="Vollbild"
            onClick={() => (document.fullscreenElement ? document.exitFullscreen?.() : document.documentElement.requestFullscreen?.())}
            className="p-2 rounded-full hover:bg-white/10 hover:text-white"
          >
            <Maximize size={16} />
          </button>
        </div>
        <div className="absolute left-6 sm:left-12 lg:left-16 top-6 flex items-center gap-2 text-white/80">
          <img src="/images/flame.png" alt="" aria-hidden="true" width="500" height="500" className="h-6 w-6" />
          <span className="font-semibold tracking-tight">Prometheus</span>
        </div>
      </main>
    </>
  )
}
