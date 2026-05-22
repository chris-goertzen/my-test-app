import { mulberry32 } from "./prng"

/** A small fluttering sparkle / pixie. Allocated once and reused. */
export interface Pixie {
  x: number
  y: number
  /** baseline y for sin-wave flutter */
  baseY: number
  vx: number
  amp: number
  freq: number
  phase: number
  size: number
  hue: number
  twinkle: number
}

/** A dancing unicorn sprite. Drawn from simple primitives. */
export interface Unicorn {
  x: number
  y: number
  vx: number
  /** body bob phase */
  phase: number
  /** 1 = facing right, -1 = facing left */
  dir: 1 | -1
  scale: number
  hue: number
}

export interface UnicornSceneState {
  pixies: Pixie[]
  unicorns: Unicorn[]
  width: number
  height: number
  /** ground line y where unicorns dance */
  groundY: number
  /** accumulated time, used by rainbow shimmer */
  time: number
  rand: () => number
}

export function createUnicornState(): UnicornSceneState {
  return {
    pixies: [],
    unicorns: [],
    width: 0,
    height: 0,
    groundY: 0,
    time: 0,
    rand: mulberry32(1),
  }
}

export function reseedUnicorn(
  state: UnicornSceneState,
  width: number,
  height: number,
  seed: number
) {
  state.width = width
  state.height = height
  state.groundY = height * 0.72
  state.rand = mulberry32(seed)

  // Pool size scales with viewport area, capped to keep CPU bounded.
  const targetPixies = Math.min(
    140,
    Math.max(40, Math.floor((width * height) / 14000))
  )
  while (state.pixies.length < targetPixies) {
    state.pixies.push({
      x: 0,
      y: 0,
      baseY: 0,
      vx: 0,
      amp: 0,
      freq: 0,
      phase: 0,
      size: 0,
      hue: 0,
      twinkle: 0,
    })
  }
  if (state.pixies.length > targetPixies) state.pixies.length = targetPixies

  const rand = state.rand
  for (let i = 0; i < state.pixies.length; i++) {
    const p = state.pixies[i]
    p.x = rand() * width
    p.baseY = height * 0.1 + rand() * (height * 0.7)
    p.y = p.baseY
    p.vx = (rand() - 0.5) * 40 + 10 // mostly drift right
    p.amp = 6 + rand() * 22
    p.freq = 0.6 + rand() * 1.8
    p.phase = rand() * Math.PI * 2
    p.size = 1.2 + rand() * 2.2
    p.hue = Math.floor(rand() * 360)
    p.twinkle = rand() * Math.PI * 2
  }

  // 3–5 dancing unicorns.
  const targetUnicorns = Math.max(3, Math.min(5, Math.round(width / 480)))
  while (state.unicorns.length < targetUnicorns) {
    state.unicorns.push({
      x: 0,
      y: 0,
      vx: 0,
      phase: 0,
      dir: 1,
      scale: 1,
      hue: 0,
    })
  }
  if (state.unicorns.length > targetUnicorns)
    state.unicorns.length = targetUnicorns

  for (let i = 0; i < state.unicorns.length; i++) {
    const u = state.unicorns[i]
    u.dir = rand() < 0.5 ? -1 : 1
    u.scale = 0.7 + rand() * 0.6
    u.vx = (40 + rand() * 60) * u.dir
    u.x = rand() * width
    u.y = state.groundY - rand() * 60 * u.scale
    u.phase = rand() * Math.PI * 2
    u.hue = Math.floor(rand() * 360)
  }
}

export function updateUnicorn(state: UnicornSceneState, dt: number) {
  state.time += dt
  const w = state.width

  for (let i = 0; i < state.pixies.length; i++) {
    const p = state.pixies[i]
    p.x += p.vx * dt
    p.phase += p.freq * dt
    p.twinkle += dt * 3
    p.y = p.baseY + Math.sin(p.phase) * p.amp
    if (p.x > w + 12) p.x = -12
    if (p.x < -12) p.x = w + 12
  }

  for (let i = 0; i < state.unicorns.length; i++) {
    const u = state.unicorns[i]
    u.x += u.vx * dt
    u.phase += dt * 4 // gallop rate
    // Wrap around horizontally.
    const margin = 80 * u.scale
    if (u.vx > 0 && u.x > w + margin) u.x = -margin
    if (u.vx < 0 && u.x < -margin) u.x = w + margin
  }
}

