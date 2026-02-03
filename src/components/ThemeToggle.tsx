'use client';

import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
}

export function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
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
        border
      "
      style={{ borderColor: 'var(--text-muted)' }}
      aria-label="Toggle theme"
    >
      <div
        className={[
          'absolute inset-0 rounded-full pointer-events-none z-0',
          className ?? '',
        ].join(' ').trim()}
      />
      <div
        className={`
          flex items-center justify-center relative z-10
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
              stroke: isHovered ? 'var(--gold-300)' : 'var(--gold-500)',
              filter: isHovered ? 'drop-shadow(0 0 6px rgba(225,194,122,0.4))' : 'none',
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
          />
        ) : (
          <Moon
            className="w-6 h-6"
            style={{
              stroke: isHovered ? 'var(--gold-300)' : 'var(--gold-500)',
              filter: isHovered ? 'drop-shadow(0 0 6px rgba(225,194,122,0.4))' : 'none',
              transformOrigin: 'center',
              transformBox: 'fill-box',
            }}
          />
        )}
      </div>
    </button>
  );
}
