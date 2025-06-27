
"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Image from "next/image";
import {
  ArrowLeft,
  BatteryFull,
  Signal,
  Wifi,
  User,
  Check,
  Bell,
  Plus,
  QrCode,
  Send,
  Home,
  Wallet,
  BarChart2 as BarChartIcon,
  Loader2,
  AlertCircle,
  UploadCloud,
  Camera,
  ScanLine,
  FileCheck2,
  Calendar,
  MapPin,
  ReceiptText,
  TrendingUp,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Cell } from "recharts";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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

function OnboardingContent({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="flex flex-1 flex-col">
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

      <div className="relative mt-12 h-40 flex-shrink-0">
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

      <footer className="mt-auto flex-1 flex items-end pb-4">
        <motion.div
          className="w-full"
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
  );
}

function ReviewInfoContent({ onConfirm }: { onConfirm: () => void }) {
  const [name, setName] = React.useState("Juan dela Cruz");
  const [dob, setDob] = React.useState("January 1, 1990");
  const [address, setAddress] = React.useState("123 Rizal St, Metro Manila");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <>
      <main className="flex flex-1 flex-col pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold tracking-tight">Review Your Information</h1>
          <p className="mt-2 text-base text-neutral-300">
            We've pre-filled your details from your ID. Please confirm they are correct.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex-1 space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white"
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <Input
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white"
              />
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10 bg-white/5 border-white/20 text-white"
              />
            </div>
          </motion.div>
        </motion.div>
      </main>

      <footer className="mt-auto pb-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
        >
          <Button
            size="lg"
            className="h-14 w-full rounded-full bg-lime-300 font-bold text-green-900 shadow-lg shadow-lime-300/30 transition hover:bg-lime-400"
            onClick={onConfirm}
          >
            Confirm & Create Account
          </Button>
        </motion.div>
      </footer>
    </>
  );
}


