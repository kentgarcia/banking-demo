
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React from "react";
import {
  ArrowLeft,
  BatteryFull,
  Signal,
  Wifi,
  User,
  Mail,
  Lock,
  Check,
  Bell,
  Plus,
  QrCode,
  Send,
  Home,
  Wallet,
  BarChart2 as BarChartIcon,
  Loader2,
  Building,
  Phone,
  CaseSensitive,
  UserPlus,
  ArrowRightLeft,
  ArrowRight,
  Smartphone,
  Cloud,
  Shield,
  Server,
  Network,
  LineChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell, Line, Area } from "recharts";
import { AreaChart } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";


const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function Logo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z"
        fill="url(#paint0_linear_1_2)"
      />
      <path
        d="M50 12.5L84.95 29.69V70.31L50 87.5L15.05 70.31V29.69L50 12.5Z"
        fill="hsl(var(--background))"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1_2"
          x1="50"
          y1="0"
          x2="50"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="hsl(var(--primary))" />
          <stop offset="1" stopColor="hsl(var(--accent))" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
          <span className="text-xl font-bold tracking-wider">NexusForge</span>
        </Link>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2" /> Back to Home
          </Link>
        </Button>
      </div>
    </header>
  );
}

function CreditCardContent() {
  return (
    <div className="flex h-full flex-col justify-between text-white">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold opacity-80">Security Bank</span>
        <div className="h-7 w-10 rounded-md bg-yellow-400/30 backdrop-blur-sm" />
      </div>
      <div className="flex items-end justify-between">
        <span className="font-mono text-sm tracking-widest opacity-70">
          **** **** **** 1234
        </span>
        <div className="flex">
          <div className="h-7 w-7 rounded-full bg-red-500/90" />
          <div className="-ml-3 h-7 w-7 rounded-full bg-orange-400/80" />
        </div>
      </div>
    </div>
  );
}

