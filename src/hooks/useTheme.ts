import { useCallback, useEffect, useState } from 'react'
import type { ThemeMode } from '@/lib/themeAnimation'

const STORAGE_KEY = 'eforge-theme-mode'

function readInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'matrix'
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (v === 'unicorn' || v === 'matrix') return v
  } catch {
    // localStorage may be unavailable (private mode, sandbox) — fall through.
  }
  return 'matrix' // default per spec
}

export interface UseThemeReturn {
  mode: ThemeMode
  setMode: (m: ThemeMode) => void
  toggle: () => void
}

export function useTheme(): UseThemeReturn {
  const [mode, setModeState] = useState<ThemeMode>(readInitialMode)

  const persist = useCallback((m: ThemeMode) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, m)
    } catch {
      // ignore
    }
  }, [])

  const setMode = useCallback(
    (m: ThemeMode) => {
      setModeState(m)
      persist(m)
    },
    [persist],
  )

  const toggle = useCallback(() => {
    setModeState((prev) => {
      const next: ThemeMode = prev === 'matrix' ? 'unicorn' : 'matrix'
      persist(next)
      return next
    })
  }, [persist])

  // Reflect mode on <html> so plain CSS / Tailwind can react if needed.
  useEffect(() => {
    document.documentElement.dataset.themeMode = mode
  }, [mode])

  return { mode, setMode, toggle }
}

export type { ThemeMode }
