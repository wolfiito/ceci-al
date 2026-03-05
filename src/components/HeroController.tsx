"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import EnvelopeOverlay from "@/components/EnvelopeOverlay";
import SpecialIntro from "@/components/SpecialIntro";
import GlobalBackground from "@/components/GlobalBackground"; // <--- Movido aquí
import { GuestData } from "@/types/wedding";

interface HeroControllerProps {
  names: string;
  date: string;
  guestData: GuestData;
}

export default function HeroController({ names, date, guestData }: HeroControllerProps) {
  const [startAnimation, setStartAnimation] = useState(false);
  
  // Fase 1: Intro
  const [showIntro, setShowIntro] = useState(!!guestData.hasSpecialIntro);
  // Fase 2: Sobre (Empezamos en false si hay intro)
  const [showEnvelope, setShowEnvelope] = useState(!guestData.hasSpecialIntro);

  const handleIntroComplete = () => {
    // React 18 hará "batching" de estos dos estados para un solo re-render
    setShowIntro(false);
    setShowEnvelope(true);
  };

  return (
    // bg-black aquí es el "seguro de vida" para que nunca veas blanco o fotos antes de tiempo
    <div className={`relative w-full min-h-screen ${showIntro ? "bg-black" : ""}`}>
      
      {/* 1. MIENTRAS HAYA INTRO, NO EXISTE NADA MÁS */}
      {guestData.hasSpecialIntro && showIntro ? (
        <SpecialIntro onComplete={handleIntroComplete} />
      ) : (
        <>
          {/* 2. EL FONDO: Solo nace cuando la intro muere */}
          <GlobalBackground />

          {/* 3. EL SOBRE: Aparece justo después del video */}
          <EnvelopeOverlay 
            showEnvelope={showEnvelope} 
            onOpenComplete={() => setStartAnimation(true)} 
          />

          {/* 4. EL HERO: El contenido de la invitación */}
          <Hero 
            names={names} 
            date={date} 
            startAnimation={startAnimation} 
          />
        </>
      )}
    </div>
  );
}