"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  XCircle,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

// Reusing confetti logic from AccountCreatedSuccessScreen
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
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
      {pieces.map((piece, i) => (
        <ConfettiPiece key={i} {...piece} />
      ))}
    </div>
  );
}


const RECIPIENTS = [
  { name: "Maria Clara", avatar: "https://randomuser.me/api/portraits/women/44.jpg", initials: "MC" },
  { name: "Jose Rizal", avatar: "https://randomuser.me/api/portraits/men/45.jpg", initials: "JR" },
  { name: "Andres Bonifacio", avatar: "https://randomuser.me/api/portraits/men/46.jpg", initials: "AB" },
  { name: "Gabriela Silang", avatar: "https://randomuser.me/api/portraits/women/47.jpg", initials: "GS" },
];

const containerVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
  }),
};

export function SendMoneyScreen({
  onBack,
  onSendSuccess,
  simulateFailure,
  onSimulateFailureChange,
}: {
  onBack: () => void;
  onSendSuccess: () => void;
  simulateFailure: boolean;
  onSimulateFailureChange: (value: boolean) => void;
}) {
  const [step, setStep] = React.useState(0); // 0: select, 1: details, 2: sending, 3: result
  const [direction, setDirection] = React.useState(1);
  const [selectedRecipient, setSelectedRecipient] = React.useState<(typeof RECIPIENTS)[0] | null>(null);
  const [amount, setAmount] = React.useState("50.00");
  const [note, setNote] = React.useState("");
  
  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setStep(prev => prev + newDirection);
  };
  
  const handleSelectRecipient = (recipient: (typeof RECIPIENTS)[0]) => {
    setSelectedRecipient(recipient);
    paginate(1);
  };

  const handleSend = () => {
    paginate(1); // to sending screen
    setTimeout(() => {
        setStep(3) // to result screen
        onSendSuccess();
        setTimeout(() => {
          onBack(); // Go back to dashboard after showing result
        }, 3000);
    }, 2000);
  };

  const handleBackNavigation = () => {
    if (step > 0 && step < 3) { // Cant go back from sending/result screens
      paginate(-1);
    } else {
      onBack();
    }
  };

  const currentTitle = React.useMemo(() => {
    switch (step) {
      case 0: return "Select Recipient";
      case 1: return `Send to ${selectedRecipient?.name}`;
      case 2: return "Processing...";
      case 3: return "Transaction Status";
      default: return "Send Money";
    }
  }, [step, selectedRecipient]);

  return (
    <div className="h-full w-full overflow-hidden rounded-[2rem] bg-neutral-100 font-body text-neutral-800">
      <div className="flex h-full flex-col">
        <header className="flex items-center p-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={handleBackNavigation}>
            <ArrowLeft />
          </Button>
          <h2 className="font-bold text-lg mx-auto">{currentTitle}</h2>
          <div className="w-10" />
        </header>

        <main className="flex-1 flex flex-col px-4 overflow-hidden relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {step === 0 && (
              <motion.div
                key={0}
                custom={direction}
                variants={containerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full absolute inset-0 px-4"
              >
                <Input placeholder="Search contacts..." className="mb-4" />
                <div className="space-y-2">
                  {RECIPIENTS.map((recipient, i) => (
                    <motion.div
                      key={recipient.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: i * 0.1 } }}
                    >
                      <Card onClick={() => handleSelectRecipient(recipient)} className="p-3 flex items-center gap-3 cursor-pointer hover:bg-neutral-200 transition-colors">
                        <Avatar>
                          <AvatarImage src={recipient.avatar} alt={recipient.name} />
                          <AvatarFallback>{recipient.initials}</AvatarFallback>
                        </Avatar>
                        <span className="font-semibold">{recipient.name}</span>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && selectedRecipient && (
              <motion.div
                key={1}
                custom={direction}
                variants={containerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full h-full flex flex-col items-center absolute inset-0 px-4"
              >
                <Avatar className="h-20 w-20 mt-4">
                  <AvatarImage src={selectedRecipient.avatar} alt={selectedRecipient.name} />
                  <AvatarFallback>{selectedRecipient.initials}</AvatarFallback>
                </Avatar>
                <div className="relative mt-8 w-full max-w-xs">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-4xl">$</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 text-5xl h-20 text-center font-bold bg-white"
                  />
                </div>
                 <Input
                    placeholder="Add a note (optional)"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-4 w-full max-w-xs"
                 />
                 <div className="flex items-center space-x-2 mt-4 justify-center">
                   <Checkbox id="simulate-failure" checked={simulateFailure} onCheckedChange={onSimulateFailureChange} />
                   <label htmlFor="simulate-failure" className="text-sm font-medium leading-none text-muted-foreground">
                    Simulate 'Insufficient Funds'
                   </label>
                 </div>
                 <div className="mt-auto pb-8 w-full max-w-xs">
                    <Button onClick={handleSend} disabled={!amount} className="w-full h-14 rounded-full">
                       <Send className="mr-2 h-4 w-4" /> Review & Send
                    </Button>
                 </div>
              </motion.div>
            )}

            {step === 2 && (
                 <motion.div
                    key={2}
                    custom={direction}
                    variants={containerVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full h-full flex flex-col items-center justify-center absolute inset-0"
                 >
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                    <p className="mt-4 font-semibold text-lg">Processing Transaction...</p>
                    <p className="text-muted-foreground">Please wait a moment.</p>
                </motion.div>
            )}
            
            {step === 3 && (
                 <motion.div
                    key={3}
                    custom={direction}
                    variants={containerVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full h-full flex flex-col items-center justify-center absolute inset-0 text-center"
                 >
                    {!simulateFailure && <Confetti />}
                    <div className="z-10 flex flex-col items-center">
                        {simulateFailure ? (
                            <XCircle className="h-24 w-24 text-destructive" />
                        ) : (
                            <CheckCircle2 className="h-24 w-24 text-green-500" />
                        )}
                        <h3 className="text-2xl font-bold mt-4">
                            {simulateFailure ? "Transaction Failed" : "Transaction Sent!"}
                        </h3>
                        <p className="text-muted-foreground max-w-xs mt-2">
                            {simulateFailure ? "Insufficient funds in your account." : `You have successfully sent $${amount} to ${selectedRecipient?.name}.`}
                        </p>
                        {!simulateFailure && <p className="font-mono mt-2 text-sm bg-muted p-2 rounded-md">Txn ID: #582910</p>}
                    </div>
                 </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
