import { useEffect, useRef } from 'react'

/**
 * Giant rainbow + pixies + dancing unicorns.
 *
 * One <canvas>, one requestAnimationFrame loop. Everything is drawn from
 * shapes/emojis — no image assets. The cleanup function cancels the RAF
 * so theme switches don't leave a second loop spinning.
 */

interface Pixie {
  x: number
  y: number
  vx: number
  vy: number
  hue: number
  size: number
  trail: { x: number; y: number; a: number }[]
}

interface Unicorn {
  x: number
  y: number
  baseY: number
  vx: number
  bob: number // phase
  bobSpeed: number
  size: number
  flip: number
}

const RAINBOW = [
  '#ff3b3b',
  '#ff8a3d',
  '#ffd93d',
  '#3ddc84',
  '#3db8ff',
  '#5b6cff',
  '#a445ff',
]

export default function UnicornRainbowPixiesLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let width = 0
    let height = 0

    let pixies: Pixie[] = []
    let unicorns: Unicorn[] = []

    const rand = (a: number, b: number) => a + Math.random() * (b - a)

    const spawnPixies = () => {
      // Density scales gently with viewport area, capped for perf.
      const target = Math.min(48, Math.max(18, Math.round((width * height) / 24000)))
      pixies = Array.from({ length: target }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        vx: rand(-60, 60),
        vy: rand(-50, 50),
        hue: rand(0, 360),
        size: rand(8, 16),
        trail: [],
      }))
    }

    const spawnUnicorns = () => {
      const count = width < 640 ? 2 : width < 1024 ? 3 : 4
      unicorns = Array.from({ length: count }, (_, i) => {
        const size = rand(56, 84)
        return {
          x: rand(0, width),
          y: height - size - rand(20, 120),
          baseY: height - size - rand(20, 120),
          vx: (i % 2 === 0 ? 1 : -1) * rand(40, 90),
          bob: rand(0, Math.PI * 2),
          bobSpeed: rand(2, 3.5),
          size,
          flip: i % 2 === 0 ? 1 : -1,
        }
      })
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawnPixies()
      spawnUnicorns()
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const drawRainbow = (t: number) => {
      // Giant arc anchored well below the bottom edge so we see only
      // the top of it — a "rainbow over the horizon" feel.
      const cx = width / 2
      const cy = height + Math.max(width, height) * 0.35
      const baseR = Math.max(width, height) * 0.85
      const bandWidth = Math.max(14, Math.min(28, width / 60))
      // Gentle breathing animation.
      const pulse = 1 + Math.sin(t / 1400) * 0.012

      ctx.lineCap = 'butt'
      for (let i = 0; i < RAINBOW.length; i++) {
        ctx.strokeStyle = RAINBOW[i]
        ctx.lineWidth = bandWidth
        ctx.globalAlpha = 0.85
        ctx.beginPath()
        const r = (baseR - i * bandWidth) * pulse
        ctx.arc(cx, cy, r, Math.PI, Math.PI * 2)
        ctx.stroke()
      }
      ctx.globalAlpha = 1
    }

    const drawUnicorn = (u: Unicorn, dt: number, t: number) => {
      u.x += u.vx * dt
      u.bob += u.bobSpeed * dt
      // Bob vertically as if prancing.
      const dy = Math.sin(u.bob) * 10
      u.y = u.baseY + dy

      // Wrap around edges.
      if (u.x < -u.size) u.x = width + u.size
      if (u.x > width + u.size) u.x = -u.size

      // Sparkle puff behind unicorn — small rainbow trail dots.
      for (let i = 0; i < 3; i++) {
        const px = u.x + u.size * 0.5 - u.flip * (10 + i * 6)
        const py = u.y + u.size * 0.6 + Math.sin(t / 200 + i) * 3
        ctx.fillStyle = RAINBOW[(i + Math.floor(t / 120)) % RAINBOW.length]
        ctx.globalAlpha = 0.6 - i * 0.15
        ctx.beginPath()
        ctx.arc(px, py, 4 - i, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      ctx.save()
      ctx.translate(u.x, u.y)
      if (u.flip === -1) ctx.scale(-1, 1)
      // Slight tilt as it dances.
      ctx.rotate(Math.sin(u.bob) * 0.08)
      ctx.font = `${u.size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`
      ctx.textBaseline = 'top'
      ctx.fillText('🦄', 0, 0)
      ctx.restore()
    }

    const drawPixie = (p: Pixie, dt: number) => {
      p.x += p.vx * dt
      p.y += p.vy * dt

      // Wrap edges so pixies flit continuously.
      if (p.x < -10) p.x = width + 10
      if (p.x > width + 10) p.x = -10
      if (p.y < -10) p.y = height + 10
      if (p.y > height + 10) p.y = -10

      // Gentle hue drift.
      p.hue = (p.hue + 30 * dt) % 360

      // Track a short fading trail.
      p.trail.push({ x: p.x, y: p.y, a: 1 })
      if (p.trail.length > 8) p.trail.shift()
      for (let i = 0; i < p.trail.length; i++) {
        const t = p.trail[i]
        t.a *= 0.88
        ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${t.a * 0.5})`
        ctx.beginPath()
        ctx.arc(t.x, t.y, (p.size / 3) * (i / p.trail.length + 0.3), 0, Math.PI * 2)
        ctx.fill()
      }

      // Sparkle: a small 4-point star.
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((performance.now() / 600) % (Math.PI * 2))
      ctx.fillStyle = `hsl(${p.hue}, 100%, 75%)`
      const s = p.size
      ctx.beginPath()
      ctx.moveTo(0, -s)
      ctx.lineTo(s * 0.25, -s * 0.25)
      ctx.lineTo(s, 0)
      ctx.lineTo(s * 0.25, s * 0.25)
      ctx.lineTo(0, s)
      ctx.lineTo(-s * 0.25, s * 0.25)
      ctx.lineTo(-s, 0)
      ctx.lineTo(-s * 0.25, -s * 0.25)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    let rafId = 0
    let last = performance.now()

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick)
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      // Clear with a faint pastel haze. We fully clear because the
      // rainbow stays static-ish and we want crisp sparkle motion.
      ctx.clearRect(0, 0, width, height)

      drawRainbow(now)
      for (const p of pixies) drawPixie(p, dt)
      for (const u of unicorns) drawUnicorn(u, dt, now)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      ro.disconnect()
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg,#ffe1f4 0%, #e6f0ff 45%, #d9fbe5 100%)',
      }}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  )
}
