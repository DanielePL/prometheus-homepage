import { useEffect, useRef } from 'react'

/* Reveal-on-scroll, driven by an IntersectionObserver that does nothing but
   add a class — the fade itself is the time-based CSS transition in index.css.
   Same reasoning as the hero: framer-motion's whileInView runs on rAF, which
   stalls in a throttled or backgrounded tab and leaves sections stranded at
   partial opacity. CSS keeps running.

   rootMargin pulls the trigger line 10% up from the bottom edge, so a section
   starts fading as it enters rather than once it is already well in view. */
export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.classList.add('is-visible')
        io.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}

/* Generous, airy section wrapper used across the site.

   `tone` is what breaks the scroll rhythm: 'default' is white paper,
   'raised' is the warm off-white second ground, and 'night' is the one dark
   block (final CTA + footer). Two adjacent sections never share a ground.
   'light' and 'dark' are accepted as aliases so older call sites keep working.
   `width` lets a section escape the 7xl column so not every block is the same
   measure — the single biggest reason a page reads as repetitive. */
const WIDTHS = {
  default: 'max-w-7xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-[110rem]',
  full: 'max-w-none',
}

const TONES = {
  default: '',
  light: '',
  raised: 'section-tint',
  night: 'section-night',
  dark: 'section-night',
}

export function Section({ id, className = '', children, tone = 'default', width = 'default', pad = true }) {
  return (
    <section
      id={id}
      className={`relative ${pad ? 'py-20 lg:py-28' : ''} px-5 sm:px-8 ${TONES[tone] ?? ''} ${className}`}
    >
      <div className={`${WIDTHS[width]} mx-auto`}>{children}</div>
    </section>
  )
}

/* Eyebrow pill + big display headline + optional subline.

   `accent` is the second half of the headline, set in muted grey at the same
   size. The two-tone headline carries the emphasis; the orange stays reserved
   for CTAs so it keeps its signal. */
export function SectionHeader({
  eyebrow, title, accent, subline, align = 'center', size = 'default', className = '',
}) {
  const ref = useReveal()
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const scale = size === 'large'
    ? 'text-4xl sm:text-5xl lg:text-6xl'
    : 'text-3xl sm:text-4xl lg:text-5xl'

  return (
    <div ref={ref} className={`reveal max-w-3xl ${alignment} ${className}`}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className={`display ${scale}`}>
        {title}{' '}
        {accent && <span className="display-soft">{accent}</span>}
      </h2>
      {subline && (
        <p className={`mt-5 text-lg text-muted leading-relaxed max-w-2xl ${
          align === 'center' ? 'mx-auto' : ''
        }`}>
          {subline}
        </p>
      )}
    </div>
  )
}

/* A reveal-on-scroll wrapper. `delay` is in seconds and stays deliberately
   small; `fade` skips the translate for elements that carry their own
   transform. */
export function Reveal({ children, delay = 0, className = '', y = 22, fade = false, style, ...rest }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`${fade ? 'reveal-fade' : 'reveal'} ${className}`}
      style={{
        ...style,
        '--reveal-delay': `${delay}s`,
        ...(fade ? null : { '--reveal-y': `${y}px` }),
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
