module.exports = {
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        "hero-md": "500px",
        "hero-lg": "620px",
        "hero-xl": "900px",
      },
      colors: {
        one: "#3D4756",
        two: "#4AABFF",
        three: "#F4EEE8",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
