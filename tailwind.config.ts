import { type Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        pop: "pop  0.25s ease-out",
      },
      keyframes: {
        pop: {
          "0%": {
            transform: "scale( 0.95)",
          },
          "40%": {
            transform: "scale(1.02)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }: PluginAPI) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
  darkMode: "class",
} satisfies Config;
