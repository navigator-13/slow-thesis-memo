'use client';

import { useState } from 'react';

interface Section {
  id: string;
  title: string;
  number: string | null;
}

interface TableOfContentsProps {
  sections: Section[];
  onSectionChange: (id: string) => void;
}

export function TableOfContents({ sections, onSectionChange }: TableOfContentsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Filter out the TOC itself
  const contentSections = sections.filter(s => s.id !== 'table-of-contents');

  return (
    <div>
      <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-black dark:text-white tracking-wide leading-tight">
        TABLE OF<br/>CONTENTS
      </h1>

      {/* Decorative underline */}
      <div className="w-24 h-0.5 mb-12 bg-gradient-to-r from-[hsl(var(--gold-text))] to-transparent" />

      {/* Author and Date */}
      <div className="mb-8 text-gray-700 dark:text-gray-300 italic">
        <p className="text-lg">Your Name</p>
        <p className="text-lg">
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <p className="text-gray-600 dark:text-gray-400 mb-12 italic">
        For additional notes, <span className="text-[hsl(var(--gold-text))] cursor-pointer hover:opacity-90 transition-opacity">click here</span>.
      </p>

      {/* TOC Items */}
      <div className="space-y-8 mt-16">
        {contentSections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            onMouseEnter={() => setHoveredId(section.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="w-full text-left group"
          >
            {/* Section Title */}
            <h3 className={`
              text-2xl md:text-3xl mb-3 transition-all duration-300
              ${hoveredId === section.id
                ? 'text-[hsl(var(--gold-text))]'
                : 'text-gray-900 dark:text-gray-300'
              }
            `}>
              {section.number && (
                <span className="italic mr-2">{section.number}</span>
              )}
              {section.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              A brief description of this section would appear here, providing context about what the reader will discover.
            </p>

            {/* Animated Divider */}
            <div className="relative h-px bg-gray-400/40 dark:bg-gray-700/20 overflow-hidden">
              <div
                className={`
                  absolute inset-y-0 h-full transition-all duration-500 ease-out
                  ${hoveredId === section.id
                    ? 'left-0 right-0 opacity-100'
                    : 'left-1/2 right-1/2 opacity-0'
                  }
                `}
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--gold-dark)) 0%, hsl(var(--gold-base)) 50%, hsl(var(--gold-light)) 100%)',
                  boxShadow: hoveredId === section.id ? '0 0 8px hsl(var(--gold-text))' : 'none',
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Next Section Link */}
      <div className="mt-20 pt-12 border-t border-[hsl(var(--gold-dark))]/20">
        <div className="flex justify-end">
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-500 mb-4 tracking-wider uppercase">Next Section</p>
            <button
              onClick={() => contentSections[0] && onSectionChange(contentSections[0].id)}
              className="group inline-flex items-center gap-3 transition-colors duration-300"
            >
              <span className="relative text-2xl italic text-[hsl(var(--gold-text))] group-hover:text-[hsl(var(--gold-light))] transition-colors duration-300">
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
                  {contentSections[0]?.title}
                </span>
              </span>
              <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300 text-2xl text-[hsl(var(--gold-text))] group-hover:text-[hsl(var(--gold-light))]">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
