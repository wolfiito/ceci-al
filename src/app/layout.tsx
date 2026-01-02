import type { Metadata } from "next";
// Importamos Alex Brush y Open Sans con los pesos necesarios
import { Alex_Brush, Open_Sans } from "next/font/google"; 
import "./globals.css";
import { cn } from "@/lib/utils";

// Alex Brush generalmente solo tiene peso 400, pero el navegador puede simular negrita
const alexBrush = Alex_Brush({ 
  weight: ["400"], 
  subsets: ["latin"], 
  variable: "--font-serif", 
});

// Para Open Sans traemos 400 (normal), 600 (semi-gordo) y 800 (extra-gordo)
const openSans = Open_Sans({ 
  weight: ["400", "600", "800"], 
  subsets: ["latin"], 
  variable: "--font-sans", 
});

export const metadata: Metadata = {
  title: "Boda Ceci & Alejandro",
  description: "Invitación digital interactiva",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(
        "min-h-screen bg-wedding-light font-sans antialiased text-wedding-dark selection:bg-wedding-secondary selection:text-white overflow-x-hidden",
        alexBrush.variable,
        openSans.variable
      )}>
        {children}
      </body>
    </html>
  );
}