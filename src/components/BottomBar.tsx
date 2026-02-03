'use client';

import { ThemeToggle } from './ThemeToggle';
import { LogoLink } from './LogoLink';

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
  showTexture: boolean;
  onTextureToggle: () => void;
}

export function BottomBar({ sections, activeSection, onSectionChange, theme, onThemeToggle, showTexture, onTextureToggle }: BottomBarProps) {
  return (
    <div
      className="
        bg-[hsl(var(--sidebar-bg))] w-full
        relative
        before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-px
        before:bg-gradient-to-r before:from-transparent before:via-[hsl(var(--gold-text))] before:to-transparent
        before:pointer-events-none
        after:content-[''] after:absolute after:inset-0 after:pointer-events-none
        after:bg-gradient-to-t after:from-black after:to-[hsl(var(--sidebar-bg))]
      "
    >
      {/* Logo and Theme Toggle Row */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[hsl(var(--gold-dark))]/10">
        <div className="flex items-center gap-2">
          <LogoLink
            theme={theme}
            sizePx={36}
          />
          <div className="text-[11px] font-bold tracking-wider whitespace-nowrap" style={{ fontFamily: "'Oswald', 'Bebas Neue', 'Arial Narrow', sans-serif" }}>
            <span className="text-[hsl(var(--gold-text))]">FOUNDATION </span>
            <span className="text-white">+ </span>
            <span className="text-[hsl(var(--gold-text))]">CREATOR FUND SYN</span>
            <span className="text-white">(THESIS)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onTextureToggle}
            className={`w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-black/40 wiggle-hover transition-opacity ${showTexture ? 'opacity-100' : 'opacity-60'}`}
            aria-label="Toggle contour background"
          >
            <img src="/shovel%20icon.png" alt="" className="w-5 h-5 object-contain" />
          </button>
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        </div>
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
                  ? 'bg-gradient-to-r from-[hsl(var(--gold-dark))]/30 to-transparent text-[hsl(var(--gold-text))]'
                  : 'text-gray-400 hover:text-[hsl(var(--gold-text))]'
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
