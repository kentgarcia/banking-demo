"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

function ConfettiPiece({ initial, animate, transition, color }: { initial: any; animate: any; transition: any; color: string; }) {
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{
        backgroundColor: color,
        width: 8,
        height: 16,
        borderRadius: 4,
      }}
      initial={initial}
      animate={animate}
      transition={transition}
    />
  );
}

function Confetti() {
  const colors = ["#a7f3d0", "#d9f99d", "#fde68a", "#fecaca", "#fca5a5"];
  const pieces = React.useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
    initial: { opacity: 1, scale: 1, x: 0, y: 0, rotate: Math.random() * 360 },
    animate: { 
      opacity: 0, 
      scale: 0.5 + Math.random() * 0.5, 
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.2) * 400,
      rotate: Math.random() * 360 + 180,
    },
    transition: { duration: 1.5 + Math.random(), ease: 'easeOut', delay: 0.1 + Math.random() * 0.2 },
    color: colors[i % colors.length],
  })), []);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {pieces.map((piece, i) => (
        <ConfettiPiece key={i} {...piece} />
      ))}
    </div>
  );
}

export function AccountCreatedSuccessScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 rounded-[2rem] bg-white p-5 font-body relative overflow-hidden">
      <Confetti />
      <motion.div
        className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.4,
          type: "spring", 
          stiffness: 260, 
          damping: 15 
        }}
      >
        <Check className="h-16 w-16 text-green-600" />
      </motion.div>
      <motion.h2
        className="text-center text-3xl font-bold z-10 text-neutral-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
      >
        Account Created!
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground max-w-xs z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
      >
        You're now ready to bank smart.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.9 } }}
        className="pt-8 z-10 w-full max-w-xs"
      >
        <Button
          size="lg"
          className="h-14 w-full rounded-full relative overflow-hidden group"
          onClick={onContinue}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
          <span className="relative">Continue</span>
        </Button>
      </motion.div>
    </div>
  );
}
