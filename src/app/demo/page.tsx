
"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { DemoSection } from "@/components/demo/demo-section";
import { ArchitectureFlowSection } from "@/components/demo/architecture-flow";
import { LiveDashboardSection } from "@/components/demo/live-dashboard";
import { ScalabilitySection } from "@/components/demo/scalability-section";
import { DemoNavigation } from "@/components/demo/demo-navigation";
import { LiveThreatSimulationSection } from "@/components/demo/live-threat-simulation";

export default function DemoPage() {
  const [currentScreen, setCurrentScreen] = React.useState<'demo' | 'architecture' | 'liveDashboard' | 'scalability' | 'threatSimulation'>('demo');
  const [simulateFailure, setSimulateFailure] = React.useState(false);
  const [mobileAppStep, setMobileAppStep] = React.useState('onboarding');
  const [transferMade, setTransferMade] = React.useState(false);

  const handleRestart = () => {
    setCurrentScreen('demo');
    setSimulateFailure(false);
    setMobileAppStep('onboarding');
    setTransferMade(false);
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'demo':
        return (
          <motion.div key="demo" exit={{ opacity: 0 }}>
            <DemoSection
              onNavigateToArchitecture={() => setCurrentScreen('architecture')}
              simulateFailure={simulateFailure}
              onSimulateFailureChange={setSimulateFailure}
              step={mobileAppStep}
              setStep={setMobileAppStep}
              transferMade={transferMade}
              onTransferSuccess={() => setTransferMade(true)}
            />
          </motion.div>
        );
      case 'architecture':
        return (
          <motion.div key="architecture" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ArchitectureFlowSection
              onComplete={() => setCurrentScreen('liveDashboard')}
              onBack={() => setCurrentScreen('demo')}
              simulateFailure={simulateFailure}
            />
          </motion.div>
        );
      case 'liveDashboard':
        return (
          <motion.div key="liveDashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <LiveDashboardSection
              simulateFailure={simulateFailure}
              onBack={() => setCurrentScreen('architecture')}
              onNext={() => setCurrentScreen('scalability')}
            />
          </motion.div>
        );
      case 'scalability':
        return (
          <motion.div key="scalability" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ScalabilitySection
              onBack={() => setCurrentScreen('liveDashboard')}
              onNext={() => setCurrentScreen('threatSimulation')}
              onRestart={handleRestart}
            />
          </motion.div>
        );
      case 'threatSimulation':
        return (
            <motion.div key="threatSimulation" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <LiveThreatSimulationSection
                onBack={() => setCurrentScreen('scalability')}
                onRestart={handleRestart}
              />
            </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="bg-background text-foreground">
      <AnimatePresence mode="wait">
        {renderCurrentScreen()}
      </AnimatePresence>
      <DemoNavigation setCurrentScreen={setCurrentScreen} />
    </main>
  );
}
