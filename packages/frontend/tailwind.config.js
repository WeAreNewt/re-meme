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
      'lens-default': '#ABFE2C',
      'neutral-black': '#101112',
      'neutral-600': '#6C757D',
      'purple': '#D2A6FF',
      primary: {
        900: '#6322A5',
        800: '#844DBB',
        bold: '#AB73E3',
        600: '#D2A6FF',
        500: '#E2C6FF',
        DEFAULT: '#EAD7FF',
        light: '#EFDFFF',
        200: '#F3E7FF',
        100: '#FAF4FF'
      },
      alert: {
        'red': {
          DEFAULT: '#D91A1A'
        }
      },
      neutral: {
        black: '#101112',
        white: '#FDFDFD'
      }
    }
  },
  plugins: [],
}
