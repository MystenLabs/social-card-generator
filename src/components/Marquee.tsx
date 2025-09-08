import React from 'react';

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ children, speed = 50, direction = 'left', className = '' }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
