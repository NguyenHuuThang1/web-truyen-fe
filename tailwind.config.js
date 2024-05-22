/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  mode: 'jit',
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'patrick': ['patrick', 'serif'],
      'playfair': ['playfair', 'serif'],
      'protes': ['protes', 'serif'],
      'roboto': ['roboto', 'serif'],
      'serif': ['ui-serif', 'Georgia', ],
      'mono': ['ui-monospace', 'SFMono-Regular',],
    },
    extend: {
      colors: {
        xam: '#f8f8f8',
        be: 'rgba(245, 244, 242, 1)',
        read: 'rgba(234, 228, 211,1)',
        primary: '#00040f',
        secondary: '#00f6ff',
        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimBlue: 'rgba(9, 151, 124, 0.1)',
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
    fontSize: {
      sm: '0.8rem',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    keyframes: {
      spin: {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      color: {
        '0%': { 'background-position': '0 50%' },
        '50%': { 'background-position': '50% 100%' },
        '100%': { 'background-position': '0 50%' },
      },
      wiggle: {
        '0%': { transform: 'rotate(0deg)' },
        '100%': { transform: 'rotate(180deg)' },
      },
      moveX: {
        '0%': {},
        '100%': { transform: 'translateX(0.6rem)' },
      },
    },
    animation: {
      'color-so-slow': 'color 6s ease-in-out infinite',
      'spin-slow': 'wiggle 60s linear infinite',
      'move-to-right': 'moveX 0.5s forwards',
      'spin-in': 'spin 1s linear infinite',
    },
  },
  plugins: [require('tailwindcss-animate'), require('flowbite/plugin')],
};
