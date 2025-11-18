"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  DollarSign,
  XCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DomainResult {
  domain: string;
  status: "available" | "sale" | "taken";
}

interface DomainResultsProps {
  results: DomainResult[];
}

export function DomainResults({ results }: DomainResultsProps) {
  if (results.length === 0) {
    return null;
  }

  const available = results.filter((r) => r.status === "available");
  const sale = results.filter((r) => r.status === "sale");
  const taken = results.filter((r) => r.status === "taken");

  const availablePercent = (available.length / results.length) * 100;
  const salePercent = (sale.length / results.length) * 100;
  const takenPercent = (taken.length / results.length) * 100;

  const copyToClipboard = (domain: string) => {
    navigator.clipboard.writeText(domain);
    toast.success(`Copied ${domain} to clipboard`);
  };

  const openDomain = (domain: string) => {
    window.open(
      `https://www.namecheap.com/domains/registration/results/?domain=${domain}`,
      "_blank",
    );
  };

  const getStatusIcon = (status: "available" | "sale" | "taken"): string => {
    switch (status) {
      case "available":
        return "✅";
      case "sale":
        return "💰";
      case "taken":
        return "❌";
      default:
        return "⚠️";
    }
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Results</CardTitle>
          <CardDescription className="text-sm">
            Found {available.length} available, {sale.length} for sale, and{" "}
            {taken.length} taken domains
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold">{available.length}</div>
                    <div className="text-xs text-muted-foreground">
                      Available
                    </div>
                  </div>
                </div>
                <Progress value={availablePercent} className="mt-2 h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                  <div>
                    <div className="text-2xl font-bold">{sale.length}</div>
                    <div className="text-xs text-muted-foreground">
                      For Sale
                    </div>
                  </div>
                </div>
                <Progress value={salePercent} className="mt-2 h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <div className="text-2xl font-bold">{taken.length}</div>
                    <div className="text-xs text-muted-foreground">Taken</div>
                  </div>
                </div>
                <Progress value={takenPercent} className="mt-2 h-2" />
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Tabbed Results */}
          <Tabs defaultValue="available" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="available" className="gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Available ({available.length})
              </TabsTrigger>
              <TabsTrigger value="sale" className="gap-2">
                <DollarSign className="h-4 w-4" />
                For Sale ({sale.length})
              </TabsTrigger>
              <TabsTrigger value="taken" className="gap-2">
                <XCircle className="h-4 w-4" />
                Taken ({taken.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-2 mt-4">
              {available.length > 0 ? (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid gap-2">
                    {available.map((result) => (
                      <Card
                        key={result.domain}
                        className="hover:bg-accent/50 transition-colors"
                      >
                        <CardContent className="py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="default"
                                className="bg-green-500 hover:bg-green-600"
                              >
                                {getStatusIcon(result.status)}
                              </Badge>
                              <span className="font-mono text-sm font-medium">
                                {result.domain}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() =>
                                      copyToClipboard(result.domain)
                                    }
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Copy to clipboard
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => openDomain(result.domain)}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Check on Namecheap
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No available domains found
                </div>
              )}
            </TabsContent>

            <TabsContent value="sale" className="space-y-2 mt-4">
              {sale.length > 0 ? (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid gap-2">
                    {sale.map((result) => (
                      <Card
                        key={result.domain}
                        className="hover:bg-accent/50 transition-colors"
                      >
                        <CardContent className="py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="default"
                                className="bg-yellow-500 hover:bg-yellow-600"
                              >
                                {getStatusIcon(result.status)}
                              </Badge>
                              <span className="font-mono text-sm font-medium">
                                {result.domain}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() =>
                                      copyToClipboard(result.domain)
                                    }
                                  >
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Copy to clipboard
                                </TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => openDomain(result.domain)}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  Check on Namecheap
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No domains for sale found
                </div>
              )}
            </TabsContent>

            <TabsContent value="taken" className="space-y-2 mt-4">
              {taken.length > 0 ? (
                <ScrollArea className="h-[400px] pr-4">
                  <div className="grid gap-2">
                    {taken.map((result) => (
                      <Card key={result.domain} className="opacity-60">
                        <CardContent className="py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Badge variant="destructive">
                                {getStatusIcon(result.status)}
                              </Badge>
                              <span className="font-mono text-sm font-medium line-through">
                                {result.domain}
                              </span>
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => copyToClipboard(result.domain)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No taken domains found
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