function EkycContent({ onEkycComplete }: { onEkycComplete: () => void }) {
  const [status, setStatus] = React.useState<"idle" | "scanning">("idle");
  const [progress, setProgress] = React.useState(0);

  const handleUpload = () => {
    setStatus("scanning");
  };

  React.useEffect(() => {
    if (status === "scanning") {
      setProgress(0);
      const timer = setTimeout(() => setProgress(100), 100);
      const completionTimer = setTimeout(() => {
        onEkycComplete();
      }, 3000);
      return () => {
        clearTimeout(timer);
        clearTimeout(completionTimer);
      };
    }
  }, [status, onEkycComplete]);

  return (
    <main className="flex h-full flex-col px-5 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold tracking-tight">Verify Your Identity</h1>
        <p className="mt-2 text-base text-neutral-300">
          For your security, please upload a government-issued ID.
        </p>
      </motion.div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {status === "idle" ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full text-center"
            >
              <div
                onClick={handleUpload}
                className="relative cursor-pointer rounded-2xl border-2 border-dashed border-white/30 bg-white/5 p-8 transition-colors hover:bg-white/10"
              >
                <motion.div 
                  className="absolute inset-0 rounded-2xl border-2 border-lime-400"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <UploadCloud className="mx-auto h-12 w-12 text-lime-300" />
                <p className="mt-4 font-semibold">Tap to upload your ID</p>
                <p className="text-xs text-neutral-400">or use camera</p>
              </div>
              <div className="mt-6 text-left">
                <p className="text-sm font-semibold text-neutral-300">We accept:</p>
                <ul className="mt-2 space-y-1 text-xs text-neutral-400 list-disc list-inside">
                  <li>Passport, Driver's License</li>
                  <li>UMID, PhilSys ID (National ID)</li>
                  <li>Postal ID</li>
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="scanning"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full flex flex-col items-center"
            >
              <div className="relative h-40 w-64">
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <svg width="256" height="160" viewBox="0 0 256 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
                        <rect width="256" height="160" rx="12" fill="#4A5568"/>
                        <rect x="20" y="25" width="50" height="60" rx="4" fill="#718096"/>
                        <rect x="82" y="40" width="112" height="10" rx="5" fill="#A0AEC0"/>
                        <rect x="82" y="60" width="140" height="10" rx="5" fill="#A0AEC0"/>
                        <rect x="20" y="100" width="216" height="8" rx="4" fill="#718096"/>
                        <rect x="20" y="118" width="154" height="8" rx="4" fill="#718096"/>
                    </svg>
                  <motion.div 
                    className="absolute inset-x-0 h-1 bg-lime-300/80 shadow-[0_0_10px_2px_#A3E635]"
                    style={{ y: '-100%' }}
                    animate={{ y: '160px' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
              <p className="mt-4 font-semibold">Scanning ID...</p>
              <Progress value={progress} className="mt-2 h-2 w-64 bg-white/10" indicatorClassName="bg-lime-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="h-14 pb-4" />
    </main>
  );
}

function FaceVerificationContent({ onComplete }: { onComplete: () => void }) {
  const [status, setStatus] = React.useState<"positioning" | "scanning" | "scanned">("positioning");

  React.useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    if (status === "positioning") {
      timers.push(setTimeout(() => setStatus("scanning"), 1500));
    } else if (status === "scanning") {
      // Simulate scan and shutter effect
      timers.push(setTimeout(() => setStatus("scanned"), 2500));
    } else if (status === "scanned") {
      // Transition after showing success
      timers.push(setTimeout(onComplete, 2000));
    }
    return () => timers.forEach(clearTimeout);
  }, [status, onComplete]);

  return (
    <main className="flex h-full flex-col items-center justify-center px-5 text-center">
      <motion.div
        layout
        className="relative h-64 w-64"
      >
        <div className="h-full w-full rounded-full border-4 border-white/20 bg-white/5 overflow-hidden flex items-center justify-center">
            <Image 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="User Face for verification"
                width={256} 
                height={256} 
                className="object-cover h-full w-full" 
            />
        </div>
        {/* Shutter effect */}
        {status === 'scanning' && (
             <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
             />
        )}
        {status === 'scanning' && (
            <>
                <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-lime-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div 
                    className="absolute inset-x-0 h-1 bg-lime-300/80 shadow-[0_0_10px_2px_#A3E635]"
                    initial={{ y: 0 }}
                    animate={{ y: 256 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                />
            </>
        )}
        {status === 'scanned' && (
            <motion.div 
                className="absolute inset-0 flex items-center justify-center rounded-full bg-green-500/50 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Check className="h-32 w-32 text-white" />
            </motion.div>
        )}
      </motion.div>
      <div className="mt-8 h-12">
        <AnimatePresence mode="wait">
            <motion.div
                key={status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
            >
                {status === "positioning" && <p className="text-lg text-neutral-300">Look straight for a moment...</p>}
                {status === "scanning" && <p className="text-lg text-lime-300">Analyzing...</p>}
                {status === "scanned" && (
                    <motion.p 
                        className="text-xl font-bold text-green-400"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        ✅ Match Success: 95%
                    </motion.p>
                )}
            </motion.div>
        </AnimatePresence>
      </div>
      <footer className="h-14 pb-4" />
    </main>
  );
}

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
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {pieces.map((piece, i) => (
        <ConfettiPiece key={i} {...piece} />
      ))}
    </div>
  );
}

function AccountCreatedSuccessScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 rounded-[2rem] bg-white p-5 font-body relative overflow-hidden">
      <Confetti />
      <motion.div
        className="flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.4,
          type: "spring", 
          stiffness: 260, 
          damping: 15 
        }}
      >
        <Check className="h-16 w-16 text-green-600" />
      </motion.div>
      <motion.h2
        className="text-center text-3xl font-bold z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
      >
        Account Created!
      </motion.h2>
      <motion.p
        className="text-center text-muted-foreground max-w-xs z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
      >
        You're now ready to bank smart.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.9 } }}
        className="pt-8 z-10 w-full max-w-xs"
      >
        <Button
          size="lg"
          className="h-14 w-full rounded-full relative overflow-hidden group"
          onClick={onContinue}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full" />
          <span className="relative">Continue</span>
        </Button>
      </motion.div>
    </div>
  );
}

