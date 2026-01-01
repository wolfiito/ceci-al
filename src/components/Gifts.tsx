"use client";

import { motion } from "framer-motion";
import { Gift, CreditCard, ShoppingBag, ExternalLink } from "lucide-react";

export default function Gifts() {
  return (
    <section className="py-24 px-6 bg-[#fff0f3] overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* CABECERA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex justify-center mb-4">
             <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-rose-400">
                <Gift size={24} strokeWidth={1.5} />
             </div>
          </div>
          
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-rose-950/40 font-bold mb-3">
              Detalles
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-rose-950 mb-6">
            Mesa de Regalos
          </h2>
          <p className="text-rose-950/70 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed font-sans">
            Su presencia es nuestro mayor regalo. Pero si desean tener un detalle con nosotros, hemos seleccionado algunas opciones:
          </p>
        </motion.div>

        {/* TARJETAS DE TIENDAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          
          {/* Tarjeta Liverpool */}
          <motion.a
            href="https://mesa-regalos.liverpool.com.mx/" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white p-8 rounded-3xl shadow-[0_10px_30px_-10px_rgba(225,29,147,0.15)] hover:shadow-xl transition-all border border-rose-100 flex flex-col items-center relative overflow-hidden"
          >
            {/* Decoración Hover (Barra rosa superior) */}
            <div className="absolute top-0 left-0 w-full h-1 bg-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            
            <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-4 text-pink-600 font-bold text-xl group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} />
            </div>
            
            <h3 className="text-2xl font-serif text-rose-950 mb-1">Liverpool</h3>
            <p className="text-rose-950/50 text-xs uppercase tracking-widest mb-4 font-bold">Evento: 12345678</p>
            
            <div className="mt-auto flex items-center gap-2 text-pink-600 text-xs font-bold uppercase tracking-wider group-hover:underline underline-offset-4">
              <span>Ver Mesa</span>
              <ExternalLink size={12} />
            </div>
          </motion.a>

          {/* Tarjeta Amazon */}
          <motion.a
            href="https://www.amazon.com.mx/wedding" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="group bg-white p-8 rounded-3xl shadow-[0_10px_30px_-10px_rgba(255,153,0,0.15)] hover:shadow-xl transition-all border border-orange-100 flex flex-col items-center relative overflow-hidden"
          >
             {/* Decoración Hover (Barra negra superior) */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gray-800 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-900 relative group-hover:scale-110 transition-transform">
               {/* Icono abstracto Amazon */}
               <span className="font-bold text-xl z-10">a</span>
               <div className="absolute bottom-4 left-4 w-6 h-3 border-b-2 border-orange-400 rounded-[50%]"></div>
            </div>
            
            <h3 className="text-2xl font-serif text-rose-950 mb-1">Amazon</h3>
            <p className="text-rose-950/50 text-xs uppercase tracking-widest mb-4 font-bold">Ceci y Alejandro</p>
            
            <div className="mt-auto flex items-center gap-2 text-gray-900 text-xs font-bold uppercase tracking-wider group-hover:underline underline-offset-4">
              <span>Ver Lista</span>
              <ExternalLink size={12} />
            </div>
          </motion.a>
        </div>
        
        {/* OPCIÓN DE SOBRES (Discreta y elegante) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block"
        >
            <div className="bg-white px-8 py-6 rounded-2xl border border-rose-100/50 shadow-sm flex flex-col md:flex-row items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#fff0f3] flex items-center justify-center text-rose-400">
                    <CreditCard size={20} />
                </div>
                <div className="text-center md:text-left">
                    <p className="text-rose-950 font-serif text-lg">Lluvia de Sobres</p>
                    <p className="text-rose-950/60 text-sm font-light">
                        También contaremos con un buzón para sobres el día del evento.
                    </p>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
}