"use client";

import { motion } from "framer-motion";
import { Gift, CreditCard } from "lucide-react";

export default function Gifts() {
  return (
    <section className="py-20 px-4 bg-wedding-secondary/10">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <Gift className="w-12 h-12 text-wedding-primary mx-auto mb-4" />
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-dark mb-6">
            Mesa de Regalos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-light">
            Su presencia es nuestro mayor regalo, pero si desean tener un detalle con nosotros, 
            hemos seleccionado algunas opciones en:
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Tarjeta Liverpool */}
          <motion.a
            href="https://mesa-regalos.liverpool.com.mx/" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-pink-100 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl">
              L
            </div>
            <h3 className="text-2xl font-serif text-gray-800 mb-2">Liverpool</h3>
            <p className="text-gray-500 text-sm mb-4">No. de Evento: 12345678</p>
            <span className="text-pink-600 text-sm font-bold uppercase tracking-wider group-hover:underline underline-offset-4">
              Ver Mesa de Regalos
            </span>
          </motion.a>

          {/* Tarjeta Amazon */}
          <motion.a
            href="https://www.amazon.com.mx/wedding" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-orange-100 flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4 text-white font-bold text-xl relative overflow-hidden">
               {/* Simulación logo Amazon simple */}
               <span className="z-10">a</span>
               <div className="absolute bottom-4 left-3 w-8 h-4 border-b-2 border-orange-400 rounded-[50%]"></div>
            </div>
            <h3 className="text-2xl font-serif text-gray-800 mb-2">Amazon</h3>
            <p className="text-gray-500 text-sm mb-4">Buscar como: Ceci y Alejandro</p>
            <span className="text-gray-900 text-sm font-bold uppercase tracking-wider group-hover:underline underline-offset-4">
              Ver Lista de Deseos
            </span>
          </motion.a>
        </div>
        
        {/* Opción Sobres (Opcional pero útil mencionar) */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 p-6 bg-white/50 rounded-lg inline-block backdrop-blur-sm"
        >
            <div className="flex items-center gap-3 justify-center text-gray-500">
                <CreditCard size={18} />
                <p className="text-sm">También contaremos con buzón para sobres el día del evento.</p>
            </div>
        </motion.div>

      </div>
    </section>
  );
}