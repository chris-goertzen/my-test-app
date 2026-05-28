import { CREATURES, type Creature } from "./data"

/** A giant ROYGBIV rainbow anchored to the bottom of the scene. */
function Rainbow() {
  // Concentric arcs from outer (red) to inner (violet).
  const bands: ReadonlyArray<{ color: string; r: number }> = [
    { color: "#ff2d2d", r: 500 },
    { color: "#ff8a00", r: 460 },
    { color: "#ffd400", r: 420 },
    { color: "#3ddc6a", r: 380 },
    { color: "#2b8cff", r: 340 },
    { color: "#5b3df7", r: 300 },
    { color: "#a23df7", r: 260 },
  ]
  const stroke = 38

  return (
    <svg
      className="magical-rainbow"
      viewBox="-520 -520 1040 600"
      role="img"
      aria-label="A giant rainbow stretching across the realm"
    >
      <defs>
        <filter id="rainbow-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#rainbow-soft-glow)">
        {bands.map((band) => (
          <circle
            key={band.color}
            cx={0}
            cy={0}
            r={band.r}
            fill="none"
            stroke={band.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            opacity={0.85}
          />
        ))}
      </g>
    </svg>
  )
}

interface PixieProps {
  creature: Creature
}

function Pixie({ creature }: PixieProps) {
  return (
    <svg
      className={`pixie pixie-${creature.id}`}
      viewBox="0 0 32 32"
      aria-hidden="true"
      data-creature-id={creature.id}
    >
      <defs>
        <radialGradient id={`pixie-${creature.id}-grad`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff7c2" stopOpacity="1" />
          <stop offset="60%" stopColor="#ffd66b" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffd66b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="pixie-glow">
        <circle cx="16" cy="16" r="14" fill={`url(#pixie-${creature.id}-grad)`} />
        <circle cx="16" cy="16" r="3.5" fill="#fffdef" />
        <path
          d="M16 4 L17 14 L27 16 L17 18 L16 28 L15 18 L5 16 L15 14 Z"
          fill="#fff7c2"
          opacity="0.85"
        />
      </g>
    </svg>
  )
}

interface DragonProps {
  creature: Creature
  variant: "a" | "b"
}

function Dragon({ creature, variant }: DragonProps) {
  const wingClass = `dragon-wing dragon-wing-${variant}`
  const bodyFill = variant === "a" ? "#d97706" : "#4338ca"
  const wingFill = variant === "a" ? "#fbbf24" : "#7c3aed"
  const accent = variant === "a" ? "#fde68a" : "#c4b5fd"

  return (
    <svg
      className={`dragon dragon-${creature.id}`}
      viewBox="0 0 240 120"
      aria-hidden="true"
      data-creature-id={creature.id}
    >
      <path d="M10 80 Q40 70 70 80 Q60 88 30 92 Z" fill={bodyFill} opacity="0.85" />
      <ellipse cx="120" cy="75" rx="60" ry="18" fill={bodyFill} />
      <ellipse cx="120" cy="82" rx="50" ry="8" fill={accent} opacity="0.5" />
      <path
        d="M170 75 Q200 60 220 70 Q225 80 215 90 Q195 95 170 88 Z"
        fill={bodyFill}
      />
      <path d="M205 62 L210 50 L215 64 Z" fill={accent} />
      <circle cx="208" cy="76" r="2.5" fill="#0b1020" />
      <path
        className={wingClass}
        d="M100 65 Q120 20 160 30 Q150 55 130 70 Q115 72 100 65 Z"
        fill={wingFill}
        opacity="0.95"
      />
      <path
        className={wingClass}
        d="M80 70 Q95 35 130 38 Q125 60 110 72 Q95 75 80 70 Z"
        fill={wingFill}
        opacity="0.75"
      />
      <path d="M95 92 L92 102 L100 102 Z" fill={bodyFill} />
      <path d="M135 92 L132 104 L142 104 Z" fill={bodyFill} />
    </svg>
  )
}

export function MagicalScene() {
  const pixies = CREATURES.filter((c): c is Creature => c.type === "pixie")
  const dragons = CREATURES.filter((c): c is Creature => c.type === "dragon")

  return (
    <div className="magical-scene" aria-hidden="true">
      <Rainbow />
      {pixies.map((creature) => (
        <Pixie key={creature.id} creature={creature} />
      ))}
      {dragons.map((creature, idx) => (
        <Dragon
          key={creature.id}
          creature={creature}
          variant={idx === 0 ? "a" : "b"}
        />
      ))}
    </div>
  )
}
