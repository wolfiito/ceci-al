"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

// Fecha: 9 de Mayo de 2026 a las 14:00
const WEDDING_DATE = new Date('2026-05-09T14:00:00');

// Sub-componente para cada tarjeta de tiempo
const TimeCard = ({ value, label, delay }: { value: number; label: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: delay }}
    className="flex flex-col items-center justify-center bg-white p-4 w-20 md:w-24 h-24 md:h-32 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-wedding-secondary/30 relative overflow-hidden group"
  >
    {/* Decoración sutil: Fondo que cambia ligeramente al hover */}
    <div className="absolute inset-0 bg-wedding-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Número Grande Serif */}
    <div className="relative z-10 text-3xl md:text-5xl font-serif text-wedding-dark font-medium tabular-nums leading-none mb-1">
      {value.toString().padStart(2, '0')}
    </div>
    
    {/* Etiqueta pequeña Sans */}
    <span className="relative z-10 text-[10px] md:text-xs uppercase tracking-[0.2em] text-gray-400 font-sans">
      {label}
    </span>

    {/* Línea decorativa inferior */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-wedding-primary/20" />
  </motion.div>
);

export default function Introduction() {
  const timeLeft = useCountdown(WEDDING_DATE);

  return (
    <section className="relative py-24 px-6 bg-[#FDFDFD] overflow-hidden">
      {/* Elemento decorativo de fondo (hoja o mancha sutil) */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-wedding-accent/30 rounded-full blur-3xl -z-0 opacity-60 translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* COLUMNA 1: La Foto (Sentados) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group"
        >
          {/* Marco decorativo offset */}
          <div className="absolute top-4 left-4 w-full h-full border-2 border-wedding-primary/20 rounded-t-full rounded-b-xl z-0 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2" />
          
          <div className="relative h-[500px] w-full rounded-t-full rounded-b-xl overflow-hidden shadow-xl z-10">
            <Image
              src="/images/couple-seated.jpg"
              alt="Ceci y Alejandro"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>

        {/* COLUMNA 2: Texto y Nueva Cuenta Regresiva */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-wedding-primary tracking-[0.3em] text-sm uppercase font-bold mb-4">
              Save the Date
            </p>
            <h2 className="font-serif text-5xl md:text-6xl text-wedding-dark mb-6 leading-tight">
              ¡Nos Casamos!
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 font-light text-lg max-w-lg mx-auto lg:mx-0">
              Estamos contando los segundos para compartir el mejor día de nuestras vidas con las personas que más queremos.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}