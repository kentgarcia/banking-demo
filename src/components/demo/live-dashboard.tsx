
"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const latencyChartData = [
  { time: "14:29:00", latency: 120 },
  { time: "14:29:15", latency: 130 },
  { time: "14:29:30", latency: 110 },
  { time: "14:29:45", latency: 140 },
  { time: "14:30:00", latency: 160 },
  { time: "14:30:15", latency: 150 },
  { time: "14:30:30", latency: 170 },
];
const latencyChartConfig = {
  latency: {
    label: "Latency (ms)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const systemHealthData = [
  { name: "API Gateway", health: 98, fill: "hsl(var(--chart-2))" },
  { name: "Auth Service", health: 99, fill: "hsl(var(--chart-2))" },
  { name: "Temenos", health: 95, fill: "hsl(var(--chart-2))" },
  { name: "Core Banking", health: 100, fill: "hsl(var(--chart-1))" },
  { name: "D365 Sync", health: 92, fill: "hsl(var(--chart-2))" },
];

const systemHealthConfig = {
    health: { label: "Health", color: "hsl(var(--primary))" }
} satisfies ChartConfig;

const successLogs = [
    { level: "INFO", text: "[2:30:00 PM] System check initiated by admin." },
    { level: "INFO", text: "[2:30:01 PM] Traffic from 131.107.x.x passed Palo Alto NGFW inspection. #582910" },
    { level: "INFO", text: "[2:30:02 PM] New user 'Juan dela Cruz' onboarded via Temenos Infinity. #582910" },
    { level: "WARN", text: "[2:30:03 PM] High latency detected on Auth Service (180ms)." },
    { level: "INFO", text: "[2:30:05 PM] API call received by Core Banking System for debit. #582910" },
    { level: "SUCCESS", text: "[2:30:06 PM] Transaction #582910 complete." },
    { level: "INFO", text: "[2:30:07 PM] Dynamics 365 timeline updated for contact 'Juan dela Cruz'." },
    { level: "INFO", text: "[2:30:08 PM] User session for 'maria.clara' initiated." },
    { level: "INFO", text: "[2:30:10 PM] Health check OK for all services." },
];

const failureLogs = [
    { level: "INFO", text: "[2:30:00 PM] System check initiated by admin." },
    { level: "INFO", text: "[2:30:01 PM] Traffic from 131.107.x.x passed Palo Alto NGFW inspection. #582910" },
    { level: "INFO", text: "[2:30:02 PM] New user 'Juan dela Cruz' onboarded via Temenos Infinity. #582910" },
    { level: "WARN", text: "[2:30:03 PM] High latency detected on Auth Service (180ms)." },
    { level: "INFO", text: "[2:30:05 PM] API call received by Core Banking System for debit. #582910" },
    { level: "FAILED", text: "[2:30:06 PM] FAILED: Transaction #582910 declined by Core Banking. Reason: NSF." },
    { level: "INFO", text: "[2:30:07 PM] Dynamics 365 timeline updated for contact 'Juan dela Cruz'." },
    { level: "INFO", text: "[2:30:08 PM] User session for 'maria.clara' initiated." },
    { level: "INFO", text: "[2:30:10 PM] Health check OK for all services." },
]


export function LiveDashboardSection({ simulateFailure }: { simulateFailure: boolean }) {
    const [logs, setLogs] = React.useState<(typeof successLogs)>([]);
    const [highlightedTxn, setHighlightedTxn] = React.useState<string | null>(null);
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setLogs([]);
        const allLogs = simulateFailure ? failureLogs : successLogs;
        let logIndex = 0;
        const intervalId = setInterval(() => {
            if (logIndex < allLogs.length) {
                setLogs(prevLogs => [...prevLogs, allLogs[logIndex]]);
                logIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 1200);

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

    return (
        <section
            id="live-dashboard"
            className="w-full flex flex-col items-center justify-center bg-secondary/50 min-h-screen"
        >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Charts Column */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>API Latency</CardTitle>
                                <CardDescription>Last 90 seconds</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={latencyChartConfig} className="h-[200px] w-full">
                                    <AreaChart data={latencyChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                                        <XAxis dataKey="time" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                                        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} domain={[80, 200]}/>
                                        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
                                        <Area type="monotone" dataKey="latency" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={2}/>
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader>
                                <CardTitle>System Health</CardTitle>
                                <CardDescription>Uptime and performance status</CardDescription>
                            </CardHeader>
                            <CardContent>
                               <ChartContainer config={systemHealthConfig} className="h-[200px] w-full">
                                   <BarChart data={systemHealthData} layout="vertical" margin={{ left: 10, right: 10 }}>
                                       <XAxis type="number" hide />
                                       <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} width={80}/>
                                       <Bar dataKey="health" radius={4} />
                                   </BarChart>
                               </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Log Feed Column */}
                    <div className="lg:col-span-3">
                        <Card className="h-full">
                           <CardHeader className="flex flex-row items-center justify-between">
                               <div>
                                   <CardTitle>Live Event Log</CardTitle>
                                   <CardDescription>Streaming events from the system.</CardDescription>
                               </div>
                               <div className="flex gap-2">
                                   {highlightedTxn && (
                                       <Button variant="outline" onClick={() => setHighlightedTxn(null)}>Clear Highlight</Button>
                                   )}
                                   <Button onClick={() => setHighlightedTxn("#582910")}>
                                      Show Logs for Txn #582910
                                   </Button>
                               </div>
                           </CardHeader>
                           <CardContent>
                               <ScrollArea className="h-[400px] rounded-md border bg-muted/30 p-2" ref={scrollAreaRef}>
                                   <AnimatePresence>
                                       {logs.map((log, index) => (
                                           <motion.div
                                               key={index}
                                               layout
                                               initial={{ opacity: 0, y: 10 }}
                                               animate={{ opacity: 1, y: 0 }}
                                               transition={{ duration: 0.3 }}
                                               className={cn(
                                                   "flex items-start gap-3 p-2 text-sm rounded-md transition-colors",
                                                   highlightedTxn && log.text.includes(highlightedTxn) && "bg-primary/10"
                                               )}
                                           >
                                                <Badge variant={getBadgeVariant(log.level)} className="w-20 justify-center shrink-0">{log.level}</Badge>
                                                <p className="font-mono text-xs flex-1">{log.text}</p>
                                           </motion.div>
                                       ))}
                                   </AnimatePresence>
                               </ScrollArea>
                           </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
