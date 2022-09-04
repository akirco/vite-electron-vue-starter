module.exports = {
  content: ["./index.html", "./src/render/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        selfBorder: "#1e2226",
        selfBgColor: "#282c34",
        PdarkBgColor: "#21252B",
        PlightBgColor: "#f8f8f8",
        lightBgColor: "#f5f5f5",
        lightChildNavBg: "#f2f1f6",
      },
    },
  },
  plugins: [require("daisyui")],
};
