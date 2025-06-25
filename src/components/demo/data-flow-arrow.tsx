"use client";

import { motion } from "framer-motion";
import Image from "next/image";

function TemenosLogo() {
  return (
    <Image
      src="/temenos-logo.svg"
      alt="Temenos Logo"
      width={195}
      height={32}
    />
  );
}

function DynamicsLogo() {
  return (
    <Image
      src="/dynamics-logo.svg"
      alt="Dynamics 365 Logo"
      width={40}
      height={40}
    />
  );
}

export function DataFlowArrow() {
  const arrowVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut', delay: 1.2 },
    },
  };

  return (
    <motion.div
      className="hidden lg:flex flex-row items-center justify-center self-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 0.8, duration: 0.5 } }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
    >
      <div className="flex flex-row items-center gap-4 p-4 text-center">
        <TemenosLogo />
        <svg
          width="100"
          height="40"
          viewBox="0 0 100 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-4"
        >
          <motion.path
            d="M5 20 H 95 M80 5 L 95 20 L 80 35"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={arrowVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
        <DynamicsLogo />
      </div>
    </motion.div>
  );
}
