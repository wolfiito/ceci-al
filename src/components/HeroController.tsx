"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import EnvelopeOverlay from "@/components/EnvelopeOverlay";

interface HeroControllerProps {
  names: string;
  date: string;
}

export default function HeroController({ names, date }: HeroControllerProps) {
  // Aquí vive el estado que conecta ambos componentes
  const [startAnimation, setStartAnimation] = useState(false);

  return (
    <>
      {/* 1. El Sobre: Cuando termine de abrirse, activa la señal */}
      <EnvelopeOverlay onOpenComplete={() => setStartAnimation(true)} />

      {/* 2. El Hero: Recibe la señal para iniciar su blurIn */}
      <Hero names={names} date={date} startAnimation={startAnimation} />
    </>
  );
}