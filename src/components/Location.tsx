"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { MapPin, Navigation, Copy, Check, ExternalLink } from "lucide-react";
import Interactive from "@/components/ui/Interactive";

// --- Tipos e Interfaces ---
interface LocationProps {
  locationName?: string;
  address?: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
}

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
  const baseStyles = "flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold transition-all duration-300 transform active:scale-[0.98] text-[10px] uppercase tracking-widest w-full shadow-sm";

  const variants = {
    primary: "bg-[#2C3E2E] text-[#F2F0E9] hover:bg-[#1a251b]",
    secondary: "bg-[#DCC5C5] text-white hover:bg-[#cba8a8]",
    outline: "border border-[#2C3E2E]/20 text-[#2C3E2E] hover:bg-[#2C3E2E]/5 bg-transparent",
  };

  const content = (
    <>
      {Icon && <Icon size={14} />}
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

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(venueAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="bg-[#FDFBF7] py-20 relative overflow-hidden" id="location">
      
      {/* Decoración de fondo */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DCC5C5]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2C3E2E]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Título de la Sección */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[#DB8C8A] text-xs uppercase tracking-[0.3em] font-bold block mb-4">¿Dónde será?</span>
          <h2 className="font-serif text-5xl md:text-6xl text-[#2C3E2E] italic">
            Ubicación
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-[#DCC5C5]" />
            <MapPin className="text-[#DCC5C5]" size={20} strokeWidth={1.5} />
            <div className="h-[1px] w-12 bg-[#DCC5C5]" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* INFORMACIÓN */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-8 order-2 lg:order-1"
          >
            <div className="space-y-4">
              <h3 className="font-serif text-3xl md:text-4xl text-[#2C3E2E] leading-tight">
                {venue}
              </h3>
              <p className="text-stone-500 font-light leading-relaxed text-sm md:text-base max-w-sm">
                {venueAddress}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Interactive className="w-full sm:w-auto">
                <button 
                  onClick={handleCopyAddress}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#DCC5C5] text-[#DB8C8A] text-[10px] uppercase tracking-widest font-bold hover:bg-[#DCC5C5]/10 transition-all shadow-sm"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copiado" : "Copiar Dirección"}
                </button>
              </Interactive>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Interactive className="w-full">
                <ActionButton href={mapUrl} variant="primary" icon={ExternalLink}>
                  Google Maps
                </ActionButton>
              </Interactive>
              <Interactive className="w-full">
                <ActionButton href={navUrl} variant="outline" icon={Navigation}>
                  Ir con Waze
                </ActionButton>
              </Interactive>
            </div>
          </motion.div>

          {/* IMAGEN CON EFECTO FRAME */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 order-1 lg:order-2"
          >
            <div className="relative group p-4">
              {/* Frame decorativo */}
              <div className="absolute inset-0 border border-[#DCC5C5] rounded-[2.5rem] -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
              
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] md:aspect-[16/10] shadow-2xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  src="/images/fincaBonanza.jpg"
                  alt={venue}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Tag flotante */}
              <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-stone-100 max-w-[200px] hidden sm:block">
                <p className="text-[#DB8C8A] font-serif italic text-lg mb-1">Hacienda</p>
                <p className="text-stone-400 text-[10px] uppercase tracking-widest font-bold">Lugar del evento</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}