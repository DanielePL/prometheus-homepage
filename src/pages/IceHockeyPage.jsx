import TeamSportPage from '../components/site/TeamSportPage'
import { HOCKEY_LANGUAGES } from '../components/site/teamSportUi'
import { hockeyMedia } from './EishockeyPage'

/* /ice-hockey/ — /eishockey/ in English (2026-11-18), for clubs and staff
 * who work in English. Same claims as the German page, sentence by sentence;
 * nothing added. British spelling (centre, metres, defencemen). Photos and screens come from
 * EishockeyPage (the screens show the German app). */
const m = hockeyMedia.jobs

const HOCKEY_EN = {
  slug: 'ice-hockey',
  lang: 'en',
  assets: 'eishockey',
  languages: HOCKEY_LANGUAGES,
  head: {
    title: 'Performance software for professional ice hockey | Prometheus',
    description: 'Testing, weight room, explosive strength, game-day planning and return to play for the whole roster in one system. Software from Zurich, data in Zurich.',
    ogDescription: 'Performance software for professional ice hockey. One system for the whole staff, data in Zurich.',
    ogImage: 'https://prometheus.coach/eishockey/og-en.jpg',
  },
  hero: {
    eyebrow: 'Performance software for professional ice hockey',
    lead: 'Testing, weight room, explosive strength, game-day planning and return to play for the whole roster, in one place. Software from Zurich, data in Zurich.',
    position: 'object-[30%_center]',
  },
  pain: 'Tests in Excel. Ice times in one calendar, the weight room on paper. Injuries in the physio’s notebook. Messages in five WhatsApp groups.',
  jobs: [
    {
      ...m[0],
      eyebrow: 'One staff, one platform',
      title: 'Head coach, strength and conditioning, physio.',
      accent: 'Everyone sees the same picture.',
      alt: 'Team board: every player with readiness, load and availability, critical cases first',
      text: [
        'Every morning, one view of the whole roster: readiness, load and availability of every player on one line, critical cases first. Ice and weight room in the same calculation.',
        'Players check in on the app before practice. No retyping, no asking around in the locker room.',
      ],
    },
    {
      ...m[1],
      eyebrow: 'AI assistant',
      title: 'The assistant takes the planning off your hands.',
      accent: 'The staff makes the decisions.',
      alt: 'Team assistant in the weekly plan: names the tired players, leaves injured players out automatically, asks about rehab sessions and puts five drafts on the board',
      text: [
        'One sentence is enough: “Plan this week around the games, goalies separately.” Within seconds the week sits in the plan as a draft, for forwards, defencemen and goalies, as a percentage of max, with the weights worked out for every player.',
        'The assistant knows the roster, the board, the games and your training blocks. It leaves injured players out on its own, names tired players, and asks before it adds rehab sessions.',
        'It also answers the morning questions: who should not lift heavy today, and why? Who is still missing a max? Nothing goes to the players until the staff sends the week.',
      ],
    },
    {
      ...m[2],
      eyebrow: 'One club, every team',
      title: 'The whole youth set-up on one page.',
      accent: 'Each team sees only its own data.',
      alt: 'Club overview: every team with players, availability, injuries, load, mental check-in and pending parental consents',
      text: [
        'From U9 to the first team: for each team, players, availability, open injuries, load, mental check-in, pending parental consents and the next game. Totalled for the whole club.',
        'Club management sees figures, never names, diagnoses or individual check-ins. A team opens only to its own staff.',
        'A new roster comes into the system from any file, whether Excel, PDF or a photo of the team sheet, and the medical history links for every player who has none yet are created on one screen. When a junior moves up, he takes his data with him.',
      ],
    },
    {
      ...m[3],
      eyebrow: 'Game day',
      title: 'The games drive the week.',
      accent: 'Every day relative to the next puck drop.',
      alt: 'Schedule: games and ice practices in one calendar, every day marked relative to the next game',
      text: [
        'The schedule is imported, not retyped. Every day is marked relative to the next game: heavy strength work far from the game, nothing the day before, recovery after.',
        'Even when the games come thick and fast: the season in phases, one plan for the team, and every player gets his own copy.',
      ],
    },
    {
      ...m[4],
      eyebrow: 'Explosive strength',
      title: 'A hockey player needs explosiveness.',
      accent: 'Measured in metres per second.',
      alt: 'Velocity-based training: bar path, velocity of every rep, velocity loss and readiness against the player’s own baseline',
      text: [
        'No sensor per player, a phone is enough: it films the set from the side, the system tracks the bar path and measures every rep.',
        'If a player moves the same load faster, he has become more explosive. His max is estimated without a max attempt, and his readiness is measured against his own baseline.',
      ],
    },
    {
      ...m[5],
      eyebrow: 'Return to play',
      title: 'From injury back onto the ice.',
      accent: 'Physio and strength coach on the same page.',
      alt: 'Logging an injury: status from out through five return stages, off-ice and non-contact ice, to cleared to play',
      text: [
        'The injury is logged, then come five return stages: rehab, off-ice, non-contact ice, full practice, cleared to play. Physio and strength coach see the same status, with no handover by phone.',
        'The status is set once, and availability on the board follows by itself.',
      ],
    },
  ],
  app: {
    photo: hockeyMedia.appPhoto,
    text: [
      'His week, every exercise with a technique guide, his personal bests and his progress. The staff no longer sends anything around on WhatsApp: whatever is released in the plan is on the player’s phone.',
      'Before practice he logs sleep, energy and stress in the same app. That becomes the readiness the staff sees on the board in the morning. Nutrition, with calories and macros, is part of it.',
    ],
  },
  swiss: 'In professional hockey, health and performance data are the most sensitive thing a club has. They belong in Switzerland, and to the player.',
  closing: 'Tell us briefly how your staff works today. We will show you your roster in Prometheus, with your schedule and your tests.',
}

export default function IceHockeyPage() {
  return <TeamSportPage sport={HOCKEY_EN} />
}
