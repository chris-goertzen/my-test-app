import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Moon, Sun } from "lucide-react"
import { Dragon } from "./Dragon"
import { dragonGreenGlow } from "@/lib/dragon-theme"

/**
 * Magical Realm scene.
 *
 * Layout
 * ------
 * - Top: shadcn Cards (header / theme toggle / legend).
 * - Center: animated SVG scene with multiple Dragon instances flying past a
 *   sun, clouds, mountains, a castle, and a forest of trees.
 *
 * Color discipline
 * ----------------
 * The dragons receive their green from the canonical `--dragon-green` CSS
 * variable via `<Dragon />`. NO other scene object references that variable
 * — the sun stays yellow, clouds white, mountains slate, castle stone, trees
 * use their OWN tree-green palette (`#2f7a3a` etc.), and stars stay gold.
 * Toggling the "midnight" theme retints only dragons.
 */
export function MagicalRealm() {
  const [midnight, setMidnight] = React.useState(false)

  // Three dragon instances — different positions/sizes/poses — all sharing the
  // canonical green via the Dragon component's default `treatment` prop.
  const dragons = [
    { id: "ember",   x: 40,  y: 60,  scale: 1.0,  pose: "flying"  as const, delay: "0s"   },
    { id: "verdant", x: 380, y: 30,  scale: 0.75, pose: "soaring" as const, delay: "0.6s" },
    { id: "mossy",   x: 220, y: 200, scale: 0.55, pose: "perched" as const, delay: "1.2s" },
  ]

  return (
    <div
      className={
        "min-h-screen p-8 transition-colors " +
        (midnight
          ? "theme-midnight bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100"
          : "bg-gradient-to-br from-sky-50 via-emerald-50 to-amber-50 text-gray-900")
      }
    >
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8" style={{ color: "#f59e0b" }} />
            Magical Realm
            <Sparkles className="h-8 w-8" style={{ color: "#f59e0b" }} />
          </h1>
          <p className={midnight ? "text-slate-300" : "text-gray-600"}>
            shadcn UI + animated scene · dragons routed through one canonical green source
          </p>
        </header>

        {/* shadcn card row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-block h-3 w-3 rounded-full"
                  // Legend swatch reads from the canonical source — proves the
                  // single-source wiring at a glance.
                  style={{ backgroundColor: "var(--dragon-green)" }}
                />
                Canonical Green
              </CardTitle>
              <CardDescription>
                One CSS var — <code className="font-mono text-xs">--dragon-green</code> — drives
                every dragon.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm">
              Defined in <code className="font-mono text-xs">src/index.css</code>, consumed via
              helpers in <code className="font-mono text-xs">src/lib/dragon-theme.ts</code>.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dragons</CardTitle>
              <CardDescription>{dragons.length} instances, same treatment</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {dragons.map((d) => (
                  <Dragon
                    key={d.id}
                    name={d.id}
                    pose={d.pose}
                    width={36}
                    height={26}
                    aria-label={`Mini dragon ${d.id}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">Hover the scene to interact.</span>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Realm Theme</CardTitle>
              <CardDescription>Same source · different value</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                onClick={() => setMidnight((m) => !m)}
                className="w-full"
              >
                {midnight ? (
                  <>
                    <Sun className="h-4 w-4 mr-2" />
                    Switch to Daylight
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 mr-2" />
                    Switch to Midnight
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* The animated scene */}
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>The Realm</CardTitle>
            <CardDescription>
              Sun, clouds, mountains, castle and forest keep their own colors.
              Only the dragons read from <code className="font-mono text-xs">--dragon-green</code>.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
              <svg
                viewBox="0 0 800 450"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 w-full h-full"
                aria-label="Magical realm scene"
              >
                {/* Sky gradient — non-dragon */}
                <defs>
                  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"  stopColor={midnight ? "#1e1b4b" : "#bae6fd"} />
                    <stop offset="100%" stopColor={midnight ? "#312e81" : "#fef3c7"} />
                  </linearGradient>
                  <linearGradient id="mountain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#94a3b8" />
                    <stop offset="100%" stopColor="#475569" />
                  </linearGradient>
                  <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a3a3a3" />
                    <stop offset="100%" stopColor="#525252" />
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width="800" height="450" fill="url(#sky)" />

                {/* Stars (midnight only) — non-dragon, gold */}
                {midnight && (
                  <g>
                    {[
                      [80, 40], [160, 80], [240, 30], [320, 70], [420, 50],
                      [520, 90], [620, 35], [720, 75], [110, 110], [690, 130],
                    ].map(([cx, cy], i) => (
                      <circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="1.6"
                        fill="#fde68a"
                        className="sparkle"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </g>
                )}

                {/* Sun / moon — non-dragon, yellow or pale */}
                <g className="sun-pulse">
                  <circle
                    cx="120"
                    cy="100"
                    r="38"
                    fill={midnight ? "#e5e7eb" : "#fbbf24"}
                  />
                  <circle
                    cx="120"
                    cy="100"
                    r="46"
                    fill="none"
                    stroke={midnight ? "#cbd5e1" : "#fde68a"}
                    strokeWidth="2"
                    opacity="0.6"
                  />
                </g>

                {/* Clouds — non-dragon, white */}
                <g className="cloud-drift">
                  <g opacity="0.92">
                    <ellipse cx="300" cy="90"  rx="42" ry="14" fill="#ffffff" />
                    <ellipse cx="330" cy="80"  rx="30" ry="12" fill="#ffffff" />
                    <ellipse cx="270" cy="82"  rx="22" ry="10" fill="#ffffff" />
                  </g>
                  <g opacity="0.88">
                    <ellipse cx="600" cy="60"  rx="46" ry="13" fill="#ffffff" />
                    <ellipse cx="630" cy="52"  rx="26" ry="10" fill="#ffffff" />
                    <ellipse cx="570" cy="55"  rx="22" ry="9"  fill="#ffffff" />
                  </g>
                </g>

                {/* Mountains — non-dragon, slate */}
                <polygon points="0,360 140,200 240,310 360,160 500,330 640,210 800,360"
                         fill="url(#mountain)" />
                <polygon points="0,360 100,260 200,360" fill="#64748b" opacity="0.85" />
                <polygon points="430,330 520,230 610,330" fill="#475569" opacity="0.9" />

                {/* Snow caps — non-dragon, white */}
                <polygon points="350,180 360,160 370,180" fill="#f8fafc" />
                <polygon points="630,230 640,210 650,230" fill="#f8fafc" />

                {/* Castle — non-dragon, stone */}
                <g transform="translate(540, 270)">
                  <rect x="0"  y="20" width="80" height="60" fill="#9ca3af" stroke="#4b5563" strokeWidth="1.5" />
                  <rect x="-8" y="0"  width="20" height="24" fill="#9ca3af" stroke="#4b5563" strokeWidth="1.5" />
                  <rect x="32" y="-8" width="20" height="32" fill="#9ca3af" stroke="#4b5563" strokeWidth="1.5" />
                  <rect x="68" y="0"  width="20" height="24" fill="#9ca3af" stroke="#4b5563" strokeWidth="1.5" />
                  <polygon points="-8,0 2,-12 12,0"  fill="#7c2d12" />
                  <polygon points="32,-8 42,-22 52,-8" fill="#7c2d12" />
                  <polygon points="68,0 78,-12 88,0"  fill="#7c2d12" />
                  <rect x="32" y="50" width="14" height="30" fill="#451a03" />
                  <rect x="10" y="30" width="10" height="14" fill="#fde68a" opacity="0.85" />
                  <rect x="60" y="30" width="10" height="14" fill="#fde68a" opacity="0.85" />
                </g>

                {/* Ground — non-dragon, neutral */}
                <rect x="0" y="360" width="800" height="90" fill="url(#ground)" />

                {/* Forest of trees — non-dragon, uses a DIFFERENT tree-green
                    palette to prove dragons don't bleed into other greens. */}
                <g>
                  {[60, 110, 175, 220, 720, 760, 410, 460].map((x, i) => (
                    <g key={i} transform={`translate(${x}, 340)`}>
                      <rect x="-3" y="0" width="6" height="22" fill="#5b3a1f" />
                      <polygon points="-18,0 0,-40 18,0" fill="#2f7a3a" />
                      <polygon points="-14,-12 0,-50 14,-12" fill="#3a8f47" />
                      <polygon points="-10,-26 0,-60 10,-26" fill="#4ea35a" />
                    </g>
                  ))}
                </g>

                {/* Sparkles around dragons — canonical glow */}
                <g>
                  {[
                    [150, 150], [180, 140], [165, 165],
                    [430, 90],  [460, 110], [445, 75],
                    [290, 250], [260, 240], [275, 270],
                  ].map(([cx, cy], i) => (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r="2.4"
                      fill={dragonGreenGlow()}
                      className="sparkle"
                      style={{ animationDelay: `${(i % 4) * 0.3}s` }}
                    />
                  ))}
                </g>
              </svg>

              {/* Dragon instances overlaid on the SVG scene (so they can have
                  their own HTML hover state and independent CSS transforms).
                  Every Dragon picks up the canonical green via its default
                  treatment prop — no per-instance color overrides. */}
              {dragons.map((d) => (
                <div
                  key={d.id}
                  className={d.pose === "perched" ? "dragon-float" : "dragon-glide"}
                  style={{
                    position: "absolute",
                    left:  `${(d.x / 800) * 100}%`,
                    top:   `${(d.y / 450) * 100}%`,
                    width: `${(200 * d.scale / 800) * 100}%`,
                    animationDelay: d.delay,
                  }}
                >
                  <Dragon name={d.id} pose={d.pose} style={{ width: "100%", height: "auto" }} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <footer className={"text-center mt-8 text-sm " + (midnight ? "text-slate-400" : "text-gray-500")}>
          <p>
            Every dragon above is colored exclusively through{" "}
            <code className="font-mono">var(--dragon-green)</code>. Change one variable, retint every dragon.
          </p>
        </footer>
      </div>
    </div>
  )
}
