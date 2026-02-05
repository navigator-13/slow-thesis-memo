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
    const walk = (node: React.ReactNode): boolean => {
      if (!node) return false;
      if (Array.isArray(node)) return node.some(walk);
      if (typeof node === 'object' && 'type' in node && 'props' in node) {
        if (node.type === 'strong') {
          const text = getTextFromChildren((node as { props?: { children?: React.ReactNode } }).props?.children).trim();
          const normalized = text.toLowerCase().replace(/[:.]+$/, '');
          if (normalized === 'jump to') return true;
        }
        return walk((node as { props?: { children?: React.ReactNode } }).props?.children);
      }
      return false;
    };
    return walk(children);
  };

  const extractJumpLinks = (children: React.ReactNode) => {
    const links: Array<{ href?: string; label: React.ReactNode; key: string }> = [];
    let idx = 0;
    const walk = (node: React.ReactNode) => {
      if (!node) return;
      if (Array.isArray(node)) {
        node.forEach(walk);
        return;
      }
      if (typeof node === 'object' && 'type' in node && 'props' in node) {
        if (node.type === 'a') {
          const props = (node as { props?: { href?: string; children?: React.ReactNode } }).props;
          links.push({
            href: props?.href,
            label: props?.children,
            key: `${props?.href ?? 'link'}-${idx++}`,
          });
          return;
        }
        walk((node as { props?: { children?: React.ReactNode } }).props?.children);
      }
    };
    walk(children);
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
      let leadIndex = -1;

      const leadMap: Record<string, string | null> = {
        ...execSummaryTargets,
        'timing': 'conclusion',
        'live investment opportunity': 'conclusion',
      };

      childArray.forEach((child, index) => {
        if (leadIndex >= 0) return;
        if (child && typeof child === 'object' && 'props' in child) {
          const text = getTextFromChildren((child as { props?: { children?: React.ReactNode } }).props?.children).trim();
          if (!text) return;
          const normalized = normalizeExecTitle(text);
          if (normalized in leadMap) {
            leadIndex = index;
            titleText = text;
            mappedTarget = leadMap[normalized];
          }
        }
      });

      const hasMappedTarget = Boolean(mappedTarget);
      const hasStrongLead = leadIndex >= 0;

      if (!hasStrongLead) {
        return (
          <p className="text-primary leading-relaxed mb-6 text-lg">
            {children}
          </p>
        );
      }

      const targetId = mappedTarget ?? 'conclusion';

      return (
        <button
          type="button"
          onClick={() => onSectionChange(targetId)}
          className="exec-summary-paragraph text-primary leading-relaxed mb-6 text-lg text-left w-full"
          onMouseEnter={() => setHoveredExecTitle(targetId)}
          onMouseLeave={() => setHoveredExecTitle(null)}
        >
          {childArray.map((child, index) => {
            if (index !== leadIndex) return child;
            return (
              <span
                key={`exec-strong-${index}`}
                className={`exec-summary-strong gold-underline ${hoveredExecTitle === targetId ? 'is-active' : ''}`}
              >
                {child}
              </span>
            );
          })}
        </button>
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
    table: ({ children }: { children: React.ReactNode }) => (
      <div className="overflow-x-auto mb-8">
        <table className="memo-table">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>,
    tbody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
    tr: ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>,
    th: ({ children }: { children: React.ReactNode }) => <th>{children}</th>,
    td: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
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
