// src/components/DigitalTicket.tsx
import QRCode from "react-qr-code";
import { GuestData } from "@/types/wedding";

interface DigitalTicketProps {
  guest: GuestData;
}

export default function DigitalTicket({ guest }: DigitalTicketProps) {
  // Calculamos el número total de pases
  const totalPases = guest.members.length;

  return (
    <section className="w-full py-16 px-4 bg-[#F9F5F0] flex flex-col items-center justify-center">
      
      <div className="max-w-md w-full bg-white relative shadow-xl rounded-sm overflow-hidden border border-stone-200">
        
        {/* Decoración superior (Círculo de corte) */}
        <div className="absolute -left-3 top-1/2 w-6 h-6 bg-[#F9F5F0] rounded-full transform -translate-y-1/2" />
        <div className="absolute -right-3 top-1/2 w-6 h-6 bg-[#F9F5F0] rounded-full transform -translate-y-1/2" />

        {/* Cabecera del Ticket */}
        <div className="p-8 text-center border-b-2 border-dashed border-stone-200">
          <p className="text-xs uppercase tracking-[0.2em] text-stone-500 mb-2">Pase de Acceso</p>
          <h2 className="font-serif text-3xl text-stone-800 mb-1">{guest.familyName}</h2>
          <p className="text-stone-500 italic text-sm">
            {totalPases} {totalPases === 1 ? "Lugar reservado" : "Lugares reservados"}
          </p>
        </div>

        {/* Cuerpo del QR */}
        <div className="p-8 flex flex-col items-center justify-center bg-white">
          <div className="p-4 border border-stone-100 rounded-lg shadow-inner bg-white">
             {/* IMPORTANTE: El value es guest.id. Esto es lo que lee la Hostess */}
             <QRCode 
                value={guest.id} 
                size={180} 
                level="H"
                fgColor="#292524" // Stone-800
             />
          </div>
          <p className="mt-4 text-[10px] text-stone-400 font-mono tracking-widest uppercase">
            ID: {guest.id.slice(0, 8)}...
          </p>
          <p className="mt-2 text-xs text-stone-500 text-center max-w-[200px]">
            Presenta este código en la entrada para facilitar tu acceso.
          </p>
        </div>

        {/* Footer del Ticket */}
        <div className="bg-stone-50 p-4 text-center border-t border-stone-100">
            <p className="text-xs text-stone-400 uppercase tracking-widest">Válido para el 09 Mayo 2026</p>
        </div>
      </div>

    </section>
  );
}