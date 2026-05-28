/**
 * Canonical green treatment source for ALL dragons in the Magical Realm.
 *
 * This module is the single source of truth for dragon coloring. Every dragon
 * instance — whether rendered as SVG fill/stroke, as a CSS background, or as a
 * filter/glow — MUST route through these helpers. Non-dragon scene objects
 * (sun, clouds, mountains, castle, trees, etc.) must NOT reference these
 * helpers; they keep their own colors.
 *
 * The actual color value lives in `src/index.css` as the `--dragon-green`
 * custom property so that themes (light/dark) can override it in one place
 * without touching component code.
 */

/** Name of the CSS custom property that holds the canonical dragon green. */
export const DRAGON_GREEN_VAR = "--dragon-green" as const;

/** Name of the CSS custom property that holds the darker shaded dragon green
 *  (used for shadows / wing undersides). Derived from `--dragon-green`. */
export const DRAGON_GREEN_SHADOW_VAR = "--dragon-green-shadow" as const;

/** Name of the CSS custom property that holds the dragon glow/aura color. */
export const DRAGON_GREEN_GLOW_VAR = "--dragon-green-glow" as const;

/**
 * Returns a CSS `var()` expression pointing at the canonical dragon green.
 * Use this for SVG `fill` / `stroke` attributes and style values.
 */
export function dragonGreen(): string {
  return `var(${DRAGON_GREEN_VAR})`;
}

/** Darker shade used for dragon body shadows and wing undersides. */
export function dragonGreenShadow(): string {
  return `var(${DRAGON_GREEN_SHADOW_VAR})`;
}

/** Glow / aura color used for dragon VFX (sparkles, breath, halo). */
export function dragonGreenGlow(): string {
  return `var(${DRAGON_GREEN_GLOW_VAR})`;
}

/**
 * Convenience object grouping the canonical dragon treatment.
 * Useful when passing the whole treatment down to a Dragon component.
 */
export const DRAGON_GREEN = {
  base: dragonGreen(),
  shadow: dragonGreenShadow(),
  glow: dragonGreenGlow(),
} as const;

export type DragonGreenTreatment = typeof DRAGON_GREEN;
