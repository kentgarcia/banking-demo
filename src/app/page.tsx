"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Landmark,
  Send,
  Bell,
  Wallet,
  Home,
  Repeat,
  User,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        <Button asChild>
          <Link href="#demo">
            View Demo <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="relative py-24 md:py-32 lg:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-0 h-96 w-96 animate-blob rounded-full bg-primary/20 opacity-50 blur-3xl" />
        <div className="animation-delay-2000 absolute bottom-0 right-0 h-96 w-96 animate-blob rounded-full bg-accent/20 opacity-50 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 text-center">
        <motion.div variants={itemVariants}>
          <h1 className="bg-gradient-to-br from-neutral-900 to-neutral-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            NexusForge: Forging the Future of Digital Banking
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
            This interactive demonstration for Security Bank showcases the
            end-to-end flow of a new customer's first fund transfer.
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Button size="lg" className="mt-8" asChild>
            <Link href="#demo">
              Start the Journey <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section id="demo" className="bg-secondary/50 py-20 md:py-28">
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
            <div className="h-full w-full overflow-hidden rounded-[2rem] bg-white text-neutral-800">
              <div className="flex h-full flex-col font-sans">
                <header className="flex items-center justify-between border-b bg-white p-4">
                  <div className="flex items-center gap-2">
                    <Landmark className="h-6 w-6 text-primary" />
                    <h1 className="text-md font-bold text-neutral-800">
                      Security Bank
                    </h1>
                  </div>
                  <Bell className="h-5 w-5 text-neutral-500" />
                </header>

                <main className="flex-1 overflow-y-auto bg-neutral-50 p-4 text-neutral-900">
                  <p className="text-lg">Welcome back, Alex!</p>

                  <div className="mt-4 rounded-xl bg-gradient-to-br from-primary to-blue-600 p-5 text-primary-foreground shadow-lg">
                    <p className="text-sm opacity-80">Available Balance</p>
                    <p className="mt-1 text-3xl font-bold tracking-tight">
                      $12,450.78
                    </p>
                  </div>

                  <button className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg bg-accent py-3 font-semibold text-accent-foreground shadow-md transition-transform hover:scale-105">
                    <Send className="h-5 w-5" />
                    <span>Send Money</span>
                  </button>

                  <div className="mt-8">
                    <h3 className="font-semibold text-neutral-700">
                      Recent Activity
                    </h3>
                    <div className="mt-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                            <ArrowUpRight className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Netflix</p>
                            <p className="text-sm text-neutral-500">
                              Subscription
                            </p>
                          </div>
                        </div>
                        <p className="font-medium">-$15.99</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <ArrowDownLeft className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Salary</p>
                            <p className="text-sm text-neutral-500">
                              Direct Deposit
                            </p>
                          </div>
                        </div>
                        <p className="font-medium text-green-600">+$2,500.00</p>
                      </div>
                    </div>
                  </div>
                  <p className="mt-8 text-center text-xs text-neutral-400">
                    Powered by Teemenos
                  </p>
                </main>

                <footer className="grid grid-cols-4 items-center border-t bg-white p-2">
                  <a
                    href="#"
                    className="flex flex-col items-center gap-1 rounded-lg py-1 text-primary"
                  >
                    <Home className="h-5 w-5" />
                    <span className="text-xs font-medium">Home</span>
                  </a>
                  <a
                    href="#"
                    className="flex flex-col items-center gap-1 rounded-lg py-1 text-neutral-500 hover:text-primary"
                  >
                    <Wallet className="h-5 w-5" />
                    <span className="text-xs">Accounts</span>
                  </a>
                  <a
                    href="#"
                    className="flex flex-col items-center gap-1 rounded-lg py-1 text-neutral-500 hover:text-primary"
                  >
                    <Repeat className="h-5 w-5" />
                    <span className="text-xs">Transfers</span>
                  </a>
                  <a
                    href="#"
                    className="flex flex-col items-center gap-1 rounded-lg py-1 text-neutral-500 hover:text-primary"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-xs">Profile</span>
                  </a>
                </footer>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CallToActionSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={itemVariants}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Experience the Future?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            This PoC is just the beginning. Discover how NexusForge can
            redefine digital banking for Security Bank.
          </p>
          <Button size="lg" className="mt-8" variant="outline">
            Contact Us
          </Button>
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

export default function NexusForgeLandingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background text-foreground">
      <Header />
      <motion.main
        className="flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <HeroSection />
        <DemoSection />
        <CallToActionSection />
      </motion.main>
      <Footer />
    </div>
  );
}
