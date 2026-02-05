"use client";

import { useState, useEffect, useCallback } from 'react';
import type { CSSProperties } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { BottomBar } from '@/components/BottomBar';
import { SectionContent } from '@/components/SectionContent';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { ParsedSection } from '@/lib/markdown';

type Props = {
  sections: ParsedSection[];
  preface: string;
};

export function HomeClient({ sections, preface }: Props) {
  const [activeSection, setActiveSection] = useState(() => sections[0]?.id ?? '');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const [showTexture, setShowTexture] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleTexture = () => {
    setShowTexture(prev => !prev);
  };

  const handleSectionChange = useCallback((id: string) => {
    setActiveSection(id);
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0 });
    requestAnimationFrame(() => {
      root.style.scrollBehavior = prev;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      const currentIndex = sections.findIndex(section => section.id === activeSection);
      if (currentIndex < 0) return;
      if (event.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        handleSectionChange(sections[currentIndex + 1].id);
        event.preventDefault();
      }
      if (event.key === 'ArrowLeft' && currentIndex > 0) {
        handleSectionChange(sections[currentIndex - 1].id);
        event.preventDefault();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [sections, activeSection, handleSectionChange]);

  const textureClass = showTexture
    ? (theme === 'dark' ? 'bg-topographic' : 'bg-topographic-light')
    : '';

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden md:block sidebar-shell">
          <Sidebar
            sections={sections}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            theme={theme}
            onThemeToggle={toggleTheme}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 relative md:ml-64">
          <div className={`${textureClass} min-h-screen pb-20 md:pb-0`}>
            <SectionContent
              sections={sections}
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              preface={preface}
            />
          </div>
        </main>

        {/* Texture Toggle - Desktop */}
        <button
          onClick={toggleTexture}
          className={`hidden md:flex fixed bottom-6 right-6 z-40 w-16 h-16 items-center justify-center wiggle-hover transition-opacity ${showTexture ? 'opacity-100' : 'opacity-60'}`}
          aria-label="Toggle contour background"
        >
          <span
            className="w-[72px] h-[72px] block"
            style={{
              backgroundColor: theme === 'light' ? 'var(--sidebar-bg)' : '#E2C79A',
              WebkitMaskImage: "url('/shovel%20icon.png')",
              maskImage: "url('/shovel%20icon.png')",
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
          />
        </button>

        {/* Mobile Toggles */}
        <div
          className="md:hidden z-[60] flex items-center gap-2"
          style={{
            position: 'fixed',
            right: '16px',
            bottom: '112px',
            '--gold-500': '#E2C79A',
            '--gold-300': '#E2C79A',
          } as CSSProperties}
        >
          <button
            onClick={toggleTexture}
            className={`w-12 h-12 flex items-center justify-center rounded-full border wiggle-hover transition-opacity ${showTexture ? 'opacity-100' : 'opacity-60'}`}
            style={{
              borderColor: 'rgba(140,106,62,0.25)',
              backgroundColor: 'rgba(31,26,20,0.35)',
            }}
            aria-label="Toggle contour background"
          >
            <span
              className="w-10 h-10 block"
              style={{
                backgroundColor: theme === 'light' ? 'var(--sidebar-bg)' : '#E2C79A',
                WebkitMaskImage: "url('/shovel%20icon.png')",
                maskImage: "url('/shovel%20icon.png')",
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
              }}
            />
          </button>
          <div className="w-12 h-12 flex items-center justify-center rounded-full border wiggle-hover" style={{ borderColor: 'rgba(140,106,62,0.25)', backgroundColor: 'rgba(31,26,20,0.35)' }}>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>

        {/* Mobile Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 w-screen z-50">
          <BottomBar
            sections={sections}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            theme={theme}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
