'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Section {
  id: string;
  title: string;
  number: string | null;
  content: string;
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
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => (
              <h2 className="text-2xl md:text-3xl italic mb-6 mt-10 gold-text-base">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl md:text-2xl italic mb-4 mt-8 gold-text-base">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg md:text-xl italic mb-3 mt-6 gold-text-base">
                {children}
              </h4>
            ),
            p: ({ children }) => (
              <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                {children}
              </p>
            ),
            li: ({ children }) => (
              <li className="text-gray-800 dark:text-gray-300 leading-relaxed">
                {children}
              </li>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                className="gold-text-hoverable transition-colors duration-200 underline underline-offset-4"
              >
                {children}
              </a>
            ),
            hr: () => <hr className="my-10 border-[hsl(var(--gold-dark))]/20" />,
            strong: ({ children }) => <strong className="gold-text-base">{children}</strong>,
            em: ({ children }) => <em className="italic gold-text-base">{children}</em>,
            ul: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-6 ml-4">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 mb-6 ml-4">{children}</ol>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-[hsl(var(--gold-dark))] pl-4 text-gray-700 dark:text-gray-300 italic my-6">
                {children}
              </blockquote>
            ),
          }}
        >
          {currentSection?.content ?? ''}
        </ReactMarkdown>
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
                <span className="relative text-xl md:text-2xl italic transition-colors duration-300">
                  <span
                    className="
                      relative
                      gold-text-hoverable
                      after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full
                      after:bg-[hsl(var(--gold-dark))]
                      after:origin-right after:scale-x-0
                      after:transition-transform after:duration-300
                      group-hover:after:origin-left group-hover:after:scale-x-100
                    "
                  >
                    {nextSection.title}
                  </span>
                </span>
                <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300 text-2xl gold-text-hoverable">
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
