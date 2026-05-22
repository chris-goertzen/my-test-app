import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { useSystemReducedMotion } from "./useReducedMotion"

export type Theme = "matrix" | "unicorn"

const STORAGE_KEY = "tp.theme"
const REDUCED_KEY = "tp.reducedMotion"

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  toggle: () => void
  /**
   * Effective reduced-motion state. True if either the OS media query
   * reports reduce OR the user explicitly toggled it on in-app.
   */
  reducedMotion: boolean
  /** Just the in-app override (not the system query). */
  reducedMotionOverride: boolean
  setReducedMotionOverride: (v: boolean) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "matrix"
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    if (v === "matrix" || v === "unicorn") return v
  } catch {
    // ignore (private mode, etc.)
  }
  return "matrix"
}

function readStoredReducedOverride(): boolean {
  if (typeof window === "undefined") return false
  try {
    return window.localStorage.getItem(REDUCED_KEY) === "1"
  } catch {
    return false
  }
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemReduced = useSystemReducedMotion()
  const [theme, setThemeState] = useState<Theme>(readStoredTheme)
  const [reducedMotionOverride, setOverrideState] = useState<boolean>(
    readStoredReducedOverride
  )

  // Reflect the active theme on <html> so CSS variables can switch.
  useEffect(() => {
    if (typeof document === "undefined") return
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }, [])

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "matrix" ? "unicorn" : "matrix"
      try {
        window.localStorage.setItem(STORAGE_KEY, next)
      } catch {
        // ignore
      }
      return next
    })
  }, [])

  const setReducedMotionOverride = useCallback((v: boolean) => {
    setOverrideState(v)
    try {
      window.localStorage.setItem(REDUCED_KEY, v ? "1" : "0")
    } catch {
      // ignore
    }
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggle,
      reducedMotion: systemReduced || reducedMotionOverride,
      reducedMotionOverride,
      setReducedMotionOverride,
    }),
    [
      theme,
      setTheme,
      toggle,
      systemReduced,
      reducedMotionOverride,
      setReducedMotionOverride,
    ]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used inside a <ThemeProvider>")
  }
  return ctx
}
