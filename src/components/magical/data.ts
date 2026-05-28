export type CreatureType = "pixie" | "dragon"

export interface AnimationTiming {
  /** CSS @keyframes name. */
  keyframe: string
  /** CSS animation-duration value (e.g. "11s"). */
  duration: string
  /** CSS animation-delay value (e.g. "-2.5s"). */
  delay: string
  /** CSS animation-timing-function value. */
  easing: string
}

export interface Creature {
  id: string
  type: CreatureType
  name: string
  lore: string
  /** Primary path animation (orbit / pan). */
  motion: AnimationTiming
  /** Wing-flap animation, dragons only. */
  wingFlap?: AnimationTiming
}

export const CREATURES: readonly Creature[] = [
  {
    id: "lumi",
    type: "pixie",
    name: "Lumi",
    lore: "A spark of dawn drifting through morning mist.",
    motion: {
      keyframe: "pixie-orbit",
      duration: "11s",
      delay: "0s",
      easing: "ease-in-out",
    },
  },
  {
    id: "mira",
    type: "pixie",
    name: "Mira",
    lore: "Curious wanderer who dances along rainbow hems.",
    motion: {
      keyframe: "pixie-arc",
      duration: "14s",
      delay: "-2.5s",
      easing: "linear",
    },
  },
  {
    id: "pip",
    type: "pixie",
    name: "Pip",
    lore: "Tiny prankster with stardust laughter.",
    motion: {
      keyframe: "pixie-zigzag",
      duration: "9s",
      delay: "-1s",
      easing: "cubic-bezier(0.5, 0.05, 0.5, 0.95)",
    },
  },
  {
    id: "vela",
    type: "pixie",
    name: "Vela",
    lore: "A quiet glider weaving silver thread between dewdrops.",
    motion: {
      keyframe: "pixie-spiral",
      duration: "17s",
      delay: "-5s",
      easing: "ease-in-out",
    },
  },
  {
    id: "aurion",
    type: "dragon",
    name: "Aurion",
    lore: "Sun-scaled wyrm of the eastern crests.",
    motion: {
      keyframe: "dragon-pan-a",
      duration: "14s",
      delay: "0s",
      easing: "linear",
    },
    wingFlap: {
      keyframe: "wing-flap-a",
      duration: "0.9s",
      delay: "0s",
      easing: "ease-in-out",
    },
  },
  {
    id: "noctis",
    type: "dragon",
    name: "Noctis",
    lore: "Twilight drake whose shadow trails behind it.",
    motion: {
      keyframe: "dragon-pan-b",
      duration: "14.5s",
      delay: "-3s",
      easing: "linear",
    },
    wingFlap: {
      keyframe: "wing-flap-b",
      duration: "1.1s",
      delay: "-0.2s",
      easing: "ease-in-out",
    },
  },
] as const
