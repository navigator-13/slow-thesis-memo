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
      {/* Title - Top */}
      <div className="flex-shrink-0 flex flex-col justify-center items-center py-8 px-6 relative z-10">
        <div className="text-center text-sm font-bold tracking-[0.2em] leading-relaxed gold-text-base" style={{ fontFamily: "'Oswald', 'Bebas Neue', 'Arial Narrow', sans-serif" }}>
          <div>CREATOR FUND</div>
          <div className="text-[var(--text-dark)] my-0">+</div>
          <div>FOUNDATION</div>
          <div className="mt-4 text-[1.4em] leading-none">
            <span>SYN</span>
            <span className="text-[var(--text-dark)]">(THESIS)</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 relative z-10 mt-4 min-h-0">
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
