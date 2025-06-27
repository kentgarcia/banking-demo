
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone, ShieldCheck, Shapes, Server, ArrowRight, ArrowLeft, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const successFlowSteps = [
    { text: "This diagram shows the secure, multi-layered journey of your transaction. Click 'Next Step' to begin." },
    { text: "A user initiates a fund transfer. The request is sent securely over HTTPS to the Azure cloud." },
    { text: "At the Azure edge, traffic is inspected by Azure DDoS Protection and a Palo Alto Next-Generation Firewall (NGFW)." },
    { text: "The validated request is routed to the Application Layer, where Temenos on Azure Kubernetes Service (AKS) processes the business logic." },
    { text: "Using a private ExpressRoute link, the request securely reaches the On-Premise Core Banking System." },
    { text: "The Core Banking System confirms the transaction and initiates the response back to the Application Layer." },
    { text: "The success message travels back through the Security Layer." },
    { text: "Finally, the confirmation is securely sent back to the user's device, completing the transaction." },
    { text: "The transaction is complete! This entire flow ensures speed, security, and reliability." },
];

const failureFlowSteps = [
    { text: "This diagram shows the secure, multi-layered journey of your transaction. Click 'Next Step' to begin." },
    { text: "A user initiates a fund transfer. The request is sent securely over HTTPS to the Azure cloud." },
    { text: "At the Azure edge, traffic is inspected by Azure DDoS Protection and a Palo Alto Next-Generation Firewall (NGFW)." },
    { text: "The validated request is routed to the Application Layer, where Temenos on Azure Kubernetes Service (AKS) processes the business logic." },
    { text: "Using a private ExpressRoute link, the request securely reaches the On-Premise Core Banking System." },
    { text: "The Core Banking System declines the transaction due to insufficient funds and initiates the response." },
    { text: "The failure message travels back through the Security Layer." },
    { text: "The app is informed of the issue, and the failure message is securely delivered to your device." },
    { text: "The transaction has failed, but the system handled it gracefully, providing clear feedback." },
]

function FlowArrow({
    forward,
    backward,
}: {
    forward: boolean;
    backward: boolean;
}) {
    const duration = 2;
    const forwardPath = "M10 25 L140 25";
    const backwardPath = "M140 55 L10 55";

    const renderPackets = (path: string, color: string) => {
        return [0, 1, 2].map(i => (
            <motion.circle
                key={i}
                r="4"
                fill={color}
                style={{ offsetPath: `path("${path}")` }}
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{
                    duration: duration,
                    delay: i * (duration / 3),
                    repeat: Infinity,
                    ease: "linear",
                }}
            />
        ));
    };

    return (
        <div className="relative flex-shrink-0" style={{width: 150, height: 80}}>
            <svg width="150" height="80" viewBox="0 0 150 80" className="absolute inset-0">
                {/* Forward path */}
                <path d={forwardPath} stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5 5" opacity={0.3}/>
                <path d="M132 20 L140 25 L132 30" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity={0.3}/>
                <AnimatePresence>
                    {forward && renderPackets(forwardPath, 'hsl(var(--primary))')}
                </AnimatePresence>

                {/* Backward path */}
                <path d={backwardPath} stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="5 5" opacity={0.3}/>
                <path d="M18 50 L10 55 L18 60" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" opacity={0.3}/>
                <AnimatePresence>
                    {backward && renderPackets(backwardPath, 'hsl(var(--accent))')}
                </AnimatePresence>
            </svg>
        </div>
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
                        "flex h-full w-full flex-col items-center gap-2 rounded-[calc(var(--radius)-2px)] bg-background p-4 text-center min-h-[150px] justify-center"
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
        if (simulateFailure && stepIndex === 5) { // Core banking declines transaction
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
                    <ArchitectureNode icon={Smartphone} label="User's Device" isActive={stepIndex === 1 || stepIndex >= 8} />

                    <div className="flex flex-col items-center">
                        <FlowArrow forward={stepIndex >= 2 && stepIndex <= 4} backward={stepIndex >= 7} />
                        <AnimatePresence>
                        {stepIndex >= 1 && (
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                <p className="text-xs text-muted-foreground mt-[-20px]">HTTPS Request</p>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>

                    <div className="relative rounded-lg border-2 border-dashed border-border p-8 pt-12 bg-background/50 mx-4">
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground">
                            <Cloud className="h-6 w-6 text-blue-500" />
                            <span className="font-bold text-lg">Azure Cloud</span>
                        </div>
                        <div className="flex items-center justify-around gap-4">
                            <ArchitectureNode icon={ShieldCheck} label="Security Layer" description="DDoS & Palo Alto NGFW" isActive={stepIndex === 2 || stepIndex === 6} />
                            <FlowArrow forward={stepIndex >= 3 && stepIndex <= 4} backward={stepIndex >= 6 && stepIndex < 7} />
                            <ArchitectureNode icon={Shapes} label="Application Layer" description="Temenos on AKS" isActive={stepIndex === 3} />
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <FlowArrow forward={stepIndex >= 4 && stepIndex <= 5} backward={stepIndex >= 5 && stepIndex < 6} />
                         <AnimatePresence>
                        {stepIndex >= 4 && (
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                               <p className="text-xs text-muted-foreground mt-[-20px]">ExpressRoute</p>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    <ArchitectureNode icon={Server} label="On-Premise Core" isActive={stepIndex === 4 || stepIndex === 5} isError={isFlashingError}/>
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
                            <span className="font-bold text-foreground">Step {stepIndex > 0 ? stepIndex : 1}: </span>{currentStep.text}
                        </motion.p>
                    </AnimatePresence>
                    <div className="mt-6 flex items-center justify-center gap-4">
                        <Button onClick={onBack} variant="outline" size="lg" disabled={stepIndex === 0}>
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

    