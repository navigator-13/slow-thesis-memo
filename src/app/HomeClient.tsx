"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Sidebar } from '@/components/Sidebar';
import { BottomBar } from '@/components/BottomBar';
import { SectionContent } from '@/components/SectionContent';
import { ThemeProvider } from '@/components/ThemeProvider';
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

        {/* Mobile Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 w-screen z-50">
          <BottomBar
            sections={sections}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            theme={theme}
            onThemeToggle={toggleTheme}
            showTexture={showTexture}
            onTextureToggle={toggleTexture}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
