import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Countdown from "@/components/Countdown";
import MusicPlayer from "@/components/MusicPlayer";
import Timeline from "@/components/Timeline";
import GalleryMarquee from "@/components/GalleryMarquee";
import Location from "@/components/Location";
import DressCode from "@/components/DressCode";
import Gifts from "@/components/Gifts";
import RSVPSection from "@/components/RSVPSection";
import FormalInvitation from "@/components/FormalInvitation";
import ParallaxDivider from "@/components/ParallaxDivider"
import ScenicReveal from "@/components/ScenicReveal";
export default function Home() {
  return (
       <main className="min-h-screen relative bg-wedding-light/0"> {/* bg transparente aquí */}
      <MusicPlayer />
      
      {/* --- CAPA 1 (Fondo Absoluto): HERO ---
          z-index: 0. Siempre está al fondo. 
      */}
      <div className="fixed top-0 left-0 w-full h-[100svh] z-0 pointer-events-none">
         <Hero />
      </div>
      <ScenicReveal />
      <div className="relative z-20">
        
        {/* Espaciador 1: Permite ver el Hero al inicio */}
        <div className="h-[100svh] w-full bg-transparent" />

        {/* BLOQUE SÓLIDO 1: Introducción
            Este bloque TIENE fondo (bg-wedding-light). 
            Al subir, tapa el Hero y, si ya se activó, tapa el ScenicReveal.
        */}
        <div className="bg-wedding-light shadow-[0_-10px_30px_rgba(0,0,0,0.1)] relative">
            <Introduction />
            <Countdown />
            <FormalInvitation />
            {/* NOTA: Hemos quitado <ScenicReveal /> de aquí dentro */}
            <div className="pb-20 bg-wedding-light"></div> {/* Margen inferior extra */}
        </div>

        {/* --- LA VENTANA MÁGICA --- 
            Este es un espaciador TRANSPARENTE.
            Cuando el bloque de arriba termine de pasar, este hueco dejará ver
            la capa z-10 (ScenicReveal) que ya estará activada en el fondo.
            Ajusta el h-[85vh] según cuánto tiempo quieres ver la foto.
        */}
        <div className="h-[85vh] w-full bg-transparent pointer-events-none relative" />


        {/* BLOQUE SÓLIDO 2: El resto del contenido
            Este bloque vuelve a tener fondo y tapa la "ventana mágica".
        */}
        <div className="relative bg-white shadow-[0_-25px_60px_rgba(0,0,0,0.2)]">
           {/* Pequeño handle visual */}

           <Timeline />
           <ParallaxDivider />
           <GalleryMarquee />
           <Location />
           
           <div className="bg-[#F9F5F0] py-16  shadow-inner relative z-10">
              
              <DressCode />
              <div className="my-10" />
              <Gifts />
           </div>
           
           <RSVPSection />
           
           <footer className="text-center py-12 bg-black text-white/60 text-sm">
             <p className="font-serif text-2xl mb-2 text-white">Ceci & Alejandro</p>
           </footer>
        </div>

      </div>
    </main>
  );
}