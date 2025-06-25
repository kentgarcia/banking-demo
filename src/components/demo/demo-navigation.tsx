
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu, Smartphone, Waypoints, BarChart2, Scaling } from "lucide-react";

type DemoScreen = 'demo' | 'architecture' | 'liveDashboard' | 'scalability';

interface DemoNavigationProps {
  setCurrentScreen: (screen: DemoScreen) => void;
}

export function DemoNavigation({ setCurrentScreen }: DemoNavigationProps) {
  const navOptions: { name: string; screen: DemoScreen, icon: React.ElementType }[] = [
    { name: "Mobile & CRM Demo", screen: "demo", icon: Smartphone },
    { name: "Architecture Flow", screen: "architecture", icon: Waypoints },
    { name: "Live Dashboard", screen: "liveDashboard", icon: BarChart2 },
    { name: "Scalability Demo", screen: "scalability", icon: Scaling },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            size="icon"
            className="rounded-full w-14 h-14 shadow-lg"
            aria-label="Open demo navigation"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 p-2">
          <div className="flex flex-col space-y-1">
            <p className="font-semibold text-center px-2 py-2 text-muted-foreground">Quick Navigation</p>
            {navOptions.map((option) => (
              <Button
                key={option.screen}
                variant="ghost"
                className="justify-start h-11"
                onClick={() => setCurrentScreen(option.screen)}
              >
                <option.icon className="mr-3 h-5 w-5" />
                {option.name}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
