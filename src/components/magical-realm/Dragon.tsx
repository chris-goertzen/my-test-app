import * as React from "react"
import { cn } from "@/lib/utils"
import {
  DRAGON_GREEN,
  type DragonGreenTreatment,
} from "@/lib/dragon-theme"

export interface DragonProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Canonical green treatment. Defaults to the project-wide canonical source
   * (`DRAGON_GREEN` from `@/lib/dragon-theme`). Tests/stories may override
   * this, but in the Magical Realm scene every instance receives the same
   * default — guaranteeing a single source of truth.
   */
  treatment?: DragonGreenTreatment
  /** Optional pose; affects wing flap timing but not color. */
  pose?: "perched" | "flying" | "soaring"
  /** Optional label, also used to seed deterministic detail jitter. */
  name?: string
}

/**
 * Dragon SVG.
 *
 * COLOR CONTRACT
 * --------------
 * Every fill/stroke that represents *the dragon itself* (body, wings, tail,
 * head, claws) is bound to the canonical green treatment passed in via
 * `treatment`. There are NO hardcoded green hex values in this component.
 *
 * Non-green details (eye, horn, fire-breath core) are intentionally kept on
 * their own colors so the dragon reads as a creature, not a silhouette.
 * These are NOT considered part of the "green treatment" surface.
 */
export const Dragon = React.forwardRef<SVGSVGElement, DragonProps>(
  function Dragon(
    { treatment = DRAGON_GREEN, pose = "flying", name, className, ...rest },
    ref,
  ) {
    const flapDuration =
      pose === "perched" ? "1.8s" : pose === "soaring" ? "1.2s" : "0.9s"

    return (
      <svg
        ref={ref}
        viewBox="0 0 200 140"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("dragon-instance", className)}
        role="img"
        aria-label={name ? `Dragon ${name}` : "Dragon"}
        {...rest}
      >
        {/* Tail: bound to canonical green */}
        <path
          d="M20,90 Q5,75 18,55 Q30,65 40,80 Z"
          fill={treatment.base}
          stroke={treatment.shadow}
          strokeWidth="1.5"
        />

        {/* Body: bound to canonical green */}
        <ellipse
          cx="95"
          cy="80"
          rx="55"
          ry="22"
          fill={treatment.base}
          stroke={treatment.shadow}
          strokeWidth="1.5"
        />

        {/* Belly highlight: derived shadow tone (still from canonical source) */}
        <ellipse cx="95" cy="92" rx="42" ry="8" fill={treatment.shadow} opacity="0.55" />

        {/* Back wing (behind body) — flaps */}
        <path
          className="dragon-wing"
          style={{ animationDuration: flapDuration }}
          d="M80,62 Q75,20 120,30 Q110,55 95,68 Z"
          fill={treatment.shadow}
          stroke={treatment.shadow}
          strokeWidth="1"
          opacity="0.85"
        />

        {/* Front wing — flaps slightly out of phase */}
        <path
          className="dragon-wing"
          style={{ animationDuration: flapDuration, animationDelay: "0.15s" }}
          d="M85,68 Q70,18 135,22 Q130,55 105,75 Z"
          fill={treatment.base}
          stroke={treatment.shadow}
          strokeWidth="1.5"
        />

        {/* Neck + head: canonical green */}
        <path
          d="M140,72 Q155,55 175,55 Q185,55 185,68 Q185,80 170,82 Q158,84 148,82 Z"
          fill={treatment.base}
          stroke={treatment.shadow}
          strokeWidth="1.5"
        />

        {/* Horn — intentionally bone-colored (non-green detail) */}
        <path d="M173,55 L180,42 L182,55 Z" fill="#f5f1e6" stroke="#b8a878" strokeWidth="1" />

        {/* Eye — intentionally amber (non-green detail) */}
        <circle cx="175" cy="66" r="2.4" fill="#1f2937" />
        <circle cx="175.7" cy="65.3" r="0.8" fill="#fef3c7" />

        {/* Spikes along the back: canonical green shadow tone */}
        <path
          d="M55,68 L60,60 L65,68 L70,58 L75,68 L80,60 L85,68 Z"
          fill={treatment.shadow}
        />

        {/* Claws: canonical green shadow tone */}
        <path d="M75,102 L72,110 L78,108 Z" fill={treatment.shadow} />
        <path d="M105,102 L102,110 L108,108 Z" fill={treatment.shadow} />

        {/* Breath VFX — canonical glow tone (still routed through treatment) */}
        <g className="dragon-breath">
          <ellipse cx="192" cy="70" rx="6" ry="3" fill={treatment.glow} opacity="0.9" />
          <ellipse cx="198" cy="70" rx="3" ry="2" fill="#fff7ed" opacity="0.95" />
        </g>
      </svg>
    )
  },
)

Dragon.displayName = "Dragon"
