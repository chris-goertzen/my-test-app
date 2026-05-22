import { useEffect, useRef } from "react"
import { useTheme, type Theme } from "@/hooks/useTheme"
import {
  createMatrixState,
  renderMatrix,
  reseedMatrix,
  updateMatrix,
  type MatrixSceneState,
} from "./matrixScene"
import {
  createUnicornState,
  renderUnicorn,
  reseedUnicorn,
  updateUnicorn,
  type UnicornSceneState,
} from "./unicornScene"

/** Stable seed so the same viewport produces the same scene each toggle. */
function viewportSeed(w: number, h: number): number {
  // Hash w/h into a 32-bit seed; deterministic given the viewport.
  return ((w * 73856093) ^ (h * 19349663)) >>> 0
}

/**
 * Full-viewport animated backdrop. Runs a single rAF loop and switches
 * between matrix and unicorn modes via a tiny state machine. Honors
 * `prefers-reduced-motion` by rendering one frame and idling.
 */
export function ThemeBackdrop() {
  const { theme, reducedMotion } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  // Refs for the values that the rAF loop needs but must not re-create.
  const themeRef = useRef<Theme>(theme)
  const reducedRef = useRef<boolean>(reducedMotion)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])
  useEffect(() => {
    reducedRef.current = reducedMotion
  }, [reducedMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const matrix: MatrixSceneState = createMatrixState()
    const unicorn: UnicornSceneState = createUnicornState()

    let lastT = performance.now()
    let rafId = 0
    let resizeQueued = false
    let lastTheme: Theme | null = null
    // Force exactly one paint when paused (reduced motion) on each
    // mode flip or resize.
    let needsForcePaint = false

    const measure = () => {
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(1, Math.floor(rect.width))
      const h = Math.max(1, Math.floor(rect.height))
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const seed = viewportSeed(w, h)
      reseedMatrix(matrix, w, h, seed)
      reseedUnicorn(unicorn, w, h, seed)
      needsForcePaint = true
    }

    const onResize = () => {
      if (resizeQueued) return
      resizeQueued = true
      requestAnimationFrame(() => {
        resizeQueued = false
        measure()
      })
    }

    const tick = (now: number) => {
      let dt = (now - lastT) / 1000
      lastT = now
      // Clamp dt — if the tab was hidden, don't jump the simulation.
      if (dt > 0.1) dt = 0.1

      const currentTheme = themeRef.current
      if (currentTheme !== lastTheme) {
        lastTheme = currentTheme
        needsForcePaint = true
      }

      const paused = reducedRef.current
      const effectiveDt = paused ? 0 : dt

      if (!paused || needsForcePaint) {
        if (currentTheme === "matrix") {
          if (!paused) updateMatrix(matrix, effectiveDt)
          renderMatrix(matrix, ctx)
        } else {
          if (!paused) updateUnicorn(unicorn, effectiveDt)
          renderUnicorn(unicorn, ctx)
        }
        needsForcePaint = false
      }

      rafId = requestAnimationFrame(tick)
    }

    measure()
    rafId = requestAnimationFrame(tick)
    window.addEventListener("resize", onResize, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="theme-backdrop"
      data-theme={theme}
    />
  )
}
