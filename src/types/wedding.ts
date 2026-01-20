// src/types/wedding.ts

export interface GiftRegistry {
  id: string;
  store: string;
  url: string;
}

export interface GiftsData {
  bankAccount?: {
    bankName: string;
    clabe: string;
    holder: string;
  };
  registries?: GiftRegistry[]; // Para links como Amazon, Liverpool, etc.
  cashInstructions?: string;   // Para "Lluvia de sobres"
}

export interface GuestMember {
  name: string;
  isConfirmed: boolean;
  tableId?: string | null;
}


export interface TimelineItem {
  id: string;
  time: string;
  title: string;
  description: string;
  icon: string;
}

export interface GuestData {
  id: string;
  eventId: string;
  familyName: string;
  type: 'family' | 'individual';
  contactEmail?: string;
  contactPhone?: string;
  members: GuestMember[];
  status: 'pending' | 'confirmed' | 'declined';
  hasArrived?: boolean;
  message?: string;
  isLongDistance?: boolean;
}

export interface EventData {
  id?: string;
  name: string;
  client: string;
  date: string;
  guests: number;
  status: 'active' | 'disabled' | 'pending' | 'finished';
  invitationUrl?: string;
  timeline?: TimelineItem[];
  locationName?: string;
  address?: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
  gifts?: GiftsData;
}