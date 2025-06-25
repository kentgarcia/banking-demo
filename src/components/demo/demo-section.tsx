
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MobileApp } from "./mobile-app";
import { DataFlowArrow } from "./data-flow-arrow";
import { CrmView } from "./crm-view";

export function DemoSection({
  onNavigateToArchitecture,
  simulateFailure,
  onSimulateFailureChange,
}: {
  onNavigateToArchitecture: () => void;
  simulateFailure: boolean;
  onSimulateFailureChange: (value: boolean) => void;
}) {
  const [step, setStep] = React.useState("onboarding");
  const [transferMade, setTransferMade] = React.useState(false);

  const crmVisible = step === "welcome" || step === "dashboard" || step === "sendMoney";

  return (
    <section
      id="demo"
      className="flex w-full flex-col items-center justify-center bg-secondary/50 min-h-screen"
    >
      <div className="container mx-auto px-4">
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
                simulateFailure={simulateFailure}
                onSimulateFailureChange={onSimulateFailureChange}
              />
            </div>
          </motion.div>

          <AnimatePresence>
            {crmVisible && <DataFlowArrow />}
          </AnimatePresence>

          <AnimatePresence>
            {crmVisible && (
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
                  simulateFailure={simulateFailure}
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
