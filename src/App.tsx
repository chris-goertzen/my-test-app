import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Plus, Zap, Code, Rocket } from 'lucide-react'
import { ThemeProvider } from '@/lib/theme'
import { useTheme } from '@/lib/use-theme'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ThemeBackground } from '@/components/ThemeBackground'
import { cn } from '@/lib/utils'

function AppShell() {
  const [count, setCount] = useState(0)
  const { theme } = useTheme()
  const isMatrix = theme === 'matrix'

  return (
    <div className="relative min-h-screen p-8">
      <ThemeBackground />
      <ThemeToggle />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1
            className={cn(
              'text-4xl font-bold mb-2 transition-colors',
              isMatrix ? 'text-green-300 drop-shadow-[0_0_10px_rgba(57,255,20,0.6)]' : 'text-purple-700 drop-shadow-[0_2px_8px_rgba(255,255,255,0.6)]'
            )}
          >
            eForge Test App
          </h1>
          <p className={cn('transition-colors', isMatrix ? 'text-green-200/80' : 'text-gray-800')}>
            A minimal starter with Vite + React + Tailwind + shadcn/ui
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className={cardClass(isMatrix)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Fast
              </CardTitle>
              <CardDescription>Vite-powered HMR</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">&lt; 50ms</p>
            </CardContent>
          </Card>

          <Card className={cardClass(isMatrix)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-blue-500" />
                TypeScript
              </CardTitle>
              <CardDescription>Type-safe development</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">100%</p>
            </CardContent>
          </Card>

          <Card className={cardClass(isMatrix)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-purple-500" />
                Ready
              </CardTitle>
              <CardDescription>Production-ready setup</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Ship it!</p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Card */}
        <Card className={cn('mb-8', cardClass(isMatrix))}>
          <CardHeader>
            <CardTitle>Interactive Counter</CardTitle>
            <CardDescription>
              Click the button to increment the counter
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Button onClick={() => setCount(c => c + 1)}>
                <Plus className="h-4 w-4 mr-2" />
                Increment
              </Button>
              <span className="text-3xl font-bold">{count}</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="default">Primary Action</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost" className={isMatrix ? 'text-green-200 hover:bg-green-500/20 hover:text-green-100' : ''}>Ghost</Button>
        </div>

        {/* Footer */}
        <footer
          className={cn(
            'text-center mt-12 text-sm transition-colors',
            isMatrix ? 'text-green-200/70' : 'text-gray-700'
          )}
        >
          <p>Built with eForge Preview</p>
        </footer>
      </div>
    </div>
  )
}

function cardClass(isMatrix: boolean) {
  return isMatrix
    ? 'border-green-500/40 bg-black/60 text-green-100 backdrop-blur-sm shadow-[0_0_20px_rgba(57,255,20,0.15)]'
    : 'border-white/60 bg-white/70 text-gray-900 backdrop-blur-sm'
}

function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  )
}

export default App
