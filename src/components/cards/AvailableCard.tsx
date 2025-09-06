'use client';

interface AvailableCardProps {
  date?: string;
  destination?: string;
  variant?: 'light' | 'dark';
  className?: string;
}

export const AvailableCard = ({
  date = 'October 2nd, 2025',
  destination = 'Singapore',
  variant = 'light',
  className = '',
}: AvailableCardProps) => {
  const isLight = variant === 'light';

  return (
    <div
      className={`relative flex w-full max-w-[453px] flex-col overflow-hidden rounded-r-[16px] lg:rounded-r-[64px] ${
        isLight ? 'bg-gray-100' : 'bg-gray-900'
      } ${className}`}
    >
      {/* Header section */}
      <div className="px-4 pb-2 pt-3 sm:px-6 sm:pb-3 sm:pt-4 lg:px-8 lg:pb-4 lg:pt-6">
        <div className="flex items-start justify-between pt-2 sm:pt-3 lg:pt-5">
          <div>
            <p
              className={`lg:text-md mb-1 text-[8px] font-medium sm:text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Date
            </p>
          </div>

          <div className="text-right">
            <p className={`mb-1 text-[8px] font-medium sm:text-sm ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              Destination
            </p>
          </div>
        </div>
        {/* Divider line */}
        <div className={`mt-2 h-px w-full sm:mt-3 lg:mt-4 ${isLight ? 'bg-gray-300' : 'bg-gray-600'}`}></div>
        <div className="flex justify-between pt-2 sm:pt-3 lg:pt-4">
          <div className={`text-[8px] font-bold leading-tight lg:text-2xl ${isLight ? 'text-black' : 'text-white'}`}>
            {date}
          </div>

          <div className={`text-[8px] font-bold leading-tight lg:text-2xl ${isLight ? 'text-black' : 'text-white'}`}>
            {destination}
          </div>
        </div>
      </div>

      {/* Spacer to push SuiFest to bottom */}
      <div className="flex-grow"></div>

      {/* SuiFest logo at bottom */}
      <div className="px-4 lg:px-8 lg:pb-4">
        <div className={isLight ? 'text-black' : 'text-white'}>
          <span className="flex justify-center text-4xl font-black tracking-tight lg:text-8xl">SuiFest</span>
        </div>
      </div>
    </div>
  );
};

export default AvailableCard;
