import { useState } from 'react'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

const coreTeam = [
  {
    initials: 'DP',
    name: 'Daniele Pauli',
    title: 'CEO & Founder',
    bio: 'IPF World Champion. First Swiss gold in powerlifting — ever. 10× Swiss National Champion. 2× European Champion. Vice World Champion in weightlifting. #1 in the world — Supertotal Masters. Ranked 3rd globally in Strength Wars League.',
    bioExpanded: 'National records in three different countries. Marathon finisher. #1 in the world — Supertotal Masters, all weight classes combined. Unchallenged. Ranked 3rd globally in Strength Wars League — the largest internet battle series in strength sports history, with over 200 million views.\n\nOver 32 years and 14,000+ sessions, Daniele Pauli has trained Olympic bob teams, ZSC Lions — Switzerland\'s most decorated hockey franchise — the country\'s top recording artists, its most celebrated supermodels, and the executive leadership of Credit Suisse, UBS, and Bank Leumi — alongside individuals connected to the highest circles of global politics and philanthropy.\n\nBefore all that — and throughout — he has worked every layer of the fitness industry: from gym reception to leading gym teams, thousands of hours on the training floor, certified examiner for fitness professionals (Eidg. Fachausweis), and former Training Officer for Credit Suisse Health Management. He understands the business from the entrance counter to the boardroom.\n\nHe built his first fitness CRM in 2010. Developed the world\'s first 9-axis bar acceleration VBT prototype in 2017. Operational depth at every level of the industry, combined with software engineering.\n\nPrometheus is not a startup idea. It is 32 years of elite knowledge, forged in iron, finally unleashed on the world.',
    color: 'from-accent to-orange-400',
    image: '/images/team/daniele-pauli.png',
  },
  {
    initials: 'BA',
    name: 'Dr. Basil Achermann',
    title: 'Chief Science Officer',
    bio: 'Sport Science researcher from the University of Zurich, specializing in measurement methodology for acceleration-based training. Combines a 4-year IT apprenticeship with deep academic research, making him the rare scientist who can both design the experiment and write the code. Leads the Prometheus Lab and drives our R&D pipeline.',
    color: 'from-green-400 to-emerald-500',
    image: '/images/team/basil-achermann.png',
  },
  {
    initials: 'SJ',
    name: 'Sjoerd Joosten',
    title: 'Chief Operating Officer',
    bio: 'Sport psychologist by training, hybrid athlete by nature — carrying a golf handicap of 0 alongside serious numbers in weightlifting and WOD training. Brings extensive experience leading talent sport schools and training high-level athletes. As COO and B2B specialist, Sjoerd is the powerhouse driving Prometheus into gyms, clinics, and enterprises across Europe.',
    color: 'from-accent to-orange-400',
    image: '/images/team/sjoerd-joosten.png',
  },
]

const extendedTeam = [
  {
    initials: 'KK',
    name: 'Karin Känel',
    title: 'Executive Assistant & Project Manager',
    bio: '2× Swiss Champion U15/U17 Handball, 1× Vice Champion. Golf handicap 1. Trained Polymechanikerin (EFZ) with hands-on experience in precision scientific instrumentation. Certified Technische Kauffrau, combining engineering discipline with business acumen. Keeps Prometheus running with Swiss clockwork efficiency.',
    color: 'from-purple-400 to-violet-500',
    image: '/images/team/karin-kaenel.png',
  },
  {
    initials: 'ST',
    name: 'Sascha Tarone',
    title: 'Advisor & Early Investor',
    bio: 'Versatile entrepreneur with 20 years of experience in financial analytics. As both strategic consultant and early investor, Sascha brings the financial rigor and market perspective that shapes Prometheus from business model to exit strategy.',
    color: 'from-cyan-400 to-teal-500',
    badge: true,
    image: '/images/team/sascha-tarone.png',
  },
  {
    initials: 'KU',
    name: 'Dr. Kevin Uram',
    title: 'Early Investor & Technical Advisor',
    bio: 'Physical Chemistry background (University of Pittsburgh), former IBM Senior Technical Staff Member (12+ years), and Managing Director at Lumileds semiconductor manufacturing (11+ years). Holds multiple US patents in semiconductor fabrication technology.',
    color: 'from-rose-400 to-pink-500',
    badge: true,
    image: '/images/team/kevin-uram.png',
  },
  {
    initials: 'CB',
    name: 'Chloe Borge',
    title: 'Ambassador & Master Athletics Lead',
    bio: 'Early investor who recognized the potential of Prometheus from the start. Master\'s degree in Hospitality Management from a prestigious French hospitality school. 23 years of full-contact Shotokan Karate — 3rd Dan black belt and former member of the French National Team. Freestyle snowboarder, surfer, and multiple-time 3rd place finisher in France\'s and Switzerland\'s Fittest CrossFit Masters Athlete competitions. 20 years at Vacheron Constantin in quality control. Now leads her own brand, True You Coaching, as a certified mental performance coach.',
    color: 'from-amber-400 to-yellow-500',
    badge: true,
    image: '/images/team/chloe-borge.png',
  },
]

