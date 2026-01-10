"use client";

import { useEffect, useState } from "react";
import { GuestData } from "@/types/wedding";
import { MapPin, Loader2, Ticket } from "lucide-react"; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface DigitalTicketProps {
  guest: GuestData;
}

export default function DigitalTicket({ guest }: DigitalTicketProps) {
  // Filtros y Lógica (Se mantiene igual, funciona bien)
  const confirmedMembers = guest.members.filter((member) => member.isConfirmed);
  const totalPases = confirmedMembers.length;
  const [tableNames, setTableNames] = useState<Record<string, string>>({});
  const [isLoadingTables, setIsLoadingTables] = useState(true);

  useEffect(() => {
    const fetchTableNames = async () => {
      const uniqueTableIds = Array.from(
        new Set(confirmedMembers.map((m) => m.tableId).filter(Boolean) as string[])
      );

      if (uniqueTableIds.length === 0) {
        setIsLoadingTables(false);
        return;
      }

      const namesMap: Record<string, string> = {};
      await Promise.all(
        uniqueTableIds.map(async (id) => {
          try {
            const snap = await getDoc(doc(db, "tables", id));
            namesMap[id] = snap.exists() ? snap.data().name : "Asignada";
          } catch (e) {
            namesMap[id] = "Mesa";
          }
        })
      );
      setTableNames(namesMap);
      setIsLoadingTables(false);
    };

    fetchTableNames();
  }, [guest, confirmedMembers]);

  return (
    // FONDO DE PANTALLA COMPLETA
    <section className="min-h-[100dvh] w-full bg-[#F2EFE9] flex items-center justify-center p-0 md:p-6">
      
      {/* EL TICKET: Una sola pieza vertical limpia */}
      <div className="w-full h-full md:h-auto md:max-w-md bg-white md:rounded-[2rem] shadow-2xl md:shadow-stone-200 overflow-hidden flex flex-col relative">
        
        {/* Decoración superior (Barra de color o textura sutil) */}
        <div className="h-2 w-full bg-wedding-primary opacity-80" />

        {/* HEADER LIMPIO */}
        <div className="px-8 pt-10 pb-6 text-center">
          <div className="flex items-center justify-center gap-2 text-stone-400 mb-4 opacity-80">
            <Ticket size={14} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Pase de Acceso</span>
          </div>
          
          <h2 className="font-serif text-4xl text-stone-800 mb-2 leading-none">
            {guest.familyName}
          </h2>
          
          <p className="text-stone-500 text-sm font-light italic">
            {totalPases} {totalPases === 1 ? "asistente confirmado" : "asistentes confirmados"}
          </p>
        </div>

        {/* DIVIDER ELEGANTE (Línea punteada simple) */}
        <div className="relative w-full h-px my-2">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-dashed border-stone-200"></div>
            </div>
            {/* Pequeños semicírculos "mordida de ticket" a los lados */}
            <div className="absolute left-0 -ml-1.5 w-3 h-3 bg-[#F2EFE9] rounded-full top-1/2 -translate-y-1/2 md:block hidden"></div>
            <div className="absolute right-0 -mr-1.5 w-3 h-3 bg-[#F2EFE9] rounded-full top-1/2 -translate-y-1/2 md:block hidden"></div>
        </div>

        {/* LISTA DE INVITADOS (Sin cajas, solo filas limpias) */}
        <div className="flex-1 px-8 py-6 bg-white overflow-y-auto">
          <div className="space-y-6">
            {confirmedMembers.length > 0 ? (
              confirmedMembers.map((member, index) => (
                <div 
                  key={`${member.name}-${index}`} 
                  className="flex items-end justify-between group"
                >
                  {/* Nombre */}
                  <div className="flex flex-col pb-1">
                    <span className=" text-l text-stone-800 leading-none">
                      {member.name}
                    </span>
                  </div>

                  {/* Línea conectora visual (opcional, para guiar el ojo) */}
                  <div className="flex-1 border-b border-dotted border-stone-200 mx-4 mb-2 opacity-50"></div>
                  
                  {/* Mesa / Ubicación */}
                  <div className="flex flex-col items-end pb-1 text-right min-w-[80px]">
                    <span className="font-bold text-lg text-stone-700 font-mono flex items-center gap-1">
                        {isLoadingTables ? (
                            <Loader2 className="w-4 h-4 animate-spin text-stone-300" />
                        ) : (
                           <>
                             {member.tableId ? tableNames[member.tableId] || "..." : "TBA"}
                             {/* Punto indicador de color */}
                             <span className="w-1.5 h-1.5 rounded-full bg-wedding-primary ml-1 mb-1"></span>
                           </>
                        )}
                    </span>
                    <span className="text-[10px] text-stone-400 uppercase tracking-wider font-medium">
                      Mesa
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-stone-400 italic text-sm mt-10">
                Lista de invitados vacía.
              </p>
            )}
          </div>
        </div>

        {/* FOOTER INTEGRADO */}
        <div className="bg-stone-50 px-8 py-6 border-t border-stone-100 mt-auto">
            <div className="flex justify-between items-end opacity-60 hover:opacity-100 transition-opacity">
                <div>
                   <p className="text-[9px] uppercase tracking-widest font-bold text-stone-400 mb-1">Fecha</p>
                   <p className="text-xs font-serif text-stone-600">09 Mayo 2026</p>
                </div>
                <div className="text-right">
                   <p className="text-[9px] uppercase tracking-widest font-bold text-stone-400 mb-1">ID Reserva</p>
                   <p className="font-mono text-xs text-stone-600">{guest.id.slice(0, 8).toUpperCase()}</p>
                </div>
            </div>
            {/* Mensaje final muy discreto */}
            <div className="mt-6 text-center">
                 <p className="text-[10px] text-stone-300 uppercase tracking-[0.2em]">
                    Presentar en Recepción
                 </p>
            </div>
        </div>

      </div>
    </section>
  );
}