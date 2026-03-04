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
  const [startAnimation, setStartAnimation] = useState(false);
  
  // Estado inicial: Si tiene intro, showIntro es true y showEnvelope es false
  const [showIntro, setShowIntro] = useState(!!guestData.hasSpecialIntro);
  const [showEnvelope, setShowEnvelope] = useState(!guestData.hasSpecialIntro);

  const handleIntroComplete = () => {
    setShowIntro(false);
    // Pequeño delay de 100ms para asegurar que el componente Intro se desmonte antes
    setTimeout(() => {
      setShowEnvelope(true);
    }, 100);
  };

  return (
    <div className="relative w-full min-h-screen bg-black">
      
      {/* 1. La Intro tiene prioridad absoluta */}
      {guestData.hasSpecialIntro && showIntro && (
        <SpecialIntro onComplete={handleIntroComplete} />
      )}

      {/* 2. El Sobre SOLO nace cuando la intro termina */}
      {showEnvelope && (
        <EnvelopeOverlay 
          showEnvelope={showEnvelope} 
          onOpenComplete={() => setStartAnimation(true)} 
        />
      )}

      {/* 3. El Hero siempre está debajo */}
      <Hero 
        names={names} 
        date={date} 
        startAnimation={startAnimation} 
      />
    </div>
  );
}