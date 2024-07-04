/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['yekanbakh'],
      body: ['yekanbakh'],
    },
    colors: {
      'bg-color': '#E9E9E9',
      disabled: '#666666',
    },
    extend: {
      keyframes: {
        skeleton: {
          '0%': { backgroundColor: 'bg-gray-400' },
          '50%': { backgroundColor: 'bg-gray-300' },
          '100%': { backgroundColor: 'bg-gray-400' },
        },
      },
      animation: {
        skeleton: 'skeleton 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
