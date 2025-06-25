"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Smartphone,
  Cloud,
  Shield,
  Server,
  Network,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const architectureFlowSteps = [
    { id: 'phone', icon: Smartphone, label: "User's Device", text: "Request originates from the user's device and enters the secure Azure cloud environment." },
    { id: 'ddos', icon: Shield, label: "Azure DDoS Protection", text: "Azure's built-in DDoS protection provides the first line of defense against volumetric attacks." },
    { id: 'ngfw', icon: Shield, label: "Palo Alto NGFW", text: "Next, all traffic is inspected by a Palo Alto Next-Generation Firewall (NGFW) for advanced threats." },
    { id: 'aks', icon: Server, label: "AKS (Temenos)", text: "The validated request is routed to Temenos Infinity running on Azure Kubernetes Service (AKS) to process the business logic." },
    { id: 'expressroute', icon: Network, label: "ExpressRoute", text: "For core banking actions, the request travels via a private ExpressRoute link, bypassing the public internet for maximum security." },
    { id: 'core', icon: Server, label: "On-Premise Core", text: "The on-premise Core Banking System confirms the transaction." },
    { id: 'phone_success', icon: Smartphone, label: "User's Device", text: "A success message is sent back to the customer along the same secure path." },
];

export function ArchitectureFlowSection({ onComplete }: { onComplete: () => void }) {
    const [stepIndex, setStepIndex] = React.useState(0);
    const currentStep = architectureFlowSteps[stepIndex];
    const isLastStep = stepIndex >= architectureFlowSteps.length - 1;

    const StepItem = ({ step, index }: { step: typeof architectureFlowSteps[0], index: number }) => {
        const isActive = stepIndex === index;
        const isDone = stepIndex > index;
        return (
            <motion.div
                className="flex flex-col items-center text-center"
                animate={{ opacity: isDone || isActive ? 1 : 0.5 }}
            >
                <motion.div
                    className={cn("flex h-14 w-14 items-center justify-center rounded-full border-2", isActive ? 'border-primary bg-primary/10' : 'bg-background')}
                    animate={{ scale: isActive ? 1.15 : 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <step.icon className={cn("h-7 w-7", isActive ? 'text-primary' : 'text-muted-foreground')} />
                </motion.div>
                <p className="text-sm font-semibold mt-2">{step.label}</p>
            </motion.div>
        );
    };

    const Connector = ({ index }: { index: number }) => {
        const isDone = stepIndex > index;
        return (
            <motion.div
                className="w-px h-8 bg-border"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isDone ? 1 : 0, transition: { delay: 0.2 } }}
                style={{ transformOrigin: 'top' }}
            />
        );
    };

    const azureStepsData = [architectureFlowSteps[1], architectureFlowSteps[2], architectureFlowSteps[3]];
    const onPremStepData = architectureFlowSteps[5];

    return (
        <section
            id="architecture"
            className="flex w-full flex-col items-center justify-center bg-secondary/50 min-h-screen py-12"
        >
            <div className="container mx-auto px-4">
                <div className="w-full max-w-4xl mx-auto rounded-lg border bg-background p-4 shadow-lg md:p-8">
                    <div className="flex flex-col items-center gap-4">
                        {/* Step 0: Phone */}
                        <StepItem step={architectureFlowSteps[0]} index={0} />
                        <Connector index={0} />
                        
                        {/* Azure Cloud Section */}
                        <div className="w-full p-4 border-2 border-dashed rounded-lg flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-blue-800 self-start">
                                <Cloud className="h-6 w-6"/>
                                <h3 className="text-lg font-bold">Azure Cloud</h3>
                            </div>
                            <Connector index={0} />

                            {/* Steps 1, 2, 3 */}
                            {azureStepsData.map((step, i) => {
                                const overallIndex = i + 1; // 1, 2, 3
                                return (
                                    <React.Fragment key={step.id}>
                                        <StepItem step={step} index={overallIndex} />
                                        {i < azureStepsData.length - 1 && <Connector index={overallIndex} />}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                        <Connector index={3} />

                        {/* Step 4: ExpressRoute */}
                        <StepItem step={architectureFlowSteps[4]} index={4} />
                        <Connector index={4} />

                        {/* On-Premise Section */}
                        <div className="w-full p-4 border-2 border-dashed rounded-lg flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-800 self-start">
                                <Server className="h-6 w-6"/>
                                <h3 className="text-lg font-bold">On-Premise Data Center</h3>
                            </div>
                            <Connector index={4} />
                            <StepItem step={onPremStepData} index={5} />
                        </div>
                        <Connector index={5} />

                        {/* Step 6: Phone Success */}
                        <StepItem step={architectureFlowSteps[6]} index={6} />
                    </div>
                </div>

                <div className="mt-8 text-center max-w-2xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={stepIndex}
                            className="text-lg text-muted-foreground min-h-[56px]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="font-bold text-foreground">Step {stepIndex + 1}: </span>{currentStep.text}
                        </motion.p>
                    </AnimatePresence>
                    <Button
                        onClick={() => {
                            if (isLastStep) {
                                onComplete();
                            } else {
                                setStepIndex(stepIndex + 1);
                            }
                        }}
                        className="mt-6"
                        size="lg"
                    >
                        {isLastStep ? 'Finish & View Dashboard' : 'Next Step'} <ArrowRight className="ml-2"/>
                    </Button>
                </div>
            </div>
        </section>
    );
}
