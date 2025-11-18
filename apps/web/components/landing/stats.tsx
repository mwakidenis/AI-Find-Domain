"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock, Globe, Cpu } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "40+",
    label: "AI Models",
    description: "OpenAI models supported",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Clock,
    value: "< 3s",
    label: "Generation Time",
    description: "Per domain with streaming",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Globe,
    value: "15+",
    label: "TLD Support",
    description: "Popular extensions checked",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Cpu,
    value: "100%",
    label: "Open Source",
    description: "MIT licensed & free forever",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

export function Stats() {
  return (
    <section className="container py-16 md:py-20">
      <div className="mx-auto flex max-w-[56rem] flex-col items-center space-y-3 text-center mb-8">
        <Badge variant="outline" className="text-xs px-2.5 py-0.5">
          By The Numbers
        </Badge>
        <h2 className="text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
          Powerful Yet Simple
        </h2>
        <p className="max-w-[85%] text-sm leading-relaxed text-muted-foreground sm:text-base">
          Built with modern technology for performance
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="relative overflow-hidden hover:shadow-md transition-all hover:-translate-y-0.5 duration-200"
            >
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-full ${stat.bgColor}`}
                >
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="mb-1 text-3xl font-bold tracking-tight">
                  {stat.value}
                </div>
                <div className="mb-1 text-base font-semibold">{stat.label}</div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-16 mx-auto max-w-4xl">
        <Card className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border-none">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                Trusted by Developers Worldwide
              </h3>
              <p className="text-muted-foreground">
                Join hundreds of developers using Find My Domain to discover
                their perfect domain names
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                ⭐ Open Source
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
