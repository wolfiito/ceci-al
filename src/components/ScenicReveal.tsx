"use client";
import Image from "next/image";

export default function ScenicReveal() {
  return (
    // 1. EL HUECO (Spacer): Define la altura del "momento foto"
    // Quitamos z-index negativo aquí para no causar conflictos
    <div className="relative w-full h-[100vh]">
      
      {/* 2. LA IMAGEN FIJA (Sticky/Fixed) */}
      {/* CAMBIO CLAVE: Usamos 'z-0' en lugar de '-z-50'. 
          Esto la pone SOBRE el fondo del body, pero DEBAJO de las secciones con 'z-10' */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <Image
          src="/images/walking.jpg"
          alt="Caminar Juntos"
          fill
          className="object-cover object-center"
          priority // Esto está bien, manténlo.
        />
        {/* Capa de cine */}
        <div className="absolute inset-0 bg-black/20" />
      </div>
    </div>
  );
}