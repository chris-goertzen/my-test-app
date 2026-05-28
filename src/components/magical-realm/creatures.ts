export type CreatureKind = "pixie" | "dragon";

export interface Creature {
  id: string;
  name: string;
  kind: CreatureKind;
  lore: string;
  /** Total motion duration (path animation) */
  duration: string;
  /** Easing function string */
  easing: string;
  /** Optional delay */
  delay?: string;
  /** Secondary timing — sparkle for pixies, wing-flap for dragons */
  secondary: {
    label: string;
    duration: string;
    easing: string;
  };
}

export const CREATURES: Creature[] = [
  {
    id: "pixie-1",
    name: "Lumina",
    kind: "pixie",
    lore:
      "First-light pixie of the dawn glade — her dust quickens the petals of moonflowers.",
    duration: "11s",
    easing: "ease-in-out",
    secondary: {
      label: "sparkle",
      duration: "1.8s",
      easing: "ease-in-out",
    },
  },
  {
    id: "pixie-2",
    name: "Thistle",
    kind: "pixie",
    lore:
      "A trickster sprite who weaves loops through bramble-arches near the hawthorn.",
    duration: "14s",
    easing: "cubic-bezier(.37,0,.63,1)",
    secondary: {
      label: "sparkle",
      duration: "2.4s",
      easing: "ease-out",
    },
  },
  {
    id: "pixie-3",
    name: "Mirabel",
    kind: "pixie",
    lore:
      "Tends the chiming bluebells — her quick darts keep the meadow song in tune.",
    duration: "9s",
    easing: "cubic-bezier(.45,.05,.55,.95)",
    secondary: {
      label: "sparkle",
      duration: "1.2s",
      easing: "linear",
    },
  },
  {
    id: "pixie-4",
    name: "Nyx",
    kind: "pixie",
    lore:
      "A dusk-dancer whose slow wandering glow steers fireflies back to their hollows.",
    duration: "16s",
    easing: "cubic-bezier(.5,0,.5,1)",
    secondary: {
      label: "sparkle",
      duration: "3s",
      easing: "ease-in",
    },
  },
  {
    id: "dragon-1",
    name: "Vermillion",
    kind: "dragon",
    lore:
      "An emberscale wyrm who patrols the cliff updrafts at the realm's eastern edge.",
    duration: "14s",
    easing: "ease-in-out",
    secondary: {
      label: "wing-flap",
      duration: "0.9s",
      easing: "ease-in-out",
    },
  },
  {
    id: "dragon-2",
    name: "Celest",
    kind: "dragon",
    lore:
      "A silver-mist drake who threads the higher currents, trailing soft thunder.",
    duration: "14s",
    easing: "cubic-bezier(.4,0,.6,1)",
    delay: "-6s",
    secondary: {
      label: "wing-flap",
      duration: "1.3s",
      easing: "cubic-bezier(.37,0,.63,1)",
    },
  },
];
