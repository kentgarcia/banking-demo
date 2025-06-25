
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
    <svg width="24" height="24" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_crm)">
        <defs>
        <filter id="filter0_f_crm">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="0.4" result="effect1_foregroundBlur"/>
        </filter>
        <filter id="filter1_f_crm">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="4" result="effect1_foregroundBlur"/>
        </filter>
        <linearGradient id="paint0_linear_crm" x1="38.0451" y1="-1" x2="56.6585" y2="47.7233" gradientUnits="userSpaceOnUse">
        <stop stop-color="#0B53CE"/>
        <stop offset="1" stop-color="#7252AA"/>
        </linearGradient>
        <linearGradient id="paint1_linear_crm" x1="64.1377" y1="93.4922" x2="64.1377" y2="35.4151" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2266E3"/>
        <stop offset="1" stop-color="#AE7FE2"/>
        </linearGradient>
        <linearGradient id="paint2_linear_crm" x1="82" y1="56.7858" x2="62.0764" y2="56.7858" gradientUnits="userSpaceOnUse">
        <stop stop-color="#94B9FF"/>
        <stop offset="0.287843" stop-color="#94B9FF" stop-opacity="0.523646"/>
        <stop offset="1" stop-color="#538FFF" stop-opacity="0"/>
        </linearGradient>
        <clipPath id="clip0_crm">
        <rect width="96" height="96" fill="white"/>
        </clipPath>
        </defs>
        <mask id="mask0_crm" mask-type="alpha" maskUnits="userSpaceOnUse" x="12" y="0" width="70" height="96">
        <path d="M82.0001 31.047C82.0001 26.8209 79.3434 23.051 75.3634 21.6296L17.3453 0.90903C14.7404 -0.0213096 12 1.90988 12 4.676V36.1811C12 37.8715 13.0627 39.3795 14.6547 39.9481L40.6547 49.2338C43.2596 50.1641 46 48.2329 46 45.4668V27.3768C46 25.9794 47.3966 25.0127 48.7044 25.5049L55.5222 28.0707C59.4195 29.5374 62 33.2657 62 37.4299V45.3076L32.6272 56.0399C31.0495 56.6164 30 58.1172 30 59.797V91.2797C30 94.0582 32.7631 95.9903 35.3728 95.0367L75.432 80.3996C79.3763 78.9584 82 75.2064 82 71.007L82.0001 31.047Z" fill="white"/>
        </mask>
        <g mask="url(#mask0_crm)">
        <path d="M12 -1L82.0001 23.9998V58.3245C82.0001 61.0905 79.2601 63.0217 76.6551 62.0917L62 56.8593V37.4241C62 33.258 59.4171 29.5283 55.5172 28.063L48.7034 25.5029C47.3957 25.0116 46 25.9782 46 27.3751V51.1428L12 39V-1Z" fill="url(#paint0_linear_crm)"/>
        <g filter="url(#filter0_f_crm)">
        <path d="M82 31.3998V31.3998C82 35.5992 79.3763 39.3586 75.4319 40.7998L30 57.3999V97.3999L82 78.3998V31.3998Z" fill="black" fill-opacity="0.24"/>
        </g>
        <g filter="url(#filter1_f_crm)">
        <path d="M82 32.9998V32.9998C82 37.1992 79.3763 40.9585 75.4319 42.3997L30 58.9999V98.9999L82 79.9998V32.9998Z" fill="black" fill-opacity="0.32"/>
        </g>
        <path d="M82 30.9998V30.9998C82 35.1992 79.3763 38.9585 75.4319 40.3997L30 56.9999V96.9999L82 77.9998V30.9998Z" fill="url(#paint1_linear_crm)"/>
        <path opacity="0.5" d="M82 30.9998V30.9998C82 35.1992 79.3763 38.9585 75.4319 40.3997L30 56.9999V96.9999L82 77.9998V30.9998Z" fill="url(#paint2_linear_crm)"/>
        <path opacity="0.5" d="M62.0013 45.3202L45.9922 51.1768L45.9923 74.6349C45.9923 76.0323 47.389 76.9989 48.6968 76.5066L55.5241 73.9368C59.4211 72.4699 62.0013 68.7418 62.0013 64.5779V45.3202Z" fill="#B0ADFF"/>
        </g>
        </g>
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
                  <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="@juan" />
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
