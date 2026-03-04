"use client";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export default function SpecialIntro({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Aumentamos a 8 segundos para dar tiempo en conexiones móviles
    const fallback = setTimeout(() => {
      if (!isReady) {
        console.warn("Video timeout - Forzando continuación");
        handleComplete();
      }
    }, 8000);

    return () => {
      clearTimeout(fallback);
      document.body.style.overflow = "unset";
    };
  }, [isReady]);

  const handleComplete = () => {
    setIsExiting(true);
    setTimeout(onComplete, 600);
  };

  return (
    <div className={cn(
      "fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-700",
      (isExiting || !isReady) ? "opacity-0" : "opacity-100"
    )}>
      <video 
        ref={videoRef}
        src="/video/intro.mp4" 
        autoPlay 
        muted 
        playsInline 
        preload="auto"
        // 1. Cargamos metadatos (duración, dimensiones)
        onLoadedMetadata={() => {
          console.log("Metadatos cargados, saltando al segundo 1");
          if (videoRef.current) {
            videoRef.current.currentTime = 1;
          }
        }}
        // 2. El video ya puede reproducirse sin interrupciones
        onCanPlayThrough={() => {
          console.log("Video listo para reproducir");
          setIsReady(true);
        }}
        onError={(e) => {
          console.error("Error fatal cargando video. Revisa la ruta /video/intro.mp4");
          handleComplete();
        }}
        onEnded={handleComplete}
        className="w-full h-full object-cover"
      />
    </div>
  );
}