// src/components/TicketReveal.tsx
"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export const TicketReveal = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        duration: 1.2, 
        type: "spring",
        bounce: 0.4,
        delay: 0.2 
      }}
      className="w-full relative z-20"
    >
      {/* Efecto de resplandor trasero */}
      <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full -z-10 animate-pulse" />
      {children}
    </motion.div>
  );
};