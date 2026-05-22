import { useEffect, useRef } from 'react'
import { ThemeAnimation, type ThemeMode } from '@/lib/themeAnimation'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface ThemeBackgroundProps {
  mode: ThemeMode
}

/**
 * Fullscreen canvas backdrop driven by a single ThemeAnimation instance.
 * Lives behind all app content (`-z-10`) and ignores pointer events so the
 * UI on top stays interactive. Switching `mode` flips scenes immediately
 * with no layout shift (the canvas size never changes).
 */
export function ThemeBackground({ mode }: ThemeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animRef = useRef<ThemeAnimation | null>(null)
  const reduced = useReducedMotion()

  // One-time setup; teardown on unmount.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const anim = new ThemeAnimation(canvas)
    animRef.current = anim
    anim.setReducedMotion(reduced)
    anim.setMode(mode)
    anim.start()

    const onResize = (): void => anim.resize()
    const onVisibility = (): void => {
      if (document.hidden) anim.stop()
      else anim.start()
    }
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
      anim.destroy()
      animRef.current = null
    }
    // We intentionally run setup only once; subsequent prop changes are
    // forwarded by the effects below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    animRef.current?.setMode(mode)
  }, [mode])

  useEffect(() => {
    animRef.current?.setReducedMotion(reduced)
  }, [reduced])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-screen w-screen pointer-events-none"
    />
  )
}
