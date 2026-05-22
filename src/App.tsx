import { useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Plus, Zap, Code, Rocket } from 'lucide-react'
import ThemeBackground from '@/components/theme/ThemeBackground'
import ThemeToggle from '@/components/theme/ThemeToggle'
import { useTheme } from '@/theme/useTheme'
import { cn } from '@/lib/utils'

function App() {
  const [count, setCount] = useState(0)
  const { theme } = useTheme()
  const isMatrix = theme === 'matrix'

  return (
    <>
      {/* Animated background layer: matrix code rain OR rainbow + unicorns + pixies. */}
      <ThemeBackground />

      <div
        className={cn(
          'relative min-h-screen p-8 transition-colors duration-300',
          isMatrix ? 'text-emerald-100' : 'text-gray-900',
        )}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h1
              className={cn(
                'text-4xl font-bold mb-2',
                isMatrix
                  ? 'text-emerald-300 drop-shadow-[0_0_12px_rgba(34,197,94,0.55)]'
                  : 'text-fuchsia-700 drop-shadow-[0_0_10px_rgba(244,114,182,0.45)]',
              )}
            >
              eForge Test App
            </h1>
            <p className={isMatrix ? 'text-emerald-200/80' : 'text-gray-700'}>
              {isMatrix
                ? 'Wake up… the rain knows your name.'
                : 'A sparkly meadow of unicorns and pixies. 🦄✨'}
            </p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <ThemedCard
              isMatrix={isMatrix}
              title={
                <span className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Fast
                </span>
              }
              description="Vite-powered HMR"
              value="< 50ms"
            />
            <ThemedCard
              isMatrix={isMatrix}
              title={
                <span className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-blue-500" />
                  TypeScript
                </span>
              }
              description="Type-safe development"
              value="100%"
            />
            <ThemedCard
              isMatrix={isMatrix}
              title={
                <span className="flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-purple-500" />
                  Ready
                </span>
              }
              description="Production-ready setup"
              value="Ship it!"
            />
          </div>

          {/* Interactive Card */}
          <Card
            className={cn(
              'mb-8 backdrop-blur transition-colors',
              isMatrix
                ? 'bg-black/55 border-emerald-400/30 text-emerald-100'
                : 'bg-white/80 border-pink-200',
            )}
          >
            <CardHeader>
              <CardTitle className={isMatrix ? 'text-emerald-200' : undefined}>
                Interactive Counter
              </CardTitle>
              <CardDescription className={isMatrix ? 'text-emerald-200/70' : undefined}>
                Click the button to increment the counter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setCount((c) => c + 1)}
                  className={
                    isMatrix
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                      : undefined
                  }
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Increment
                </Button>
                <span
                  className={cn(
                    'text-3xl font-bold',
                    isMatrix ? 'text-emerald-200' : 'text-gray-900',
                  )}
                >
                  {count}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="default">Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          {/* Footer */}
          <footer
            className={cn(
              'text-center mt-12 text-sm',
              isMatrix ? 'text-emerald-200/60' : 'text-gray-600',
            )}
          >
            <p>Built with eForge Preview</p>
          </footer>
        </div>
      </div>

      {/* Floating pill toggle (Matrix ✦ / Unicorn 🦄). */}
      <ThemeToggle />
    </>
  )
}

function ThemedCard({
  isMatrix,
  title,
  description,
  value,
}: {
  isMatrix: boolean
  title: ReactNode
  description: string
  value: string
}) {
  return (
    <Card
      className={cn(
        'backdrop-blur transition-colors',
        isMatrix
          ? 'bg-black/55 border-emerald-400/30 text-emerald-100'
          : 'bg-white/80 border-pink-200',
      )}
    >
      <CardHeader>
        <CardTitle className={isMatrix ? 'text-emerald-200' : undefined}>{title}</CardTitle>
        <CardDescription className={isMatrix ? 'text-emerald-200/70' : undefined}>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p
          className={cn(
            'text-2xl font-bold',
            isMatrix ? 'text-emerald-300' : 'text-gray-900',
          )}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  )
}

export default App