function OnboardingScreen({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[2rem] bg-[#0a2820] text-white">
      <div className="flex h-full flex-col bg-gradient-to-br from-green-500/20 via-transparent to-green-900/20 p-5 font-sans">
        <header className="flex items-center justify-between text-xs font-light text-neutral-300">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="h-4 w-4" />
            <Wifi className="h-4 w-4" />
            <BatteryFull className="h-4 w-4" />
          </div>
        </header>

        <main className="flex flex-1 flex-col">
          <div className="mt-8">
            <motion.h1
              className="text-4xl font-bold leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Welcome to the
              <br />
              Future of Banking
            </motion.h1>
            <motion.p
              className="mt-4 max-w-xs text-base text-neutral-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Experience cutting-edge features, top-notch security, and instant
              access to your banking made better for you
            </motion.p>
          </div>

          <div className="relative mt-8 h-48 flex-shrink-0">
            <motion.div
              className="absolute top-0 left-1/2 z-20 w-36 -translate-x-1/2 rounded-xl border border-white/10 bg-white/20 p-3 text-center shadow-lg backdrop-blur-md"
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{
                delay: 1,
                duration: 0.5,
                type: "spring",
                stiffness: 100,
              }}
            >
              <p className="text-xl font-semibold">$2537.98</p>
              <p className="text-xs text-neutral-200">Balance</p>
            </motion.div>

            <motion.div
              className="absolute top-8 -left-4 h-40 w-64 origin-bottom-right rounded-2xl border border-white/20 bg-green-400/30 p-4 shadow-2xl backdrop-blur-lg"
              initial={{ opacity: 0, x: -50, rotate: -30 }}
              animate={{ opacity: 1, x: 0, rotate: -20 }}
              transition={{ delay: 0.6, type: "spring" }}
            >
              <CreditCardContent />
            </motion.div>
            <motion.div
              className="absolute top-12 left-8 h-40 w-64 origin-bottom-left rounded-2xl border border-white/20 bg-lime-300/30 p-4 shadow-2xl backdrop-blur-lg"
              initial={{ opacity: 0, x: 50, rotate: 25 }}
              animate={{ opacity: 1, x: 0, rotate: -5 }}
              transition={{ delay: 0.8, type: "spring" }}
            >
              <CreditCardContent />
            </motion.div>
          </div>
        </main>

        <footer className="mt-auto pb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="h-14 w-full rounded-full bg-lime-300 font-bold text-green-900 shadow-lg shadow-lime-300/30 transition hover:bg-lime-400"
              onClick={onGetStarted}
            >
              Get Started
            </Button>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}

function CreateAccountScreen({
  onAccountCreated,
}: {
  onAccountCreated: () => void;
}) {
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onAccountCreated();
      }, 2000); // Show success for 2s then transition
    }, 2500); // Simulate API call
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-[2rem] bg-[#f0f2f5] font-sans text-neutral-800">
      <div className="flex h-full flex-col p-5">
        <header className="flex items-center justify-between text-xs font-light text-neutral-500">
          <span>9:42</span>
          <div className="flex items-center gap-1.5">
            <Signal className="h-4 w-4" />
            <Wifi className="h-4 w-4" />
            <BatteryFull className="h-4 w-4" />
          </div>
        </header>

        <main className="flex flex-1 flex-col pt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold tracking-tight">
              Create Account
            </h1>
            <p className="mt-2 text-neutral-500">Let's get you started.</p>
          </motion.div>

          <motion.form
            className="mt-8 flex-1 space-y-4"
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.3 },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="space-y-2"
            >
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                <Input
                  id="name"
                  value="Juan dela Cruz"
                  readOnly
                  className="pl-10 bg-white"
                />
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="space-y-2"
            >
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="juan.delacruz@email.com"
                  className="pl-10 bg-white"
                />
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="space-y-2"
            >
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 bg-white"
                />
              </div>
            </motion.div>
          </motion.form>
        </main>

        <footer className="mt-auto pb-4">
          <Button
            size="lg"
            className="h-14 w-full rounded-full bg-blue-600 font-bold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700 disabled:bg-blue-600/50"
            onClick={handleSubmit}
            disabled={status !== "idle"}
          >
            {status === "idle" && "Create Account"}
            {status === "submitting" && "Creating Account..."}
          </Button>
        </footer>
      </div>
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-green-500"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex h-24 w-24 items-center justify-center rounded-full bg-white/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Check className="h-16 w-16 text-white" />
            </motion.div>
            <motion.h2
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
            >
              Account Created!
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WelcomeScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 rounded-[2rem] bg-white p-5 font-sans">
      <motion.div
        className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Check className="h-16 w-16 text-green-600" />
      </motion.div>
      <motion.h2
        className="text-center text-2xl font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
      >
        Welcome, Juan!
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
      >
        Your account is ready.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
        className="pt-8"
      >
        <Button
          size="lg"
          className="h-14 rounded-full"
          onClick={onContinue}
        >
          Continue to Dashboard
        </Button>
      </motion.div>
    </div>
  );
}

