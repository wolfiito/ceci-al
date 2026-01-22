"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic"; 
import { 
  MessageCircle, CheckCircle2, Loader2, Heart, Users, UserX, Minus, Plus, Edit2,
  MonitorPlay, Download 
} from "lucide-react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GuestData, GuestMember } from "@/types/wedding";
import { TicketReveal } from "@/components/TicketReveal";

// --- IMPORTACIONES PARA PDF ---
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Importamos el componente de diseño "Editorial" para el PDF
import PdfTicketTemplate from "@/components/PdfTicketTemplate";

// Carga diferida del ticket visual en pantalla
const DigitalTicket = dynamic(() => import("@/components/DigitalTicket"), {
  loading: () => (
    <div className="h-40 w-full flex items-center justify-center bg-[#fafaf9] rounded-xl">
      <Loader2 className="animate-spin text-[#d6d3d1] w-6 h-6"/>
    </div>
  )
});

interface RSVPSectionProps {
  guestData: GuestData | null;
  eventNames?: string; 
  eventDate?: string;
}

export default function RSVPSection({ guestData }: RSVPSectionProps) {
  // --- ESTADOS DEL FLUJO ---
  const [step, setStep] = useState(1);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isFinished, setIsFinished] = useState(guestData?.status === 'confirmed' || guestData?.status === 'declined');
  
  // --- ESTADOS DE DATOS ---
  const [ticketCount, setTicketCount] = useState(guestData?.members.length || 0);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loveMessage, setLoveMessage] = useState("");
  
  // --- ESTADOS PARA PDF ---
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null); // Referencia al ticket oculto
  const [pdfTableNames, setPdfTableNames] = useState<Record<string, string>>({}); // Nombres de mesas para el PDF

  const maxTickets = guestData?.members.length || 0;

  // 1. Inicializar asistencia basada en datos guardados
  useEffect(() => {
    if (guestData?.members) {
      const initial = guestData.members.reduce<Record<string, boolean>>((acc, m) => ({ 
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

  // 2. Cargar nombres de mesas cuando se confirma (para el PDF)
  useEffect(() => {
    if (isFinished && guestData?.members) {
        const loadTables = async () => {
            const confirmedMembers = guestData.members.filter(m => 
                // Si acabamos de confirmar, usamos el estado local 'attendance', si ya venía confirmado usamos 'm.isConfirmed'
                attendance[m.name] ?? m.isConfirmed
            );
            
            const uniqueIds = Array.from(new Set(confirmedMembers.map(m => m.tableId).filter(Boolean) as string[]));
            
            if (uniqueIds.length === 0) return;

            const names: Record<string, string> = {};
            await Promise.all(uniqueIds.map(async (id) => {
                try {
                    const snap = await getDoc(doc(db, "tables", id));
                    names[id] = snap.exists() ? snap.data().name : "Asignada";
                } catch { 
                    names[id] = "TBA"; 
                }
            }));
            setPdfTableNames(names);
        };
        loadTables();
    }
  }, [isFinished, guestData, attendance]);

  // --- LÓGICA DE INTERACCIÓN ---

  const handleConfirmClick = () => {
    if (ticketCount === 0) { handleNoAsistireClick(); } 
    else if (ticketCount < maxTickets) { setStep(2); } 
    else {
      if (guestData?.members) {
        const allAttending = guestData.members.reduce<Record<string, boolean>>((acc, m) => ({ ...acc, [m.name]: true }), {});
        setAttendance(allAttending);
      }
      setStep(3);
    }
  };

  const handleNoAsistireClick = () => {
    setTicketCount(0);
    const allDeclined = Object.keys(attendance).reduce<Record<string, boolean>>((acc, name) => ({ ...acc, [name]: false }), {});
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

  const triggerConfetti = async () => {
    const confettiModule = await import("canvas-confetti");
    const confetti = confettiModule.default;
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;
    const interval: ReturnType<typeof setInterval> = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      const particleCount = 30 * (timeLeft / duration);
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

      await updateDoc(guestRef, {
        status: newStatus,
        members: updatedMembers,
        message: loveMessage
      });

      setIsFinished(true);
      if (newStatus === 'confirmed') await triggerConfetti();
    } catch (error: unknown) {
      console.error("Error updating RSVP:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  // --- GENERACIÓN DE PDF ---
  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);

    try {
        const canvas = await html2canvas(ticketRef.current, {
            scale: 2, 
            backgroundColor: "#F9F7F2", // Coincide con el fondo del template de lujo
            useCORS: true,
            ignoreElements: (element) => element.tagName === 'STYLE' && element.innerHTML.includes('lab(')
        });

        const imgData = canvas.toDataURL("image/png");
        
        // El PDF tendrá el tamaño exacto de la imagen generada
        const pdf = new jsPDF({ 
            orientation: "p", 
            unit: "px", 
            format: [canvas.width / 2, canvas.height / 2] // Ajuste por scale:2
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save(`Pase_Boda_${guestData?.familyName.replace(/\s+/g, '_')}.pdf`);

    } catch (error) {
        console.error("Error PDF", error);
        alert("No se pudo generar el PDF. Por favor toma una captura de pantalla.");
    } finally {
        setIsDownloading(false);
    }
  };

  if (!guestData) return null;

  // Preparamos los datos actualizados para pasar a los componentes visuales
  const updatedGuestData = {
    ...guestData,
    members: guestData.members.map(m => ({
        ...m,
        isConfirmed: attendance[m.name] ?? m.isConfirmed
    }))
  };

  return (
    <section className="relative py-16 flex items-center justify-center overflow-hidden" id="rsvp">
      
      {/* Fondo */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/ticket-bg.jpg" alt="Background" fill sizes="100vw" className="object-cover blur-md brightness-[0.4]" priority={false} />
      </div>

      {/* --- ÁREA OCULTA: TEMPLATE DE LUJO PARA PDF --- */}
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <div ref={ticketRef}>
            <PdfTicketTemplate 
                guest={updatedGuestData} 
                tableNames={pdfTableNames} 
            />
        </div>
      </div>

      <div className={`relative z-10 w-full mx-4 transition-all duration-500 ${isFinished ? 'max-w-md' : 'max-w-lg'}`}>
        <motion.div layout className="bg-[#FDFBF7] rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 ring-1 ring-black/5">
          
          {/* HEADER: Se oculta si ya terminamos para ahorrar espacio */}
          {!isFinished && (
              <div className="bg-[#2C3E2E] p-8 text-center text-[#F2F0E9] relative overflow-hidden">
                <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-70 mb-2">RSVP</p>
                <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-wide">Confirmación</h2>
                <div className="w-16 h-[1px] bg-[#DCC5C5] mx-auto my-4 opacity-50"></div>
                <p className="font-serif text-lg italic text-[#DCC5C5]">{guestData.familyName}</p>
              </div>
          )}

          <div className={`${isFinished ? 'p-0' : 'p-6 md:p-10'}`}>
            <AnimatePresence mode="wait">
              {!isFinished && (
                  <>
                     {/* PASO 1: Cantidad */}
                     {step === 1 && (
                        <motion.div key="step1" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="space-y-8">
                            <div className="text-center space-y-2">
                                <div className="w-12 h-12 bg-[#2C3E2E]/5 rounded-full flex items-center justify-center mx-auto mb-2 text-[#2C3E2E]"><Users strokeWidth={1.5} /></div>
                                <h3 className="font-serif text-2xl text-stone-800">¿Cuántos asistirán?</h3>
                                <p className="text-sm text-stone-500 font-light">Tienen <span className="font-bold text-stone-700">{maxTickets}</span> lugares reservados</p>
                            </div>
                            <div className="flex items-center justify-center gap-8">
                                <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-all"><Minus className="w-5 h-5" /></button>
                                <span className="text-6xl font-serif text-[#2C3E2E] tabular-nums w-20 text-center">{ticketCount}</span>
                                <button onClick={() => setTicketCount(Math.min(maxTickets, ticketCount + 1))} className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-all"><Plus className="w-5 h-5" /></button>
                            </div>
                            <div className="grid grid-cols-1 gap-3 pt-4">
                                <button onClick={handleConfirmClick} className="w-full bg-[#2C3E2E] text-[#F2F0E9] py-4 text-sm uppercase tracking-widest font-bold rounded-xl shadow-lg hover:bg-[#1a251b] transition-all">Confirmar Asistencia</button>
                                <button onClick={handleNoAsistireClick} className="py-3 text-xs uppercase tracking-widest font-bold text-stone-400 hover:text-stone-600 transition-colors">Lamentablemente no podremos asistir</button>
                            </div>
                             {guestData.isLongDistance && (
                                <div className="mt-6 p-5 bg-[#F9F5F0] border border-[#E8E4D8] rounded-xl flex items-start gap-4">
                                    <div className="p-2 bg-white rounded-full text-[#DCC5C5] shadow-sm shrink-0"><MonitorPlay size={20} /></div>
                                    <div><h4 className="font-serif text-base text-stone-800 mb-1">Entendemos que la distancia lo hace difícil</h4><p className="font-sans text-xs text-stone-500 leading-relaxed text-justify">
                                    Intentaremos habilitar una transmisión de la ceremonia para compartir este momento. En caso de no poder hacerlo, únete a nosotros en oración por el inicio de nuestro matrimonio.
                                      </p></div>
                                </div>
                            )}
                        </motion.div>
                     )}
                     
                     {/* PASO 2: Selección */}
                     {step === 2 && (
                        <motion.div key="step2" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}} className="space-y-6">
                             <div className="text-center space-y-2"><h3 className="font-serif text-2xl text-stone-800">Selecciona a los asistentes</h3><p className="text-sm text-stone-500">Confirma <strong className="text-stone-700">{ticketCount}</strong> personas</p></div>
                             <div className="space-y-3 py-2">{guestData.members.map(m=>(<button key={m.name} onClick={()=>toggleMember(m.name)} className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${attendance[m.name]?"border-[#2C3E2E]/20 bg-white shadow-md scale-[1.01]":"border-stone-100 bg-stone-50 opacity-60 grayscale"}`}><span className={`text-base font-serif ${attendance[m.name]?"text-stone-800":"text-stone-400"}`}>{m.name}</span><div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${attendance[m.name]?"bg-[#2C3E2E] text-[#F2F0E9]":"bg-stone-200 text-white"}`}>{attendance[m.name]?<CheckCircle2 className="w-4 h-4"/>:<div className="w-2 h-2 bg-white rounded-full"/>}</div></button>))}</div>
                             <button onClick={()=>setStep(3)} disabled={Object.values(attendance).filter(Boolean).length!==ticketCount} className="w-full bg-[#2C3E2E] text-[#F2F0E9] py-4 rounded-xl font-bold uppercase tracking-widest text-xs mt-4 disabled:opacity-50">Continuar</button>
                             <button onClick={()=>setStep(1)} className="w-full text-center text-xs text-stone-400 hover:text-stone-600 font-bold uppercase tracking-wider">Volver</button>
                        </motion.div>
                     )}

                     {/* PASO 3: Mensaje */}
                     {step === 3 && (
                        <motion.div key="step3" initial={{opacity:0}} animate={{opacity:1}} className="space-y-6">
                            <div className="text-center space-y-2"><Heart className="mx-auto text-[#DCC5C5] w-10 h-10 mb-2"/><h3 className="font-serif text-2xl text-stone-800">Unas palabras</h3></div>
                            <div className="bg-white p-1 rounded-xl border border-stone-200 shadow-sm"><textarea value={loveMessage} onChange={(e)=>setLoveMessage(e.target.value)} placeholder="Escribe aquí..." className="w-full h-32 p-4 rounded-lg bg-transparent outline-none font-serif text-stone-700 resize-none text-base"/></div>
                            <div className="space-y-3"><button onClick={handleFinalSend} disabled={isConfirming} className="w-full bg-[#2C3E2E] text-[#F2F0E9] py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg uppercase tracking-widest text-xs">{isConfirming?<Loader2 className="animate-spin w-5 h-5"/>:<><span>Enviar Confirmación</span><MessageCircle className="w-4 h-4"/></>}</button><button onClick={()=>setStep(2)} disabled={isConfirming} className="w-full text-center text-xs text-stone-400 hover:text-stone-600 font-bold uppercase tracking-wider">Volver</button></div>
                        </motion.div>
                     )}
                  </>
              )}

              {/* --- ESTADO FINAL: TICKET Y DESCARGA --- */}
              {isFinished && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }} 
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  
                  {ticketCount > 0 ? (
                    <div className="bg-[#EAE7DF]">
                        {/* Header Compacto Éxito */}
                        <div className="bg-green-600 p-3 text-center flex items-center justify-center gap-2 shadow-sm relative z-10">
                            <CheckCircle2 size={16} className="text-white" />
                            <p className="text-white text-xs font-bold uppercase tracking-widest">
                                Asistencia Confirmada
                            </p>
                        </div>

                        <div className="p-4">
                            <TicketReveal>
                                <div className="shadow-2xl rounded-xl overflow-hidden">
                                    {/* Ticket VISIBLE (Diseño web compacto) */}
                                    <DigitalTicket guest={updatedGuestData} />
                                </div>
                            </TicketReveal>
                            
                            {/* BOTÓN DE DESCARGA PDF */}
                            <div className="mt-6 flex justify-center">
                                <button
                                    onClick={handleDownloadPDF}
                                    disabled={isDownloading}
                                    className="flex items-center gap-2 bg-[#2C3E2E] text-[#F2F0E9] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg hover:bg-black transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isDownloading ? (
                                        <>
                                            <Loader2 size={16} className="animate-spin" />
                                            Generando...
                                        </>
                                    ) : (
                                        <>
                                            <Download size={16} />
                                            Guardar Pase PDF
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                  ) : (
                    <div className="py-12 px-6 text-center">
                        <div className="mx-auto w-16 h-16 bg-[#f5f5f4] rounded-full flex items-center justify-center mb-4">
                           <Heart className="text-[#a8a29e] w-8 h-8" strokeWidth={1} />
                        </div>
                        <h3 className="font-serif text-xl text-[#44403c] mb-2">Gracias por avisar</h3>
                        <p className="text-[#78716c] max-w-xs mx-auto text-sm font-light leading-relaxed">
                          Lamentamos que no puedan acompañarnos.
                        </p>
                    </div>
                  )}

                  <div className="bg-[#FDFBF7] p-2 text-center border-t border-[#e7e5e4]">
                    <button 
                      onClick={handleEdit}
                      className="text-[#a8a29e] hover:text-[#57534e] text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 mx-auto transition-colors"
                    >
                      <Edit2 size={10} />
                      Modificar
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