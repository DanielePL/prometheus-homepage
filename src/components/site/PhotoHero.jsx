/* The page opening used by /studios and /enterprise since 2026-10-02: a room
 * from the generated gym series, full-bleed, with the <h1> in white on a
 * scrim. Same recipe as the homepage hero (components/home/Hero.jsx), which
 * keeps its own file because its screenshot overlap is specific to it.
 *
 * `shot` optionally renders a product screenshot that rises out of the photo
 * into the white page below. Pages using this pass `overDark` to HomeNav.
 * Everything here is CSS-animated (hero-rise, photo-push): nothing above the
 * fold waits for JS.
 */
export default function PhotoHero({ photo, focus = 'center', eyebrow, title, accent, body, children, shot }) {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-white">
        <img
          src={photo}
          alt=""
          aria-hidden="true"
          width="1696"
          height="960"
          fetchPriority="high"
          className="photo-push absolute inset-0 -z-20 w-full h-full object-cover"
          style={{ objectPosition: focus }}
        />
        <div className="photo-scrim-hero absolute inset-0 -z-10" aria-hidden="true" />

        <div className={`max-w-7xl mx-auto px-5 sm:px-8 pt-36 lg:pt-48 ${shot ? 'pb-40 sm:pb-48 lg:pb-60' : 'pb-24 lg:pb-36'}`}>
          <div className="max-w-[54rem] hero-rise">
            <h1>
              <span className="eyebrow eyebrow-photo">{eyebrow}</span>
              <span className="block display text-[2.5rem] leading-[1.03] sm:text-6xl lg:text-[4.5rem]">
                {title}{' '}
                {accent && <span className="text-white/50 font-medium">{accent}</span>}
              </span>
            </h1>
            {body && <p className="mt-7 text-lg sm:text-xl text-white/72 leading-relaxed max-w-2xl">{body}</p>}
            {children}
          </div>
        </div>
      </section>

      {shot && (
        <div className="relative z-10 px-5 sm:px-8 -mt-28 sm:-mt-36 lg:-mt-44 pb-12 lg:pb-16">
          <div className="max-w-6xl mx-auto relative hero-rise" style={{ animationDelay: '0.15s' }}>
            <div className="absolute inset-x-[12%] top-1/4 bottom-0 bg-accent/20 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
            <div className="shot relative rounded-2xl overflow-hidden">
              <div className="shot-bar" aria-hidden="true"><i /><i /><i /></div>
              {shot}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
