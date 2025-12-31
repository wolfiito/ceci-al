"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import QRCode from "react-qr-code";
import { MessageCircle, CheckCircle2 } from "lucide-react";

// Datos simulados (En el futuro esto vendrá de la URL o Base de Datos)
const GUEST_DATA = {
  id: "guest-123-invitacion-ceci-ale", // Este ID único genera el QR
  name: "Familia Pérez López",
  tickets: 2,
};

// Link de WhatsApp placeholder (Reemplaza el número 5255... por el real de quien reciba las confirmaciones)
const WA_PHONE = "5215555555555"; // Código país + número
const WA_MESSAGE = encodeURIComponent(`¡Hola! Quiero confirmar la asistencia de la ${GUEST_DATA.name} para la boda de Ceci y Alejandro.`);
const RSVP_LINK = `https://wa.me/${WA_PHONE}?text=${WA_MESSAGE}`;


export default function RSVPSection() {
  return (
    <section className="relative py-24 flex items-center justify-center overflow-hidden">
      {/* 1. Fondo Desenfocado con la foto de Espaldas */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/ticket-bg.jpg"
          alt="Fondo boleto"
          fill
          className="object-cover blur-[8px] scale-110 brightness-50" // Blur intenso y oscurecido
        />
      </div>

      <div className="relative z-10 max-w-md w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-8 text-white"
        >
          <h2 className="font-serif text-4xl mb-2">Tu Pase de Acceso</h2>
          <p className="opacity-90 font-light">Por favor presenta este código en la entrada.</p>
        </motion.div>

        {/* 2. Tarjeta del Boleto "Físico" */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl border border-white/20 relative"
          style={{
            // Simulación sutil de textura de papel fino
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          }}
        >
          {/* Cabecera del Boleto */}
          <div className="bg-wedding-primary p-6 text-center text-white relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
            <p className="text-sm tracking-[0.3em] uppercase opacity-80 mb-1">Boda</p>
            <h3 className="font-serif text-3xl">Ceci & Alejandro</h3>
            <div className="absolute -bottom-3 left-0 w-full h-3 bg-white/95" style={{ clipPath: "polygon(0 50%, 2% 0, 4% 50%, 6% 0, 8% 50%, 10% 0, 12% 50%, 14% 0, 16% 50%, 18% 0, 20% 50%, 22% 0, 24% 50%, 26% 0, 28% 50%, 30% 0, 32% 50%, 34% 0, 36% 50%, 38% 0, 40% 50%, 42% 0, 44% 50%, 46% 0, 48% 50%, 50% 0, 52% 50%, 54% 0, 56% 50%, 58% 0, 60% 50%, 62% 0, 64% 50%, 66% 0, 68% 50%, 70% 0, 72% 50%, 74% 0, 76% 50%, 78% 0, 80% 50%, 82% 0, 84% 50%, 86% 0, 88% 50%, 90% 0, 92% 50%, 94% 0, 96% 50%, 98% 0, 100% 50%, 100% 100%, 0% 100%)" }}></div>
          </div>

          {/* Cuerpo del Boleto */}
          <div className="p-8 pt-10 text-center flex flex-col items-center">
            {/* Nombre del Invitado */}
            <h4 className="text-wedding-dark font-serif text-2xl md:text-3xl mb-2 break-words max-w-full">
              {GUEST_DATA.name}
            </h4>
            <div className="inline-flex items-center gap-2 bg-wedding-accent/50 px-4 py-1 rounded-full text-wedding-dark text-sm font-medium mb-8 border border-wedding-secondary/20">
              <CheckCircle2 size={16} className="text-wedding-primary"/>
              Pase para {GUEST_DATA.tickets} personas
            </div>

            {/* Código QR */}
            <div className="p-3 bg-white border-2 border-dashed border-gray-300 rounded-xl mb-6">
              <QRCode
                value={GUEST_DATA.id}
                size={160}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 160 160`}
                bgColor="#ffffff"
                fgColor="#2C3E2E" // Usamos el color verde oscuro de la boda para el QR
              />
            </div>
             <p className="text-xs text-gray-400 uppercase tracking-widest">ID: {GUEST_DATA.id}</p>
          </div>

           {/* Linea de corte punteada decorativa */}
           <div className="relative h-0 border-b-2 border-dashed border-gray-300 mx-4 mb-4">
                <div className="absolute -left-6 -top-3 w-6 h-6 bg-wedding-primary rounded-full"></div>
                <div className="absolute -right-6 -top-3 w-6 h-6 bg-wedding-primary rounded-full"></div>
           </div>

          {/* Pie del boleto (Fecha) */}
          <div className="pb-6 text-center px-8">
             <div className="flex justify-between text-sm font-medium text-gray-500">
                 <div>FECHA</div>
                 <div>HORA</div>
             </div>
             <div className="flex justify-between text-lg font-serif text-wedding-dark">
                 <div>09.05.2026</div>
                 <div>14:00 HRS</div>
             </div>
          </div>

        </motion.div>

        {/* 3. Botón de RSVP (WhatsApp) */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-8 text-center"
        >
            <a
                href={RSVP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
                <MessageCircle size={24} className="group-hover:animate-bounce"/>
                Confirmar Asistencia vía WhatsApp
            </a>
             <p className="text-white/70 text-sm mt-4 max-w-xs mx-auto font-light">
                Al dar clic, se abrirá WhatsApp con un mensaje prellenado para enviar.
            </p>
        </motion.div>
      </div>
    </section>
  );
}