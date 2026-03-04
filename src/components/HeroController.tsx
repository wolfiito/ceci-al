// src/components/HeroController.tsx
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
  const [showIntro, setShowIntro] = useState(!!guestData.hasSpecialIntro);
  const [showEnvelope, setShowEnvelope] = useState(!guestData.hasSpecialIntro);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setTimeout(() => {
      setShowEnvelope(true);
    }, 50);
  };

  return (
    // CAMBIO: Quitamos bg-black de aquí para que se vea la GlobalBackground
    <div className="relative w-full">
      
      {/* 1. Intro (Él sí tiene su propio fondo negro z-100) */}
      {guestData.hasSpecialIntro && showIntro && (
        <SpecialIntro onComplete={handleIntroComplete} />
      )}

      {/* 2. El Sobre */}
      {showEnvelope && (
        <EnvelopeOverlay 
          showEnvelope={showEnvelope} 
          onOpenComplete={() => setStartAnimation(true)} 
        />
      )}

      {/* 3. El Hero (Ahora será visible porque el padre es transparente) */}
      <Hero 
        names={names} 
        date={date} 
        startAnimation={startAnimation} 
      />
    </div>
  );
}