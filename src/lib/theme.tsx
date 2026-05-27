import * as React from "react"
import {
  ThemeContext,
  readStoredTheme,
  writeStoredTheme,
  type Theme,
} from "@/lib/theme-context"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => readStoredTheme())

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next)
    writeStoredTheme(next)
  }, [])

  const toggleTheme = React.useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "matrix" ? "unicorn" : "matrix"
      writeStoredTheme(next)
      return next
    })
  }, [])

  const value = React.useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
