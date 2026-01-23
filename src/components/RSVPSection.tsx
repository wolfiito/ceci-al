"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic"; 
import { 
  MessageCircle, CheckCircle2, Loader2, Heart, Users, Minus, Plus, Edit2,
  MonitorPlay, Download 
} from "lucide-react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GuestData, GuestMember } from "@/types/wedding";
import { TicketReveal } from "@/components/TicketReveal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PdfTicketTemplate from "@/components/PdfTicketTemplate";
import Interactive from "@/components/ui/Interactive";

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
  const [step, setStep] = useState(1);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isFinished, setIsFinished] = useState(guestData?.status === 'confirmed' || guestData?.status === 'declined');
  
  const [ticketCount, setTicketCount] = useState(guestData?.members.length || 0);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loveMessage, setLoveMessage] = useState("");
  
  const [isDownloading, setIsDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null); 
  const [pdfTableNames, setPdfTableNames] = useState<Record<string, string>>({}); 

  const maxTickets = guestData?.members.length || 0;

  // --- LÓGICA DE NOMBRE (INDIVIDUAL VS FAMILIA) ---
  const displayTitle = guestData 
    ? (guestData.type === 'individual' ? guestData.familyName : `Familia ${guestData.familyName}`)
    : "";

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

  useEffect(() => {
    if (isFinished && guestData?.members) {
        const loadTables = async () => {
            const confirmedMembers = guestData.members.filter(m => 
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

  const handleEdit = async () => {
    // 1. Reseteamos estados visuales inmediatamente para que la UI responda rápido
    setIsFinished(false);
    setStep(1);
    
    // 2. Reseteamos la selección local (todos desmarcados)
    // Si prefieres que se mantengan los que ya estaban, borra esta línea.
    // Pero como pediste "isConfirmed a false", esto los limpia:
    const resetAttendance = guestData?.members.reduce((acc, m) => ({ ...acc, [m.name]: false }), {}) || {};
    setAttendance(resetAttendance);
    setTicketCount(0); // Opcional: resetear contador a 0 o mantenerlo

    // 3. Actualizamos Firebase para "invalidar" el pase anterior
    if (guestData?.id && guestData.members) {
        try {
            const guestRef = doc(db, "guests", guestData.id);
            
            // Ponemos a todos los miembros en false
            const resetMembers = guestData.members.map(m => ({
                ...m,
                isConfirmed: false
            }));

            await updateDoc(guestRef, {
                status: 'pending',     // Regresa a estado pendiente
                members: resetMembers, // Guarda los miembros desmarcados
                // message: ''         // ¿Quieres borrar el mensaje también? Si no, quita esta línea.
            });
            
            console.log("Confirmación reseteada a pending");
        } catch (error) {
            console.error("Error al resetear status:", error);
        }
    }
  };

  const triggerConfetti = async () => {
    const confettiModule = await import("canvas-confetti");
    const confetti = confettiModule.default;
    const duration = 2000;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };
    
    confetti({ ...defaults, particleCount: 50, origin: { y: 0.6 } });
    setTimeout(() => confetti({ ...defaults, particleCount: 50, origin: { y: 0.6 } }), 300);
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

  const handleDownloadPDF = async () => {
    if (!ticketRef.current) return;
    setIsDownloading(true);
    try {
        const canvas = await html2canvas(ticketRef.current, {
            scale: 2, 
            backgroundColor: "#F9F7F2",
            useCORS: true,
            ignoreElements: (element) => element.tagName === 'STYLE' && element.innerHTML.includes('lab(')
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({ 
            orientation: "p", unit: "px", format: [canvas.width / 2, canvas.height / 2] 
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save(`Pase_Boda_${guestData?.familyName.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
        console.error("Error PDF", error);
        alert("Error al generar PDF.");
    } finally {
        setIsDownloading(false);
    }
  };

  if (!guestData) return null;

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

      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <div ref={ticketRef}>
            <PdfTicketTemplate guest={updatedGuestData} tableNames={pdfTableNames} />
        </div>
      </div>

      {/* CARD PRINCIPAL - max-w-lg mantiene el ancho controlado */}
      <div className={`relative z-10 w-full mx-4 transition-all duration-500 ${isFinished ? 'max-w-md' : 'max-w-lg'}`}>
        <motion.div layout className="bg-[#FDFBF7] rounded-[2rem] shadow-2xl overflow-hidden border border-white/20 ring-1 ring-black/5">
          
          {/* HEADER HEADER MÁS COMPACTO (p-6 en vez de p-8) */}
          {!isFinished && (
              <div className="bg-[#2C3E2E] py-4 text-center text-[#F2F0E9] relative overflow-hidden">
                <h2 className="font text-xl italic text-[#DCC5C5]">{displayTitle}</h2>
              </div>
          )}

          {/* CONTENIDO (Padding ajustado) */}
          <div className={`${isFinished ? 'p-0' : 'p-6 md:p-8'}`}>
            <AnimatePresence mode="wait">
              {!isFinished && (
                  <>
                     {/* PASO 1: Cantidad */}
                     {step === 1 && (
                        <motion.div key="step1" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                            <div className="text-center space-y-1">
                                <div className="w-10 h-10 bg-[#2C3E2E]/5 rounded-full flex items-center justify-center mx-auto mb-2 text-[#2C3E2E]"><Users strokeWidth={1.5} size={20} /></div>
                                <h3 className="font-serif text-2xl text-stone-800">¿Cuántos asistirán?</h3>
                                <p className="text-sm text-stone-500 font-light">Reservados: <span className="font-bold text-stone-700">{maxTickets}</span></p>
                            </div>
                            
                            {/* Control de número */}
                            <div className="flex items-center justify-center gap-6">
                              <Interactive className="rounded-full">
                                <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-all active:scale-90"><Minus className="w-4 h-4" /></button>
                              </Interactive>
                                <span className="text-5xl font-serif text-[#2C3E2E] tabular-nums w-16 text-center">{ticketCount}</span>
                              <Interactive className="rounded-full">
                                <button onClick={() => setTicketCount(Math.min(maxTickets, ticketCount + 1))} className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-all active:scale-90"><Plus className="w-4 h-4" /></button>
                              </Interactive>
                            </div>

                            <div className="space-y-3 pt-2">
                              <Interactive className="w-full">
                                <button onClick={handleConfirmClick} className="w-full bg-[#2C3E2E] text-[#F2F0E9] py-3.5 text-xs uppercase tracking-widest font-bold rounded-xl shadow-lg hover:bg-[#1a251b] transition-all">Confirmar Asistencia</button>
                              </Interactive>
                              <Interactive className="w-full"> 
                                <button onClick={handleNoAsistireClick} className="w-full py-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-600 transition-colors">Lamentablemente no podremos asistir</button>
                              </Interactive>
                            </div>

                             {guestData.isLongDistance && (
                                <div className="mt-4 p-4 bg-[#F9F5F0] border border-[#E8E4D8] rounded-xl flex items-start gap-3">
                                    <div className="text-[#DCC5C5] shrink-0 mt-0.5"><MonitorPlay size={18} /></div>
                                    <div><h4 className="font-serif text-base text-stone-800 mb-1">Entendemos que la distancia lo hace difícil</h4><p className="font-sans text-xs text-stone-500 leading-relaxed text-justify">
                                      Intentaremos habilitar una transmisión de la ceremonia para compartir este momento. En caso de no poder hacerlo, únete a nosotros en oración por el inicio de nuestro matrimonio.
                                    </p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                     )}
                     
                     {/* PASO 2: Selección (AQUI EL SCROLL INTERNO) */}
                     {step === 2 && (
                        <motion.div key="step2" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} exit={{opacity:0, x:-20}} className="space-y-4">
                             <div className="text-center space-y-1">
                                <h3 className="font-serif text-2xl text-stone-800">Selecciona asistentes</h3>
                                <p className="text-xs text-stone-500">Confirma <strong className="text-stone-700">{ticketCount}</strong> personas</p>
                             </div>
                             
                             {/* --- SCROLL CONTAINER: Esto evita que la card crezca infinito --- */}
                             <div className="space-y-2 py-2 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
                                {guestData.members.map(m=>(
                                    <button key={m.name} onClick={()=>toggleMember(m.name)} 
                                        className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all duration-200 
                                        ${attendance[m.name] ? "border-[#2C3E2E]/30 bg-[#2C3E2E]/5" : "border-stone-100 bg-stone-50 opacity-60"}`}>
                                        <span className={`text-sm font-serif ${attendance[m.name]?"text-stone-800 font-medium":"text-stone-400"}`}>{m.name}</span>
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${attendance[m.name]?"bg-[#2C3E2E] text-[#F2F0E9]":"bg-stone-200 text-white"}`}>
                                            {attendance[m.name] && <CheckCircle2 className="w-3 h-3"/>}
                                        </div>
                                    </button>
                                ))}
                             </div>

                             <div className="pt-2">
                                <button onClick={()=>setStep(3)} disabled={Object.values(attendance).filter(Boolean).length!==ticketCount} className="w-full bg-[#2C3E2E] text-[#F2F0E9] py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs disabled:opacity-50 transition-all">Continuar</button>
                                <button onClick={()=>setStep(1)} className="w-full mt-3 text-center text-[10px] text-stone-400 hover:text-stone-600 font-bold uppercase tracking-wider">Volver</button>
                             </div>
                        </motion.div>
                     )}

                     {/* PASO 3: Mensaje */}
                     {step === 3 && (
                        <motion.div key="step3" initial={{opacity:0}} animate={{opacity:1}} className="space-y-5">
                            <div className="text-center space-y-2"><Heart className="mx-auto text-[#DCC5C5] w-8 h-8 mb-1"/><h3 className="font-serif text-2xl text-stone-800">Unas palabras</h3></div>
                            <div className="bg-white p-1 rounded-xl border border-stone-200 shadow-sm"><textarea value={loveMessage} onChange={(e)=>setLoveMessage(e.target.value)} placeholder="Déjanos un mensaje..." className="w-full h-24 p-3 rounded-lg bg-transparent outline-none font-serif text-stone-700 resize-none text-sm"/></div>
                            <div className="space-y-3">
                                <button onClick={handleFinalSend} disabled={isConfirming} className="w-full bg-[#2C3E2E] text-[#F2F0E9] py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest text-xs hover:bg-[#1a251b] transition-all">
                                    {isConfirming ? <Loader2 className="animate-spin w-4 h-4"/> : <><span>Enviar</span><MessageCircle className="w-4 h-4"/></>}
                                </button>
                                <button onClick={()=>setStep(2)} disabled={isConfirming} className="w-full text-center text-[10px] text-stone-400 hover:text-stone-600 font-bold uppercase tracking-wider">Volver</button>
                            </div>
                        </motion.div>
                     )}
                  </>
              )}

              {/* TICKET FINAL */}
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