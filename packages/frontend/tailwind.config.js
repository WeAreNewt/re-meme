module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'n': '1px',
      'sm': '640px',
      'md': '768px',
      'custom-md': '850px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      borderWidth: {
        '3': '3px',
      }
    },
    colors: {
      'alert-red': '#D91A1A',
      'lens-default': '#ABFE2C',
      'neutral-black': '#101112',
      'neutral-600': '#6C757D'
    }
  },
  plugins: [],
}
