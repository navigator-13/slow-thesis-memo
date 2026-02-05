'use client';

import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { SidebarFooterScene } from './SidebarFooterScene';

interface Section {
  id: string;
  title: string;
  number: string | null;
  level: 2 | 3;
  parentId?: string;
}

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (id: string) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export function Sidebar({ sections, activeSection, onSectionChange, theme, onThemeToggle }: SidebarProps) {
  const topSections = useMemo(() => sections.filter(section => section.level === 2), [sections]);
  const subSections = useMemo(() => sections.filter(section => section.level === 3), [sections]);
  const activeItem = useMemo(() => sections.find(section => section.id === activeSection), [sections, activeSection]);
  const activeTopId = activeItem?.level === 3 ? activeItem.parentId : activeItem?.id;
  const [expandedTopId, setExpandedTopId] = useState<string | null>(activeTopId ?? null);

  useEffect(() => {
    if (activeTopId) {
      setExpandedTopId(activeTopId);
    }
  }, [activeTopId]);

  return (
    <aside
      style={{ '--gold-500': '#E2C79A', '--gold-300': '#E2C79A' } as CSSProperties}
      className="
        fixed left-0 top-0 h-screen w-64 bg-[var(--sidebar-bg)] z-50 flex flex-col transition-colors duration-300
      "
    >
      <div className="absolute top-0 right-0 h-full w-[3px] sidebar-divider pointer-events-none" />
      {/* Title - Top */}
      <button
        type="button"
        onClick={() => onSectionChange(sections[0]?.id ?? '')}
        className="flex-shrink-0 flex flex-col justify-center items-center pt-8 pb-4 px-6 relative z-10 text-center"
        aria-label="Go to top section"
      >
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
      </button>

      {/* Navigation */}
      <div className="flex-1 px-4 relative z-10 mt-2 min-h-0 flex flex-col">
        <div className="flex justify-center mb-4 flex-shrink-0">
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
        <div className="px-4 pt-1 pb-2 text-xs font-bold tracking-[0.2em] uppercase gold-text-base flex-shrink-0">
          Table of Contents
        </div>
        <nav className="flex-1 min-h-0 overflow-y-auto space-y-1 scrollbar-thin pb-5">
          {topSections.map((section) => {
            const children = subSections.filter(child => child.parentId === section.id);
            const isExpanded = expandedTopId === section.id;
            const isActiveTop = activeTopId === section.id;
            const showArrow = children.length > 0;

            return (
              <div key={section.id} className="space-y-1">
                <button
                  onClick={() => {
                    if (!showArrow) {
                      onSectionChange(section.id);
                      return;
                    }
                    if (isExpanded && isActiveTop) {
                      setExpandedTopId(null);
                      return;
                    }
                    setExpandedTopId(section.id);
                    onSectionChange(section.id);
                  }}
                  className={`
                    w-full text-left px-4 py-3 rounded-lg transition-all duration-300 relative group toc-item
                    ${isActiveTop ? 'is-active' : ''}
                  `}
                >
                  <div className="flex items-start gap-2">
                    {showArrow ? (
                      <span className={`toc-arrow ${isExpanded ? 'toc-arrow-down' : 'toc-arrow-right'}`} aria-hidden="true" />
                    ) : (
                      <span className="toc-arrow-spacer" aria-hidden="true" />
                    )}
                    {section.number && (
                      <span className="text-sm font-medium italic flex-shrink-0 gold-text-base">
                        {section.number}
                      </span>
                    )}
                    <span className={`
                      text-sm transition-colors duration-300 gold-hover-text
                      ${isActiveTop
                        ? 'is-active'
                        : 'text-[var(--sidebar-text)]'
                      }
                    `}>
                      {section.title}
                    </span>
                  </div>
                </button>

                {showArrow && isExpanded && (
                  <div className="ml-6 space-y-1">
                    {children.map((child) => {
                      const isActiveChild = activeSection === child.id;
                      return (
                        <button
                          key={child.id}
                          onClick={() => onSectionChange(child.id)}
                          className={`
                            w-full text-left px-4 py-2 rounded-lg transition-all duration-300 relative group toc-item
                            ${isActiveChild ? 'is-active' : ''}
                          `}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`toc-current-square ${isActiveChild ? 'is-active' : ''}`} aria-hidden="true" />
                            <span className={`
                              text-sm transition-colors duration-300 gold-hover-text
                              ${isActiveChild
                                ? 'is-active'
                                : 'text-[var(--sidebar-text)]'
                              }
                            `}>
                              {child.title}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
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
