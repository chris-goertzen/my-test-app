import * as React from "react"

/**
 * UnicornScene
 *
 * Renders a giant rainbow background plus a canvas of dancing pixies. The
 * rainbow is a pure CSS conic/radial gradient (cheap), and the pixies are
 * animated on a single canvas via requestAnimationFrame. RAF + listeners are
 * cleaned up on unmount.
 */

interface Pixie {
  x: number
  y: number
  baseY: number
  phase: number
  speed: number
  size: number
  hue: number
  vx: number
  twinkle: number
}

const PIXIE_COUNT = 36

export function UnicornScene() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let pixies: Pixie[] = []
    let dpr = Math.max(1, window.devicePixelRatio || 1)
    let rafId = 0
    let lastFrame = performance.now()

    const spawnPixies = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      pixies = new Array(PIXIE_COUNT).fill(0).map(() => {
        const baseY = Math.random() * h
        return {
          x: Math.random() * w,
          y: baseY,
          baseY,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.4,
          size: 3 + Math.random() * 5,
          hue: Math.floor(Math.random() * 360),
          vx: 30 + Math.random() * 70, // px / second
          twinkle: 0.5 + Math.random() * 1.5,
        }
      })
    }

    const setup = () => {
      dpr = Math.max(1, window.devicePixelRatio || 1)
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawnPixies()
    }

    const drawPixie = (p: Pixie, t: number) => {
      const flicker = 0.6 + 0.4 * Math.sin(t * p.twinkle + p.phase)
      const radius = p.size * (0.9 + 0.3 * Math.sin(t * 2 + p.phase))

      // Glow halo
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 4)
      gradient.addColorStop(0, `hsla(${p.hue}, 100%, 80%, ${0.95 * flicker})`)
      gradient.addColorStop(0.4, `hsla(${(p.hue + 40) % 360}, 100%, 70%, ${0.45 * flicker})`)
      gradient.addColorStop(1, "hsla(0, 0%, 100%, 0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(p.x, p.y, radius * 4, 0, Math.PI * 2)
      ctx.fill()

      // Core sparkle
      ctx.fillStyle = `hsla(${p.hue}, 100%, 95%, ${flicker})`
      ctx.beginPath()
      ctx.arc(p.x, p.y, radius * 0.6, 0, Math.PI * 2)
      ctx.fill()

      // Cross-shaped sparkle rays
      ctx.strokeStyle = `hsla(${p.hue}, 100%, 90%, ${0.6 * flicker})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(p.x - radius * 2.5, p.y)
      ctx.lineTo(p.x + radius * 2.5, p.y)
      ctx.moveTo(p.x, p.y - radius * 2.5)
      ctx.lineTo(p.x, p.y + radius * 2.5)
      ctx.stroke()
    }

    const draw = (now: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      const dt = Math.min(0.05, (now - lastFrame) / 1000)
      lastFrame = now
      const t = now / 1000

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = "lighter"

      for (const p of pixies) {
        p.x += p.vx * dt
        // Sinusoidal dance
        p.y = p.baseY + Math.sin(t * p.speed + p.phase) * 40
        p.hue = (p.hue + 30 * dt) % 360

        if (p.x > w + 20) {
          p.x = -20
          p.baseY = Math.random() * h
        }
        drawPixie(p, t)
      }

      ctx.globalCompositeOperation = "source-over"
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
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #ffe1f5 0%, #d6f0ff 45%, #fff7d6 100%)",
        }}
      />
      {/* Giant rainbow arc */}
      <div
        className="absolute left-1/2 top-full -translate-x-1/2"
        style={{
          width: "220vmax",
          height: "220vmax",
          transform: "translate(-50%, -55%)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, transparent 0 47%, #ff3b3b 47% 51%, #ff9a3c 51% 55%, #ffe23c 55% 59%, #5dd95d 59% 63%, #3aa6ff 63% 67%, #6a52ff 67% 71%, #c046ff 71% 75%, transparent 75% 100%)",
          filter: "saturate(1.1) blur(0.3px)",
          opacity: 0.85,
        }}
      />
      {/* Soft sun glow behind rainbow */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "60vmin",
          height: "60vmin",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 70%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}

export default UnicornScene
