"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Send, ReceiptText, TrendingUp, Lock, ArrowRight } from "lucide-react";

export function FeatureCarouselContent({ onComplete }: { onComplete: () => void }) {
  const [slide, setSlide] = React.useState(0);
  const [direction, setDirection] = React.useState(1);

  const features = [
    {
      icon: Send,
      title: "Easy Transfers",
      text: "Move money instantly to anyone, anywhere.",
      color: "text-blue-400",
    },
    {
      icon: ReceiptText,
      title: "Bill Payments",
      text: "Pay your bills on time, every time, hassle-free.",
      color: "text-green-400",
    },
    {
      icon: TrendingUp,
      title: "Investment Insights",
      text: "Grow your wealth with smart, data-driven insights.",
      color: "text-yellow-400",
    },
    {
      icon: Lock,
      title: "Secure 24/7 Access",
      text: "Your finances are protected around the clock.",
      color: "text-purple-400",
    },
  ];

  const paginate = (newDirection: number) => {
    if (slide + newDirection < features.length && slide + newDirection >= 0) {
      setDirection(newDirection);
      setSlide(slide + newDirection);
    }
  };

  const handleNext = () => {
    if (slide < features.length - 1) {
      paginate(1);
    } else {
      onComplete();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  const Icon = features[slide].icon;

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[2rem] bg-white p-5 font-body text-neutral-800">
      <header className="flex items-center justify-end h-8">
        <Button variant="ghost" size="sm" onClick={onComplete}>Skip</Button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center text-center overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x);
              if (swipe > 50) {
                paginate(offset.x < 0 ? 1 : -1);
              }
            }}
            className="absolute flex flex-col items-center justify-center gap-6 w-full px-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, type: 'spring' } }}
            >
              <Icon className={cn("h-24 w-24", features[slide].color)} strokeWidth={1.5} />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
            >
              <h2 className="text-2xl font-bold">{features[slide].title}</h2>
              <p className="mt-2 text-muted-foreground">{features[slide].text}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="flex flex-col items-center gap-6 pb-4">
        <div className="flex justify-center space-x-2">
          {features.map((_, i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-neutral-300"
              animate={{
                scale: i === slide ? 1.5 : 1,
                backgroundColor: i === slide ? "hsl(var(--primary))" : "#E0E0E0",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          ))}
        </div>
        <Button
          size="lg"
          className="h-14 w-full rounded-full"
          onClick={handleNext}
        >
          {slide === features.length - 1 ? "Enter Dashboard" : "Next"}
          <ArrowRight className="ml-2"/>
        </Button>
      </footer>
    </div>
  );
}
