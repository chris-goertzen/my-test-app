import * as React from "react"
import { Sparkles, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/lib/use-theme"
import type { Theme } from "@/lib/theme-context"

/**
 * ThemeToggle
 *
 * A fixed-position pill toggle for switching between MATRIX and UNICORN
 * themes. Acts as a real radiogroup for accessibility while looking like a
 * segmented control.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: "matrix", label: "MATRIX", icon: <Terminal className="h-4 w-4" /> },
    { value: "unicorn", label: "UNICORN", icon: <Sparkles className="h-4 w-4" /> },
  ]

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border border-white/30 bg-black/40 p-1 shadow-lg backdrop-blur-md",
        className
      )}
    >
      {options.map((opt) => {
        const active = theme === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setTheme(opt.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
              active
                ? opt.value === "matrix"
                  ? "bg-green-400 text-black shadow-[0_0_12px_rgba(57,255,20,0.7)]"
                  : "bg-gradient-to-r from-pink-400 via-yellow-300 to-sky-400 text-black shadow-[0_0_12px_rgba(255,180,255,0.8)]"
                : "text-white/80 hover:text-white"
            )}
          >
            {opt.icon}
            <span>{opt.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ThemeToggle
