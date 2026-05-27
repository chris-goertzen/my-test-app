import { useTheme } from "@/lib/use-theme"
import { MatrixRain } from "@/components/MatrixRain"
import { UnicornScene } from "@/components/UnicornScene"

/**
 * ThemeBackground renders the active background animation. Switching themes
 * unmounts the previous component so its RAF loop is cleaned up via the
 * useEffect cleanup in the canvas components.
 */
export function ThemeBackground() {
  const { theme } = useTheme()
  return theme === "matrix" ? <MatrixRain /> : <UnicornScene />
}

export default ThemeBackground
