/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xs': ['0.625rem', { lineHeight: '1rem' }],
        'sm': ['0.75rem', { lineHeight: '1.25rem' }],
        'base': ['0.875rem', { lineHeight: '1.5rem' }],
        'lg': ['1rem', { lineHeight: '1.75rem' }],
        'xl': ['1.125rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.375rem', { lineHeight: '2rem' }],
        '3xl': ['1.75rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.125rem', { lineHeight: '2.5rem' }],
        '5xl': ['2.875rem', { lineHeight: '1' }],
        '6xl': ['3.625rem', { lineHeight: '1' }],
        '7xl': ['4.375rem', { lineHeight: '1' }],
        '8xl': ['5.875rem', { lineHeight: '1' }],
        '9xl': ['7.875rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
