import { mulberry32 } from "./prng"

const GLYPHS =
  "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789Z<>/*+-"

/** A single falling column of glyphs. Allocated once and reused. */
export interface MatrixColumn {
  x: number
  y: number
  speed: number
  /** index into GLYPHS for the head glyph */
  glyph: number
  /** seconds remaining before the head glyph cycles */
  nextChangeT: number
  /** length of the trail in cells (glyphs) */
  trail: number
  /** 0..1 brightness multiplier */
  bright: number
  /** true if this column is currently the "streak" bright column */
  streak: boolean
  /** seconds remaining of the current streak */
  streakT: number
}

export interface MatrixSceneState {
  columns: MatrixColumn[]
  cellSize: number
  width: number
  height: number
  cols: number
  rand: () => number
}

/**
 * (Re)allocate the column pool for the current viewport. Called on
 * resize and on (re)seed. Uses a stable PRNG so the column pattern is
 * deterministic for a given seed+viewport.
 */
export function reseedMatrix(
  state: MatrixSceneState,
  width: number,
  height: number,
  seed: number,
  cellSize = 18
) {
  const cols = Math.max(1, Math.ceil(width / cellSize))
  state.width = width
  state.height = height
  state.cellSize = cellSize
  state.cols = cols
  state.rand = mulberry32(seed)

  // Resize the pool in place (reuse existing objects).
  while (state.columns.length < cols) {
    state.columns.push({
      x: 0,
      y: 0,
      speed: 0,
      glyph: 0,
      nextChangeT: 0,
      trail: 0,
      bright: 0,
      streak: false,
      streakT: 0,
    })
  }
  if (state.columns.length > cols) state.columns.length = cols

  for (let i = 0; i < cols; i++) {
    const c = state.columns[i]
    c.x = i * cellSize + cellSize * 0.5
    // Stagger initial y above the viewport so columns don't all start
    // raining from the same line.
    c.y = -Math.floor(state.rand() * height)
    c.speed = 60 + state.rand() * 140 // px / sec
    c.glyph = Math.floor(state.rand() * GLYPHS.length)
    c.nextChangeT = 0.05 + state.rand() * 0.35
    c.trail = 8 + Math.floor(state.rand() * 18)
    c.bright = 0.45 + state.rand() * 0.55
    c.streak = false
    c.streakT = 0
  }
}

export function createMatrixState(): MatrixSceneState {
  return {
    columns: [],
    cellSize: 18,
    width: 0,
    height: 0,
    cols: 0,
    rand: mulberry32(1),
  }
}

export function updateMatrix(state: MatrixSceneState, dt: number) {
  const rand = state.rand
  const h = state.height
  const cell = state.cellSize
  const cols = state.columns
  for (let i = 0; i < cols.length; i++) {
    const c = cols[i]
    c.y += c.speed * dt
    c.nextChangeT -= dt
    if (c.nextChangeT <= 0) {
      c.glyph = (c.glyph + 1 + Math.floor(rand() * 5)) % GLYPHS.length
      c.nextChangeT = 0.05 + rand() * 0.35
    }
    if (c.streak) {
      c.streakT -= dt
      if (c.streakT <= 0) c.streak = false
    } else if (rand() < dt * 0.18) {
      c.streak = true
      c.streakT = 0.4 + rand() * 0.8
    }
    if (c.y - c.trail * cell > h) {
      // Recycle to the top with a fresh profile.
      c.y = -Math.floor(rand() * 60)
      c.speed = 60 + rand() * 140
      c.trail = 8 + Math.floor(rand() * 18)
      c.bright = 0.45 + rand() * 0.55
    }
  }
}

export function renderMatrix(
  state: MatrixSceneState,
  ctx: CanvasRenderingContext2D
) {
  const w = state.width
  const h = state.height
  const cell = state.cellSize
  const cols = state.columns

  // Background fill — dark with a hint of green/blue. Solid fill (not
  // a trailing translucent rect) so reduced-motion / paused frames
  // remain crisp instead of accumulating.
  ctx.fillStyle = "#03060a"
  ctx.fillRect(0, 0, w, h)

  ctx.font = `${cell - 2}px ui-monospace, SFMono-Regular, Menlo, monospace`
  ctx.textBaseline = "top"
  ctx.textAlign = "center"

  for (let i = 0; i < cols.length; i++) {
    const c = cols[i]
    const headGlyph = GLYPHS.charAt(c.glyph)

    // Draw trail from oldest -> newest so the head ends up brightest.
    for (let t = c.trail; t >= 0; t--) {
      const y = c.y - t * cell
      if (y < -cell || y > h) continue
      const fade = 1 - t / c.trail
      const alpha = fade * fade * c.bright
      if (alpha < 0.02) continue
      // Glyph identity drifts down the trail without allocating arrays.
      const g = GLYPHS.charAt((c.glyph + t * 7) % GLYPHS.length)
      if (t === 0) {
        ctx.fillStyle = c.streak
          ? `rgba(220, 255, 235, ${0.95})`
          : `rgba(190, 255, 210, ${0.95})`
      } else if (c.streak && t < 3) {
        ctx.fillStyle = `rgba(150, 255, 190, ${alpha})`
      } else {
        ctx.fillStyle = `rgba(70, 220, 130, ${alpha * 0.85})`
      }
      ctx.fillText(t === 0 ? headGlyph : g, c.x, y)
    }
  }

  // Subtle vignette / glow overlay using a radial gradient. Created
  // per-frame is fine — it's a single allocation, not per-particle.
  const grad = ctx.createRadialGradient(
    w * 0.5,
    h * 0.55,
    Math.min(w, h) * 0.15,
    w * 0.5,
    h * 0.55,
    Math.max(w, h) * 0.75
  )
  grad.addColorStop(0, "rgba(0, 40, 20, 0)")
  grad.addColorStop(1, "rgba(0, 0, 0, 0.55)")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, w, h)
}
