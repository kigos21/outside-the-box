import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'otb-yellow': '#FFDE59',
        'otb-blue': '#64bbfe',
        'cs-black': '#120901',
        'cs-green': '#647d4a',
        'cs-yellow': '#fdb91a',
        'cs-orange': '#e79953',
        'cs-cream': '#e9e4da',
      },
      fontFamily: {
        sans: ['Montserrat'],
      },
    },
  },
  plugins: [],
};

export default config;
