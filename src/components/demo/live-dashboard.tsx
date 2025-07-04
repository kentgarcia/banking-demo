
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
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
    Activity,
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Clock,
    Cpu,
    DollarSign,
    FileClock,
    MemoryStick,
    Network,
    ShieldAlert,
    Timer,
    User,
    Users,
    Wallet,
    XCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const timelineSteps = [
    { name: "Initiated", service: "Mobile App", duration: 1000, icon: User },
    { name: "Authenticated", service: "Azure AD & Front Door", duration: 1500, icon: ShieldAlert },
    { name: "Inspected", service: "Palo Alto NGFW", duration: 1500, icon: ShieldAlert },
    { name: "Processed", service: "Temenos & On-Prem Core", duration: 2000, icon: Cpu },
    { name: "Confirmed", service: "System-wide", duration: 1000, icon: CheckCircle2 },
];

const developerSuccessLogs = [
  { time: '12:01:03', service: 'MobileGateway', level: 'INFO', msg: 'Received POST /api/v1/transfers from 123.45.67.89' },
  { time: '12:01:03', service: 'AuthService', level: 'DEBUG', msg: 'Token validation successful for user: juan.delacruz' },
  { time: '12:01:04', service: 'AzureFrontDoor', level: 'INFO', msg: 'SSL Handshake OK. Routing to aks-main-cluster.' },
  { time: '12:01:04', service: 'PaloAlto-NGFW', level: 'SECURITY', msg: 'Rule #34 matched: ALLOW_INTERNAL_P2P. Src: 10.0.1.5' },
  { time: '12:01:05', service: 'TransactionSvc', level: 'DEBUG', msg: 'Processing transfer #TXN2025... Amount: 50.00' },
  { time: '12:01:06', service: 'ExpressRoute', level: 'INFO', msg: 'Initiating secure tunnel to onprem-core-banking-1' },
  { time: '12:01:07', service: 'CoreBanking', level: 'DEBUG', msg: 'Ledger update initiated for Acct #XXXX-4455' },
  { time: '12:01:08', service: 'CoreBanking', level: 'INFO', msg: 'DEBIT OK. Balance updated.' },
  { time: '12:01:08', service: 'TransactionSvc', level: 'INFO', msg: 'Core banking confirmed success.' },
  { time: '12:01:09', service: 'NotificationSvc', level: 'INFO', msg: 'Dispatching confirmation to user device.' },
  { time: '12:01:10', service: 'CRMSyncSvc', level: 'DEBUG', msg: 'Pushing transaction record to Dynamics 365.' },
];
const developerFailureLogs = [
  ...developerSuccessLogs.slice(0, 7),
  { time: '12:01:08', service: 'CoreBanking', level: 'ERROR', msg: 'DEBIT FAILED. Insufficient funds.' },
  { time: '12:01:08', service: 'TransactionSvc', level: 'WARN', msg: 'Core banking reported failure. Aborting.' },
  { time: '12:01:09', service: 'NotificationSvc', level: 'INFO', msg: 'Dispatching failure reason to user device.' },
];


