import { useEffect, useRef } from 'react'

/**
 * Matrix-style shimmering code rain on a dark background.
 *
 * Implementation notes:
 * - One <canvas> sized to its container, redrawn each animation frame.
 * - A single requestAnimationFrame loop is owned by this component. The
 *   cleanup function cancels it, so unmounting (e.g. theme switch) tears
 *   the loop down cleanly — no overlapping RAFs across themes.
 * - Throttled to ~30fps so the rain shimmers without burning CPU.
 */
export default function MatrixRainLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Katakana + latin alphanumerics — classic Matrix glyph set.
    const glyphs =
      'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(
        '',
      )

    const fontSize = 16
    let columns = 0
    let drops: number[] = []
    let dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.ceil(w / fontSize)
      // Stagger initial drop positions so the rain isn't a flat wall.
      drops = Array.from({ length: columns }, () =>
        Math.floor((Math.random() * h) / fontSize) * -1,
      )
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    let rafId = 0
    let lastFrame = 0
    const frameInterval = 1000 / 30 // ~30fps

    const draw = (now: number) => {
      rafId = requestAnimationFrame(draw)
      if (now - lastFrame < frameInterval) return
      lastFrame = now

      const w = canvas.clientWidth
      const h = canvas.clientHeight

      // Translucent black to fade prior frames -> trailing shimmer.
      ctx.fillStyle = 'rgba(3, 7, 18, 0.18)'
      ctx.fillRect(0, 0, w, h)

      ctx.font = `${fontSize}px "Fira Code", "JetBrains Mono", ui-monospace, monospace`
      ctx.textBaseline = 'top'

      for (let i = 0; i < columns; i++) {
        const ch = glyphs[(Math.random() * glyphs.length) | 0]
        const x = i * fontSize
        const y = drops[i] * fontSize

        // Leading glyph: bright white-green head.
        ctx.fillStyle = '#d6ffe5'
        ctx.fillText(ch, x, y)
        // Trail color a couple cells back.
        ctx.fillStyle = '#22c55e'
        ctx.fillText(ch, x, y - fontSize)
        ctx.fillStyle = 'rgba(34, 197, 94, 0.55)'
        ctx.fillText(ch, x, y - fontSize * 2)

        // Reset drop when off-screen, with randomness so columns don't sync.
        if (y > h && Math.random() > 0.975) {
          drops[i] = 0
        } else {
          drops[i] += 1
        }
      }
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: '#030712' }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
