
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone, ShieldCheck, Shapes, Server, ArrowRight, ArrowLeft, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const successFlowSteps = [
    { text: "This diagram shows the secure, multi-layered journey of your transaction." },
    { text: "Your request leaves your device and enters the Azure cloud through an encrypted channel." },
    { text: "At the edge, traffic is inspected by Azure DDoS Protection and a Palo Alto Next-Generation Firewall (NGFW)." },
    { text: "The validated request is routed to the Application Layer, where Temenos on Azure Kubernetes Service (AKS) processes the business logic." },
    { text: "Using a private ExpressRoute link, the request securely reaches the On-Premise Core Banking System." },
    { text: "The Core Banking System confirms the transaction, sending a success message back to you along the same secure path." },
    { text: "The transaction is complete! This entire flow ensures speed, security, and reliability." },
];

const failureFlowSteps = [
    { text: "This diagram shows the secure, multi-layered journey of your transaction." },
    { text: "Your request leaves your device and enters the Azure cloud through an encrypted channel." },
    { text: "At the edge, traffic is inspected by Azure DDoS Protection and a Palo Alto Next-Generation Firewall (NGFW)." },
    { text: "The validated request is routed to the Application Layer, where Temenos on Azure Kubernetes Service (AKS) processes the business logic." },
    { text: "The request reaches the Core Banking System, but it's declined due to insufficient funds." },
    { text: "The Core Banking System sends a failure message back along the same secure path, informing the app of the issue." },
    { text: "The transaction has failed, but the system handled it gracefully, providing clear feedback." },
]


const arrowVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
    },
};

function AnimatedArrow({
    forward,
    backward,
}: {
    forward: boolean;
    backward: boolean;
}) {
    return (
        <motion.svg
            width="150"
            height="80"
            viewBox="0 0 150 80"
            className="flex-shrink-0"
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { delay: 0.5, duration: 0.5 } },
            }}
        >
            {/* Forward path */}
            <motion.path
                d="M10 25 L140 25"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="5 5"
                variants={arrowVariants}
                animate={forward ? "visible" : "hidden"}
            />
            <motion.path
                d="M132 20 L140 25 L132 30"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                variants={arrowVariants}
                animate={forward ? "visible" : "hidden"}
            />

            {/* Backward path */}
            <motion.path
                d="M140 55 L10 55"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                strokeDasharray="5 5"
                variants={arrowVariants}
                animate={backward ? "visible" : "hidden"}
            />
            <motion.path
                d="M18 50 L10 55 L18 60"
                stroke="hsl(var(--accent))"
                strokeWidth="2"
                fill="none"
                variants={arrowVariants}
                animate={backward ? "visible" : "hidden"}
            />
        </motion.svg>
    );
}

function ArchitectureNode({
    icon: Icon,
    label,
    description,
    isActive,
    isError,
}: {
    icon: React.ElementType;
    label: string;
    description?: string;
    isActive: boolean;
    isError?: boolean;
}) {
    return (
        <motion.div
            animate={{ scale: isActive ? 1.05 : 1,
                boxShadow: isError ? '0 0 25px hsl(var(--destructive))' : 'none'
             }}
            transition={{ 
                scale: { type: "spring", stiffness: 300, damping: 20 },
                boxShadow: isError ? { yoyo: Infinity, duration: 0.5, ease: 'easeInOut' } : { duration: 0.2 }
            }}
            className="w-48"
        >
            <div
                className={cn(
                    "relative rounded-lg",
                    isActive
                        ? "animate-border-spin p-0.5 [background:conic-gradient(from_var(--gradient-angle),hsl(var(--primary)),hsl(var(--accent)),hsl(var(--primary)))]"
                        : "border-2 border-border bg-transparent"
                )}
            >
                <div
                    className={cn(
                        "flex h-full w-full flex-col items-center gap-2 rounded-[calc(var(--radius)-2px)] bg-background p-4 text-center"
                    )}
                >
                    <Icon
                        className={cn(
                            "h-10 w-10 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground",
                            isError && "text-destructive"
                        )}
                    />
                    <h3 className="text-base font-bold">{label}</h3>
                    {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
                </div>
            </div>
        </motion.div>
    );
}


export function ArchitectureFlowSection({ onComplete, onBack, simulateFailure }: { onComplete: () => void, onBack: () => void, simulateFailure: boolean }) {
    const [stepIndex, setStepIndex] = React.useState(0);
    const [isFlashingError, setIsFlashingError] = React.useState(false);
    
    const architectureFlowSteps = simulateFailure ? failureFlowSteps : successFlowSteps;
    const currentStep = architectureFlowSteps[stepIndex];
    const isLastStep = stepIndex >= architectureFlowSteps.length - 1;

    React.useEffect(() => {
        if (simulateFailure && stepIndex === 4) { // Core banking step
            setIsFlashingError(true);
        } else {
            setIsFlashingError(false);
        }
    }, [stepIndex, simulateFailure]);

    const handleNext = () => {
        if (isLastStep) {
            onComplete();
        } else {
            setStepIndex(stepIndex + 1);
        }
    };
    
    return (
        <section
            id="architecture"
            className="flex w-full flex-col items-center justify-center bg-secondary/50 min-h-screen py-12"
        >
            <div className="container mx-auto px-4 flex flex-col items-center">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">The Architecture Flow</h2>
                    <p className="text-muted-foreground mt-2">A look behind the scenes of the transaction.</p>
                </div>

                <div className="flex items-center justify-center w-full max-w-7xl mx-auto my-12">
                    <ArchitectureNode icon={Smartphone} label="User's Device" isActive={stepIndex >= 1} />
                    <AnimatedArrow forward={stepIndex >= 2} backward={stepIndex >= 5} />

                    <div className="relative rounded-lg border-2 border-dashed border-border p-8 pt-12 bg-background/50 mx-4">
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground">
                            <Cloud className="h-6 w-6 text-blue-500" />
                            <span className="font-bold text-lg">Azure Cloud</span>
                        </div>
                        <div className="flex items-center justify-around gap-4">
                            <ArchitectureNode icon={ShieldCheck} label="Security Layer" description="DDoS & Palo Alto NGFW" isActive={stepIndex >= 2} />
                            <AnimatedArrow forward={stepIndex >= 3} backward={stepIndex >= 5} />
                            <ArchitectureNode icon={Shapes} label="Application Layer" description="Temenos on AKS" isActive={stepIndex >= 3} />
                        </div>
                    </div>
                    
                    <AnimatedArrow forward={stepIndex >= 4} backward={stepIndex >= 5} />
                    <ArchitectureNode icon={Server} label="On-Premise Core" description="Via ExpressRoute" isActive={stepIndex >= 4} isError={isFlashingError}/>
                </div>
                
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                    <div className="flex items-center gap-2">
                         <div className="w-8 h-px bg-primary border-t-2 border-dashed border-primary"/>
                        <span>Request</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-accent border-t-2 border-dashed border-accent"/>
                        <span>Response</span>
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
                            <span className="font-bold text-foreground">Step {stepIndex + 1}: </span>{currentStep.text}
                        </motion.p>
                    </AnimatePresence>
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <Button onClick={onBack} variant="outline" size="lg">
                            <ArrowLeft className="mr-2"/> Back
                        </Button>
                        <Button
                            onClick={handleNext}
                            size="lg"
                        >
                            {isLastStep ? 'Finish & View Dashboard' : 'Next Step'} <ArrowRight className="ml-2"/>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
