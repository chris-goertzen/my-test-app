import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Plus, Zap, Code, Rocket } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ThemeBackdrop } from '@/components/backdrops'
import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/lib/utils'

function App() {
  const [count, setCount] = useState(0)
  const { theme } = useTheme()
  const isUnicorn = theme === 'unicorn'

  return (
    <>
      <ThemeBackdrop />
      <ThemeToggle />
      <div className="relative min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h1
              className={cn(
                'text-4xl font-bold mb-2 tp-fg',
                isUnicorn && 'drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]'
              )}
            >
              The Project
            </h1>
            <p className="tp-fg-muted">
              {isUnicorn
                ? 'Sparkles, pixies, and dancing unicorns — pick your reality.'
                : 'A minimal starter with Vite + React + Tailwind + shadcn/ui'}
            </p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="tp-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span className="tp-fg">Fast</span>
                </CardTitle>
                <CardDescription className="tp-card-muted">
                  Vite-powered HMR
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tp-fg">&lt; 50ms</p>
              </CardContent>
            </Card>

            <Card className="tp-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-sky-400" />
                  <span className="tp-fg">TypeScript</span>
                </CardTitle>
                <CardDescription className="tp-card-muted">
                  Type-safe development
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tp-fg">100%</p>
              </CardContent>
            </Card>

            <Card className="tp-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket
                    className={cn(
                      'h-5 w-5',
                      isUnicorn ? 'text-pink-500' : 'text-purple-400'
                    )}
                  />
                  <span className="tp-fg">Ready</span>
                </CardTitle>
                <CardDescription className="tp-card-muted">
                  Production-ready setup
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold tp-fg">Ship it!</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Card */}
          <Card className="tp-card mb-8">
            <CardHeader>
              <CardTitle className="tp-fg">Interactive Counter</CardTitle>
              <CardDescription className="tp-card-muted">
                Click the button to increment the counter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button onClick={() => setCount((c) => c + 1)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Increment
                </Button>
                <span className="text-3xl font-bold tp-fg">{count}</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="default">Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost" className="tp-fg">
              Ghost
            </Button>
          </div>

          {/* Footer */}
          <footer className="text-center mt-12 tp-fg-muted text-sm">
            <p>
              Built with eForge Preview ·{' '}
              <span className="tp-accent">
                {isUnicorn ? 'unicorn mode' : 'matrix mode'}
              </span>
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}

export default App
