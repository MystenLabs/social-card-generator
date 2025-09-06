import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@swiss-digital-assets-institute/ui/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '350px',
      xs: '410px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['ABCDiatype', ...fontFamily.sans],
        serif: ['ABCDiatype', ...fontFamily.serif],
        diatype: ['ABCDiatype', 'sans-serif'],
      },
      fontWeight: {
        thin: '100',
        light: '300',
        normal: '400',
        medium: '500',
      },
      animation: {
        marquee: 'marquee linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
