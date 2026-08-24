/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
        },
        text: {
          main: 'var(--color-text-main)',
          body: 'var(--color-text-body)',
          muted: 'var(--color-text-muted)',
        },
        success: 'var(--color-success)',
        badge: {
          green: 'var(--color-badge-green-bg)',
          blue: 'var(--color-badge-blue-bg)',
        },
        surface: 'var(--color-surface)',
        'bg-subtle': 'var(--color-bg-subtle)',
        border: 'var(--color-border)',
      },
    },
  },
  plugins: [],
};
