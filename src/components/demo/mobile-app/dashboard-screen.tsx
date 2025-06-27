"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  BarChart as BarChartIcon,
  Bell,
  Home,
  Plus,
  Send,
  Signal,
  Wallet,
  Wifi,
  BatteryFull,
} from "lucide-react";
import { BarChart, Bar, XAxis, CartesianGrid, Cell } from "recharts";

const chartData = [
  { day: "Sun", income: 2800 },
  { day: "Mon", income: 3100 },
  { day: "Tue", income: 3500 },
  { day: "Wed", income: 2900 },
  { day: "Thu", income: 4249 },
  { day: "Fri", income: 3900 },
];

const chartConfig = {
  income: {
    label: "Income",
    color: "rgba(255, 255, 255, 0.4)",
  },
  highlight: {
    label: "Highlight",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export function DashboardScreen({ onSendMoney }: { onSendMoney: () => void }) {
  return (
    <div className="h-full w-full overflow-hidden rounded-[2rem] bg-neutral-100 font-body text-neutral-800">
      <div className="flex h-full flex-col">
        <header className="flex items-center justify-between p-4 text-xs font-light text-neutral-500">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="h-4 w-4" />
            <Wifi className="h-4 w-4" />
            <BatteryFull className="h-4 w-4" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 pb-20">
          {/* User Greeting */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="@juan" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">Good morning!</p>
                <h2 className="font-bold text-lg">Hello, Juan</h2>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
          </div>

          {/* Balance */}
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">Available Balance</p>
            <p className="text-4xl font-bold tracking-tight">$3,945.50</p>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              className="h-12 bg-lime-300 text-lime-900 hover:bg-lime-400 font-bold"
              onClick={onSendMoney}
            >
              <Send className="h-5 w-5 mr-2 -ml-1 rotate-[-45deg]" />
              Send
            </Button>
            <Button variant="outline" className="h-12 font-bold">
              <Plus className="h-5 w-5 mr-2 -ml-1" /> Add
            </Button>
          </div>

          {/* Income Chart */}
          <div className="mt-8">
            <Card className="bg-gradient-to-br from-green-600 to-green-800 text-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Income</span>
                  <span className="text-sm font-medium text-green-200">
                    Weekly
                  </span>
                </CardTitle>
                <CardDescription className="text-4xl font-bold text-white pt-2">
                  $3,890.00
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="h-[120px] w-full"
                >
                  <BarChart data={chartData} margin={{ left: -20, bottom: -10 }}>
                    <CartesianGrid
                      vertical={false}
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          indicator="dot"
                          labelClassName="font-bold text-background"
                          className="bg-foreground text-background"
                        />
                      }
                    />
                    <Bar dataKey="income" radius={[8, 8, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.day === "Thu"
                              ? "hsl(var(--accent))"
                              : "rgba(255, 255, 255, 0.3)"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </main>

        {/* Bottom Nav */}
        <footer className="absolute bottom-0 left-0 right-0 m-3">
          <div className="flex h-16 items-center justify-around rounded-full bg-background/80 p-2 shadow-lg backdrop-blur-sm">
            <Button variant="ghost" className="rounded-full h-12 w-12 flex-col gap-1 text-primary">
              <Home /> <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" className="rounded-full h-12 w-12 flex-col gap-1 text-muted-foreground">
              <Wallet /> <span className="text-xs">Cards</span>
            </Button>
            <Button variant="ghost" className="rounded-full h-12 w-12 flex-col gap-1 text-muted-foreground">
              <BarChartIcon /> <span className="text-xs">Stats</span>
            </Button>
            <Button variant="ghost" className="rounded-full h-12 w-12 flex-col gap-1 text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src="https://randomuser.me/api/portraits/men/32.jpg" alt="@juan" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-xs">Me</span>
            </Button>
          </div>
        </footer>
      </div>
    </div>
  );
}
