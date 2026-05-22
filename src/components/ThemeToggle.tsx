import { Sparkles, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { ThemeMode } from '@/lib/themeAnimation'

interface ThemeToggleProps {
  mode: ThemeMode
  onToggle: () => void
  className?: string
}

/**
 * Always-visible toggle between Matrix and Unicorn modes.
 *
 * Accessibility:
 * - Native <button> via shadcn Button → focusable and keyboard-operable
 *   (Enter/Space) for free.
 * - role="switch" + aria-checked describes the binary state to AT.
 * - aria-label states what the next press will do, so screen readers
 *   announce the action instead of just the current mode.
 */
export function ThemeToggle({ mode, onToggle, className }: ThemeToggleProps) {
  const isUnicorn = mode === 'unicorn'
  const nextLabel = isUnicorn ? 'Matrix' : 'Unicorn'

  return (
    <Button
      type="button"
      role="switch"
      aria-checked={isUnicorn}
      aria-label={`Switch to ${nextLabel} theme`}
      title={`Switch to ${nextLabel} theme`}
      onClick={onToggle}
      variant={isUnicorn ? 'default' : 'secondary'}
      className={className}
    >
      {isUnicorn ? (
        <Terminal className="h-4 w-4 mr-2" aria-hidden="true" />
      ) : (
        <Sparkles className="h-4 w-4 mr-2" aria-hidden="true" />
      )}
      <span>Switch to {nextLabel}</span>
    </Button>
  )
}
