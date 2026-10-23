import TeamSportPage from '../components/site/TeamSportPage'

/* /eishockey/ — the team product for professional ice hockey clubs (owner,
 * 2026-10-22: "dasselbe für den Eishockey"). Layout and the rules for the copy
 * live in components/site/TeamSportPage.jsx; this file is only what is
 * hockey about it. The hockey claims follow the hockey chapters of
 * /praesentation-team/ (speed-strength measured in m/s, games drive the week,
 * goalies separate, groin prevention weekly).
 *
 * Screens: the Team-Demo squad "HC Seewald U20 Elit" in German — board,
 * season, VBT and the injury dialog are the deck's own captures
 * (public/images/teamsport/); the team assistant's real answer (one week
 * drafted in 17 s) and the federation overview of the demo clubs were
 * captured for this page (2026-10-23, for the ZSC meeting: the coach wants
 * a clear, efficient landscape and an assistant that takes work off him). Photos: Higgsfield scenes in
 * public/eishockey/ (skates edited out of the gym scenes, the model puts
 * them on everyone); the staff room and the weight room for the app block
 * are /fussball/'s, they carry no sport. */
const T = '/images/teamsport'

const EISHOCKEY = {
  slug: 'eishockey',
  head: {
    title: 'Athletik-Software für Profi-Eishockey | Prometheus',
    description: 'Tests, Kraftraum, Schnellkraft, Spieltag-Planung und Return-to-Play für den ganzen Kader in einem System. Software aus Zürich, Daten in Zürich.',
    ogDescription: 'Athletik-Software für Profi-Eishockey. Ein System für den ganzen Staff, Daten in Zürich.',
  },
  hero: {
    eyebrow: 'Athletik-Software für Profi-Eishockey',
    lead: 'Tests, Kraftraum, Schnellkraft, Spieltag-Planung und Return-to-Play für den ganzen Kader, an einem Ort. Software aus Zürich, die Daten in Zürich.',
    position: 'object-[30%_center]',
  },
  pain: 'Tests im Excel. Eiszeiten in einem Kalender, der Kraftraum auf Papier. Verletzungen im Notizbuch des Physios. Nachrichten in fünf WhatsApp-Gruppen.',
  jobs: [
    {
      eyebrow: 'Ein Staff, eine Plattform',
      title: 'Headcoach, Athletik und Physio.',
      accent: 'Alle sehen dasselbe Bild.',
      photo: '/fussball/staff.webp',
      screen: `${T}/board.webp`,
      alt: 'Team-Board: jeder Spieler mit Bereitschaft, Belastung und Verfügbarkeit, die kritischen zuerst',
      text: [
        'Am Morgen ein Bild für den ganzen Kader: Bereitschaft, Belastung und Verfügbarkeit jedes Spielers in einer Zeile, die kritischen zuerst. Eis und Kraftraum in derselben Rechnung.',
        'Die Spieler melden sich vor dem Training per App. Kein Abtippen, keine Rundfrage in der Garderobe.',
      ],
    },
    {
      eyebrow: 'KI-Assistent',
      title: 'Der Assistent nimmt Ihnen die Planung ab.',
      accent: 'Entscheiden tut der Staff.',
      photo: '/fussball/staff.webp',
      screen: '/eishockey/screen-assistant.webp',
      alt: 'Team-Assistent im Wochenplan: nennt die müden Spieler, lässt Verletzte automatisch aus, fragt nach Reha-Einheiten und legt fünf Entwürfe aufs Board',
      text: [
        'Ein Satz genügt: „Plane diese Woche rund um die Spiele, Torhüter separat.“ In Sekunden liegt die Woche als Entwurf im Plan, für Stürmer, Verteidiger und Torhüter, in Prozent vom Maximum, die Kilos für jeden Spieler gerechnet.',
        'Der Assistent kennt den Kader, das Board, die Spiele und Ihre Bausteine. Verletzte lässt er von selbst aus, müde Spieler nennt er mit Namen, und er fragt nach, bevor er Reha-Einheiten anlegt.',
        'Er beantwortet auch die Fragen vom Morgen: Wer sollte heute nicht schwer heben, und warum? Wem fehlt noch ein Maximum? Nichts geht an die Spieler, bevor der Staff die Woche sendet.',
      ],
    },
    {
      eyebrow: 'Ein Club, alle Mannschaften',
      title: 'Der ganze Nachwuchs auf einer Seite.',
      accent: 'Jedes Team sieht nur sich selbst.',
      photo: '/eishockey/hero.webp',
      screen: '/eishockey/screen-club.webp',
      alt: 'Organisationsübersicht: alle Teams eines Verbands mit Spielern, Verfügbarkeit, Verletzungen, Belastung, mentalem Check-in und offenen Einwilligungen der Eltern',
      text: [
        'Von der U13 bis zur ersten Mannschaft: pro Team Spieler, Verfügbarkeit, offene Verletzungen, Belastung, mentaler Check-in, offene Einwilligungen der Eltern und das nächste Spiel. Summiert für den ganzen Club.',
        'Die Clubleitung sieht Kennzahlen, nie Namen, Diagnosen oder einzelne Check-ins. Ein Team öffnet sich nur für seinen eigenen Staff.',
        'Ein neuer Kader kommt aus jeder Datei ins System, ob Excel, PDF oder ein Foto der Teamliste, und die Anamnese-Links für alle Spieler ohne Anamnese entstehen auf einem Bildschirm. Wechselt ein Junior hoch, nimmt er seine Daten mit.',
      ],
    },
    {
      eyebrow: 'Spieltag',
      title: 'Die Spiele steuern die Woche.',
      accent: 'Jeder Tag relativ zum nächsten Bully.',
      photo: '/eishockey/hero.webp',
      screen: `${T}/season.webp`,
      alt: 'Spielplan: Spiele und Eistrainings in einem Kalender, jeder Tag relativ zum nächsten Spiel markiert',
      text: [
        'Der Spielplan wird importiert, nicht abgetippt. Jeder Tag ist relativ zum nächsten Spiel markiert: schwere Kraft weit weg vom Spiel, nichts am Tag davor, Regeneration danach.',
        'Auch wenn die Spiele dicht kommen: Die Saison in Phasen, ein Plan fürs Team, jeder Spieler bekommt seine eigene Kopie.',
      ],
    },
    {
      eyebrow: 'Schnellkraft',
      title: 'Ein Hockeyspieler braucht Schnellkraft.',
      accent: 'Gemessen in Metern pro Sekunde.',
      photo: '/eishockey/kraftraum.webp',
      screen: `${T}/vbt.webp`,
      alt: 'Velocity-Based Training: Stangenweg, Geschwindigkeit jeder Wiederholung, Geschwindigkeitsverlust und Bereitschaft gegen den eigenen Basiswert',
      text: [
        'Kein Messgerät pro Spieler, ein Handy reicht: Es filmt den Satz von der Seite, das System zeichnet den Weg der Stange und misst jede Wiederholung.',
        'Bewegt der Spieler dieselbe Last schneller, ist er explosiver geworden. Das Maximum wird geschätzt, ohne Maximalversuch, und die Bereitschaft am eigenen Basiswert gemessen.',
      ],
    },
    {
      eyebrow: 'Return-to-Play',
      title: 'Vom Ausfall zurück aufs Eis.',
      accent: 'Physio und Athletik auf demselben Stand.',
      photo: '/eishockey/return-to-play.webp',
      screen: `${T}/injury.webp`,
      alt: 'Verletzung erfassen: Status von Ausfall über fünf Rückkehrstufen, Off-Ice und Eis ohne Kontakt, bis spielbereit',
      text: [
        'Verletzung erfasst, dann fünf Rückkehrstufen: Reha, Off-Ice, Eis ohne Kontakt, volles Training, spielbereit. Physio und Athletiktrainer sehen denselben Stand, ohne Übergabe am Telefon.',
        'Der Status wird einmal gesetzt, die Verfügbarkeit im Board folgt von selbst.',
      ],
    },
  ],
  app: {
    photo: '/fussball/kraftraum.webp',
    text: [
      'Seine Woche, jede Übung mit Technik-Anleitung, seine Bestwerte und sein Verlauf. Der Staff schickt nichts per WhatsApp herum: Was im Plan freigegeben ist, steht beim Spieler.',
      'Vor dem Training meldet er Schlaf, Energie und Stress in derselben App. Daraus wird die Bereitschaft, die der Staff am Morgen im Board sieht. Ernährung mit Kalorien und Makros gehört dazu.',
    ],
  },
  swiss: 'Im Profi-Eishockey sind Gesundheits- und Leistungsdaten das Sensibelste, was ein Club hat. Sie gehören in die Schweiz und dem Spieler.',
  closing: 'Schreiben Sie uns kurz, wie Ihr Staff heute arbeitet. Wir zeigen Ihnen Ihren Kader in Prometheus, mit Ihrem Spielplan und Ihren Tests.',
}

export default function EishockeyPage() {
  return <TeamSportPage sport={EISHOCKEY} />
}