const chartData = [
  { day: "Sun", income: 2800 },
  { day: "Mon", income: 3100 },
  { day: "Tue", income: 3500 },
  { day: "Wed", income: 2900 },
  { day: "Thu", income: 4249 },
  { day: "Fri", income: 3900 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "rgba(255, 255, 255, 0.4)",
  },
  highlight: {
    label: "Highlight",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

function SendMoneyScreen({
  onBack,
  onSendSuccess,
}: {
  onBack: () => void;
  onSendSuccess: () => void;
}) {
  const [status, setStatus] = React.useState<"idle" | "sending" | "success">(
    "idle"
  );
  const [amount, setAmount] = React.useState("");

  const handleSubmit = () => {
    if (status !== "idle" || !amount) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        onSendSuccess();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-[2rem] bg-neutral-100 font-sans text-neutral-800">
      <div className="flex h-full flex-col">
        <header className="flex items-center p-4">
          <Button variant="ghost" size="icon" className="rounded-full" onClick={onBack}>
            <ArrowLeft />
          </Button>
          <h2 className="font-bold text-lg mx-auto">Send Money</h2>
          <div className="w-10" />
        </header>
        <main className="flex-1 flex flex-col items-center px-4 pt-8">
          <Avatar className="h-20 w-20">
            <AvatarImage src="https://placehold.co/80x80.png" alt="Recipient" data-ai-hint="woman"/>
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <p className="font-bold mt-4">Maria Clara</p>
          <p className="text-sm text-muted-foreground">in your contacts</p>

          <div className="py-4 mt-8 w-full max-w-xs">
            <Label htmlFor="amount" className="sr-only">
              Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-2xl">
                $
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 text-4xl h-16 text-center font-bold bg-white"
                disabled={status !== "idle"}
              />
            </div>
          </div>
        </main>
        <footer className="p-4 pb-8">
          <Button
            onClick={handleSubmit}
            disabled={status !== "idle" || !amount}
            className="w-full h-14 rounded-full"
          >
            {status === "sending" && (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
              </>
            )}
            {status === "success" && (
              <>
                <Check className="mr-2 h-4 w-4" /> Sent Successfully
              </>
            )}
            {status === "idle" && "Send"}
          </Button>
        </footer>
      </div>
    </div>
  );
}

function DashboardScreen({ onSendMoney }: { onSendMoney: () => void }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[2rem] bg-neutral-100 font-sans text-neutral-800">
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between p-4 text-xs font-light text-neutral-500">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="h-4 w-4" />
            <Wifi className="h-4 w-4" />
            <BatteryFull className="h-4 w-4" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 pb-20">
          {/* User Greeting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="@juan" data-ai-hint="man" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Good morning!</p>
                <h2 className="font-bold text-lg">Hello, Juan</h2>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
          </div>

          {/* Balance */}
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-4xl font-bold tracking-tight">$3,945.50</p>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-3 gap-3">
            <Button
              className="h-12 bg-lime-300 text-lime-900 hover:bg-lime-400 font-bold"
              onClick={onSendMoney}
            >
              <Send className="h-5 w-5 mr-2 -ml-1 rotate-[-45deg]" />
              Send
            </Button>
            <Button variant="outline" className="h-12 font-bold">
              <Plus className="h-5 w-5 mr-2 -ml-1" /> Add
            </Button>
            <Button variant="outline" className="h-12 font-bold">
              <QrCode className="h-5 w-5" />
            </Button>
          </div>

          {/* Recent */}
          <div className="mt-8">
            <h3 className="font-bold text-lg">Recent</h3>
            <div className="mt-3 flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="Recipient" data-ai-hint="woman" />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage src="https://placehold.co/40x40.png" alt="Recipient" data-ai-hint="woman portrait" />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <Avatar className="bg-black">
                <span className="font-bold text-white">N</span>
              </Avatar>
              <Avatar className="bg-green-500">
                <span className="font-bold text-white">JP</span>
              </Avatar>
              <Avatar>
                <AvatarFallback>
                  <User className="text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Income Chart */}
          <div className="mt-8">
            <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Income</span>
                  <span className="text-sm font-medium text-green-200">
                    Weekly
                  </span>
                </CardTitle>
                <CardDescription className="text-4xl font-bold text-white pt-2">
                  $3,890.00
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[120px] w-full"
                >
                  <BarChart data={chartData} margin={{ left: -20, bottom: -10 }}>
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          indicator="dot"
                          labelClassName="font-bold text-background"
                          className="bg-foreground text-background"
                        />
                      }
                    />
                    <Bar dataKey="income" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.day === "Thu"
                              ? "hsl(var(--accent))"
                              : "rgba(255, 255, 255, 0.3)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Bottom Nav */}
        <footer className="absolute bottom-0 left-0 right-0 m-3">
          <div className="flex h-16 items-center justify-around rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm">
            <Button variant="ghost" className="rounded-full h-12 w-12 flex-col gap-1 text-primary">
              <Home /> <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" className="rounded-full h-12 w-12 flex-col gap-1 text-muted-foreground">
              <Wallet /> <span className="text-xs">Cards</span>
            </Button>
            <Button size="icon" className="h-16 w-16 rounded-full bg-lime-300 text-lime-900 shadow-md -translate-y-4">
              <QrCode className="h-8 w-8" />
            </Button>
            <Button variant="ghost" className="rounded-full h-12 w-12 flex-col gap-1 text-muted-foreground">
              <BarChartIcon /> <span className="text-xs">Stats</span>
            </Button>
            <Button variant="ghost" className="rounded-full h-12 w-12 flex-col gap-1 text-muted-foreground">
              <User /> <span className="text-xs">Me</span>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function DynamicsLogo() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9999 1.99902L1.99988 5.99902V17.999L11.9999 21.999L21.9999 17.999V5.99902L11.9999 1.99902Z" stroke="#0078D4" strokeWidth="1.5"/>
      <path d="M12 22V12L2 6" stroke="#0078D4" strokeWidth="1.5"/>
      <path d="M12 12L22 6" stroke="#0078D4" strokeWidth="1.5"/>
      <path d="M7 9L17 4" stroke="#0078D4" strokeWidth="1.5"/>
    </svg>
  );
}

