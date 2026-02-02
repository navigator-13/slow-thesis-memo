'use client';

import { useState } from 'react';
import Image from 'next/image';
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

  // Smooth fade duration
  const fadeMs = 1250;

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
          <Image
            src="/logo-night.png"
            alt="Logo (night)"
            fill
            sizes={`${sizePx}px`}
            className={`object-contain ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transition: `opacity ${fadeMs}ms ease`,
              mixBlendMode: 'screen',
            }}
            priority
          />
          <Image
            src="/logo-day.png"
            alt="Logo (day)"
            fill
            sizes={`${sizePx}px`}
            className={`object-contain ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
            style={{
              transition: `opacity ${fadeMs}ms ease`,
              mixBlendMode: 'screen',
            }}
            priority
          />
        </div>
      </div>
    </Link>
  );
}
