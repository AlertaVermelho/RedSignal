/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#166534", // Verde escuro
        alert: "#DC2626", // Vermelho alerta
        warning: "#FACC15", // Amarelo aviso
        info: "#1D4ED8", // Azul informativo
        base: "#FFFFFF", // Fundo principal
        text: "#1F2937", // Texto principal
        subtitle: "#6B7280", // Texto secundário
        surface: "#F3F4F6", // Fundo alternativo
        dark: "#111827", // Dark mode
      },
    },
  },
  plugins: [],
};
