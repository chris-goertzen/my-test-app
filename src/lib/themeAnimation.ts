import { mulberry32 } from './seededRandom'

export type ThemeMode = 'matrix' | 'unicorn'

interface MatrixColumn {
  y: number
  speed: number
  bright: number
  charSeed: number
}

interface Pixie {
  x: number
  y: number
  vx: number
  vy: number
  phase: number
  hue: number
}

interface Unicorn {
  x: number
  y: number
  phase: number
  scale: number
}

interface Sparkle {
  x: number
  y: number
  phase: number
  size: number
}

const MATRIX_CHARS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF<>{}[]/\\|+-*'

/**
 * Single shared animation layer with an internal mode state machine.
 *
 * - mode='matrix'|'unicorn'
 * - update(dt) advances state for one frame (seconds)
 * - render() draws the current mode
 * - Allocates objects ONCE at scene init; per-frame work is mutation only
 *   to avoid GC pressure.
 */
export class ThemeAnimation {
  private ctx: CanvasRenderingContext2D
  private canvas: HTMLCanvasElement

  public mode: ThemeMode = 'matrix'
  public reducedMotion = false

  private width = 0
  private height = 0
  private dpr = 1

  // matrix state
  private columns: MatrixColumn[] = []
  private fontSize = 16

  // unicorn state
  private pixies: Pixie[] = []
  private unicorns: Unicorn[] = []
  private sparkles: Sparkle[] = []

