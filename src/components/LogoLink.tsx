'use client';

import { useState } from 'react';
import Link from 'next/link';

type Props = {
  theme: 'light' | 'dark';
  sizePx?: number;
};

export function LogoLink({
  theme,
  sizePx = 72,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href="/" aria-label="Home">
      <div
        className="transition-transform duration-500 ease-out"
        style={{ transform: isHovered ? 'translateY(-4px) rotate(2deg)' : 'translateY(0) rotate(0deg)' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="relative"
          style={{ width: sizePx, height: sizePx }}
        >
          <span
            className={`absolute inset-0 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transition: 'opacity 1250ms ease',
              backgroundColor: '#E2C79A',
              WebkitMaskImage: "url('/logo-day.png')",
              maskImage: "url('/logo-day.png')",
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
            aria-hidden="true"
          />
          <span
            className={`absolute inset-0 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transition: 'opacity 1250ms ease',
              backgroundColor: '#E2C79A',
              WebkitMaskImage: "url('/logo-night.png')",
              maskImage: "url('/logo-night.png')",
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
