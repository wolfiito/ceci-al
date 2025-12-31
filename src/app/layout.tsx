import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

const lato = Lato({ 
  weight: ["300", "400", "700"], 
  subsets: ["latin"], 
  variable: "--font-sans" 
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
        "min-h-screen bg-wedding-light font-sans antialiased text-wedding-dark selection:bg-wedding-secondary selection:text-white",
        playfair.variable,
        lato.variable
      )}>
        {children}
      </body>
    </html>
  );
}