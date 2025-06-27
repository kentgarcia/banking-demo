"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

export function FaceVerificationContent({ onComplete }: { onComplete: () => void }) {
  const [status, setStatus] = React.useState<"positioning" | "scanning" | "scanned">("positioning");

  React.useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    if (status === "positioning") {
      timers.push(setTimeout(() => setStatus("scanning"), 1500));
    } else if (status === "scanning") {
      // Simulate scan and shutter effect
      timers.push(setTimeout(() => setStatus("scanned"), 2500));
    } else if (status === "scanned") {
      // Transition after showing success
      timers.push(setTimeout(onComplete, 2000));
    }
    return () => timers.forEach(clearTimeout);
  }, [status, onComplete]);

  return (
    <main className="flex h-full flex-col items-center justify-center px-5 text-center">
      <motion.div
        layout
        className="relative h-64 w-64"
      >
        <div className="h-full w-full rounded-full border-4 border-white/20 bg-white/5 overflow-hidden flex items-center justify-center">
            <Image 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User Face for verification"
                width={256} 
                height={256} 
                className="object-cover h-full w-full" 
            />
        </div>
        {/* Shutter effect */}
        {status === 'scanning' && (
             <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
             />
        )}
        {status === 'scanning' && (
            <>
                <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-lime-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div 
                    className="absolute inset-x-0 h-1 bg-lime-300/80 shadow-[0_0_10px_2px_#A3E635]"
                    initial={{ y: 0 }}
                    animate={{ y: 256 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                />
            </>
        )}
        {status === 'scanned' && (
            <motion.div 
                className="absolute inset-0 flex items-center justify-center rounded-full bg-green-500/50 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Check className="h-32 w-32 text-white" />
            </motion.div>
        )}
      </motion.div>
      <div className="mt-8 h-12">
        <AnimatePresence mode="wait">
            <motion.div
                key={status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                {status === "positioning" && <p className="text-lg text-neutral-300">Look straight for a moment...</p>}
                {status === "scanning" && <p className="text-lg text-lime-300">Analyzing...</p>}
                {status === "scanned" && (
                    <motion.p 
                        className="text-xl font-bold text-green-400"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        ✅ Match Success: 95%
                    </motion.p>
                )}
            </motion.div>
        </AnimatePresence>
      </div>
      <footer className="h-14 pb-4" />
    </main>
  );
}
