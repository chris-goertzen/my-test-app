import * as React from "react"

/**
 * MatrixRain
 *
 * Canvas-based "code rain" background. Each column drops a stream of glyphs
 * down the screen at a randomized speed. Uses requestAnimationFrame for smooth
 * animation and supports DPR-aware rendering. Fully cleans up RAF + listeners
 * on unmount.
 */
const GLYPHS =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFZ:.\"=*+-<>¦|_"

interface Column {
  y: number
  speed: number
  trail: number
}

export function MatrixRain() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let columns: Column[] = []
    let columnWidth = 16
    let fontSize = 16
    let dpr = Math.max(1, window.devicePixelRatio || 1)
    let rafId = 0
    let lastFrame = performance.now()

    const setup = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      fontSize = Math.max(14, Math.floor(w / 90))
      columnWidth = fontSize
      const colCount = Math.ceil(w / columnWidth)
      columns = new Array(colCount).fill(0).map(() => ({
        y: Math.random() * h,
        speed: 40 + Math.random() * 90, // pixels / second
        trail: 8 + Math.random() * 18,
      }))
      // Prime the background
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, w, h)
    }

    const draw = (now: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const dt = Math.min(0.05, (now - lastFrame) / 1000) // clamp for tab-switch
      lastFrame = now

      // Translucent black overlay creates the trailing fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)"
      ctx.fillRect(0, 0, w, h)

      ctx.font = `${fontSize}px "Fira Code", "Menlo", monospace`
      ctx.textBaseline = "top"

      for (let i = 0; i < columns.length; i++) {
        const col = columns[i]
        col.y += col.speed * dt * 60 * 0.016 // normalize to ~60fps feel
        const x = i * columnWidth

        // Leading bright glyph
        const leadGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        ctx.fillStyle = "#d6ffe0"
        ctx.shadowColor = "#39ff14"
        ctx.shadowBlur = 8
        ctx.fillText(leadGlyph, x, col.y)
        ctx.shadowBlur = 0

        // Trailing dimmer glyphs
        for (let t = 1; t < col.trail; t++) {
          const alpha = Math.max(0, 1 - t / col.trail)
          ctx.fillStyle = `rgba(0, 255, 70, ${alpha * 0.75})`
          const g = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          ctx.fillText(g, x, col.y - t * fontSize)
        }

        if (col.y > h + col.trail * fontSize) {
          col.y = -Math.random() * h * 0.4
          col.speed = 40 + Math.random() * 90
          col.trail = 8 + Math.random() * 18
        }
      }

      rafId = window.requestAnimationFrame(draw)
    }

    setup()
    lastFrame = performance.now()
    rafId = window.requestAnimationFrame(draw)

    const handleResize = () => setup()
    window.addEventListener("resize", handleResize)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
      style={{ background: "#000" }}
    />
  )
}

export default MatrixRain
