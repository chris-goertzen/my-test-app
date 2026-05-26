import * as React from "react"

type Theme = "light" | "dark" | "system"

type ThemeProviderContextValue = {
  theme: Theme
  resolvedTheme: "light" | "dark"
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = React.createContext<ThemeProviderContextValue | undefined>(
  undefined,
)

const STORAGE_KEY = "shadcn-gallery-theme"

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
}: {
  children: React.ReactNode
  defaultTheme?: Theme
}) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme
    const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null
    return stored ?? defaultTheme
  })

  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(() =>
    theme === "system" ? getSystemTheme() : theme,
  )

  React.useEffect(() => {
    const root = document.documentElement
    const next = theme === "system" ? getSystemTheme() : theme
    root.classList.remove("light", "dark")
    root.classList.add(next)
    setResolvedTheme(next)
  }, [theme])

  React.useEffect(() => {
    if (theme !== "system") return
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      const root = document.documentElement
      const next = mq.matches ? "dark" : "light"
      root.classList.remove("light", "dark")
      root.classList.add(next)
      setResolvedTheme(next)
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [theme])

  const setTheme = React.useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next)
    setThemeState(next)
  }, [])

  const value = React.useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const ctx = React.useContext(ThemeProviderContext)
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider")
  return ctx
}
