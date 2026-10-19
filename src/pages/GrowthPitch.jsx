import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation'
import {
  Smartphone,
  Monitor,
  Building2,
  Eye,
  ArrowLeft,
  Lock,
  Check,
  X,
  ChevronRight,
  Brain,
  Database,
  Users,
  TrendingUp,
  Mail,
  ExternalLink,
  Bot,
  BarChart3,
  Gauge,
  LayoutDashboard,
  Circle,
  Trophy,
  Award,
  MessageSquare,
  ShoppingCart,
  ScanBarcode,
  Target,
  MessageCircle,
  Gift,
  RefreshCw,
  Flame,
  Bell,
  Shield,
  Activity,
  Video,
  Layers,
  Dumbbell,
  Heart,
  Megaphone,
  Handshake,
  Globe,
  UserPlus,
  CircleDollarSign,
} from 'lucide-react'

const ACCESS_CODE = 'PROMETHEUS2026'
const SESSION_KEY = 'growth_access'

// ─── Access Gate ────────────────────────────────────────────────────────────────

function AccessGate({ onAccess }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (code.trim().toUpperCase() === ACCESS_CODE) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      onAccess()
    } else {
      setError(true)
      setTimeout(() => setError(false), 600)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/gradient-bg-dark.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-sm w-full"
      >
        <img src="/images/flame.png" alt="Prometheus" className="w-28 h-28 mx-auto mb-8" />
        <h1 className="font-['Arimo'] text-4xl font-bold uppercase mb-2">Prometheus</h1>
        <p className="text-[#999] text-base mb-10">Investor Deck</p>

        <form onSubmit={handleSubmit}>
          <div
            className={`relative transition-all duration-100 ${
              error ? 'animate-[shake_0.4s_ease-in-out]' : ''
            }`}
          >
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" />
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Access Code"
              autoFocus
              className={`w-full pl-11 pr-4 py-3.5 bg-white/[0.05] backdrop-blur-xl border rounded-xl text-white text-sm placeholder:text-[#666] focus:outline-none focus:border-accent transition-colors ${
                error ? 'border-red-500' : 'border-white/[0.10]'
              }`}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-3.5 bg-accent text-white font-bold rounded-xl text-sm transition-all duration-300 hover:shadow-[0px_2px_18px_0px_#E67E22] hover:-translate-y-0.5"
          >
            Enter
          </button>
        </form>
      </motion.div>
    </div>
  )
}

// ─── Simplified Nav ─────────────────────────────────────────────────────────────

function PitchNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/[0.03] backdrop-blur-2xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/flame.png" alt="Prometheus" className="w-8 h-8" />
          <span className="font-['Arimo'] font-bold text-lg uppercase">Prometheus</span>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-[#999] hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>
    </nav>
  )
}

// ─── Phone & Laptop Mockups ─────────────────────────────────────────────────────

function PhoneMockup({ screens }) {
  return (
    <div className="flex justify-center items-end">
      {screens.map((screen, i) => (
        <div
          key={screen.label}
          className={`${
            i === 1 ? 'w-48 z-10' : 'w-36 opacity-70 hidden sm:block -mx-2'
          }`}
        >
          <img
            src={screen.img}
            alt={screen.label}
            className="w-full h-auto rounded-[30px]"
          />
        </div>
      ))}
    </div>
  )
}

function LaptopMockup({ title, screenshot }) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] w-full mx-auto">
      <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.06]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        <div className="flex-1 mx-8">
          <div className="h-5 bg-dark rounded-md" />
        </div>
      </div>
      {screenshot ? (
        <img src={screenshot} alt={title} className="w-full h-auto" />
      ) : (
        <div className="p-8 flex flex-col items-center justify-center h-48">
          <Monitor size={32} className="text-accent/40 mb-3" />
          <p className="text-sm text-[#999]">{title} Dashboard</p>
        </div>
      )}
    </div>
  )
}

// ─── Section Wrapper ────────────────────────────────────────────────────────────

