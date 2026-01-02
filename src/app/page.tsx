"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GuestData, EventData } from "@/types/wedding"; // Importamos los tipos

// Importaciones de tus componentes
import Hero from "@/components/Hero";
import Introduction from "@/components/Introduction";
import Countdown from "@/components/Countdown";
import MusicPlayer from "@/components/MusicPlayer";
import Timeline from "@/components/Timeline";
import GalleryMarquee from "@/components/GalleryMarquee";
import Location from "@/components/Location";
import DressCode from "@/components/DressCode";
import Gifts from "@/components/Gifts";
import RSVPSection from "@/components/RSVPSection";
import FormalInvitation from "@/components/FormalInvitation";
import ParallaxDivider from "@/components/ParallaxDivider";
import ScenicReveal from "@/components/ScenicReveal";

function InvitationContent() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticket");

  const [guestData, setGuestData] = useState<GuestData | null>(null);
  const [eventData, setEventData] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!ticketId) {
        setLoading(false);
        return;
      }

      try {
        const guestRef = doc(db, "guests", ticketId);
        const guestSnap = await getDoc(guestRef);

        if (guestSnap.exists()) {
          const guest = guestSnap.data() as GuestData;
          setGuestData({ ...guest, id: guestSnap.id });

          const eventRef = doc(db, "events", guest.eventId);
          const eventSnap = await getDoc(eventRef);
          
          if (eventSnap.exists()) {
            setEventData(eventSnap.data() as EventData);
          }
        }
      } catch (error) {
        console.error("Error cargando invitación:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [ticketId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] flex flex-col items-center justify-center">
        <p className="font-serif text-2xl animate-pulse text-gray-400">Preparando tu invitación...</p>
      </div>
    );
  }

  const eventNames = eventData?.name || "Ceci & Alejandro";
  const eventDate = eventData?.date || "2026-05-09";

  return (
    <main className="min-h-screen relative bg-wedding-light/0">
      <MusicPlayer />
      
      <div className="fixed top-0 left-0 w-full h-[100svh] z-0 pointer-events-none">
         <Hero names={eventNames} date={eventDate} />
      </div>

      <ScenicReveal />

      <div className="relative z-20">
        <div className="h-[100svh] w-full bg-transparent" />

        <div className="bg-wedding-light shadow-[0_-10px_30px_rgba(0,0,0,0.1)] relative">
            <Introduction familyName={guestData?.familyName} />
            <Countdown targetDate={eventDate} names={eventNames} />
            <FormalInvitation guestName={guestData?.familyName || "Familia y Amigos"} />
            <div className="pb-20 bg-wedding-light"></div>
        </div>

        <div className="h-[85vh] w-full bg-transparent pointer-events-none relative" />

        <div className="relative bg-white shadow-[0_-25px_60px_rgba(0,0,0,0.2)]">
           <Timeline items={eventData?.timeline} />
           <ParallaxDivider />
           <GalleryMarquee />
           <Location 
              locationName={eventData?.locationName}
              address={eventData?.address}
              googleMapsUrl={eventData?.googleMapsUrl}
              wazeUrl={eventData?.wazeUrl}
            />
           
           <div className="bg-[#F9F5F0] py-16 shadow-inner relative z-10">
              <DressCode />
              <div className="my-10" />
              <Gifts gifts={eventData?.gifts} />
           </div>
           
           <RSVPSection guestData={guestData} eventNames={eventNames} eventDate={eventDate} />
           
           <footer className="text-center py-12 bg-black text-white/60 text-sm">
             <p className="font-serif text-2xl mb-2 text-white">{eventNames}</p>
           </footer>
        </div>
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F9F5F0]" />}>
      <InvitationContent />
    </Suspense>
  );
}