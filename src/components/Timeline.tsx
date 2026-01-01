"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Church, 
  GlassWater, 
  Music, 
  Utensils, 
  PartyPopper, 
  Moon,
  Camera
} from "lucide-react";

// DATOS DEL ITINERARIO
const EVENTS = [
  {
    time: "14:00",
    title: "Ceremonia Religiosa",
    description: "Capilla de la Hacienda Los Arcángeles. Un momento solemne para unir nuestras vidas.",
    icon: Church,
  },
  {
    time: "15:30",
    title: "Cóctel de Bienvenida",
    description: "Jardín Principal. Música acústica, mixología de autor y canapés.",
    icon: GlassWater,
  },
  {
    time: "16:30",
    title: "Sesión de Fotos",
    description: "Acompañanos en la escalinata para la foto oficial con todos los invitados.",
    icon: Camera,
  },
  {
    time: "17:30",
    title: "Recepción y Banquete",
    description: "Gran Salón. Menú de 4 tiempos diseñado por el Chef ejecutivo.",
    icon: Utensils,
  },
  {
    time: "19:30",
    title: "Primer Baile",
    description: "Nuestro momento mágico en la pista. ¡Preparen sus pañuelos!",
    icon: Music,
  },
  {
    time: "21:00",
    title: "¡La Fiesta!",
    description: "DJ Set en vivo, pista iluminada y sorpresas de medianoche.",
    icon: PartyPopper,
  },
  {
    time: "02:00",
    title: "Fin del Evento",
    description: "Despedida y agradecimientos. Gracias por hacer historia con nosotros.",
    icon: Moon,
  },
];

// Componente individual de cada evento
const TimelineItem = ({ data, index }: { data: typeof EVENTS[0], index: number }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative pl-12 sm:pl-32 py-8 group"
        >
            {/* LÍNEA GUÍA (Gris claro detrás) */}
            <div className="absolute left-[0.6rem] sm:left-[6.1rem] top-0 bottom-0 w-[1px] bg-wedding-primary/5 group-last:bottom-auto group-last:h-0"></div>
            
            {/* PUNTO DE CONEXIÓN */}
            <div className="absolute left-[0.2rem] sm:left-[5.7rem] top-10 w-4 h-4 bg-[#Fdfbf7] border border-wedding-secondary rounded-full flex items-center justify-center z-10 shadow-sm group-hover:scale-125 transition-transform duration-300">
                 <div className="w-1.5 h-1.5 bg-wedding-secondary rounded-full" />
            </div>

            {/* CONTENIDO */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-10">
                
                {/* HORA */}
                <div className="sm:w-24 text-left sm:text-right shrink-0">
                    <span className="font-serif text-2xl sm:text-3xl text-wedding-secondary font-bold tabular-nums">
                        {data.time}
                    </span>
                </div>

                {/* TARJETA DE DETALLE */}
                <div className="relative bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-wedding-primary/10 shadow-sm hover:shadow-lg transition-all duration-300 w-full max-w-md group-hover:-translate-y-1">
                    {/* Triángulo decorativo (Speech bubble) */}
                    <div className="absolute -left-2 top-8 w-4 h-4 bg-white border-l border-b border-wedding-primary/10 rotate-45 hidden sm:block" />
                    
                    <div className="flex items-center gap-3 mb-3 text-wedding-secondary">
                        <data.icon size={20} strokeWidth={1.5} />
                        <h3 className="font-serif text-lg font-medium text-wedding-dark">{data.title}</h3>
                    </div>
                    
                    <p className="text-sm font-sans text-wedding-dark/60 leading-relaxed">
                        {data.description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-24 px-4 overflow-hidden bg-[#Fdfbf7]">
      
      {/* 1. TEXTURA DE RUIDO (NOISE)
          Le da el toque "Papel de Algodón". Sutil y elegante. 
      */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply bg-[url('/noise.png')] z-0" />
      
      {/* Gradiente sutil superior para suavizar la entrada desde la sección anterior */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent z-0 opacity-50" />

      <div className="max-w-4xl mx-auto relative z-10">
         
         {/* CABECERA (Alineada a la izquierda con el eje) */}
         <div className="relative pl-12 sm:pl-32 mb-16">
            {/* Start Dot */}
            <div className="absolute left-[0.2rem] sm:left-[5.7rem] top-2 w-4 h-4 border-2 border-wedding-secondary rounded-full bg-[#Fdfbf7] z-20" />
            
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-left"
            >
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-wedding-secondary mb-3 font-bold">
                    Agenda del Día
                </p>
                <h2 className="font-serif text-4xl md:text-6xl text-wedding-dark leading-none">
                    Celebración
                </h2>
                <p className="mt-4 text-wedding-dark/50 font-sans text-sm max-w-md leading-relaxed">
                    Cada momento ha sido planeado con amor para compartirlo con ustedes.
                </p>
            </motion.div>
         </div>

         <div className="relative">
            {/* EJE PRINCIPAL (Gris tenue) */}
            <div className="absolute left-[0.6rem] sm:left-[6.1rem] -top-8 bottom-0 w-[1px] bg-wedding-primary/10 z-0" />
            
            {/* EL HILO DORADO (Barra de progreso animada) */}
            <motion.div 
                style={{ height }}
                className="absolute left-[0.6rem] sm:left-[6.1rem] -top-8 w-[1px] bg-wedding-secondary z-0 origin-top shadow-[0_0_10px_rgba(212,175,55,0.4)]"
            />

            {/* EVENTOS */}
            <div className="space-y-4 pt-2">
                {EVENTS.map((event, index) => (
                    <TimelineItem key={index} data={event} index={index} />
                ))}
            </div>
            
            {/* PUNTO FINAL */}
             <div className="absolute left-[0.2rem] sm:left-[5.7rem] bottom-0 w-4 h-4 border border-wedding-secondary/50 rounded-full bg-[#Fdfbf7] z-10" />
         </div>
      </div>
    </section>
  );
}