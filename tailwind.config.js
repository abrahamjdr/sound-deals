/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "light-bg": "#f9fafb",
        "light-card": "#ffffff",
        "light-text": "#1f2937",
        "light-border": "#e5e7eb",
        "dark-bg": "#111827",
        "dark-card": "#1f2937",
        "dark-text": "#f9fafb",
        "dark-border": "#374151",
        primary: "#3b82f6",
      },
    },
  },
  plugins: [],
};
// This configuration file sets up Tailwind CSS for a Next.js project.
