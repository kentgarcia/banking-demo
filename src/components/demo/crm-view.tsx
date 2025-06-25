
"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from 'react';
import {
  Mail,
  Phone,
  Building,
  CaseSensitive,
  UserPlus,
  ArrowRightLeft,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

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

export function CrmView({
  customerStatus,
  transferMade,
  simulateFailure,
  onNavigateToArchitecture,
}: {
  customerStatus: "onboarding" | "active";
  transferMade: boolean;
  simulateFailure: boolean;
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
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${simulateFailure ? 'bg-red-100' : 'bg-blue-100'}`}>
                    {simulateFailure ? (
                        <AlertCircle className="h-4 w-4 text-red-600" />
                    ) : (
                        <ArrowRightLeft className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{simulateFailure ? 'Fund Transfer Failed' : 'Fund Transfer'}</p>
                    <p className="text-sm text-muted-foreground">
                        {simulateFailure ? 'Reason: Insufficient funds.' : 'Sent money to Maria Clara.'}
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
      <CardFooter>
            <Button onClick={onNavigateToArchitecture} className="w-full">
                Next: The Architecture Flow <ArrowRight className="ml-2"/>
            </Button>
        </CardFooter>
    </Card>
  )
}
