'use client';

import { ThemeToggle } from './ThemeToggle';
import { TwinklingStars } from './TwinklingStars';
import { LogoLink } from './LogoLink';

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
    <aside
      className="
        fixed left-0 top-0 h-screen w-64 bg-black z-50 flex flex-col
        after:content-[''] after:absolute after:top-0 after:right-0 after:h-full after:w-px
        after:bg-gradient-to-b after:from-transparent after:via-[hsl(var(--gold-text))] after:to-transparent
        after:pointer-events-none
      "
    >
      {/* Twinkling Stars Background - covers logo and nav, but not theme toggle */}
      <div className="absolute inset-0 bottom-[72px] pointer-events-none">
        <TwinklingStars />
      </div>

      {/* Logo - Fixed at top */}
      <div className="flex-shrink-0 flex flex-col justify-center items-center py-8 px-6 relative z-10">
        <LogoLink
          theme={theme}
          sizePx={132}
        />
        <div className="mt-1 text-center text-sm font-bold tracking-[0.2em] leading-relaxed" style={{ fontFamily: "'Oswald', 'Bebas Neue', 'Arial Narrow', sans-serif", color: '#D4A650' }}>
          <div>FOUNDATION</div>
          <div className="text-white my-0.5">+</div>
          <div>CREATOR FUND</div>
          <div className="mt-1">
            <span>SYN</span>
            <span className="text-white">(THESIS)</span>
          </div>
        </div>
      </div>

      {/* Navigation - Scrollable middle section */}
      <nav className="flex-1 overflow-y-auto px-4 space-y-1 scrollbar-thin relative z-10">
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
                <span className="text-sm font-medium italic flex-shrink-0 text-[hsl(var(--gold-text))]">
                  {section.number}
                </span>
              )}
              <span className={`
                text-sm transition-colors duration-300
                ${activeSection === section.id
                  ? 'text-[hsl(var(--gold-text))]'
                  : 'text-[hsl(var(--sidebar-text))] group-hover:text-[hsl(var(--gold-text))]'
                }
              `}>
                {section.title}
              </span>
            </div>
          </button>
        ))}
      </nav>

      {/* Theme Toggle - Fixed at bottom with solid background (no stars) */}
      <div className="flex-shrink-0 p-6 flex justify-center border-t border-[hsl(var(--gold-dark))]/10 bg-black relative z-20">
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>
    </aside>
  );
}
