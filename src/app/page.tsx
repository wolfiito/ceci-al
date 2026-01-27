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
        <GlobalBackground />
        <div className="relative z-10">
          <HeroController names={eventNames} date={eventDate} />
          <Introduction />
          <Countdown targetDate={eventDate} names={eventNames} />
          <FormalInvitation guestName={guestData?.familyName || "Amigos"} type={guestData?.type || 'family'}/>
          <div className="h-screen w-full bg-transparent pointer-events-none" />
            <div className="shadow-[0_-25px_60px_rgba(0,0,0,0.2)] rounded-t-[2.5rem] -mt-20 relative">
                <div className="bg-[#05160293]">
                  <Timeline items={eventData?.timeline} />
                </div>
                <div className="bg-white">
                  <GalleryMarquee />
                </div>
                <Location locationName={eventData?.locationName} address={eventData?.address} googleMapsUrl={eventData?.googleMapsUrl} wazeUrl={eventData?.wazeUrl}/>
                <DressCode />
                <Gifts gifts={eventData?.gifts} />
                
                <RSVPSection 
                  guestData={guestData} 
                  eventNames={eventNames} 
                  eventDate={eventDate} 
                />
                
                <footer className="text-center py-8 bg-black text-white/60 text-l">
                  <p className="font-(family-name:--font-bodoni)">Con amor {eventNames} </p>
                </footer>
            </div>
        </div>
    </main>
  );
}