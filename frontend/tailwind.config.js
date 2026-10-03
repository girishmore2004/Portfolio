/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Warm terracotta scale (replaces the old indigo "primary")
        primary: {
          50: '#fcf5f1',
          100: '#f8e8e0',
          200: '#f1d0c1',
          300: '#e6ae96',
          400: '#d98b6a',
          500: '#cf7753',
          600: '#c96c4a',
          700: '#a9553a',
          800: '#8a4733',
          900: '#723c2e',
          950: '#3d1d16',
        },
        // Golden highlight
        accent: {
          50: '#fdf8ec',
          100: '#faeecb',
          200: '#f5dc97',
          300: '#ecc563',
          400: '#e2b04d',
          500: '#d9a441',
          600: '#b9832f',
          700: '#946427',
          800: '#7a5126',
          900: '#654424',
        },
        // Sage / olive support colour
        olive: {
          400: '#9ca88a',
          500: '#7c8a58',
          600: '#667247',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'blink': 'blink 1s steps(1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
