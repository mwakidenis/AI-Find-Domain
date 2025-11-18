import { generateObject, streamObject } from "ai";
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
  /**
   * OpenAI model to use
   * @see OpenAIResponsesModelId from @ai-sdk/openai for all available models
   * Common models: 'gpt-4o-mini', 'gpt-4o', 'gpt-4-turbo', 'chatgpt-4o-latest'
   */
  model: string;
  /**
   * Custom prompt template (optional)
   * Use {COUNT}, {DOMAINS}, {KEYWORDS} as placeholders
   * If not provided, will try to load from prompt.txt file
   */
  customPrompt?: string;
}

/**
 * Options for building the AI prompt
 */
interface BuildPromptOptions {
  customPrompt?: string;
  domains: string[];
  keywords: string[];
  count: number;
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

/**
 * Builds the prompt for AI domain generation
 * Normalizes domains and keywords internally
 */
function buildPrompt(options: BuildPromptOptions): string {
  const { customPrompt, domains, keywords, count } = options;

  // Normalize inputs
  const normalizedDomains = normalizeStrings(domains);
  const normalizedKeywords = normalizeStrings(keywords);

  // Build prompt from custom prompt, file, or default
  let template = "";
  if (customPrompt) {
    template = customPrompt;
  } else if (existsSync(PROMPT_FILE)) {
    template = readFileSync(PROMPT_FILE, "utf-8");
  } else if (existsSync(PROMPT_EXAMPLE_FILE)) {
    template = readFileSync(PROMPT_EXAMPLE_FILE, "utf-8");
  } else {
    // Fallback to a built-in default prompt
    template = `Generate {COUNT} creative, memorable domain names.
    
Focus on:
- Short and catchy
- Easy to remember
- Professional

${normalizedDomains.length > 0 ? "Similar to: {DOMAINS}" : ""}
${normalizedKeywords.length > 0 ? "Keywords: {KEYWORDS}" : ""}

Return ONLY the domain name without TLD extensions (.com, .io, etc).`;
  }

  const domainsText =
    normalizedDomains.length > 0
      ? normalizedDomains.join(", ")
      : "none provided";
  const keywordsText =
    normalizedKeywords.length > 0
      ? normalizedKeywords.join(", ")
      : "none provided";

  return template
    .replace("{COUNT}", count.toString())
    .replace("{DOMAINS}", domainsText)
    .replace("{KEYWORDS}", keywordsText);
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
  customPrompt,
}: GenerateDomainNamesOptions): Promise<string[]> {
  // Build prompt (normalization happens inside)
  const prompt = buildPrompt({ customPrompt, domains, keywords, count });

  // Initialize OpenAI client
  const openai = createOpenAI({ apiKey });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  try {
    const { object } = await generateObject({
      model: openai(model),
      schema: domainNamesSchema,
      prompt,
      abortSignal: controller.signal,
    });

    clearTimeout(timeout);
    return object.domains
      .map((domain) => {
        const name = domain.split(".")[0];
        return name ? name.toLowerCase().trim() : domain.toLowerCase().trim();
      })
      .filter(Boolean)
      .slice(0, count);
  } catch (error) {
    clearTimeout(timeout);
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error("Request timeout - AI generation took too long");
    }
    throw new Error(
      `Failed to generate domain names: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
    );
  }
}

/**
 * Generates creative domain names using AI with streaming support
 *
 * @param options - Configuration options
 * @returns AsyncGenerator yielding domain names as they are generated
 * @throws Error if API key is invalid or AI generation fails
 *
 * @example
 * ```typescript
 * const generator = generateDomainNamesStream({
 *   domains: ["stripe", "vercel"],
 *   keywords: ["fast", "modern"],
 *   count: 10,
 *   apiKey: process.env.OPENAI_API_KEY!,
 *   model: "gpt-4o-mini"
 * });
 *
 * for await (const domain of generator) {
 *   console.log(`Generated: ${domain}`);
 *   // Check domain availability here
 * }
 * ```
 */
export async function* generateDomainNamesStream({
  domains = [],
  keywords = [],
  count,
  apiKey,
  model,
  customPrompt,
}: GenerateDomainNamesOptions): AsyncGenerator<string, void, unknown> {
  // Build prompt (normalization happens inside)
  const prompt = buildPrompt({ customPrompt, domains, keywords, count });

  // Initialize OpenAI client
  const openai = createOpenAI({ apiKey });

  try {
    // Stream domains from AI
    const { partialObjectStream } = await streamObject({
      model: openai(model),
      schema: domainNamesSchema,
      prompt,
    });

    const seenDomains = new Set<string>();

    for await (const partial of partialObjectStream) {
      if (partial.domains && Array.isArray(partial.domains)) {
        for (const domain of partial.domains) {
          // Skip undefined or empty domains
          if (!domain) continue;

          // Clean and normalize
          const name = domain.split(".")[0];
          const normalized = name
            ? name.toLowerCase().trim()
            : domain.toLowerCase().trim();

          // Yield only new, valid domains
          if (normalized && !seenDomains.has(normalized)) {
            seenDomains.add(normalized);
            yield normalized;

            // Stop if we've generated enough
            if (seenDomains.size >= count) {
              return;
            }
          }
        }
      }
    }
  } catch (error) {
    throw new Error(
      `Failed to generate domain names: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
    );
  }
}
