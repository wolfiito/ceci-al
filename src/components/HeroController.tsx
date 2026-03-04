"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import EnvelopeOverlay from "@/components/EnvelopeOverlay";
import SpecialIntro from "@/components/SpecialIntro";
import { GuestData } from "@/types/wedding";

interface HeroControllerProps {
  names: string;
  date: string;
  guestData: GuestData;
}

export default function HeroController({ names, date, guestData }: HeroControllerProps) {
  // 1. Estado para la animación del Hero (final de todo el flujo)
  const [startAnimation, setStartAnimation] = useState(false);
  
  // 2. Lógica de Intro: Solo si el invitado tiene el flag 'hasSpecialIntro'
  const [showIntro, setShowIntro] = useState(!!guestData.hasSpecialIntro);
  
  // 3. Lógica del Sobre: Solo se muestra si NO hay intro, o si la intro ya terminó
  const [showEnvelope, setShowEnvelope] = useState(!guestData.hasSpecialIntro);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowEnvelope(true); // Ahora sí, mostramos el sobre
  };

  return (
    <>
      {/* PASO 1: Intro Especial */}
      {guestData.hasSpecialIntro && showIntro && (
        <SpecialIntro onComplete={handleIntroComplete} />
      )}

      {/* PASO 2: El Sobre (Envelope) */}
      <EnvelopeOverlay 
        showEnvelope={showEnvelope} 
        onOpenComplete={() => setStartAnimation(true)} 
      />

      {/* PASO 3: El Hero (Contenido principal) */}
      <Hero 
        names={names} 
        date={date} 
        startAnimation={startAnimation} 
      />
    </>
  );
}