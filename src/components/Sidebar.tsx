'use client';

import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { TwinklingStars } from './TwinklingStars';

interface Section {
  id: string;
  title: string;
  number: string | null;
}

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (id: string) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Sidebar({ sections, activeSection, onSectionChange, theme, onThemeToggle }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[hsl(var(--sidebar-bg))] border-r border-[hsl(var(--gold-dark))]/10 overflow-hidden">
      {/* Twinkling Stars Background */}
      <TwinklingStars />

      <div className="relative h-full flex flex-col">
        {/* Logo */}
        <div className="flex justify-center items-center py-8 px-6">
          <SailboatLogo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1 scrollbar-thin">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`
                w-full text-left px-4 py-3 rounded-lg transition-all duration-300 relative group
                ${activeSection === section.id
                  ? 'bg-gradient-to-r from-[hsl(var(--gold-dark))]/20 to-transparent'
                  : 'hover:bg-gradient-to-r hover:from-[hsl(var(--gold-dark))]/10 hover:to-transparent'
                }
              `}
            >
              <div className="flex items-start gap-2">
                {section.number && (
                  <span className={`
                    text-sm font-medium italic flex-shrink-0 transition-colors duration-300
                    ${activeSection === section.id
                      ? 'text-[hsl(var(--gold-base))]'
                      : 'text-gray-400 group-hover:text-[hsl(var(--gold-base))]'
                    }
                  `}>
                    {section.number}
                  </span>
                )}
                <span className={`
                  text-sm transition-colors duration-300
                  ${activeSection === section.id
                    ? 'text-[hsl(var(--gold-base))]'
                    : 'text-gray-300 group-hover:text-[hsl(var(--gold-base))]'
                  }
                `}>
                  {section.title}
                </span>
              </div>
            </button>
          ))}
        </nav>

        {/* Theme Toggle */}
        <div className="p-6 flex justify-center border-t border-[hsl(var(--gold-dark))]/10">
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
      </div>
    </aside>
  );
}

function SailboatLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cursor-pointer transition-transform duration-500 ease-out"
      style={{ transform: isHovered ? 'translateY(-4px) rotate(2deg)' : 'translateY(0) rotate(0deg)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg width="60" height="72" viewBox="0 0 60 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M30 10L10 50H50L30 10Z"
          fill="url(#sail-gradient)"
          stroke="hsl(var(--gold-base))"
          strokeWidth="1.5"
        />
        <line
          x1="30" y1="10" x2="30" y2="62"
          stroke="hsl(var(--gold-base))"
          strokeWidth="2"
        />
        <ellipse
          cx="30" cy="64" rx="20" ry="4"
          fill="hsl(var(--gold-dark))"
          opacity="0.3"
        />
        <defs>
          <linearGradient id="sail-gradient" x1="30" y1="10" x2="30" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(var(--gold-light))" stopOpacity="0.4"/>
            <stop offset="1" stopColor="hsl(var(--gold-dark))" stopOpacity="0.6"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
