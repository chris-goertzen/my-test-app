import { useState } from "react";
import { AnimatedScene } from "./AnimatedScene";
import { InhabitantsCard } from "./InhabitantsCard";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function MagicalRealmLanding() {
  const systemPrefersReduced = usePrefersReducedMotion();

  // `undefined` means "follow the system preference". Once the user touches
  // the switch we lock to their explicit choice.
  const [userOverride, setUserOverride] = useState<boolean | undefined>(
    undefined,
  );

  const reduceMotion = userOverride ?? systemPrefersReduced;

  return (
    <div
      className={
        "relative min-h-screen overflow-hidden text-white " +
        (reduceMotion ? "motion-paused " : "")
      }
    >
      {/* Animated scene sits behind everything */}
      <AnimatedScene />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 md:py-24">
        <header className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-white/70">
            Welcome to the
          </p>
          <h1
            className="mt-2 bg-gradient-to-br from-amber-200 via-fuchsia-200 to-sky-200 bg-clip-text text-5xl font-bold text-transparent drop-shadow md:text-7xl"
            style={{
              textShadow:
                "0 4px 30px rgba(255, 200, 240, 0.35), 0 0 12px rgba(255,255,255,0.2)",
            }}
          >
            Magical Realm
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/85 md:text-lg">
            A wandering pocket of dawnlight where pixies trace the air and slow
            dragons cut across a rainbow horizon.
          </p>
        </header>

        <InhabitantsCard
          reduceMotion={reduceMotion}
          onToggleReduceMotion={setUserOverride}
        />

        <footer className="text-center text-xs text-white/60">
          Animations are CSS-only. Toggle{" "}
          <span className="font-medium text-white/80">Reduce motion</span> to
          let the scene rest — the page also respects your system preference.
        </footer>
      </div>
    </div>
  );
}
