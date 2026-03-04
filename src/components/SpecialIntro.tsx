// src/components/SpecialIntro.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export default function SpecialIntro({ onComplete }: { onComplete: () => void }) {
  const [isExiting, setIsExiting] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // FAIL-SAFE: Si en 4 segundos no ha cargado nada, saltamos para no bloquear al usuario
    const fallback = setTimeout(() => {
      if (!isReady) {
        console.warn("Video timed out, skipping intro...");
        handleComplete();
      }
    }, 4000);

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
        // Usamos onCanPlay que es más fiable que onLoadedData en redes lentas
        onCanPlay={() => {
          if (videoRef.current) {
            videoRef.current.currentTime = 1;
            setIsReady(true);
          }
        }}
        // Si hay error en la ruta, saltamos al sobre de inmediato
        onError={(e) => {
          console.error("Error loading video:", e);
          handleComplete();
        }}
        onEnded={handleComplete}
        className="w-full h-full object-cover"
      />
    </div>
  );
}