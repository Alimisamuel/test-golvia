/** @type {import('tailwindcss').Config} */
const { colorMap } = require("./src/utils/colors");
const { getSpacingSafeList } = require("./src/utils/spaces");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D69D8",
        secondary: "#DA9500",
        tertiary: "#DDEBFD",
        quaternary: "#F3F6FC",
        quinary: "#B0B9CB",
        senary: "#333F4F",
        septenary: "#7F7F7F",
        octenary: "#959393",
        nonenary: "#3EC28B",

        // Color pallete
        gv: colorMap,
      },
      spacing: {
        "gv-4": "4px",
        "gv-8": "8px",
        "gv-16": "16px",
        "gv-20": "20px",
        "gv-32": "32px",
        "gv-56": "56px",
        "gv-80": "80px",
      },
      // Sync with mui breakpoints
      screens: {
        xs: "0px",    // Extra small devices (phones)
        sm: "600px",  // Small devices (tablets)
        md: "900px",  // Medium devices (small laptops)
        lg: "1200px", // Large devices (desktops)
        xl: "1536px", // Extra large devices (large screens)
      },
    },
  },
  safelist: [
    // Explicitly safelist dynamic classes to ensure they aren’t purged
    ...getSpacingSafeList(),
  ],
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          'scrollbar-width': 'none', /* Firefox */
          '-ms-overflow-style': 'none', /* Internet Explorer */
          '&::-webkit-scrollbar': {
            display: 'none', /* WebKit browsers */
          },
        },
      });
    },
  ],
};
