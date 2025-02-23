import plugin from "tailwindcss/plugin";
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  extend: {
    scale: {
      105: "1.05",
      98: "0.98",
    },
    fontSize: {
      h1: "3.25rem", // text-5xl (~52px)
      h2: "2.5rem", // text-4xl (~40px)
      h3: "2rem", // text-3xl (~32px)
      h4: "1.5rem", // text-2xl (~24px)
      h5: "1.25rem", // text-xl (~20px)
      h6: "1rem", // text-base (~16px)
      p: "0.875rem", // text-sm  (~14px)
      span: "0.875rem", // text-sm (~14px)
      small: "0.75rem", // text-xs (~12px)
    },
    fontWeight: {
      h1: "100", // font-thin
      h2: "100", // font-thin
      h3: "100", // font-normal
      h4: "100", // font-normal
      h5: "100", // font-normal
      h6: "100", // font-normal
    },
    lineHeight: {
      p: "1.625", // leading-relaxed
    },
    textColor: {
      small: "#6B7280", // text-gray-500
    },
    height: {
      "10r": "10rem",
      "11r": "11rem",
      "12r": "12rem",
      "13r": "13rem",
      "14r": "14rem",
      "15r": "15rem",
      "16r": "16rem",
      "17r": "17rem",
      "18r": "18rem",
      "19r": "19rem",
      "20r": "20rem",
      "21r": "21rem",
      "22r": "22rem",
      "23r": "23rem",
      "24r": "24rem",
      "25r": "25rem",
      "30r": "30rem",
      "31r": "31rem",
      "32r": "32rem",
      "33r": "33rem",
      "34r": "34rem",
      "35r": "35rem",
    },
  },
  animation: {
    fadeIn: "fadeIn 1s ease-in-out", // Custom animation
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwindcss-animated"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: "blue",
          secondary: "teal",
        },
      },
    ],
    darkMode: ["selector", '[data-theme="night"]'],
  },
};
