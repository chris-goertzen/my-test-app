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

/* ✨ A tiny pixie with shimmering butterfly wings */
const PixieSVG = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="pixie-wing" cx="50%" cy="50%" r="50%">
        <stop offset="0%"  stopColor="#fff"     stopOpacity="0.95" />
        <stop offset="60%" stopColor="#ffd1f3" stopOpacity="0.75" />
        <stop offset="100%" stopColor="#c4e0ff" stopOpacity="0.4" />
      </radialGradient>
      <linearGradient id="pixie-dress" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stopColor="#6bd5ff" />
        <stop offset="100%" stopColor="#c46bff" />
      </linearGradient>
    </defs>
    {/* upper wings */}
    <g className="pixie-wings-anim">
      <ellipse cx="18" cy="24" rx="9"  ry="13" fill="url(#pixie-wing)" stroke="#fff" strokeWidth="0.6" />
      <ellipse cx="46" cy="24" rx="9"  ry="13" fill="url(#pixie-wing)" stroke="#fff" strokeWidth="0.6" />
      {/* lower wings */}
      <ellipse cx="22" cy="40" rx="7"  ry="9"  fill="url(#pixie-wing)" stroke="#fff" strokeWidth="0.5" />
      <ellipse cx="42" cy="40" rx="7"  ry="9"  fill="url(#pixie-wing)" stroke="#fff" strokeWidth="0.5" />
    </g>
    {/* dress / body */}
    <path d="M28 28 L36 28 L40 46 L24 46 Z" fill="url(#pixie-dress)" />
    {/* head */}
    <circle cx="32" cy="22" r="6" fill="#ffe6d4" stroke="#d6a8ff" strokeWidth="0.6" />
    {/* hair */}
    <path d="M26 20 Q32 12 38 20 Q36 16 32 16 Q28 16 26 20 Z" fill="#ff6ec7" />
    <path d="M28 16 Q32 8 36 16" stroke="#ff6ec7" strokeWidth="1.5" fill="none" />
    {/* eyes */}
    <circle cx="30" cy="22" r="0.9" fill="#4b2a6d" />
    <circle cx="34" cy="22" r="0.9" fill="#4b2a6d" />
    {/* cheek blush */}
    <circle cx="29" cy="24" r="1" fill="#ffb3e6" opacity="0.7" />
    <circle cx="35" cy="24" r="1" fill="#ffb3e6" opacity="0.7" />
    {/* arms */}
    <path d="M28 30 Q22 34 24 40" stroke="#ffe6d4" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    <path d="M36 30 Q42 34 40 40" stroke="#ffe6d4" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    {/* legs */}
    <line x1="30" y1="46" x2="28" y2="54" stroke="#ffe6d4" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="34" y1="46" x2="36" y2="54" stroke="#ffe6d4" strokeWidth="1.8" strokeLinecap="round" />
    {/* sparkle dust */}
    <circle cx="10" cy="14" r="1.2" fill="#fff36b" />
    <circle cx="56" cy="18" r="1"   fill="#fff" />
    <circle cx="8"  cy="46" r="1"   fill="#fff" />
    <circle cx="54" cy="50" r="1.3" fill="#ffb3e6" />
    <path d="M50 8 l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 z" fill="#fff36b" />
  </svg>
)

