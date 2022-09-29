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
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace']
      }
    },
    colors: {
      'lens-default': '#ABFE2C',
      'purple': '#D2A6FF',
      'lime': '#ABFE2C',
      'lime-transparent': '#ABFE2CE6',
      'blue': '#002F66',
      'light-green' :'#A6E5B4',
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
      orange: {
        200: "#FFE3B0",
        DEFAULT: "#FEC32C",
        800: "#664200"
      },
      alert: {
        'red': {
          DEFAULT: '#D91A1A'
        },
        'green': {
          DEFAULT: '#23C146',
          30: '#BCEBC6'
        }
      },
      'neutral-black': '#101112',
      'neutral-white': '#FDFDFD',
      "neutral-200": "#E9ECEF",
      "neutral-400": "#CED4DA",
      "neutral-600": "#6C757D"
    }
  },
  plugins: [],
}
