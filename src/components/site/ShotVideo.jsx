import { useEffect, useRef, useState } from 'react'

/* A short, silent product loop inside a screenshot frame.
 *
 * The rules this keeps:
 * - The poster is the real screenshot and is what renders first, in the
 *   prerendered HTML, so nothing above the fold waits for a video byte. The
 *   video is an enhancement on top of a page that already works.
 * - Muted, playsinline, loop: the only combination every mobile browser will
 *   autoplay. No controls — it is an illustration, not a player.
 * - prefers-reduced-motion: the poster only. Same for data-saver.
 * - The <video> element is only mounted once the frame is near the viewport,
 *   so six loops on one page do not all download at once.
 *
 * Sources: `src` without extension; `${src}.webm` (VP9) and `${src}.mp4`
 * (H.264) must both exist, ~1600 px wide, a few seconds, well under 2 MB.
 */
export default function ShotVideo({ src, poster, alt, width, height, className = '' }) {
  const ref = useRef(null)
  const [mount, setMount] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    const saver = navigator.connection?.saveData
    if (mq?.matches || saver) return
    if (typeof IntersectionObserver === 'undefined') { setMount(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setMount(true); io.disconnect() } },
      { rootMargin: '300px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <img
        src={poster}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="w-full h-full object-cover block"
      />
      {mount && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={`${src}.webm`} type="video/webm" />
          <source src={`${src}.mp4`} type="video/mp4" />
        </video>
      )}
    </div>
  )
}
