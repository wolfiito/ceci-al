"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";

export default function ScenicReveal() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Función para detectar el momento exacto del "Cambio Secreto"
    const handleScrollChange = (latestScroll: number) => {
      // Obtenemos la altura de la pantalla
      const viewportHeight = window.innerHeight;

      // LÓGICA MAESTRA:
      // El Hero ocupa 100vh (una pantalla completa).
      // El bloque sólido de "Invitaciones" empieza justo después.
      // Cuando scrollY >= viewportHeight, significa que el Hero ha subido por completo
      // y la pantalla está llena de color sólido (Introducción/Countdown).
      // ESE es el momento perfecto para cambiar el fondo sin que se note.
      
      const triggerPoint = viewportHeight * 0.95; // Usamos 95% por seguridad

      if (latestScroll > triggerPoint && !isVisible) {
        setIsVisible(true);
      } else if (latestScroll < triggerPoint && isVisible) {
        setIsVisible(false);
      }
    };

    const unsubscribe = scrollY.on("change", handleScrollChange);
    return () => unsubscribe();
  }, [scrollY, isVisible]);


  return (
    // z-10: Se coloca ENCIMA del Hero (z-0) pero DEBAJO del contenido (z-20)
    <motion.div 
      className="fixed top-0 left-0 w-full h-full z-10 overflow-hidden pointer-events-none"
      // En lugar de opacidad 0 a 1, usamos un fade muy suave
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }} // Transición rápida pero suave
    >
        <motion.div 
           className="relative w-full h-full"
           // Opcional: Un zoom muy lento constante para darle vida cuando se revele
           animate={{ scale: isVisible ? 1 : 1.05 }}
           transition={{ duration: 5, ease: "linear" }}
        >
            <Image
                src="/images/walking-1.jpg"
                alt="Caminar Juntos"
                fill
                className="object-cover object-center"
                priority
            />
            
            {/* Capas de cine */}
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-black/50 to-transparent" />
            
            {/* Texto que aparecerá cuando se abra la ventana */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
                 <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="font-serif text-4xl md:text-6xl text-white italic drop-shadow-lg text-center leading-tight"
                 >
                    Un nuevo capítulo comienza
                 </motion.p>
            </div>
        </motion.div>
    </motion.div>
  );
}