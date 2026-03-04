"use client";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export default function SpecialIntro({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Si en 2 segundos no ha cargado, mostramos un indicador sutil
    const loaderTimer = setTimeout(() => {
      if (!isReady) setShowLoader(true);
    }, 2000);

    // Aumentamos el margen de espera a 15 segundos para redes muy lentas
    const fallback = setTimeout(() => {
      if (!isReady) {
        console.warn("Red lenta detectada - saltando al sobre");
        handleComplete();
      }
    }, 15000);

    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(fallback);
      document.body.style.overflow = "unset";
    };
  }, [isReady]);

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(onComplete, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Indicador de carga elegante (solo se ve en internet lento) */}
      {showLoader && !isReady && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <p className="font-serif text-wedding-gold/40 animate-pulse tracking-[0.2em] text-sm uppercase">
            Preparando tu invitación...
          </p>
        </div>
      )}

      <video 
        ref={videoRef}
        src="/video/intro.mp4" 
        autoPlay 
        muted 
        playsInline 
        preload="auto"
        // className con fade-in suave cuando esté listo
        className={cn(
          "w-full h-full object-cover transition-opacity duration-1000",
          (isReady && !isExiting) ? "opacity-100" : "opacity-0"
        )}
        onLoadedMetadata={() => {
          if (videoRef.current) videoRef.current.currentTime = 1;
        }}
        // onCanPlay es más rápido que onCanPlayThrough en 4G lento
        onCanPlay={() => setIsReady(true)}
        onEnded={handleComplete}
        onError={handleComplete}
      />
    </div>
  );
}