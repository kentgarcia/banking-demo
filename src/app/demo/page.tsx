
"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { DemoSection } from "@/components/demo/demo-section";
import { ArchitectureFlowSection } from "@/components/demo/architecture-flow";
import { LiveDashboardSection } from "@/components/demo/live-dashboard";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.2 } },
};

export default function DemoPage() {
  const [currentScreen, setCurrentScreen] = React.useState<'demo' | 'architecture' | 'liveDashboard'>('demo');
  const [simulateFailure, setSimulateFailure] = React.useState(false);

  return (
    <div className="bg-background text-foreground">
      <motion.main
        className="flex flex-col"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
        {currentScreen === 'demo' ? (
            <motion.div key="demo" exit={{opacity: 0}}>
                <DemoSection
                  onNavigateToArchitecture={() => setCurrentScreen('architecture')}
                  simulateFailure={simulateFailure}
                  onSimulateFailureChange={setSimulateFailure}
                />
            </motion.div>
        ) : currentScreen === 'architecture' ? (
            <motion.div key="architecture" initial={{opacity: 0}} animate={{opacity: 1}}>
                <ArchitectureFlowSection
                  onComplete={() => setCurrentScreen('liveDashboard')}
                  simulateFailure={simulateFailure}
                />
            </motion.div>
        ) : (
            <motion.div key="liveDashboard" initial={{opacity: 0}} animate={{opacity: 1}}>
                <LiveDashboardSection 
                    simulateFailure={simulateFailure} 
                    onRestart={() => {
                        setCurrentScreen('demo');
                        setSimulateFailure(false);
                    }}
                />
            </motion.div>
        )}
        </AnimatePresence>
      </main>
    </div>
  );
}
