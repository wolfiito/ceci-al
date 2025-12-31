import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import MusicPlayer from "@/components/MusicPlayer";
import Timeline from "@/components/Timeline";
import Location from "@/components/Location";
import DressCode from "@/components/DressCode";
import Gifts from "@/components/Gifts";
import RSVPSection from "@/components/RSVPSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-wedding-light">
      <MusicPlayer />
      
      {/* 1. HERO (Sticky) */}
      <Hero />
      
      {/* 2. CONTENIDO QUE SUBE (Z-Index mayor para tapar) */}
      <div className="relative z-10">
        
        {/* TRUCO: Margen negativo en el wrapper del Countdown */}
        {/* Esto hace que la sección ROSA suba sobre la foto */}
        <div className="-mt-[15vh]">
           <Countdown />
        </div>
        
        {/* El resto de secciones siguen normales con fondo blanco o el que desees */}
        <div className="bg-white">
           <Timeline />
           
           <div className="bg-wedding-light/30 pb-10 rounded-t-[3rem]">
              <DressCode />
              <Gifts />
           </div>
           
           <RSVPSection />
           <Location />
           
           <footer className="text-center py-10 bg-wedding-dark text-wedding-light/60 text-sm">
             <p className="font-serif text-lg mb-2 text-wedding-light">Ceci & Alejandro</p>
             <p>09 . Mayo . 2026</p>
           </footer>
        </div>
      </div>
    </main>
  );
}