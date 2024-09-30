import type { Config } from "tailwindcss";

const config: Config = {
  // tailwind.config.js
  darkMode: "media", // or 'media'  //if chooses media then light and dark mode tailwind classes will be applied on the basis of system preferences.
  // other configuration...
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