/* 🐉 A friendly chibi dragon with pastel wings */
const DragonSVG = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="dragon-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"  stopColor="#6bff9d" />
        <stop offset="100%" stopColor="#6bd5ff" />
      </linearGradient>
      <linearGradient id="dragon-belly" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stopColor="#fff4a3" />
        <stop offset="100%" stopColor="#ffe6d4" />
      </linearGradient>
      <linearGradient id="dragon-wing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"  stopColor="#c46bff" />
        <stop offset="100%" stopColor="#ff6ec7" />
      </linearGradient>
    </defs>
    {/* tail */}
    <path d="M50 40 Q62 36 58 26 Q60 32 54 34 Q56 38 50 42 Z" fill="url(#dragon-body)" />
    <polygon points="58,24 62,20 60,28" fill="#fff36b" />
    {/* body */}
    <ellipse cx="36" cy="40" rx="14" ry="10" fill="url(#dragon-body)" stroke="#5fb88a" strokeWidth="0.8" />
    {/* belly */}
    <ellipse cx="36" cy="42" rx="9" ry="6" fill="url(#dragon-belly)" />
    {/* wings */}
    <g className="dragon-wings-anim">
      <path d="M30 30 Q34 12 50 16 Q44 24 42 30 Q36 30 30 30 Z" fill="url(#dragon-wing)" opacity="0.92" />
      <path d="M34 16 L38 26 M42 14 L42 26 M46 14 L44 26" stroke="#fff" strokeWidth="0.5" opacity="0.6" />
    </g>
    {/* head */}
    <ellipse cx="20" cy="32" rx="10" ry="8" fill="url(#dragon-body)" stroke="#5fb88a" strokeWidth="0.8" />
    {/* snout */}
    <ellipse cx="12" cy="34" rx="5" ry="3" fill="url(#dragon-belly)" />
    {/* spikes along back */}
    <polygon points="26,26 30,20 32,28" fill="#fff36b" />
    <polygon points="32,26 36,18 38,26" fill="#fff36b" />
    <polygon points="40,28 44,20 46,30" fill="#fff36b" />
    {/* horn */}
    <polygon points="22,22 24,14 26,22" fill="#ffb86b" />
    {/* eye */}
    <circle cx="18" cy="30" r="1.6" fill="#4b2a6d" />
    <circle cx="17.6" cy="29.6" r="0.6" fill="#fff" />
    {/* nostril */}
    <circle cx="11" cy="33" r="0.7" fill="#4b2a6d" />
    {/* tiny flame puff */}
    <g className="dragon-flame">
      <path d="M8 34 Q3 33 1 36 Q5 36 3 38 Q7 38 5 40" stroke="#ff6ec7" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <circle cx="2" cy="35" r="1.2" fill="#fff36b" />
    </g>
    {/* feet */}
    <rect x="28" y="48" width="3" height="6" rx="1.2" fill="#5fb88a" />
    <rect x="42" y="48" width="3" height="6" rx="1.2" fill="#5fb88a" />
  </svg>
)

/* 🔥 A phoenix trailing rainbow flame */
const PhoenixSVG = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="phoenix-body" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"  stopColor="#fff36b" />
        <stop offset="40%" stopColor="#ffb86b" />
        <stop offset="100%" stopColor="#ff6ec7" />
      </linearGradient>
      <linearGradient id="phoenix-tail" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"  stopColor="#ff6ec7" />
        <stop offset="50%" stopColor="#ffb86b" />
        <stop offset="100%" stopColor="#fff36b" />
      </linearGradient>
    </defs>
    {/* flame tail streamers */}
    <g className="phoenix-flame-anim">
      <path d="M40 34 Q56 30 60 38 Q54 36 52 40 Q58 44 50 44 Q52 48 46 46 Z" fill="url(#phoenix-tail)" />
      <path d="M44 40 Q58 46 56 52 Q52 48 50 50 Q48 46 44 46 Z"            fill="url(#phoenix-tail)" opacity="0.85" />
    </g>
    {/* body */}
    <ellipse cx="28" cy="34" rx="12" ry="9" fill="url(#phoenix-body)" />
    {/* wing */}
    <g className="phoenix-wings-anim">
      <path d="M24 28 Q30 14 44 18 Q40 26 34 30 Z" fill="url(#phoenix-body)" opacity="0.95" stroke="#ff6ec7" strokeWidth="0.4" />
      <path d="M28 18 L30 28 M34 16 L34 28 M38 18 L36 28" stroke="#fff" strokeWidth="0.4" opacity="0.7" />
    </g>
    {/* head */}
    <circle cx="20" cy="24" r="6.5" fill="url(#phoenix-body)" />
    {/* beak */}
    <polygon points="14,24 7,26 14,28" fill="#ffb86b" stroke="#b4359a" strokeWidth="0.3" />
    {/* crest plumes */}
    <path d="M18 18 Q19 8 23 14 Q22 10 25 12 Q24 16 25 20 Z" fill="#ff6ec7" />
    <path d="M22 16 Q26 6 28 14" stroke="#fff36b" strokeWidth="1.3" fill="none" />
    {/* eye */}
    <circle cx="18" cy="23" r="1.1" fill="#4b2a6d" />
    <circle cx="17.7" cy="22.7" r="0.4" fill="#fff" />
    {/* legs */}
    <line x1="26" y1="42" x2="25" y2="50" stroke="#ffb86b" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="42" x2="33" y2="50" stroke="#ffb86b" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M22 50 L28 50 M30 50 L36 50" stroke="#ffb86b" strokeWidth="1.4" strokeLinecap="round" />
    {/* ember sparkles */}
    <circle cx="56" cy="24" r="1.2" fill="#fff36b" />
    <circle cx="58" cy="32" r="0.9" fill="#ff6ec7" />
    <circle cx="52" cy="18" r="0.7" fill="#fff" />
  </svg>
)

