"use client";

import React, { createContext, useContext, useState } from "react";

interface WeddingContextType {
  isEnvelopeOpen: boolean;
  openEnvelope: () => void;
  isPlaying: boolean;
  togglePlay: () => void;
}

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

export const WeddingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false); // Empieza cerrado
  const [isPlaying, setIsPlaying] = useState(false);

  const openEnvelope = () => {
    setIsEnvelopeOpen(true);
    setIsPlaying(true); // Al abrir, empieza la música
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <WeddingContext.Provider value={{ isEnvelopeOpen, openEnvelope, isPlaying, togglePlay }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) throw new Error("useWedding must be used within a WeddingProvider");
  return context;
};