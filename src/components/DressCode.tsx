"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shirt, Info } from "lucide-react";

export default function DressCode() {
  return (
    <section className="py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Columna Izquierda: Información */}
        <div className="order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4 text-wedding-primary">
              <Shirt size={32} strokeWidth={1.5} />
              <h2 className="font-serif text-4xl md:text-5xl text-wedding-dark">
                Código de Vestimenta
              </h2>
            </div>
            
            <h3 className="text-xl font-medium mb-2 text-gray-800">Formal - Relajado</h3>
            <p className="text-gray-600 mb-8 font-light">
              Queremos que se sientan cómodos y disfruten con nosotros. 
              El evento es en jardín, así que tomen sus precauciones con el calzado (evitar tacón de aguja).
            </p>

            {/* Paleta de Colores Prohibidos */}
            <div className="bg-wedding-light p-6 rounded-xl border border-wedding-secondary/20">
              <div className="flex items-start gap-3 mb-4">
                <Info size={20} className="text-wedding-primary mt-1 shrink-0" />
                <p className="text-sm text-gray-600">
                  Reservados para la novia y el cortejo. Por favor evita estos colores:
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-6">
                {/* Blanco */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm relative">
                    <div className="absolute inset-0 flex items-center justify-center text-red-400/70 text-2xl font-light">✕</div>
                  </div>
                  <span className="text-xs text-gray-500 uppercase">Blanco</span>
                </div>

                {/* Rosa Palo */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#D4B9B9] shadow-sm relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white/70 text-2xl font-light">✕</div>
                  </div>
                  <span className="text-xs text-gray-500 uppercase">Rosa</span>
                </div>

                {/* Verde (Tono aproximado de la boda) */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-[#7A8B77] shadow-sm relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white/70 text-2xl font-light">✕</div>
                  </div>
                  <span className="text-xs text-gray-500 uppercase">Verde</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Columna Derecha: Imagen Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="order-1 md:order-2 relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500"
        >
          <Image
            src="/images/dresscode.jpg"
            alt="Código de vestimenta"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-wedding-dark/40 to-transparent" />
        </motion.div>

      </div>
    </section>
  );
}