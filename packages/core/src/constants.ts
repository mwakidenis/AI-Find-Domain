// Default configuration values
export const DEFAULT_CONFIG = {
  DIRECTORY: "output",
  COUNT: 10,
  MODEL: "gpt-4o-mini",
  TLDS: ["com"],
  STREAM: true,
  SAVE: true,
} as const;

// Popular TLDs for quick reference
export const POPULAR_TLDS = [
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
] as const;

// Available OpenAI models
export const AVAILABLE_MODELS = [
  // GPT-4o Family (Recommended)
  "gpt-4o",
  "gpt-4o-mini",
  "gpt-4o-2024-11-20",
  "gpt-4o-2024-08-06",
  "gpt-4o-2024-05-13",
  "gpt-4o-mini-2024-07-18",
  "chatgpt-4o-latest",

  // GPT-4 Family
  "gpt-4",
  "gpt-4-turbo",
  "gpt-4-turbo-2024-04-09",
  "gpt-4-0613",

  // O-Series (Reasoning)
  "o1",
  "o1-2024-12-17",
  "o3",
  "o3-mini",
  "o3-2025-04-16",
  "o3-mini-2025-01-31",

  // GPT-3.5 (Budget)
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-1106",
  "gpt-3.5-turbo-0125",
] as const;

// Status indicators
export const STATUS = {
  AVAILABLE: "✅",
  SALE: "💰",
  TAKEN: "❌",
  CHECKING: "🔍",
  ERROR: "⚠️",
} as const;
