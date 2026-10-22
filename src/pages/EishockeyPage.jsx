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
 * (public/images/teamsport/), the week plan with the team assistant was
 * captured for this page (2026-10-22). Photos: Higgsfield scenes in
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
      eyebrow: 'Daten, die Entscheidungen tragen',
      title: 'Einmal planen, in Prozent vom Maximum.',
      accent: 'Die Kilos rechnet das System.',
      photo: '/eishockey/kabine.webp',
      screen: '/eishockey/screen-plan.webp',
      alt: 'Wochenplan des Teams: Tage relativ zum Spiel, Stürmer, Verteidiger und Torhüter als Gruppen, Leisten-Prävention aus der Bibliothek und der Team-Assistent',
      text: [
        'Stürmer, Verteidiger und Torhüter als eigene Gruppen, die Kilos stimmen für jeden Spieler. Neues Maximum, neue Kilos, ohne Neuplanung.',
        'Bausteine wie die Leisten- und Adduktoren-Prävention liegen in der Bibliothek und kommen per Ziehen in die Woche.',
        'Der KI-Assistent kennt jeden Spieler und entwirft die Trainingswoche des Teams auf Zuruf, die Torhüter separat. Entscheiden tut der Staff.',
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
