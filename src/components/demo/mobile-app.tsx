"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { BatteryFull, Signal, Wifi } from "lucide-react";

import { OnboardingContent } from "./mobile-app/onboarding-content";
import { EkycContent } from "./mobile-app/ekyc-content";
import { FaceVerificationContent } from "./mobile-app/face-verification-content";
import { ReviewInfoContent } from "./mobile-app/review-info-content";
import { AccountCreatedSuccessScreen } from "./mobile-app/account-created-success-screen";
import { FeatureCarouselContent } from "./mobile-app/feature-carousel-content";
import { DashboardScreen } from "./mobile-app/dashboard-screen";
import { SendMoneyScreen } from "./mobile-app/send-money-screen";

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

  const onboardingSteps = ['onboarding', 'eKYC', 'faceVerification', 'reviewInfo', 'accountCreatedSuccess', 'featureCarousel'];
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
                  exit={{ x: "-100%" }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  className="flex h-full flex-col px-5"
                >
                  <ReviewInfoContent onConfirm={() => setStep("accountCreatedSuccess")} />
                </motion.div>
              )}
              {step === "accountCreatedSuccess" && (
                <motion.div
                  key="accountCreatedSuccess"
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ x: "-100%" }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  className="flex h-full flex-col"
                >
                  <AccountCreatedSuccessScreen onContinue={() => setStep("featureCarousel")} />
                </motion.div>
              )}
              {step === "featureCarousel" && (
                <motion.div
                  key="featureCarousel"
                  initial={{ x: "100%" }}
                  animate={{ x: "0%" }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ ease: "easeInOut", duration: 0.5 }}
                  className="flex h-full flex-col"
                >
                  <FeatureCarouselContent onComplete={() => setStep("dashboard")} />
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
