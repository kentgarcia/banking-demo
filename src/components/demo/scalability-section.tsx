
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Smartphone, ShieldCheck, Shapes, Server, ArrowLeft, RotateCcw, Cpu, Forward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

function FlowArrow({ isActive }: { isActive: boolean }) {
    const arrowPath = "M10 40 L140 40";
    
    return (
        <svg width="150" height="80" viewBox="0 0 150 80" className="flex-shrink-0">
            <path
                d={arrowPath}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="5 5"
                className="opacity-50"
            />
            <path
                d="M132 35 L140 40 L132 45"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                className="opacity-50"
            />
            
            <AnimatePresence>
            {isActive && [0, 1].map(i => (
                 <motion.circle
                    key={i}
                    r="4"
                    fill="hsl(var(--accent))"
                    style={{ 
                        offsetPath: `path('${arrowPath}')`,
                        offsetDistance: "var(--offset)"
                    }}
                    initial={{ "--offset": "0%", opacity: 0 }}
                    animate={{ "--offset": "100%", opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        "--offset": {
                            delay: i * 0.75,
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                        },
                        opacity: { duration: 0.3 }
                    }}
                />
            ))}
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
            <div className="flex flex-col items-center justify-center text-muted-foreground h-16">
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
        text: "The platform's elasticity allows it to handle fluctuating demand without performance degradation. Click below to begin the peak load simulation.",
        cpu: 15,
        progressColor: "bg-green-500",
        isPulsing: false,
        extraInstances: 0,
        buttonText: "Simulate Peak Load"
    },
    {
        text: "A sudden surge in user traffic begins to hit the system. The animated packets indicate the increased flow of data requests to the application layer.",
        cpu: 50,
        progressColor: "bg-yellow-400",
        isPulsing: false,
        extraInstances: 0,
        buttonText: "Next: Observe CPU Spike"
    },
    {
        text: "The heavy load causes CPU usage to spike. The system detects the stress, indicated by the pulsing red border, and prepares to scale.",
        cpu: 95,
        progressColor: "bg-destructive",
        isPulsing: true,
        extraInstances: 0,
        buttonText: "Next: Initiate Auto-Scaling"
    },
    {
        text: "Azure Kubernetes Service automatically provisions additional server instances to distribute the incoming workload.",
        cpu: 95,
        progressColor: "bg-destructive",
        isPulsing: true,
        extraInstances: 2,
        buttonText: "Next: Stabilize System"
    },
    {
        text: "With the new instances online, the load is balanced, and CPU usage returns to a stable, healthy level. The platform has scaled seamlessly to meet demand.",
        cpu: 40,
        progressColor: "bg-green-500",
        isPulsing: false,
        extraInstances: 2,
        buttonText: "Finish"
    },
];


export function ScalabilitySection({ onBack, onRestart }: { onBack: () => void, onRestart: () => void }) {
    const [stepIndex, setStepIndex] = React.useState(0);
    const currentStep = simulationSteps[stepIndex];
    const isLastStep = stepIndex >= simulationSteps.length - 1;

    const handleNext = () => {
        if (isLastStep) return;
        setStepIndex(stepIndex + 1);
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
                    <FlowArrow isActive={stepIndex > 0} />
                    <ScalabilityNode icon={ShieldCheck} label="Security Layer" description="DDoS & NGFW"/>
                    <FlowArrow isActive={stepIndex > 0} />
                    <ScalabilityNode
                        icon={Shapes}
                        label="Application Layer"
                        description="Temenos on AKS"
                        cpuLevel={currentStep.cpu}
                        isPulsing={currentStep.isPulsing}
                        extraInstances={currentStep.extraInstances}
                        progressColor={currentStep.progressColor}
                    />
                    <FlowArrow isActive={stepIndex > 0} />
                    <ScalabilityNode icon={Server} label="On-Premise Core" description="Via ExpressRoute"/>
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
                       {!isLastStep && (
                           <AnimatePresence mode="wait">
                                <motion.div
                                    key={stepIndex}
                                    initial={{ opacity: 0, y: 10}}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <Button onClick={handleNext} size="lg">
                                        {currentStep.buttonText} <Forward className="ml-2"/>
                                    </Button>
                                </motion.div>
                           </AnimatePresence>
                       )}
                       {isLastStep && (
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
