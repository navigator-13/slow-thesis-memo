'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { BottomBar } from '@/components/BottomBar';
import { SectionContent } from '@/components/SectionContent';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function Home() {
  const [activeSection, setActiveSection] = useState('table-of-contents');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const sections = [
    { id: 'table-of-contents', title: 'Table of Contents', number: null },
    { id: 'section-1', title: 'Introduction', number: 'I.' },
    { id: 'section-2', title: 'The Problem', number: 'II.' },
    { id: 'section-3', title: 'The Solution', number: 'III.' },
    { id: 'section-4', title: 'Implementation', number: 'IV.' },
    { id: 'section-5', title: 'Conclusion', number: 'V.' },
  ];

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            theme={theme}
            onThemeToggle={toggleTheme}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 relative md:ml-64">
          <div className={`${theme === 'dark' ? 'bg-topographic' : 'bg-topographic-light'} min-h-screen pb-20 md:pb-0`}>
            <SectionContent
              sections={sections}
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
        </main>

        {/* Mobile Bottom Bar */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 w-screen z-50">
          <BottomBar
            sections={sections}
            activeSection={activeSection}
            onSectionChange={setActiveSection}
            theme={theme}
            onThemeToggle={toggleTheme}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}
