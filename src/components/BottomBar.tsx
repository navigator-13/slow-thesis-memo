'use client';

import { useEffect, useState } from 'react';
import { LogoLink } from './LogoLink';

interface Section {
  id: string;
  title: string;
  number: string | null;
  level: 2 | 3;
  parentId?: string;
}

interface BottomBarProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (id: string) => void;
  theme: 'light' | 'dark';
}

export function BottomBar({ sections, activeSection, onSectionChange, theme }: BottomBarProps) {
  const topSections = sections.filter(section => section.level === 2);
  const subSections = sections.filter(section => section.level === 3);
  const activeItem = sections.find(section => section.id === activeSection);
  const activeTopId = activeItem?.level === 3 ? activeItem.parentId : activeItem?.id;
  const activeTop = topSections.find(section => section.id === activeTopId);
  const activeChildren = subSections.filter(section => section.parentId === activeTopId);
  const [showSubsections, setShowSubsections] = useState(false);

  useEffect(() => {
    setShowSubsections(false);
  }, [activeTopId]);

  const shortenMobileTitle = (title: string) => {
    if (!title) return title;
    const colonSplit = title.split(':');
    const slashSplit = colonSplit[0].split('/');
    const base = slashSplit[0].trim();
    if (base.length <= 18) return base;
    const words = base.split(/\s+/).filter(Boolean);
    const trimmed = words.slice(0, 3).join(' ').replace(/&$/, '').trim();
    return trimmed || base;
  };

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
        className="flex border-b"
        style={{ borderColor: 'rgba(140,106,62,0.2)' }}
      >
        <div className="w-[120px] flex flex-col items-center justify-center gap-2 px-2 py-3 border-r" style={{ borderColor: 'rgba(140,106,62,0.2)' }}>
          <LogoLink
            theme={theme}
            sizePx={26}
          />
          <div className="text-[10px] tracking-[0.2em] gold-text-base leading-none" style={{ fontFamily: "'Oswald', 'Bebas Neue', 'Arial Narrow', sans-serif" }}>
            SYN<span className="text-primary">(THESIS)</span>
          </div>
        </div>
        <div className="flex-1">
          {/* Scrollable Navigation */}
          <div className="overflow-x-auto">
            <div className="flex gap-2 px-4 py-3 min-w-max">
              {showSubsections && activeChildren.length > 0 ? (
                <>
                  {activeTop && (
                    <button
                      onClick={() => setShowSubsections(false)}
                      className="px-3 py-2 rounded-full whitespace-nowrap text-[11px] border border-[rgba(184,138,79,0.5)] gold-text-base"
                    >
                      ← {shortenMobileTitle(activeTop.title)}
                    </button>
                  )}
                  {activeChildren.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => onSectionChange(section.id)}
                      className={`
                        px-3 py-2 rounded-full whitespace-nowrap text-[11px] transition-all duration-300 border
                        ${activeSection === section.id
                          ? 'border-[rgba(184,138,79,0.9)] gold-text-base'
                          : 'border-[rgba(184,138,79,0.45)] text-primary'
                        }
                      `}
                    >
                      {shortenMobileTitle(section.title)}
                    </button>
                  ))}
                </>
              ) : (
                topSections.map((section) => {
                  const children = subSections.filter(sub => sub.parentId === section.id);
                  return (
                    <button
                      key={section.id}
                      onClick={() => {
                        if (activeTopId === section.id && children.length > 0) {
                          setShowSubsections(true);
                        } else {
                          setShowSubsections(false);
                          onSectionChange(section.id);
                        }
                      }}
                      className={`
                        px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all duration-300
                        ${activeTopId === section.id
                          ? 'gold-text-hover gold-underline is-active'
                          : 'text-primary gold-text-on-hover gold-underline'
                        }
                      `}
                    >
                      {section.number && <span className="italic mr-1">{section.number}</span>}
                      {section.title}
                    </button>
                  );
                })
              )}
            </div>
          </div>
          {showSubsections && activeChildren.length > 0 && (
            <div className="border-t" style={{ borderColor: 'rgba(140,106,62,0.2)' }}>
              <div className="overflow-x-auto">
                <div className="flex gap-2 px-4 py-2 min-w-max">
                  {activeChildren.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => onSectionChange(section.id)}
                      className={`
                        px-3 py-2 rounded-full whitespace-nowrap text-[11px] transition-all duration-300 border
                        ${activeSection === section.id
                          ? 'border-[rgba(184,138,79,0.9)] gold-text-base'
                          : 'border-[rgba(184,138,79,0.45)] text-primary'
                        }
                      `}
                    >
                      {shortenMobileTitle(section.title)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
