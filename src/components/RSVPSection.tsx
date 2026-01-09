"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import confetti from "canvas-confetti";
import { 
  MessageCircle, 
  CheckCircle2, 
  Loader2, 
  Heart, 
  Users, 
  UserX, 
  UserCheck, 
  Minus, 
  Plus,
  Edit2 
} from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GuestData, GuestMember } from "@/types/wedding";

import DigitalTicket from "@/components/DigitalTicket"; 
import { TicketReveal } from "@/components/TicketReveal";

interface RSVPSectionProps {
  guestData: GuestData | null;
  eventNames: string;
  eventDate: string;
}

export default function RSVPSection({ guestData, eventNames }: RSVPSectionProps) {
  const [step, setStep] = useState(1);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isFinished, setIsFinished] = useState(guestData?.status === 'confirmed' || guestData?.status === 'declined');
  
  const [ticketCount, setTicketCount] = useState(guestData?.members.length || 0);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loveMessage, setLoveMessage] = useState("");

  const maxTickets = guestData?.members.length || 0;

  useEffect(() => {
    if (guestData?.members) {
      const initial = guestData.members.reduce((acc, m) => ({ 
        ...acc, 
        [m.name]: guestData.status === 'confirmed' ? m.isConfirmed : true 
      }), {});
      setAttendance(initial);
      
      if (guestData.status === 'confirmed') {
          const confirmedCount = guestData.members.filter(m => m.isConfirmed).length;
          setTicketCount(confirmedCount);
      }
    }
  }, [guestData]);

  // --- CORRECCIÓN DEL BUG AQUÍ ---
  const handleConfirmClick = () => {
    if (ticketCount === 0) {
      handleNoAsistireClick();
    } else if (ticketCount < maxTickets) {
      setStep(2);
    } else {
      // BUG FIX: Si el usuario selecciona TODOS los tickets, forzamos a 'true' a todos los miembros.
      // Esto corrige el caso donde alguien estaba cancelado y al editar a "todos van", se quedaba cancelado.
      if (guestData?.members) {
        const allAttending = guestData.members.reduce((acc, m) => ({ ...acc, [m.name]: true }), {});
        setAttendance(allAttending);
      }
      setStep(3);
    }
  };
  // ------------------------------

  const handleNoAsistireClick = () => {
    setTicketCount(0);
    const allDeclined = Object.keys(attendance).reduce((acc, name) => ({ ...acc, [name]: false }), {});
    setAttendance(allDeclined);
    setStep(3);
  };

  const toggleMember = (name: string) => {
    const currentAttending = Object.values(attendance).filter(Boolean).length;
    if (!attendance[name] && currentAttending >= ticketCount) return;
    setAttendance(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleEdit = () => {
    setIsFinished(false); 
    setStep(1);           
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: ReturnType<typeof setInterval> = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#D4AF37', '#FFF', '#fcd34d'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#D4AF37', '#FFF', '#fcd34d'] });
    }, 250);
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

      const newStatus = ticketCount > 0 ? 'confirmed' : 'declined';

      // 1. ESTO YA GUARDA EL MENSAJE EN FIREBASE (¡Ya lo tenías!)
      await updateDoc(guestRef, {
        status: newStatus,
        members: updatedMembers,
        message: loveMessage // <--- Aquí se guarda
      });

      setIsFinished(true);

      if (newStatus === 'confirmed') {
          triggerConfetti();
      }

    } catch (error) {
      console.error(error);
    } finally {
      setIsConfirming(false);
    }
  };

  if (!guestData) return null;

  return (
    <section className="relative py-12 md:py-24 flex items-center justify-center overflow-hidden" id="rsvp">
      <div className="absolute inset-0 z-0">
        <Image src="/images/ticket-bg.jpg" alt="Background" fill className="object-cover blur-sm brightness-50" />
      </div>

      <div className={`relative z-10 w-full mx-4 transition-all duration-500 ${isFinished ? 'max-w-2xl' : 'max-w-lg'}`}>
        <motion.div className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="bg-wedding-primary p-4 md:p-6 text-center text-white">
            <h2 className="font-serif text-xl md:text-2xl">Confirmación de Asistencia</h2>
            <p className="text-[10px] md:text-xs uppercase tracking-widest opacity-80 mt-1">Familia {guestData.familyName}</p>
          </div>

          <div className="p-4 md:p-8">
            <AnimatePresence mode="wait">
              
              {/* PASO 1 */}
              {step === 1 && !isFinished && (
                <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <div className="text-center space-y-1">
                    <Users className="mx-auto text-wedding-primary w-8 h-8 md:w-10 md:h-10" />
                    <h3 className="font-serif text-lg md:text-xl">¿Cuántos pases utilizarás?</h3>
                    <p className="text-xs md:text-sm text-gray-500 italic">Tienes {maxTickets} lugares reservados</p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-6">
                    <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-4xl md:text-6xl font-serif text-wedding-dark w-16 text-center">{ticketCount}</span>
                    <button onClick={() => setTicketCount(Math.min(maxTickets, ticketCount + 1))} className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={handleNoAsistireClick} className="py-3 text-sm md:text-base rounded-full font-bold border border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all">
                      No asistiré
                    </button>
                    <button onClick={handleConfirmClick} className="bg-wedding-primary text-white py-3 text-sm md:text-base rounded-full font-bold shadow-lg hover:bg-wedding-dark transition-all">
                      Confirmar
                    </button>
                  </div>
                </motion.div>
              )}

              {/* PASO 2 */}
              {step === 2 && !isFinished && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-serif text-lg md:text-xl">¿Quiénes nos acompañan?</h3>
                    <p className="text-xs md:text-sm text-gray-500 italic">Selecciona exactamente {ticketCount} asistentes</p>
                  </div>
                  <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                    {guestData.members.map(m => (
                      <button 
                        key={m.name} 
                        onClick={() => toggleMember(m.name)} 
                        className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                          attendance[m.name] 
                          ? "border-green-200 bg-green-50/50 shadow-sm" 
                          : "border-red-100 bg-red-50/30 opacity-60"
                        }`}
                      >
                        <span className={`text-sm md:text-base font-medium ${attendance[m.name] ? "text-green-800" : "text-red-800"}`}>
                          {m.name}
                        </span>
                        <div className={`p-1.5 rounded-full ${attendance[m.name] ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
                          {attendance[m.name] ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setStep(3)} 
                    disabled={Object.values(attendance).filter(Boolean).length !== ticketCount} 
                    className="w-full bg-wedding-primary text-white py-3 rounded-full font-bold disabled:opacity-30 transition-all shadow-md text-sm md:text-base"
                  >
                    Continuar
                  </button>
                </motion.div>
              )}

              {/* PASO 3 */}
              {step === 3 && !isFinished && (
                <motion.div key="step3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
                  <div className="text-center">
                    <Heart className="mx-auto text-pink-400 w-8 h-8 animate-pulse" />
                    <h3 className="font-serif text-lg md:text-xl">Un mensaje para los novios</h3>
                  </div>
                  <textarea 
                    value={loveMessage} 
                    onChange={(e) => setLoveMessage(e.target.value)} 
                    placeholder="Escribe tus buenos deseos aquí..." 
                    className="w-full h-24 p-3 rounded-xl border bg-gray-50 outline-none focus:ring-2 focus:ring-wedding-primary italic text-gray-700 resize-none text-sm" 
                  />
                  <button 
                    onClick={handleFinalSend} 
                    disabled={isConfirming} 
                    className="w-full bg-[#25D366] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-[#20bd5a] transition-all text-sm md:text-base"
                  >
                    {isConfirming ? <Loader2 className="animate-spin w-5 h-5" /> : <><MessageCircle className="w-5 h-5" /> Enviar a los novios</>}
                  </button>
                </motion.div>
              )}

              {/* FINAL */}
              {isFinished && (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-2 space-y-4">
                  
                  {ticketCount > 0 ? (
                    <div className="space-y-2">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                           <CheckCircle2 className="text-green-500 w-8 h-8" />
                        </div>
                        <h3 className="font-serif text-xl text-wedding-dark">¡Asistencia Confirmada!</h3>
                        <p className="text-stone-500 text-xs mb-4">Aquí tienes tu pase de acceso. Guárdalo.</p>
                        
                        <TicketReveal>
                           <div className="transform scale-90 md:scale-100 origin-top">
                             <DigitalTicket guest={{
                                 ...guestData,
                                 members: guestData.members.map(m => ({
                                     ...m,
                                     isConfirmed: attendance[m.name] ?? m.isConfirmed
                                 }))
                             }} />
                           </div>
                        </TicketReveal>
                    </div>
                  ) : (
                    <div className="py-4">
                       <div className="mx-auto w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-3">
                          <Heart className="text-stone-400 w-8 h-8" />
                       </div>
                       <h3 className="font-serif text-xl text-stone-600">Gracias por avisar</h3>
                       <p className="text-stone-500 mt-2 max-w-xs mx-auto text-sm">
                         Lamentamos que no puedan acompañarnos, pero agradecemos sus buenos deseos.
                       </p>
                    </div>
                  )}

                  <div className="pt-3 border-t border-gray-100">
                    <button 
                      onClick={handleEdit}
                      className="text-stone-400 hover:text-wedding-primary text-xs md:text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      Editar mi confirmación
                    </button>
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