"use client";

import React from "react";
import { ArrowLeft, Loader2, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function SendMoneyScreen({
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
