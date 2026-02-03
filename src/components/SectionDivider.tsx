'use client';

export function SectionDivider() {
  return (
    <div className="my-12 flex items-center justify-center">
      <svg width="100%" height="20" viewBox="0 0 800 20" fill="none" className="max-w-2xl">
        {/* Animated gold sweep line */}
        <path
          d="M0 10 H800"
          stroke="url(#divider-gradient-sweep)"
          strokeWidth="0.75"
          fill="none"
          opacity="0.5"
        />

        {/* Animated pulsing dots in center */}
        <g className="animate-pulse-dots">
          <circle cx="385" cy="10" r="1.5" fill="var(--gold-500)" opacity="0.6">
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
          <circle cx="395" cy="10" r="2" fill="var(--gold-500)" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="2s"
              repeatCount="indefinite"
              begin="0.3s"
            />
          </circle>
          <circle cx="405" cy="10" r="2" fill="var(--gold-500)" opacity="0.8">
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="2s"
              repeatCount="indefinite"
              begin="0.6s"
            />
          </circle>
          <circle cx="415" cy="10" r="1.5" fill="var(--gold-500)" opacity="0.6">
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

        <defs>
          <linearGradient
            id="divider-gradient-sweep"
            x1="0"
            y1="0"
            x2="800"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--gold-700)" />
            <stop offset="50%" stopColor="var(--gold-500)" />
            <stop offset="100%" stopColor="var(--gold-300)" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              from="-800 0"
              to="800 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