function CrmView({
  customerStatus,
  transferMade,
  onNavigateToArchitecture,
}: {
  customerStatus: "onboarding" | "active";
  transferMade: boolean;
  onNavigateToArchitecture: () => void;
}) {
  return (
    <Card className="w-full max-w-lg hidden lg:block">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <DynamicsLogo />
          <CardTitle>Dynamics 365</CardTitle>
        </div>
        <Badge variant={customerStatus === 'active' ? 'default': 'secondary'} className={customerStatus === 'active' ? 'bg-green-500 text-white' : ''}>
            {customerStatus === 'onboarding' ? 'Onboarding' : 'Active Customer'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                  <AvatarImage src="https://placehold.co/64x64.png" alt="@juan" data-ai-hint="man"/>
                  <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                  <h3 className="text-xl font-bold">Juan dela Cruz</h3>
                  <p className="text-muted-foreground">NexusForge Initiative</p>
              </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>juan.delacruz@email.com</span>
              </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
              </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>NexusForge Corp.</span>
              </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CaseSensitive className="h-4 w-4" />
                  <span>Digital Transformation Lead</span>
              </div>
          </div>
        </div>

        <Separator />

        {/* Timeline Section */}
        <div>
          <h3 className="text-lg font-bold mb-4">Timeline</h3>
          <div className="space-y-6">
            <AnimatePresence>
              {transferMade && (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <ArrowRightLeft className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold">Fund Transfer</p>
                    <p className="text-sm text-muted-foreground">
                      Sent money to Maria Clara.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Just now
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              layout
              className="flex items-start gap-4"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <UserPlus className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">Contact Created</p>
                <p className="text-sm text-muted-foreground">
                  Customer successfully onboarded via NexusForge app.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  A few minutes ago
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </CardContent>
      {transferMade && (
        <CardFooter>
            <Button onClick={onNavigateToArchitecture} className="w-full">
                Next: The Architecture Flow <ArrowRight className="ml-2"/>
            </Button>
        </CardFooter>
      )}
    </Card>
  )
}

function MobileApp({
  step,
  setStep,
  onTransferSuccess,
}: {
  step: string;
  setStep: (step: string) => void;
  onTransferSuccess: () => void;
}) {
  const renderStep = () => {
    switch (step) {
      case "onboarding":
        return (
          <OnboardingScreen onGetStarted={() => setStep("createAccount")} />
        );
      case "createAccount":
        return (
          <CreateAccountScreen onAccountCreated={() => setStep("welcome")} />
        );
      case "welcome":
        return <WelcomeScreen onContinue={() => setStep("dashboard")} />;
      case "dashboard":
        return <DashboardScreen onSendMoney={() => setStep("sendMoney")} />;
      case "sendMoney":
        return (
          <SendMoneyScreen
            onBack={() => setStep("dashboard")}
            onSendSuccess={() => {
              setStep("dashboard");
              onTransferSuccess();
            }}
          />
        );
      default:
        return (
          <OnboardingScreen onGetStarted={() => setStep("createAccount")} />
        );
    }
  };

  return (
    <div className="h-full w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full w-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function DataFlowArrow() {
  const arrowVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: 'easeInOut', delay: 1.2 },
    },
  };

  return (
    <motion.div
      className="hidden lg:flex flex-row items-center justify-center self-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, transition: { delay: 0.8, duration: 0.5 } }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.5 } }}
    >
      <div className="flex flex-row items-center gap-4 p-4 text-center">
        <p className="font-semibold text-sm text-muted-foreground">Temenos</p>
        <svg
          width="100"
          height="40"
          viewBox="0 0 100 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-4"
        >
          <motion.path
            d="M5 20 H 95 M80 5 L 95 20 L 80 35"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={arrowVariants}
            initial="hidden"
            animate="visible"
          />
        </svg>
        <p className="font-semibold text-sm text-muted-foreground">
          Dynamics 365
        </p>
      </div>
    </motion.div>
  );
}

function DemoSection({ onNavigateToArchitecture }: { onNavigateToArchitecture: () => void }) {
  const [step, setStep] = React.useState("onboarding");
  const [transferMade, setTransferMade] = React.useState(false);

  return (
    <section
      id="demo"
      className="flex flex-1 flex-col items-center justify-center bg-secondary/50 py-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Interactive Demo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Interact with the Security Bank mobile app prototype and see the
            backend CRM update in real-time.
          </p>
        </motion.div>

        <div className="flex min-h-[732px] flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
          <motion.div
            layout
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <div className="relative mx-auto h-[700px] w-[350px] rounded-[2.5rem] border-[14px] border-neutral-800 bg-neutral-800 shadow-2xl">
              <div className="absolute top-0 left-1/2 h-8 w-[160px] -translate-x-1/2 rounded-b-xl bg-neutral-800" />
              <MobileApp
                step={step}
                setStep={setStep}
                onTransferSuccess={() => setTransferMade(true)}
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {step === "welcome" && <DataFlowArrow />}
          </AnimatePresence>

          <AnimatePresence>
            {(step === "welcome" || step === "dashboard" || step === "sendMoney") && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-lg"
              >
                <CrmView
                  customerStatus={
                    step === "welcome" ? "onboarding" : "active"
                  }
                  transferMade={transferMade}
                  onNavigateToArchitecture={onNavigateToArchitecture}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const architectureSteps = [
    { text: "Request originates from the user's device and enters the secure Azure cloud environment.", pos: { top: "25%", left: "12%" } },
    { text: "Azure's built-in DDoS protection provides the first line of defense against volumetric attacks.", pos: { top: "18%", left: "48%" } },
    { text: "Next, all traffic is inspected by a Palo Alto Next-Generation Firewall (NGFW) for advanced threats.", pos: { top: "35%", left: "48%" } },
    { text: "The validated request is routed to Temenos Infinity running on Azure Kubernetes Service (AKS) to process the business logic.", pos: { top: "52%", left: "48%" } },
    { text: "For core banking actions, the request travels via a private ExpressRoute link, bypassing the public internet for maximum security.", pos: { top: "70%", left: "48%" } },
    { text: "The on-premise Core Banking System confirms the transaction, and a success message is sent back to the customer along the same secure path.", pos: { top: "85%", left: "48%" } },
];


function ArchitectureFlowSection({ onComplete }: { onComplete: () => void }) {
    const [stepIndex, setStepIndex] = React.useState(0);
    const currentStep = architectureSteps[stepIndex];
    const isLastStep = stepIndex >= architectureSteps.length - 1;

    return (
        <section
            id="architecture"
            className="flex flex-1 flex-col items-center justify-center bg-secondary/50 py-16"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="mb-12 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={itemVariants}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Architecture Flow: The Behind the Scenes
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Follow the data as it moves through our secure and robust infrastructure.
                    </p>
                </motion.div>

                <div className="relative mx-auto w-full max-w-5xl rounded-lg border bg-background p-4 shadow-lg md:p-8 min-h-[600px]">
                    {/* Main containers */}
                    <div className="absolute top-4 left-4 flex flex-col items-center gap-2">
                        <Smartphone className="h-8 w-8"/>
                        <span className="font-semibold">Phone</span>
                    </div>

                    <div className="absolute top-1/2 left-1/2 h-[90%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-dashed bg-blue-500/5 p-4">
                        <div className="flex items-center gap-2 text-blue-800">
                            <Cloud className="h-6 w-6"/>
                            <h3 className="text-lg font-bold">Azure Cloud</h3>
                        </div>
                    </div>

                    <div className="absolute bottom-4 left-1/2 h-[25%] w-[50%] -translate-x-1/2 rounded-2xl border-2 border-dashed bg-gray-500/5 p-4">
                         <div className="flex items-center gap-2 text-gray-800">
                            <Server className="h-6 w-6"/>
                            <h3 className="text-lg font-bold">On-Premise Data Center</h3>
                        </div>
                    </div>
                    
                    {/* Diagram Components */}
                    <div className="absolute top-[18%] left-[48%] -translate-x-1/2 flex flex-col items-center gap-1 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Shield/>
                        </div>
                        <p className="text-xs font-semibold">Azure DDoS</p>
                    </div>
                     <div className="absolute top-[35%] left-[48%] -translate-x-1/2 flex flex-col items-center gap-1 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <Shield/>
                        </div>
                        <p className="text-xs font-semibold">Palo Alto NGFW</p>
                    </div>
                     <div className="absolute top-[52%] left-[48%] -translate-x-1/2 flex flex-col items-center gap-1 text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                           <Server/>
                        </div>
                        <p className="text-xs font-semibold">AKS (Temenos)</p>
                    </div>

                    <div className="absolute top-[70%] left-[48%] -translate-x-1/2 flex flex-col items-center gap-1 text-center">
                        <div className="flex items-center gap-2 rounded-full border bg-background px-3 py-1">
                            <Network className="h-4 w-4 text-green-600"/>
                            <p className="text-xs font-semibold">ExpressRoute</p>
                        </div>
                    </div>

                    <div className="absolute top-[85%] left-[48%] -translate-x-1/2 flex flex-col items-center gap-1 text-center">
                         <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                           <Server/>
                        </div>
                        <p className="text-xs font-semibold">Core Banking</p>
                    </div>

                    {/* Animated Dot */}
                    <motion.div
                        className="absolute h-3 w-3 rounded-full bg-primary ring-4 ring-primary/30"
                        animate={{ top: currentStep.pos.top, left: currentStep.pos.left }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        initial={false}
                    />

                    {/* Path Lines */}
                     <svg className="absolute inset-0 h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M200 160 L 380 160" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="4 4" />
                        <path d="M420 135 V 235" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="4 4" />
                        <path d="M420 265 V 335" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="4 4" />
                        <path d="M420 365 V 440" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="4 4" />
                        <path d="M420 460 V 520" strokeWidth="2" stroke="hsl(var(--border))" strokeDasharray="4 4" />
                    </svg>
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

const allLogs = [
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


function LiveDashboardSection() {
    const [logs, setLogs] = React.useState<typeof allLogs>([]);
    const [highlightedTxn, setHighlightedTxn] = React.useState<string | null>(null);
    const scrollAreaRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        setLogs([]);
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
    }, []);

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
            default: return "outline";
        }
    }

    return (
        <section
            id="live-dashboard"
            className="flex-1 flex flex-col items-center justify-center bg-secondary/50 py-16"
        >
            <div className="container mx-auto px-4">
                <motion.div
                    className="mb-12 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={itemVariants}
                >
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Live System Dashboard
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        An overview of system health and a real-time event log.
                    </p>
                </motion.div>

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
    )
}

function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto flex flex-col items-center justify-between py-6 px-4 text-sm text-muted-foreground sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} NexusForge. A PoC for Security Bank.
        </p>
        <p className="mt-2 sm:mt-0">Digital Transformation Initiative</p>
      </div>
    </footer>
  );
}

export default function DemoPage() {
  const [currentScreen, setCurrentScreen] = React.useState<'demo' | 'architecture' | 'liveDashboard'>('demo');

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <motion.main
        className="flex flex-1 flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
        {currentScreen === 'demo' ? (
            <motion.div key="demo" exit={{opacity: 0}}>
                <DemoSection onNavigateToArchitecture={() => setCurrentScreen('architecture')} />
            </motion.div>
        ) : currentScreen === 'architecture' ? (
            <motion.div key="architecture" initial={{opacity: 0}} animate={{opacity: 1}}>
                <ArchitectureFlowSection onComplete={() => setCurrentScreen('liveDashboard')} />
            </motion.div>
        ) : (
            <motion.div key="liveDashboard" initial={{opacity: 0}} animate={{opacity: 1}}>
                <LiveDashboardSection />
            </motion.div>
        )}
        </AnimatePresence>
      </motion.main>
      <Footer />
    </div>
  );
}
