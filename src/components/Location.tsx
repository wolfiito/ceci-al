"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, Navigation, Copy, Check } from "lucide-react";

// --- Tipos e Interfaces ---
interface LocationProps {
  locationName?: string;
  address?: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
}

// --- Componente de Botón Interno ---
const ActionButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  icon: Icon,
  href
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'outline'; 
  icon?: React.ElementType;
  href?: string;
}) => {
  const baseStyles = "flex items-center justify-center gap-2 px-4 py-3 rounded-full font-medium transition-all duration-300 transform active:scale-95 focus:outline-none text-xs md:text-base w-full md:w-auto";
  
  const variants = {
    primary: "bg-stone-800 text-white hover:bg-stone-700 shadow-lg hover:shadow-xl",
    secondary: "bg-amber-100 text-amber-900 hover:bg-amber-200",
    outline: "border-2 border-stone-300 text-stone-700 hover:border-stone-800 hover:text-stone-900 bg-transparent",
  };

  const content = (
    <>
      {Icon && <Icon size={16} className="md:w-[18px] md:h-[18px]" />}
      {children}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={`${baseStyles} ${variants[variant]}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
      {content}
    </button>
  );
};

export default function Location({ 
  locationName, 
  address, 
  googleMapsUrl, 
  wazeUrl 
}: LocationProps) {
  const [copied, setCopied] = useState(false);

  const venue = locationName || "Hacienda Los Arcángeles";
  const venueAddress = address || "Real de San Miguel 24, San Miguel de Allende, Gto, México.";
  
  const mapUrl = googleMapsUrl || "https://www.google.com/maps/search/?api=1&query=Parroquia+de+San+Miguel+Arcangel";
  const navUrl = wazeUrl || "https://waze.com/ul/hq9g68x9y7";
  
  // Nota: Usa tu imagen local "/images/fincaBonanza.jpg" en producción.
  const previewImage = "https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=1000&auto=format&fit=crop"; 

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venueAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // --- Variantes de Animación ---
  // CORRECCIÓN: Tipamos explícitamente como 'Variants' para satisfacer a TypeScript
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, 
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <section className="bg-[#DB8C8A] py-16 w-full min-h-[60vh] px-2 md:px-8 flex flex-col items-center justify-center">
      
      {/* Título de la Sección */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-100px" }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-10"
      >
        <h2 className="font-(family-name:--font-bodoni)  text-5xl md:text-5xl text-stone-50">
          Ubicación
        </h2>
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: 96 }} 
          viewport={{ margin: "-200px" }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-1 bg-stone-300 mx-auto rounded-full mt-2"
        />
      </motion.div>

      {/* Tarjeta Principal */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: "-50px" }} 
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-stone-100 flex flex-row"
      >
        
        {/* COLUMNA IZQUIERDA: INFORMACIÓN (Con animación escalonada) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }} 
          className="w-3/4 p-3 md:p-12 flex flex-col justify-center items-start text-left bg-stone-50/50 relative"
        >
           {/* Decoración de fondo */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-stone-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="mb-2 md:mb-8 relative z-10 w-full">
            <motion.h3 
              variants={itemVariants}
              className="text-2xl md:text-4xl font-serif text-stone-800 mb-2 md:mb-4 leading-tight break-words"
            >
              {venue}
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-stone-600 leading-relaxed mb-6 font-light text-xs md:text-base"
            >
              {venueAddress}
            </motion.p>

            {/* Botones de Acción */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col gap-2 md:gap-3 relative z-10 w-full items-start"
            >
                <ActionButton href={mapUrl} variant="primary" icon={MapPin}>
                    Ver Mapa
                </ActionButton>
                
                <ActionButton href={navUrl} variant="outline" icon={Navigation}>
                    Ir con Waze
                </ActionButton>
            </motion.div>
          </div>
        </motion.div>

        {/* COLUMNA DERECHA: IMAGEN */}
        <div className="w-2/4 relative bg-stone-200 group overflow-hidden min-h-[300px]">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ margin: "-20px" }} 
            transition={{ duration: 1.2 }}
            src="/images/fincaBonanza.jpg"
            alt={venue}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0"
          />
        </div>
      </motion.div>
    </section>
  );
}