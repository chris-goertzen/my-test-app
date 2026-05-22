import { useTheme } from '@/theme/useTheme'
import MatrixRainLayer from './MatrixRainLayer'
import UnicornRainbowPixiesLayer from './UnicornRainbowPixiesLayer'

/**
 * Mounts exactly one animated layer at a time based on the current theme.
 *
 * Mounting/unmounting (rather than toggling visibility) is what guarantees
 * the previous layer's requestAnimationFrame loop is cancelled in its
 * effect cleanup — no overlapping RAFs across theme switches.
 */
export default function ThemeBackground() {
  const { theme } = useTheme()
  return theme === 'matrix' ? <MatrixRainLayer /> : <UnicornRainbowPixiesLayer />
}