/** Draw the giant rainbow band that spans the viewport. */
function drawRainbow(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  time: number
) {
  // Sky fill first.
  const sky = ctx.createLinearGradient(0, 0, 0, h)
  sky.addColorStop(0, "#fef3ff")
  sky.addColorStop(0.5, "#ffe9f4")
  sky.addColorStop(1, "#e7f5ff")
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, w, h)

  // Giant arc: a stack of stroked arcs in rainbow colors. Center
  // below the viewport so the band sweeps across the whole screen.
  const cx = w * 0.5
  const cy = h * 1.05
  const baseR = Math.max(w, h) * 0.95
  const bands = [
    "#ff5577",
    "#ff9a3c",
    "#ffd23f",
    "#7fd66b",
    "#3fb8ff",
    "#7a6bff",
    "#c86bff",
  ]
  const breathe = 1 + Math.sin(time * 0.6) * 0.005
  const bandW = 22
  for (let i = 0; i < bands.length; i++) {
    ctx.beginPath()
    ctx.strokeStyle = bands[i]
    ctx.lineWidth = bandW
    ctx.globalAlpha = 0.85
    ctx.arc(
      cx,
      cy,
      (baseR - i * bandW) * breathe,
      Math.PI,
      Math.PI * 2,
      false
    )
    ctx.stroke()
  }
  ctx.globalAlpha = 1
}

/** Draw one unicorn from primitives (no images required). */
function drawUnicorn(
  ctx: CanvasRenderingContext2D,
  u: Unicorn,
  time: number
) {
  const s = u.scale
  const bob = Math.sin(u.phase) * 4 * s
  ctx.save()
  ctx.translate(u.x, u.y + bob)
  ctx.scale(u.dir * s, s)

  // Body
  ctx.fillStyle = "#ffffff"
  ctx.strokeStyle = "#d4b3ff"
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.ellipse(0, 0, 26, 14, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // Legs (animated with phase for a gallop)
  const lp = u.phase
  ctx.strokeStyle = "#bfa3ff"
  ctx.lineWidth = 3
  const legs: Array<[number, number]> = [
    [-14, Math.sin(lp) * 4],
    [-6, Math.sin(lp + Math.PI) * 4],
    [6, Math.sin(lp + 0.6) * 4],
    [14, Math.sin(lp + Math.PI + 0.6) * 4],
  ]
  for (let i = 0; i < legs.length; i++) {
    const lx = legs[i][0]
    const ly = legs[i][1]
    ctx.beginPath()
    ctx.moveTo(lx, 8)
    ctx.lineTo(lx + ly * 0.5, 22)
    ctx.stroke()
  }

  // Neck + head
  ctx.fillStyle = "#ffffff"
  ctx.strokeStyle = "#d4b3ff"
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(18, -6)
  ctx.quadraticCurveTo(32, -16, 36, -4)
  ctx.lineTo(34, 4)
  ctx.quadraticCurveTo(28, 6, 20, 4)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Horn
  ctx.fillStyle = "#ffd23f"
  ctx.strokeStyle = "#e6a800"
  ctx.beginPath()
  ctx.moveTo(31, -14)
  ctx.lineTo(34, -26)
  ctx.lineTo(36, -14)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // Eye
  ctx.fillStyle = "#222"
  ctx.beginPath()
  ctx.arc(31, -3, 1.4, 0, Math.PI * 2)
  ctx.fill()

  // Rainbow mane
  const maneColors = ["#ff5577", "#ff9a3c", "#ffd23f", "#7fd66b", "#3fb8ff"]
  for (let i = 0; i < maneColors.length; i++) {
    ctx.fillStyle = maneColors[i]
    ctx.beginPath()
    ctx.ellipse(
      18 - i * 3,
      -8 + i * 1.5,
      5,
      3 + Math.sin(time * 4 + i) * 0.6,
      -0.4,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }

  // Rainbow tail
  for (let i = 0; i < maneColors.length; i++) {
    ctx.fillStyle = maneColors[i]
    ctx.beginPath()
    ctx.ellipse(
      -26 - i * 2,
      -2 + i * 1.4 + Math.sin(time * 3 + i) * 0.8,
      4,
      2.4,
      0.4,
      0,
      Math.PI * 2
    )
    ctx.fill()
  }

  ctx.restore()
}

export function renderUnicorn(
  state: UnicornSceneState,
  ctx: CanvasRenderingContext2D
) {
  const w = state.width
  const h = state.height
  drawRainbow(ctx, w, h, state.time)

  // Pixies (sparkles) — small additive dots with a tiny "+" highlight.
  ctx.globalCompositeOperation = "lighter"
  for (let i = 0; i < state.pixies.length; i++) {
    const p = state.pixies[i]
    const tw = 0.6 + 0.4 * Math.sin(p.twinkle)
    ctx.fillStyle = `hsla(${p.hue}, 100%, 75%, ${0.9 * tw})`
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
    if (p.size > 2) {
      ctx.strokeStyle = `hsla(${p.hue}, 100%, 85%, ${tw})`
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.moveTo(p.x - p.size * 2, p.y)
      ctx.lineTo(p.x + p.size * 2, p.y)
      ctx.moveTo(p.x, p.y - p.size * 2)
      ctx.lineTo(p.x, p.y + p.size * 2)
      ctx.stroke()
    }
  }
  ctx.globalCompositeOperation = "source-over"

  // Unicorns dance on top of pixies.
  for (let i = 0; i < state.unicorns.length; i++) {
    drawUnicorn(ctx, state.unicorns[i], state.time)
  }
}
