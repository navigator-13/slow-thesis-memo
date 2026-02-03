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
        bg-[var(--sidebar-bg)] w-full
        relative
        bottom-bar-divider
        transition-colors duration-300
      "
    >
      {/* Logo and Theme Toggle Row */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: 'rgba(140,106,62,0.2)' }}
      >
        <div className="flex items-center gap-2">
          <LogoLink
            theme={theme}
            sizePx={36}
          />
          <div className="text-[11px] font-bold tracking-wider whitespace-nowrap" style={{ fontFamily: "'Oswald', 'Bebas Neue', 'Arial Narrow', sans-serif" }}>
            <span className="gold-text-base">FOUNDATION </span>
            <span className="text-primary">+ </span>
            <span className="gold-text-base">CREATOR FUND SYN</span>
            <span className="text-primary">(THESIS)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onTextureToggle}
            className={`w-9 h-9 flex items-center justify-center rounded-full border wiggle-hover transition-opacity ${showTexture ? 'opacity-100' : 'opacity-60'}`}
            style={{ borderColor: 'rgba(140,106,62,0.25)', backgroundColor: 'rgba(31,26,20,0.35)' }}
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
                  ? 'gold-text-hover gold-underline is-active'
                  : 'text-primary gold-text-on-hover gold-underline'
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
