import "./scene.css";

/**
 * Decorative SVG sparkle used for each pixie. The inner <g class="sparkle-core">
 * is independently animated via CSS keyframes.
 */
function PixieSparkle() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="pixie-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbe6" stopOpacity="1" />
          <stop offset="60%" stopColor="#ffd6f1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffd6f1" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="22" fill="url(#pixie-core)" />
      <g className="sparkle-core">
        <path
          d="M32 6 L34 28 L56 32 L34 36 L32 58 L30 36 L8 32 L30 28 Z"
          fill="#fff7c2"
          stroke="#fff"
          strokeWidth="1"
        />
        <circle cx="32" cy="32" r="3" fill="#ffffff" />
      </g>
    </svg>
  );
}

/**
 * Decorative dragon silhouette. The wing group is animated separately from the
 * body so that the wing can flap while the body pans across.
 */
function DragonSilhouette() {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true">
      <defs>
        <linearGradient id="dragon-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2b1d4a" />
          <stop offset="100%" stopColor="#0c0820" />
        </linearGradient>
      </defs>
      {/* Body + tail */}
      <path
        d="M10 78
           Q 40 60 80 70
           Q 120 80 150 64
           Q 180 50 210 56
           Q 224 58 230 70
           Q 218 72 204 70
           Q 188 86 156 86
           Q 122 90 92 84
           Q 56 80 30 92
           Q 18 96 10 92
           Z"
        fill="url(#dragon-body)"
      />
      {/* Head spikes */}
      <path
        d="M214 56 L220 46 L224 58 Z"
        fill="#0c0820"
      />
      {/* Legs */}
      <path
        d="M110 84 L106 102 L116 102 L120 86 Z"
        fill="#0c0820"
      />
      <path
        d="M160 84 L156 104 L166 104 L168 86 Z"
        fill="#0c0820"
      />
      {/* Wing — animated independently */}
      <g className="wing">
        <path
          d="M120 70
             Q 130 20 170 18
             Q 196 16 192 50
             Q 168 52 150 64
             Q 134 72 120 70 Z"
          fill="#1b1140"
          stroke="#3b2670"
          strokeWidth="1"
        />
        <path
          d="M138 36 Q 158 30 180 32"
          fill="none"
          stroke="#4b3290"
          strokeWidth="1"
          opacity="0.6"
        />
      </g>
      {/* Eye */}
      <circle cx="218" cy="64" r="1.6" fill="#ffd166" />
    </svg>
  );
}

export function AnimatedScene() {
  return (
    <div
      className="magical-scene pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* sky wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1c1140 0%, #3a1a64 38%, #6f2a8a 70%, #f4a261 100%)",
        }}
      />

      {/* rainbow ribbon */}
      <div className="rainbow-ribbon" />

      {/* pixies */}
      <div className="pixie pixie-1">
        <PixieSparkle />
      </div>
      <div className="pixie pixie-2">
        <PixieSparkle />
      </div>
      <div className="pixie pixie-3">
        <PixieSparkle />
      </div>
      <div className="pixie pixie-4">
        <PixieSparkle />
      </div>

      {/* dragons */}
      <div className="dragon dragon-1">
        <DragonSilhouette />
      </div>
      <div className="dragon dragon-2">
        <DragonSilhouette />
      </div>
    </div>
  );
}
