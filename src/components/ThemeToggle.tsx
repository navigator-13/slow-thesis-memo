'use client';

import { useState } from 'react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-12 h-12 flex items-center justify-center transition-all duration-300"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon isHovered={isHovered} />
      ) : (
        <MoonIcon isHovered={isHovered} />
      )}
    </button>
  );
}

function SunIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="transition-all duration-500"
      style={{
        filter: isHovered ? 'drop-shadow(0 0 8px hsl(var(--gold-base)))' : 'none',
      }}
    >
      <circle
        cx="12"
        cy="12"
        r="5"
        fill={isHovered ? 'hsl(var(--gold-base))' : 'hsl(var(--gold-dark))'}
        className="transition-all duration-300"
      />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1="12"
          y1="12"
          x2={12 + Math.cos((angle * Math.PI) / 180) * 9}
          y2={12 + Math.sin((angle * Math.PI) / 180) * 9}
          stroke={isHovered ? 'hsl(var(--gold-base))' : 'hsl(var(--gold-dark))'}
          strokeWidth="2"
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      ))}
    </svg>
  );
}

function MoonIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="transition-all duration-500"
      style={{
        transform: isHovered ? 'rotate(180deg)' : 'rotate(0deg)',
        filter: isHovered ? 'drop-shadow(0 0 8px hsl(var(--gold-base)))' : 'none',
      }}
    >
      <path
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
        fill={isHovered ? 'hsl(var(--gold-base))' : 'hsl(var(--gold-dark))'}
        className="transition-all duration-300"
      />
    </svg>
  );
}
