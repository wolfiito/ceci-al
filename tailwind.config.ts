import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta personalizada "Bosque Romántico"
        wedding: {
          primary: "#7A8B77", // Verde Palo (Sage Green) - Elegante y natural
          secondary: "#D4B9B9", // Rosa Palo (Dusty Rose) - Romántico
          accent: "#F5E6E8", // Un tono crema/rosado muy suave para fondos
          dark: "#2C3E2E", // Verde bosque profundo para textos
          light: "#F9F9F9", // Off-white para limpieza visual
        },
        keyframes: {
            shimmer: {
                '0%': { backgroundPosition: '200% center' },
                '100%': { backgroundPosition: '-200% center' },
            },
        },
        animation: {
            'shimmer': 'shimmer 8s linear infinite',
            'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
      },
      fontFamily: {
        // Configuraremos esto en el siguiente paso con Google Fonts
        serif: ["var(--font-serif)"], // Para títulos (Nombres)
        sans: ["var(--font-sans)"],   // Para textos generales
      },
      backgroundImage: {
        'hero-pattern': "url('/noise.png')", // Opcional: Textura sutil
      },
    },
  },
  plugins: [],
};
export default config;