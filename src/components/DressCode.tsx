"use client";

import { motion } from "framer-motion";
import { Palette, Info } from "lucide-react";

const EASE_LUXURY: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Paleta de colores para mostrar a los invitados
const COLORS = [
  { name: "Verde Palo", hex: "#7A8B77" },
  { name: "Rosa Palo", hex: "#D4B9B9" },
  { name: "Beige", hex: "#E8DCC4" },
  { name: "Terracota", hex: "#C68E76" }, // Agregué uno para contraste, cámbialo si quieres
];

export default function DressCode() {
  return (
    // z-10 y bg-wedding-light son vitales para que "tape" la foto anterior
    <section className="relative z-10 py-24 px-6 bg-wedding-light rounded-t-[2.5rem] -mt-20 shadow-[0_-20px_60px_rgba(0,0,0,0.15)]">
       
       {/* Textura de papel */}
       <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply bg-[url('/noise.png')] z-0" />

       <div className="max-w-4xl mx-auto relative z-10">
          
          {/* ENCABEZADO */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE_LUXURY }}
            className="text-center mb-16"
          >
            <span className="text-wedding-primary text-xs uppercase tracking-[0.4em] font-sans block mb-3">
                Código de Vestimenta
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-wedding-dark mb-6">
                Formal Riguroso
            </h2>
            <p className="text-wedding-dark/60 max-w-lg mx-auto leading-relaxed">
                Queremos que disfrutes y luzcas espectacular. La ceremonia y recepción serán en jardín y salón.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
             
             {/* 1. PALETA DE COLORES (Izquierda) */}
             <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_LUXURY, delay: 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-wedding-secondary/20"
             >
                <div className="flex items-center gap-3 mb-6">
                    <Palette className="text-wedding-secondary" size={20} />
                    <h3 className="font-serif text-xl text-wedding-dark">Paleta Sugerida</h3>
                </div>
                
                <div className="flex justify-between items-center gap-4">
                    {COLORS.map((color, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-2">
                            <div 
                                className="w-12 h-12 rounded-full shadow-inner border border-black/5" 
                                style={{ backgroundColor: color.hex }} 
                            />
                            <span className="text-[10px] uppercase tracking-wide text-gray-400">{color.name}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center uppercase tracking-widest">
                        Evitar color Blanco y Crema
                    </p>
                </div>
             </motion.div>

             {/* 2. RECOMENDACIONES (Derecha) */}
             <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: EASE_LUXURY, delay: 0.4 }}
                className="space-y-6"
             >
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-wedding-dark/5 flex items-center justify-center shrink-0">
                        <span className="font-serif text-xl text-wedding-dark">H</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-wedding-dark mb-1">Hombres</h4>
                        <p className="text-sm text-gray-500 font-light leading-relaxed">
                            Traje completo y corbata. Se sugiere colores oscuros (Azul marino, Gris Oxford o Negro).
                        </p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-wedding-secondary/10 flex items-center justify-center shrink-0">
                        <span className="font-serif text-xl text-wedding-secondary">M</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-wedding-dark mb-1">Mujeres</h4>
                        <p className="text-sm text-gray-500 font-light leading-relaxed">
                            Vestido largo de noche. Se sugiere usar tacón ancho o protectores, ya que habrá zonas de jardín.
                        </p>
                    </div>
                </div>
             </motion.div>

          </div>
       </div>
    </section>
  );
}