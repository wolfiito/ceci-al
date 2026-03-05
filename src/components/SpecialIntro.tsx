// src/components/SpecialIntro.tsx
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
    const loaderTimer = setTimeout(() => { if (!isReady) setShowLoader(true); }, 2000);
    const fallback = setTimeout(() => { if (!isReady) handleComplete(); }, 15000);

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
    <>
      {/* Loader elegante para conexiones lentas */}
      {showLoader && !isReady && (
        <div className="fixed inset-0 flex items-center justify-center z-[110] bg-black">
          <p className="font-serif text-[#C5A25D]/40 animate-pulse tracking-[0.2em] text-sm uppercase">
            Preparando tu invitación...
          </p>
        </div>
      )}

      {/* Contenedor del Video */}
      <div className={cn(
        "fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000",
        (isReady && !isExiting) ? "opacity-100" : "opacity-0"
      )}>
        <video 
          ref={videoRef}
          src="/video/intro.mp4" 
          autoPlay 
          muted 
          playsInline 
          preload="auto"
          className="w-full h-full object-cover"
          onLoadedMetadata={() => {
            if (videoRef.current) videoRef.current.currentTime = 1;
          }}
          onCanPlay={() => setIsReady(true)}
          onEnded={handleComplete}
          onError={handleComplete}
        />
      </div>
    </>
  );
}