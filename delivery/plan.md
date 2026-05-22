# Plan: Theme toggle (Matrix ↔ Unicorn)

Work item: Realize theme toggle for "The Project" — an always-available
control that switches between two opinionated, animated themes.

## Goals

- Always-available toggle to switch between `matrix` (default) and `unicorn`
  themes.
- Themes are immersive: each owns the page background with an animated
  full-viewport backdrop layer behind the existing app UI.
- Switching is immediate, layout-preserving, and visually smooth.
- Honor `prefers-reduced-motion` (and an explicit per-app setting) by
  reducing or disabling animations while keeping the visual theme intact.
- Performance: keep animations on a single shared `<canvas>` driven by one
  `requestAnimationFrame` loop, recycle particle objects (no per-frame
  allocations in the hot path), throttle resize.

## Approach

- A `ThemeProvider` context exposes `{ theme, setTheme, toggle, reducedMotion }`
  and persists the user's choice in `localStorage`. Default is `matrix`.
- A `ThemeToggle` button (top-right, fixed) lets the user flip themes; it
  also exposes an ARIA-friendly "reduce motion" toggle.
- A single `ThemeBackdrop` canvas component renders both modes from a tiny
  animation state machine:
  - `mode: 'matrix' | 'unicorn'`
  - `update(dt)` updates the live mode's particles.
  - `render(ctx)` draws the live mode.
  - Both modes share the same particle pool sized to viewport area; the
    pool is re-seeded deterministically (PRNG) when the mode flips so
    columns / pixies feel coherent rather than random per toggle.
- The existing UI keeps its layout; theme-aware CSS variables drive
  foreground colors so the cards/text remain readable against either
  backdrop.

## Files

```
delivery/
  plan.md                              (this file)
  implementation.md                    (implementation log)
src/
  hooks/
    useTheme.tsx                       (ThemeProvider + useTheme hook)
    useReducedMotion.ts                (media-query hook)
  components/
    ThemeToggle/
      ThemeToggle.tsx                  (the toggle UI)
      index.ts
    backdrops/
      ThemeBackdrop.tsx                (canvas host)
      matrixScene.ts                   (matrix update/render)
      unicornScene.ts                  (unicorn update/render)
      prng.ts                          (seeded RNG helper)
      index.ts
  App.tsx                              (wires provider + backdrop + toggle)
  index.css                            (theme CSS vars + transition)
```

## Acceptance checklist

- [x] Toggle visible from every state of the page.
- [x] Default theme is `matrix` on first load.
- [x] Matrix mode: dark BG, falling glyph columns, subtle green glow,
      occasional brighter streaks.
- [x] Unicorn mode: rainbow band across viewport, fluttering pixies,
      dancing unicorn sprites, sparkles.
- [x] Toggle is instant; layout doesn't shift; foreground colors fade.
- [x] `prefers-reduced-motion` → animations pause to a static, still
      composition; theme visuals remain.
- [x] No per-frame `new`/array allocations in the render hot path.
- [x] Resize handler is throttled with `requestAnimationFrame`.
