"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import {
  MessageCircle, CheckCircle2, Loader2, Heart, Users, Minus, Plus, Edit2,
  MonitorPlay, Download
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Hooks & Types
import { useGuestRSVP } from "@/hooks/useGuestRSVP"; // <--- IMPORTAMOS EL HOOK
import { GuestData } from "@/types/wedding";

// Components
import { TicketReveal } from "@/components/TicketReveal";
import PdfTicketTemplate from "@/components/PdfTicketTemplate";
import Interactive from "@/components/ui/Interactive";

const DigitalTicket = dynamic(() => import("@/components/DigitalTicket"), {
  loading: () => (
    <div className="h-40 w-full flex items-center justify-center bg-[#fafaf9] rounded-xl">
      <Loader2 className="animate-spin text-[#d6d3d1] w-6 h-6" />
    </div>
  ),
});

interface RSVPSectionProps {
  guestData: GuestData | null;
  eventNames?: string;
  eventDate?: string;
}

export default function RSVPSection({ guestData }: RSVPSectionProps) {
  // 1. Consumimos el hook (Lógica de Negocio)
  const {
    step, setStep,
    isConfirming, isFinished,
    ticketCount, setTicketCount,
    attendance, toggleMember, updateAttendanceMode,
    loveMessage, setLoveMessage,
    pdfTableNames,
    maxTickets, displayTitle,
    handleEdit, submitRSVP
  } = useGuestRSVP(guestData);

  // 2. Estados locales de UI (Lógica de Presentación)
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  // --- EFECTOS DE UI (Confetti & PDF) ---
  
  const triggerConfetti = async () => {
    const confettiModule = await import("canvas-confetti");
    const confetti = confettiModule.default;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };
    confetti({ ...defaults, particleCount: 50, origin: { y: 0.6 } });
    setTimeout(() => confetti({ ...defaults, particleCount: 50, origin: { y: 0.6 } }), 300);
  };

  const handleConfirmClick = () => {
    if (ticketCount === 0) {
      handleNoAsistireClick();
    } else if (ticketCount < maxTickets) {
      setStep(2);
    } else {
      updateAttendanceMode("all"); // Auto-seleccionar todos si coincide con el total
      setStep(3);
    }
  };

  const handleNoAsistireClick = () => {
    setTicketCount(0);
    updateAttendanceMode("none");
    setStep(3);
  };

  const handleFinalSend = async () => {
    const success = await submitRSVP();
    if (success && ticketCount > 0) {
      triggerConfetti();
    }
  };

  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);
    try {
      // 1. Usamos 'as any' en las opciones para permitir 'scale'
      // Esto es seguro porque sabemos que la librería lo soporta.
      const canvas = await html2canvas(ticketRef.current, {
        scale: 3, // Aumentamos la escala para calidad Retina/Impresión
        backgroundColor: "#F9F7F2",
        useCORS: true,
        // 2. Corregimos el tipo de 'element' a HTMLElement para evitar el error ts(7006)
        ignoreElements: (element: HTMLElement) => {
          return element.tagName === 'STYLE' && element.innerText.includes('lab(');
        }
      } as any); // <--- EL TRUCO: Casteamos las opciones a 'any' para silenciar el error de 'scale'

      const imgData = canvas.toDataURL("image/png");
      
      // Cálculo dinámico para mantener la proporción exacta del ticket
      const pdfWidth = canvas.width / 3; 
      const pdfHeight = canvas.height / 3;
      
      const pdf = new jsPDF({
        orientation: "p",
        unit: "px",
        format: [pdfWidth, pdfHeight],
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Pase_Boda_${guestData?.familyName.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Error PDF", error);
      alert("Error al generar PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (!guestData) return null;

  // Preparamos data para el PDF Template (sin mutar el original)
  const updatedGuestData = {
    ...guestData,
    members: guestData.members.map((m) => ({
      ...m,
      isConfirmed: attendance[m.name] ?? m.isConfirmed,
    })),
  };

  // --- RENDER ---
  return (
    <section className="relative py-16 flex items-center justify-center overflow-hidden" id="rsvp">
      
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#2C3E2E]/80 mix-blend-multiply z-10" />
        {/* Nota: Usar Image de next/image aquí es correcto como lo tenías */}
        <img src="/images/ticket-bg.jpg" alt="Background" className="w-full h-full object-cover blur-sm" />
      </div>

      {/* Hidden Container for PDF Generation */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <div ref={ticketRef}>
          <PdfTicketTemplate guest={updatedGuestData} tableNames={pdfTableNames} />
        </div>
      </div>

      <div className={`relative z-20 w-full mx-4 transition-all duration-500 ${isFinished ? "max-w-md" : "max-w-lg"}`}>
        <motion.div layout className="bg-[#FDFBF7] rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 ring-1 ring-black/5">
          
          {/* HEADER */}
          {!isFinished && (
            <div className="bg-[#2C3E2E] py-4 text-center text-[#F2F0E9] relative overflow-hidden">
              <h2 className="font-serif text-xl italic text-[#DCC5C5]">{displayTitle}</h2>
            </div>
          )}

          {/* CONTENIDO */}
          <div className={`${isFinished ? "p-0" : "p-6 md:p-8"}`}>
            <AnimatePresence mode="wait">
              {!isFinished && (
                <>
                  {/* PASO 1: Cantidad */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                      <div className="text-center space-y-1">
                        <div className="w-10 h-10 bg-[#2C3E2E]/5 rounded-full flex items-center justify-center mx-auto mb-2 text-[#2C3E2E]">
                          <Users strokeWidth={1.5} size={20} />
                        </div>
                        <h3 className="font-serif text-2xl text-stone-800">¿Cuántos asistirán?</h3>
                        <p className="text-sm text-stone-500 font-light">
                          Reservados: <span className="font-bold text-stone-700">{maxTickets}</span>
                        </p>
                      </div>

                      {/* Control Numérico */}
                      <div className="flex items-center justify-center gap-6">
                        <Interactive className="rounded-full">
                          <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-all active:scale-90">
                            <Minus className="w-4 h-4" />
                          </button>
                        </Interactive>
                        <span className="text-5xl font-serif text-[#2C3E2E] tabular-nums w-16 text-center">
                          {ticketCount}
                        </span>
                        <Interactive className="rounded-full">
                          <button onClick={() => setTicketCount(Math.min(maxTickets, ticketCount + 1))} className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-all active:scale-90">
                            <Plus className="w-4 h-4" />
                          </button>
                        </Interactive>
                      </div>

                      <div className="space-y-3 pt-2">
                        <Interactive className="w-full">
                          <button onClick={handleConfirmClick} className="w-full bg-[#2C3E2E] text-[#F2F0E9] py-3.5 text-xs uppercase tracking-widest font-bold rounded-xl shadow-lg hover:bg-[#1a251b] transition-all">
                            Confirmar Asistencia
                          </button>
                        </Interactive>
                        <Interactive className="w-full">
                          <button onClick={handleNoAsistireClick} className="w-full py-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-600 transition-colors">
                            Lamentablemente no podremos asistir
                          </button>
                        </Interactive>
                      </div>

                      {guestData.isLongDistance && (
                        <div className="mt-4 p-4 bg-[#F9F5F0] border border-[#E8E4D8] rounded-xl flex items-start gap-3">
                            <div className="text-[#DCC5C5] shrink-0 mt-0.5"><MonitorPlay size={18} /></div>
                            <div>
                                <h4 className="font-serif text-base text-stone-800 mb-1">Desde la distancia</h4>
                                <p className="font-sans text-xs text-stone-500 leading-relaxed text-justify">
                                    Intentaremos habilitar una transmisión de la ceremonia. Pero si no se puede, te pedimos te unas a nosotros en oración para que nuestro matrimonio de gloria a Dios.
                                </p>
                            </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* PASO 2: Selección de Nombres */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                      <div className="text-center space-y-1">
                        <h3 className="font-serif text-2xl text-stone-800">Selecciona asistentes</h3>
                        <p className="text-xs text-stone-500">
                          Confirma <strong className="text-stone-700">{ticketCount}</strong> personas
                        </p>
                      </div>

                      <div className="space-y-2 py-2 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
                        {guestData.members.map((m) => (
                          <button
                            key={m.name}
                            onClick={() => toggleMember(m.name)}
                            className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all duration-200 ${
                              attendance[m.name] ? "border-[#2C3E2E]/30 bg-[#2C3E2E]/5" : "border-stone-100 bg-stone-50 opacity-60"
                            }`}
                          >
                            <span className={`text-sm font-serif ${attendance[m.name] ? "text-stone-800 font-medium" : "text-stone-400"}`}>
                              {m.name}
                            </span>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${attendance[m.name] ? "bg-[#2C3E2E] text-[#F2F0E9]" : "bg-stone-200 text-white"}`}>
                              {attendance[m.name] && <CheckCircle2 className="w-3 h-3" />}
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="pt-2">
                        <button onClick={() => setStep(3)} disabled={Object.values(attendance).filter(Boolean).length !== ticketCount} className="w-full bg-[#2C3E2E] text-[#F2F0E9] py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs disabled:opacity-50 transition-all">
                          Continuar
                        </button>
                        <button onClick={() => setStep(1)} className="w-full mt-3 text-center text-[10px] text-stone-400 hover:text-stone-600 font-bold uppercase tracking-wider">
                          Volver
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* PASO 3: Mensaje Final */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                      <div className="text-center space-y-2">
                        <Heart className="mx-auto text-[#DCC5C5] w-8 h-8 mb-1" />
                        <h3 className="font-serif text-2xl text-stone-800">Unas palabras</h3>
                      </div>
                      <div className="bg-white p-1 rounded-xl border border-stone-200 shadow-sm">
                        <textarea
                          value={loveMessage}
                          onChange={(e) => setLoveMessage(e.target.value)}
                          placeholder="Déjanos un mensaje..."
                          className="w-full h-24 p-3 rounded-lg bg-transparent outline-none font-serif text-stone-700 resize-none text-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <button onClick={handleFinalSend} disabled={isConfirming} className="w-full bg-[#2C3E2E] text-[#F2F0E9] py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest text-xs hover:bg-[#1a251b] transition-all">
                          {isConfirming ? <Loader2 className="animate-spin w-4 h-4" /> : <><span>Enviar</span><MessageCircle className="w-4 h-4" /></>}
                        </button>
                        <button onClick={() => setStep(ticketCount === 0 ? 1 : 2)} disabled={isConfirming} className="w-full text-center text-[10px] text-stone-400 hover:text-stone-600 font-bold uppercase tracking-wider">
                          Volver
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}

              {/* VISTA FINAL (TICKET o RECHAZO) */}
              {isFinished && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                  {ticketCount > 0 ? (
                    <div className="bg-[#EAE7DF]">
                      <div className="bg-green-600 p-2 text-center flex items-center justify-center gap-2 shadow-sm relative z-10">
                        <CheckCircle2 size={14} className="text-white" />
                        <p className="text-white text-[10px] font-bold uppercase tracking-widest">Confirmado</p>
                      </div>
                      <div className="p-4">
                        <TicketReveal>
                          <div className="shadow-2xl rounded-xl overflow-hidden">
                            <DigitalTicket guest={updatedGuestData} />
                          </div>
                        </TicketReveal>
                        <div className="mt-5 flex justify-center">
                          <button onClick={handleDownloadPDF} disabled={isDownloading} className="flex items-center gap-2 bg-[#2C3E2E] text-[#F2F0E9] px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-all active:scale-95 disabled:opacity-70">
                            {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                            {isDownloading ? "Generando..." : "Descargar Pase"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 px-6 text-center">
                      <div className="mx-auto w-14 h-14 bg-[#f5f5f4] rounded-full flex items-center justify-center mb-3">
                        <Heart className="text-[#a8a29e] w-6 h-6" strokeWidth={1} />
                      </div>
                      <h3 className="font-serif text-lg text-[#44403c] mb-1">Gracias por avisar</h3>
                      <p className="text-[#78716c] text-xs font-light">Lamentamos que no puedan acompañarnos.</p>
                    </div>
                  )}
                  
                  {/* Botón Modificar siempre visible al final */}
                  <div className="bg-[#FDFBF7] p-2 text-center border-t border-[#e7e5e4]">
                    <button onClick={handleEdit} className="text-[#a8a29e] hover:text-[#57534e] text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 mx-auto transition-colors">
                      <Edit2 size={10} /> Modificar
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