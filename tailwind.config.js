module.exports = {
  theme: {
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        "*": { boxSizing: "border-box", maxWidth: "100%" },
        body: { overflowX: "hidden" },
      });
    },
  ],
};
