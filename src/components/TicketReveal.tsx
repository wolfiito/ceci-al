// src/components/TicketReveal.tsx
"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const TicketReveal = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      // Estado inicial: un poco más abajo y pequeño
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      // Estado final: posición original
      animate={{ opacity: 1, scale: 1, y: 0 }}
      // Transición optimizada: Rápida y con rebote seco
      transition={{ 
        type: "spring",
        stiffness: 300, // Más fuerza = más rápido
        damping: 20,    // Frena el rebote para que no oscile tanto
        mass: 0.5       // Menos masa = movimiento más ligero
      }}
      // Optimización de renderizado
      style={{ willChange: "transform, opacity" }}
      className="w-full relative z-20"
    >
      {/* Reducimos el blur estático para no cargar tanto la GPU */}
      <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full -z-10 animate-pulse" />
      {children}
    </motion.div>
  );
};