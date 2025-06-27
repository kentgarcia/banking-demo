
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone, ShieldCheck, Shapes, Server, ArrowLeft, RotateCcw, Cpu, Forward, Cloud, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

function FlowArrow({
    isActive,
    showBackward,
    isSlow
}: {
    isActive: boolean;
    showBackward?: boolean;
    isSlow?: boolean;
}) {
    const duration = isSlow ? 4 : 1.5;
    const forwardPath = "M10 25 L140 25";
    const backwardPath = "M140 55 L10 55";
    
    const renderCircles = (path: string, color: string, delayMultiplier: number) => (
        [0, 1, 2].map(i => (
             <motion.circle
                key={i}
                r="4"
                fill={color}
                style={{
                    offsetPath: `path('${path}')`,
                    offsetDistance: "var(--offset, 0%)"
                }}
                initial={{ "--offset": "0%", opacity: 0 }}
                animate={{ "--offset": "100%", opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    "--offset": {
                        delay: i * (duration / 3) * delayMultiplier,
                        duration: duration,
                        repeat: Infinity,
                        ease: "linear",
                    },
                    opacity: { duration: 0.3 }
                }}
            />
        ))
    );

    return (
        <svg width="150" height="80" viewBox="0 0 150 80" className="flex-shrink-0">
            {/* Forward path drawing */}
            <path d={forwardPath} stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="5 5" className="opacity-30" />
            <path d="M132 20 L140 25 L132 30" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" className="opacity-30" />
            
            <AnimatePresence>
                {isActive && renderCircles(forwardPath, "hsl(var(--accent))", 1)}
            </AnimatePresence>

            {/* Backward path drawing and animation */}
            <path d={backwardPath} stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5 5" className="opacity-30" />
            <path d="M18 50 L10 55 L18 60" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" className="opacity-30" />
            <AnimatePresence>
                {showBackward && renderCircles(backwardPath, "hsl(var(--primary))", 1.2)}
            </AnimatePresence>
        </svg>
    );
}


