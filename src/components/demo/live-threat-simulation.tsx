
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone, ShieldAlert, Server, ArrowLeft, RotateCcw, Bug, Forward, X, ArrowRight, MessageSquareWarning, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function ThreatNode({
    icon: Icon,
    label,
    description,
    isPulsing,
    isSuccess,
}: {
    icon: React.ElementType;
    label: string;
    description?: string;
    isPulsing?: boolean;
    isSuccess?: boolean;
}) {
    return (
        <div className="w-48 flex flex-col items-center gap-2 text-center">
            <motion.div
                className="w-full rounded-lg"
                animate={{
                    boxShadow: isPulsing ? '0 0 25px hsl(var(--destructive) / 0.9)' : '0 0 0px hsl(var(--destructive) / 0)',
                }}
                transition={{
                    boxShadow: isPulsing ? { yoyo: Infinity, duration: 0.6, ease: 'easeInOut' } : { duration: 0.5 }
                }}
            >
                <div
                    className={cn(
                        "flex h-full w-full flex-col items-center gap-2 rounded-lg bg-background p-4 min-h-[140px] justify-center border-2 transition-colors duration-500",
                        isPulsing && "border-destructive",
                        isSuccess && "border-green-500",
                    )}
                >
                    <Icon className={cn("h-10 w-10 text-primary transition-colors duration-500", isPulsing && "text-destructive", isSuccess && "text-green-500")} />
                    <h3 className="text-base font-bold">{label}</h3>
                    {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
                </div>
            </motion.div>
        </div>
    );
}

function AttackArrow({ isActive, isBlocked }: { isActive?: boolean; isBlocked?: boolean }) {
    const path = "M10 40 L140 40";
    return (
        <svg width="150" height="80" viewBox="0 0 150 80" className="flex-shrink-0">
            {isActive && (
                 <motion.g>
                    <path d={path} stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="6 6" />
                    <motion.circle
                        r="5"
                        fill="hsl(var(--destructive))"
                        style={{ 
                            offsetPath: `path('${path}')`,
                            offsetDistance: "var(--offset, 0%)"
                        }}
                        initial={{ "--offset": "0%" }}
                        animate={{ "--offset": "100%" }}
                        transition={{ duration: 1.5, ease: "linear" }}
                    />
                 </motion.g>
            )}
            {isBlocked && (
                <motion.g initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                    <X className="text-destructive" size={48} absoluteStrokeWidth strokeWidth={3} transform="translate(51, 16)" />
                </motion.g>
            )}
        </svg>
    )
}

function NotifyArrow({ isActive }: { isActive?: boolean }) {
    const path = "M10 40 L140 40";
    return (
        <svg width="150" height="80" viewBox="0 0 150 80" className="flex-shrink-0">
            {isActive && (
                 <motion.g>
                    <path d={path} stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 6" />
                    <motion.path
                        d="M132 35 L140 40 L132 45"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        fill="none"
                    />
                 </motion.g>
            )}
        </svg>
    )
}

const simulationSteps = [
    { text: "This simulation shows how our platform responds to an account takeover attempt in real-time.", button: "Begin Simulation" },
    { text: "An attacker, using stolen credentials, attempts to log in from a suspicious, previously unseen location.", button: "Next: Analyze Threat" },
    { text: "The request is flagged by our threat intelligence layer (Azure Sentinel) for anomalous behavior: an 'Impossible Travel' scenario.", button: "Next: Mitigate Threat" },
    { text: "The malicious login is blocked. The user's account is locked, and a security alert is sent to their registered device.", button: "Next: Confirm Resolution" },
    { text: "The attack was thwarted without impact. The user is notified and can securely recover their account.", button: null },
];

export function LiveThreatSimulationSection({ onBack, onRestart }: { onBack: () => void, onRestart: () => void }) {
    const [stepIndex, setStepIndex] = React.useState(0);
    const currentStep = simulationSteps[stepIndex];
    const isFinalState = !currentStep.button;

    const handleNext = () => {
        if (isFinalState) return;
        setStepIndex(stepIndex + 1);
    };

    return (
        <section
            id="threat-simulation"
            className="flex w-full flex-col items-center justify-center bg-secondary/50 min-h-screen py-12"
        >
            <div className="container mx-auto px-4 flex flex-col items-center">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Live Threat Simulation</h2>
                    <p className="text-muted-foreground mt-2">Demonstrating real-time account takeover defense.</p>
                </div>

                <div className="flex flex-col items-center w-full max-w-5xl mx-auto my-12">
                    <div className="flex items-start justify-between w-full">
                        <ThreatNode icon={Bug} label="Attacker" description="Malicious Actor" isPulsing={stepIndex === 1} />
                        <div className="flex flex-col items-center pt-8">
                            <AnimatePresence>
                                {stepIndex === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="w-full max-w-md"
                                >
                                    <Alert variant="destructive" className="mb-4">
                                        <ShieldAlert className="h-4 w-4" />
                                        <AlertTitle>Threat Detected: Impossible Travel</AlertTitle>
                                        <AlertDescription>
                                            Login attempt from unrecognized location blocked.
                                        </AlertDescription>
                                    </Alert>
                                </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="flex items-center">
                                <AttackArrow isActive={stepIndex >= 1} isBlocked={stepIndex >= 3} />
                                <ThreatNode icon={ShieldAlert} label="Security Layer" description="Palo Alto NGFW & Sentinel" isPulsing={stepIndex === 2} isSuccess={stepIndex >= 3}/>
                                <AttackArrow isActive={false} />
                                <ThreatNode icon={Server} label="User Accounts" description="Core Banking System" isPulsing={stepIndex >= 3} isSuccess={stepIndex >=3} />
                            </div>
                        </div>
                    </div>
                     <div className="flex items-center justify-end w-full mt-[-80px] mr-[-120px]">
                         <NotifyArrow isActive={stepIndex >= 3} />
                         <ThreatNode icon={Smartphone} label="Legitimate User" description="Secure Notification Sent" isPulsing={stepIndex === 3} isSuccess={stepIndex >=3} />
                    </div>
                </div>

                <div className="mt-8 text-center max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={stepIndex}
                            className="text-lg text-muted-foreground min-h-[84px]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                           {currentStep.text}
                        </motion.p>
                    </AnimatePresence>
                    <div className="mt-6 flex items-center justify-center gap-4 h-11">
                       {!isFinalState ? (
                           <AnimatePresence mode="wait">
                                <motion.div
                                    key={stepIndex}
                                    initial={{ opacity: 0, y: 10}}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Button onClick={handleNext} size="lg">
                                        {currentStep.button} <Forward className="ml-2"/>
                                    </Button>
                                </motion.div>
                           </AnimatePresence>
                       ) : (
                           <motion.div 
                                className="flex items-center justify-center gap-4"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{delay: 0.5}}
                            >
                                <Button onClick={onBack} variant="outline" size="lg">
                                    <ArrowLeft className="mr-2"/> Back
                                </Button>
                                <Button onClick={onRestart} size="lg">
                                    Restart Demo <RotateCcw className="ml-2"/>
                                </Button>
                           </motion.div>
                       )}
                    </div>
                </div>
            </div>
        </section>
    );
}
