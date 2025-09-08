import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  children,
  icon,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
}) => {
  const baseClasses =
    'flex items-center justify-center gap-2.5 rounded-full border-0 outline-none transition-all duration-200 ease-in-out hover:scale-105 font-medium';

  const variantClasses = {
    primary: 'bg-white text-black hover:bg-gray-100',
    secondary: 'bg-black text-white hover:bg-gray-800',
  };

  const sizeClasses = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-2 px-6 text-lg md:px-8 md:py-4',
    lg: 'py-3 px-10 text-xl',
  };

  const widthClasses = fullWidth ? 'w-full' : 'md:w-auto';

  const disabledClasses = disabled || loading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer';

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${disabledClasses} ${className}`}
    >
      {loading ? (
        <>
          <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              className="opacity-75"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {children}
          {icon && icon}
        </>
      )}
    </button>
  );
};

export default Button;
