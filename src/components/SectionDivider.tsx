'use client';

export function SectionDivider() {
  return (
    <div className="my-12 flex items-center justify-center">
      <svg width="100%" height="20" viewBox="0 0 800 20" fill="none" className="max-w-2xl">
        {/* Tapered line - left side */}
        <path
          d="M0,10 Q200,10 400,10"
          stroke="url(#divider-gradient-left)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />

        {/* Animated pulsing dots in center */}
        <g className="animate-pulse-dots">
          <circle cx="385" cy="10" r="1.5" fill="hsl(var(--gold-base))" opacity="0.6">
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="cx"
              values="385;383;385"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="395" cy="10" r="2" fill="hsl(var(--gold-base))" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="2s"
              repeatCount="indefinite"
              begin="0.3s"
            />
          </circle>
          <circle cx="405" cy="10" r="2" fill="hsl(var(--gold-base))" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="2s"
              repeatCount="indefinite"
              begin="0.6s"
            />
          </circle>
          <circle cx="415" cy="10" r="1.5" fill="hsl(var(--gold-base))" opacity="0.6">
            <animate
              attributeName="opacity"
              values="0.3;0.8;0.3"
              dur="2s"
              repeatCount="indefinite"
              begin="0.9s"
            />
            <animate
              attributeName="cx"
              values="415;417;415"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        </g>

        {/* Tapered line - right side */}
        <path
          d="M400,10 Q600,10 800,10"
          stroke="url(#divider-gradient-right)"
          strokeWidth="0.5"
          fill="none"
          opacity="0.3"
        />

        <defs>
          <linearGradient id="divider-gradient-left" x1="0" y1="0" x2="400" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="100%" stopColor="hsl(var(--gold-dark))" />
          </linearGradient>
          <linearGradient id="divider-gradient-right" x1="400" y1="0" x2="800" y2="0">
            <stop offset="0%" stopColor="hsl(var(--gold-dark))" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
