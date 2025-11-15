import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import { existsSync, readFileSync } from "node:fs";

// ============================================================================
// Constants
// ============================================================================

const PROMPT_FILE = "prompt.txt";
const PROMPT_EXAMPLE_FILE = "prompt.example.txt";

// ============================================================================
// Types
// ============================================================================

/**
 * Configuration options for domain name generation
 */
export interface GenerateDomainNamesOptions {
  /** List of example domain names to inspire similar variations */
  domains?: string[];
  /** Keywords to incorporate into generated names */
  keywords?: string[];
  /** Number of domain names to generate */
  count: number;
  /** OpenAI API key for authentication */
  apiKey: string;
  /** OpenAI model to use */
  model: string;
}

// ============================================================================
// Schemas
// ============================================================================

const domainNamesSchema = z.object({
  domains: z
    .array(z.string())
    .describe("Array of creative domain names WITHOUT TLD extensions"),
});

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Normalizes and deduplicates an array of strings
 */
function normalizeStrings(items: string[]): string[] {
  return Array.from(
    new Set(items.map((item) => item.toLowerCase().trim())),
  ).filter(Boolean);
}

// ============================================================================
// Main Function
// ============================================================================

/**
 * Generates creative domain names using AI based on example domains and keywords
 *
 * @param options - Configuration options
 * @returns Promise resolving to array of generated domain names
 * @throws Error if API key is invalid or AI generation fails
 *
 * @example
 * ```typescript
 * const names = await generateDomainNames({
 *   domains: ["stripe", "vercel"],
 *   keywords: ["fast", "modern"],
 *   count: 10,
 *   apiKey: process.env.OPENAI_API_KEY!
 * });
 * ```
 */
export async function generateDomainNames({
  domains = [],
  keywords = [],
  count,
  apiKey,
  model,
}: GenerateDomainNamesOptions): Promise<string[]> {
  // Normalize inputs
  const normalizedDomains = normalizeStrings(domains);
  const normalizedKeywords = normalizeStrings(keywords);

  // Build prompt from template
  const template = existsSync(PROMPT_FILE)
    ? readFileSync(PROMPT_FILE, "utf-8")
    : existsSync(PROMPT_EXAMPLE_FILE)
      ? readFileSync(PROMPT_EXAMPLE_FILE, "utf-8")
      : "";
  const domainsText =
    normalizedDomains.length > 0
      ? normalizedDomains.join(", ")
      : "none provided";
  const keywordsText =
    normalizedKeywords.length > 0
      ? normalizedKeywords.join(", ")
      : "none provided";

  const prompt = template
    .replace("{COUNT}", count.toString())
    .replace("{DOMAINS}", domainsText)
    .replace("{KEYWORDS}", keywordsText);

  // Initialize OpenAI client
  const openai = createOpenAI({ apiKey });

  try {
    // Generate domain names using AI
    const { object } = await generateObject({
      model: openai(model),
      schema: domainNamesSchema,
      prompt,
    });

    // Strip TLD extensions and clean results
    return object.domains
      .map((domain) => {
        const name = domain.split(".")[0];
        return name ? name.toLowerCase().trim() : domain.toLowerCase().trim();
      })
      .filter(Boolean)
      .slice(0, count);
  } catch (error) {
    throw new Error(
      `Failed to generate domain names: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
    );
  }
}
