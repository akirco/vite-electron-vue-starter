module.exports = {
  content: [
    "./index.html",
    "./src/render/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'selfBorder': "#1e2226",
        'selfBgColor': "#282c34",
        'PdarkBgColor': "#21252B",
        'PlightBgColor':"#F8F9FB"
      }
    },
  },
  plugins: [],
}
