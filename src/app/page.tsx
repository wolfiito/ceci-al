import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { GuestData, EventData } from "@/types/wedding";

// Components
import HeroController from "@/components/HeroController"; // <--- IMPORTAMOS EL CONTROLADOR
import Introduction from "@/components/Introduction";
import Countdown from "@/components/Countdown";
import Timeline from "@/components/Timeline";
import GalleryMarquee from "@/components/GalleryMarquee";
import Location from "@/components/Location";
import DressCode from "@/components/DressCode";
import Gifts from "@/components/Gifts";
import RSVPSection from "@/components/RSVPSection";
import FormalInvitation from "@/components/FormalInvitation";
import ParallaxDivider from "@/components/ParallaxDivider";
import GlobalBackground from "@/components/GlobalBackground";
import EnvelopeOverlay from "@/components/EnvelopeOverlay";

const sanitizeData = (data: DocumentData) => {
  if (!data) return null;
  return JSON.parse(JSON.stringify(data));
};

async function getInvitationData(ticketId: string | undefined) {
  if (!ticketId) return null;
  try {
    const guestRef = doc(db, "guests", ticketId);
    const guestSnap = await getDoc(guestRef);
    if (!guestSnap.exists()) return null;

    const rawGuest = guestSnap.data();
    const guest = sanitizeData(rawGuest) as GuestData;
    const guestWithId = { ...guest, id: guestSnap.id };

    const eventRef = doc(db, "events", rawGuest.eventId);
    const eventSnap = await getDoc(eventRef);
    const event = eventSnap.exists() ? sanitizeData(eventSnap.data()) as EventData : null;

    return { guestData: guestWithId, eventData: event };
  } catch (error) {
    console.error("Error fetching invitation:", error);
    return null;
  }
}

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const ticketId = typeof resolvedParams.ticket === "string" ? resolvedParams.ticket : undefined;
  const data = await getInvitationData(ticketId);
  
  if (!data) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] flex flex-col items-center justify-center text-wedding-dark p-4 text-center">
        <h1 className="font-serif text-3xl mb-4">Invitación no encontrada</h1>
      </div>
    );
  }

  const { guestData, eventData } = data;
  const eventNames = eventData?.name || "Ceci & Alejandro";
  const eventDate = eventData?.date || "2026-05-09";

  return (
    <main className="w-full bg-transparent relative">
        {/* El GlobalBackground se queda aquí, independiente */}
        <GlobalBackground />
        

        {/* --- CAPA 1: CONTENIDO SCROLLABLE --- */}
        <div className="relative z-10">
            
            {/* 1. HERO CONTROLLER (Maneja Sobre + Hero + Animación) */}
            {/* Sustituimos <EnvelopeOverlay> y <Hero> por esto: */}
            <HeroController names={eventNames} date={eventDate} />

            {/* 2. TARJETA SÓLIDA (Intro + Countdown + Invitación) */}
            <div className="bg-wedding-light shadow-2xl overflow-hidden">
                <Introduction />
                <Countdown targetDate={eventDate} names={eventNames} />
                <FormalInvitation 
                    guestName={guestData?.familyName || "Amigos"} 
                    type={guestData?.type || 'family'}
                />
            </div>

            {/* 3. VENTANA DE REVEAL (Espacio Transparente) */}
            <div className="h-[100vh] w-full bg-transparent pointer-events-none" />

            {/* 4. TARJETA SÓLIDA 2 (Resto del contenido) */}
            <div className="bg-white shadow-[0_-25px_60px_rgba(0,0,0,0.2)] rounded-t-[2.5rem] -mt-20 relative">
                <Timeline items={eventData?.timeline} />
                {/* <ParallaxDivider /> */}
                <GalleryMarquee />
                <Location 
                    locationName={eventData?.locationName}
                    address={eventData?.address}
                    googleMapsUrl={eventData?.googleMapsUrl}
                    wazeUrl={eventData?.wazeUrl}
                />
                
                <div className="bg-[#F9F5F0] py-16 shadow-inner relative">
                    <DressCode />
                    <div className="my-10" />
                    <Gifts gifts={eventData?.gifts} />
                </div>
                
                <RSVPSection 
                  guestData={guestData} 
                  eventNames={eventNames} 
                  eventDate={eventDate} 
                />
                
                <footer className="text-center py-12 bg-black text-white/60 text-sm">
                  <p className="font-serif text-2xl mb-2 text-white">{eventNames}</p>
                </footer>
            </div>
        </div>
    </main>
  );
}