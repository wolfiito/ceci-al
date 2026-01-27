"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    filter: "blur(5px)" 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: .9, 
      ease: "easeOut" 
    }
  },
};

export default function Introduction() {
  return (
    <section 
        className="relative w-full z-20 py-12 px-6 flex justify-center items-center overflow-hidden"
        style={{ backgroundColor: '#FDFBF7' }} 
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} 
        className="flex flex-col items-center relative z-10 max-w-3xl"
      >
        
        {/* --- IMAGEN 1: CORAZÓN --- */}
        <motion.div 
            variants={itemVariants} 
            className="relative flex justify-center z-10"
            style={{ marginBottom: '-30px' }} 
        >
            <Image
                src="/images/iconos_corazon.png"
                alt="Corazón Decorativo"
                width={150} 
                height={150}
                className="w-auto h-auto object-contain drop-shadow-sm"style={{ marginTop: '-60px' }}
                priority
            />
        </motion.div>

        {/* --- IMAGEN 2: VERSÍCULO --- */}
        <motion.div 
            variants={itemVariants} 
            className="relative flex justify-center z-20"
            style={{ marginBottom: '-60px', marginTop: '-120px'}}
        >
            <Image
                src="/images/iconos_versiculo.png"
                alt="Versículo Bíblico"
                width={500} 
                height={200}
                className="w-auto h-auto object-contain drop-shadow-sm" 
            />
        </motion.div>

        {/* --- IMAGEN 3: TÍTULOS --- */}
        <motion.div 
            variants={itemVariants} 
            className="relative flex justify-center z-30" style={{ marginBottom: '-120px', marginTop: '-190px'}}
        >
            <Image
                src="/images/iconos_Titulos-14.png"
                alt="Títulos"
                width={350} 
                height={150}
                className="w-auto h-auto object-contain drop-shadow-sm"
            />
        </motion.div>

      </motion.div>
    </section>
  );
}