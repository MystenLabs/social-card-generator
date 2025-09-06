'use client';

import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  name: string;
  username: string;
  avatarUrl?: string | null;
  template?: 'bg1' | 'bg2' | 'bg3';
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  textSize?: string;
  imageSize?: string;
  // Optional overrides appended at the end to take precedence
  textClassName?: string;
  imageClassName?: string;
  responsive?: boolean;
}

const TEMPLATE_BG: Record<NonNullable<CardProps['template']>, string> = {
  bg1: '/teamplate/card/bg_1.webp',
  bg2: '/teamplate/card/bg_2.webp',
  bg3: '/teamplate/card/bg3.png',
};

export const CardPreview = ({
  // name,
  username,
  avatarUrl,
  className,
  template = 'bg1',
  imageClassName,
  responsive = true,
}: CardProps) => {
  const bg = TEMPLATE_BG[template];

  // Check if user is logged in and has avatar
  const displayAvatar = avatarUrl;

  return (
    <div className={cn('relative flex h-full w-full flex-col overflow-hidden text-white', className)}>
      <img src={bg} alt="Background" className="absolute inset-0 z-0 h-full w-full object-cover" />
      <div className="relative z-10 flex flex-1 items-center justify-center">
        <div className="border border-white/25">
          <div
            className={cn(
              'relative flex items-center justify-center overflow-hidden',
              responsive
                ? 'h-[120px] w-[120px] md:h-[200px] md:w-[200px] lg:h-[250px] lg:w-[250px]'
                : 'h-[250px] w-[250px]',
              imageClassName
            )}
          >
            <img
              src={displayAvatar ? avatarUrl : 'https://placehold.co/400x400'}
              alt={displayAvatar ? 'Profile' : 'Sui Logo'}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className={cn(
              'bg-gradient-to-r from-[#8c6037] via-[#853d51] to-[#09120f]',
              responsive ? 'p-1 text-[10px] md:text-base lg:px-2 lg:py-1 lg:text-lg' : 'px-2 py-1 text-lg'
            )}
          >
            @{username}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Card = CardPreview;
