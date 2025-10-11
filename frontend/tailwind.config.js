// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50: '#f0f9ff', 500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1' },
        success: { 500: '#22c55e', 600: '#16a34a' },
      },
      keyframes: {
        'scroll-gentle': {
          '0%, 16.6%': { 
            transform: 'translateX(0px)',
            opacity: '0.7'
          },
          '8.3%': { 
            transform: 'translateX(4px)',
            opacity: '1'
          },
          '24.9%': { 
            transform: 'translateX(-4px)',
            opacity: '1'
          },
          '33.2%': { 
            transform: 'translateX(0px)',
            opacity: '0.7'
          },
          '100%': { 
            transform: 'translateX(0px)',
            opacity: '0.7'
          }
        }
      },
      animation: {
        'scroll-gentle': 'scroll-gentle 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
