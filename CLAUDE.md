# eforge-test-app

A minimal React + TypeScript starter app for testing eForge preview functionality.

## Tech Stack

- **Framework:** React 19.2
- **Language:** TypeScript 5.9
- **Build Tool:** Vite 7.2
- **Styling:** Tailwind CSS 4.1 (with PostCSS)
- **UI Components:** shadcn/ui patterns (Button, Card)
- **Icons:** Lucide React

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.0 | UI framework |
| react-dom | 19.2.0 | React DOM bindings |
| vite | 7.2.4 | Build tool and dev server |
| typescript | 5.9.3 | Type checking |
| tailwindcss | 4.1.18 | Utility-first CSS |
| @tailwindcss/postcss | 4.1.18 | Tailwind PostCSS plugin |
| class-variance-authority | 0.7.1 | Component variant management |
| clsx | 2.1.1 | Class name utilities |
| tailwind-merge | 3.4.0 | Merge Tailwind classes |
| lucide-react | 0.563.0 | Icon library |

## Project Structure

```
eforge-test-app/
├── src/
│   ├── main.tsx          # Entry point
│   ├── App.tsx           # Main app component
│   ├── index.css         # Global styles + Tailwind
│   ├── lib/
│   │   └── utils.ts      # cn() utility for class merging
│   └── components/
│       └── ui/           # shadcn/ui components
│           ├── button.tsx
│           └── card.tsx
├── .eforge.yml           # eForge preview configuration
├── vite.config.ts        # Vite configuration with path aliases
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS with Tailwind plugin
└── tsconfig.app.json     # TypeScript config with @ alias
```

## Commands

```bash
npm install    # Install dependencies
npm run dev    # Start dev server (port 5173)
npm run build  # Build for production
npm run lint   # Run ESLint
```

## eForge Configuration

The `.eforge.yml` file configures this app for eForge preview:
- Setup: `npm install`
- Start: `npm run dev`
- Port 5173 mapped to `web`
- All routes (`/*`) proxied to web service

## Path Aliases

`@/*` maps to `./src/*` for cleaner imports:
```typescript
import { Button } from '@/components/ui/button'
```