function Section({ children, className = '', id }) {
  const [ref, isVisible] = useScrollAnimation(0.1)
  return (
    <section
      id={id}
      ref={ref}
      className={`py-24 lg:py-32 relative z-10 ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {children}
      </div>
    </section>
  )
}

function SectionHeader({ label, title, titleAccent, subtitle }) {
  return (
    <div className="text-center mb-16">
      {label && (
        <span className="text-accent text-sm font-semibold uppercase tracking-widest">
          {label}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-['Arimo'] uppercase mt-3 mb-4">
        {title}{' '}
        {titleAccent && <span className="text-accent">{titleAccent}</span>}
      </h2>
      {subtitle && <p className="text-[#999] text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

// ─── 1. Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [ref, isVisible] = useScrollAnimation(0.05)

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden z-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/[0.08] backdrop-blur-xl border border-accent/20 rounded-full mb-8 shadow-[0_0_20px_rgba(230,126,34,0.1)]">
            <span className="text-accent text-xs font-semibold uppercase tracking-wider">Growth Pitch 2026</span>
          </div>

          <h1 className="font-['Arimo'] text-4xl sm:text-5xl lg:text-7xl font-extrabold uppercase mb-6 leading-tight">
            The Intelligent<br />
            <span className="text-accent">Fitness Ecosystem</span>
          </h1>

          <p className="text-[#999] text-lg sm:text-xl max-w-3xl mx-auto mb-16 leading-relaxed">
            The first platform that unifies AI Coaching, Computer Vision Barbell Tracking, Full-Body Motion Tracking, Nutrition, Community, and Wearables — from golfer to weightlifter, no extra hardware required.
          </p>

        </motion.div>
      </div>
    </section>
  )
}

// ─── 2. The Problem ─────────────────────────────────────────────────────────────

function ProblemSection() {
  return (
    <Section id="problem">
      <SectionHeader
        label="The Problem"
        title="A $6B Market."
        titleAccent="Still Broken."
      />

      {/* Three Broken Segments — Side by Side */}
      <div className="grid md:grid-cols-3 gap-4 mb-10">
        {/* Athletes */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-accent/[0.08] border border-accent/20 rounded-lg flex items-center justify-center">
              <Smartphone size={18} className="text-accent" />
            </div>
            <h3 className="font-['Arimo'] text-sm font-bold uppercase">Athletes</h3>
          </div>
          <p className="text-[#ccc] text-sm leading-relaxed mb-3">
            Consumer fitness apps focus on <span className="text-white font-semibold">tracking repetitions and calories</span> — but none combine AI coaching, nutrition planning, velocity-based training, and community in one platform.
          </p>
          <p className="text-[#999] text-xs leading-relaxed">
            Athletes are forced to use 3–5 separate apps to cover what should be one integrated experience.
          </p>
        </div>

        {/* Coaches */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-accent/[0.08] border border-accent/20 rounded-lg flex items-center justify-center">
              <Users size={18} className="text-accent" />
            </div>
            <h3 className="font-['Arimo'] text-sm font-bold uppercase">Coaches</h3>
          </div>
          <p className="text-[#ccc] text-sm leading-relaxed mb-3">
            Coaching platforms track check-ins and sets — but <span className="text-white font-semibold">lack real performance data</span>. No velocity metrics, no cross-analysis between training and nutrition, no science-grade insights.
          </p>
          <p className="text-[#999] text-xs leading-relaxed">
            Coaches can't optimize what they can't measure — and current tools don't measure what matters.
          </p>
        </div>

        {/* Gyms */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-accent/[0.08] border border-accent/20 rounded-lg flex items-center justify-center">
              <Building2 size={18} className="text-accent" />
            </div>
            <h3 className="font-['Arimo'] text-sm font-bold uppercase">Gyms</h3>
          </div>
          <p className="text-[#ccc] text-sm leading-relaxed mb-3">
            Enterprise gym software handles <span className="text-white font-semibold">payments, bookings, and attendance</span> — but has zero insight into actual training outcomes or member performance.
          </p>
          <p className="text-[#999] text-xs leading-relaxed">
            Studios and clinics run performance businesses with software that doesn't understand performance.
          </p>
        </div>
      </div>

      {/* Prometheus Closing */}
      <div className="bg-white/[0.04] backdrop-blur-xl border border-accent/20 rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto text-center shadow-[0_8px_40px_rgba(230,126,34,0.06)]">
        <p className="text-xl sm:text-2xl font-extrabold font-['Arimo'] uppercase">
          Prometheus 1.0 already offers more than <span className="text-accent">all of them combined.</span>
        </p>
        <p className="text-[#999] text-sm mt-3">
          Imagine version 4.0.
        </p>
      </div>
    </Section>
  )
}

// ─── 3. Solution — Ecosystem Overview ───────────────────────────────────────────

function EcosystemSection() {
  const products = [
    {
      icon: Smartphone,
      label: 'Athlete App',
      subtitle: 'The Most Complete Training Companion Ever Built',
      desc: 'AI Coaching, Nutrition, VBT, Community, and Wearables — everything an athlete needs in one app.',
      mockup: 'phoneFan',
      screens: [
        '/images/screenshots/nutrition-daily-log-framed.png',
        '/images/screenshots/workout-session-framed.png',
        '/images/screenshots/coach-chat-full-framed.png',
        '/images/screenshots/training-framed.png',
        '/images/screenshots/statistics-framed.png',
        '/images/screenshots/add-food-search-framed.png',
        '/images/screenshots/challenge-bench-press-framed.png',
      ],
      demoUrl: 'https://play.google.com/store/apps/details?id=prometheus.coach&pcampaignid=web_share',
      demoLabel: 'Google Play',
    },
    {
      icon: Monitor,
      label: 'Coach Software',
      subtitle: 'Professional Coaching Tools',
      desc: 'Program, monitor, and analyze clients — free full-version mobile app for every coach included.',
      mockup: 'laptopWithPhone',
      screenshot: '/images/screenshots/coach-dashboard.png',
      mobileScreenshot: '/images/screenshots/coach-mobile-framed.png',
      demoUrl: 'https://app.prometheus.coach',
      demoLabel: 'Live Demo',
    },
    {
      icon: Building2,
      label: 'Enterprise',
      subtitle: 'Studio & Clinic Management',
      desc: 'White-label studio and clinic management with CRM, scheduling, and full coach oversight.',
      mockup: 'laptop',
      screenshot: '/images/screenshots/enterprise-dashboard.png',
      demoUrl: 'https://enterprise.prometheus.coach',
      demoLabel: 'Live Demo',
    },
    {
      icon: Database,
      label: 'Prometheus Lab',
      subtitle: 'Science-Driven Insights for Coaches & Gyms',
      desc: 'Coaches deliver training data — we return research-backed cross-performance insights that drive results.',
      mockup: 'laptop',
      screenshot: '/images/screenshots/vbt-lab-dashboard.png',
    },
  ]

  return (
    <Section id="ecosystem" className="bg-white/[0.01]">
      <SectionHeader
        label="The Solution"
        title="One Ecosystem. Four Products."
        titleAccent="Total Integration."
      />

      {/* Athlete App — full-width card with carousel */}
      {(() => {
        const a = products[0]
        const [selectedScreen, setSelectedScreen] = useState(null)
        const [autoIndex, setAutoIndex] = useState(2)
        const pauseRef = useRef(null)

        useEffect(() => {
          if (selectedScreen !== null) return
          const timer = setInterval(() => {
            setAutoIndex((prev) => (prev + 1) % a.screens.length)
          }, 3000)
          return () => clearInterval(timer)
        }, [selectedScreen, a.screens.length])

        const activeIndex = selectedScreen !== null ? selectedScreen : autoIndex

        const handleScreenClick = (si) => {
          setSelectedScreen(si)
          clearTimeout(pauseRef.current)
          pauseRef.current = setTimeout(() => setSelectedScreen(null), 5000)
        }

        return (
          <div className="relative z-20 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden hover:border-accent/25 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(230,126,34,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.2)] mb-6">
            <div className="grid lg:grid-cols-[1fr_1.8fr] items-center">
              <div className="p-8 lg:p-10 order-2 lg:order-1">
                <div className="w-11 h-11 bg-accent/[0.08] backdrop-blur-sm border border-accent/20 rounded-xl flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(230,126,34,0.08)]">
                  <a.icon size={20} className="text-accent" />
                </div>
                <h4 className="font-['Arimo'] font-bold text-xl uppercase mb-1">{a.label}</h4>
                <p className="text-accent text-sm font-medium mb-3">{a.subtitle}</p>
                <p className="text-[#999] text-sm leading-relaxed mb-4">{a.desc}</p>
                {a.demoUrl && (
                  <a href={a.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-accent/[0.1] border border-accent/25 rounded-lg text-accent text-xs font-semibold hover:bg-accent/[0.15] transition-colors">
                    <ExternalLink size={12} />
                    {a.demoLabel}
                  </a>
                )}
              </div>
              <div className="relative flex justify-center items-end h-[360px] sm:h-[460px] order-1 lg:order-2 pb-6">
                {a.screens.map((src, si) => {
                  const offset = si - activeIndex
                  const isActive = si === activeIndex
                  const absOffset = Math.abs(offset)
                  const translateX = offset * 52
                  const isSelected = selectedScreen === si
                  const scale = isSelected ? 1.15 : isActive ? 1.05 : 0.95
                  const z = isSelected ? 30 : a.screens.length - absOffset
                  const opacity = absOffset > 2 ? 0.3 : 1 - absOffset * 0.12
                  return (
                    <img
                      key={si}
                      src={src}
                      alt={`Screen ${si + 1}`}
                      onClick={() => handleScreenClick(si)}
                      className="absolute h-64 sm:h-[340px] w-auto rounded-[22px] cursor-pointer"
                      style={{
                        transform: `translateX(${translateX}px) translateY(${isSelected ? -10 : 0}px) scale(${scale})`,
                        zIndex: z,
                        opacity: isSelected ? 1 : opacity,
                        filter: isSelected || isActive ? 'none' : `brightness(${1 - absOffset * 0.12})`,
                        boxShadow: 'none',
                        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      }}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )
      })()}

      {/* Remaining product cards — 3 columns */}
      <div className="grid sm:grid-cols-3 gap-6 mb-10">
        {products.slice(1).map((p, i) => (
          <div
            key={i}
            className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-visible group hover:border-accent/25 hover:z-20 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(230,126,34,0.1)] shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
          >
            <div className="relative bg-gradient-to-b from-white/[0.03] to-transparent">
              <div className={`p-5 pt-6 ${p.mockup === 'laptopWithPhone' ? 'pb-2' : ''}`}>
                <div className={`relative group-hover:scale-[1.5] group-hover:-translate-y-[10%] transition-all duration-500 ease-out origin-bottom ${i === 0 ? 'group-hover:translate-x-[33%]' : i === 2 ? 'group-hover:-translate-x-[33%]' : ''}`}>
                  <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.4)] group-hover:shadow-[0_24px_60px_rgba(0,0,0,0.6),0_0_30px_rgba(230,126,34,0.1)] transition-shadow duration-500">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border-b border-white/[0.06]">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                      <div className="flex-1 mx-6">
                        <div className="h-4 bg-dark rounded-md" />
                      </div>
                    </div>
                    <img
                      src={p.screenshot}
                      alt={p.label}
                      className="w-full h-auto"
                    />
                  </div>
                  {p.mockup === 'laptopWithPhone' && (
                    <img
                      src={p.mobileScreenshot}
                      alt={`${p.label} Mobile`}
                      className="absolute -bottom-4 -right-2 h-[65%] w-auto rounded-[16px] shadow-[0_12px_40px_rgba(0,0,0,0.6)] border-2 border-white/[0.08] group-hover:scale-[1.05] group-hover:-translate-y-1 transition-all duration-500"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Product info */}
            <div className="p-6 flex items-start gap-4">
              <div className="w-11 h-11 bg-accent/[0.08] backdrop-blur-sm border border-accent/20 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(230,126,34,0.08)]">
                <p.icon size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="font-['Arimo'] font-bold text-base uppercase mb-0.5">{p.label}</h4>
                <p className="text-accent text-xs font-medium mb-2">{p.subtitle}</p>
                <p className="text-[#999] text-xs leading-relaxed">{p.desc}</p>
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-3 text-accent text-xs font-semibold hover:underline">
                    <ExternalLink size={11} />
                    {p.demoLabel}
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

    </Section>
  )
}

// ─── 5. Community & Gamification ────────────────────────────────────────────────

function CommunitySection() {
  return (
    <Section id="community" className="bg-white/[0.01]">
      <SectionHeader
        label="Community & Gamification"
        title="Not Just an App."
        titleAccent="A Movement."
        subtitle="Built-in social features that drive engagement, retention, and organic growth — no external platforms needed."
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
        {/* Left — Features */}
        <div>
          <div className="space-y-6">
            {[
              {
                icon: Trophy,
                title: 'Community Challenges',
                desc: 'Coaches and athletes create challenges — weekly volume targets, streak competitions, sport-specific leaderboards. Drives daily engagement and cross-user interaction.',
              },
              {
                icon: Award,
                title: 'Badge & Achievement System',
                desc: 'Earn badges for milestones: first VBT session, 30-day streak, PR lifts, nutrition consistency, community contributions. Gamification that keeps athletes coming back.',
              },
              {
                icon: MessageSquare,
                title: 'Social Feed & Profiles',
                desc: 'Athletes share workouts, PRs, and progress photos. Follow friends, comment, and compete. Every user becomes a content creator — organic virality built into the product.',
              },
              {
                icon: Database,
                title: 'Community Food Database',
                desc: 'Users contribute custom foods, barcodes, and restaurant meals. The database grows with every user — a self-reinforcing data moat that competitors can\'t replicate.',
              },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-11 h-11 bg-accent/[0.08] backdrop-blur-sm border border-accent/20 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(230,126,34,0.06)]">
                  <f.icon size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{f.title}</h4>
                  <p className="text-[#999] text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Community Screenshots */}
        <div className="flex justify-center items-end group/phones">
          <div className="w-36 opacity-70 hidden sm:block -mr-2 hover:opacity-100 hover:scale-[1.4] hover:z-20 hover:-translate-y-[8%] transition-all duration-500 ease-out origin-bottom">
            <img
              src="/images/screenshots/community-profile-framed.png"
              alt="Community Profile"
              className="w-full h-auto rounded-[30px]"
            />
          </div>
          <div className="w-48 z-10 hover:scale-[1.4] hover:z-20 hover:-translate-y-[8%] transition-all duration-500 ease-out origin-bottom">
            <img
              src="/images/screenshots/community-feed-framed.png"
              alt="Community Feed"
              className="w-full h-auto rounded-[30px]"
            />
          </div>
          <div className="w-36 opacity-70 hidden sm:block -ml-2 hover:opacity-100 hover:scale-[1.4] hover:z-20 hover:-translate-y-[8%] transition-all duration-500 ease-out origin-bottom">
            <img
              src="/images/screenshots/challenge-bench-press-framed.png"
              alt="Community Challenge"
              className="w-full h-auto rounded-[30px]"
            />
          </div>
        </div>
      </div>

      {/* Retention Metrics */}
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { label: 'Engagement Driver', value: 'Challenges', desc: 'Weekly & monthly community challenges drive daily opens' },
          { label: 'Virality Engine', value: 'Social Feed', desc: 'Every PR shared becomes a free acquisition channel' },
          { label: 'Data Moat', value: 'Community DB', desc: 'User-contributed food data grows the platform for everyone' },
        ].map((m, i) => (
          <div key={i} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <div className="text-2xl font-extrabold text-accent font-['Arimo'] mb-1">{m.value}</div>
            <div className="text-white text-xs font-semibold uppercase tracking-wider mb-2">{m.label}</div>
            <div className="text-[#999] text-xs">{m.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── 6. Nutrition Deep Dive ─────────────────────────────────────────────────────

function NutritionSection() {
  return (
    <Section id="nutrition">
      <SectionHeader
        label="Nutrition Engine"
        title="The Most Complete"
        titleAccent="Nutrition Tracker. Period."
        subtitle="Not just calorie counting — an intelligent nutrition system that plans, tracks, and shops for you."
      />

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — Screenshots */}
        <div className="flex justify-center items-end">
          <div className="w-36 opacity-70 hidden sm:block -mr-2 hover:opacity-100 hover:scale-[1.4] hover:z-20 hover:-translate-y-[8%] transition-all duration-500 ease-out origin-bottom">
            <img
              src="/images/screenshots/nutrition-framed.png"
              alt="Nutrition Tracking"
              className="w-full h-auto rounded-[30px]"
            />
          </div>
          <div className="w-48 z-10 hover:scale-[1.4] hover:z-20 hover:-translate-y-[8%] transition-all duration-500 ease-out origin-bottom">
            <img
              src="/images/screenshots/nutrition-daily-log-framed.png"
              alt="Daily Nutrition Log"
              className="w-full h-auto rounded-[30px]"
            />
          </div>
          <div className="w-36 opacity-70 hidden sm:block -ml-2 hover:opacity-100 hover:scale-[1.4] hover:z-20 hover:-translate-y-[8%] transition-all duration-500 ease-out origin-bottom">
            <img
              src="/images/screenshots/add-food-search-framed.png"
              alt="Food Search"
              className="w-full h-auto rounded-[30px]"
            />
          </div>
        </div>

        {/* Right — Features */}
        <div>
          <div className="space-y-5">
            {[
              { icon: ScanBarcode, title: 'Barcode & Label Scanner', desc: 'Scan any product barcode or nutrition label with your camera. Instant macro tracking — no manual entry needed.' },
              { icon: Database, title: '4.5M+ Food Database', desc: 'The largest integrated food database in any training app. All major restaurant chains pre-loaded for quick adds — McDonald\'s, Subway, Starbucks, and hundreds more.' },
              { icon: Bot, title: 'AI Nutrition Plans', desc: 'Individualized nutrition plans based on training goals, body composition targets, and dietary preferences — with full macro breakdowns.' },
              { icon: ShoppingCart, title: 'AI Shopping Lists', desc: 'Auto-generated shopping lists based on your meal plan. One tap to see exactly what to buy for the week.' },
              { icon: Target, title: 'Goal-Adaptive Tracking', desc: 'Cut, bulk, maintain, or sport-specific fuel. The system adapts calorie and macro targets based on training load and recovery metrics.' },
              { icon: Eye, title: 'UPF Tracking', desc: 'Logs ultra-processed food intake automatically. See exactly how much of your diet is real food vs. industrial products — a metric no other app tracks.' },
              { icon: Bell, title: 'Anabolic Window Reminder', desc: 'Post-workout push notification reminding you to eat within the optimal recovery window. Connects training sessions to nutrition timing automatically.' },
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-accent/[0.08] backdrop-blur-sm border border-accent/20 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(230,126,34,0.06)]">
                  <f.icon size={18} className="text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-0.5">{f.title}</h4>
                  <p className="text-[#999] text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

// ─── 7. AI Coach Deep Dive ──────────────────────────────────────────────────────

function AICoachSection() {
  const chatRef = useRef(null)
  const [chatVisible, setChatVisible] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [typingIndex, setTypingIndex] = useState(-1)

  // Observe chat container entering viewport
  useEffect(() => {
    const el = chatRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChatVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Chat message definitions
  const messages = [
    {
      sender: 'coach',
      content: (
        <p className="text-sm text-gray-300 leading-relaxed">
          Hey! I'm your <span className="text-white font-semibold">Prometheus Coach</span>. I analyze your training, nutrition, sleep, velocity data, and periodization — all in real time. Here's what I can do:
        </p>
      ),
    },
    {
      sender: 'coach',
      content: (
        <div className="flex flex-wrap gap-2">
          {['Individual plans for 135+ sports', 'Adaptive periodization', 'Weekly performance reviews', 'Recovery-aware adjustments', 'Real-time advice'].map((tag, i) => (
            <span key={i} className="px-3 py-1.5 bg-accent/[0.08] border border-accent/20 rounded-full text-[11px] font-semibold text-accent">
              {tag}
            </span>
          ))}
        </div>
      ),
    },
    {
      sender: 'user',
      content: (
        <p className="text-sm leading-relaxed">
          I've been stuck on my bench press for 3 weeks. My 1RM hasn't moved. What should I change?
        </p>
      ),
    },
    {
      sender: 'coach',
      content: (
        <p className="text-sm text-gray-300 leading-relaxed">
          Looking at your data: your bar velocity on working sets dropped <span className="text-white font-semibold">12% this week</span>, and your sleep averaged <span className="text-white font-semibold">5.8h</span> — well below your 7.2h baseline. This isn't a strength plateau — it's <span className="text-accent font-semibold">accumulated fatigue</span>. Here's my plan:
        </p>
      ),
    },
    {
      sender: 'coach',
      content: (
        <div>
          <div className="space-y-2.5 mb-3">
            {[
              { num: '1', text: 'Deload this week — reduce volume by 40%, keep intensity at RPE 6' },
              { num: '2', text: 'Velocity-target reintroduction next week — only add load when bar speed exceeds 0.5 m/s' },
              { num: '3', text: '+200 kcal on training days — your deficit is stalling recovery' },
            ].map((step) => (
              <div key={step.num} className="flex gap-3 items-start">
                <span className="w-6 h-6 bg-accent/[0.15] border border-accent/25 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold text-accent">{step.num}</span>
                <p className="text-sm text-gray-300 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-accent font-medium">Your updated meal plan and shopping list are ready.</p>
        </div>
      ),
    },
  ]

  // Animate messages sequentially when chat becomes visible
  useEffect(() => {
    if (!chatVisible) return
    let cancelled = false
    const timers = []

    const schedule = (fn, delay) => {
      const id = setTimeout(() => { if (!cancelled) fn() }, delay)
      timers.push(id)
    }

    let elapsed = 400 // initial delay before first message
    messages.forEach((msg, i) => {
      if (msg.sender === 'coach') {
        // Show typing indicator
        const typingStart = elapsed
        schedule(() => setTypingIndex(i), typingStart)
        elapsed += 800 // typing duration
        // Show message
        const showTime = elapsed
        schedule(() => {
          setTypingIndex(-1)
          setVisibleCount(i + 1)
        }, showTime)
      } else {
        // User message — just a pause, no typing
        const showTime = elapsed
        schedule(() => setVisibleCount(i + 1), showTime)
      }
      elapsed += 1200 // gap between messages
    })

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [chatVisible])

  const TypingIndicator = () => (
    <div className="flex items-end gap-3 max-w-[85%]">
      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-white/[0.06] flex items-center justify-center">
        <img src="/images/flame.png" alt="" className="w-5 h-5 object-contain" />
      </div>
      <div className="bg-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((d) => (
            <span
              key={d}
              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: `${d * 150}ms`, animationDuration: '0.8s' }}
            />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <Section id="ai-coach" className="bg-white/[0.01]">
      <SectionHeader
        label="AI Coaching Engine"
        title="Your Personal Coach."
        titleAccent="For Every Sport."
        subtitle="From golf swing optimization to powerlifting periodization — the AI coach builds individual plans for 135+ sports and reviews your progress every week."
      />

      {/* Chat Roleplay */}
      <div
        ref={chatRef}
        className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl max-w-3xl mx-auto mb-12 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
      >
        {/* Chat header */}
        <div className="px-5 py-3.5 border-b border-white/[0.06] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white/[0.06] flex items-center justify-center">
            <img src="/images/flame.png" alt="" className="w-5 h-5 object-contain" />
          </div>
          <div>
            <div className="text-sm font-semibold">Prometheus Coach</div>
            <div className="text-[11px] text-green-400">Online</div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="px-4 sm:px-6 py-5 space-y-4 min-h-[120px]">
          {messages.map((msg, i) => {
            if (i >= visibleCount && typingIndex !== i) return null

            if (typingIndex === i && i >= visibleCount) {
              return <TypingIndicator key={`typing-${i}`} />
            }

            if (msg.sender === 'coach') {
              return (
                <div
                  key={i}
                  className="flex items-end gap-3 max-w-[85%] animate-[fadeSlideIn_0.3s_ease-out]"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-white/[0.06] flex items-center justify-center">
                    <img src="/images/flame.png" alt="" className="w-5 h-5 object-contain" />
                  </div>
                  <div className="bg-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3">
                    {msg.content}
                  </div>
                </div>
              )
            }

            // User message
            return (
              <div
                key={i}
                className="flex justify-end animate-[fadeSlideIn_0.3s_ease-out]"
              >
                <div className="bg-accent/[0.15] border border-accent/20 rounded-2xl rounded-br-md px-4 py-3 max-w-[85%] text-white">
                  {msg.content}
                </div>
              </div>
            )
          })}

          {/* Show typing indicator at the end if it's for a future message */}
          {typingIndex >= visibleCount && typingIndex < messages.length && visibleCount === typingIndex && null}
        </div>
      </div>

      {/* Screenshots */}
      <div className="flex justify-center items-end">
        <div className="w-36 opacity-70 hidden sm:block -mr-2 hover:opacity-100 hover:scale-[1.4] hover:z-20 hover:-translate-y-[8%] transition-all duration-500 ease-out origin-bottom">
          <img
            src="/images/screenshots/vbt-video-analysis-framed.png"
            alt="VBT Video Analysis"
            className="w-full h-auto rounded-[30px]"
          />
        </div>
        <div className="w-48 z-10 hover:scale-[1.4] hover:z-20 hover:-translate-y-[8%] transition-all duration-500 ease-out origin-bottom">
          <img
            src="/images/screenshots/coach-ai-framed.png"
            alt="AI Coach"
            className="w-full h-auto rounded-[30px]"
          />
        </div>
        <div className="w-36 opacity-70 hidden sm:block -ml-2 hover:opacity-100 hover:scale-[1.4] hover:z-20 hover:-translate-y-[8%] transition-all duration-500 ease-out origin-bottom">
          <img
            src="/images/screenshots/vbt-statistics-framed.png"
            alt="VBT Statistics"
            className="w-full h-auto rounded-[30px]"
          />
        </div>
      </div>
    </Section>
  )
}

// ─── 8. The Forge ──────────────────────────────────────────────────────────

function CommandCenterSection() {
  return (
    <Section id="command-center">
      <SectionHeader
        label="Operational Control"
        title="The"
        titleAccent="Forge."
        subtitle="Our proprietary operations platform at admin.prometheus.coach — full real-time visibility into every metric that matters. Built on Supabase with live data streaming."
      />

      {/* Hero Statement */}
      <div className="bg-white/[0.04] backdrop-blur-xl border border-accent/20 rounded-2xl p-6 sm:p-8 mb-12 text-center max-w-3xl mx-auto shadow-[0_8px_40px_rgba(230,126,34,0.06)]">
        <div className="w-14 h-14 bg-accent/[0.08] backdrop-blur-sm border border-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(230,126,34,0.1)]">
          <LayoutDashboard size={28} className="text-accent" />
        </div>
        <h3 className="font-['Arimo'] font-bold uppercase text-xl mb-3">Full Visibility. Zero Guesswork.</h3>
        <p className="text-[#999] text-sm leading-relaxed">
          Revenue, costs, churn risk, creator performance, Play Store reviews, project milestones, and break-even progress — all in one dashboard, updating in real time. This isn't a mockup. It's live at <span className="text-white font-medium">admin.prometheus.coach</span> right now.
        </p>
      </div>

      {/* Forge Screenshots — 4-up */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
        {[
          { title: 'Cost Analytics', src: '/images/screenshots/forge-cost-analytics.png' },
          { title: 'Supabase Health', src: '/images/screenshots/forge-supabase-health.png' },
          { title: 'Creators CRM', src: '/images/screenshots/forge-creators.png' },
          { title: 'Projects', src: '/images/screenshots/forge-projects.png' },
        ].map((s, i) => (
          <div key={i} className="bg-white/[0.04] border border-white/[0.08] rounded-xl overflow-hidden">
            <img src={s.src} alt={s.title} className="w-full h-auto" />
            <p className="text-center text-[10px] text-[#666] font-medium py-1.5 uppercase tracking-wider">{s.title}</p>
          </div>
        ))}
      </div>


      {/* Prometheus Lab */}
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden mb-12 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <div className="h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
        <div className="p-6 sm:p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-green-400/10 border border-green-400/20 rounded-xl flex items-center justify-center">
                  <Database size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="font-['Arimo'] font-bold uppercase text-lg">Prometheus Lab</h3>
                  <p className="text-[#999] text-xs">Integrated into The Forge</p>
                </div>
              </div>
              <p className="text-[#999] text-sm leading-relaxed mb-5">
                Coaches and gyms deliver training data from the field. Prometheus Lab transforms it into research-grade insights — Load-Velocity Profiles, velocity trends, e1RM estimation, and R² regression analysis. Beyond VBT, it analyzes cross-performance between training, nutrition, and periodization/recovery — then delivers actionable recommendations back so every client reaches their goals faster.
              </p>
              <div className="space-y-2">
                {[
                  'Load-Velocity Profile scatter plots per exercise',
                  'Velocity trend analysis across sessions',
                  'R² correlation values for scientific validation',
                  'Per-athlete e1RM estimation and MVT tracking',
                  'Cross-performance analysis: training × nutrition × periodization/recovery',
                  'CSV export for external research collaboration',
                  'Tracking error monitoring for continuous improvement',
                ].map((p, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-green-400 shrink-0" />
                    <span className="text-gray-300">{p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <LaptopMockup title="Prometheus Lab" screenshot="/images/screenshots/vbt-lab-dashboard.png" />
            </div>
          </div>
          <p className="text-center text-[#999] text-sm mt-8">
            The more coaches and gyms use Prometheus, the smarter the lab becomes — a <span className="text-white font-medium">self-reinforcing intelligence loop</span> that grows with every session. A moat no competitor can buy.
          </p>
        </div>
      </div>

      <p className="text-center text-[#999] text-sm">
        Built with <span className="text-white font-medium">Supabase</span> real-time subscriptions, <span className="text-white font-medium">Stripe</span> payment integration, and <span className="text-white font-medium">Recharts</span> analytics. The Forge is live at admin.prometheus.coach.
      </p>
    </Section>
  )
}

// ─── 9. Why We Win (Moat + Competition merged) ──────────────────────────────────

function WhyWeWinSection() {
  const moats = [
    { icon: Eye, gradient: 'from-accent to-orange-400', title: 'On-Device VBT', desc: 'Science-grade velocity tracking via phone camera — no hardware, no Bluetooth, no competition.' },
    { icon: Video, gradient: 'from-blue-400 to-indigo-500', title: 'Live VBT Video Coaching', desc: 'World\'s first: built-in video calls with real-time barbell tracking overlay, pose skeleton, and frame-by-frame annotation. No one else has this.' },
    { icon: Brain, gradient: 'from-[#F39C12] to-[#E67E22]', title: 'AI Coaching Engine', desc: 'Five simultaneous data sources feeding one adaptive coaching model — a compounding intelligence advantage.' },
    { icon: Database, gradient: 'from-cyan-400 to-teal-500', title: 'Community Data Moat', desc: 'Every user makes the platform smarter — a self-reinforcing data network that can\'t be bought or replicated.' },
    { icon: Trophy, gradient: 'from-yellow-400 to-amber-500', title: 'Engagement Lock-In', desc: 'Switching costs compound with every badge, challenge, and social connection — retention by design.' },
  ]

  const features = ['AI Coach', 'Individual Plans', 'VBT', 'No Hardware', 'Live VBT Video Call', 'Nutrition + Scanner', 'Shopping Lists', 'Community', 'Wearables', 'Coach Tools', 'Enterprise']
  const competitors = [
    { name: 'Prometheus', checks: [true, true, true, true, true, true, true, true, true, true, true], highlight: true },
    { name: 'Strong', checks: [false, false, false, true, false, false, false, false, false, false, false] },
    { name: 'Hevy', checks: [false, false, false, true, false, false, false, true, false, false, false] },
    { name: 'Fitbod', checks: [true, true, false, true, false, false, false, false, true, false, false], note: 'ML-based, not conversational AI' },
    { name: 'TrainHeroic', checks: [false, false, false, true, false, false, false, false, false, true, false] },
    { name: 'Metric VBT', checks: [false, false, true, true, false, false, false, false, true, true, false] },
    { name: 'RepCount', checks: [false, false, false, false, false, false, false, false, false, false, false] },
    { name: 'MyFitnessPal', checks: [false, false, false, true, false, true, false, true, false, false, false] },
  ]

  return (
    <Section id="why-we-win" className="bg-white/[0.01]">
      <SectionHeader
        label="Why We Win"
        title="Defensible Moats."
        titleAccent="Zero Overlap."
      />

      {/* Moat Pillars — compact */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
        {moats.map((m, i) => (
          <div key={i} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <div className={`h-1 bg-gradient-to-r ${m.gradient}`} />
            <div className="p-5">
              <div className={`w-10 h-10 bg-gradient-to-br ${m.gradient} rounded-xl flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(230,126,34,0.12)]`}>
                <m.icon size={20} className="text-dark" />
              </div>
              <h3 className="font-['Arimo'] text-sm font-bold uppercase mb-2">{m.title}</h3>
              <p className="text-[#999] text-xs leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Competition Matrix */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="text-left py-4 px-4 text-[#999] font-medium">Feature</th>
              {competitors.map((c, i) => (
                <th
                  key={i}
                  className={`py-4 px-3 text-center font-bold ${
                    c.highlight ? 'text-accent' : 'text-[#999] font-medium'
                  }`}
                >
                  {c.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f, fi) => (
              <tr key={fi} className="border-b border-white/[0.05]">
                <td className="py-3.5 px-4 text-gray-300">{f}</td>
                {competitors.map((c, ci) => (
                  <td key={ci} className="py-3.5 px-3 text-center">
                    {c.checks[fi] ? (
                      <Check size={18} className={`mx-auto ${c.highlight ? 'text-accent' : 'text-green-400'}`} />
                    ) : (
                      <X size={18} className="mx-auto text-[#444]" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-lg sm:text-xl font-bold mt-10 font-['Arimo'] uppercase">
        10 out of 10 features. <span className="text-accent">Nobody else comes close.</span>
      </p>
    </Section>
  )
}

// ─── 9. Market Opportunity ──────────────────────────────────────────────────────

function MarketSection() {
  const [ref, isVisible] = useScrollAnimation(0.1)

  const bars = [
    { label: 'TAM', value: '$6.3B+', desc: 'Fitness Apps + Coaching Software', width: '100%' },
    { label: 'SAM', value: '$1.8B', desc: 'EU + English-Speaking Markets', width: '29%' },
    { label: 'SOM', value: '$45M', desc: '3-Year Target', width: '7%' },
  ]

  const metrics = [
    { value: '40%+', label: 'VBT CAGR' },
    { value: '300K+', label: 'Sports Clubs in EU' },
    { value: '135', label: 'GTM Channels (Sports)' },
  ]

  return (
    <section id="market" ref={ref} className="py-24 lg:py-32 relative z-10">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          label="Market"
          title="A Massive,"
          titleAccent="Growing Market."
        />

        {/* TAM/SAM/SOM bars */}
        <div className="max-w-4xl mx-auto mb-16 space-y-4">
          {bars.map((b, i) => (
            <div key={i}>
              <div className="flex items-baseline justify-between mb-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-accent font-bold text-sm uppercase">{b.label}</span>
                  <span className="text-white font-extrabold text-xl font-['Arimo']">{b.value}</span>
                </div>
                <span className="text-[#999] text-xs hidden sm:block">{b.desc}</span>
              </div>
              <div className="w-full bg-white/[0.04] backdrop-blur-lg border border-white/[0.08] rounded-lg h-10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: b.width } : {}}
                  transition={{ duration: 1.2, delay: i * 0.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-lg"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Metric Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              <div className="text-3xl font-extrabold text-accent font-['Arimo'] mb-2">{m.value}</div>
              <div className="text-[#999] text-sm">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 10. Business Model ─────────────────────────────────────────────────────────

function BusinessModelSection() {
  const streams = [
    {
      icon: Smartphone,
      title: 'B2C — Athlete App',
      avg: '$7.61',
      avgLabel: '∅ ARPU/mo',
      tiers: [
        { name: 'Free', price: '$0', desc: 'Core tracking' },
        { name: 'Premium', price: '$5.90/mo', desc: '$59/yr' },
        { name: 'Elite', price: '$9.90/mo', desc: '$99/yr' },
        { name: 'Titan', price: '$199', desc: 'Lifetime (500 limit)', accent: true },
      ],
    },
    {
      icon: Monitor,
      title: 'B2B — Coach Platform',
      note: 'Free full-version mobile app for every coach',
      avg: '€72',
      avgLabel: '∅ Coach/mo',
      tiers: [
        { name: 'Basic 10', price: '€29/mo', desc: '10 clients' },
        { name: 'Basic 25', price: '€49/mo', desc: '25 clients' },
        { name: 'Pro 10', price: '€69/mo', desc: '10 clients + AI' },
        { name: 'Pro 50', price: '€149/mo', desc: '50 clients + AI' },
      ],
    },
    {
      icon: Building2,
      title: 'B2B — Enterprise / Gym',
      avg: '$99',
      avgLabel: '∅ Gym/mo',
      tiers: [
        { name: 'Basic', price: '$49/mo', desc: '100 members' },
        { name: 'Premium', price: '$89/mo', desc: '500 members', accent: true },
        { name: 'VIP', price: '$149/mo', desc: 'Unlimited + branding' },
      ],
    },
  ]

  return (
    <Section id="business-model">
      <SectionHeader
        label="Business Model"
        title="Multiple Revenue Streams."
        titleAccent="Clear Unit Economics."
      />

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {streams.map((s, i) => (
          <div key={i} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-accent/[0.08] backdrop-blur-sm border border-accent/15 rounded-lg flex items-center justify-center">
                <s.icon size={20} className="text-accent" />
              </div>
              <div className="text-right">
                <div className="text-accent font-extrabold text-lg font-['Arimo']">{s.avg}</div>
                <div className="text-[#666] text-[10px] uppercase tracking-wider">{s.avgLabel}</div>
              </div>
            </div>
            <h3 className="font-['Arimo'] text-lg font-bold uppercase mb-2">{s.title}</h3>
            {s.note && (
              <p className="text-accent text-xs font-semibold mb-4 flex items-center gap-1.5">
                <Gift size={12} />
                {s.note}
              </p>
            )}
            <div className="space-y-2.5 mt-4">
              {s.tiers.map((t, j) => (
                <div key={j} className={`flex justify-between items-center py-2 px-3 rounded-lg ${t.accent ? 'bg-accent/[0.08] border border-accent/20' : 'border-b border-white/[0.06] last:border-0'}`}>
                  <div>
                    <span className="text-white text-sm font-medium">{t.name}</span>
                    <span className="text-[#666] text-xs ml-2">{t.desc}</span>
                  </div>
                  <span className={`font-bold text-sm ${t.accent ? 'text-accent' : 'text-white'}`}>{t.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Unit Economics */}
      <div className="grid sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[
          { value: '$7.90', label: 'CAC', desc: 'Cost per Paying User' },
          { value: '$137', label: 'LTV', desc: '18-Month Retention' },
          { value: '17:1', label: 'LTV:CAC', desc: 'Extremely Healthy' },
          { value: '< 2 Mo', label: 'Payback', desc: 'CAC Payback Period' },
        ].map((m, i) => (
          <div key={i} className="bg-white/[0.04] backdrop-blur-xl border border-accent/20 rounded-2xl p-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_20px_rgba(230,126,34,0.05)]">
            <div className="text-2xl font-extrabold text-accent font-['Arimo'] mb-1">{m.value}</div>
            <div className="text-white text-xs font-semibold uppercase tracking-wider mb-1">{m.label}</div>
            <div className="text-[#666] text-[11px]">{m.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  )
}

// ─── 12. Flywheel ───────────────────────────────────────────────────────────────

function FlywheelSection() {
  const loops = [
    {
      name: 'Growth',
      color: 'accent',
      steps: ['Athletes Join', 'Coaches Adopt', 'Gyms Integrate', 'More Athletes'],
      icons: [Users, Monitor, Building2, TrendingUp],
    },
    {
      name: 'Data',
      color: 'cyan-400',
      steps: ['More Data', 'Better AI', 'Better Coaching', 'More Retention'],
      icons: [Database, Brain, Bot, TrendingUp],
    },
    {
      name: 'Community',
      color: 'emerald-400',
      steps: ['Challenges', 'Badges Earned', 'Content Shared', 'Organic Growth'],
      icons: [Trophy, Award, MessageSquare, Users],
    },
  ]

  return (
    <Section id="flywheel" className="bg-white/[0.01]">
      <SectionHeader
        label="Network Effects"
        title="The Flywheel That"
        titleAccent="Compounds."
      />

      {/* Concentric flywheel visualization */}
      <div className="relative max-w-4xl mx-auto mb-16">
        {/* Center core */}
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-accent to-orange-500 flex items-center justify-center shadow-[0_0_60px_rgba(242,114,27,0.3)]">
              <div className="text-center">
                <Flame size={28} className="text-white mx-auto mb-1" />
                <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Prometheus</span>
              </div>
            </div>
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full border border-accent/20 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="absolute -inset-4 rounded-full border border-accent/10 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
          </div>
        </div>

        {/* Three loops as connected cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {loops.map((loop, li) => {
            const borderColor = li === 0 ? 'border-accent/30 hover:border-accent/50' : li === 1 ? 'border-cyan-400/30 hover:border-cyan-400/50' : 'border-emerald-400/30 hover:border-emerald-400/50'
            const labelColor = li === 0 ? 'text-accent' : li === 1 ? 'text-cyan-400' : 'text-emerald-400'
            const bgGlow = li === 0 ? 'from-accent/10' : li === 1 ? 'from-cyan-400/10' : 'from-emerald-400/10'
            const iconBorder = li === 0 ? 'border-accent/20' : li === 1 ? 'border-cyan-400/20' : 'border-emerald-400/20'
            const iconColor = li === 0 ? 'text-accent' : li === 1 ? 'text-cyan-400' : 'text-emerald-400'
            const lineColor = li === 0 ? 'bg-accent/30' : li === 1 ? 'bg-cyan-400/30' : 'bg-emerald-400/30'
            const topBar = li === 0 ? 'from-accent to-orange-400' : li === 1 ? 'from-cyan-400 to-teal-500' : 'from-emerald-400 to-green-500'

            return (
              <div key={li} className={`relative bg-gradient-to-b ${bgGlow} to-transparent border ${borderColor} rounded-2xl p-6 transition-all duration-300`}>
                {/* Top accent bar */}
                <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${topBar} rounded-b`} />

                <h4 className={`text-sm font-bold uppercase tracking-wider ${labelColor} mb-6 text-center`}>
                  {loop.name} Loop
                </h4>

                <div className="space-y-0">
                  {loop.steps.map((step, si) => {
                    const Icon = loop.icons[si]
                    return (
                      <div key={si}>
                        <div className="flex items-center gap-3 py-3">
                          <div className={`w-10 h-10 shrink-0 bg-white/[0.04] border ${iconBorder} rounded-xl flex items-center justify-center`}>
                            <Icon size={18} className={iconColor} />
                          </div>
                          <span className="text-sm text-gray-300 font-medium">{step}</span>
                        </div>
                        {si < 3 && (
                          <div className="flex justify-center py-1">
                            <div className={`w-0.5 h-4 ${lineColor} rounded-full`} />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Loop arrow indicator */}
                <div className="flex justify-center mt-4">
                  <div className={`px-3 py-1.5 rounded-full border ${iconBorder} bg-white/[0.02]`}>
                    <RefreshCw size={14} className={`${iconColor} animate-spin`} style={{ animationDuration: '8s' }} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom summary */}
        <div className="mt-10 text-center">
          <p className="text-[#999] text-sm max-w-2xl mx-auto">
            Three self-reinforcing loops — each one accelerates the others. More users generate more data, better AI drives retention, and community engagement fuels organic growth. <span className="text-white font-medium">A compounding moat that widens with every session.</span>
          </p>
        </div>
      </div>
    </Section>
  )
}

// ─── 12b. Go-to-Market & Partner Network ─────────────────────────────────────

function GoToMarketSection() {
  const partners = [
    { name: 'Julia Föry', handle: '@juliafoery', followers: '119K', role: 'Promo Influencer', detail: 'IFBB Pro', color: 'text-pink-400', tier: 'influencer' },
    { name: 'Manuel Schiltknecht', handle: '@manustatic993', followers: '34.1K', role: 'Founding Coach + Promo Influencer', detail: 'Calisthenics / Street Workout', color: 'text-green-400', tier: 'multi' },
    { name: 'Bardogs Zürich', handle: '@bardogs_zuerich', followers: '11.7K', role: 'Founding Gym + Promoter', detail: 'Street Workout Family, Zürich', color: 'text-purple-400', tier: 'gym' },
    { name: 'Maria Htee', handle: '@maria_htee', followers: '14.6K', role: 'Founding Coach + Influencer', detail: 'Powerlifting, Thailand', color: 'text-accent', tier: 'coach' },
    { name: 'Rolf Fongué', handle: '@r.m.fongue', followers: '7.9K', role: 'Founding Coach + Influencer', detail: 'Football Speed Coach, Ex-Pro Sprinter', color: 'text-blue-400', tier: 'coach' },
    { name: 'Nextlevel Sports Club', handle: '@nextlevel_sportsclub', followers: '5.4K', role: 'Founding Gym + Coaches', detail: 'Premium PT & Group Classes, Zürich', color: 'text-purple-400', tier: 'gym' },
    { name: 'Daniele Pauli', handle: '@paulidaniele', followers: '3.7K', role: 'CEO + Promo Influencer', detail: 'World Champ Powerlifter, Strength Wars 4.5M+', color: 'text-accent', tier: 'founder' },
    { name: 'Chloé Borge', handle: '@chloeborge', followers: '2.9K', role: 'Ambassador + Influencer + Early Investor', detail: 'Tutorial Videos, Women 40+ Coaching', color: 'text-rose-400', tier: 'ambassador' },
    { name: 'Flurina', handle: '@flurinaaf', followers: '1K', role: 'Ambassador', detail: 'Olympic Lifting, Session Promo Videos', color: 'text-cyan-400', tier: 'ambassador' },
    { name: 'Hirschkraft', handle: '@hirschkraft', followers: '545', role: 'Founding Gym + Coaches', detail: 'Sportverein, Freienbach SZ', color: 'text-emerald-400', tier: 'gym' },
    { name: 'TigerFitness', handle: '@tigerfitness.ch', followers: '324', role: 'Equipment Partner', detail: 'Indoor/Outdoor Gym Builder since 2017', color: 'text-yellow-400', tier: 'equipment' },
  ]

  const channels = [
    {
      icon: UserPlus,
      title: 'Founding Coach Program',
      desc: '100 online coaches get free access to the Coach Web App. Each coach brings 10–50 athletes. Viral B2B2C growth at zero CAC.',
      metric: '100 coaches → 1,000–5,000 athletes',
      color: 'text-accent',
      borderColor: 'border-accent/20',
    },
    {
      icon: Handshake,
      title: 'Partner Referral Network',
      desc: 'Business partners onboard coaches and gyms for 20% recurring commission. Self-sustaining sales channel that scales without headcount.',
      metric: '20% recurring lifetime commission',
      color: 'text-blue-400',
      borderColor: 'border-blue-400/20',
    },
    {
      icon: Megaphone,
      title: 'Influencer & Ambassador Program',
      desc: 'Athletes with real audiences promote Prometheus authentically. From IFBB Pros (119K) to niche calisthenics creators — credibility over reach.',
      metric: '216K+ combined reach at launch',
      color: 'text-pink-400',
      borderColor: 'border-pink-400/20',
    },
    {
      icon: Globe,
      title: 'Golf Market Entry — Asia',
      desc: 'Sponsorship deals with top young golf talent: Kartik Singh (India, turned pro at 16) and Teerawut Boonseeor (Thailand, top 5 age category, national team). 50% commission — Prometheus grows with them.',
      metric: 'Contracts in final negotiation',
      color: 'text-green-400',
      borderColor: 'border-green-400/20',
    },
  ]

  return (
    <Section id="go-to-market" className="bg-white/[0.01]">
      <SectionHeader
        label="Go-to-Market"
        title="Where the Users"
        titleAccent="Come From."
        subtitle="A multi-channel acquisition engine built on real partnerships — not just ad spend. Every channel reinforces the others."
      />

      {/* Acquisition Channels */}
      <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
        {channels.map((ch, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className={`bg-white/[0.04] backdrop-blur-xl border ${ch.borderColor} rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/[0.06] transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 bg-white/[0.04] border ${ch.borderColor} rounded-xl flex items-center justify-center`}>
                <ch.icon size={20} className={ch.color} />
              </div>
              <h4 className="font-bold text-white text-sm">{ch.title}</h4>
            </div>
            <p className="text-[#999] text-sm leading-relaxed mb-3">{ch.desc}</p>
            <div className={`text-xs font-semibold ${ch.color}`}>{ch.metric}</div>
          </motion.div>
        ))}
      </div>

      {/* Partner Network Table */}
      <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] max-w-5xl mx-auto mb-12">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-['Arimo'] font-bold uppercase text-lg">Launch Partner Network</h3>
          <span className="text-accent font-extrabold font-['Arimo']">216K+ Reach</span>
        </div>
        <p className="text-[#999] text-xs mb-6">Signed and active — ready for launch day</p>

        <div className="space-y-2">
          {partners.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex items-center justify-between py-2.5 px-4 rounded-xl border border-white/[0.06] hover:border-white/[0.12] transition-all"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  p.tier === 'influencer' ? 'bg-pink-400' :
                  p.tier === 'coach' ? 'bg-accent' :
                  p.tier === 'gym' ? 'bg-purple-400' :
                  p.tier === 'ambassador' ? 'bg-cyan-400' :
                  p.tier === 'founder' ? 'bg-accent' :
                  p.tier === 'multi' ? 'bg-green-400' :
                  'bg-yellow-400'
                }`} />
                <div className="min-w-0">
                  <span className="text-white text-sm font-medium">{p.name}</span>
                  <span className="text-[#666] text-xs ml-2 hidden sm:inline">{p.handle}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[#666] text-xs hidden md:block whitespace-nowrap">{p.role}</span>
                <span className={`font-bold text-sm ${p.color}`}>{p.followers}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-white/[0.06] flex flex-wrap gap-4">
          {[
            { color: 'bg-pink-400', label: 'Influencer' },
            { color: 'bg-accent', label: 'Founding Coach' },
            { color: 'bg-purple-400', label: 'Founding Gym' },
            { color: 'bg-cyan-400', label: 'Ambassador' },
            { color: 'bg-green-400', label: 'Multi-Role' },
            { color: 'bg-yellow-400', label: 'Equipment' },
          ].map((l, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${l.color}`} />
              <span className="text-[#666] text-[10px]">{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Flywheel Summary */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-[#999] text-sm leading-relaxed">
          <span className="text-white font-medium">The growth engine is already running.</span> Coaches onboard athletes. Athletes invite athletes. Gyms bring entire communities. Partners earn recurring revenue and keep selling. Every channel feeds the next — and none of them require a sales team.
        </p>
      </div>
    </Section>
  )
}

// ─── 13. Growth Projection ───────────────────────────────────────────────────────

function GrowthProjectionSection() {
  const [ref, isVisible] = useScrollAnimation(0.1)

  const years = [
    { year: 'Y1', users: '8K', coaches: '150', gyms: '8', mrr: '$74K', arr: '$888K', highlight: true },
    { year: 'Y2', users: '30K', coaches: '400', gyms: '25', mrr: '$262K', arr: '$3.1M' },
    { year: 'Y3', users: '100K', coaches: '800', gyms: '55', mrr: '$829K', arr: '$9.9M' },
    { year: 'Y4', users: '280K', coaches: '1.2K', gyms: '90', mrr: '$2.2M', arr: '$26.5M' },
    { year: 'Y5', users: '600K', coaches: '1.7K', gyms: '125', mrr: '$4.7M', arr: '$56.8M' },
    { year: 'Y6', users: '1M', coaches: '2K', gyms: '150', mrr: '$7.8M', arr: '$93.6M', target: true },
  ]

  return (
    <section id="growth" ref={ref} className="py-24 lg:py-32 relative z-10">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <SectionHeader
          label="Growth Model"
          title="The Path to"
          titleAccent="1 Million Users."
          subtitle="6-year projection based on realistic conversion rates, proven ARPU, and compounding network effects."
        />

        {/* ARR Visual Bars */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="grid grid-cols-6 gap-3 items-end h-64 mb-4">
            {years.map((y, i) => {
              const heights = [4, 10, 22, 42, 72, 100]
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={isVisible ? { height: `${heights[i]}%` } : {}}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeOut' }}
                  className={`rounded-t-xl relative group cursor-default ${
                    y.target
                      ? 'bg-gradient-to-t from-accent to-accent/70 shadow-[0_0_30px_rgba(230,126,34,0.3)]'
                      : y.highlight
                        ? 'bg-gradient-to-t from-accent/60 to-accent/30 border border-accent/30'
                        : 'bg-gradient-to-t from-white/[0.08] to-white/[0.04] border border-white/[0.08]'
                  }`}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className={`text-xs font-bold ${y.target ? 'text-accent' : 'text-[#999]'}`}>{y.arr}</span>
                  </div>
                </motion.div>
              )
            })}
          </div>
          <div className="grid grid-cols-6 gap-3">
            {years.map((y, i) => (
              <div key={i} className="text-center">
                <span className={`text-sm font-bold ${y.highlight ? 'text-accent' : y.target ? 'text-accent' : 'text-white'}`}>{y.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full min-w-[700px] text-sm table-fixed">
            <colgroup>
              <col className="w-[180px]" />
              {years.map((_, i) => <col key={i} />)}
            </colgroup>
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 px-4 text-[#999] font-medium">Metric</th>
                {years.map((y, i) => (
                  <th key={i} className={`py-3 px-2 text-center font-bold ${y.highlight || y.target ? 'text-accent' : 'text-[#999]'}`}>
                    {y.year}
                    {y.highlight && <span className="block text-[10px] text-accent/70 font-normal">18mo target</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { label: 'Paying App Users', key: 'users', icon: Users },
                { label: 'Coaches', key: 'coaches', icon: Monitor },
                { label: 'Gyms', key: 'gyms', icon: Building2 },
                { label: 'MRR', key: 'mrr', icon: TrendingUp },
                { label: 'ARR', key: 'arr', icon: BarChart3 },
              ].map((row, ri) => (
                <tr key={ri} className="border-b border-white/[0.05]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <row.icon size={14} className="text-accent/50" />
                      <span className="text-gray-300">{row.label}</span>
                    </div>
                  </td>
                  {years.map((y, i) => (
                    <td key={i} className={`py-3 px-2 text-center font-medium ${
                      row.key === 'arr' ? 'font-bold' : ''
                    } ${y.highlight || y.target ? 'text-white' : 'text-[#999]'}`}>
                      {y[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

// ─── 14. Data Asset ──────────────────────────────────────────────────────────────

function DataAssetSection() {
  const [ref, isVisible] = useScrollAnimation(0.1)
  const [activeTier, setActiveTier] = useState(null)

  const dataCategories = [
    { icon: Users, label: 'User Profile & Medical', points: '25+ fields', detail: 'Injuries, allergies, conditions, goals', color: 'text-blue-400' },
    { icon: Dumbbell, label: 'Workout Sessions & Sets', points: '27+ fields', detail: 'Volume, RPE, mood, energy per session + weight, reps, video per set', color: 'text-accent' },
    { icon: Activity, label: 'VBT Velocity & Load', points: '~65 metrics', detail: 'Velocity, power, ROM, bar path, fatigue, auto 1RM, ACWR', color: 'text-green-400' },
    { icon: Eye, label: 'Biomechanical / Golf', points: '6+ kinematic metrics', detail: 'Hip/shoulder rotation, X-factor, spine angle — markerless', color: 'text-purple-400' },
    { icon: ShoppingCart, label: 'Nutrition', points: '30+ micro/macros', detail: 'Per meal tracking, UPF scoring, hydration, anabolic window', color: 'text-cyan-400' },
    { icon: Bot, label: 'AI Coach', points: 'Full history', detail: 'Conversations, attachments (DEXA, lab results), recommendations', color: 'text-pink-400' },
    { icon: Video, label: 'Video & Media', points: '6 storage buckets', detail: 'VBT videos, form analysis, meal photos, progress photos (4 angles)', color: 'text-yellow-400' },
    { icon: Heart, label: 'Health Connect', points: 'HRV, VO2Max, sleep', detail: 'Heart rate, body fat, sleep phases — wearable integration', color: 'text-red-400' },
    { icon: Trophy, label: 'Competition', points: '4 tables', detail: 'Attempts, judge decisions, IPF GL / Wilks / Dots / Sinclair scoring', color: 'text-amber-400' },
    { icon: MessageCircle, label: 'Coach Feedback', points: '5 tables', detail: 'Reviews, set feedback, video annotations, audio notes', color: 'text-indigo-400' },
    { icon: Gift, label: 'Referral & Social', points: '6 tables', detail: 'Conversion funnel, platform tracking, partner commissions', color: 'text-teal-400' },
    { icon: Gauge, label: 'Pre-Workout Readiness', points: '6 scores', detail: 'Energy, sleep quality, nutrition, stress — subjective + objective', color: 'text-lime-400' },
  ]

  const dataTiers = [
    {
      tier: 'Tier 1',
      label: 'Commodity',
      color: 'from-gray-500 to-gray-600',
      borderColor: 'border-gray-500/30',
      bgColor: 'bg-gray-500/10',
      value: '$5–$25',
      type: 'Workout logs, calories, steps',
      prometheus: 'Nutrition logs, basic sets',
    },
    {
      tier: 'Tier 2',
      label: 'Behavioral',
      color: 'from-blue-400 to-blue-500',
      borderColor: 'border-blue-400/30',
      bgColor: 'bg-blue-400/10',
      value: '$50–$200',
      type: 'Adherence patterns, AI chat logs',
      prometheus: 'AI Coach conversations, engagement data',
    },
    {
      tier: 'Tier 3',
      label: 'Biometric',
      color: 'from-accent to-orange-400',
      borderColor: 'border-accent/30',
      bgColor: 'bg-accent/10',
      value: '$50–$500',
      type: 'HRV, power output, recovery scores',
      prometheus: 'VBT velocity, readiness, ACWR',
    },
    {
      tier: 'Tier 4',
      label: 'Biomechanical',
      color: 'from-purple-400 to-violet-500',
      borderColor: 'border-purple-400/30',
      bgColor: 'bg-purple-400/10',
      value: '$500–$2,000',
      type: '3D motion capture, swing kinematics',
      prometheus: 'MOSSE tracking, golf pose, video form analysis',
      highlight: true,
    },
  ]

  const comparables = [
    { name: 'MyFitnessPal', metric: '$5.94/user', context: 'Acquisition 2015 — food logging only', tier: 1 },
    { name: 'Peloton', metric: '$443/user', context: 'Implied valuation (public market)', tier: 2 },
    { name: 'Whoop', metric: '$300/user/yr', context: 'Subscription ARPU + $2K implied (Oura)', tier: 3 },
    { name: 'TrackMan', metric: '$750M biz', context: 'Golf swing radar data alone', tier: 4 },
  ]

  const buyerSegments = [
    { buyer: 'Pharma (GLP-1 Trials)', want: 'Strength adaptation + nutrition compliance', pay: '$75K–$100K/yr license' },
    { buyer: 'Insurance', want: 'Injury risk prediction', pay: '$1,000+/user incentive' },
    { buyer: 'AI Companies', want: 'Labeled video + pose training data', pay: '$500K+ for datasets' },
    { buyer: 'Corporate Wellness', want: 'Employee readiness (Whoop Unite model)', pay: '$300–$500/seat/yr' },
    { buyer: 'Equipment OEMs', want: 'Aggregated swing/lift biomechanics', pay: 'Research partnerships' },
    { buyer: 'Sports Federations', want: 'Performance monitoring at scale', pay: 'Government contracts' },
  ]

  const scenarios = [
    {
      label: 'Conservative',
      desc: 'Subscription + data licensing',
      color: 'text-gray-400',
      borderColor: 'border-gray-500/20',
      tiers: [
        { users: '10K', value: '$50', monthly: '$42K', annual: '$500K', valuation: '$2.5M' },
        { users: '100K', value: '$75', monthly: '$625K', annual: '$7.5M', valuation: '$37.5M' },
        { users: '500K', value: '$90', monthly: '$3.75M', annual: '$45M', valuation: '$225M' },
        { users: '1M', value: '$100', monthly: '$8.3M', annual: '$100M', valuation: '$500M' },
      ],
    },
    {
      label: 'Medium',
      desc: 'B2B data licensing + pharma/insurance',
      color: 'text-accent',
      borderColor: 'border-accent/20',
      tiers: [
        { users: '10K', value: '$200', monthly: '$167K', annual: '$2M', valuation: '$10M' },
        { users: '100K', value: '$300', monthly: '$2.5M', annual: '$30M', valuation: '$150M' },
        { users: '500K', value: '$350', monthly: '$14.6M', annual: '$175M', valuation: '$875M' },
        { users: '1M', value: '$400', monthly: '$33.3M', annual: '$400M', valuation: '$2B' },
      ],
    },
    {
      label: 'Aggressive',
      desc: 'Full biomechanical + AI training data + corporate',
      color: 'text-purple-400',
      borderColor: 'border-purple-400/20',
      tiers: [
        { users: '10K', value: '$500', monthly: '$417K', annual: '$5M', valuation: '$25M' },
        { users: '100K', value: '$750', monthly: '$6.25M', annual: '$75M', valuation: '$375M' },
        { users: '500K', value: '$900', monthly: '$37.5M', annual: '$450M', valuation: '$2.25B' },
        { users: '1M', value: '$1,000', monthly: '$83.3M', annual: '$1B', valuation: '$5B' },
      ],
    },
  ]

  return (
    <section id="data-asset" ref={ref} className="py-24 lg:py-32 relative z-10">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <SectionHeader
          label="The Data Moat"
          title="Every User Builds a"
          titleAccent="200+ Datapoint Asset."
          subtitle="227 Supabase tables, 23 database functions, 6 storage buckets, and the richest biomechanical dataset in consumer fitness — collected from every user, not just coaches."
        />

        {/* ── Total Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {[
            { value: '227', label: 'Database Tables', icon: Database },
            { value: '200+', label: 'Datapoints/User', icon: Layers },
            { value: '6', label: 'Storage Buckets', icon: Video },
            { value: '~65', label: 'VBT Metrics Alone', icon: Activity },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="text-center p-4 bg-white/[0.03] border border-white/[0.06] rounded-xl"
            >
              <s.icon size={20} className="text-accent mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-white">{s.value}</div>
              <div className="text-xs text-[#999]">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* ── What We Track ── */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-white mb-6 text-center">What We Track</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {dataCategories.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.04 }}
                className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/[0.12] transition-colors"
              >
                <cat.icon size={16} className={`${cat.color} shrink-0 mt-0.5`} />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white">{cat.label}</span>
                    <span className="text-[10px] text-accent font-medium bg-accent/10 px-1.5 py-0.5 rounded">{cat.points}</span>
                  </div>
                  <p className="text-xs text-[#777] mt-0.5">{cat.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Data Value Tiers ── */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-white mb-2 text-center">Data Value by Tier</h3>
          <p className="text-sm text-[#999] text-center mb-8">Not all fitness data is created equal. Prometheus collects across all four tiers.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-8">
            {dataTiers.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                onMouseEnter={() => setActiveTier(i)}
                onMouseLeave={() => setActiveTier(null)}
                className={`relative p-5 rounded-xl border transition-all duration-300 cursor-default ${
                  t.highlight
                    ? `${t.borderColor} ${t.bgColor} shadow-lg shadow-purple-500/10`
                    : `${t.borderColor} bg-white/[0.02] hover:bg-white/[0.04]`
                } ${activeTier === i ? 'scale-[1.02] shadow-xl' : ''}`}
              >
                {t.highlight && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-purple-500/20 border border-purple-400/30 rounded-full">
                    <span className="text-[10px] text-purple-400 font-bold uppercase">Prometheus Sweet Spot</span>
                  </div>
                )}
                <div className="mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${t.color} bg-clip-text text-transparent`}>{t.tier}</span>
                  <h4 className="text-lg font-bold text-white">{t.label}</h4>
                </div>
                <div className="text-2xl font-extrabold text-white mb-3">{t.value}<span className="text-xs text-[#999] font-normal ml-1">/user/yr</span></div>
                <p className="text-xs text-[#999] mb-1"><span className="text-[#666]">Industry:</span> {t.type}</p>
                <p className="text-xs text-accent"><span className="text-[#666]">Prometheus:</span> {t.prometheus}</p>
              </motion.div>
            ))}
          </div>

          {/* Comparables */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {comparables.map((c, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                <span className="text-sm font-bold text-white">{c.name}</span>
                <span className="text-xs text-accent font-semibold">{c.metric}</span>
                <span className="text-[10px] text-[#666]">{c.context}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Valuation Scenarios ── */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-white mb-2 text-center">Data Asset Valuation Scenarios</h3>
          <p className="text-sm text-[#999] text-center mb-2">Implied valuation at 5x annual data revenue — conservative by SaaS standards.</p>
          <p className="text-xs text-[#666] text-center mb-8 italic">Value/User/Yr reflects blended subscription and data licensing revenue at target scale.</p>

          <div className="space-y-6 max-w-5xl mx-auto">
            {scenarios.map((s, si) => (
              <motion.div
                key={si}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + si * 0.15 }}
                className={`border ${s.borderColor} rounded-xl overflow-hidden`}
              >
                <div className="px-5 py-3 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className={`text-sm font-bold ${s.color}`}>{s.label}</span>
                    <span className="text-xs text-[#666] ml-2">{s.desc}</span>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.05]">
                        <th className="text-left py-2.5 px-5 text-[#999] font-medium text-xs">Users</th>
                        <th className="text-center py-2.5 px-3 text-[#999] font-medium text-xs">Value/User/Yr</th>
                        <th className="text-center py-2.5 px-3 text-[#999] font-medium text-xs">Monthly</th>
                        <th className="text-center py-2.5 px-3 text-[#999] font-medium text-xs">Annual</th>
                        <th className="text-right py-2.5 px-5 text-[#999] font-medium text-xs">Implied Valuation (5x)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {s.tiers.map((t, ti) => (
                        <tr key={ti} className={`border-b border-white/[0.03] ${ti === 2 ? 'bg-white/[0.02]' : ''}`}>
                          <td className="py-2.5 px-5 font-medium text-white">{t.users}</td>
                          <td className="py-2.5 px-3 text-center text-[#999]">{t.value}</td>
                          <td className="py-2.5 px-3 text-center text-[#999]">{t.monthly}</td>
                          <td className="py-2.5 px-3 text-center font-semibold text-white">{t.annual}</td>
                          <td className={`py-2.5 px-5 text-right font-bold ${s.color}`}>{t.valuation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Why Prometheus Data Is Uniquely Valuable ── */}
        <div className="mb-20">
          <h3 className="text-xl font-bold text-white mb-8 text-center">Why This Data Is Uniquely Valuable</h3>
          <div className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              {
                title: 'Biomechanical data is extremely rare',
                desc: 'TrackMan built a $750M business on golf radar data alone. Prometheus captures similar kinematics — markerless, via smartphone, without $25K hardware.',
                icon: Eye,
                color: 'text-purple-400',
              },
              {
                title: 'VBT data barely exists in consumer fitness',
                desc: 'GymAware/Perch cost $2K–$3.5K per device and only serve pro sports. Prometheus democratizes this data — longitudinal, AI-linked, with performance outcomes.',
                icon: Activity,
                color: 'text-green-400',
              },
              {
                title: 'The combination is unprecedented',
                desc: 'No other provider has VBT + nutrition (30+ micros) + AI coaching conversations + video form analysis + readiness + competition scoring in one dataset per user.',
                icon: Database,
                color: 'text-cyan-400',
              },
              {
                title: 'Exponential value through cross-linking',
                desc: 'Each data layer makes the others more valuable. Nutrition × VBT × readiness × AI coaching creates a dataset no single-vertical app can replicate.',
                icon: Layers,
                color: 'text-accent',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-5 bg-white/[0.03] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-colors"
              >
                <item.icon size={20} className={`${item.color} mb-3`} />
                <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-[#999] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Buyer Segments ── */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-2 text-center">Concrete Buyer Segments</h3>
          <p className="text-sm text-[#999] text-center mb-8">Who pays for this data — and what they pay.</p>

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full min-w-[600px] text-sm max-w-4xl mx-auto">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left py-3 px-4 text-[#999] font-medium">Buyer</th>
                  <th className="text-left py-3 px-4 text-[#999] font-medium">What They Want</th>
                  <th className="text-right py-3 px-4 text-[#999] font-medium">What They Pay</th>
                </tr>
              </thead>
              <tbody>
                {buyerSegments.map((b, i) => (
                  <tr key={i} className="border-b border-white/[0.05]">
                    <td className="py-3 px-4 font-semibold text-white">{b.buyer}</td>
                    <td className="py-3 px-4 text-[#999]">{b.want}</td>
                    <td className="py-3 px-4 text-right text-accent font-medium">{b.pay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Bottom Line ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="max-w-3xl mx-auto p-8 bg-gradient-to-br from-accent/10 via-purple-500/5 to-transparent border border-accent/20 rounded-2xl text-center"
        >
          <Database size={28} className="text-accent mx-auto mb-4" />
          <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
            At 1M active users, Prometheus sits on a data asset worth <span className="text-accent">$100M–$1B/year</span>
          </h3>
          <p className="text-sm text-[#999] leading-relaxed max-w-xl mx-auto">
            The decisive lever: Prometheus collects Tier 4 biomechanical data — the most valuable category — on consumer hardware. Something that previously required $2K–$25K professional equipment.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

// ─── 15. The Ask ─────────────────────────────────────────────────────────────────

function TheAskSection() {
  const [ref, isVisible] = useScrollAnimation(0.1)

  const equityTiers = [
    { invest: '$50K', equity: '0.7%', valuation: '$7M' },
    { invest: '$100K', equity: '1.4%', valuation: '$7M' },
    { invest: '$250K', equity: '3.6%', valuation: '$7M' },
    { invest: '$500K', equity: '7.1%', valuation: '$7M' },
    { invest: '$1M', equity: '14.3%', valuation: '$7M', highlight: true },
  ]

  // Team & burn model
  const teamCosts = [
    { role: 'CEO & Founder', name: 'Daniele Pauli', monthly: '$7.5K', annual: '$90K' },
    { role: 'COO', name: 'Sjoerd Joosten', monthly: '$6.7K', annual: '$80K' },
    { role: 'EA & PM (30%)', name: 'Karin Känel', monthly: '$3.0K', annual: '$36K' },
    { role: 'CTO / Sr. Developer (30%)', name: 'New hire', monthly: '$2.6K', annual: '$31.5K', hire: true },
  ]

  // Investment allocation ($1M)
  const investmentFunds = [
    { label: 'Paid Ads & Marketing', amount: '$400K', pct: 40, desc: 'Meta, Google, YouTube — ~$22K/mo', color: 'bg-blue-400' },
    { label: 'Team & Operations', amount: '$365K', pct: 36, desc: '4 people × 18mo + infra', color: 'bg-accent' },
    { label: 'Field Sales & Events', amount: '$130K', pct: 13, desc: 'Gyms, trade shows, partnerships', color: 'bg-purple-400' },
    { label: 'Tech & Scaling', amount: '$55K', pct: 6, desc: 'Servers, APIs, App Stores', color: 'bg-green-400' },
    { label: 'Risk Reserve', amount: '$50K', pct: 5, desc: 'Buffer for volatility', color: 'bg-yellow-400' },
  ]

  // Combined marketing budget: $400K (investment) + $216K (revenue reinvestment) = $616K
  const marketingBudget = [
    { label: 'Meta Ads (Instagram & Facebook)', amount: '$277K', pct: 45, color: 'bg-blue-400' },
    { label: 'Google & YouTube Ads', amount: '$154K', pct: 25, color: 'bg-red-400' },
    { label: 'Influencer Partnerships', amount: '$92K', pct: 15, color: 'bg-pink-400' },
    { label: 'Content Production', amount: '$62K', pct: 10, color: 'bg-cyan-400' },
    { label: 'Events & Sponsoring', amount: '$31K', pct: 5, color: 'bg-purple-400' },
  ]

  // Tranche model
  const tranches = [
    {
      label: 'Tranche 1',
      timing: 'Day 0',
      amount: '$250K',
      milestones: 'Product live on Play Store, first 500 users, first revenue',
      color: 'border-accent/30 bg-accent/[0.06]',
    },
    {
      label: 'Tranche 2',
      timing: 'Month 6',
      amount: '$250K',
      milestones: '2,000 users, $10K MRR, 50 coaches onboarded',
      color: 'border-blue-400/30 bg-blue-400/[0.06]',
    },
    {
      label: 'Tranche 3',
      timing: 'Month 12',
      amount: '$300K',
      milestones: '5,000 users, $40K MRR, 100 coaches, enterprise pilots',
      color: 'border-purple-400/30 bg-purple-400/[0.06]',
    },
    {
      label: 'Tranche 4',
      timing: 'Month 18',
      amount: '$200K',
      milestones: '8,000 users, $74K MRR, 150 coaches, ARR run-rate $888K',
      color: 'border-green-400/30 bg-green-400/[0.06]',
    },
  ]

  // Revenue reinvestment model (conservative: ~$600K cumulative over 18mo, S-curve from $0→$74K MRR)
  // 60% of revenue reinvested = $360K, predominantly into ads
  const revenueAllocation = [
    { label: 'Paid Ads & Retargeting', amount: '$216K', pct: 60, desc: '60% of reinvestment into ads', color: 'bg-blue-400' },
    { label: 'Field Sales & Events', amount: '$54K', pct: 15, desc: 'Gym visits, trade shows', color: 'bg-purple-400' },
    { label: 'Content & Influencer', amount: '$36K', pct: 10, desc: 'Creator partnerships', color: 'bg-pink-400' },
    { label: 'Risk Reserve', amount: '$54K', pct: 15, desc: 'Buffer for volatility', color: 'bg-yellow-400' },
  ]

  const milestones = [
    { value: '8,000', label: 'Paying Users' },
    { value: '150', label: 'Coaches' },
    { value: '$74K', label: 'MRR' },
    { value: '$888K', label: 'ARR Run-Rate' },
  ]

  return (
    <section id="the-ask" ref={ref} className="py-24 lg:py-32 bg-white/[0.01] relative z-10">
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <SectionHeader
          label="The Ask"
          title="Seed Round."
          titleAccent="SAFE Note."
          subtitle="$1M in milestone-based tranches — capital deployed as traction is proven. $20K/mo burn gives 50+ months of pure runway. Revenue reinvestment creates a $890K+ total growth budget."
        />

        {/* Key Numbers Banner */}
        <div className="grid sm:grid-cols-4 gap-4 mb-12">
          {[
            { value: '$20K', label: 'Monthly Burn', desc: 'Team of 4 + infrastructure' },
            { value: '50+ Mo', label: 'Pure Runway', desc: 'On burn alone, before revenue' },
            { value: '4 Tranches', label: 'Milestone-Based', desc: 'Capital tied to traction' },
            { value: '$890K+', label: 'Total Growth Budget', desc: 'Investment + revenue' },
          ].map((m, i) => (
            <div key={i} className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              <div className="text-xl font-extrabold text-accent font-['Arimo'] mb-0.5">{m.value}</div>
              <div className="text-white text-xs font-semibold uppercase tracking-wider mb-0.5">{m.label}</div>
              <div className="text-[#666] text-[10px]">{m.desc}</div>
            </div>
          ))}
        </div>

        {/* Equity Structure */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/[0.04] backdrop-blur-xl border border-accent/20 rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <h3 className="font-['Arimo'] font-bold uppercase text-lg mb-1">Equity Structure</h3>
            <p className="text-[#999] text-xs mb-6">SAFE Note — $7M post-money valuation cap</p>
            <div className="space-y-2">
              {equityTiers.map((t, i) => (
                <div key={i} className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                  t.highlight
                    ? 'bg-accent/[0.12] border border-accent/30'
                    : 'border border-white/[0.06] hover:border-white/[0.12]'
                }`}>
                  <span className={`font-bold text-sm ${t.highlight ? 'text-accent' : 'text-white'}`}>{t.invest}</span>
                  <div className="flex items-center gap-6">
                    <span className="text-white font-bold text-sm">{t.equity}</span>
                    <span className="text-[#666] text-xs w-24 text-right">{t.valuation}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-between text-xs text-[#666]">
              <span>Investment</span>
              <span>Equity → Post-Money Valuation</span>
            </div>
          </div>

          {/* Tranche Model */}
          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-['Arimo'] font-bold uppercase text-lg">Milestone-Based Tranches</h3>
              <span className="text-accent font-extrabold font-['Arimo']">$1M</span>
            </div>
            <p className="text-[#999] text-xs mb-6">Capital deployed as traction is proven — full transparency, reduced risk</p>

            <div className="space-y-3">
              {tranches.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className={`border ${t.color} rounded-xl p-4`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-3">
                      <span className="text-white text-sm font-bold">{t.label}</span>
                      <span className="text-[#999] text-xs">{t.timing}</span>
                    </div>
                    <span className="text-accent font-extrabold font-['Arimo']">{t.amount}</span>
                  </div>
                  <p className="text-[#666] text-xs leading-relaxed">{t.milestones}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team & Burn Breakdown */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] mb-12">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-['Arimo'] font-bold uppercase text-lg">Team & Monthly Burn</h3>
            <span className="text-accent font-extrabold font-['Arimo']">$20K/mo</span>
          </div>
          <p className="text-[#999] text-xs mb-6">Lean team salaries — Swiss-based, globally competitive</p>
          <div className="space-y-2">
            {teamCosts.map((t, i) => (
              <div key={i} className={`flex items-center justify-between py-2.5 px-4 rounded-xl border ${t.hire ? 'border-accent/15 bg-accent/[0.03]' : 'border-white/[0.06]'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${t.hire ? 'bg-accent' : 'bg-white/30'}`} />
                  <div>
                    <span className="text-white text-sm font-medium">{t.role}</span>
                    <span className={`text-xs ml-2 ${t.hire ? 'text-accent/70' : 'text-[#666]'}`}>{t.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-white font-bold text-sm">{t.monthly}</span>
                  <span className="text-[#666] text-xs w-16 text-right">{t.annual}/yr</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between py-2.5 px-4 rounded-xl border border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-white text-sm font-medium">Infrastructure & Tools</span>
                <span className="text-[#666] text-xs ml-2">Cloud, APIs, subscriptions</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white font-bold text-sm">$0.25K</span>
                <span className="text-[#666] text-xs w-16 text-right">$3K/yr</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-between text-xs">
            <span className="text-[#666]">Total monthly burn</span>
            <span className="text-accent font-bold">$20K/mo → $241K/yr</span>
          </div>
        </div>

        {/* Investment Allocation Breakdown */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] mb-12">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-['Arimo'] font-bold uppercase text-lg">Capital Allocation</h3>
            <span className="text-accent font-extrabold font-['Arimo']">$1M</span>
          </div>
          <p className="text-[#999] text-xs mb-6">How the investment is deployed across 18 months</p>

          <div className="flex rounded-full h-3 overflow-hidden mb-5">
            {investmentFunds.map((f, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={isVisible ? { width: `${f.pct}%` } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                className={`${f.color} ${i === 0 ? 'rounded-l-full' : ''} ${i === investmentFunds.length - 1 ? 'rounded-r-full' : ''}`}
              />
            ))}
          </div>

          <div className="space-y-3">
            {investmentFunds.map((f, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${f.color}`} />
                  <div>
                    <span className="text-white text-sm font-medium">{f.label}</span>
                    <span className="text-[#666] text-xs ml-2 hidden sm:inline">{f.desc}</span>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-white font-bold text-sm">{f.amount}</span>
                  <span className="text-[#666] text-xs w-8 text-right">{f.pct}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Channel Breakdown */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-blue-400/20 rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] mb-12">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-['Arimo'] font-bold uppercase text-lg">Marketing Channel Mix</h3>
            <span className="text-blue-400 font-extrabold font-['Arimo']">$616K</span>
          </div>
          <p className="text-[#999] text-xs mb-6">$400K from investment + $216K from revenue reinvestment — deployed across proven channels</p>

          <div className="flex rounded-full h-3 overflow-hidden mb-5">
            {marketingBudget.map((f, i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={isVisible ? { width: `${f.pct}%` } : {}}
                transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                className={`${f.color} ${i === 0 ? 'rounded-l-full' : ''} ${i === marketingBudget.length - 1 ? 'rounded-r-full' : ''}`}
              />
            ))}
          </div>

          <div className="space-y-3">
            {marketingBudget.map((f, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${f.color}`} />
                  <span className="text-white text-sm font-medium">{f.label}</span>
                </div>
                <div className="text-right flex items-center gap-2">
                  <span className="text-white font-bold text-sm">{f.amount}</span>
                  <span className="text-[#666] text-xs w-8 text-right">{f.pct}%</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-white/[0.06] text-xs text-[#666]">
            ~$34K/mo blended across all channels — scaling with revenue milestones
          </div>
        </div>

        {/* Revenue Reinvestment Model */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-accent/20 rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] mb-12">
          <div className="h-1 bg-gradient-to-r from-accent to-blue-400 rounded-full -mt-6 mb-6 mx-[-1.5rem] sm:mx-[-2rem]" style={{ marginTop: '-2rem', borderRadius: '1rem 1rem 0 0', marginLeft: '-1px', marginRight: '-1px' }} />
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-['Arimo'] font-bold uppercase text-lg">Revenue Reinvestment</h3>
            <span className="text-accent text-xs font-semibold uppercase tracking-wider">The Compound Effect</span>
          </div>
          <p className="text-[#999] text-sm mb-8 max-w-3xl">
            60% of all revenue flows directly back into growth — predominantly ads. Conservative estimate: ~$600K cumulative revenue over 18 months (S-curve from $0 to $74K MRR).
            60% reinvested = $360K. Combined with $530K marketing & sales allocation from investment, this creates a <span className="text-white font-medium">$890K+ total growth budget</span>.
          </p>

          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-start">
            {/* Revenue Split */}
            <div>
              <div className="flex rounded-full h-3 overflow-hidden mb-5">
                {revenueAllocation.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ width: 0 }}
                    animate={isVisible ? { width: `${f.pct}%` } : {}}
                    transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                    className={`${f.color} ${i === 0 ? 'rounded-l-full' : ''} ${i === revenueAllocation.length - 1 ? 'rounded-r-full' : ''}`}
                  />
                ))}
              </div>
              <div className="space-y-2.5">
                {revenueAllocation.map((f, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2.5 h-2.5 rounded-full ${f.color}`} />
                      <div>
                        <span className="text-white text-sm font-medium">{f.label}</span>
                        <span className="text-[#666] text-xs ml-2 hidden sm:inline">{f.desc}</span>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <span className="text-white font-bold text-sm">{f.amount}</span>
                      <span className="text-[#666] text-xs w-8 text-right">{f.pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow / Separator */}
            <div className="hidden lg:flex flex-col items-center justify-center py-4">
              <div className="w-px h-full bg-white/[0.08]" />
            </div>

            {/* Totals */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#999] mb-4">Total 18-Month Spend Power</h4>
              {[
                { label: 'Marketing & Ads', from: '$400K', plus: '$216K', total: '$616K', color: 'text-blue-400' },
                { label: 'Field Sales & Events', from: '$130K', plus: '$54K', total: '$184K', color: 'text-purple-400' },
                { label: 'Content & Influencer', from: '—', plus: '$36K', total: '$36K', color: 'text-pink-400' },
              ].map((t, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-bold ${t.color}`}>{t.label}</span>
                    <span className="text-accent font-extrabold font-['Arimo']">{t.total}</span>
                  </div>
                  <div className="text-[11px] text-[#666]">
                    Investment: {t.from} + Revenue: {t.plus}
                  </div>
                </div>
              ))}
              <div className="bg-accent/[0.1] border border-accent/25 rounded-xl p-3 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white">Total Growth Budget</span>
                  <span className="text-accent font-extrabold text-lg font-['Arimo']">$890K+</span>
                </div>
                <div className="text-[11px] text-accent/70">$530K from investment + $360K from revenue reinvestment</div>
              </div>
            </div>
          </div>
        </div>

        {/* 18-Month Milestones */}
        <div className="text-center mb-8">
          <h3 className="font-['Arimo'] font-bold uppercase text-sm tracking-wider text-[#999] mb-6">18-Month Milestones — What We Deliver</h3>
        </div>
        <div className="grid sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {milestones.map((m, i) => (
            <div key={i} className="bg-white/[0.04] backdrop-blur-xl border border-accent/20 rounded-2xl p-5 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2),0_0_20px_rgba(230,126,34,0.05)]">
              <div className="text-2xl sm:text-3xl font-extrabold text-accent font-['Arimo'] mb-1">{m.value}</div>
              <div className="text-[#999] text-xs uppercase tracking-wider">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 15. Team ───────────────────────────────────────────────────────────────────

function TeamCard({ m }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 relative group hover:border-accent/20 hover:bg-white/[0.06] transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
      <div className={`absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r ${m.gradient} rounded-b opacity-50 group-hover:opacity-100 transition-opacity`} />
      {m.badge && (
        <div className="absolute top-4 right-4 px-2.5 py-1 bg-accent/[0.08] backdrop-blur-sm border border-accent/20 rounded-full">
          <span className="text-[10px] text-accent font-semibold uppercase tracking-wider">Advisor & Investor</span>
        </div>
      )}
      <div className="w-14 h-14 rounded-full overflow-hidden mb-3 ring-2 ring-dark-border group-hover:ring-accent/30 transition-all">
        <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
      </div>
      <h4 className="font-bold">{m.name}</h4>
      <p className="text-accent text-xs font-medium mb-2">{m.title}</p>
      <p className="text-[#999] text-xs leading-relaxed">{m.bio}</p>
      {m.bioExpanded && (
        <>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? 'max-h-[1200px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
            <p className="text-[#999] text-xs leading-relaxed whitespace-pre-line">{m.bioExpanded}</p>
          </div>
          <button onClick={() => setExpanded(!expanded)} className="mt-2 text-accent text-xs font-medium hover:text-accent/80 transition-colors cursor-pointer">
            {expanded ? '← Show less' : 'Read full story →'}
          </button>
        </>
      )}
    </div>
  )
}

function TeamSection() {
  const team = [
    { name: 'Daniele Pauli', title: 'CEO & Founder', bio: 'IPF World Champion. First Swiss gold in powerlifting — ever. 10× Swiss National Champion. 2× European Champion. Vice World Champion in weightlifting. #1 in the world — Supertotal Masters. Ranked 3rd globally in Strength Wars League.', bioExpanded: 'National records in three different countries. Marathon finisher. #1 in the world — Supertotal Masters, all weight classes combined. Unchallenged. Ranked 3rd globally in Strength Wars League — the largest internet battle series in strength sports history, with over 200 million views.\n\nOver 32 years and 14,000+ sessions, Daniele Pauli has trained Olympic bob teams, ZSC Lions — Switzerland\'s most decorated hockey franchise — the country\'s top recording artists, its most celebrated supermodels, and the executive leadership of Credit Suisse, UBS, and Bank Leumi — alongside individuals connected to the highest circles of global politics and philanthropy.\n\nBefore all that — and throughout — he has worked every layer of the fitness industry: from gym reception to leading gym teams, thousands of hours on the training floor, certified examiner for fitness professionals (Eidg. Fachausweis), and former Training Officer for Credit Suisse Health Management. He understands the business from the entrance counter to the boardroom.\n\nHe built his first fitness CRM in 2010. Developed the world\'s first 9-axis bar acceleration VBT prototype in 2017. Operational depth at every level of the industry, combined with software engineering.\n\nPrometheus is not a startup idea. It is 32 years of elite knowledge, forged in iron, finally unleashed on the world.', gradient: 'from-accent to-orange-400', image: '/images/team/daniele-pauli.png' },
    { name: 'Dr. Basil Achermann', title: 'Chief Science Officer', bio: 'Sport Science researcher from the University of Zurich, specializing in measurement methodology for acceleration-based training. Combines a 4-year IT apprenticeship with deep academic research — the rare scientist who can both design the experiment and write the code. Leads Prometheus Lab & R&D pipeline.', gradient: 'from-green-400 to-emerald-500', image: '/images/team/basil-achermann.png' },
    { name: 'Sjoerd Joosten', title: 'Chief Operating Officer', bio: 'Sport psychologist by training, hybrid athlete by nature — golf handicap 0, serious numbers in weightlifting and WOD training. Extensive experience leading talent sport schools and training high-level athletes. B2B specialist driving Prometheus into gyms, clinics, and enterprises across Europe.', gradient: 'from-accent to-orange-400', image: '/images/team/sjoerd-joosten.png' },
  ]

  const extended = [
    { name: 'Karin Känel', title: 'Executive Assistant & Project Manager', bio: '2× Swiss Champion U15/U17 Handball, 1× Vice Champion. Golf handicap 1. Trained Polymechanikerin (EFZ) with precision scientific instrumentation experience. Certified Technische Kauffrau — engineering discipline meets business acumen.', gradient: 'from-purple-400 to-violet-500', image: '/images/team/karin-kaenel.png' },
    { name: 'Sascha Tarone', title: 'Advisor & Early Investor', bio: 'Versatile entrepreneur with 20 years in financial analytics. Strategic consultant and early investor shaping Prometheus from business model to exit strategy.', gradient: 'from-cyan-400 to-teal-500', badge: true, image: '/images/team/sascha-tarone.png' },
    { name: 'Dr. Kevin Uram', title: 'Early Investor & Technical Advisor', bio: 'Physical Chemistry (University of Pittsburgh), former IBM Senior Technical Staff Member (12+ years), Managing Director at Lumileds semiconductor manufacturing (11+ years). Holds multiple US patents.', gradient: 'from-rose-400 to-pink-500', badge: true, image: '/images/team/kevin-uram.png' },
    { name: 'Chloe Borge', title: 'Ambassador & Master Athletics Lead', bio: 'Early investor who recognized Prometheus\'s potential from the start. Master\'s in Hospitality from a prestigious French school. 23 years full-contact Shotokan Karate — 3rd Dan, French National Team. Freestyle snowboarder, surfer, multiple-time 3rd place in France\'s and Switzerland\'s Fittest CrossFit Masters. 20 years at Vacheron Constantin in quality control. Founder of True You Coaching.', gradient: 'from-amber-400 to-yellow-500', badge: true, image: '/images/team/chloe-borge.png' },
  ]

  return (
    <Section id="team">
      <SectionHeader
        label="Team"
        title="Built by Scientists."
        titleAccent="Driven by Athletes."
      />

      {/* Swiss Precision Banner */}
      <div className="bg-white/[0.04] backdrop-blur-xl border border-accent/20 rounded-2xl p-6 mb-10 text-center shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="text-2xl">&#127464;&#127469;</span>
          <h3 className="font-['Arimo'] font-bold uppercase text-lg">Built in Switzerland. Data in Zürich.</h3>
        </div>
        <p className="text-[#999] text-sm max-w-2xl mx-auto leading-relaxed">
          Swiss-founded team with deep roots in engineering, sport science, and championship-level athletics.
          Peakforce GmbH is based in Zollikon near Zürich, and the database runs in a Zürich data centre.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        {team.map((m, i) => <TeamCard key={i} m={m} />)}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {extended.map((m, i) => <TeamCard key={i} m={m} />)}
      </div>

      <p className="text-center mt-8">
        <Link to="/#team" className="text-accent text-sm hover:underline inline-flex items-center gap-1">
          Full bios on homepage <ExternalLink size={14} />
        </Link>
      </p>
    </Section>
  )
}

// ─── 14. Roadmap ────────────────────────────────────────────────────────────────

function RoadmapSection() {
  const [ref, isVisible] = useScrollAnimation(0.1)

  const milestones = [
    { year: '2010', title: 'Founder builds first fitness CRM — domain expertise begins', heritage: true, done: true },
    { year: '2017', title: 'Founder develops 9-axis VBT prototype — vision takes shape', heritage: true, done: true },
    { year: '2024–25', title: 'Prometheus Ecosystem founded — R&D & Development', done: true },
    { year: '2026', title: 'Public Launch — Athlete App & Coach Software', current: true },
    { year: '2026 H2', title: 'Enterprise Launch & Clinic/Gym Partnerships' },
    { year: '2027', title: 'International Expansion & API Platform' },
    { year: '2028', title: 'Clinical Validation Studies & Medical Partnerships' },
  ]

  return (
    <section id="roadmap" ref={ref} className="py-24 lg:py-32 bg-white/[0.01] relative z-10">
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <SectionHeader
          label="Roadmap"
          title="From First CRM to"
          titleAccent="Clinical Validation."
        />

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/[0.08]" />
            <div className="grid grid-cols-7 gap-2">
              {milestones.map((m, i) => (
                <div key={i} className="relative">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center z-10 relative ${
                        m.current
                          ? 'bg-accent shadow-lg shadow-accent/30'
                          : m.done
                            ? 'bg-white/[0.06] backdrop-blur-xl border-2 border-accent/50'
                            : 'bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]'
                      }`}
                    >
                      {m.done ? (
                        <Check size={18} className="text-accent" />
                      ) : m.current ? (
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      ) : (
                        <Circle size={14} className="text-gray-600" />
                      )}
                    </div>
                  </div>
                  <div className="text-center px-1">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${m.heritage || m.current ? 'text-accent' : 'text-gray-600'}`}>
                      {m.heritage && '★ '}{m.year}
                    </span>
                    <p className={`text-sm mt-1 leading-snug ${m.current ? 'text-white font-semibold' : 'text-[#999]'}`}>
                      {m.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden space-y-0">
          {milestones.map((m, i) => (
            <div
              key={i}
              className={`flex gap-4 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
              }`}
              style={{ transitionDelay: isVisible ? `${i * 80}ms` : '0ms' }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    m.current
                      ? 'bg-accent shadow-lg shadow-accent/30'
                      : m.done
                        ? 'bg-white/[0.06] backdrop-blur-xl border-2 border-accent/50'
                        : 'bg-white/[0.04] backdrop-blur-xl border border-white/[0.08]'
                  }`}
                >
                  {m.done ? (
                    <Check size={16} className="text-accent" />
                  ) : m.current ? (
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                  ) : (
                    <Circle size={12} className="text-gray-600" />
                  )}
                </div>
                {i < milestones.length - 1 && <div className="w-0.5 h-12 bg-white/[0.08]" />}
              </div>
              <div className="pb-8 pt-1.5">
                <span className={`text-xs font-semibold uppercase tracking-wider ${m.heritage || m.current ? 'text-accent' : 'text-gray-600'}`}>
                  {m.heritage && '★ '}{m.year}
                </span>
                <p className={`text-sm mt-0.5 ${m.current ? 'text-white font-semibold' : 'text-[#999]'}`}>
                  {m.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 15. CTA ────────────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <Section id="cta">
      <div className="text-center py-12">
        <h2 className="font-['Arimo'] text-4xl sm:text-5xl lg:text-6xl font-extrabold uppercase mb-10">
          <span className="text-accent">Let's Talk.</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <a
            href="mailto:management@prometheus.coach"
            className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-white font-bold rounded-xl text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_4px_30px_0px_#E67E22]"
          >
            <Mail size={20} />
            management@prometheus.coach
          </a>
          <a
            href="https://wa.me/66828133359"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/[0.04] backdrop-blur-xl border border-accent/30 text-white font-bold rounded-xl text-base transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0px_4px_30px_0px_rgba(230,126,34,0.3)]"
          >
            <MessageCircle size={20} className="text-green-400" />
            WhatsApp
          </a>
        </div>

        <div className="mt-12 space-y-2">
          <p className="text-[#999] text-sm font-medium">Peakforce GmbH — Zollikon, Switzerland</p>
          <p className="text-[#666] text-xs">Swiss-Founded. Science-Driven. Globally Minded.</p>
        </div>
      </div>
    </Section>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────────────────

export default function GrowthPitch() {
  const [authenticated, setAuthenticated] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === 'true'
  )

  useEffect(() => {
    document.title = 'Prometheus — Growth Pitch'
    return () => { document.title = 'Prometheus' }
  }, [])

  return (
    <AnimatePresence mode="wait">
      {!authenticated ? (
        <motion.div key="gate" exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <AccessGate onAccess={() => setAuthenticated(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="pitch"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-[#141414] text-white relative"
        >
          {/* Background gradient image — matching coaching software */}
          <div
            className="fixed inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: 'url(/images/gradient-bg-dark.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
            }}
          />
          <PitchNav />
          <HeroSection />
          <ProblemSection />
          <EcosystemSection />
          <CommunitySection />
          <NutritionSection />
          <AICoachSection />
          <CommandCenterSection />
          <WhyWeWinSection />

          <MarketSection />
          <BusinessModelSection />
          <FlywheelSection />
          <GoToMarketSection />
          <GrowthProjectionSection />
          <DataAssetSection />
          <TheAskSection />
          <TeamSection />
          <RoadmapSection />
          <CTASection />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
