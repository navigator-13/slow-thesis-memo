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
      <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-primary tracking-wide leading-tight">
        TABLE OF<br/>CONTENTS
      </h1>

      {/* Decorative underline */}
      <div className="w-24 h-0.5 mb-12" style={{ background: 'var(--gold-gradient)' }} />

      {/* Author and Date */}
      <div className="mb-8 text-primary italic">
        <p className="text-lg">Your Name</p>
        <p className="text-lg">
          {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>

      <p className="text-muted mb-12 italic">
        For additional notes, <span className="gold-text-hoverable gold-underline cursor-pointer transition-opacity">click here</span>.
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
                ? 'gold-text-hover gold-underline is-active'
                : 'text-primary'
              }
            `}>
              {section.number && (
                <span className="italic mr-2">{section.number}</span>
              )}
              {section.title}
            </h3>

            {/* Description */}
            <p className="text-muted mb-4 leading-relaxed">
              A brief description of this section would appear here, providing context about what the reader will discover.
            </p>

            {/* Animated Divider */}
            <div className="relative h-px bg-transparent overflow-hidden">
              <div
                className={`
                  absolute inset-y-0 h-full transition-all duration-500 ease-out
                  ${hoveredId === section.id
                    ? 'left-0 right-0 opacity-100'
                    : 'left-1/2 right-1/2 opacity-0'
                  }
                `}
                style={{
                  background: 'var(--gold-gradient)',
                  boxShadow: hoveredId === section.id ? '0 0 8px rgba(225,194,122,0.4)' : 'none',
                }}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Next Section Link */}
      <div className="mt-20 pt-12 border-t" style={{ borderColor: 'rgba(140,106,62,0.2)' }}>
        <div className="flex justify-end">
          <div className="text-right">
            <p className="text-sm text-muted mb-4 tracking-wider uppercase">Next Section</p>
            <button
              onClick={() => contentSections[0] && onSectionChange(contentSections[0].id)}
              className="group inline-flex items-center gap-3 transition-colors duration-300"
            >
              <span className="relative text-2xl italic gold-text-hoverable gold-underline transition-colors duration-300">
                <span className="relative">
                  {contentSections[0]?.title}
                </span>
              </span>
              <span className="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300 text-2xl gold-text-hoverable">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
