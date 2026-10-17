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
   sports director would ask, one line of answer, and the real screen that
   answers it. Images live in public/images/teamsport/, captured from the
   Team-Demo of Coach Web (fictional squad "HC Seewald U20 Elit"). A missing
   image hides itself instead of showing a broken frame. */
function Chapter({ n, q, a, shots, phone, phoneCaption }) {
  return (
    <div className="grid gap-8 lg:gap-10">
      <div className="max-w-5xl">
        <p className="text-sm font-semibold text-accent-light tabular-nums">Kapitel {n}</p>
        <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white mt-3">{q}</h2>
        {a && <p className="mt-4 text-lg lg:text-xl text-white/65 leading-relaxed max-w-3xl">{a}</p>}
      </div>
      {/* Phone first: the clip as the coach films it, then what the system
          makes of it. Width follows the screen height, so the pair fits one
          beamer frame. */}
      <div className={`grid gap-5 items-start ${phone ? 'lg:grid-cols-[auto_1fr]' : ''}`}>
        {phone && (
          <div className="hidden lg:block w-[min(240px,30vh)]">
            <div className="phone-shell">
              <div className="phone-screen">
                <img src={phone} alt="" data-zoom className="cursor-zoom-in" onError={(e) => { e.currentTarget.closest('.phone-shell').parentElement.style.display = 'none' }} />
              </div>
            </div>
            {phoneCaption && <p className="mt-3 text-center text-xs text-white/60 leading-snug">{phoneCaption}</p>}
          </div>
        )}
        <div className={`grid gap-4 ${shots.length > 1 ? 'lg:grid-cols-2' : ''}`}>
          {shots.map((src) => (
            <div key={src} className="shot w-fit max-w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="shot-bar" aria-hidden="true"><i /><i /><i /></div>
              {/* Capped by height so a question and its screen fit one beamer frame. */}
              <img src={src} alt="" data-zoom className="block max-w-full max-h-[56vh] w-auto cursor-zoom-in" onError={(e) => { e.currentTarget.closest('.shot').style.display = 'none' }} />
            </div>
          ))}
        </div>
      </div>
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
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 lg:p-7 lg:w-[380px]">
      <p className="text-sm font-semibold text-white/60">Geschwindigkeit der Stange, m/s</p>
      <div className="mt-4 grid gap-1.5">
        {[...ZONES].reverse().map((z) => (
          <div
            key={z.name}
            className={`flex items-center justify-between gap-4 rounded-xl px-4 py-2.5 ${z.hot ? 'bg-accent text-white shadow-[0_0_30px_rgba(230,126,34,0.45)]' : 'bg-white/[0.06] text-white/75'}`}
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
          Jeden Morgen wissen, wer bereit ist. <span className="display-soft">Ohne dass Ihr Staff dafür eine Stunde in Excel verliert.</span>
        </h1>
        <p className="mt-8 text-lg lg:text-xl text-white/60 max-w-2xl">
          Eine Saison mit dem Athletiktrainer, vom ersten Tag bis zum Spieltag. Jeder Bildschirm ist echte Software.
        </p>
      </div>
    ),
  },
  {
    photo: PHOTO.strength,
    render: (club) => (
      <Title eyebrow="Ihre Welt" title="Eine Mannschaft," accent="ein, höchstens zwei Athletiktrainer.">
        {/* The presenter's own record (AboutPage: conditioning and strength
            coach of this club, 2008–2012) — only true for that club. */}
        {/ZSC/i.test(club) && (
          <p className="text-white/85">
            Ich kenne diese Rolle von innen: Von 2008 bis 2012 war ich Athletiktrainer der ZSC Lions.
          </p>
        )}
        <p>
          Die Daten liegen heute an fünf Orten: Excel, WhatsApp, Testresultate aus Magglingen,
          das Tracking-System, die Notizen des Physios. Am Spieltag fragt jemand: Wer ist bereit?
        </p>
        <p className="text-white/85">Hier ist der Weg, den der Coach mit Prometheus geht.</p>
      </Title>
    ),
  },
  {
    photo: PHOTO.floor,
    render: () => (
      <Chapter
        n="01"
        q="Wie kommen 25 Spieler ins System?"
        a="Einladungslink oder Code aufs Handy, der Spieler ist im Kader: Position, Jahrgang, Nummer, Status. Bei Junioren holt das System die Einwilligung der Eltern digital ein."
        shots={[`${T}roster.webp`]}
      />
    ),
  },
  {
    photo: PHOTO.dusk,
    render: () => (
      <Chapter
        n="02"
        q="Was weiss der Coach über jeden Einzelnen?"
        a="Die Anamnese kommt vor der ersten Einheit: Vorerkrankungen, frühere Verletzungen, Allergien, Notfallkontakt, unterschrieben. Auf einen Blick, wer sie noch nicht abgegeben hat."
        shots={[`${T}anamnesis.webp`]}
      />
    ),
  },
  {
    photo: PHOTO.strength,
    render: () => (
      <Chapter
        n="03"
        q="Wo steht jeder Spieler?"
        a="Der Testtag nach dem Magglingen-Standard, am selben Tag erfasst. Jeder Wert mit Rang im Team, Kraftmessplatte per Import."
        shots={[`${T}tests.webp`]}
      />
    ),
  },
  {
    photo: PHOTO.floor,
    render: () => (
      <Chapter
        n="04"
        q="Nach welchen Kriterien teilt er sie ein?"
        a="Nach Position, Jahrgang oder Testergebnis: Das System schlägt die Gruppen vor, der Coach verschiebt einzelne Spieler von Hand."
        shots={[`${T}groups.webp`]}
      />
    ),
  },
  {
    photo: PHOTO.strength,
    render: () => (
      <Chapter
        n="05"
        q="Wie baut er das Training auf?"
        a="Einmal planen, in Prozent vom Maximum. Die Kilos rechnet das System für jeden Spieler aus seinem eigenen Maximum aus, bis auf die Stange im Kraftraum."
        shots={[`${T}program.webp`]}
      />
    ),
  },
  {
    photo: PHOTO.hall,
    render: () => (
      <Chapter
        n="06"
        q="Wie sieht die Periodisierung aus?"
        a="Die Saison in Phasen, der Spielplan aus dem Liga-Kalender importiert, jeder Tag relativ zum nächsten Spiel markiert. Jeder Spieler bekommt seine Kopie des Plans."
        shots={[`${T}season-plan.webp`, `${T}season.webp`]}
      />
    ),
  },
  {
    photo: PHOTO.dusk,
    render: () => (
      <Chapter
        n="07"
        q="Wie begleitet er sie?"
        a="Der Spieler hat sein Training auf dem Handy und meldet vor jeder Einheit Schlaf, Energie und Stress. Fragen, Feedback und Videos laufen im Team-Chat und im Einzelgespräch."
        shots={[`${T}player.webp`, `${T}inbox.webp`]}
        phone={`${T}mobile-training.webp`}
      />
    ),
  },
  {
    photo: PHOTO.strength,
    render: () => (
      <Chapter
        n="08"
        q="Wie misst er, was unter der Stange passiert?"
        a="22 Spieler, kein Messgerät pro Spieler: Ein Handy auf dem Stativ, seitlich zur Stange, filmt den Satz. Das System erkennt die Hantelscheibe, zeichnet den Weg der Stange und misst die Geschwindigkeit jeder Wiederholung. Daraus: Geschwindigkeitsverlust im Satz, geschätztes Maximum, Verlauf über Wochen."
        shots={[`${T}vbt.webp`]}
        phone={`${T}mobile-vbt.webp`}
        phoneCaption="Snatch Pull, 150 kg, Wiederholung 2: 0,58 m/s. Gefilmt mit dem Handy."
      />
    ),
  },
  {
    photo: PHOTO.strength,
    render: () => (
      <div className="grid gap-8 lg:gap-10">
        <div className="max-w-5xl">
          <p className="text-sm font-semibold text-accent-light tabular-nums">Kapitel 08 · Lasttest</p>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl text-white mt-3">
            Ein Hockeyspieler braucht Schnellkraft. <span className="display-soft">Nicht noch mehr Maximalkraft.</span>
          </h2>
          <p className="mt-4 text-lg lg:text-xl text-white/65 leading-relaxed max-w-3xl">
            Die Kamera muss nicht in jeder Einheit stehen. Ein Lasttest alle paar Wochen genügt: dieselben Gewichte,
            gemessen in Metern pro Sekunde. Bewegt der Spieler dieselbe Last schneller, ist er explosiver geworden.
            Das sieht man an keiner Kilozahl.
          </p>
        </div>
        <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
          <VelocityZones />
          <div className="shot w-fit max-w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <div className="shot-bar" aria-hidden="true"><i /><i /><i /></div>
            <img src={`${T}vbt-lvp.webp`} alt="" data-zoom className="block max-w-full max-h-[40vh] w-auto cursor-zoom-in" />
          </div>
        </div>
      </div>
    ),
  },
  {
    photo: PHOTO.floor,
    render: () => (
      <Chapter
        n="09"
        q="Wie sieht er einen Leistungseinbruch kommen?"
        a="Belastung im Verhältnis zur Gewohnheit, Bereitschaft gegen Hantelgeschwindigkeit. Steigt die Kurve zu schnell, steht der Spieler im Board oben, bevor etwas passiert."
        shots={[`${T}loadlab.webp`]}
      />
    ),
  },
  {
    photo: PHOTO.dusk,
    render: () => (
      <Chapter
        n="10"
        q="Wie geht er mit Verletzungen um?"
        a="Verletzung erfasst, Status ausgefallen, dann Rückkehrstufen bis zur Freigabe. Physio und Athletiktrainer sehen denselben Stand, die Verfügbarkeit im Board stimmt von selbst."
        shots={[`${T}injury.webp`]}
      />
    ),
  },
  {
    photo: PHOTO.hall,
    render: () => (
      <Chapter
        n="11"
        q="Protokolliert er Mentales?"
        a="Ein kurzer Check pro Tag: Stimmung, Motivation, Selbstvertrauen, Fokus, Stress. Gemessen am eigenen Normalwert des Spielers, nicht an der Mannschaft. Gespräche hält der Staff als Notiz fest."
        shots={[`${T}mental-player.webp`, `${T}mental-team.webp`]}
      />
    ),
  },
  {
    photo: PHOTO.exterior,
    render: () => (
      <Chapter
        n="12"
        q="Und der Sportchef?"
        a="Ein Bild am Morgen: jeder Spieler, die kritischen zuerst. Bereitschaft, Belastung, Mentales, Verfügbarkeit."
        shots={[`${T}board-mental.webp`]}
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
          <div key={i} className="hero-rise min-h-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-20 flex flex-col justify-center">
            {s.render(club)}
          </div>
        </div>

        {zoom && (
          <div className="absolute inset-0 z-20 bg-black/90 flex items-center justify-center p-4 sm:p-8 cursor-zoom-out">
            <img src={zoom} alt="" className="max-w-full max-h-full rounded-xl shadow-2xl" />
          </div>
        )}

        {/* Progress, and controls for a mouse. */}
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-white/10">
          <div className="h-full bg-accent transition-all duration-500" style={{ width: `${((i + 1) / SLIDES.length) * 100}%` }} />
        </div>
        <div className="absolute right-5 bottom-5 flex items-center gap-2 text-white/50 text-sm">
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
