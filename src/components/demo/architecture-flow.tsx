
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, Shapes, Server, ArrowRight, ArrowLeft, Cloud, Lock, Loader2, XCircle, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// --- START: New components for dynamic phone display ---

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
      exit={{ opacity: 0 }}
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
      <AnimatePresence>
        {pieces.map((piece, i) => (
          <ConfettiPiece key={i} {...piece} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function PhoneScreenContent({ status, simulateFailure }: { status: 'idle' | 'sending' | 'complete', simulateFailure: boolean }) {
    if (status === 'idle') {
        return <div className="w-full h-full bg-neutral-100" />;
    }

    if (status === 'sending') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-accent/20 p-4 text-center">
                <Loader2 className="h-16 w-16 animate-spin text-accent" />
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center text-center bg-neutral-100 text-neutral-800 relative">
            {!simulateFailure && <Confetti />}
            <div className="z-10 flex flex-col items-center p-4">
                {simulateFailure ? (
                    <XCircle className="h-20 w-20 text-destructive" />
                ) : (
                    <CheckCircle2 className="h-20 w-20 text-green-500" />
                )}
                <h3 className="text-xl font-bold mt-4">
                    {simulateFailure ? "Transaction Failed" : "Transaction Sent!"}
                </h3>
                <p className="text-muted-foreground max-w-xs mt-2 text-sm">
                    {simulateFailure ? "Insufficient funds in your account." : `You have successfully sent $50.00 to Maria Clara.`}
                </p>
                {!simulateFailure && <p className="font-mono mt-2 text-xs bg-muted p-2 rounded-md">Txn ID: #582910</p>}
            </div>
        </div>
    )
}

function ArchitecturePhoneDisplay({ status, simulateFailure }: { status: 'idle' | 'sending' | 'complete', simulateFailure: boolean }) {
    return (
        <div className="relative h-[700px] w-[350px] rounded-[2.5rem] border-[14px] border-neutral-800 bg-neutral-800 shadow-2xl shrink-0">
            <div className="absolute top-0 left-1/2 h-8 w-[160px] -translate-x-1/2 rounded-b-xl bg-neutral-800" />
            <div className="h-full w-full overflow-hidden rounded-[2rem]">
                <PhoneScreenContent status={status} simulateFailure={simulateFailure} />
            </div>
        </div>
    )
}

// --- END: New components for dynamic phone display ---


const successFlowSteps = [
    { text: "This diagram shows the secure, multi-layered journey of your transaction. Click 'Next Step' to begin." },
    { text: "A user initiates a fund transfer. The request is sent securely over HTTPS to the Azure cloud." },
    { text: "The request hits Azure Front Door, which provides load balancing, SSL offloading, and Web Application Firewall (WAF) protection." },
    { text: "The request is actively scanned. Azure DDoS Protection handles traffic scrubbing while the Palo Alto NGFW performs deep packet inspection for advanced threats." },
    { text: "The request is routed to the Application Layer, where Temenos Digital Banking Microservices on AKS process the business logic in a secure Private VNet." },
    { text: "Using a dedicated ExpressRoute link, the request securely reaches the On-Premise Core Banking System without touching the public internet." },
    { text: "The Core Banking System validates the transaction and updates the ledger, then initiates the response back to the Application Layer." },
    { text: "The success message travels back through the security layers, confirming a secure and complete transaction." },
    { text: "Finally, the confirmation is securely sent back to the user's device, completing the transaction." },
    { text: "The transaction is complete! This entire flow ensures speed, security, and reliability." },
];

const failureFlowSteps = [
    { text: "This diagram shows the secure, multi-layered journey of your transaction. Click 'Next Step' to begin." },
    { text: "A user initiates a fund transfer. The request is sent securely over HTTPS to the Azure cloud." },
    { text: "The request hits Azure Front Door, which provides load balancing, SSL offloading, and Web Application Firewall (WAF) protection." },
    { text: "The request is actively scanned. Azure DDoS Protection handles traffic scrubbing while the Palo Alto NGFW performs deep packet inspection for advanced threats." },
    { text: "The request is routed to the Application Layer, where Temenos Digital Banking Microservices on AKS process the business logic in a secure Private VNet." },
    { text: "Using a dedicated ExpressRoute link, the request securely reaches the On-Premise Core Banking System without touching the public internet." },
    { text: "The Core Banking System declines the transaction due to insufficient funds and initiates the response." },
    { text: "The failure message travels back through the security layers, handled gracefully by the system." },
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
                style={{
                    offsetPath: `path("${path}")`,
                    offsetDistance: "var(--offset, 0%)",
                }}
                animate={{
                    "--offset": "100%"
                }}
                initial={{
                    "--offset": "0%"
                }}
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
    isPulsing,
    overlayIcon: OverlayIcon,
    overlayActive,
}: {
    icon: React.ElementType;
    label: string;
    description?: string;
    isActive: boolean;
    isError?: boolean;
    isPulsing?: boolean;
    overlayIcon?: React.ElementType;
    overlayActive?: boolean;
}) {
    return (
        <motion.div
            animate={{ 
                scale: isActive ? 1.05 : 1,
                boxShadow: isError ? '0 0 25px hsl(var(--destructive))' : (isPulsing ? '0 0 25px hsl(var(--primary))' : 'none')
             }}
            transition={{ 
                scale: { type: "spring", stiffness: 300, damping: 20 },
                boxShadow: (isError || isPulsing) ? { yoyo: Infinity, duration: 0.8, ease: 'easeInOut' } : { duration: 0.2 }
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
                        "relative flex h-full w-full flex-col items-center gap-2 rounded-[calc(var(--radius)-2px)] bg-background p-4 text-center min-h-[150px] justify-center"
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

                <AnimatePresence>
                    {OverlayIcon && overlayActive && (
                        <motion.div 
                            className="absolute -top-2 -right-2 bg-green-500 p-1 rounded-full border-2 border-background"
                            initial={{ scale: 0, rotate: -90 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 90 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        >
                            <OverlayIcon className="h-3 w-3 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}


export function ArchitectureFlowSection({ onComplete, onBack, simulateFailure }: { onComplete: () => void, onBack: () => void, simulateFailure: boolean }) {
    const [stepIndex, setStepIndex] = React.useState(0);
    const [isFlashingError, setIsFlashingError] = React.useState(false);
    
    const architectureFlowSteps = simulateFailure ? failureFlowSteps : successFlowSteps;
    const isLastStep = stepIndex >= architectureFlowSteps.length - 1;

    const isFrontDoorStep = stepIndex === 2;
    const isFirewallStep = stepIndex === 3;

    React.useEffect(() => {
        if (simulateFailure && stepIndex === 6) { // Core banking declines transaction
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
    
    const phoneStatus: 'idle' | 'sending' | 'complete' = stepIndex === 0 ? 'idle' : (stepIndex < 9 ? 'sending' : 'complete');

    return (
        <section
            id="architecture"
            className="flex w-full flex-col items-center justify-center bg-secondary/50 min-h-screen p-4"
        >
            <div className="container mx-auto px-4 w-full max-w-7xl flex flex-1 flex-col items-center justify-center">
                <div className="flex w-full flex-grow items-center justify-center">
                    <div className="w-48 flex flex-col justify-center items-center gap-2">
                        <div className="relative">
                            <div className="origin-center -mb-32" style={{ transform: "scale(0.45)" }}>
                                <ArchitecturePhoneDisplay status={phoneStatus} simulateFailure={simulateFailure} />
                            </div>
                            <AnimatePresence>
                                {phoneStatus === 'sending' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                        className="absolute bottom-28 left-1/2 -translate-x-1/2 w-max bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border z-10"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                            <p className="text-sm font-semibold whitespace-nowrap">Processing Transaction...</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <h3 className="text-base font-bold text-center mt-2">User's Device</h3>
                    </div>

                    <div className="flex flex-col items-center">
                        <FlowArrow forward={stepIndex >= 1 && stepIndex <= 5} backward={stepIndex >= 7} />
                        <AnimatePresence>
                        {(stepIndex >= 1 && stepIndex <= 5) && (
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
                            <ArchitectureNode
                                icon={ShieldCheck}
                                label="Security Checkpoint"
                                description="Front Door, WAF & Firewall"
                                isActive={stepIndex === 2 || stepIndex === 3 || stepIndex === 7}
                                isPulsing={isFrontDoorStep || isFirewallStep}
                                overlayIcon={Lock}
                                overlayActive={isFrontDoorStep}
                            />
                            
                            <FlowArrow forward={stepIndex >= 4 && stepIndex <= 5} backward={stepIndex >= 7 && stepIndex < 8} />
                            
                            <ArchitectureNode icon={Shapes} label="Application Layer" description="Temenos on AKS" isActive={stepIndex === 4 || (stepIndex >= 6 && stepIndex < 7)} />
                        </div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                        <FlowArrow forward={stepIndex >= 5 && stepIndex < 7} backward={stepIndex >= 6 && stepIndex < 7} />
                         <AnimatePresence>
                        {(stepIndex >= 5 && stepIndex < 7) && (
                            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                               <p className="text-xs text-muted-foreground mt-[-20px]">ExpressRoute</p>
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </div>
                    
                   <ArchitectureNode icon={Server} label="On-Premise Core" isActive={stepIndex === 5 || stepIndex === 6} isError={isFlashingError}/>
                </div>
                
                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground my-8">
                    <div className="flex items-center gap-2">
                         <div className="w-8 h-px bg-primary border-t-2 border-dashed border-primary"/>
                        <span>Request</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-accent border-t-2 border-dashed border-accent"/>
                        <span>Response</span>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-6 right-24 z-50 flex items-center gap-4">
                <Button onClick={onBack} variant="outline" size="lg" disabled={stepIndex === 0} className="shadow-lg rounded-full">
                    <ArrowLeft className="mr-2"/> Back
                </Button>
                <Button onClick={handleNext} size="lg" className="shadow-lg rounded-full">
                    {isLastStep ? 'Finish & View Dashboard' : 'Next Step'} <ArrowRight className="ml-2"/>
                </Button>
            </div>
        </section>
    );
}
