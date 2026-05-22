import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Plus, Zap, Code, Rocket } from 'lucide-react'
import { ThemeBackground } from '@/components/ThemeBackground'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useTheme } from '@/hooks/useTheme'

function App() {
  const [count, setCount] = useState(0)
  const { mode, toggle } = useTheme()

  const isMatrix = mode === 'matrix'

  // Content sits on top of an animated canvas; cards use a translucent
  // surface so the backdrop is visible without sacrificing readability.
  const cardClass = isMatrix
    ? 'bg-black/55 border-emerald-500/40 text-emerald-100 backdrop-blur-sm shadow-lg shadow-emerald-500/10'
    : 'bg-white/75 border-fuchsia-200 text-gray-900 backdrop-blur-sm shadow-lg shadow-fuchsia-300/20'

  const titleClass = isMatrix ? 'text-emerald-200' : 'text-fuchsia-700'
  const descClass = isMatrix ? 'text-emerald-300/80' : 'text-gray-600'
  const headingClass = isMatrix ? 'text-emerald-100' : 'text-gray-900'
  const subheadingClass = isMatrix ? 'text-emerald-300/90' : 'text-gray-700'
  const footerClass = isMatrix ? 'text-emerald-300/70' : 'text-gray-600'
  const counterClass = isMatrix ? 'text-emerald-200' : 'text-gray-900'

  return (
    <>
      <ThemeBackground mode={mode} />
      <div className="relative min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          {/* Top bar: toggle is always visible */}
          <div className="flex justify-end mb-6">
            <ThemeToggle mode={mode} onToggle={toggle} />
          </div>

          {/* Header */}
          <header className="text-center mb-12">
            <h1 className={`text-4xl font-bold mb-2 ${headingClass}`}>
              eForge Test App
            </h1>
            <p className={subheadingClass}>
              A minimal starter with Vite + React + Tailwind + shadcn/ui
            </p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className={cardClass}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${titleClass}`}>
                  <Zap className="h-5 w-5 text-yellow-400" />
                  Fast
                </CardTitle>
                <CardDescription className={descClass}>Vite-powered HMR</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${counterClass}`}>&lt; 50ms</p>
              </CardContent>
            </Card>

            <Card className={cardClass}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${titleClass}`}>
                  <Code className="h-5 w-5 text-blue-400" />
                  TypeScript
                </CardTitle>
                <CardDescription className={descClass}>Type-safe development</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${counterClass}`}>100%</p>
              </CardContent>
            </Card>

            <Card className={cardClass}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 ${titleClass}`}>
                  <Rocket className="h-5 w-5 text-purple-400" />
                  Ready
                </CardTitle>
                <CardDescription className={descClass}>Production-ready setup</CardDescription>
              </CardHeader>
              <CardContent>
                <p className={`text-2xl font-bold ${counterClass}`}>Ship it!</p>
              </CardContent>
            </Card>
          </div>

          {/* Interactive Card */}
          <Card className={`mb-8 ${cardClass}`}>
            <CardHeader>
              <CardTitle className={titleClass}>Interactive Counter</CardTitle>
              <CardDescription className={descClass}>
                Click the button to increment the counter
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Button onClick={() => setCount((c) => c + 1)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Increment
                </Button>
                <span className={`text-3xl font-bold ${counterClass}`}>{count}</span>
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
          <footer className={`text-center mt-12 text-sm ${footerClass}`}>
            <p>Built with eForge Preview</p>
          </footer>
        </div>
      </div>
    </>
  )
}

export default App
