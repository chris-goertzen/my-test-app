import * as React from "react"

export type Theme = "matrix" | "unicorn"

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined
)

export const STORAGE_KEY = "eforge-theme"
export const DEFAULT_THEME: Theme = "matrix"

export function readStoredTheme(): Theme {
  if (typeof window === "undefined") return DEFAULT_THEME
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === "matrix" || stored === "unicorn") return stored
  } catch {
    // ignore (private mode, disabled storage, etc.)
  }
  return DEFAULT_THEME
}

export function writeStoredTheme(theme: Theme) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // ignore
  }
}
