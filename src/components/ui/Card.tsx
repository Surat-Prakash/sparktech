"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React from "react";

interface CardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, hoverEffect = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? { y: -5 } : {}}
        className={cn(
          "glass-card rounded-2xl p-6 sm:p-8 transition-all duration-300 relative overflow-hidden group",
          hoverEffect && "hover:shadow-[0_8px_30px_rgba(34,211,238,0.15)] hover:border-accent-400/30",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
