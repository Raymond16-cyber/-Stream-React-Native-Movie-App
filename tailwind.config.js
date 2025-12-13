/** @type {import('tailwindcss').Config} */
// tailwind.config.js or tailwind.config.ts
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", // Example for an 'app' directory
    "./components/**/*.{js,jsx,ts,tsx}", // Example for a 'components' directory
    // Add all other directories containing your components
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#030014",
        secondary: "#151312",
        light:{
          100: "#D6C6FF",
          200: "#A8B5DB",
          300: "#9CA4AB",
        },
        dark:{
          100: "#221f3d",
          200: "#0f0d23",
        },
        accent: "#AB8BFF",
      },
    },
    plugins: [],
  },
};
