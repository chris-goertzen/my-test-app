import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Plus, Zap, Code, Rocket } from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            eForge Test App
          </h1>
          <p className="text-gray-600">
            A minimal starter with Vite + React + Tailwind + shadcn/ui
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
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

          <Card>
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

          <Card>
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
        <Card className="mb-8">
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
              <span className="text-3xl font-bold text-gray-900">{count}</span>
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
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Built with eForge Preview</p>
        </footer>
      </div>
    </div>
  )
}

export default App
