"use client";

import Image from "next/image";

export default function RevealImage() {
  return (
    // CONTENEDOR STICKY
    // Se queda pegado al fondo (bottom-0) esperando ser revelado
    <div className="sticky bottom-0 w-full h-screen -z-10 flex items-end justify-center overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src="/images/hero-2.jpg" // Usamos la otra foto para variar
          alt="Nosotros"
          fill
          className="object-cover"
        />
        {/* Capa oscura para que el DressCode resalte cuando suba */}
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Texto Sutil (Opcional) */}
        <div className="absolute bottom-20 left-0 w-full text-center z-10 px-4">
             <p className="font-serif text-3xl md:text-5xl text-white italic drop-shadow-lg">
                "Juntos es nuestro lugar favorito"
             </p>
        </div>
      </div>
    </div>
  );
}