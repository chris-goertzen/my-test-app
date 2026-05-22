import { Sparkles, Terminal, Accessibility } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

/**
 * Always-available floating toggle. Lives in the top-right of the
 * viewport and flips between matrix and unicorn themes. Includes a
 * smaller reduced-motion override button.
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const {
    theme,
    toggle,
    reducedMotion,
    reducedMotionOverride,
    setReducedMotionOverride,
  } = useTheme()

  const isUnicorn = theme === "unicorn"
  const nextLabel = isUnicorn ? "matrix" : "unicorn"

  return (
    <div
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center gap-2",
        className
      )}
    >
      <button
        type="button"
        onClick={toggle}
        aria-pressed={isUnicorn}
        aria-label={`Switch to ${nextLabel} theme`}
        title={`Switch to ${nextLabel} theme`}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full px-4 py-2",
          "text-sm font-medium shadow-lg backdrop-blur",
          "border transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          isUnicorn
            ? "bg-white/85 text-pink-700 border-pink-300 hover:bg-white focus-visible:ring-pink-400"
            : "bg-black/70 text-emerald-300 border-emerald-500/40 hover:bg-black/85 focus-visible:ring-emerald-400"
        )}
      >
        <span
          className={cn(
            "relative inline-flex h-5 w-5 items-center justify-center",
            "transition-transform duration-300",
            isUnicorn ? "rotate-0" : "-rotate-12"
          )}
          aria-hidden="true"
        >
          {isUnicorn ? (
            <Sparkles className="h-5 w-5" />
          ) : (
            <Terminal className="h-5 w-5" />
          )}
        </span>
        <span className="tracking-wide">
          {isUnicorn ? "Unicorn" : "Matrix"}
        </span>
      </button>

      <button
        type="button"
        onClick={() => setReducedMotionOverride(!reducedMotionOverride)}
        aria-pressed={reducedMotionOverride}
        aria-label={
          reducedMotionOverride
            ? "Disable reduced motion override"
            : "Enable reduced motion override"
        }
        title={
          reducedMotion
            ? "Reduced motion is on"
            : "Toggle reduced motion"
        }
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full",
          "shadow-lg backdrop-blur border transition-all duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          reducedMotion
            ? isUnicorn
              ? "bg-pink-500/90 text-white border-pink-300 focus-visible:ring-pink-400"
              : "bg-emerald-500/90 text-black border-emerald-300 focus-visible:ring-emerald-400"
            : isUnicorn
              ? "bg-white/85 text-pink-700 border-pink-300 hover:bg-white focus-visible:ring-pink-400"
              : "bg-black/70 text-emerald-300 border-emerald-500/40 hover:bg-black/85 focus-visible:ring-emerald-400"
        )}
      >
        <Accessibility className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  )
}
