import { z } from "zod";

// Configuration Types
export const InputConfigSchema = z.object({
  directory: z.string().optional().default("output"),
  tlds: z.array(z.string()).optional().default(["com"]),
  domains: z.array(z.string()).optional().default([]),
  keywords: z.array(z.string()).optional().default([]),
  count: z.number().min(1).max(1000),
  model: z.string(),
  apiKey: z.string().optional(),
  prompt: z.string().optional(),
  promptFile: z.string().optional(),
  save: z.boolean().optional().default(true),
  stream: z.boolean().optional().default(true),
});

export type InputConfig = z.infer<typeof InputConfigSchema>;

// Domain Status Types
export interface DomainStatusResult {
  ok: boolean;
  domain: string;
  available: boolean;
  sale: boolean;
  duration: number;
  createdDate?: string;
  updatedDate?: string;
  expiryDate?: string;
  error?: string;
}

export interface DomainStatusOptions {
  attempts?: number;
  delay?: number;
}

// AI Generation Types
export interface GenerateDomainNamesOptions {
  domains?: string[];
  keywords?: string[];
  count: number;
  apiKey: string;
  model: string;
  customPrompt?: string;
}

// Output Types
export interface OutputResult {
  timestamp: string;
  config: InputConfig;
  generated: string[];
  results: {
    available: string[];
    sale: string[];
    taken: string[];
  };
  summary: {
    total: number;
    available: number;
    sale: number;
    taken: number;
  };
}

// CLI Argument Types
export interface CliArguments {
  apiKey?: string;
  count?: number;
  model?: string;
  keywords?: string[];
  domains?: string[];
  tlds?: string[];
  prompt?: string;
  promptFile?: string;
  directory?: string;
  stream?: boolean;
  save?: boolean;
  input?: string;
  help?: boolean;
}

