'use client';

import { SidebarFooterScene } from './SidebarFooterScene';

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
      style={{ ['--gold-500' as 'any']: '#E2C79A', ['--gold-300' as 'any']: '#E2C79A' }}
      className="
        fixed left-0 top-0 h-screen w-64 bg-[var(--sidebar-bg)] z-50 flex flex-col transition-colors duration-300
      "
    >
      <div className="absolute top-0 right-0 h-full w-[3px] sidebar-divider pointer-events-none" />
      {/* Title - Top */}
      <div className="flex-shrink-0 flex flex-col justify-center items-center pt-8 pb-4 px-6 relative z-10">
        <div className="text-center text-sm font-bold tracking-[0.2em] leading-relaxed gold-text-base" style={{ fontFamily: "'Oswald', 'Bebas Neue', 'Arial Narrow', sans-serif" }}>
          <div className="mb-4 text-[1.4em] leading-none">
            <span>SYN</span>
            <span className="text-[var(--text-dark)]">(THESIS)</span>
            <span>:</span>
          </div>
          <div>
            CREATOR FUND <span className="text-[var(--text-dark)]">+</span> FOUNDATION INSIGHTS
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 relative z-10 mt-2 min-h-0">
        <div className="flex justify-center mb-4">
          <span
            className="block w-10 h-12"
            style={{
              backgroundColor: '#E2C79A',
              WebkitMaskImage: `url('/${theme === 'dark' ? 'logo-night.png' : 'logo-day.png'}')`,
              maskImage: `url('/${theme === 'dark' ? 'logo-night.png' : 'logo-day.png'}')`,
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
            aria-hidden="true"
          />
        </div>
        <div className="px-4 pt-1 pb-2 text-xs font-bold tracking-[0.2em] uppercase gold-text-base">
          Table of Contents
        </div>
        <nav className="overflow-y-auto space-y-1 scrollbar-thin">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`
                w-full text-left px-4 py-3 rounded-lg transition-all duration-300 relative group toc-item
                ${activeSection === section.id ? 'is-active' : ''}
              `}
            >
              <div className="flex items-start gap-2">
                {section.number && (
                  <span className="text-sm font-medium italic flex-shrink-0 gold-text-base">
                    {section.number}
                  </span>
                )}
                <span className={`
                  text-sm transition-colors duration-300 gold-hover-text
                  ${activeSection === section.id
                    ? 'is-active'
                    : 'text-[var(--sidebar-text)]'
                  }
                `}>
                  {section.title}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Theme Toggle - Fixed at bottom with solid background (no stars) */}
      {/* Footer Scene */}
      <div className="flex-shrink-0">
        <SidebarFooterScene theme={theme} onToggle={onThemeToggle} />
      </div>
    </aside>
  );
}
