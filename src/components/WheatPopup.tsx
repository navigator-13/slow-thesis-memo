'use client';

import { useState } from 'react';

interface WheatPopupProps {
  content: string | React.ReactNode;
  imageUrl?: string;
  urlPreview?: string;
}

export function WheatPopup({ content, imageUrl, urlPreview }: WheatPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="inline-flex items-center align-middle mx-1 cursor-pointer group"
        aria-label="Show annotation"
      >
        <WheatIcon isHovered={isHovered} />
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 animate-fade-in">
          <div
            className="bg-[var(--sidebar-bg)] border rounded-lg p-4 shadow-2xl max-w-sm"
            style={{ borderColor: 'rgba(140,106,62,0.3)' }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-muted gold-text-on-hover transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Content */}
            <div className="text-sm text-primary leading-relaxed pr-6">
              {content}
            </div>

            {/* Optional Image */}
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Popup content"
                className="mt-3 rounded max-w-full"
              />
            )}

            {/* Optional URL Preview */}
            {urlPreview && (
              <a
                href={urlPreview}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block gold-text-hoverable gold-underline gold-link transition-opacity text-sm"
              >
                {urlPreview} →
              </a>
            )}

            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[var(--sidebar-bg)]" />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </span>
  );
}

function WheatIcon({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="16"
      height="20"
      viewBox="0 0 16 20"
      fill="none"
      className="transition-all duration-1000"
      style={{
        animation: isHovered ? 'wiggle 1s ease-in-out' : 'none',
      }}
    >
      {/* Wheat stalk */}
      <line
        x1="8"
        y1="20"
        x2="8"
        y2="2"
        stroke="var(--gold-500)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Wheat grains - left side */}
      <ellipse cx="6" cy="4" rx="2" ry="3" fill="var(--gold-700)" opacity="0.8" />
      <ellipse cx="5.5" cy="7" rx="2" ry="3" fill="var(--gold-700)" opacity="0.8" />
      <ellipse cx="6" cy="10" rx="2" ry="3" fill="var(--gold-700)" opacity="0.8" />

      {/* Wheat grains - right side */}
      <ellipse cx="10" cy="4" rx="2" ry="3" fill="var(--gold-700)" opacity="0.8" />
      <ellipse cx="10.5" cy="7" rx="2" ry="3" fill="var(--gold-700)" opacity="0.8" />
      <ellipse cx="10" cy="10" rx="2" ry="3" fill="var(--gold-700)" opacity="0.8" />

      <style jsx>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          10% { transform: rotate(-3deg); }
          20% { transform: rotate(3deg); }
          30% { transform: rotate(-3deg); }
          40% { transform: rotate(3deg); }
          50% { transform: rotate(-2deg); }
          60% { transform: rotate(2deg); }
          70% { transform: rotate(-1deg); }
          80% { transform: rotate(1deg); }
          90% { transform: rotate(-0.5deg); }
        }
      `}</style>
    </svg>
  );
}
