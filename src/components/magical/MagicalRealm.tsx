import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { TooltipProvider } from "@/components/ui/tooltip"
import { MagicalScene } from "./MagicalScene"
import { InhabitantsCard } from "./InhabitantsCard"
import "./magical-realm.css"

type MotionState = "active" | "resting"

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)"

/** Determine the initial motion preference. Falls back to `active` outside the
 *  browser (e.g. during SSR or testing). */
function readInitialMotionState(): MotionState {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return "active"
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches ? "resting" : "active"
}

export function MagicalRealm() {
  const [motionState, setMotionState] = useState<MotionState>(
    readInitialMotionState,
  )

  // Sync with OS-level changes to prefers-reduced-motion.
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return
    }
    const mq = window.matchMedia(REDUCED_MOTION_QUERY)
    const handle = (event: MediaQueryListEvent) => {
      setMotionState(event.matches ? "resting" : "active")
    }
    mq.addEventListener("change", handle)
    return () => mq.removeEventListener("change", handle)
  }, [])

  const reduceMotion = motionState === "resting"
  const handleToggle = (checked: boolean) => {
    setMotionState(checked ? "resting" : "active")
  }

  return (
    <TooltipProvider delayDuration={120}>
      <div
        className="relative min-h-screen overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100 text-foreground"
        data-motion-state={motionState}
      >
        <MagicalScene />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col gap-8 px-6 py-12">
          <header className="space-y-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700/80">
              The Project
            </p>
            <h1 className="font-heading text-4xl font-bold text-slate-900 sm:text-5xl">
              Magical Realm
            </h1>
            <p className="mx-auto max-w-2xl text-base text-slate-700">
              A pure-CSS scene of pixies, dragons, and one very enthusiastic
              rainbow. No JavaScript animation libraries were harmed in the
              making.
            </p>
          </header>

          <div className="flex items-center justify-end">
            <label
              htmlFor="reduce-motion"
              className="flex cursor-pointer items-center gap-3 rounded-full bg-card/80 px-4 py-2 text-sm font-medium text-foreground shadow ring-1 ring-foreground/10 backdrop-blur-sm"
            >
              <span>Reduce motion</span>
              <Switch
                id="reduce-motion"
                checked={reduceMotion}
                onCheckedChange={handleToggle}
                aria-label="Reduce motion"
              />
            </label>
          </div>

          <InhabitantsCard motionActive={!reduceMotion} />
        </div>
      </div>
    </TooltipProvider>
  )
}
