import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Plus, Zap, Code, Rocket } from 'lucide-react'

/* A wee inline SVG unicorn — because emoji alone isn't enough magic ✨ */
const UnicornSVG = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="mane" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"  stopColor="#ff6ec7" />
        <stop offset="25%" stopColor="#ffb86b" />
        <stop offset="50%" stopColor="#fff36b" />
        <stop offset="75%" stopColor="#6bff9d" />
        <stop offset="100%" stopColor="#6bd5ff" />
      </linearGradient>
      <linearGradient id="horn" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%"  stopColor="#fff36b" />
        <stop offset="100%" stopColor="#ffb86b" />
      </linearGradient>
    </defs>
    {/* body */}
    <ellipse cx="34" cy="40" rx="18" ry="14" fill="#ffffff" stroke="#d6a8ff" strokeWidth="1.5" />
    {/* head */}
    <ellipse cx="20" cy="30" rx="10" ry="9" fill="#ffffff" stroke="#d6a8ff" strokeWidth="1.5" />
    {/* horn */}
    <polygon points="20,8 23,20 17,20" fill="url(#horn)" stroke="#b4359a" strokeWidth="0.8" />
    {/* mane */}
    <path
      d="M22 22 Q34 14 46 26 Q42 30 38 28 Q42 36 36 38 Q38 44 30 42 Q32 50 24 46 Q22 38 22 22 Z"
      fill="url(#mane)"
      opacity="0.95"
    />
    {/* eye */}
    <circle cx="17" cy="30" r="1.5" fill="#4b2a6d" />
    <circle cx="16.6" cy="29.6" r="0.5" fill="#fff" />
    {/* legs */}
    <rect x="22" y="50" width="3" height="8" rx="1.5" fill="#ffffff" stroke="#d6a8ff" strokeWidth="1" />
    <rect x="30" y="51" width="3" height="8" rx="1.5" fill="#ffffff" stroke="#d6a8ff" strokeWidth="1" />
    <rect x="40" y="51" width="3" height="8" rx="1.5" fill="#ffffff" stroke="#d6a8ff" strokeWidth="1" />
    <rect x="46" y="50" width="3" height="8" rx="1.5" fill="#ffffff" stroke="#d6a8ff" strokeWidth="1" />
    {/* tail */}
    <path d="M52 38 Q60 30 58 46 Q54 44 52 42 Z" fill="url(#mane)" />
    {/* cheek blush */}
    <circle cx="15" cy="34" r="1.6" fill="#ffb3e6" opacity="0.7" />
  </svg>
)

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen p-8 relative overflow-hidden">
      {/* Floating decorative emoji scattered across the page */}
      <span className="deco wiggle"        style={{ top: '6%',  left: '4%'  }}>🌈</span>
      <span className="deco bounce"        style={{ top: '14%', right: '6%' }}>✨</span>
      <span className="deco sparkle-spin"  style={{ top: '38%', left: '2%'  }}>⭐</span>
      <span className="deco drift"         style={{ top: '24%', left: '48%' }}>☁️</span>
      <span className="deco bounce"        style={{ top: '60%', right: '4%' }}>🌟</span>
      <span className="deco wiggle"        style={{ bottom: '8%', left: '6%' }}>🦄</span>
      <span className="deco sparkle-spin"  style={{ bottom: '14%', right: '8%' }}>💖</span>
      <span className="deco drift"         style={{ top: '70%', left: '40%' }}>☁️</span>
      <span className="deco bounce"        style={{ top: '48%', right: '40%' }}>🌸</span>

      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <header className="text-center mb-12 relative pt-6">
          <div className="rainbow-arch" />
          <div className="flex justify-center mb-2">
            <span className="floating-unicorn" aria-label="unicorn">🦄</span>
            <UnicornSVG className="w-20 h-20 mx-2 bounce" />
            <span className="floating-unicorn" style={{ animationDelay: '0.7s' }} aria-label="unicorn">🦄</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-3 rainbow-text leading-tight">
            <span className="sparkle-spin inline-block">✨</span>
            {' '}eForge Test App{' '}
            <span className="sparkle-spin inline-block" style={{ animationDelay: '1s' }}>✨</span>
          </h1>
          <p className="text-lg shimmer-text font-semibold tracking-wide">
            🌈 A magical starter with Vite + React + Tailwind + shadcn/ui 🦄
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="unicorn-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 cursive-title text-2xl">
                <span className="bounce"><Zap className="h-6 w-6" style={{ color: '#ffb86b' }} /></span>
                Fast <span className="wiggle">⚡</span>
              </CardTitle>
              <CardDescription className="unicorn-desc">
                Vite-powered HMR ✨ faster than a shooting star
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="stat-value">&lt; 50ms 💨</p>
            </CardContent>
          </Card>

          <Card className="unicorn-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 cursive-title text-2xl">
                <span className="bounce" style={{ animationDelay: '0.3s' }}>
                  <Code className="h-6 w-6" style={{ color: '#6bd5ff' }} />
                </span>
                TypeScript <span className="wiggle">💎</span>
              </CardTitle>
              <CardDescription className="unicorn-desc">
                Type-safe sparkles 🪄 keeping bugs at bay
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="stat-value">100% 🌟</p>
            </CardContent>
          </Card>

          <Card className="unicorn-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 cursive-title text-2xl">
                <span className="bounce" style={{ animationDelay: '0.6s' }}>
                  <Rocket className="h-6 w-6" style={{ color: '#c46bff' }} />
                </span>
                Ready <span className="wiggle">🚀</span>
              </CardTitle>
              <CardDescription className="unicorn-desc">
                Production-ready magic — sprinkled with stardust
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="stat-value">Ship it! 🌈</p>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Card */}
        <Card className="unicorn-card mb-8">
          <CardHeader>
            <CardTitle className="cursive-title text-3xl flex items-center gap-2">
              <span className="sparkle-spin">🌟</span>
              Interactive Counter
              <span className="sparkle-spin" style={{ animationDelay: '0.5s' }}>🌟</span>
            </CardTitle>
            <CardDescription className="unicorn-desc">
              Click the magical button to summon another sparkle ✨🦄✨
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 flex-wrap">
              <Button className="magic-button" onClick={() => setCount(c => c + 1)}>
                <Plus className="h-4 w-4 mr-2" />
                Increment <span className="ml-2 wiggle">🦄</span>
              </Button>
              <span className="counter-number">{count}</span>
              <span className="text-2xl bounce" aria-hidden="true">
                {count === 0 ? '☁️' : '✨'.repeat(Math.min(count, 5))}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          <Button variant="default"   className="magic-button">Primary Action 🌈</Button>
          <Button variant="secondary" className="pastel-secondary">Secondary 💖</Button>
          <Button variant="outline"   className="pastel-outline">Outline ✨</Button>
          <Button variant="ghost"     className="pastel-ghost">Ghost 👻</Button>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm">
          <p className="shimmer-text font-bold text-base">
            <span className="wiggle inline-block">🦄</span>{' '}
            Built with eForge Preview &amp; a sprinkle of magic{' '}
            <span className="wiggle inline-block">🌈</span>
          </p>
          <p className="mt-2 text-purple-500/70">
            ⭐ ✨ ☁️ 💖 🌸 🌟 ☁️ ✨ ⭐
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
