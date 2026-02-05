'use client';

import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { slugify } from '@/lib/markdown';

interface Section {
  id: string;
  title: string;
  number: string | null;
  content: string;
  level: 2 | 3;
  parentId?: string;
}

interface SectionContentProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (id: string) => void;
  preface: string;
}

export function SectionContent({ sections, activeSection, onSectionChange, preface }: SectionContentProps) {
  const [fadeIn, setFadeIn] = useState(false);
  const [hoveredExecTitle, setHoveredExecTitle] = useState<string | null>(null);

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
  const childSections = currentSection?.level === 2
    ? sections.filter(section => section.level === 3 && section.parentId === currentSection.id)
    : [];
  const showPreface = currentIndex === 0 && Boolean(preface);
  const isExecutiveSummary = currentSection?.id === 'executive-summary';

  const execSummaryTargets: Record<string, string> = {
    'our creator fund thesis': 'creator-fund-thesis',
    'foundation insights': 'foundation-insights',
    'the synthesis': 'synthesis',
  };

  const getTextFromChildren = (children: React.ReactNode): string => {
    if (typeof children === 'string') return children;
    if (Array.isArray(children)) return children.map(getTextFromChildren).join('');
    if (children && typeof children === 'object' && 'props' in children) {
      return getTextFromChildren((children as { props?: { children?: React.ReactNode } }).props?.children);
    }
    return '';
  };

  const normalizeExecTitle = (input: string) =>
    input.toLowerCase().replace(/[:.]+$/, '').trim();

  const isJumpToParagraph = (children: React.ReactNode) => {
    const nodes = Array.isArray(children) ? children : [children];
    for (const node of nodes) {
      if (node && typeof node === 'object' && 'type' in node && node.type === 'strong') {
        const text = getTextFromChildren((node as { props?: { children?: React.ReactNode } }).props?.children).trim();
        return text.toLowerCase() === 'jump to:';
      }
    }
    return false;
  };

  const extractJumpLinks = (children: React.ReactNode) => {
    const nodes = Array.isArray(children) ? children : [children];
    const links: Array<{ href?: string; label: React.ReactNode; key: string }> = [];
    nodes.forEach((node, index) => {
      if (node && typeof node === 'object' && 'type' in node && node.type === 'a') {
        const props = (node as { props?: { href?: string; children?: React.ReactNode } }).props;
        links.push({
          href: props?.href,
          label: props?.children,
          key: `${props?.href ?? 'link'}-${index}`,
        });
      }
    });
    return links;
  };

  const markdownComponents = {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 id={slugify(getTextFromChildren(children))} className="text-3xl md:text-4xl lg:text-5xl mb-8 text-primary uppercase tracking-[0.18em] leading-tight">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 id={slugify(getTextFromChildren(children))} className="text-2xl md:text-3xl italic mb-6 mt-10 text-primary">
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3
        id={slugify(getTextFromChildren(children))}
        className={`text-xl md:text-2xl italic mb-4 mt-8 text-primary ${currentSection?.id === 'operator-profiles' || currentSection?.parentId === 'operator-profiles' ? 'operator-h3' : ''}`}
      >
        {children}
      </h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 id={slugify(getTextFromChildren(children))} className="text-lg md:text-xl italic mb-3 mt-6 text-primary">
        {children}
      </h4>
    ),
    p: ({ children }: { children: React.ReactNode }) => {
      if (isJumpToParagraph(children)) {
        const links = extractJumpLinks(children);
        return (
          <div className="mb-10">
            <div className="text-xs uppercase tracking-[0.2em] mb-3 gold-text-base">Jump to</div>
            <div className="flex flex-wrap gap-3">
              {links.map((link) => (
                <a key={link.key} href={link.href} className="jump-to-chip">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        );
      }

      if (!isExecutiveSummary) {
        return (
          <p className="text-primary leading-relaxed mb-6 text-lg">
            {children}
          </p>
        );
      }

      const childArray = Array.isArray(children) ? children : [children];
      let mappedTarget: string | null = null;
      let titleText = '';
      let mappedStrongIndex = -1;

      childArray.forEach((child, index) => {
        if (mappedTarget) return;
        if (child && typeof child === 'object' && 'type' in child && child.type === 'strong') {
          const text = getTextFromChildren((child as { props?: { children?: React.ReactNode } }).props?.children).trim();
          const normalized = normalizeExecTitle(text);
          if (execSummaryTargets[normalized]) {
            mappedTarget = execSummaryTargets[normalized];
            titleText = text;
            mappedStrongIndex = index;
          }
        }
      });

      const hasMappedTarget = Boolean(mappedTarget);

      return (
        <p
          className={`text-primary leading-relaxed mb-6 text-lg ${hasMappedTarget ? 'exec-summary-paragraph' : ''}`}
          onMouseEnter={() => hasMappedTarget && setHoveredExecTitle(mappedTarget)}
          onMouseLeave={() => hasMappedTarget && setHoveredExecTitle(null)}
        >
          {hasMappedTarget
            ? childArray.map((child, index) => {
              if (index !== mappedStrongIndex) return child;
              return (
                <button
                  key={`exec-title-${mappedTarget}`}
                  type="button"
                  onClick={() => mappedTarget && onSectionChange(mappedTarget)}
                  className={`exec-summary-title gold-underline ${hoveredExecTitle === mappedTarget ? 'is-active' : ''}`}
                >
                  <strong>{titleText}</strong>
                </button>
              );
            })
            : children}
        </p>
      );
    },
    li: ({ children }: { children: React.ReactNode }) => (
      <li className="text-primary leading-relaxed">
        {children}
      </li>
    ),
    a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
      <a
        href={href}
        className="gold-text-hoverable gold-underline gold-link transition-colors duration-200"
      >
        {children}
      </a>
    ),
    hr: () => (
      <hr
        className={`my-10 ${currentSection?.id === 'operator-profiles' || currentSection?.parentId === 'operator-profiles' ? 'operator-divider' : ''}`}
        style={{ borderColor: 'rgba(140,106,62,0.2)' }}
      />
    ),
    strong: ({ children }: { children: React.ReactNode }) => <strong className="gold-text-base">{children}</strong>,
    em: ({ children }: { children: React.ReactNode }) => <em className="italic gold-text-base">{children}</em>,
    ul: ({ children }: { children: React.ReactNode }) => <ul className="list-disc list-inside space-y-3 mb-6 ml-4">{children}</ul>,
    ol: ({ children }: { children: React.ReactNode }) => <ol className="list-decimal list-inside space-y-3 mb-6 ml-4">{children}</ol>,
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-2 border-[color:var(--gold-700)] pl-4 text-muted italic my-6">
        {children}
      </blockquote>
    ),
  } satisfies React.ComponentProps<typeof ReactMarkdown>['components'];

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
      {showPreface && (
        <div className="mb-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {preface}
          </ReactMarkdown>
        </div>
      )}

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
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-8 text-primary uppercase tracking-[0.18em] leading-tight">
          {currentSection?.title}
        </h1>

        {/* Small decorative divider */}
        <div
          className="w-32 h-0.5 mb-12 origin-left"
          style={{
            transform: fadeIn ? 'scaleX(1)' : 'scaleX(0)',
            opacity: fadeIn ? 1 : 0,
            transitionProperty: 'opacity, transform',
            transitionDuration: '1200ms',
            transitionDelay: '150ms',
            transitionTimingFunction: 'ease',
            background: 'var(--gold-gradient)',
          }}
        />
      </div>

      {currentSection?.level === 2 && childSections.length > 1 && (
        <div className="mb-10">
          <div className="text-xs uppercase tracking-[0.2em] mb-3 gold-text-base">Jump to</div>
          <div className="flex flex-wrap gap-3">
            {childSections.map((child) => (
              <button
                key={child.id}
                type="button"
                onClick={() => onSectionChange(child.id)}
                className={`jump-to-chip ${activeSection === child.id ? 'is-active' : ''}`}
              >
                {child.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Section Content */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {currentSection?.content ?? ''}
        </ReactMarkdown>
      </div>

      {/* Next Section Button */}
      {nextSection && (
        <div className="mt-16 pt-8 border-t" style={{ borderColor: 'rgba(140,106,62,0.2)' }}>
          <div className="flex justify-end">
            <div className="text-right">
              <p className="text-sm text-muted mb-4 tracking-wider uppercase">Next Section</p>
              <button
                onClick={() => onSectionChange(nextSection.id)}
                className="group inline-flex items-center gap-3 transition-colors duration-300"
              >
                <span className="relative text-xl md:text-2xl italic transition-colors duration-300">
                  <span
                    className="relative gold-text-hoverable gold-underline"
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
