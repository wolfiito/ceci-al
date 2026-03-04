"use client";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export default function SpecialIntro({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Fail-safe: Si en 8s no carga, continuamos para no bloquear al invitado
    const fallback = setTimeout(() => {
      if (!isReady) handleComplete();
    }, 8000);

    return () => {
      clearTimeout(fallback);
      document.body.style.overflow = "unset";
    };
  }, [isReady]);

  const handleComplete = () => {
    setIsExiting(true);
    // Tiempo para el fade-out final
    setTimeout(onComplete, 800);
  };

  return (
    <div className={cn(
      "fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out",
      // El contenedor solo se vuelve opaco cuando el video está listo Y no estamos saliendo
      (isReady && !isExiting) ? "opacity-100" : "opacity-0"
    )}>
      <video 
        ref={videoRef}
        src="/video/intro.mp4" 
        autoPlay 
        muted 
        playsInline 
        preload="auto"
        onLoadedMetadata={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 1;
          }
        }}
        onCanPlayThrough={() => {
          // Solo cuando el video está listo para fluir, activamos el fade-in
          setIsReady(true);
        }}
        onError={() => handleComplete()}
        onEnded={handleComplete}
        className="w-full h-full object-cover"
      />
    </div>
  );
}