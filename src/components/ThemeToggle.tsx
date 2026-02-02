'use client';

import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isDark = theme === 'dark';

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="
        relative w-12 h-12 rounded-full flex items-center justify-center
        transition-colors duration-300
        border border-white/10
      "
      aria-label="Toggle theme"
    >
      <div
        className={`
          flex items-center justify-center
          transition-transform duration-700 ease-in-out
          ${isHovered ? (isDark ? 'rotate-[360deg]' : 'rotate-180') : 'rotate-0'}
        `}
        style={{
          transformOrigin: 'center',
          transformBox: 'fill-box',
        }}
      >
        {isDark ? (
          <Sun
            className="w-6 h-6"
            style={{
              stroke: isHovered ? 'hsl(var(--gold-text))' : 'hsl(var(--sidebar-text))',
              filter: isHovered ? 'drop-shadow(0 0 6px rgba(201,169,97,0.55))' : 'none',
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
          />
        ) : (
          <Moon
            className="w-6 h-6"
            style={{
              stroke: isHovered ? 'hsl(var(--gold-text))' : 'hsl(var(--sidebar-text))',
              filter: isHovered ? 'drop-shadow(0 0 6px rgba(201,169,97,0.55))' : 'none',
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
          />
        )}
      </div>
    </button>
  );
}
