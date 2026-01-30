"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

// 1. ANIMACIONES
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
      duration: 2.0, 
      ease: "easeOut" 
    }
  },
};

export default function Introduction() {
  return (
    <section 
        className="relative w-full z-20 h-2/4 "
        style={{ backgroundColor: '#FDFBF7' }} 
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} 
        className=""
      >
        <motion.div 
            variants={itemVariants} 
            className="relative flex justify-center z-10" 
        >
            <Image
                src="/images/iconos_corazon.png"
                alt="Corazón Decorativo"
                width={170} 
                height={170}
                className="w-auto h-auto mt-5 object-contain drop-shadow-sm"
                priority
            />
        </motion.div>

        {/* --- IMAGEN 2: VERSÍCULO --- */}
        <motion.div 
            variants={itemVariants} 
            className="relative flex justify-center z-20"
            >
            <Image
                src="/images/iconos_versiculo.png"
                alt="Versículo Bíblico"
                width={500} 
                height={200}
                className="w-auto h-auto -mt-44 md:-mt-72  drop-shadow-sm" 
            />
        </motion.div>

        {/* --- IMAGEN 3: TÍTULOS --- */}
        <motion.div 
            variants={itemVariants} 
            className="relative flex justify-center z-30" 
        >
            <Image
                src="/images/iconos_Titulos-14.png"
                alt="Títulos"
                width={350} 
                height={150}
                className="w-auto h-auto -mt-74 md:-mt-90 object-contain drop-shadow-sm"
            />
        </motion.div>
      </motion.div>
    </section>
  );
}