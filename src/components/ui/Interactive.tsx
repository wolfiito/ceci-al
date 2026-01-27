"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InteractiveProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  isCard?: boolean; 
}

export default function Interactive({ 
  children, 
  className, 
  isCard = false,
  ...props 
}: InteractiveProps) {

  const buttonVariants = {
    hover: { scale: 1.05, filter: "brightness(1.05)" },
    tap: { scale: 0.95, filter: "brightness(0.95)" }
  };

  const cardVariants = {
    hover: { y: -5, scale: 1.02, boxShadow: "0px 15px 30px rgba(0,0,0,0.1)" },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      whileHover="hover"
      whileTap="tap"
      variants={isCard ? cardVariants : buttonVariants}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}