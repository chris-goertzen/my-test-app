# Implementation notes: Theme toggle (Matrix ↔ Unicorn)

## Architecture

```
<ThemeProvider>            ← context (theme, toggle, reducedMotion)
  <ThemeBackdrop />        ← single full-viewport <canvas>, fixed -z
  <ThemeToggle />          ← fixed top-right button
  <App content />          ← unchanged layout, theme-aware colors
</ThemeProvider>
```

## Animation engine

A single `requestAnimationFrame` loop in `ThemeBackdrop` calls:

```ts
scene.update(dt, state)
scene.render(ctx, state)
```

`state` carries pre-allocated typed-array-style pools:

- `columns` — for matrix glyphs (one entry per column).
- `pixies` — for unicorn pixies/sparkles.
- `unicorns` — small fixed pool of dancing unicorn sprites.

Pools are sized once on resize (throttled via `rAF`). Switching theme
re-seeds the pool deterministically via `mulberry32` so the same viewport
always produces the same shimmer pattern — a stable, "delightful but not
disorienting" surface.

## Reduced motion

`useReducedMotion()` returns `true` when:

- `window.matchMedia('(prefers-reduced-motion: reduce)').matches`, or
- The provider's explicit `reducedMotion` state is `true`.

When reduced motion is on, the rAF loop renders one frame on mode change
or resize and then idles — no animation, but the theme still fills the
viewport (a static frame).

## Performance choices

- One canvas, one rAF loop — no React re-renders during animation.
- Hot path uses scratch numbers; arrays are reused. No allocation of
  particles per frame.
- Resize handler debounced through a single queued `rAF`.
- Canvas uses `devicePixelRatio` capped at 2 to keep fill cost bounded
  on retina displays.
- The toggle's mode flip is just an assignment on a ref — no re-mount,
  no canvas recreation; the next animation frame switches modes.

## Theming

`<html>` gets `data-theme="matrix" | "unicorn"`. `index.css` defines
CSS variables for foreground / surface colors per theme, with a 250ms
transition on `color` and `background-color` so the existing cards fade
nicely across the flip. The canvas background owns the page background;
`body` is transparent.

## Accessibility

- The toggle is a real `<button>` with `aria-pressed` for the unicorn
  state and an `aria-label` describing the next theme.
- A secondary smaller button toggles reduced motion (`aria-pressed`
  reflects current state).
- Toggle has a visible focus ring inherited from the existing Button
  pattern.
