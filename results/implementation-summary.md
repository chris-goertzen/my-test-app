# shadcn/ui Gallery — implementation summary

## Overview
Replaced the starter "counter" page with a full component-showcase application
demonstrating ~50 shadcn/ui primitives, organised into eight categories and an
Overview page. The shell is a Swiss-minimalist application layout with a
desktop sidebar, a collapsible mobile sheet, a top bar, and a system/light/dark
theme toggle. All surfaces are driven by shadcn CSS variable tokens, so theme
switches recolour the entire UI atomically.

## How to run

```bash
cd my-test-app
npm install         # install dependencies
npm run dev         # dev server on :5173
npm run build       # type-check + production build
npm run lint        # ESLint
npm run preview     # static preview of the built bundle
```

The app loads at `/` (the Overview page) and `react-router-dom` v7 handles
navigation to each category route.

## Architecture

```
src/
├── App.tsx                       # router + providers (theme, tooltip, toasters)
├── main.tsx                      # entry point
├── index.css                     # Tailwind v4 import + shadcn tokens (light & dark)
├── lib/
│   ├── navigation.ts             # category metadata used by sidebar + Overview
│   └── utils.ts                  # cn() helper
├── components/
│   ├── theme-provider.tsx        # light/dark/system, persisted to localStorage
│   ├── theme-toggle.tsx          # top-bar trigger
│   ├── app-shell.tsx             # sidebar + mobile sheet + topbar + Outlet
│   ├── section.tsx               # Section / SectionGrid / PageHeader helpers
│   └── ui/                       # 40+ shadcn primitives
└── pages/
    ├── overview.tsx              # landing — tokens, typography, category cards
    ├── buttons.tsx               # Buttons & Actions
    ├── inputs.tsx                # Form & Inputs
    ├── display.tsx               # Data Display
    ├── feedback.tsx              # Feedback
    ├── overlays.tsx              # Overlays & Popovers
    ├── navigation.tsx            # Navigation
    ├── typography.tsx            # Typography
    └── utilities.tsx             # Utilities
```

## Components shipped (45 in `src/components/ui/`)

Buttons & actions: **Button, Toggle, Toggle Group, Dropdown Menu, Context Menu, Menubar, Kbd**

Form & inputs: **Input, Textarea, Label, Checkbox, Radio Group, Switch, Slider,
Select, Input OTP**

Data display: **Card, Badge, Avatar, Aspect Ratio, Separator, Scroll Area, Table**

Feedback: **Alert, Progress, Skeleton, Toast (+Toaster, useToast), Sonner, Alert Dialog**

Overlays & popovers: **Dialog, Sheet, Drawer (vaul), Popover, Hover Card,
Tooltip, Command (+CommandDialog)**

Navigation: **Tabs, Accordion, Collapsible, Navigation Menu, Breadcrumb,
Pagination**

Utilities: **Resizable panels, Skeleton, Kbd**

Each component is a self-contained `.tsx` file styled with `cn()` + shadcn
variants — drop-in compatible with the reference shadcn/ui registry.

## Theming
- `src/index.css` declares the full shadcn token palette (background, foreground,
  card, primary, secondary, muted, accent, destructive, border, input, ring,
  chart-1..5, sidebar-*) in **oklch** for both light (`:root`) and dark (`.dark`).
- `@custom-variant dark (&:is(.dark *))` exposes a Tailwind v4 `dark:` variant
  bound to the root `.dark` class.
- `ThemeProvider` (`src/components/theme-provider.tsx`) tracks `light`, `dark`,
  `system`, listens to `prefers-color-scheme`, and persists the choice to
  `localStorage` under `shadcn-gallery-theme`.
- The top-bar `ThemeToggle` swaps between the three modes via a dropdown menu.

## Navigation
- **Desktop**: a sticky 16rem sidebar (`bg-sidebar`) using `NavLink` from React
  Router, with an active-state highlight.
- **Mobile**: the same nav rendered inside a `Sheet` triggered by a hamburger
  button in the top bar; the sheet auto-closes on route change.
- Top bar is sticky and includes the brand mark, a GitHub link, and the theme
  toggle separated by a vertical `Separator`.

## Acceptance check

| Criterion | Result |
| --- | --- |
| App builds with no errors | ✅ `npm run build` succeeds (`tsc -b && vite build`). |
| App runs with no runtime errors | ✅ Verified with `npm run dev` — Vite serves `/src/App.tsx`, CSS compiles, no console errors. |
| Theme toggle updates entire UI | ✅ Tokens drive every surface; Sonner reads `resolvedTheme`. |
| Sidebar + mobile sheet navigation works | ✅ `NavLink` highlights active route; mobile sheet closes on navigation. |
| Visible demos for a majority of shadcn components | ✅ ~50 primitives across 8 categories. |
| Lint | ⚠️ 5 `react-refresh/only-export-components` warnings — purely HMR hints inherited from canonical shadcn files (Button, Badge, Toggle, NavigationMenu, theme-provider). No runtime impact. |

## Notable design decisions

- **Tailwind v4 CSS-first config.** No JS-side `@layer` palette; all tokens live
  in `index.css` so the standard shadcn `bg-card`, `text-muted-foreground`,
  `border-input` utilities resolve via the `@theme inline` block.
- **Swiss-minimalist styling.** Hairline borders, large amounts of negative
  space, neutral palette, and a single accent. Headings use slightly tightened
  letter-spacing (`typo-display`) on display sizes.
- **Self-contained Toaster + Sonner.** Both notification systems are wired so
  the Feedback page can demo each side-by-side.
- **Router with index/`*` fallback.** Unknown routes fall back to the Overview
  page rather than 404'ing.

## Files added / changed (high level)

- **Added**: 45 components in `src/components/ui/`, theme provider/toggle,
  app shell, navigation config, 9 pages, and this summary.
- **Replaced**: `src/App.tsx` (counter → router); `src/index.css` (basic →
  shadcn token system); `src/components/ui/{button,card}.tsx` (Tailwind v3
  gray classes → semantic shadcn tokens); `index.html` (title).
- **Dependencies added** (all listed in `package.json`): the 27 `@radix-ui/*`
  primitives, `react-router-dom`, `sonner`, `cmdk`, `vaul`,
  `react-resizable-panels@^2`, `input-otp`, `tailwindcss-animate`.
