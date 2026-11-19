import TeamSportPage from '../components/site/TeamSportPage'
import { HOCKEY_LANGUAGES } from '../components/site/teamSportUi'
import { hockeyMedia } from './EishockeyPage'

/* /hockey-sur-glace/ — /eishockey/ in French (2026-11-18), for clubs in
 * Romandie. Same claims as the German page, sentence by sentence; nothing
 * added, nothing promised that the German page does not say. Vous-form,
 * Swiss French typesetting: a narrow no-break space (NB) before : ? ! and
 * inside « ». Photos come from EishockeyPage; the screens are the French
 * app (public/eishockey/fr/, 2026-11-19): Team-Demo "HC Seewald U21-Elit",
 * 1418 × 840 at 2x, the assistant at 1600 × 948 with one real answer. For the
 * capture the fictional demo names were set in French (federation, club
 * sections, rink, exercise, phase text) and the calendar subscription block
 * was hidden, since it names a third-party calendar. */
const NB = ' '
const F = '/eishockey/fr'
const m = hockeyMedia.jobs.map((j, i) => ({
  ...j,
  screen: `${F}/${['board', 'assistant', 'club', 'season', 'vbt', 'injury'][i]}.webp`,
}))

const HOCKEY_FR = {
  slug: 'hockey-sur-glace',
  lang: 'fr',
  assets: 'eishockey',
  languages: HOCKEY_LANGUAGES,
  head: {
    title: 'Logiciel de préparation physique pour le hockey sur glace professionnel | Prometheus',
    description: 'Tests, salle de musculation, force explosive, planification autour des matchs et retour au jeu pour tout l’effectif, dans un seul système. Un logiciel de Zurich, des données à Zurich.',
    ogDescription: 'Logiciel de préparation physique pour le hockey sur glace professionnel. Un seul système pour tout le staff, des données à Zurich.',
    ogImage: 'https://prometheus.coach/eishockey/og-fr.jpg',
  },
  hero: {
    eyebrow: 'Logiciel de préparation physique pour le hockey professionnel',
    lead: 'Tests, salle de musculation, force explosive, planification autour des matchs et retour au jeu pour tout l’effectif, au même endroit. Un logiciel de Zurich, des données à Zurich.',
    position: 'object-[30%_center]',
  },
  pain: 'Les tests dans Excel. Les heures de glace dans un calendrier, la musculation sur papier. Les blessures dans le carnet du physio. Les messages dans cinq groupes WhatsApp.',
  jobs: [
    {
      ...m[0],
      eyebrow: 'Un staff, une plateforme',
      title: 'Entraîneur principal, préparation physique et physio.',
      accent: 'Tout le monde voit la même chose.',
      alt: `Tableau de l’équipe${NB}: chaque joueur avec son état de forme, sa charge et sa disponibilité, les cas critiques en premier`,
      text: [
        `Le matin, une seule vue de tout l’effectif${NB}: état de forme, charge et disponibilité de chaque joueur sur une ligne, les cas critiques en premier. La glace et la musculation dans le même calcul.`,
        'Les joueurs s’annoncent dans l’app avant l’entraînement. Rien à recopier, pas de tour de table dans le vestiaire.',
      ],
    },
    {
      ...m[1],
      eyebrow: 'Assistant IA',
      title: 'L’assistant se charge de la planification.',
      accent: 'C’est le staff qui décide.',
      alt: `Assistant d’équipe dans le plan de la semaine${NB}: il nomme les joueurs fatigués, écarte automatiquement les blessés, pose la question des séances de rééducation et dépose huit brouillons sur le tableau`,
      text: [
        `Une phrase suffit${NB}: «${NB}Planifie cette semaine autour des matchs, gardiens à part.${NB}» En quelques secondes, la semaine est en brouillon dans le plan, pour les attaquants, les défenseurs et les gardiens, en pourcentage du maximum, avec les charges calculées pour chaque joueur.`,
        'L’assistant connaît l’effectif, le tableau, les matchs et vos modules d’entraînement. Il écarte de lui-même les blessés, nomme les joueurs fatigués et demande avant de créer des séances de rééducation.',
        `Il répond aussi aux questions du matin${NB}: qui ne devrait pas soulever lourd aujourd’hui, et pourquoi${NB}? À qui manque-t-il encore un maximum${NB}? Rien ne part aux joueurs avant que le staff n’envoie la semaine.`,
      ],
    },
    {
      ...m[2],
      eyebrow: 'Un club, toutes les équipes',
      title: 'Toute la relève sur une seule page.',
      accent: 'Chaque équipe ne voit que ses propres données.',
      alt: `Vue d’ensemble du club${NB}: toutes les équipes avec joueurs, disponibilité, blessures, charge, check-in mental et consentements parentaux en attente`,
      text: [
        `Des U9 à la première équipe${NB}: par équipe, les joueurs, la disponibilité, les blessures en cours, la charge, le check-in mental, les consentements parentaux en attente et le prochain match. Le tout additionné pour l’ensemble du club.`,
        'La direction du club voit des indicateurs, jamais des noms, des diagnostics ou des check-ins individuels. Une équipe ne s’ouvre qu’à son propre staff.',
        'Un nouvel effectif entre dans le système depuis n’importe quel fichier, qu’il s’agisse d’Excel, d’un PDF ou d’une photo de la liste d’équipe, et les liens d’anamnèse pour tous les joueurs qui n’en ont pas encore se créent sur un seul écran. Quand un junior monte, il emporte ses données.',
      ],
    },
    {
      ...m[3],
      eyebrow: 'Jour de match',
      title: 'Les matchs dictent la semaine.',
      accent: 'Chaque jour par rapport à la prochaine mise au jeu.',
      alt: `Calendrier${NB}: matchs et entraînements sur glace dans un même calendrier, chaque jour marqué par rapport au prochain match`,
      text: [
        `Le calendrier des matchs est importé, pas recopié. Chaque jour est marqué par rapport au prochain match${NB}: la force lourde loin du match, rien la veille, la récupération après.`,
        `Même quand les matchs s’enchaînent${NB}: la saison en phases, un plan pour l’équipe, et chaque joueur reçoit sa propre copie.`,
      ],
    },
    {
      ...m[4],
      eyebrow: 'Force explosive',
      title: 'Un hockeyeur a besoin d’explosivité.',
      accent: 'Mesurée en mètres par seconde.',
      alt: `Entraînement basé sur la vitesse${NB}: trajectoire de la barre, vitesse de chaque répétition, perte de vitesse et état de forme par rapport à la valeur de référence du joueur`,
      text: [
        `Pas d’appareil de mesure par joueur, un téléphone suffit${NB}: il filme la série de côté, le système trace la trajectoire de la barre et mesure chaque répétition.`,
        'Si le joueur déplace la même charge plus vite, il est devenu plus explosif. Le maximum est estimé sans tentative maximale, et l’état de forme est mesuré par rapport à sa propre valeur de référence.',
      ],
    },
    {
      ...m[5],
      eyebrow: 'Retour au jeu',
      title: 'De la blessure au retour sur la glace.',
      accent: 'Physio et préparation physique au même niveau d’information.',
      alt: `Saisie d’une blessure${NB}: statut de l’absence en passant par cinq étapes de retour, hors glace et glace sans contact, jusqu’à apte à jouer`,
      text: [
        `La blessure est saisie, puis viennent cinq étapes de retour${NB}: rééducation, hors glace, glace sans contact, entraînement complet, apte à jouer. Le physio et le préparateur physique voient le même état, sans passation au téléphone.`,
        'Le statut est saisi une seule fois, la disponibilité dans le tableau suit d’elle-même.',
      ],
    },
  ],
  app: {
    photo: hockeyMedia.appPhoto,
    text: [
      `Sa semaine, chaque exercice avec ses consignes techniques, ses records et sa progression. Le staff n’envoie plus rien par WhatsApp${NB}: ce qui est validé dans le plan apparaît chez le joueur.`,
      'Avant l’entraînement, il indique son sommeil, son énergie et son stress dans la même app. Il en résulte l’état de forme que le staff voit le matin sur le tableau. La nutrition, avec calories et macronutriments, en fait partie.',
    ],
  },
  swiss: 'En hockey professionnel, les données de santé et de performance sont ce qu’un club a de plus sensible. Leur place est en Suisse, et elles appartiennent au joueur.',
  closing: 'Décrivez-nous en quelques mots comment votre staff travaille aujourd’hui. Nous vous montrons votre effectif dans Prometheus, avec votre calendrier et vos tests.',
}

export default function HockeySurGlacePage() {
  return <TeamSportPage sport={HOCKEY_FR} />
}
