'use client';

import { useEffect, useState } from 'react';
import { TableOfContents } from './TableOfContents';
import { SectionDivider } from './SectionDivider';
import { WheatPopup } from './WheatPopup';

interface Section {
  id: string;
  title: string;
  number: string | null;
}

interface SectionContentProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (id: string) => void;
}

export function SectionContent({ sections, activeSection, onSectionChange }: SectionContentProps) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setFadeIn(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [activeSection]);

  const currentIndex = sections.findIndex(s => s.id === activeSection);
  const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

  if (activeSection === 'table-of-contents') {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <TableOfContents sections={sections} onSectionChange={onSectionChange} />
      </div>
    );
  }

  const currentSection = sections.find(s => s.id === activeSection);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
      {/* Section Header with Fade-in */}
      <div
        style={{
          opacity: fadeIn ? 1 : 0,
          transitionProperty: 'opacity',
          transitionDuration: '1200ms',
          transitionDelay: '150ms',
          transitionTimingFunction: 'ease',
        }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8 text-black dark:text-white uppercase tracking-[0.18em] leading-tight">
          {currentSection?.title}
        </h1>

        {/* Small decorative divider */}
        <div
          className="w-32 h-0.5 mb-12 origin-left bg-gradient-to-r from-[hsl(var(--gold-dark))] via-[hsl(var(--gold-base))] to-[hsl(var(--gold-light))]"
          style={{
            transform: fadeIn ? 'scaleX(1)' : 'scaleX(0)',
            opacity: fadeIn ? 1 : 0,
            transitionProperty: 'opacity, transform',
            transitionDuration: '1200ms',
            transitionDelay: '150ms',
            transitionTimingFunction: 'ease',
          }}
        />
      </div>

      {/* Section Content */}
      <div className="prose prose-lg max-w-none">
        {/* Replace with your actual content - see ExampleSection.tsx for structure guide */}

        <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6 text-lg">
          This is where your essay content for <em className="text-[hsl(var(--gold-text))]">{currentSection?.title}</em> will appear.
          Replace this section with your actual writing. See{' '}
          <code className="text-[hsl(var(--gold-text))] bg-black/10 dark:bg-black/20 px-2 py-1 rounded text-sm">
            src/components/sections/ExampleSection.tsx
          </code>
          {' '}for a complete content structure guide.
        </p>

        <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
          You can add inline annotations{' '}
          <WheatPopup content="Click the wheat icon to see this popup! You can add text, images, or URL previews here for additional context." />
          {' '}throughout your text. Hover over the wheat icon to see the wiggle animation, then click to open the popup.
        </p>

        <SectionDivider />

        <h2 className="text-2xl md:text-3xl text-[hsl(var(--gold-text))] italic mb-6 mt-8">
          Platform Features
        </h2>

        <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 space-y-3 mb-6 ml-4">
          <li>Section-based navigation with smooth fade-in transitions</li>
          <li>Interactive wheat icon popups for annotations and side notes</li>
          <li>Elegant section dividers with animated pulsing golden dots</li>
          <li>Day/night reading mode toggle (sun/moon icon at bottom of sidebar)</li>
          <li>Fully responsive design for mobile and desktop viewing</li>
          <li>Twinkling stars animation in sidebar background</li>
          <li>Warm amber-gold color palette matching finaloffshoring.com</li>
        </ul>

        <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
          The EB Garamond font provides an elegant, literary aesthetic perfect for long-form essays and memos.
          All animations and interactions are pre-configured and ready to use.
        </p>
      </div>

      {/* Next Section Button */}
      {nextSection && (
        <div className="mt-16 pt-8 border-t border-[hsl(var(--gold-dark))]/20">
          <div className="flex justify-end">
            <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 tracking-wider uppercase">Next Section</p>
            <button
              onClick={() => onSectionChange(nextSection.id)}
              className="group inline-flex items-center gap-3 transition-colors duration-300"
            >
              <span className="relative text-xl md:text-2xl italic text-[hsl(var(--gold-text))] group-hover:text-[hsl(var(--gold-light))] transition-colors duration-300">
                <span
                  className="
                    relative
                    after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full
                    after:bg-[hsl(var(--gold-text))]
                    after:origin-right after:scale-x-0
                    after:transition-transform after:duration-300
                    group-hover:after:origin-left group-hover:after:scale-x-100
                  "
                >
                {nextSection.title}
                </span>
              </span>
              <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300 text-2xl text-[hsl(var(--gold-text))] group-hover:text-[hsl(var(--gold-light))]">
                →
              </span>
            </button>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
