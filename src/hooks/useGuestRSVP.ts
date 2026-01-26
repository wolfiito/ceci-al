// src/hooks/useGuestRSVP.ts
import { useState, useEffect, useCallback } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GuestData, GuestMember } from "@/types/wedding";

export function useGuestRSVP(guestData: GuestData | null) {
  // --- ESTADOS ---
  const [step, setStep] = useState(1);
  const [isConfirming, setIsConfirming] = useState(false);
  // Estado inicial basado en si ya confirmó o rechazó previamente
  const [isFinished, setIsFinished] = useState(
    guestData?.status === "confirmed" || guestData?.status === "declined"
  );
  
  const [ticketCount, setTicketCount] = useState(guestData?.members.length || 0);
  const [attendance, setAttendance] = useState<Record<string, boolean>>({});
  const [loveMessage, setLoveMessage] = useState(guestData?.message || "");
  const [pdfTableNames, setPdfTableNames] = useState<Record<string, string>>({});

  // Derivados
  const maxTickets = guestData?.members.length || 0;
  const displayTitle = guestData
    ? guestData.type === "individual"
      ? guestData.familyName
      : `Familia ${guestData.familyName}`
    : "";

  // --- EFECTOS ---

  // 1. Sincronizar estado local con la data inicial
  useEffect(() => {
    if (guestData?.members) {
      const initialAttendance = guestData.members.reduce<Record<string, boolean>>(
        (acc, m) => ({
          ...acc,
          [m.name]: guestData.status === "confirmed" ? m.isConfirmed : true,
        }),
        {}
      );
      setAttendance(initialAttendance);

      if (guestData.status === "confirmed") {
        const confirmedCount = guestData.members.filter((m) => m.isConfirmed).length;
        setTicketCount(confirmedCount);
      } else if (guestData.status === "declined") {
        setTicketCount(0);
      }
    }
  }, [guestData]);

  // 2. Cargar nombres de mesas (solo cuando ha terminado y es necesario para el PDF)
  useEffect(() => {
    if (isFinished && guestData?.members) {
      const loadTables = async () => {
        const confirmedMembers = guestData.members.filter(
          (m) => attendance[m.name] ?? m.isConfirmed
        );
        const uniqueIds = Array.from(
          new Set(confirmedMembers.map((m) => m.tableId).filter(Boolean) as string[])
        );

        if (uniqueIds.length === 0) return;

        const names: Record<string, string> = {};
        await Promise.all(
          uniqueIds.map(async (id) => {
            try {
              const snap = await getDoc(doc(db, "tables", id));
              names[id] = snap.exists() ? snap.data().name : "Asignada";
            } catch {
              names[id] = "TBA";
            }
          })
        );
        setPdfTableNames(names);
      };
      loadTables();
    }
  }, [isFinished, guestData, attendance]);

  // --- HANDLERS (LÓGICA DE NEGOCIO) ---

  const toggleMember = useCallback((name: string) => {
    setAttendance((prev) => {
      const isCurrentlySelected = !!prev[name];
      const currentCount = Object.values(prev).filter(Boolean).length;
      
      // Regla de negocio: No permitir seleccionar más que el ticketCount definido
      if (!isCurrentlySelected && currentCount >= ticketCount) return prev;
      
      return { ...prev, [name]: !isCurrentlySelected };
    });
  }, [ticketCount]);

  const updateAttendanceMode = (mode: "all" | "none") => {
      if (!guestData?.members) return;
      const newVal = mode === "all";
      const newMap = guestData.members.reduce<Record<string, boolean>>(
          (acc, m) => ({ ...acc, [m.name]: newVal }), 
          {}
      );
      setAttendance(newMap);
  };

  const handleEdit = async () => {
    // Optimistic UI update
    setIsFinished(false);
    setStep(1);
    updateAttendanceMode("none"); // Reset local selection
    setTicketCount(0);

    if (guestData?.id) {
      try {
        // Reset en Firebase a "pending"
        const guestRef = doc(db, "guests", guestData.id);
        const resetMembers = guestData.members.map((m) => ({ ...m, isConfirmed: false }));
        await updateDoc(guestRef, {
          status: "pending",
          members: resetMembers,
        });
      } catch (error) {
        console.error("Error reseteando status:", error);
        // Aquí podrías manejar un rollback si fuera crítico
      }
    }
  };

  const submitRSVP = async (): Promise<boolean> => {
    if (!guestData?.id) return false;
    setIsConfirming(true);

    try {
      const guestRef = doc(db, "guests", guestData.id);
      const updatedMembers: GuestMember[] = guestData.members.map((m) => ({
        ...m,
        isConfirmed: attendance[m.name] || false,
      }));
      
      const newStatus = ticketCount > 0 ? "confirmed" : "declined";

      await updateDoc(guestRef, {
        status: newStatus,
        members: updatedMembers,
        message: loveMessage,
      });

      setIsFinished(true);
      return true; // Éxito
    } catch (error) {
      console.error("Error updating RSVP:", error);
      return false; // Fallo
    } finally {
      setIsConfirming(false);
    }
  };

  return {
    // State
    step, setStep,
    isConfirming,
    isFinished,
    ticketCount, setTicketCount,
    attendance,
    loveMessage, setLoveMessage,
    pdfTableNames,
    
    // Computed
    maxTickets,
    displayTitle,
    
    // Actions
    toggleMember,
    updateAttendanceMode,
    handleEdit,
    submitRSVP,
  };
}