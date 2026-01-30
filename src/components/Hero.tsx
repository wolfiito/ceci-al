"use client";
import { ChevronDown } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface HeroProps {
  names: string;
  date: string;
  startAnimation?: boolean; 
}

const DUSTY_PINK_TEXT = "text-[#DCC5C5]";

export default function Hero({ names, date, startAnimation = false }: HeroProps) {
  const nameArray = names.split(/&| y /i).map(n => n.trim());
  const name1 = nameArray[0] || "Ceci";
  const name2 = nameArray[1] || "Alejandro";
  const formattedDate = date ? date.split("-").reverse().join(" . ") : "09 . 05 . 2026";

  const blurIn: Variants = {
    hidden: { filter: "blur(10px)", opacity: 0, scale: 0.95 },
    visible: { 
        filter: "blur(0px)", 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.9, ease: "easeOut" }
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-transparent">
      
      <div className="relative z-10 w-full text-center flex flex-col items-center h-full justify-center">
        
        {/* Contenedor de nombres */}
        <div className="flex flex-col items-center -mt-74 md:-mt-70 justify-center relative">
          
          {/* NOMBRE 1 */}
          <motion.h1 
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"} 
            variants={blurIn}
            className="relative z-10 font-(family-name:--font-alex) text-7xl md:text-8xl lg:text-[7rem] text-[#F2F0E9] drop-shadow-sm pointer-events-none leading-none"
          >
            {name1}
          </motion.h1>

          {/* BLOQUE CENTRAL (&) */}
          <motion.div 
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"} 
            variants={blurIn}
            transition={{ delay: 0.2 }} 
            className="relative z-0 flex items-center justify-center gap-4 w-full max-w-[90vw] md:translate-x-0" 
          >
            <div className={`h-0.5 w-10 md:w-32 bg-[#DCC5C5]`} />
            <span className={`font-(family-name:--font-bodoni) italic ${DUSTY_PINK_TEXT} text-3xl -mt-5 md:text-4xl select-none`}>
              &
            </span>
            <div className={`h-0.5 w-10 md:w-32 bg-[#DCC5C5]`} />
          </motion.div>

          {/* NOMBRE 2 */}
          <motion.h1 
            initial="hidden"
            animate={startAnimation ? "visible" : "hidden"} 
            variants={blurIn}
            transition={{ delay: 0.2}} 
            // TRADUCCIÓN DE TU STYLE:
            // marginTop: '-10px' -> -mt-2 -> md:-mt-6
            className="relative z-10 font-(family-name:--font-alex) text-7xl md:text-8xl lg:text-[7rem] text-[#F2F0E9] drop-shadow-sm pointer-events-none leading-none" 
          >
            {name2}
          </motion.h1>

        </div>

        {/* FECHA */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={startAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
            className="relative z-20"
        >
          <span className={`text-2xl md:text-3xl font-bold font-(family-name:--font-bodoni) italic ${DUSTY_PINK_TEXT} uppercase tracking-widest`}>
            {formattedDate}
          </span>
        </motion.div>
      </div>

      {/* SCROLL */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2 }}
        className={`absolute bottom-8 z-30 ${DUSTY_PINK_TEXT} opacity-70`}
      >
           <motion.div
             animate={{ y: [0, 6, 0] }} 
             transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
           >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-sm md:text-base uppercase tracking-widest opacity-80">Scroll</span>
                    <ChevronDown size={32} className="md:w-10 md:h-10" strokeWidth={2} />
                </div>
           </motion.div>
      </motion.div>
    </div>
  );
}