function FeatureCarouselContent({ onComplete }: { onComplete: () => void }) {
  const [slide, setSlide] = React.useState(0);
  const [direction, setDirection] = React.useState(1);

  const features = [
    {
      icon: Send,
      title: "Easy Transfers",
      text: "Move money instantly to anyone, anywhere.",
      color: "text-blue-400",
    },
    {
      icon: ReceiptText,
      title: "Bill Payments",
      text: "Pay your bills on time, every time, hassle-free.",
      color: "text-green-400",
    },
    {
      icon: TrendingUp,
      title: "Investment Insights",
      text: "Grow your wealth with smart, data-driven insights.",
      color: "text-yellow-400",
    },
    {
      icon: Lock,
      title: "Secure 24/7 Access",
      text: "Your finances are protected around the clock.",
      color: "text-purple-400",
    },
  ];

  const paginate = (newDirection: number) => {
    if (slide + newDirection < features.length && slide + newDirection >= 0) {
      setDirection(newDirection);
      setSlide(slide + newDirection);
    }
  };

  const handleNext = () => {
    if (slide < features.length - 1) {
      paginate(1);
    } else {
      onComplete();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: "0%",
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[2rem] bg-white p-5 font-body text-neutral-800">
      <header className="flex items-center justify-end h-8">
        <Button variant="ghost" size="sm" onClick={onComplete}>Skip</Button>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center text-center overflow-hidden relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={slide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x);
              if (swipe > 50) {
                paginate(offset.x < 0 ? 1 : -1);
              }
            }}
            className="absolute flex flex-col items-center justify-center gap-6 w-full px-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, type: 'spring' } }}
            >
              <features[slide].icon className={cn("h-24 w-24", features[slide].color)} strokeWidth={1.5} />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
            >
              <h2 className="text-2xl font-bold">{features[slide].title}</h2>
              <p className="mt-2 text-muted-foreground">{features[slide].text}</p>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="flex flex-col items-center gap-6 pb-4">
        <div className="flex justify-center space-x-2">
          {features.map((_, i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-neutral-300"
              animate={{
                scale: i === slide ? 1.5 : 1,
                backgroundColor: i === slide ? "hsl(var(--primary))" : "#E0E0E0",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          ))}
        </div>
        <Button
          size="lg"
          className="h-14 w-full rounded-full"
          onClick={handleNext}
        >
          {slide === features.length - 1 ? "Enter Dashboard" : "Next"}
          <ArrowRight className="ml-2"/>
        </Button>
      </footer>
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

function DashboardScreen({ onSendMoney }: { onSendMoney: () => void }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[2rem] bg-neutral-100 font-body text-neutral-800">
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
                <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="@juan" />
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
          <div className="mt-6 grid grid-cols-2 gap-3">
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

function SendMoneyScreen({
  onBack,
  onSendSuccess,
  simulateFailure,
  onSimulateFailureChange,
}: {
  onBack: () => void;
  onSendSuccess: () => void;
  simulateFailure: boolean;
  onSimulateFailureChange: (value: boolean) => void;
}) {
  const [status, setStatus] = React.useState<"idle" | "sending" | "success" | "failed">(
    "idle"
  );
  const [amount, setAmount] = React.useState("50.00");

  const handleSubmit = () => {
    if (status !== "idle" || !amount) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus(simulateFailure ? "failed" : "success");
      setTimeout(() => {
        onSendSuccess();
      }, 1500);
    }, 1500);
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-[2rem] bg-neutral-100 font-body text-neutral-800">
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
            <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Recipient" />
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
            <div className="flex items-center space-x-2 mt-4 justify-center">
              <Checkbox id="simulate-failure" checked={simulateFailure} onCheckedChange={onSimulateFailureChange} />
              <label
                htmlFor="simulate-failure"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground"
              >
                Simulate 'Insufficient Funds'
              </label>
            </div>
          </div>
        </main>
        <footer className="p-4 pb-8">
          <Button
            onClick={handleSubmit}
            disabled={status !== "idle" || !amount}
            className="w-full h-14 rounded-full"
            variant={status === "failed" ? "destructive" : "default"}
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
            {status === 'failed' && (
                <>
                    <AlertCircle className="mr-2 h-4 w-4" /> Transaction Failed
                </>
            )}
            {status === "idle" && "Send"}
          </Button>
        </footer>
      </div>
    </div>
  );
}

export function MobileApp({
  step,
  setStep,
  onTransferSuccess,
  simulateFailure,
  onSimulateFailureChange,
}: {
  step: string;
  setStep: (step: string) => void;
  onTransferSuccess: () => void;
  simulateFailure: boolean;
  onSimulateFailureChange: (value: boolean) => void;
}) {

  const onboardingSteps = ['onboarding', 'eKYC', 'faceVerification', 'reviewInfo'];
  if (onboardingSteps.includes(step)) {
    return (
      <div className="h-full w-full overflow-hidden rounded-[2rem] bg-[#0a2820] font-body text-white">
        <div className="relative flex h-full flex-col bg-gradient-to-br from-green-500/20 via-transparent to-green-900/20">
          <header className="z-10 flex items-center justify-between text-xs font-light text-neutral-300 p-5 pt-3">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="h-4 w-4" />
              <Wifi className="h-4 w-4" />
              <BatteryFull className="h-4 w-4" />
            </div>
          </header>
          <div className="flex-1 flex flex-col overflow-hidden">
             <AnimatePresence mode="wait">
              {step === "onboarding" && (
                <motion.div
                  key="onboarding"
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "-100%" }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  className="flex h-full flex-col px-5"
                >
                  <OnboardingContent onGetStarted={() => setStep("eKYC")} />
                </motion.div>
              )}
               {step === "eKYC" && (
                <motion.div
                  key="eKYC"
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "-100%" }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  className="flex h-full flex-col"
                >
                  <EkycContent onEkycComplete={() => setStep("faceVerification")} />
                </motion.div>
              )}
              {step === "faceVerification" && (
                <motion.div
                  key="faceVerification"
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "-100%" }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  className="flex h-full flex-col"
                >
                  <FaceVerificationContent onComplete={() => setStep("reviewInfo")} />
                </motion.div>
              )}
              {step === "reviewInfo" && (
                <motion.div
                  key="reviewInfo"
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ ease: "easeInOut", duration: 0.4 }}
                  className="flex h-full flex-col px-5"
                >
                  <ReviewInfoContent onConfirm={() => setStep("accountCreatedSuccess")} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    );
  }

  const renderStep = () => {
    switch (step) {
      case "accountCreatedSuccess":
        return <AccountCreatedSuccessScreen onContinue={() => setStep("featureCarousel")} />;
      case "featureCarousel":
        return <FeatureCarouselContent onComplete={() => setStep("dashboard")} />;
      case "dashboard":
        return <DashboardScreen onSendMoney={() => setStep("sendMoney")} />;
      case "sendMoney":
        return (
          <SendMoneyScreen
            onBack={() => setStep("dashboard")}
            onSendSuccess={() => {
              const customerStatus = step === "welcome" ? "onboarding" : "active";
              const crmVisible = step === "welcome" || step === "dashboard" || step === "sendMoney";
              setStep("dashboard");
              onTransferSuccess();
            }}
            simulateFailure={simulateFailure}
            onSimulateFailureChange={onSimulateFailureChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full font-body">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-full w-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
