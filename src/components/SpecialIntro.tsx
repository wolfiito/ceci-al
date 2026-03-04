"use client";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function SpecialIntro({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Bloqueamos el scroll mientras el video carga/reproduce
    document.body.style.overflow = "hidden";
    
    // Timer de seguridad por si el evento onEnded falla (13.5 seg)
    const timer = setTimeout(() => handleComplete(), 13500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleComplete = () => {
    setIsExiting(true);
    // Pequeño delay para el fade out antes de avisar al padre
    setTimeout(onComplete, 500);
  };

  return (
    <div className={cn(
      "fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-500",
      isExiting ? "opacity-0" : "opacity-100"
    )}>
      <video 
        src="/video/intro.mp4" // O "/images/intro.gif"
        autoPlay 
        muted 
        playsInline 
        onEnded={handleComplete}
        className="w-full h-full object-cover"
      />
    </div>
  );
}