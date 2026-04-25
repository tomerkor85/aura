import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'on-background': '#e8e1df',
        'secondary-fixed': '#ffdcc7',
        'tertiary': '#cdc5bd',
        'primary-fixed-dim': '#ffb780',
        'secondary': '#ebbda1',
        'primary': '#ffb780',
        'background': '#151312',
        'outline': '#a08d81',
        'surface-container-lowest': '#100e0d',
        'surface-container-low': '#1d1b1a',
        'surface-variant': '#373433',
        'primary-fixed': '#ffdcc4',
        'on-primary-container': '#fff4ef',
        'on-secondary-container': '#d8ac91',
        'on-surface-variant': '#d7c3b5',
        'surface': '#151312',
        'surface-container-highest': '#373433',
        'surface-container-high': '#2c2928',
        'on-primary': '#4e2600',
        'secondary-container': '#5f402a',
        'surface-container': '#221f1e',
        'outline-variant': '#52443a',
        'on-surface': '#e8e1df',
        'secondary-fixed-dim': '#ebbda1',
        'surface-bright': '#3c3837',
        'primary-container': '#a0622e',
        'surface-dim': '#151312',
        'inverse-surface': '#e8e1df',
        'tertiary-container': '#757069',
        // Legacy tokens
        void:    '#1A1814',
        umber:   '#2C2520',
        walnut:  '#5C3D28',
        amber:   '#A0622E',
        caramel: '#C89060',
        sand:    '#D4B89A',
        linen:   '#F0E8DF',
      },
      fontFamily: {
        headline: ['Newsreader', 'serif'],
        body:     ['Manrope', 'sans-serif'],
        label:    ['Manrope', 'sans-serif'],
        serif:    ['Newsreader', 'serif'],
        sans:     ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
