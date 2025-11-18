"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, X, Plus } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
// Import only types and constants from core (browser-safe)
const POPULAR_TLDS = [
  "com",
  "io",
  "dev",
  "ai",
  "app",
  "net",
  "org",
  "co",
  "tech",
  "sh",
  "xyz",
  "me",
  "so",
  "gg",
  "fm",
  "to",
  "cc",
  "tv",
  "vc",
  "ws",
  "us",
  "biz",
  "info",
  "online",
  "site",
] as const;
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface DomainGeneratorFormProps {
  onGenerate: (config: {
    keywords: string[];
    domains: string[];
    tlds: string[];
    count: number;
  }) => void;
  loading: boolean;
  disabled?: boolean;
  isSignedIn?: boolean;
  onSignInRequired?: () => void;
}

export function DomainGeneratorForm({
  onGenerate,
  loading,
  disabled = false,
  isSignedIn = false,
  onSignInRequired,
}: DomainGeneratorFormProps) {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [domains, setDomains] = useState<string[]>([]);
  const [domainInput, setDomainInput] = useState("");
  const [selectedTlds, setSelectedTlds] = useState<string[]>(["com", "io"]);
  const [count, setCount] = useState([10]);
  const [streamMode, setStreamMode] = useState(true);

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
      toast.success(`Added keyword: ${keywordInput.trim()}`);
    }
  };

  const handleAddDomain = () => {
    if (domainInput.trim() && !domains.includes(domainInput.trim())) {
      setDomains([...domains, domainInput.trim()]);
      setDomainInput("");
      toast.success(`Added domain: ${domainInput.trim()}`);
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
    toast.info(`Removed keyword: ${keyword}`);
  };

  const handleRemoveDomain = (domain: string) => {
    setDomains(domains.filter((d) => d !== domain));
    toast.info(`Removed domain: ${domain}`);
  };

  const toggleTld = (tld: string) => {
    if (selectedTlds.includes(tld)) {
      if (selectedTlds.length > 1) {
        setSelectedTlds(selectedTlds.filter((t) => t !== tld));
      } else {
        toast.error("You must select at least one TLD");
      }
    } else {
      setSelectedTlds([...selectedTlds, tld]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (keywords.length === 0 && domains.length === 0) {
      toast.error("Please add at least one keyword or example domain");
      return;
    }

    // Check if user is signed in - if not, trigger parent callback
    if (!isSignedIn) {
      if (onSignInRequired) {
        onSignInRequired();
      }
      return;
    }

    onGenerate({
      keywords,
      domains,
      tlds: selectedTlds,
      count: count[0],
    });

    toast.success("Generating domains...");
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5" />
            Domain Generator
          </CardTitle>
          <CardDescription className="text-sm">
            Configure your domain generation settings. This demo uses{" "}
            <strong>real OpenAI + WHOIS</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Keywords Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="keywords" className="text-sm font-medium">
                  Keywords
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="cursor-help">
                      Optional
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Keywords will be incorporated into generated domain names
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-2">
                <Input
                  id="keywords"
                  placeholder="e.g., tech, startup, fast"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddKeyword();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddKeyword}
                  variant="secondary"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {keywords.length > 0 && (
                <ScrollArea className="h-20 rounded-md border p-2">
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword) => (
                      <Badge
                        key={keyword}
                        variant="secondary"
                        className="gap-1"
                      >
                        {keyword}
                        <button
                          type="button"
                          onClick={() => handleRemoveKeyword(keyword)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>

            <Separator />

            {/* Example Domains Section */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="domains" className="text-sm font-medium">
                  Example Domains
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge variant="outline" className="cursor-help">
                      Optional
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>AI will generate similar domain names</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex gap-2">
                <Input
                  id="domains"
                  placeholder="e.g., stripe, vercel, notion"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddDomain();
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={handleAddDomain}
                  variant="secondary"
                  size="icon"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {domains.length > 0 && (
                <ScrollArea className="h-20 rounded-md border p-2">
                  <div className="flex flex-wrap gap-2">
                    {domains.map((domain) => (
                      <Badge key={domain} variant="secondary" className="gap-1">
                        {domain}
                        <button
                          type="button"
                          onClick={() => handleRemoveDomain(domain)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>

            <Separator />

            {/* TLDs Section */}
            <div className="space-y-2.5">
              <Label className="text-sm font-medium">TLDs to Check</Label>
              <ScrollArea className="h-24 rounded-md border p-3">
                <div className="flex flex-wrap gap-2">
                  {POPULAR_TLDS.map((tld) => (
                    <Badge
                      key={tld}
                      variant={
                        selectedTlds.includes(tld) ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => toggleTld(tld)}
                    >
                      .{tld}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </div>

            <Separator />

            {/* Count Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="count" className="text-sm font-medium">
                  Number of Domains: {count[0]}
                </Label>
                <Badge variant="secondary">{count[0]} domains</Badge>
              </div>
              <Slider
                id="count"
                min={1}
                max={25}
                step={1}
                value={count}
                onValueChange={setCount}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Demo limited to 25 domains maximum
              </p>
            </div>

            <Separator />

            {/* Stream Mode Toggle */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="stream-mode" className="text-sm font-medium">
                  Streaming Mode
                </Label>
                <p className="text-xs text-muted-foreground">
                  Get results as they&apos;re generated
                </p>
              </div>
              <Switch
                id="stream-mode"
                checked={streamMode}
                onCheckedChange={setStreamMode}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading || disabled || selectedTlds.length === 0}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Domains
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
