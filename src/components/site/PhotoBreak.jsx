import { useReveal } from './Section'

/* A photograph with a single line of display type over it.

   This exists for rhythm, not information: it interrupts a run of light
   card sections so the eye stops predicting what comes next, and it is the
   only dark stretch between the hero and the closing block. It carries no
   data and no numbers on purpose — the claim is a claim, the picture is a
   room, and neither pretends to be evidence.

   Inset with rounded corners from the tablet breakpoint up so it reads as an
   object on the white page; full-bleed on phones where a margin would just
   be a gutter.

   `focus` moves the crop (object-position) because the interesting part of a
   gym photo is rarely dead centre. */
export default function PhotoBreak({
  src, statement, accent, focus = 'center', height = 'h-[58vh] min-h-[400px] lg:h-[68vh]', bleed = false,
}) {
  const ref = useReveal()

  /* `bleed` (2026-10-03): no inset, no corners. The photograph runs edge to
     edge, its top takes over from the light page and its lower third
     dissolves into graphite — the ground of the dark zone that follows. */
  return (
    <section className={bleed ? '' : 'sm:px-8 py-4 sm:py-8'}>
      <div className={`relative ${height} flex items-center justify-center overflow-hidden ${bleed ? '' : 'sm:rounded-[2rem] max-w-[110rem] mx-auto'}`}>
        <img
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: focus }}
        />
        {/* Two stacked scrims so the type holds up over a bright patch. */}
        <div className="absolute inset-0 bg-night/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-night/30" />
        {bleed && (
          <>
            <div className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-tint to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-transparent to-graphite" aria-hidden="true" />
          </>
        )}

        <div ref={ref} className="reveal relative z-10 max-w-4xl mx-auto px-6 text-center">
          <p className="display text-3xl sm:text-4xl lg:text-5xl leading-[1.1] text-white">
            {statement}{' '}
            {accent && <span className="text-white/60 font-medium">{accent}</span>}
          </p>
        </div>
      </div>
    </section>
  )
}
