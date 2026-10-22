import TeamSportPage from '../components/site/TeamSportPage'

/* /fussball/ — the team product for professional football clubs (owner,
 * 2026-10-22: "das wird immer wieder ein Thema"). Layout and the rules for
 * the copy live in components/site/TeamSportPage.jsx; this file is only what
 * is football about it.
 *
 * Screens: the Team-Demo squad "FC Seewald U18", Coach Web in German,
 * 1418 × 840 at 2x (2026-10-22). Photos: Higgsfield scenes in public/fussball/,
 * the staff room and weight room are reused by /eishockey/. */
const FUSSBALL = {
  slug: 'fussball',
  head: {
    title: 'Athletik-Software für Profifussball | Prometheus',
    description: 'Tests, Kraftraum, Spieltag-Planung und Return-to-Play für den ganzen Kader in einem System. Software aus Zürich, Daten in Zürich.',
    ogDescription: 'Athletik-Software für den Profifussball. Ein System für den ganzen Staff, Daten in Zürich.',
  },
  hero: {
    eyebrow: 'Athletik-Software für den Profifussball',
    lead: 'Tests, Kraftraum, Spieltag-Planung, Verletzungen und Return-to-Play für den ganzen Kader, an einem Ort. Software aus Zürich, die Daten in Zürich.',
  },
  pain: 'Tests im Excel. Belastung in einer zweiten App. Verletzungen im Notizbuch des Physios. Nachrichten in fünf WhatsApp-Gruppen.',
  jobs: [
    {
      eyebrow: 'Ein Staff, eine Plattform',
      title: 'Cheftrainer, Athletik und Physio.',
      accent: 'Alle sehen dasselbe Bild.',
      photo: '/fussball/staff.webp',
      screen: '/fussball/screen-board.webp',
      alt: 'Team-Board: jeder Spieler mit Bereitschaft, Belastung und Verfügbarkeit, die kritischen zuerst',
      text: [
        'Am Morgen ein Bild für den ganzen Kader: Bereitschaft, Belastung und Verfügbarkeit jedes Spielers in einer Zeile, die kritischen zuerst. Statt Berichten aus drei Abteilungen.',
        'Die Spieler melden sich vor dem Training per App. Kein Abtippen, keine Rundfrage in der Kabine.',
      ],
    },
    {
      eyebrow: 'Spieltag',
      title: 'Die Woche richtet sich nach dem Spiel.',
      accent: 'Jeder Tag relativ zum nächsten Anpfiff.',
      photo: '/fussball/kabine.webp',
      screen: '/fussball/screen-season.webp',
      alt: 'Saisonplanung: Spiele und Einheiten in einem Kalender, jeder Tag relativ zum nächsten Spiel markiert',
      text: [
        'Der Spielplan wird importiert, nicht abgetippt. Jeder Tag ist relativ zum nächsten Spiel markiert, von MD-4 bis zur Regeneration danach.',
        'Die Saison in Phasen, ein Plan fürs Team. Jeder Spieler bekommt seine eigene Kopie, und Staff und Spieler sehen dieselbe Woche.',
      ],
    },
    {
      eyebrow: 'Daten, die Entscheidungen tragen',
      title: 'Einmal planen, in Prozent vom Maximum.',
      accent: 'Die Kilos rechnet das System.',
      photo: '/fussball/kraftraum.webp',
      screen: '/fussball/screen-plan.webp',
      alt: 'Wochenplan des Teams: Tage relativ zum Spiel, Gruppen nach Position, Zielbereich in Prozent vom Maximum und der Team-Assistent',
      text: [
        'Das Training gilt für die ganze Gruppe, die Kilos stimmen für jeden Spieler. Neues Maximum, neue Kilos, ohne Neuplanung.',
        'Velocity-Based Training ohne Messgerät pro Spieler: Ein Handy filmt den Satz, das System misst jede Wiederholung und zeigt, ob der Spieler gegen seinen eigenen Normalwert bereit ist.',
        'Der KI-Assistent kennt jeden Spieler und entwirft die Trainingswoche des Teams auf Zuruf. Entscheiden tut der Staff.',
      ],
    },
    {
      eyebrow: 'Return-to-Play',
      title: 'Vom Ausfall zurück auf den Platz.',
      accent: 'Physio und Athletik auf demselben Stand.',
      photo: '/fussball/return-to-play.webp',
      screen: '/fussball/screen-injury.webp',
      alt: 'Verletzung erfassen: Status von Ausfall über fünf Rückkehrstufen bis spielbereit',
      text: [
        'Verletzung erfasst, dann fünf Rückkehrstufen bis spielbereit. Physio und Athletiktrainer sehen denselben Stand, ohne Übergabe am Telefon.',
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
  swiss: 'Im Profifussball sind Gesundheits- und Leistungsdaten das Sensibelste, was ein Verein hat. Sie gehören in die Schweiz und dem Spieler.',
  closing: 'Schreiben Sie uns kurz, wie Ihr Staff heute arbeitet. Wir zeigen Ihnen Ihren Kader in Prometheus, mit Ihrem Spielplan und Ihren Tests.',
}

export default function FussballPage() {
  return <TeamSportPage sport={FUSSBALL} />
}
