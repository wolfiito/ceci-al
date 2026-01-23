"use client";

import { GuestData } from "@/types/wedding";
import { MapPin } from "lucide-react";

interface PdfTicketTemplateProps {
  guest: GuestData;
  tableNames: Record<string, string>; // Le pasamos los nombres ya cargados
}

export default function PdfTicketTemplate({ guest, tableNames }: PdfTicketTemplateProps) {
  const confirmedMembers = guest.members.filter((m) => m.isConfirmed);

  // LOGICA DE NOMBRE (Igual que en DigitalTicket y RSVPSection)
  const displayTitle = guest.type === 'individual' 
      ? guest.familyName 
      : `Familia ${guest.familyName}`;

  return (
    // CONTENEDOR FIJO: Ancho definido para alta resolución
    <div 
      className="w-[600px] bg-[#F9F7F2] text-[#292524] relative overflow-hidden flex flex-col"
      style={{ minHeight: "900px" }} // Altura fija para formato vertical
    >
      
      {/* MARCO DECORATIVO DOBLE (Efecto Gold) */}
      <div className="absolute inset-4 border border-[#C5A059] opacity-60 pointer-events-none" />
      <div className="absolute inset-6 border-2 border-[#C5A059] opacity-80 pointer-events-none flex flex-col items-center justify-between py-8" />

      {/* --- HEADER --- */}
      <div className="pt-16 pb-8 text-center relative z-10 px-12">
        <span className="block text-[12px] uppercase tracking-[0.4em] text-[#8c7853] mb-4">
          Save the Date
        </span>
        
        {/* Título Grande */}
        <h1 className="font-serif text-5xl text-[#292524] mb-2">
          Ceci & Alejandro
        </h1>
        
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="h-[1px] w-12 bg-[#C5A059]"></div>
          <span className="font-serif italic text-2xl text-[#C5A059]">09 . 05 . 2026</span>
          <div className="h-[1px] w-12 bg-[#C5A059]"></div>
        </div>
      </div>

      {/* --- BODY PRINCIPAL --- */}
      <div className="flex-1 px-16 py-4 flex flex-col items-center justify-start text-center relative z-10">
        
        <p className="text-sm uppercase tracking-widest text-[#57534e] mb-6">
          Pase de acceso para
        </p>

        {/* NOMBRE AJUSTADO AQUÍ */}
        <h2 className="font-serif text-4xl text-[#1c1917] mb-8 leading-tight">
          {displayTitle}
        </h2>

        {/* Tabla de Invitados Estilizada */}
        <div className="w-full space-y-4 mb-10">
          {confirmedMembers.map((member, i) => {
             const tableName = member.tableId ? tableNames[member.tableId] : "Por asignar";
             return (
              <div key={i} className="flex items-baseline justify-between border-b border-[#e7e5e4] pb-2">
                <span className="font-serif text-xl text-[#44403c] text-left">
                  {member.name}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
                  {tableName}
                </span>
              </div>
             );
          })}
        </div>

        {/* Detalles del Evento */}
        <div className="grid grid-cols-2 gap-8 w-full border-t border-b border-[#C5A059] py-6 my-4">
            <div className="text-center border-r border-[#e7e5e4]">
                <p className="text-[10px] uppercase tracking-widest text-[#a8a29e] mb-1">Hora</p>
                <p className="font-serif text-2xl text-[#292524]">14:30 PM</p>
            </div>
            <div className="text-center">
                <p className="text-[10px] uppercase tracking-widest text-[#a8a29e] mb-1">Código</p>
                <p className="font-serif text-2xl text-[#292524]">Formal / Riguroso</p>
            </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4 text-[#57534e]">
            <MapPin size={14} />
            <span className="text-xs uppercase tracking-widest font-bold">Finca Bonanza</span>
        </div>

      </div>

      {/* --- FOOTER / BARCODE --- */}
      <div className="pb-12 pt-6 px-16 text-center relative z-10">
        {/* Código de barras simulado (Estético) */}
        <div className="h-12 w-3/4 mx-auto opacity-80 bg-[repeating-linear-gradient(90deg,#292524,#292524_2px,transparent_2px,transparent_5px)] mb-2" />
        <p className="font-mono text-xs tracking-[0.2em] text-[#a8a29e]">
            ID: {guest.id.toUpperCase()}
        </p>
      </div>

      {/* Textura de fondo sutil */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#f5f5f4] via-white to-[#f5f5f4] opacity-50 -z-10" />
    </div>
  );
}