function ScalabilityNode({
    icon: Icon,
    label,
    description,
    cpuLevel,
    isPulsing,
    extraInstances = 0,
    progressColor,
}: {
    icon: React.ElementType;
    label: string;
    description?: string;
    cpuLevel?: number;
    isPulsing?: boolean;
    extraInstances?: number;
    progressColor?: string;
}) {
    const isAppLayer = label === "Application Layer";

    return (
        <div className="w-48 flex flex-col items-center gap-2">
            <motion.div
                className="w-full rounded-lg"
                animate={{
                    boxShadow: isPulsing ? '0 0 20px hsl(var(--destructive) / 0.7)' : '0 0 0px hsl(var(--destructive) / 0)',
                }}
                transition={{
                    boxShadow: isPulsing ? { yoyo: Infinity, duration: 0.8, ease: 'easeInOut' } : { duration: 0.5 }
                }}
            >
                <div
                    className={cn(
                        "flex h-full w-full flex-col items-center gap-2 rounded-lg bg-background p-4 text-center min-h-[140px] justify-center border-2",
                        isPulsing ? "border-destructive" : "border-border"
                    )}
                >
                    <Icon className="h-10 w-10 text-primary" />
                    <h3 className="text-base font-bold">{label}</h3>
                    {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
                    {isAppLayer && (
                        <div className="w-full mt-2 space-y-2">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Cpu size={16}/>
                                <span>CPU Usage</span>
                            </div>
                            <Progress value={cpuLevel} indicatorClassName={cn("duration-1000 ease-linear", progressColor)} className="h-2" />
                        </div>
                    )}
                </div>
            </motion.div>
            <div className="flex flex-col items-center justify-center text-muted-foreground min-h-[4rem] h-[4rem]">
                 <AnimatePresence>
                    {isAppLayer && extraInstances > 0 && (
                        <motion.div
                            key="instance-container"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                            className="flex flex-col items-center gap-2"
                        >
                            <motion.p 
                                className="text-xs font-semibold"
                                variants={{ hidden: { opacity: 0, y: -10 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2 }}}}
                            >
                                Provisioning new instances...
                            </motion.p>
                            <motion.div
                                className="flex items-center gap-2"
                                variants={{
                                    visible: { transition: { staggerChildren: 0.3, delayChildren: 0.4 }}
                                }}
                            >
                                {Array.from({ length: extraInstances }).map((_, i) => (
                                    <motion.div key={i} variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }}>
                                        <Server className="h-8 w-8" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const simulationSteps = [
    {
        text: "The platform's elasticity allows it to handle fluctuating demand. Click below to begin the peak load simulation.",
        cpu: 15, progressColor: "bg-green-500", isPulsing: false, extraInstances: 0,
        trafficActive: false, isSlow: false, returnTrafficActive: false,
        buttonText: "Simulate Peak Load"
    },
    {
        text: "A sudden surge in user traffic hits the system. Both requests and responses flow simultaneously, increasing the load on the application layer.",
        cpu: 50, progressColor: "bg-yellow-400", isPulsing: false, extraInstances: 0,
        trafficActive: true, isSlow: false, returnTrafficActive: true,
        buttonText: "Next: Observe CPU Spike"
    },
    {
        text: "The heavy load causes CPU usage to spike. System performance degrades, slowing down all data processing for both requests and responses.",
        cpu: 95, progressColor: "bg-destructive", isPulsing: true, extraInstances: 0,
        trafficActive: true, isSlow: true, returnTrafficActive: true,
        buttonText: "Next: Initiate Auto-Scaling"
    },
    {
        text: "Azure Kubernetes Service automatically provisions additional server instances to distribute the incoming workload.",
        cpu: 95, progressColor: "bg-destructive", isPulsing: true, extraInstances: 2,
        trafficActive: true, isSlow: true, returnTrafficActive: true,
        buttonText: "Next: Stabilize System"
    },
    {
        text: "With new instances online, the load is balanced. CPU usage returns to a healthy level and data processing speeds recover.",
        cpu: 40, progressColor: "bg-green-500", isPulsing: false, extraInstances: 2,
        trafficActive: true, isSlow: false, returnTrafficActive: true,
        buttonText: "Finish Simulation"
    },
    {
        text: "The system has successfully scaled to meet demand, ensuring a smooth user experience even during peak load.",
        cpu: 40, progressColor: "bg-green-500", isPulsing: false, extraInstances: 2,
        trafficActive: true, isSlow: false, returnTrafficActive: true,
        buttonText: null, // This indicates the final state with navigation buttons
    },
];


export function ScalabilitySection({ onBack, onRestart, onNext }: { onBack: () => void, onRestart: () => void, onNext: () => void }) {
    const [stepIndex, setStepIndex] = React.useState(0);
    const currentStep = simulationSteps[stepIndex];
    const isFinalState = !currentStep.buttonText;

    const handleNext = () => {
        if (isFinalState) return;
        setStepIndex(stepIndex + 1);
    };

    return (
        <section
            id="scalability"
            className="flex w-full flex-col items-center justify-center bg-secondary/50 min-h-screen py-12"
        >
            <div className="container mx-auto px-4 flex flex-col items-center">
                <div className="flex items-center justify-center w-full max-w-7xl mx-auto my-12">
                     <ScalabilityNode icon={Smartphone} label="User Traffic" description="Mobile & Web" />
                    <FlowArrow 
                        isActive={currentStep.trafficActive} 
                        showBackward={currentStep.returnTrafficActive} 
                        isSlow={currentStep.isSlow} 
                    />
                    
                    <div className="relative rounded-lg border-2 border-dashed border-border p-8 pt-12 bg-background/50 mx-4">
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground">
                            <Cloud className="h-6 w-6 text-blue-500" />
                            <span className="font-bold text-lg">Azure Cloud</span>
                        </div>
                        <div className="flex items-center justify-around gap-4">
                            <ScalabilityNode icon={ShieldCheck} label="Security Layer" description="DDoS & NGFW" />
                            <FlowArrow 
                                isActive={currentStep.trafficActive} 
                                showBackward={currentStep.returnTrafficActive} 
                                isSlow={currentStep.isSlow} 
                            />
                            <ScalabilityNode
                                icon={Shapes}
                                label="Application Layer"
                                description="Temenos on AKS"
                                cpuLevel={currentStep.cpu}
                                isPulsing={currentStep.isPulsing}
                                extraInstances={currentStep.extraInstances}
                                progressColor={currentStep.progressColor}
                            />
                        </div>
                    </div>
                    
                    <FlowArrow 
                        isActive={currentStep.trafficActive} 
                        showBackward={currentStep.returnTrafficActive} 
                        isSlow={currentStep.isSlow} 
                    />
                    <ScalabilityNode icon={Server} label="On-Premise Core" description="Via ExpressRoute" />
                </div>

                <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-8">
                    <div className="flex items-center gap-2">
                         <div className="w-8 h-px bg-accent border-t-2 border-dashed border-accent"/>
                        <span>Request</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-primary border-t-2 border-dashed border-primary"/>
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
                           {currentStep.text}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
            <div className="fixed bottom-6 right-24 z-50 flex items-center justify-center gap-4">
                {!isFinalState ? (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={stepIndex}
                            initial={{ opacity: 0, y: 10}}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <Button onClick={handleNext} size="lg" className="shadow-lg rounded-full">
                                {currentStep.buttonText} <Forward className="ml-2"/>
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
                        <Button onClick={onBack} variant="outline" size="lg" className="shadow-lg rounded-full">
                            <ArrowLeft className="mr-2"/> Back
                        </Button>
                        <Button onClick={onRestart} variant="secondary" size="lg" className="shadow-lg rounded-full">
                            Restart Demo <RotateCcw className="ml-2"/>
                        </Button>
                        <Button onClick={onNext} size="lg" className="shadow-lg rounded-full">
                            Next: Threat Simulation <ArrowRight className="ml-2" />
                        </Button>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
