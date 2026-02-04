"use client";

import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

type Props = {
  theme: 'light' | 'dark';
  onToggle: () => void;
};

type HillKey = 'back' | 'mid' | 'front' | null;

export function SidebarFooterScene({ theme, onToggle }: Props) {
  const [hovered, setHovered] = useState<HillKey>(null);

  const hillFill = (key: Exclude<HillKey, null>) =>
    `var(--hill-${key})`;

  const backPath = 'M-30,118 C55,86 155,80 240,92 C275,96 305,104 350,112 L350,180 L-30,180 Z';
  const midPath = 'M-50,138 C40,108 150,102 230,114 C275,120 305,132 360,144 L360,180 L-50,180 Z';
  const frontPath = 'M-40,154 C70,132 170,132 260,146 C300,152 320,164 370,172 L370,180 L-40,180 Z';

  return (
    <div className="relative h-[180px] w-full">
      {/* Back hill */}
      <svg
        viewBox="0 0 320 180"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full z-0 pointer-events-none"
      >
        <path d={backPath} fill={hillFill('back')} />
      </svg>

      {/* Sun/Moon toggle */}
      <div className="absolute right-[20px] bottom-[90px] z-[60]">
        <ThemeToggle theme={theme} onToggle={onToggle} />
      </div>

      {/* Back hill hover glow (behind windmill) */}
      {hovered === 'back' && (
        <svg
          viewBox="0 0 320 180"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full z-[5] pointer-events-none"
        >
          <path d={backPath} fill="var(--hill-back-hover)" className="hill-glow" mask="url(#mask-back-hover)" />
          <defs>
            <mask id="mask-back-hover">
              <rect width="100%" height="100%" fill="black" />
              <path d={backPath} fill="white" />
              <path d={midPath} fill="black" />
              <path d={frontPath} fill="black" />
            </mask>
          </defs>
        </svg>
      )}

      {/* Windmill silhouette (between back and mid hills) */}
      <div
        className="absolute bottom-[48px] left-[44px] w-[77px] h-[77px] pointer-events-none"
        style={{
          zIndex: 15,
          backgroundColor: 'var(--hill-mid)',
          opacity: hovered === 'mid' ? 0.9 : 1,
          filter: hovered === 'mid' ? 'brightness(var(--windmill-brightness))' : 'none',
          WebkitMaskImage: "url('/windmill%20silhoutte.png')",
          maskImage: "url('/windmill%20silhoutte.png')",
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
      />

      {/* Mid + front hills and hover layers */}
      <svg
        viewBox="0 0 320 180"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full z-20 pointer-events-none"
      >
        <path d={midPath} fill={hillFill('mid')} />
        <path d={frontPath} fill={hillFill('front')} />

        {/* Hover glow (mid/front only in this layer) */}
        {hovered && hovered !== 'back' && (
          <path
            d={hovered === 'mid' ? midPath : frontPath}
            fill={hovered === 'mid' ? 'var(--hill-mid-hover)' : 'var(--hill-front-hover)'}
            className="hill-glow"
            mask={`url(#mask-${hovered})`}
          />
        )}

        <defs>
          <mask id="mask-back">
            <rect width="100%" height="100%" fill="black" />
            <path d={backPath} fill="white" />
            <path d={midPath} fill="black" />
            <path d={frontPath} fill="black" />
          </mask>
          <mask id="mask-mid">
            <rect width="100%" height="100%" fill="black" />
            <path d={midPath} fill="white" />
            <path d={frontPath} fill="black" />
          </mask>
          <mask id="mask-front">
            <rect width="100%" height="100%" fill="black" />
            <path d={frontPath} fill="white" />
          </mask>
        </defs>
      </svg>

      {/* Hover hit areas for visible bands (on top, but behind orbit) */}
      <svg
        viewBox="0 0 320 180"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full z-[40]"
      >
        <path
          d={backPath}
          fill="transparent"
          mask="url(#mask-back)"
          onMouseEnter={() => setHovered('back')}
          onMouseLeave={() => setHovered(null)}
        />
        <path
          d={midPath}
          fill="transparent"
          mask="url(#mask-mid)"
          onMouseEnter={() => setHovered('mid')}
          onMouseLeave={() => setHovered(null)}
        />
        <path
          d={frontPath}
          fill="transparent"
          mask="url(#mask-front)"
          onMouseEnter={() => setHovered('front')}
          onMouseLeave={() => setHovered(null)}
        />
        <defs>
          <mask id="mask-back">
            <rect width="100%" height="100%" fill="black" />
            <path d={backPath} fill="white" />
            <path d={midPath} fill="black" />
            <path d={frontPath} fill="black" />
          </mask>
          <mask id="mask-mid">
            <rect width="100%" height="100%" fill="black" />
            <path d={midPath} fill="white" />
            <path d={frontPath} fill="black" />
          </mask>
          <mask id="mask-front">
            <rect width="100%" height="100%" fill="black" />
            <path d={frontPath} fill="white" />
          </mask>
        </defs>
      </svg>

      
    </div>
  );
}
