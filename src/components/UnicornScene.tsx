import { useEffect, useState, type CSSProperties } from 'react'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * UnicornScene
 * ------------
 * Renders the "super unicorns" theme: a giant rainbow arc across the screen,
 * a flock of drifting pixies, and a pair of dragons flying across the sky.
 *
 * Layering:  fixed full-viewport, behind the UI (z-index 0).  Pointer events
 * are disabled so the scene never intercepts clicks.
 *
 * Lifecycle:
 *   - `active` controls a crossfade in/out (opacity transition).  We keep the
 *     scene mounted for ~700ms after deactivation so the fade completes, then
 *     unmount to free animation cost.
 *   - When the browser tab is hidden (`document.visibilityState === 'hidden'`)
 *     we pause every keyframe animation via the `.scene-paused` modifier.
 */
type UnicornSceneProps = {
  active: boolean
}

const FADE_MS = 700

export function UnicornScene({ active }: UnicornSceneProps) {
  // Keep the scene mounted briefly after deactivation so the opacity
  // transition has time to play out before we tear down the DOM.  Both
  // state flips happen inside scheduled callbacks (rAF / setTimeout) so we
  // never call setState synchronously from the effect body.
  const [mounted, setMounted] = useState(active)
  const [visible, setVisible] = useState(active)

  useEffect(() => {
    if (active) {
      // Two nested rAFs: frame 1 mounts the DOM with opacity 0, frame 2
      // flips opacity to 1 so the CSS transition has a starting state.
      let outer: number | null = null
      let inner: number | null = null
      outer = window.requestAnimationFrame(() => {
        setMounted(true)
        inner = window.requestAnimationFrame(() => setVisible(true))
      })
      return () => {
        if (outer !== null) window.cancelAnimationFrame(outer)
        if (inner !== null) window.cancelAnimationFrame(inner)
      }
    }

    // Deactivating: fade opacity first, then unmount after the transition.
    const raf = window.requestAnimationFrame(() => setVisible(false))
    const timer = window.setTimeout(() => setMounted(false), FADE_MS)
    return () => {
      window.cancelAnimationFrame(raf)
      window.clearTimeout(timer)
    }
  }, [active])

  // Pause animations when the tab is hidden so we don't burn cycles offscreen.
  const [paused, setPaused] = useState(
    typeof document !== 'undefined' && document.visibilityState === 'hidden'
  )
  useEffect(() => {
    const onVis = () => setPaused(document.visibilityState === 'hidden')
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  if (!mounted) return null

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 overflow-hidden transition-opacity duration-700 ease-out',
        visible ? 'opacity-100' : 'opacity-0',
        paused && 'scene-paused'
      )}
      style={{ zIndex: 0 }}
      data-testid="unicorn-scene"
    >
      {/* Sky wash — sits under everything, gives the rainbow a place to live. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #ffd6f5 0%, #d8c4ff 35%, #c4e4ff 70%, #fff4d6 100%)',
        }}
      />

      <Rainbow />
      <PixieSwarm />
      <DragonFlock />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Rainbow                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Giant rainbow arc.  Implemented as a single radial-gradient on a very large
 * square anchored to the bottom-center of the viewport so the visible portion
 * is the top half of the arc, spanning edge-to-edge.
 */
function Rainbow() {
  // Color bands, outer (red) → inner (violet).  Each band occupies a 2.2%
  // ring of the radial gradient.
  const bands = [
    { from: 47.0, to: 49.2, color: '#ff595e' }, // red
    { from: 49.2, to: 51.4, color: '#ff924c' }, // orange
    { from: 51.4, to: 53.6, color: '#ffca3a' }, // yellow
    { from: 53.6, to: 55.8, color: '#8ac926' }, // green
    { from: 55.8, to: 58.0, color: '#1982c4' }, // blue
    { from: 58.0, to: 60.2, color: '#6a4c93' }, // violet
  ]

  const stops: string[] = []
  stops.push('transparent 0%')
  stops.push(`transparent ${bands[0].from}%`)
  bands.forEach((b) => {
    stops.push(`${b.color} ${b.from}%`)
    stops.push(`${b.color} ${b.to}%`)
  })
  stops.push(`transparent ${bands[bands.length - 1].to}%`)
  stops.push('transparent 100%')

  const gradient = `radial-gradient(circle at 50% 100%, ${stops.join(', ')})`

  return (
    <div
      className="absolute"
      style={{
        // Anchor at bottom-center; size is large enough that the arc spans
        // the full viewport width with room to spare.
        left: '50%',
        bottom: '-40vw',
        width: '220vw',
        height: '220vw',
        transform: 'translate(-50%, 0)',
        animation:
          'rainbow-enter 1.1s cubic-bezier(0.22, 1, 0.36, 1) both, ' +
          'rainbow-breathe 8s ease-in-out 1.1s infinite',
        transformOrigin: '50% 100%',
        willChange: 'transform, filter, opacity',
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: gradient, opacity: 0.95 }}
      />
      {/* Shimmer overlay — a fainter copy that pulses opacity for life. */}
      <div
        className="absolute inset-0"
        style={{
          background: gradient,
          filter: 'blur(6px)',
          animation: 'rainbow-shimmer 3.6s ease-in-out infinite',
          mixBlendMode: 'screen',
        }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Pixies                                                                     */
/* -------------------------------------------------------------------------- */

type PixieSpec = {
  /** viewport-relative anchor in percent */
  top: number
  left: number
  /** size in px */
  size: number
  /** drift keyframe variant */
  drift: 'pixie-drift-a' | 'pixie-drift-b' | 'pixie-drift-c'
  driftDuration: number
  driftDelay: number
  twinkleDuration: number
  twinkleDelay: number
  hue: string
}

const PIXIES: PixieSpec[] = [
  { top: 12, left: 8,  size: 22, drift: 'pixie-drift-a', driftDuration: 7.0,  driftDelay: 0.0, twinkleDuration: 1.8, twinkleDelay: 0.2, hue: '#fff1a8' },
  { top: 22, left: 78, size: 26, drift: 'pixie-drift-b', driftDuration: 8.5,  driftDelay: 0.4, twinkleDuration: 2.2, twinkleDelay: 0.0, hue: '#ffd1f7' },
  { top: 34, left: 22, size: 18, drift: 'pixie-drift-c', driftDuration: 6.2,  driftDelay: 1.1, twinkleDuration: 1.5, twinkleDelay: 0.6, hue: '#caffea' },
  { top: 18, left: 48, size: 30, drift: 'pixie-drift-a', driftDuration: 9.0,  driftDelay: 0.8, twinkleDuration: 2.4, twinkleDelay: 0.3, hue: '#d9c2ff' },
  { top: 44, left: 64, size: 20, drift: 'pixie-drift-b', driftDuration: 7.6,  driftDelay: 1.6, twinkleDuration: 1.9, twinkleDelay: 0.9, hue: '#ffe0a8' },
  { top: 28, left: 36, size: 24, drift: 'pixie-drift-c', driftDuration: 8.2,  driftDelay: 0.2, twinkleDuration: 2.1, twinkleDelay: 0.5, hue: '#bde0ff' },
  { top: 52, left: 12, size: 22, drift: 'pixie-drift-a', driftDuration: 6.8,  driftDelay: 2.0, twinkleDuration: 1.7, twinkleDelay: 1.2, hue: '#ffc7c7' },
  { top: 58, left: 88, size: 28, drift: 'pixie-drift-b', driftDuration: 9.4,  driftDelay: 0.6, twinkleDuration: 2.3, twinkleDelay: 0.4, hue: '#fff1a8' },
  { top: 8,  left: 62, size: 16, drift: 'pixie-drift-c', driftDuration: 5.8,  driftDelay: 1.4, twinkleDuration: 1.4, twinkleDelay: 0.8, hue: '#caffea' },
  { top: 66, left: 44, size: 26, drift: 'pixie-drift-a', driftDuration: 8.8,  driftDelay: 1.0, twinkleDuration: 2.0, twinkleDelay: 0.1, hue: '#d9c2ff' },
  { top: 72, left: 28, size: 20, drift: 'pixie-drift-b', driftDuration: 7.2,  driftDelay: 0.3, twinkleDuration: 1.8, twinkleDelay: 0.7, hue: '#ffd1f7' },
  { top: 38, left: 92, size: 18, drift: 'pixie-drift-c', driftDuration: 6.4,  driftDelay: 1.8, twinkleDuration: 1.6, twinkleDelay: 1.0, hue: '#bde0ff' },
]

function PixieSwarm() {
  return (
    <>
      {PIXIES.map((p, i) => (
        <Pixie key={i} spec={p} />
      ))}
    </>
  )
}

function Pixie({ spec }: { spec: PixieSpec }) {
  // Outer element handles drift (translate/rotate); inner handles twinkle
  // (opacity/scale).  Separating them lets the two animations compose without
  // fighting over the `transform` property.
  const outer: CSSProperties = {
    top: `${spec.top}%`,
    left: `${spec.left}%`,
    width: spec.size,
    height: spec.size,
    animation: `${spec.drift} ${spec.driftDuration}s ease-in-out ${spec.driftDelay}s infinite`,
    willChange: 'transform',
  }
  const inner: CSSProperties = {
    animation: `pixie-twinkle ${spec.twinkleDuration}s ease-in-out ${spec.twinkleDelay}s infinite`,
    color: spec.hue,
    filter: `drop-shadow(0 0 6px ${spec.hue}) drop-shadow(0 0 14px ${spec.hue})`,
    willChange: 'opacity, transform',
  }
  return (
    <div className="absolute" style={outer}>
      <div className="flex h-full w-full items-center justify-center" style={inner}>
        <Sparkles className="h-full w-full" strokeWidth={1.5} />
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Dragons                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Inline SVG dragon — a simple stylized silhouette with separately-animated
 * wings so we can flap them.  Two are rendered, one flying left-to-right and
 * one mirrored flying right-to-left, each on a different bob/flight cadence.
 */
function DragonSVG({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id={`body-${accent}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={accent} stopOpacity="0.95" />
          <stop offset="100%" stopColor="#3b1f5e" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      {/* Body */}
      <path
        d="M20,70 Q60,40 100,55 Q140,68 175,50 Q170,75 140,80 Q105,90 70,82 Q40,76 20,70 Z"
        fill={`url(#body-${accent})`}
        stroke="#2b1450"
        strokeWidth="2"
      />
      {/* Tail */}
      <path
        d="M20,70 Q5,72 0,82 Q8,76 18,76"
        fill={accent}
        stroke="#2b1450"
        strokeWidth="2"
      />
      {/* Head */}
      <path
        d="M175,50 Q195,48 198,60 Q188,66 175,62 Z"
        fill={accent}
        stroke="#2b1450"
        strokeWidth="2"
      />
      {/* Eye */}
      <circle cx="188" cy="55" r="1.8" fill="#fff" />
      {/* Horn */}
      <path d="M188,46 L192,38 L194,46 Z" fill="#fff7d6" stroke="#2b1450" strokeWidth="1" />
      {/* Wing — animated separately */}
      <g style={{ transformOrigin: '100px 60px', animation: 'dragon-wing 0.6s ease-in-out infinite' }}>
        <path
          d="M70,60 Q95,15 130,30 Q115,55 95,62 Z"
          fill={accent}
          stroke="#2b1450"
          strokeWidth="2"
          opacity="0.92"
        />
      </g>
    </svg>
  )
}

function DragonFlock() {
  return (
    <>
      {/* Left-to-right dragon, upper sky */}
      <div
        className="absolute"
        style={{
          top: '14%',
          left: 0,
          width: '180px',
          height: '108px',
          animation: 'dragon-fly-l2r 22s linear infinite',
          willChange: 'transform',
        }}
      >
        <div
          className="h-full w-full"
          style={{ animation: 'dragon-bob 2.2s ease-in-out infinite' }}
        >
          <DragonSVG accent="#ff7ad9" />
        </div>
      </div>

      {/* Right-to-left dragon, mid sky, slightly larger & slower */}
      <div
        className="absolute"
        style={{
          top: '36%',
          left: 0,
          width: '220px',
          height: '132px',
          animation: 'dragon-fly-r2l 28s linear infinite',
          animationDelay: '-6s',
          willChange: 'transform',
        }}
      >
        <div
          className="h-full w-full"
          style={{ animation: 'dragon-bob 2.6s ease-in-out infinite' }}
        >
          <DragonSVG accent="#7adfff" />
        </div>
      </div>
    </>
  )
}

export default UnicornScene
