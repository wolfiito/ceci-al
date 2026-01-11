import type { Metadata, Viewport } from "next"; 
import { Alex_Brush, Open_Sans } from "next/font/google"; 
import "./globals.css";
import { cn } from "@/lib/utils";
import { WeddingProvider } from "@/context/WeddingContext"; 
import MusicPlayer from "@/components/MusicPlayer"; //

const alexBrush = Alex_Brush({ 
  weight: ["400"], 
  subsets: ["latin"], 
  variable: "--font-serif", 
  display: "swap", 
});

const openSans = Open_Sans({ 
  weight: ["300", "400", "600", "800"], 
  subsets: ["latin"], 
  variable: "--font-sans", 
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#F9F5F0", 
};

export const metadata: Metadata = {
  metadataBase: new URL('https://invi-al.tazcito.com'),

  title: {
    default: "Ceci & Alejandro | Nuestra Boda",
    template: "%s | Boda C&A"
  },
  description: "Nos casamos y queremos que seas parte de este nuevo capítulo. 09 de Mayo, 2026.",
  
  openGraph: {
    title: "Ceci & Alejandro | ¡Nos Casamos!",
    description: "Acompáñanos a celebrar nuestra unión. Toca para ver la invitación y confirmar tu asistencia.",
    url: '/',
    siteName: 'Boda Ceci & Alejandro',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/images/share-v2.jpg', 
        width: 1200,
        height: 630,
        alt: 'Ceci & Alejandro',
        type: 'image/jpeg',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={cn(
        "min-h-screen bg-wedding-light font-sans antialiased text-wedding-dark selection:bg-wedding-secondary selection:text-white overflow-x-hidden",
        alexBrush.variable,
        openSans.variable
      )}>
        <WeddingProvider>
          {/* AQUÍ ESTÁ LA CORRECCIÓN: */}
          <MusicPlayer /> 
          
          {children}
        </WeddingProvider>
      </body>
    </html>
  );
}