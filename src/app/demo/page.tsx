"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  BatteryFull,
  Signal,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";

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

function OnboardingScreen() {
  return (
    <div className="h-full w-full overflow-hidden rounded-[2rem] bg-[#0a2820] text-white">
      <div className="flex h-full flex-col bg-gradient-to-br from-green-500/20 via-transparent to-green-900/20 p-5 font-body">
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

          <div className="relative mt-8 flex-1">
            <motion.div
              className="absolute top-6 left-1/2 z-20 w-36 -translate-x-1/2 rounded-xl border border-white/10 bg-white/20 p-3 text-center shadow-lg backdrop-blur-md"
              initial={{ opacity: 0, y: 20, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -5 }}
              transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 100 }}
            >
              <p className="text-xl font-semibold">$2537.98</p>
              <p className="text-xs text-neutral-200">Balance</p>
            </motion.div>

            <div className="absolute top-16 left-0 right-0 h-64">
              <motion.div
                className="absolute -left-4 h-40 w-64 origin-bottom-right rounded-2xl border border-white/20 bg-green-400/30 p-4 shadow-2xl backdrop-blur-lg"
                initial={{ opacity: 0, x: -50, rotate: -30 }}
                animate={{ opacity: 1, x: 0, rotate: -20 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                <CreditCardContent />
              </motion.div>
              <motion.div
                className="absolute top-4 left-8 h-40 w-64 origin-bottom-left rounded-2xl border border-white/20 bg-lime-300/30 p-4 shadow-2xl backdrop-blur-lg"
                initial={{ opacity: 0, x: 50, rotate: 25 }}
                animate={{ opacity: 1, x: 0, rotate: -5 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                <CreditCardContent />
              </motion.div>
            </div>
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
            >
              Get Started
            </Button>
            <Button variant="link" className="mt-2 w-full font-semibold text-white">
              Sign in
            </Button>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}


function DemoSection() {
  return (
    <section
      id="demo"
      className="flex flex-1 flex-col items-center justify-center bg-secondary/50 py-16"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Interactive Demo
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Interact with the Security Bank mobile app prototype, powered by
            Teemenos.
          </p>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative mx-auto h-[700px] w-[350px] rounded-[2.5rem] border-[14px] border-neutral-800 bg-neutral-800 shadow-2xl">
            <div className="absolute top-0 left-1/2 h-8 w-[160px] -translate-x-1/2 rounded-b-xl bg-neutral-800" />
            <OnboardingScreen />
          </div>
        </motion.div>
      </div>
    </section>
  );
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
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <motion.main
        className="flex flex-1 flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <DemoSection />
      </motion.main>
      <Footer />
    </div>
  );
}
