"use client";

import { motion } from "framer-motion";
import { Church, GlassWater, Utensils, Music, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// (La constante EVENTS sigue igual...)
const EVENTS = [
    // ... tus eventos ...
    { time: "14:00", title: "Ceremonia Religiosa", description: "Capilla de San Francisco", icon: Church },
    { time: "15:30", title: "Cóctel de Bienvenida", description: "Jardín Principal", icon: GlassWater },
    { time: "17:00", title: "Banquete", description: "Salón Los Pinos", icon: Utensils },
    { time: "19:00", title: "Primer Baile", description: "¡Que comience la fiesta!", icon: Music },
    { time: "00:00", title: "Tornaboda", description: "Un snack para seguir", icon: Sparkles },
];

export default function Timeline() {
  return (
    // Sección transparente con padding para ver el fondo
    <section className="relative z-10 py-24 px-4">
      
      {/* TARJETA FLOTANTE DEL ITINERARIO */}
      <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-[3rem] p-8 md:p-16 shadow-xl border border-white/40">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-primary mb-4">
            Itinerario
          </h2>
          <p className="text-gray-500 uppercase tracking-widest text-sm">
            Un día para recordar
          </p>
        </motion.div>

        {/* (El resto del código del timeline sigue igual dentro de la tarjeta...) */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-wedding-secondary/30 -translate-x-1/2" />
          <div className="space-y-12">
            {EVENTS.map((event, index) => {
              const Icon = event.icon;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={cn("relative flex items-center md:justify-between","flex-row md:flex-row" )}
                >
                  <div className={cn("hidden md:block w-5/12", isEven ? "order-1" : "order-3")} />
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-wedding-primary text-white shadow-lg border-4 border-white md:order-2">
                    <Icon size={16} />
                  </div>
                  <div className={cn("pl-12 md:pl-0 w-full md:w-5/12", isEven ? "md:text-right md:pr-8 md:order-1" : "md:text-left md:pl-8 md:order-3")}>
                    {/* Quitamos el bg-white y sombra de las tarjetitas internas para que se vea más limpio sobre la tarjeta grande */}
                    <div className="p-4 rounded-xl border border-wedding-secondary/10 bg-wedding-light/50">
                      <span className="inline-block px-3 py-1 bg-wedding-accent text-wedding-dark text-xs font-bold rounded-full mb-2">{event.time}</span>
                      <h3 className="text-xl font-serif text-wedding-dark mb-1">{event.title}</h3>
                      <p className="text-gray-500 text-sm font-light">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}