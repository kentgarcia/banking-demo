
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Smartphone, ShieldCheck, Shapes, Server, Cloud } from "lucide-react";

const successLogs = [
    { level: "INFO", text: "[12:01:03] Transaction initiated by User 'Juan dela Cruz'." },
    { level: "INFO", text: "[12:01:04] Inbound request received. SSL handshake completed via Azure Front Door." },
    { level: "INFO", text: "[12:01:04] Traffic inspected by Azure DDoS Protection – no threat detected." },
    { level: "INFO", text: "[12:01:05] Packet scanned by Palo Alto NGFW. Rule match: OUTBOUND_TRANSACTION_FLOW (Allowed)." },
    { level: "INFO", text: "[12:01:06] Request received by TransactionService on AKS. Validating credentials..." },
    { level: "INFO", text: "[12:01:07] Routing transaction through private ExpressRoute channel." },
    { level: "SUCCESS", text: "[12:01:08] CoreBank: Transaction #582910 validated & completed." },
    { level: "INFO", text: "[12:01:09] Confirmation sent to user device via secure channel." },
    { level: "SUCCESS", text: "[12:01:10] TRANSACTION SUCCESSFUL. Elapsed Time: 7.0s" },
];

const failureLogs = [
    { level: "INFO", text: "[12:01:03] Transaction initiated by User 'Juan dela Cruz'." },
    { level: "INFO", text: "[12:01:04] Inbound request received. SSL handshake completed via Azure Front Door." },
    { level: "INFO", text: "[12:01:04] Traffic inspected by Azure DDoS Protection – no threat detected." },
    { level: "INFO", text: "[12:01:05] Packet scanned by Palo Alto NGFW. Rule match: OUTBOUND_TRANSACTION_FLOW (Allowed)." },
    { level: "INFO", text: "[12:01:06] Request received by TransactionService on AKS. Validating credentials..." },
    { level: "INFO", text: "[12:01:07] Routing transaction through private ExpressRoute channel." },
    { level: "FAILED", text: "[12:01:08] FAILED: CoreBank declined Transaction #582910. Reason: Insufficient Funds." },
    { level: "INFO", text: "[12:01:09] Failure notification sent to user device via secure channel." },
    { level: "FAILED", text: "[12:01:10] TRANSACTION FAILED. Elapsed Time: 7.0s" },
];

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
                    offsetDistance: "var(--offset, 0%)"
                }}
                initial={{ "--offset": "0%" }}
                animate={{ "--offset": "100%" }}
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
        <div className="relative flex-shrink-0" style={{ width: 150, height: 80 }}>
            <svg width="150" height="80" viewBox="0 0 150 80" className="absolute inset-0">
                <path d={forwardPath} stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="5 5" opacity={0.3} />
                <path d="M132 20 L140 25 L132 30" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" opacity={0.3} />
                <AnimatePresence>
                    {forward && renderPackets(forwardPath, 'hsl(var(--primary))')}
                </AnimatePresence>

                <path d={backwardPath} stroke="hsl(var(--accent))" strokeWidth="2" strokeDasharray="5 5" opacity={0.3} />
                <path d="M18 50 L10 55 L18 60" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" opacity={0.3} />
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
    isActive,
    isError,
}: {
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    isError?: boolean;
}) {
    return (
        <motion.div
            animate={{
                scale: isActive ? 1.05 : 1,
                boxShadow: isError ? '0 0 25px hsl(var(--destructive))' : (isActive ? '0 0 25px hsl(var(--primary))' : 'none')
            }}
            transition={{
                scale: { type: "spring", stiffness: 300, damping: 20 },
                boxShadow: { yoyo: Infinity, duration: 0.8, ease: 'easeInOut' }
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
                </div>
            </div>
        </motion.div>
    );
}


export function LiveDashboardSection({
    simulateFailure,
    onBack,
    onNext,
}: {
    simulateFailure: boolean,
    onBack: () => void,
    onNext: () => void,
}) {
    const [logs, setLogs] = React.useState<(typeof successLogs)>([]);
    const [logIndex, setLogIndex] = React.useState(-1);
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setLogs([]);
        setLogIndex(-1);
        const allLogs = simulateFailure ? failureLogs : successLogs;
        const intervalId = setInterval(() => {
            setLogIndex(prevIndex => {
                const nextIndex = prevIndex + 1;
                if (nextIndex < allLogs.length) {
                    setLogs(prevLogs => [...prevLogs, allLogs[nextIndex]]);
                    return nextIndex;
                } else {
                    clearInterval(intervalId);
                    return prevIndex;
                }
            });
        }, 1500);

        return () => clearInterval(intervalId);
    }, [simulateFailure]);

    React.useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [logs]);

    const getBadgeVariant = (level: string) => {
        switch (level) {
            case "SUCCESS": return "default";
            case "INFO": return "secondary";
            case "WARN": return "destructive";
            case "FAILED": return "destructive";
            default: return "outline";
        }
    }
    
    const isErrorState = simulateFailure && logIndex >= 6;

    return (
        <section
            id="live-dashboard"
            className="w-full flex flex-col items-center justify-center bg-secondary/50 min-h-screen py-12"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Live Dashboard</h2>
                    <p className="text-muted-foreground mt-2">Traceability, monitoring, and auditability of a live transaction.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Architecture Diagram Column */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex items-center justify-center w-full flex-col gap-y-4">
                            <ArchitectureNode icon={Smartphone} label="User's Device" isActive={logIndex === 0 || logIndex >= 8} />

                            <FlowArrow forward={logIndex >= 1 && logIndex <= 6} backward={logIndex >= 7} />
                            
                            <div className="relative rounded-lg border-2 border-dashed border-border p-8 bg-background/50">
                                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 text-muted-foreground">
                                    <Cloud className="h-6 w-6 text-blue-500" />
                                    <span className="font-bold text-lg">Azure Cloud</span>
                                </div>
                                <div className="flex items-center justify-around gap-4">
                                     <ArchitectureNode
                                        icon={ShieldCheck}
                                        label="Security Layer"
                                        isActive={logIndex >= 1 && logIndex <= 3}
                                    />
                                    <FlowArrow forward={logIndex >= 4 && logIndex <= 6} backward={logIndex >= 7} />
                                    <ArchitectureNode icon={Shapes} label="Application Layer" isActive={logIndex >= 4 && logIndex <= 5} />
                                </div>
                            </div>
                           
                            <FlowArrow forward={logIndex >= 5 && logIndex <= 6} backward={logIndex >= 7} />
                            <ArchitectureNode icon={Server} label="On-Premise Core" isActive={logIndex >= 6 && logIndex <= 7} isError={isErrorState} />
                        </div>
                    </div>

                    {/* Log Feed Column */}
                    <div>
                        <Card className="h-full flex flex-col max-h-[700px]">
                            <CardHeader>
                                <CardTitle>Live Event Log</CardTitle>
                                <CardDescription>Streaming events for Transaction #582910</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <ScrollArea className="h-[450px] rounded-md border bg-muted/30 p-2" ref={scrollAreaRef}>
                                    <AnimatePresence>
                                        {logs.map((log, index) => (
                                            <motion.div
                                                key={index}
                                                layout
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="flex items-start gap-3 p-2 text-sm rounded-md transition-colors"
                                            >
                                                <Badge variant={getBadgeVariant(log.level)} className="w-20 justify-center shrink-0">{log.level}</Badge>
                                                <p className="font-mono text-xs flex-1">{log.text}</p>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button onClick={onBack} variant="outline">
                                    <ArrowLeft className="mr-2" /> Back
                                </Button>
                                <Button onClick={onNext}>
                                    Next: Scalability Demo <ArrowRight className="ml-2" />
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
