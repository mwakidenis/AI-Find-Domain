import "dotenv/config";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { checkDomainStatus } from "./utils/whois.js";
import type { DomainStatusResult } from "./utils/whois.js";
import { generateDomainNames } from "./utils/ai.js";
import { wait } from "./utils/wait.js";

// ============================================================================
// Types
// ============================================================================

interface InputConfig {
  directory?: string;
  tlds?: string[];
  domains?: string[];
  keywords?: string[];
  count?: number;
  model?: string;
  apiKey?: string;
  prompt?: string;
  saveOutput?: boolean;
}

interface OutputResult {
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

// ============================================================================
// Configuration
// ============================================================================

const INPUT_FILE = "input.json";

// Default configuration
const DEFAULT_CONFIG = {
  directory: "output",
  tlds: ["com"],
  domains: [] as string[],
  keywords: [] as string[],
  count: 10,
  model: "gpt-4o-mini",
  apiKey: undefined as string | undefined,
  prompt: undefined as string | undefined,
  saveOutput: true,
};

// ============================================================================
// Functions
// ============================================================================

/**
 * Parses CLI arguments
 */
function parseCliArgs() {
  return yargs(hideBin(process.argv))
    .option("directory", {
      alias: "d",
      type: "string",
      description: "Output directory for results",
    })
    .option("tlds", {
      alias: "t",
      type: "array",
      description: "TLDs to check (e.g., com io dev)",
    })
    .option("domains", {
      type: "array",
      description: "Example domains to inspire generation",
    })
    .option("keywords", {
      alias: "k",
      type: "array",
      description: "Keywords to use for generation",
    })
    .option("count", {
      alias: "c",
      type: "number",
      description: "Number of domains to generate",
    })
    .option("model", {
      alias: "m",
      type: "string",
      description: "AI model to use",
    })
    .option("api-key", {
      alias: "a",
      type: "string",
      description: "OpenAI API key (or use OPENAI_API_KEY env var)",
    })
    .option("prompt", {
      alias: "p",
      type: "string",
      description:
        "Custom prompt template (use {COUNT}, {DOMAINS}, {KEYWORDS})",
    })
    .option("prompt-file", {
      type: "string",
      description: "Path to custom prompt template file",
    })
    .option("save", {
      type: "boolean",
      description: "Save results to file (use --no-save to disable)",
      default: true,
    })
    .option("input", {
      alias: "i",
      type: "string",
      description: "Path to input JSON file (optional)",
    })
    .help()
    .alias("help", "h")
    .example(
      "$0 --count 20 --tlds com io --keywords booking sports --api-key sk-xxx",
      "Fully CLI-based: generate 20 domains",
    )
    .example(
      "$0 --keywords tech startup --count 10 --no-save",
      "Generate without saving to file",
    )
    .example(
      "$0 --input myconfig.json --count 50",
      "Use config file and override count",
    )
    .example(
      '$0 --prompt "Generate {COUNT} tech domains" --keywords ai ml --count 5',
      "Use inline custom prompt",
    )
    .parseSync();
}

/**
 * Loads configuration from input.json file and CLI arguments
 * CLI arguments override input.json settings
 * Input file is optional - can work purely from CLI
 */
function loadConfig(cliArgs: ReturnType<typeof parseCliArgs>) {
  let fileConfig: InputConfig = {};

  // Try to load from input file if specified or if default exists
  const inputFile = cliArgs.input;
  if (inputFile && existsSync(inputFile)) {
    try {
      const fileContent = readFileSync(inputFile, "utf-8");
      fileConfig = JSON.parse(fileContent);
      console.log(`✅ Loaded configuration from: ${inputFile}\n`);
    } catch (error) {
      console.error(`❌ Error reading ${inputFile}:`, error);
    }
  } else if (!inputFile && existsSync(INPUT_FILE)) {
    // Load default input.json if it exists and no input file specified
    try {
      const fileContent = readFileSync(INPUT_FILE, "utf-8");
      fileConfig = JSON.parse(fileContent);
      console.log(`✅ Loaded configuration from: ${INPUT_FILE}\n`);
    } catch {
      // Silently fail - we can work without input.json
    }
  }

  // Load prompt from file if prompt-file is specified
  let promptFromFile: string | undefined;
  if (cliArgs["promptFile"]) {
    try {
      promptFromFile = readFileSync(cliArgs["promptFile"] as string, "utf-8");
    } catch (error) {
      console.error(
        `❌ Error reading prompt file ${cliArgs["promptFile"]}:`,
        error,
      );
    }
  }

  // Merge configurations: defaults < file < CLI args
  const config = {
    directory:
      (cliArgs.directory as string) ??
      fileConfig.directory ??
      DEFAULT_CONFIG.directory,
    tlds: (cliArgs.tlds as string[]) ?? fileConfig.tlds ?? DEFAULT_CONFIG.tlds,
    domains:
      (cliArgs.domains as string[]) ??
      fileConfig.domains ??
      DEFAULT_CONFIG.domains,
    keywords:
      (cliArgs.keywords as string[]) ??
      fileConfig.keywords ??
      DEFAULT_CONFIG.keywords,
    count:
      (cliArgs.count as number) ?? fileConfig.count ?? DEFAULT_CONFIG.count,
    model:
      (cliArgs.model as string) ?? fileConfig.model ?? DEFAULT_CONFIG.model,
    apiKey:
      (cliArgs["apiKey"] as string) ??
      fileConfig.apiKey ??
      process.env.OPENAI_API_KEY,
    prompt: (cliArgs.prompt as string) ?? promptFromFile ?? fileConfig.prompt,
    saveOutput:
      cliArgs.save === false
        ? false
        : (fileConfig.saveOutput ?? DEFAULT_CONFIG.saveOutput),
  };

  return config;
}

async function checkDomains(
  names: string[],
  tlds: string[],
): Promise<DomainStatusResult[]> {
  console.log(
    `\n🔍 Checking availability for ${tlds.map((t) => `.${t}`).join(", ")} domains...\n`,
  );

  const results: DomainStatusResult[] = [];

  for (const tld of tlds) {
    console.log(`\n📍 Checking .${tld} domains:\n`);

    for (const name of names) {
      const domain = `${name.toLowerCase()}.${tld}`;
      const result = await checkDomainStatus(domain);

      const status = result.available
        ? "✅ AVAILABLE"
        : result.sale
          ? "💰 SALE"
          : "❌ TAKEN";
      console.log(`${status} - ${domain}`);

      results.push(result);

      await wait(500);
    }
  }

  return results;
}

async function main() {
  // Parse CLI arguments
  const cliArgs = parseCliArgs();

  // Load configuration (CLI args override input.json)
  console.log("📋 Loading configuration...\n");
  const config = loadConfig(cliArgs);

  // Check for API key (from config or environment)
  if (!config.apiKey) {
    console.error("❌ OPENAI_API_KEY is required");
    console.error(
      "   Provide it via --api-key flag or OPENAI_API_KEY environment variable",
    );
    process.exit(1);
  }

  console.log("Configuration:");
  console.log(`  Directory: ${config.directory}`);
  console.log(`  TLDs: ${config.tlds.join(", ")}`);
  console.log(`  Domains: ${config.domains.length}`);
  console.log(`  Keywords: ${config.keywords.length}`);
  console.log(`  Count: ${config.count}`);
  console.log(`  Model: ${config.model}`);
  console.log(`  Custom Prompt: ${config.prompt ? "Yes" : "No"}`);
  console.log(`  Save Output: ${config.saveOutput}\n`);

  // Generate new domain names with AI
  console.log("🤖 Generating new domain names with AI...\n");

  const names = await generateDomainNames({
    domains: config.domains,
    keywords: config.keywords,
    count: config.count,
    apiKey: config.apiKey,
    model: config.model,
    customPrompt: config.prompt,
  });

  console.log(`✨ Generated ${names.length} names:\n`);
  names.forEach((name, i) => console.log(`  ${i + 1}. ${name}`));

  // Check AI-generated domains
  console.log(`\n🤖 Checking ${names.length} AI-generated domains...\n`);
  const results = await checkDomains(names, config.tlds);

  // Group results
  const available = results.filter((r) => r.available);
  const sale = results.filter((r) => !r.available && r.sale);
  const taken = results.filter((r) => !r.available && !r.sale);

  // Display grouped results
  console.log("\n" + "=".repeat(60));
  console.log("📊 SUMMARY");
  console.log("=".repeat(60));

  console.log(`\n✅ AVAILABLE (${available.length}):\n`);
  if (available.length > 0) {
    available.forEach((r, i) => console.log(`✅  ${i + 1}. ${r.domain}`));
  } else {
    console.log("  None found");
  }

  console.log(`\n💰 SALE (${sale.length}):\n`);
  if (sale.length > 0) {
    sale.forEach((r, i) => console.log(`💰  ${i + 1}. ${r.domain}`));
  } else {
    console.log("  None found");
  }

  console.log(`\n❌ TAKEN (${taken.length}):\n`);
  if (taken.length > 0) {
    taken.forEach((r, i) => console.log(`❌  ${i + 1}. ${r.domain}`));
  } else {
    console.log("  None found");
  }

  console.log("\n" + "=".repeat(60));

  // Save results to JSON file if enabled
  if (config.saveOutput) {
    console.log(`\n💾 Saving results to ${config.directory}/ folder...\n`);

    try {
      mkdirSync(config.directory, { recursive: true });

      // Save JSON output with all data
      const outputData: OutputResult = {
        timestamp: new Date().toISOString(),
        config,
        generated: names,
        results: {
          available: available.map((r) => r.domain),
          sale: sale.map((r) => r.domain),
          taken: taken.map((r) => r.domain),
        },
        summary: {
          total: results.length,
          available: available.length,
          sale: sale.length,
          taken: taken.length,
        },
      };

      const outputJsonFile = join(config.directory, "output.json");
      writeFileSync(
        outputJsonFile,
        JSON.stringify(outputData, null, 2),
        "utf-8",
      );
      console.log(`📄 Saved complete results to: ${outputJsonFile}`);
      console.log(`\n   ✅ Available: ${available.length}`);
      console.log(`   💰 For Sale: ${sale.length}`);
      console.log(`   ❌ Taken: ${taken.length}`);

      console.log("\n" + "=".repeat(60));
    } catch (error) {
      console.error("\n❌ Error saving file:", error);
      console.log("\n" + "=".repeat(60));
    }
  } else {
    console.log("\n📋 Results displayed above (not saved to file)\n");
    console.log("=".repeat(60));
  }
}

main().catch(console.error);