function TeamCard({ member, large }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className={`group bg-dark-card border border-dark-border rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 relative ${large ? 'lg:p-8' : ''}`}>
      {/* Accent line */}
      <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${member.color} rounded-b opacity-50 group-hover:opacity-100 transition-opacity`} />

      {/* Badge */}
      {member.badge && (
        <div className="absolute top-4 right-4 px-2.5 py-1 bg-accent/10 border border-accent/20 rounded-full">
          <span className="text-[10px] text-accent font-semibold uppercase tracking-wider">Advisor & Investor</span>
        </div>
      )}

      {/* Avatar */}
      {member.image ? (
        <div className={`w-16 h-16 rounded-full overflow-hidden mb-4 ring-2 ring-dark-border group-hover:ring-accent/30 transition-all ${large ? 'w-20 h-20' : ''}`}>
          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={`w-16 h-16 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mb-4 ${large ? 'w-20 h-20' : ''}`}>
          <span className={`font-bold text-dark ${large ? 'text-xl' : 'text-lg'}`}>{member.initials}</span>
        </div>
      )}

      <h3 className={`font-bold text-white ${large ? 'text-xl' : 'text-lg'}`}>{member.name}</h3>
      <p className="text-accent text-sm font-medium mb-3">{member.title}</p>
      <p className={`text-[#999] leading-relaxed ${large ? 'text-sm' : 'text-xs'}`}>{member.bio}</p>

      {member.bioExpanded && (
        <>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-[1200px] opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
            <p className={`text-[#999] leading-relaxed whitespace-pre-line ${large ? 'text-sm' : 'text-xs'}`}>{member.bioExpanded}</p>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-accent text-xs font-medium hover:text-accent/80 transition-colors cursor-pointer"
          >
            {expanded ? '← Show less' : 'Read full story →'}
          </button>
        </>
      )}
    </div>
  )
}

export default function Team() {
  const [ref, isVisible] = useScrollAnimation(0.1)

  return (
    <section id="team" ref={ref} className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">
            The Minds Behind Prometheus
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Arimo'] uppercase mt-3 mb-4">
            Built by Scientists.{' '}
            <span className="text-accent">
              Driven by Athletes.
            </span>
          </h2>
          <p className="text-[#999] text-lg max-w-2xl mx-auto">
            Swiss precision meets world-class sport science and elite athletic performance
          </p>
        </div>

        {/* Core Team */}
        <div
          className={`grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {coreTeam.map((m) => (
            <TeamCard key={m.name} member={m} large />
          ))}
        </div>

        {/* Extended Team & Advisors */}
        <div
          className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {extendedTeam.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>

        {/* Note */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-3 text-sm text-[#999]">
            <span>🇨🇭</span>
            <span>🇪🇪</span>
            <span>Peakforce GmbH, Zollikon, Switzerland. Science-driven. Globally minded.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