  // animation control
  private rand: () => number = mulberry32(1337)
  private rafId: number | null = null
  private lastTime = 0
  private running = false

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) throw new Error('Cannot get 2D context')
    this.ctx = ctx
    this.resize()
  }

  setMode(mode: ThemeMode): void {
    if (mode === this.mode) return
    this.mode = mode
    // Hard clear so old trails don't bleed across the mode switch.
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  setReducedMotion(reduced: boolean): void {
    this.reducedMotion = reduced
  }

  resize(): void {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = window.innerWidth
    const h = window.innerHeight
    this.canvas.width = Math.floor(w * this.dpr)
    this.canvas.height = Math.floor(h * this.dpr)
    this.canvas.style.width = `${w}px`
    this.canvas.style.height = `${h}px`
    this.width = w
    this.height = h
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.initScene()
  }

  private initScene(): void {
    // Reset PRNG so scene reproducibility holds across resizes/mode swaps.
    this.rand = mulberry32(1337)

    // Matrix columns — one per fontSize-wide column.
    const cols = Math.ceil(this.width / this.fontSize)
    this.columns = new Array(cols)
    for (let i = 0; i < cols; i++) {
      this.columns[i] = {
        y: Math.floor(this.rand() * (this.height / this.fontSize)) * this.fontSize,
        speed: 60 + this.rand() * 180, // px/sec
        bright: 0,
        charSeed: Math.floor(this.rand() * 1e6),
      }
    }

    // Unicorn pixies
    const pixieCount = Math.max(8, Math.floor(this.width / 90))
    this.pixies = new Array(pixieCount)
    for (let i = 0; i < pixieCount; i++) {
      this.pixies[i] = {
        x: this.rand() * this.width,
        y: this.rand() * this.height * 0.7,
        vx: (this.rand() - 0.5) * 40,
        vy: (this.rand() - 0.5) * 25,
        phase: this.rand() * Math.PI * 2,
        hue: this.rand() * 360,
      }
    }

    // Dancing unicorns
    const unicornCount = this.width < 640 ? 2 : 3
    this.unicorns = new Array(unicornCount)
    for (let i = 0; i < unicornCount; i++) {
      const tCount = unicornCount + 1
      this.unicorns[i] = {
        x: this.width * ((i + 1) / tCount),
        y: this.height * (0.68 + this.rand() * 0.08),
        phase: this.rand() * Math.PI * 2,
        scale: 0.8 + this.rand() * 0.5,
      }
    }

    // Sparkles
    const sparkleCount = Math.min(140, Math.floor((this.width * this.height) / 10000))
    this.sparkles = new Array(sparkleCount)
    for (let i = 0; i < sparkleCount; i++) {
      this.sparkles[i] = {
        x: this.rand() * this.width,
        y: this.rand() * this.height,
        phase: this.rand() * Math.PI * 2,
        size: 1 + this.rand() * 2.4,
      }
    }
  }

  start(): void {
    if (this.running) return
    this.running = true
    this.lastTime = performance.now()
    const tick = (t: number): void => {
      if (!this.running) return
      const dt = Math.min(0.05, (t - this.lastTime) / 1000)
      this.lastTime = t
      this.update(dt)
      this.render()
      this.rafId = requestAnimationFrame(tick)
    }
    this.rafId = requestAnimationFrame(tick)
  }

  stop(): void {
    this.running = false
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  update(dt: number): void {
    // Under reduced motion, ease updates to a crawl. We still tick (the
    // toggle should remain responsive), but motion is essentially static.
    const effDt = this.reducedMotion ? dt * 0.1 : dt

    if (this.mode === 'matrix') {
      for (let i = 0; i < this.columns.length; i++) {
        const col = this.columns[i]
        col.y += col.speed * effDt
        if (col.y > this.height + this.fontSize * 2) {
          col.y = -this.fontSize * (2 + this.rand() * 18)
          col.speed = 60 + this.rand() * 180
          col.charSeed = (col.charSeed + 1) | 0
        }
        if (col.bright > 0) col.bright -= effDt
        else if (this.rand() < 0.005) col.bright = 0.5 + this.rand() * 0.5
      }
    } else {
      for (let i = 0; i < this.pixies.length; i++) {
        const p = this.pixies[i]
        p.x += p.vx * effDt
        p.y += p.vy * effDt + Math.sin(p.phase) * 12 * effDt
        p.phase += effDt * 6
        if (p.x < -30) p.x = this.width + 30
        else if (p.x > this.width + 30) p.x = -30
        if (p.y < -30) p.y = this.height * 0.75 + 30
        else if (p.y > this.height * 0.8 + 30) p.y = -30
      }
      for (let i = 0; i < this.unicorns.length; i++) {
        this.unicorns[i].phase += effDt * 2.4
      }
      for (let i = 0; i < this.sparkles.length; i++) {
        this.sparkles[i].phase += effDt * 3
      }
    }
  }

  render(): void {
    if (this.mode === 'matrix') this.renderMatrix()
    else this.renderUnicorn()
  }

  private renderMatrix(): void {
    const ctx = this.ctx
    if (this.reducedMotion) {
      // Static-ish: paint full opaque background so glyphs don't trail.
      ctx.fillStyle = '#050b07'
      ctx.fillRect(0, 0, this.width, this.height)
    } else {
      // Translucent fill produces the trailing fade.
      ctx.fillStyle = 'rgba(5, 11, 7, 0.09)'
      ctx.fillRect(0, 0, this.width, this.height)
    }

    ctx.font = `${this.fontSize}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`
    ctx.textBaseline = 'top'

    for (let i = 0; i < this.columns.length; i++) {
      const col = this.columns[i]
      const x = i * this.fontSize
      // Stable char per (column, head-position).
      const idx = Math.abs(
        (Math.floor(col.y / this.fontSize) * 31 + col.charSeed) % MATRIX_CHARS.length,
      )
      const ch = MATRIX_CHARS.charAt(idx)

      if (col.bright > 0) {
        // Shimmer head — brighter, slightly cyan/white.
        ctx.fillStyle = '#d6ffe1'
        ctx.shadowColor = '#7dffaa'
        ctx.shadowBlur = 14
      } else {
        ctx.fillStyle = '#3ef07a'
        ctx.shadowColor = '#0f8a3a'
        ctx.shadowBlur = 6
      }
      ctx.fillText(ch, x, col.y)
    }
    ctx.shadowBlur = 0
  }

  private renderUnicorn(): void {
    const ctx = this.ctx

    // Pastel sky gradient — repaints whole frame, no trails needed.
    const sky = ctx.createLinearGradient(0, 0, 0, this.height)
    sky.addColorStop(0, '#ffe7f5')
    sky.addColorStop(0.5, '#e0d5ff')
    sky.addColorStop(1, '#d3f1ff')
    ctx.fillStyle = sky
    ctx.fillRect(0, 0, this.width, this.height)

    // Giant rainbow arc spanning the viewport.
    const cx = this.width / 2
    const cy = this.height * 1.05
    const baseRadius = Math.max(this.width, this.height) * 0.62
    const bands = [
      '#ff595e',
      '#ff924c',
      '#ffca3a',
      '#8ac926',
      '#1982c4',
      '#6a4c93',
      '#c77dff',
    ]
    const bandWidth = Math.max(14, this.height * 0.035)
    ctx.lineWidth = bandWidth
    for (let i = 0; i < bands.length; i++) {
      ctx.beginPath()
      ctx.arc(cx, cy, baseRadius - i * bandWidth, Math.PI, 2 * Math.PI)
      ctx.strokeStyle = bands[i]
      ctx.stroke()
    }

    // Sparkles / stars
    for (let i = 0; i < this.sparkles.length; i++) {
      const s = this.sparkles[i]
      const t = this.reducedMotion ? 0.5 : Math.sin(s.phase) * 0.5 + 0.5
      const r = s.size * (0.5 + 0.7 * t)
      ctx.fillStyle = `rgba(255, 252, 200, ${0.35 + 0.55 * t})`
      ctx.beginPath()
      ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    // Pixies fluttering
    for (let i = 0; i < this.pixies.length; i++) {
      const p = this.pixies[i]
      const wing = this.reducedMotion ? 0 : Math.sin(p.phase * 3) * 3
      // wings (behind body)
      ctx.fillStyle = `hsla(${(p.hue + 60) % 360}, 95%, 82%, 0.6)`
      ctx.beginPath()
      ctx.ellipse(p.x - 4, p.y - 1, 6 + wing, 3, -0.35, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(p.x + 4, p.y - 1, 6 + wing, 3, 0.35, 0, Math.PI * 2)
      ctx.fill()
      // body
      ctx.fillStyle = `hsl(${(p.hue + p.phase * 8) % 360}, 90%, 68%)`
      ctx.beginPath()
      ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2)
      ctx.fill()
      // pixie dust
      ctx.fillStyle = `hsla(${(p.hue + 120) % 360}, 95%, 85%, 0.5)`
      ctx.beginPath()
      ctx.arc(p.x - p.vx * 0.04, p.y - p.vy * 0.04, 1.8, 0, Math.PI * 2)
      ctx.fill()
    }

    // Dancing unicorns
    for (let i = 0; i < this.unicorns.length; i++) {
      this.drawUnicorn(this.unicorns[i])
    }
  }

  private drawUnicorn(u: Unicorn): void {
    const ctx = this.ctx
    const bounce = this.reducedMotion ? 0 : Math.sin(u.phase * 2) * 4
    const legSwing = this.reducedMotion ? 0 : Math.sin(u.phase * 4)
    const s = u.scale

    ctx.save()
    ctx.translate(u.x, u.y + bounce)
    ctx.scale(s, s)

    // shadow
    ctx.fillStyle = 'rgba(45, 30, 70, 0.15)'
    ctx.beginPath()
    ctx.ellipse(0, 52, 52, 6, 0, 0, Math.PI * 2)
    ctx.fill()

    // legs
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 8
    ctx.lineCap = 'round'
    const legBaseY = 32
    const legY1 = legBaseY + 12 + legSwing * 5
    const legY2 = legBaseY + 12 - legSwing * 5
    ctx.beginPath()
    ctx.moveTo(-25, legBaseY); ctx.lineTo(-25, legY1)
    ctx.moveTo(-10, legBaseY); ctx.lineTo(-10, legY2)
    ctx.moveTo(10, legBaseY); ctx.lineTo(10, legY1)
    ctx.moveTo(25, legBaseY); ctx.lineTo(25, legY2)
    ctx.stroke()

    // body
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.ellipse(0, 20, 46, 22, 0, 0, Math.PI * 2)
    ctx.fill()

    // tail (rainbow strands)
    const maneColors = ['#ff6ec7', '#ffd166', '#7bdff2', '#b8c0ff', '#caffbf']
    for (let j = 0; j < maneColors.length; j++) {
      ctx.fillStyle = maneColors[j]
      const ty = this.reducedMotion ? 0 : Math.sin(u.phase * 2 + j * 0.6) * 2
      ctx.beginPath()
      ctx.arc(-44 - j * 4, 14 + j * 4 + ty, 7, 0, Math.PI * 2)
      ctx.fill()
    }

    // head
    ctx.fillStyle = '#ffffff'
    ctx.beginPath()
    ctx.ellipse(38, 0, 18, 14, -0.3, 0, Math.PI * 2)
    ctx.fill()

    // ear
    ctx.beginPath()
    ctx.moveTo(34, -10); ctx.lineTo(40, -22); ctx.lineTo(44, -8)
    ctx.closePath()
    ctx.fill()

    // horn
    const hornGrad = ctx.createLinearGradient(40, -16, 56, -38)
    hornGrad.addColorStop(0, '#ffd166')
    hornGrad.addColorStop(1, '#ffe599')
    ctx.fillStyle = hornGrad
    ctx.beginPath()
    ctx.moveTo(46, -12); ctx.lineTo(52, -36); ctx.lineTo(55, -10)
    ctx.closePath()
    ctx.fill()

    // mane
    for (let j = 0; j < maneColors.length; j++) {
      ctx.fillStyle = maneColors[j]
      ctx.beginPath()
      ctx.arc(20 - j * 6, -8 + j * 2, 8, 0, Math.PI * 2)
      ctx.fill()
    }

    // eye
    ctx.fillStyle = '#1a1a2e'
    ctx.beginPath()
    ctx.arc(43, -2, 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.restore()
  }

  destroy(): void {
    this.stop()
  }
}
