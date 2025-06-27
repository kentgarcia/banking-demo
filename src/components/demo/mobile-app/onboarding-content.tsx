"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function CreditCardContent() {
  return (
    <div className="flex h-full flex-col justify-between text-white">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold opacity-80">Security Bank</span>
        <div className="h-7 w-10 rounded-md bg-yellow-400/30 backdrop-blur-sm" />
      </div>
      <div className="flex items-end justify-between">
        <span className="font-mono text-sm tracking-widest opacity-70">
          **** **** **** 1234
        </span>
        <div className="flex">
          <div className="h-7 w-7 rounded-full bg-red-500/90" />
          <div className="-ml-3 h-7 w-7 rounded-full bg-orange-400/80" />
        </div>
      </div>
    </div>
  );
}

export function OnboardingContent({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mt-8">
        <motion.h1
          className="text-4xl font-bold leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome to the
          <br />
          Future of Banking
        </motion.h1>
        <motion.p
          className="mt-4 max-w-xs text-base text-neutral-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Experience cutting-edge features, top-notch security, and instant
          access to your banking made better for you
        </motion.p>
      </div>

      <div className="relative mt-12 h-40 flex-shrink-0">
        <motion.div
          className="absolute top-0 left-1/2 z-20 w-36 -translate-x-1/2 rounded-xl border border-white/10 bg-white/20 p-3 text-center shadow-lg backdrop-blur-md"
          initial={{ opacity: 0, y: 20, rotate: -5 }}
          animate={{ opacity: 1, y: 0, rotate: -5 }}
          transition={{
            delay: 1,
            duration: 0.5,
            type: "spring",
            stiffness: 100,
          }}
        >
          <p className="text-xl font-semibold">$2537.98</p>
          <p className="text-xs text-neutral-200">Balance</p>
        </motion.div>

        <motion.div
          className="absolute top-8 -left-4 h-40 w-64 origin-bottom-right rounded-2xl border border-white/20 bg-green-400/30 p-4 shadow-2xl backdrop-blur-lg"
          initial={{ opacity: 0, x: -50, rotate: -30 }}
          animate={{ opacity: 1, x: 0, rotate: -20 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <CreditCardContent />
        </motion.div>
        <motion.div
          className="absolute top-12 left-8 h-40 w-64 origin-bottom-left rounded-2xl border border-white/20 bg-lime-300/30 p-4 shadow-2xl backdrop-blur-lg"
          initial={{ opacity: 0, x: 50, rotate: 25 }}
          animate={{ opacity: 1, x: 0, rotate: -5 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <CreditCardContent />
        </motion.div>
      </div>

      <footer className="mt-auto flex-1 flex items-end pb-4">
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Button
            size="lg"
            className="h-14 w-full rounded-full bg-lime-300 font-bold text-green-900 shadow-lg shadow-lime-300/30 transition hover:bg-lime-400"
            onClick={onGetStarted}
          >
            Get Started
          </Button>
        </motion.div>
      </footer>
    </div>
  );
}
