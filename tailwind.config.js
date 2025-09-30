module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/styles/**/*.{css}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6f5ff',
          100: '#efeefe',
          500: '#4b3f8f', // morado principal
          600: '#3f3576',
        }
      }
    },
  },
  plugins: [],
}
