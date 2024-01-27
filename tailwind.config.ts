import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      transitionProperty: {
        colors:
          "color, background-color, border-color, text-decoration-color, fill, stroke, outline-color",
      },

      animation: {
        "overlay-show": "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "overlay-hide": "overlayHide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "content-show": "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "content-hide": "contentHide 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },

      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },

        overlayHide: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },

        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },

        contentHide: {
          from: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
          to: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
