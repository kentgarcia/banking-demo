"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export function EkycContent({ onEkycComplete }: { onEkycComplete: () => void }) {
  const [status, setStatus] = React.useState<"idle" | "scanning">("idle");
  const [progress, setProgress] = React.useState(0);

  const handleUpload = () => {
    setStatus("scanning");
  };

  React.useEffect(() => {
    if (status === "scanning") {
      setProgress(0);
      const timer = setTimeout(() => setProgress(100), 100);
      const completionTimer = setTimeout(() => {
        onEkycComplete();
      }, 3000);
      return () => {
        clearTimeout(timer);
        clearTimeout(completionTimer);
      };
    }
  }, [status, onEkycComplete]);

  return (
    <main className="flex h-full flex-col px-5 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Verify Your Identity</h1>
        <p className="mt-2 text-base text-neutral-300">
          For your security, please upload a government-issued ID.
        </p>
      </motion.div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {status === "idle" ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full text-center"
            >
              <div
                onClick={handleUpload}
                className="relative cursor-pointer rounded-2xl border-2 border-dashed border-white/30 bg-white/5 p-8 transition-colors hover:bg-white/10"
              >
                <motion.div 
                  className="absolute inset-0 rounded-2xl border-2 border-lime-400"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <UploadCloud className="mx-auto h-12 w-12 text-lime-300" />
                <p className="mt-4 font-semibold">Tap to upload your ID</p>
                <p className="text-xs text-neutral-400">or use camera</p>
              </div>
              <div className="mt-6 text-left">
                <p className="text-sm font-semibold text-neutral-300">We accept:</p>
                <ul className="mt-2 space-y-1 text-xs text-neutral-400 list-disc list-inside">
                  <li>Passport, Driver's License</li>
                  <li>UMID, PhilSys ID (National ID)</li>
                  <li>Postal ID</li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center"
            >
              <div className="relative h-40 w-64">
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <svg width="256" height="160" viewBox="0 0 256 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                        <rect width="256" height="160" rx="12" fill="#4A5568"/>
                        <rect x="20" y="25" width="50" height="60" rx="4" fill="#718096"/>
                        <rect x="82" y="40" width="112" height="10" rx="5" fill="#A0AEC0"/>
                        <rect x="82" y="60" width="140" height="10" rx="5" fill="#A0AEC0"/>
                        <rect x="20" y="100" width="216" height="8" rx="4" fill="#718096"/>
                        <rect x="20" y="118" width="154" height="8" rx="4" fill="#718096"/>
                    </svg>
                  <motion.div 
                    className="absolute inset-x-0 h-1 bg-lime-300/80 shadow-[0_0_10px_2px_#A3E635]"
                    style={{ y: '-100%' }}
                    animate={{ y: '160px' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              <p className="mt-4 font-semibold">Scanning ID...</p>
              <Progress value={progress} className="mt-2 h-2 w-64 bg-white/10" indicatorClassName="bg-lime-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="h-14 pb-4" />
    </main>
  );
}
