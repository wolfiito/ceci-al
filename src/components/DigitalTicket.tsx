"use client";

import { useEffect, useState } from "react";
import { GuestData } from "@/types/wedding";
import { Ticket, MapPin, Loader2 } from "lucide-react"; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface DigitalTicketProps {
  guest: GuestData;
  mode?: "view" | "pdf"; 
}

export default function DigitalTicket({ guest, mode = "view" }: DigitalTicketProps) {
  const confirmedMembers = guest.members.filter((member) => member.isConfirmed);
  const totalPases = confirmedMembers.length;
  const [tableNames, setTableNames] = useState<Record<string, string>>({});
  const [isLoadingTables, setIsLoadingTables] = useState(true);
  
  // LOGICA DE NOMBRE (Igual que en RSVPSection)
  const displayTitle = guest.type === 'individual' 
      ? guest.familyName 
      : `Familia ${guest.familyName}`;

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
            namesMap[id] = "TBA";
          }
        })
      );
      setTableNames(namesMap);
      setIsLoadingTables(false);
    };

    fetchTableNames();
  }, [guest, confirmedMembers]);

  return (
    <div className="w-full bg-white border border-[#e7e5e4] rounded-xl overflow-hidden flex flex-col shadow-sm">
        
        {/* HEADER */}
        <div className="bg-[#2C3E2E] px-6 py-4 flex justify-between items-center text-[#F2F0E9]">
            <div className="flex items-center gap-2 opacity-90">
                <Ticket size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Pase de Acceso</span>
            </div>
            <span className="font-serif italic opacity-80">09 . 05 . 2026</span>
        </div>

        {/* CUERPO DEL TICKET */}
        <div className="p-5 bg-white relative">
        
            {/* Título (NOMBRE AJUSTADO AQUÍ) */}
            <div className="text-center mb-5 border-b border-dashed border-[#d6d3d1] pb-3">
                <p className="text-[9px] uppercase tracking-widest text-[#a8a29e] mb-1">Invitación para</p>
                <h3 className="font-serif text-2xl text-[#292524] leading-none pb-1">
                  {displayTitle}
                </h3>
                <p className="text-[10px] text-[#a8a29e] font-light italic">
                    {totalPases} {totalPases === 1 ? "lugar confirmado" : "lugares confirmados"}
                </p>
            </div>

            {/* LISTA DE INVITADOS */}
            <div className="space-y-2">
                {confirmedMembers.length > 0 ? (
                    confirmedMembers.map((member, index) => {
                        const tableName = member.tableId ? tableNames[member.tableId] : null;
                        
                        return (
                            <div 
                                key={`${member.name}-${index}`} 
                                className={`flex ${mode === 'pdf' ? 'items-start' : 'items-center'} justify-between py-2 border-b border-transparent`}
                            >
                                {/* NOMBRE */}
                                <span className={`
                                    font-serif text-base text-[#44403c] pr-2
                                    ${mode === 'pdf' ? 'text-wrap break-words leading-tight' : 'truncate'}
                                `}>
                                    {member.name}
                                </span>

                                <div className="shrink-0 pl-2">
                                    {isLoadingTables ? (
                                        <Loader2 className="w-3 h-3 animate-spin text-[#d6d3d1]" />
                                    ) : (
                                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-[#fafaf9] border border-[#f5f5f4] text-[10px] font-bold text-[#78716c] uppercase tracking-wider whitespace-nowrap">
                                          {tableName || "TBA"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-[#a8a29e] italic text-xs">Sin invitados seleccionados</p>
                )}
            </div>

            {/* FOOTER */}
            <div className="mt-6 pt-3 border-t border-dashed border-[#d6d3d1] flex justify-between items-end">
                <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-[#a8a29e] font-bold mb-0.5">Ubicación</span>
                    <span className="text-xs font-medium text-[#57534e] flex items-center gap-1">
                        <MapPin size={10} /> Finca Bonanza
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-[9px] uppercase tracking-widest text-[#a8a29e] font-bold block mb-0.5">ID Reserva</span>
                    <span className="font-mono text-xs tracking-widest text-[#292524] bg-[#fafaf9] px-1.5 py-0.5 rounded border border-[#f5f5f4]">
                        {guest.id.slice(0, 8).toUpperCase()}
                    </span>
                </div>
            </div>
            
            {/* CÓDIGO DE BARRAS DECORATIVO */}
            <div className="mt-4 h-6 w-full opacity-10 bg-[repeating-linear-gradient(90deg,#000,#000_1px,transparent_1px,transparent_4px)]" />
        </div>
    </div>
  );
}