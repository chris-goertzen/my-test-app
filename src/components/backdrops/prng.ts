/**
 * mulberry32 — small deterministic 32-bit PRNG.
 *
 * Used so that re-seeding when the theme flips produces a coherent,
 * stable scene per viewport size rather than a fresh-random one each
 * toggle. Picked because it's tiny, fast, and good-enough for visuals.
 */
export function mulberry32(seed: number): () => number {
  let s = seed >>> 0
  return function rand() {
    s = (s + 0x6d2b79f5) >>> 0
    let t = s
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
