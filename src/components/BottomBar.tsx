'use client';

import { ThemeToggle } from './ThemeToggle';

interface Section {
  id: string;
  title: string;
  number: string | null;
}

interface BottomBarProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (id: string) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function BottomBar({ sections, activeSection, onSectionChange, theme, onThemeToggle }: BottomBarProps) {
  return (
    <div className="bg-[hsl(var(--sidebar-bg))] border-t border-[hsl(var(--gold-dark))]/20">
      {/* Logo and Theme Toggle Row */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[hsl(var(--gold-dark))]/10">
        <div className="flex items-center gap-2">
          <MiniSailboat />
          <span className="text-sm text-[hsl(var(--gold-base))]">Table of Contents</span>
        </div>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>

      {/* Scrollable Navigation */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 px-4 py-3 min-w-max">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`
                px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all duration-300
                ${activeSection === section.id
                  ? 'bg-gradient-to-r from-[hsl(var(--gold-dark))]/30 to-transparent text-[hsl(var(--gold-base))]'
                  : 'text-gray-400 hover:text-[hsl(var(--gold-base))]'
                }
              `}
            >
              {section.number && <span className="italic mr-1">{section.number}</span>}
              {section.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniSailboat() {
  return (
    <svg width="24" height="28" viewBox="0 0 60 72" fill="none">
      <path
        d="M30 10L10 50H50L30 10Z"
        fill="url(#mini-sail)"
        stroke="hsl(var(--gold-base))"
        strokeWidth="2"
      />
      <line x1="30" y1="10" x2="30" y2="62" stroke="hsl(var(--gold-base))" strokeWidth="2"/>
      <defs>
        <linearGradient id="mini-sail" x1="30" y1="10" x2="30" y2="50">
          <stop stopColor="hsl(var(--gold-light))" stopOpacity="0.4"/>
          <stop offset="1" stopColor="hsl(var(--gold-dark))" stopOpacity="0.6"/>
        </linearGradient>
      </defs>
    </svg>
  );
}
