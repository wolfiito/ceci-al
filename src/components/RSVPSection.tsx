"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MessageCircle, CheckCircle2, Loader2, Heart, Users, UserX, UserCheck, Calendar, Minus, Plus } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GuestData, GuestMember } from "@/types/wedding";

interface RSVPSectionProps {
  guestData: GuestData | null;
  eventNames: string;
  eventDate: string;
}

export default function RSVPSection({ guestData, eventNames }: RSVPSectionProps) {
  const [step, setStep] = useState(1); // 1: Cantidad, 2: Selección individual, 3: Mensaje
  const [isConfirming, setIsConfirming] = useState(false);
  const [isFinished, setIsFinished] = useState(guestData?.status === 'confirmed');
  
  const [ticketCount, setTicketCount] = useState(guestData?.members.length || 0);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loveMessage, setLoveMessage] = useState("");

  const maxTickets = guestData?.members.length || 0;

  // Inicializamos a todos como "asistiendo" por defecto
  useEffect(() => {
    if (guestData?.members) {
      const initial = guestData.members.reduce((acc, m) => ({ ...acc, [m.name]: true }), {});
      setAttendance(initial);
    }
  }, [guestData]);

  // Manejo del primer paso
  const handleConfirmClick = () => {
    if (ticketCount === 0) {
      handleNoAsistireClick();
    } else if (ticketCount < maxTickets) {
      setStep(2); // Ir a elegir quién no viene
    } else {
      setStep(3); // Todos vienen, ir directo al mensaje
    }
  };

  const handleNoAsistireClick = () => {
    setTicketCount(0);
    const allDeclined = Object.keys(attendance).reduce((acc, name) => ({ ...acc, [name]: false }), {});
    setAttendance(allDeclined);
    setStep(3);
  };

  const toggleMember = (name: string) => {
    const currentAttending = Object.values(attendance).filter(Boolean).length;
    
    // Si queremos activar a alguien pero ya llegamos al límite del paso 1, no dejamos
    if (!attendance[name] && currentAttending >= ticketCount) return;
    
    setAttendance(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleFinalSend = async () => {
    if (!guestData?.id) return;
    setIsConfirming(true);
    try {
      const guestRef = doc(db, "guests", guestData.id);
      const updatedMembers: GuestMember[] = guestData.members.map(m => ({
        ...m,
        isConfirmed: attendance[m.name] || false
      }));

      await updateDoc(guestRef, {
        status: ticketCount > 0 ? 'confirmed' : 'declined',
        members: updatedMembers,
        message: loveMessage
      });

      setIsFinished(true);

      const attendingList = updatedMembers.filter(m => m.isConfirmed).map(m => m.name).join(", ");
      const waText = ticketCount > 0 
        ? `¡Hola! Confirmamos ${ticketCount} pases (${attendingList}) para la boda de ${eventNames}.\nMensaje: ${loveMessage}`
        : `Lamentamos no poder asistir a la boda de ${eventNames}.\nMensaje: ${loveMessage}`;

      window.open(`https://wa.me/5215555555555?text=${encodeURIComponent(waText)}`, '_blank');
    } catch (error) {
      console.error(error);
    } finally {
      setIsConfirming(false);
    }
  };

  if (!guestData) return null;

  return (
    <section className="relative py-24 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/ticket-bg.jpg" alt="Background" fill className="object-cover blur-sm brightness-50" />
      </div>

      <div className="relative z-10 max-w-lg w-full mx-4">
        <motion.div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-wedding-primary p-6 text-center text-white">
            <h2 className="font-serif text-2xl">Confirmación de Asistencia</h2>
            <p className="text-xs uppercase tracking-widest opacity-80 mt-1">Familia {guestData.familyName}</p>
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              
              {/* PASO 1: CANTIDAD DE PASES */}
              {step === 1 && !isFinished && (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
                  <div className="text-center space-y-2">
                    <Users className="mx-auto text-wedding-primary w-10 h-10" />
                    <h3 className="font-serif text-xl">¿Cuántos pases utilizarás?</h3>
                    <p className="text-sm text-gray-500 italic">Tienes {maxTickets} lugares reservados</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-8">
                    <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-6xl font-serif text-wedding-dark">{ticketCount}</span>
                    <button onClick={() => setTicketCount(Math.min(maxTickets, ticketCount + 1))} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={handleNoAsistireClick} className="py-4 rounded-full font-bold border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all">
                      No asistiré
                    </button>
                    <button onClick={handleConfirmClick} className="bg-wedding-primary text-white py-4 rounded-full font-bold shadow-lg hover:bg-wedding-dark transition-all">
                      Confirmar
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PASO 2: SELECCIÓN VISUAL (VERDE/ROJO) */}
              {step === 2 && !isFinished && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="text-center">
                    <h3 className="font-serif text-xl">¿Quiénes nos acompañan?</h3>
                    <p className="text-sm text-gray-500 italic">Selecciona exactamente {ticketCount} asistentes</p>
                  </div>
                  <div className="space-y-3">
                    {guestData.members.map(m => (
                      <button 
                        key={m.name} 
                        onClick={() => toggleMember(m.name)} 
                        className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all duration-300 ${
                          attendance[m.name] 
                          ? "border-green-200 bg-green-50/50 shadow-sm" 
                          : "border-red-100 bg-red-50/30 opacity-60"
                        }`}
                      >
                        <span className={`font-medium ${attendance[m.name] ? "text-green-800" : "text-red-800"}`}>
                          {m.name}
                        </span>
                        <div className={`p-2 rounded-full ${attendance[m.name] ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                          {attendance[m.name] ? <UserCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setStep(3)} 
                    disabled={Object.values(attendance).filter(Boolean).length !== ticketCount} 
                    className="w-full bg-wedding-primary text-white py-4 rounded-full font-bold disabled:opacity-30 transition-all shadow-md"
                  >
                    Continuar
                  </button>
                </motion.div>
              )}

              {/* PASO 3: MENSAJE Y ENVÍO */}
              {step === 3 && !isFinished && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <div className="text-center">
                    <Heart className="mx-auto text-pink-400 w-10 h-10 animate-pulse" />
                    <h3 className="font-serif text-xl">Un mensaje para los novios</h3>
                  </div>
                  <textarea 
                    value={loveMessage} 
                    onChange={(e) => setLoveMessage(e.target.value)} 
                    placeholder="Escribe tus buenos deseos aquí..." 
                    className="w-full h-32 p-4 rounded-2xl border bg-gray-50 outline-none focus:ring-2 focus:ring-wedding-primary italic text-gray-700 resize-none" 
                  />
                  <button 
                    onClick={handleFinalSend} 
                    disabled={isConfirming} 
                    className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#20bd5a] transition-all"
                  >
                    {isConfirming ? <Loader2 className="animate-spin" /> : <><MessageCircle /> Enviar a los novios</>}
                  </button>
                </motion.div>
              )}

              {/* FINALIZADO */}
              {isFinished && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-6 space-y-6">
                  <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-green-500 w-12 h-12" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-wedding-dark">¡Confirmación enviada!</h3>
                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-3xl flex flex-col items-center gap-3">
                      <Calendar className="text-amber-500 w-8 h-8" />
                      <p className="text-amber-900 text-sm font-medium leading-relaxed">
                        15 días antes del Evento vuelve a este mismo enlace para obtener tu <span className="font-bold">Código QR</span> de entrada.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}