// src/components/Gifts.tsx
"use client";

import { motion } from "framer-motion";
import { Copy, Check, Gift, Landmark } from "lucide-react";
import { useState } from "react";

interface GiftsProps {
  gifts?: {
    bankAccount?: { bankName: string; clabe: string; holder: string };
    registries?: { id: string; store: string; url: string }[];
    cashInstructions?: string;
  };
}

export default function Gifts({ gifts }: GiftsProps) {
  const [copied, setCopied] = useState(false);

  if (!gifts) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-32 bg-[#Fdfbf7] px-6">
      <div className="max-w-4xl mx-auto text-center space-y-20">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <Gift className="w-8 h-8 text-wedding-secondary/40 mx-auto" />
          <h2 className="font-serif text-5xl text-wedding-dark italic">Mesa de Regalos</h2>
          <p className="font-sans text-wedding-dark/50 max-w-lg mx-auto leading-relaxed italic">
            Su presencia es nuestro mejor regalo, pero si desean tener un detalle con nosotros...
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* TRANSFERENCIA */}
          {gifts.bankAccount?.clabe && (
            <div className="space-y-8 text-left border-l border-wedding-secondary/10 pl-8">
              <h3 className="font-serif text-2xl text-wedding-dark uppercase tracking-widest">Transferencia</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-wedding-secondary mb-1">Banco</p>
                  <p className="font-serif text-xl text-wedding-dark">{gifts.bankAccount.bankName}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-wedding-secondary mb-1">Titular</p>
                  <p className="font-serif text-xl text-wedding-dark">{gifts.bankAccount.holder}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-wedding-secondary/10 flex justify-between items-center group">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-wedding-secondary mb-1">CLABE</p>
                    <p className="font-mono text-lg text-wedding-dark tracking-tighter">{gifts.bankAccount.clabe}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(gifts.bankAccount!.clabe)}
                    className="p-3 bg-stone-50 rounded-full text-wedding-secondary hover:bg-wedding-secondary hover:text-white transition-all shadow-sm"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* MESAS EXTERNAS */}
          {gifts.registries && gifts.registries.length > 0 && (
            <div className="space-y-8 text-left border-l border-wedding-secondary/10 pl-8">
              <h3 className="font-serif text-2xl text-wedding-dark uppercase tracking-widest">Mesas de Regalos</h3>
              <div className="grid grid-cols-1 gap-4">
                {gifts.registries.map((reg) => (
                  <a 
                    key={reg.id}
                    href={reg.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between p-6 bg-white border border-wedding-secondary/10 rounded-xl hover:border-wedding-secondary/40 transition-all shadow-sm"
                  >
                    <span className="font-serif text-xl text-wedding-dark group-hover:text-wedding-secondary transition-colors">
                      {reg.store}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-wedding-secondary/10 flex items-center justify-center text-wedding-secondary group-hover:bg-wedding-secondary group-hover:text-white transition-all">
                      <Landmark size={18} strokeWidth={1.5} />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}