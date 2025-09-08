import React from 'react';
import { cn } from '@/utils/cn';

import CardText from './card-text';

interface AvailableCardProps {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  responsive?: boolean;
}

const AvailableCard = ({ className, responsive = true }: AvailableCardProps) => {
  return (
    <div
      className={cn(
        'flex h-full max-h-[940px] w-full max-w-[600px] flex-col justify-between border border-gray-200 bg-white text-black shadow-md',
        responsive ? 'p-2 md:p-4 lg:p-4' : 'p-4',
        className
      )}
    >
      {/* Top Section */}
      <div className={cn('pt-2', responsive ? 'mb-8 lg:mb-0' : 'mb-0')}>
        <CardText className={cn('h-fit max-w-full', responsive ? 'md:w-[240px]' : '')} />
      </div>
      {/* Bottom Section */}
      <div>
        <div
          className={cn('mb-4 font-black tracking-tight', responsive ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-6xl')}
        >
          <img src="suifestlogo.png" alt="" className="text-black" />
        </div>
        <div
          className={cn(
            'flex justify-between font-medium',
            responsive ? 'text-sm md:text-2xl lg:text-2xl' : 'text-2xl'
          )}
        >
          <span>Oct.2nd</span>
          <span>Singapore</span>
        </div>
      </div>
    </div>
  );
};

export default AvailableCard;
