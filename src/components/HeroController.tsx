"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import EnvelopeOverlay from "@/components/EnvelopeOverlay";

interface HeroControllerProps {
  names: string;
  date: string;
}

export default function HeroController({ names, date }: HeroControllerProps) {
  const [startAnimation, setStartAnimation] = useState(false);

  return (
    <>
      <EnvelopeOverlay onOpenComplete={() => setStartAnimation(true)} />

      <Hero names={names} date={date} startAnimation={startAnimation} />
    </>
  );
}