/* 🦅🦁 A gryphon — eagle head + lion body */
const GryphonSVG = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="gryphon-body" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%"  stopColor="#ffd1a8" />
        <stop offset="100%" stopColor="#ffb86b" />
      </linearGradient>
      <linearGradient id="gryphon-feather" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"  stopColor="#fff4a3" />
        <stop offset="100%" stopColor="#ffb86b" />
      </linearGradient>
      <linearGradient id="gryphon-wing" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%"  stopColor="#c46bff" />
        <stop offset="50%" stopColor="#6bd5ff" />
        <stop offset="100%" stopColor="#6bff9d" />
      </linearGradient>
    </defs>
    {/* lion tail */}
    <path d="M50 40 Q60 30 58 22" stroke="#ffb86b" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    <circle cx="58" cy="20" r="2.5" fill="#fff36b" stroke="#ffb86b" strokeWidth="0.6" />
    {/* lion body */}
    <ellipse cx="38" cy="40" rx="14" ry="10" fill="url(#gryphon-body)" stroke="#d4925a" strokeWidth="0.7" />
    {/* wings */}
    <g className="gryphon-wings-anim">
      <path d="M30 30 Q40 12 54 18 Q48 26 44 32 Q36 32 30 30 Z" fill="url(#gryphon-wing)" opacity="0.9" stroke="#fff" strokeWidth="0.3" />
      <path d="M34 18 L36 30 M40 14 L40 30 M46 16 L44 30" stroke="#fff" strokeWidth="0.5" opacity="0.7" />
    </g>
    {/* eagle head */}
    <circle cx="20" cy="28" r="8" fill="url(#gryphon-feather)" stroke="#d4925a" strokeWidth="0.5" />
    {/* feather details */}
    <path d="M14 24 Q16 22 18 24 M18 22 Q20 20 22 22 M22 22 Q24 20 26 22" stroke="#fff" strokeWidth="0.6" fill="none" opacity="0.7" />
    {/* beak */}
    <polygon points="12,28 5,30 12,32" fill="#ffb86b" stroke="#b4359a" strokeWidth="0.3" />
    <polygon points="12,29.5 8,30 12,30.5" fill="#b4359a" opacity="0.5" />
    {/* eye */}
    <circle cx="18" cy="27" r="1.5" fill="#4b2a6d" />
    <circle cx="17.7" cy="26.7" r="0.5" fill="#fff" />
    {/* tuft */}
    <path d="M22 21 Q24 16 26 20" stroke="#fff36b" strokeWidth="1.2" fill="none" />
    {/* legs */}
    <rect x="26" y="48" width="3" height="7" rx="1" fill="url(#gryphon-body)" />
    <rect x="34" y="49" width="3" height="6" rx="1" fill="url(#gryphon-body)" />
    <rect x="42" y="49" width="3" height="6" rx="1" fill="url(#gryphon-body)" />
    <rect x="48" y="48" width="3" height="7" rx="1" fill="url(#gryphon-body)" />
    {/* talons */}
    <path d="M26 55 L26 57 M28 55 L28 57 M48 55 L48 57 M50 55 L50 57" stroke="#b4359a" strokeWidth="0.6" />
    {/* mane tuft on chest */}
    <path d="M27 32 Q30 30 33 32" stroke="#d4925a" strokeWidth="1" fill="none" />
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

      {/* ✨ Fantastical creatures dancing across the page ✨ */}
      <div className="creature-stage" aria-hidden="true">
        {/* Pixies flit around in zigzag patterns */}
        <div className="creature pixie-track-a">
          <PixieSVG className="creature-svg pixie-flit" />
        </div>
        <div className="creature pixie-track-b">
          <PixieSVG className="creature-svg pixie-flit pixie-flit--delayed" />
        </div>
        <div className="creature pixie-track-c">
          <PixieSVG className="creature-svg pixie-flit" />
        </div>

        {/* Dragon soaring left-to-right across the upper sky */}
        <div className="creature dragon-track">
          <DragonSVG className="creature-svg dance-bob" />
        </div>

        {/* Phoenix gliding right-to-left, trailing flame */}
        <div className="creature phoenix-track">
          <PhoenixSVG className="creature-svg dance-bob phoenix-glow" />
        </div>

        {/* Gryphon doing a slow majestic loop near the bottom */}
        <div className="creature gryphon-track">
          <GryphonSVG className="creature-svg dance-bob" />
        </div>
      </div>

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
