import type { Metadata, Viewport } from "next"; 
import { Alex_Brush, Open_Sans } from "next/font/google"; 
import "./globals.css";
import { cn } from "@/lib/utils";
import { WeddingProvider } from "@/context/WeddingContext"; 

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
  // Recuerda configurar tu URL final aquí antes de subir a producción
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL 
    ? `https://${process.env.NEXT_PUBLIC_SITE_URL}` 
    : 'https://invi-al.tazcito.com'
  ),

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
        url: '/images/share.jpg', 
        width: 1200,
        height: 630,
        alt: 'Ceci & Alejandro',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: "Ceci & Alejandro | Nuestra Boda",
    description: "09 . 05 . 2026 - ¡Te esperamos!",
    images: ['/images/share.jpg'],
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
          {children}
        </WeddingProvider>
      </body>
    </html>
  );
}