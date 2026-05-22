import { useTheme } from '@/theme/useTheme'
import { cn } from '@/lib/utils'

/**
 * Floating pill that flips between Matrix and Unicorn themes.
 * Anchored bottom-right so it stays out of the way of page content
 * but is always reachable.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isMatrix = theme === 'matrix'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isMatrix ? 'Unicorn' : 'Matrix'} theme`}
      aria-pressed={!isMatrix}
      className={cn(
        'fixed bottom-5 right-5 z-50 select-none',
        'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
        'shadow-lg backdrop-blur transition-all duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        isMatrix
          ? 'border border-emerald-400/40 bg-black/70 text-emerald-300 hover:bg-black/85 focus-visible:ring-emerald-400'
          : 'border border-pink-300/60 bg-white/80 text-pink-700 hover:bg-white focus-visible:ring-pink-400',
      )}
      style={
        isMatrix
          ? { textShadow: '0 0 6px rgba(34,197,94,0.7)' }
          : { textShadow: '0 0 6px rgba(255,182,193,0.8)' }
      }
    >
      <span
        aria-hidden
        className={cn(
          'inline-flex h-5 w-5 items-center justify-center rounded-full text-[12px]',
          isMatrix ? 'bg-emerald-400/20' : 'bg-pink-200',
        )}
      >
        {isMatrix ? '✦' : '🦄'}
      </span>
      <span>
        {isMatrix ? 'Matrix' : 'Unicorn'}
        <span className="mx-1 opacity-50">/</span>
        <span className="opacity-70">
          {isMatrix ? 'Unicorn 🦄' : 'Matrix ✦'}
        </span>
      </span>
    </button>
  )
}