const TransactionSummaryCard = ({ status }: { status: 'In Progress' | 'Completed' | 'Failed' }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'Completed': return 'bg-green-500 text-white';
            case 'Failed': return 'bg-destructive text-destructive-foreground';
            default: return 'bg-yellow-500 text-white';
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>Transaction Details</span>
                    <Badge className={cn("transition-colors", getStatusColor())}>{status}</Badge>
                </CardTitle>
                <CardDescription>Trace ID: 4a1b8e7b-3f9c-4d2a-810e-8f26e5a1b9c1</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="flex items-center gap-3">
                    <DollarSign className="h-8 w-8 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Amount</p>
                        <p className="font-bold text-lg">$50.00</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Wallet className="h-8 w-8 text-primary" />
                    <div>
                        <p className="text-muted-foreground">From Account</p>
                        <p className="font-bold">Juan dela Cruz</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <User className="h-8 w-8 text-primary" />
                    <div>
                        <p className="text-muted-foreground">To Account</p>
                        <p className="font-bold">Maria Clara</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

const TransactionTimeline = ({
    currentStepIndex,
    failedStepIndex,
    timestamps,
}: {
    currentStepIndex: number;
    failedStepIndex: number | null;
    timestamps: string[];
}) => {
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Transaction Timeline</CardTitle>
                <CardDescription>Real-time status of the transaction processing flow.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {timelineSteps.map((step, index) => {
                        const isCompleted = failedStepIndex === null ? index < currentStepIndex : index < failedStepIndex;
                        const isActive = failedStepIndex === null && index === currentStepIndex;
                        const isFailed = failedStepIndex === index;
                        
                        let statusIcon;
                        if (isFailed) statusIcon = <XCircle className="text-destructive" />;
                        else if (isCompleted) statusIcon = <CheckCircle2 className="text-green-500" />;
                        else if (isActive) statusIcon = <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}><Clock className="text-primary" /></motion.div>;
                        else statusIcon = <Clock className="text-muted-foreground" />;

                        return (
                            <motion.div
                                key={step.name}
                                className="flex items-start gap-4"
                                initial={{ opacity: 0.5, y: 10 }}
                                animate={{ opacity: (isCompleted || isActive || isFailed) ? 1 : 0.5, y: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex h-8 w-8 items-center justify-center shrink-0">
                                    {statusIcon}
                                </div>
                                <div className="flex-1">
                                    <p className={cn("font-semibold", (isActive || isFailed) && "text-primary")}>{step.name}</p>
                                    <p className="text-sm text-muted-foreground">{step.service}</p>
                                </div>
                                <AnimatePresence>
                                {timestamps[index] && (
                                    <motion.p 
                                        initial={{ opacity: 0, x: 10 }} 
                                        animate={{ opacity: 1, x: 0 }} 
                                        className="text-sm text-muted-foreground font-mono"
                                    >
                                        {timestamps[index]}
                                    </motion.p>
                                )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};

const SystemHealthPanel = ({ isOverloaded } : { isOverloaded: boolean }) => {
    const [cpu, setCpu] = React.useState(25);
    const [latency, setLatency] = React.useState(75);

    React.useEffect(() => {
        const interval = setInterval(() => {
            if (isOverloaded) {
                setCpu(c => Math.min(98, c + Math.random() * 10));
                setLatency(l => Math.min(450, l + Math.random() * 30));
            } else {
                setCpu(c => Math.max(25, c + (Math.random() - 0.5) * 5));
                setLatency(l => Math.max(75, l + (Math.random() - 0.5) * 10));
            }
        }, 1500);
        return () => clearInterval(interval);
    }, [isOverloaded]);

    const getHealthColor = (value: number, thresholds: [number, number]) => {
        if (value > thresholds[1]) return 'bg-destructive';
        if (value > thresholds[0]) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const healthItems = [
        { icon: Cpu, label: "AKS CPU Usage", value: `${cpu.toFixed(0)}%`, progress: cpu, color: getHealthColor(cpu, [70, 90]) },
        { icon: MemoryStick, label: "AKS Memory", value: "45%", progress: 45, color: 'bg-green-500' },
        { icon: Timer, label: "Avg. Latency", value: `${latency.toFixed(0)}ms`, progress: latency / 5, color: getHealthColor(latency, [200, 400]) },
        { icon: Network, label: "ExpressRoute Link", value: "Healthy", progress: 100, color: 'bg-green-500' },
        { icon: ShieldAlert, label: "Security Events", value: "0 Blocked", progress: 0, color: 'bg-green-500' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Live performance metrics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {healthItems.map(item => (
                    <div key={item.label}>
                        <div className="flex justify-between items-center text-sm mb-1">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </div>
                            <span className="font-semibold">{item.value}</span>
                        </div>
                        <Progress value={item.progress} indicatorClassName={cn("transition-all duration-500", item.color)} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const DeveloperLogView = ({ logs, visibleCount }: { logs: typeof developerSuccessLogs, visibleCount: number }) => {
    const scrollRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [visibleCount]);
    
    const getLogLevelColor = (level: string) => {
        switch (level) {
            case 'INFO': return 'text-blue-400';
            case 'DEBUG': return 'text-gray-500';
            case 'WARN': return 'text-yellow-400';
            case 'ERROR': return 'text-red-500';
            case 'SECURITY': return 'text-purple-400';
            default: return 'text-white';
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Live System Logs</CardTitle>
                <CardDescription>Streaming logs from all system components.</CardDescription>
            </CardHeader>
            <CardContent>
                <div ref={scrollRef} className="bg-neutral-900 text-white font-mono text-xs rounded-md p-4 h-[550px] overflow-y-auto">
                    {logs.slice(0, visibleCount).map((log, index) => (
                        <motion.p 
                            key={index} 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.1 }}
                            className="mb-1"
                        >
                            <span className="text-gray-400">{log.time}</span>
                            <span className={cn("font-bold mx-2", getLogLevelColor(log.level))}>[{log.level}]</span>
                            <span className="text-green-400">[{log.service}]</span>
                            <span className="text-gray-200 ml-2">{log.msg}</span>
                        </motion.p>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export function LiveDashboardSection({
    simulateFailure,
    onBack,
    onNext,
}: {
    simulateFailure: boolean,
    onBack: () => void,
    onNext: () => void,
}) {
    const [viewMode, setViewMode] = React.useState<'business' | 'developer'>('business');
    const [currentStepIndex, setCurrentStepIndex] = React.useState(0);
    const [failedStepIndex, setFailedStepIndex] = React.useState<number | null>(null);
    const [isComplete, setIsComplete] = React.useState(false);
    const [timestamps, setTimestamps] = React.useState<string[]>([]);
    const [startTime] = React.useState(new Date());

    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const runStep = (index: number) => {
            if (index >= timelineSteps.length) {
                setIsComplete(true);
                return;
            }

            setCurrentStepIndex(index);
            const step = timelineSteps[index];

            const isFailurePoint = simulateFailure && step.name === "Processed";
            
            timeoutId = setTimeout(() => {
                const elapsedTime = ((new Date().getTime() - startTime.getTime()) / 1000).toFixed(2);
                setTimestamps(prev => {
                    const newTimestamps = [...prev];
                    newTimestamps[index] = `+${elapsedTime}s`;
                    return newTimestamps;
                });
                
                if (isFailurePoint) {
                    setFailedStepIndex(index);
                } else {
                    runStep(index + 1);
                }
            }, step.duration);
        };

        runStep(0);

        return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [simulateFailure]);

    const getStatus = (): 'In Progress' | 'Completed' | 'Failed' => {
        if (failedStepIndex !== null) return 'Failed';
        if (isComplete) return 'Completed';
        return 'In Progress';
    };

    const devLogsToShow = React.useMemo(() => {
        if (failedStepIndex !== null) {
          if (failedStepIndex === 3) return 8;
          return developerFailureLogs.length;
        }
        if (isComplete) return developerSuccessLogs.length;
    
        switch (currentStepIndex) {
          case 0: return 1;
          case 1: return 3;
          case 2: return 4;
          case 3: return 8;
          case 4: return developerSuccessLogs.length;
          default: return 0;
        }
    }, [currentStepIndex, failedStepIndex, isComplete]);

    return (
        <section
            id="live-dashboard"
            className="w-full flex flex-col items-center justify-center bg-secondary/50 min-h-screen py-12"
        >
            <div className="container mx-auto px-4">
                <div className="text-center mb-4">
                    <h2 className="text-3xl font-bold tracking-tight">Live Transaction Dashboard</h2>
                    <p className="text-muted-foreground mt-2">Traceability, monitoring, and auditability of a live transaction.</p>
                </div>
                
                <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-full">
                    <div className="flex justify-center my-4">
                        <TabsList className="grid w-full max-w-md grid-cols-2">
                            <TabsTrigger value="business"><Users className="mr-2"/>Business View</TabsTrigger>
                            <TabsTrigger value="developer"><Activity className="mr-2"/>Developer View</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="business">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            <div className="lg:col-span-2">
                                <TransactionSummaryCard status={getStatus()} />
                                <TransactionTimeline
                                    currentStepIndex={currentStepIndex}
                                    failedStepIndex={failedStepIndex}
                                    timestamps={timestamps}
                                />
                            </div>
                            <div className="lg:col-span-1 space-y-8">
                                <SystemHealthPanel isOverloaded={simulateFailure && failedStepIndex !== null} />
                                <AnimatePresence>
                                {failedStepIndex !== null && (
                                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                        <Alert variant="destructive">
                                            <FileClock className="h-4 w-4" />
                                            <AlertTitle>Processing Failure</AlertTitle>
                                            <AlertDescription>
                                                The Core Banking System declined the transaction due to insufficient funds.
                                            </AlertDescription>
                                        </Alert>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="developer">
                        <DeveloperLogView 
                            logs={simulateFailure ? developerFailureLogs : developerSuccessLogs} 
                            visibleCount={devLogsToShow} 
                        />
                    </TabsContent>
                </Tabs>

                <Card className="mt-8">
                    <CardFooter className="flex justify-between py-4">
                        <Button onClick={onBack} variant="outline">
                            <ArrowLeft className="mr-2" /> Back to Architecture
                        </Button>
                        <Button onClick={onNext} disabled={!isComplete && failedStepIndex === null}>
                            Next: Scalability Demo <ArrowRight className="ml-2" />
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </section>
    );
}

    