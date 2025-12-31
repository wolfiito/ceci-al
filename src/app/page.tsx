import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Countdown from "@/components/Countdown";
import MusicPlayer from "@/components/MusicPlayer";
import Timeline from "@/components/Timeline";
import ParallaxDivider from "@/components/ParallaxDivider";
import Location from "@/components/Location";
import DressCode from "@/components/DressCode";
import Gifts from "@/components/Gifts";
import RSVPSection from "@/components/RSVPSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-wedding-light">
      <MusicPlayer />
      
      {/* 1. HERO (Fondo Sticky) */}
      <div className="sticky top-0 z-0 h-[100svh] w-full">
         <Hero />
      </div>
      
      {/* 2. CAPA SUPERIOR (Intro + Countdown) */}
      <div className="relative z-10 bg-transparent">
        <Introduction />
        <Countdown />
        
        {/* 3. BLOQUE BLANCO (Timeline) */}
        <div className="bg-white relative z-20">
           <Timeline />
        </div>

        {/* 4. PARALLAX "STICKY" (Segunda Foto Fija) */}
        {/* Esto hace que la foto se quede quieta mientras lo demás sube */}
        <div className="sticky top-0 h-screen z-0">
           <ParallaxDivider />
        </div>

        {/* 5. LOCACIÓN Y RESTO (Suben tapando la foto) */}
        <div className="relative z-30 bg-white">
           {/* Location tiene 'rounded-t' y fondo blanco para hacer el efecto de tarjeta subiendo */}
           <Location />
           
           <div className="bg-[#F9F5F0] py-16">
              <DressCode />
              <div className="my-10" />
              <Gifts />
           </div>
           
           <RSVPSection />
           
           <footer className="text-center py-12 bg-black text-white/60 text-sm">
             <p className="font-serif text-2xl mb-2 text-white">Ceci & Alejandro</p>
             <p className="tracking-widest uppercase text-xs">09 . Mayo . 2026</p>
           </footer>
        </div>

      </div>
    </main>
  );
}