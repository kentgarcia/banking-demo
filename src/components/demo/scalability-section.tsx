
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone, ShieldCheck, Shapes, Server, ArrowLeft, RotateCcw, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const arrowVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeInOut" },
    },
};

function AnimatedArrow() {
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
            <motion.path
                d="M10 40 L140 40"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="5 5"
                variants={arrowVariants}
                animate={"visible"}
            />
            <motion.path
                d="M132 35 L140 40 L132 45"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                variants={arrowVariants}
                animate={"visible"}
            />
        </motion.svg>
    );
}

function ScalabilityNode({
    icon: Icon,
    label,
    description,
    cpuLevel,
    isScaling,
    isPulsing,
    progressColor,
}: {
    icon: React.ElementType;
    label: string;
    description?: string;
    cpuLevel?: number;
    isScaling?: boolean;
    isPulsing?: boolean;
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
                            <Progress value={cpuLevel} indicatorClassName={progressColor} className="h-2" />
                        </div>
                    )}
                </div>
            </motion.div>
            {isScaling && isAppLayer && (
                 <div className="flex items-center justify-center gap-2 mt-2 text-muted-foreground">
                     <motion.div className="flex items-center gap-1" initial={{opacity:0, y: 10}} animate={{opacity: 1, y: 0, transition:{delay: 0.2}}}>
                        <Server className="h-8 w-8" />
                    </motion.div>
                     <motion.div className="flex items-center gap-1" initial={{opacity:0, y: 10}} animate={{opacity: 1, y: 0, transition:{delay: 0.4}}}>
                        <Server className="h-8 w-8" />
                    </motion.div>
                    <motion.p className="text-xs font-semibold" initial={{opacity:0}} animate={{opacity: 1, transition:{delay: 0.6}}}>
                        +2 Instances
                    </motion.p>
                </div>
            )}
        </div>
    );
}

const simulationSteps = {
    idle: {
        text: "The platform's elasticity allows it to handle fluctuating demand without performance degradation. Click below to simulate a peak load scenario.",
        cpu: 15,
        isScaling: false,
        progressColor: "bg-green-500",
        isPulsing: false,
    },
    spiking: {
        text: "A sudden surge in traffic causes CPU usage to spike on the Application Layer. The system is under heavy load, indicated by the pulsing red border.",
        cpu: 95,
        isScaling: false,
        progressColor: "bg-destructive",
        isPulsing: true,
    },
    scaling: {
        text: "Azure Kubernetes Service automatically detects the high load and begins provisioning additional server instances to distribute the workload.",
        cpu: 95,
        isScaling: true,
        progressColor: "bg-destructive",
        isPulsing: true,
    },
    stabilized: {
        text: "With the new instances online, the load is balanced, and CPU usage returns to a stable level. The platform has scaled seamlessly to meet demand.",
        cpu: 40,
        isScaling: true,
        progressColor: "bg-green-500",
        isPulsing: false,
    },
};

export function ScalabilitySection({ onBack, onRestart }: { onBack: () => void, onRestart: () => void }) {
    const [step, setStep] = React.useState<keyof typeof simulationSteps>("idle");
    const currentStep = simulationSteps[step];

    const handleSimulate = () => {
        if (step !== "idle") return;
        setStep("spiking");
        setTimeout(() => setStep("scaling"), 2500);
        setTimeout(() => setStep("stabilized"), 5000);
    };

    return (
        <section
            id="scalability"
            className="flex w-full flex-col items-center justify-center bg-secondary/50 min-h-screen py-12"
        >
            <div className="container mx-auto px-4 flex flex-col items-center">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Scalability Demonstration</h2>
                    <p className="text-muted-foreground mt-2">This proves the platform is elastic and can handle peak demand.</p>
                </div>

                <div className="flex items-start justify-around w-full max-w-7xl mx-auto my-12">
                    <ScalabilityNode icon={Smartphone} label="User Traffic" description="Mobile & Web"/>
                    <AnimatedArrow />
                    <ScalabilityNode icon={ShieldCheck} label="Security Layer" description="DDoS & NGFW"/>
                    <AnimatedArrow />
                    <ScalabilityNode
                        icon={Shapes}
                        label="Application Layer"
                        description="Temenos on AKS"
                        cpuLevel={currentStep.cpu}
                        isScaling={currentStep.isScaling}
                        isPulsing={currentStep.isPulsing}
                        progressColor={currentStep.progressColor}
                    />
                    <AnimatedArrow />
                    <ScalabilityNode icon={Server} label="On-Premise Core" description="Via ExpressRoute"/>
                </div>

                <div className="mt-8 text-center max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={step}
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
                       {step === 'idle' && (
                            <Button onClick={handleSimulate} size="lg">
                                Simulate Peak Load
                            </Button>
                       )}
                       {step === 'stabilized' && (
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
