import "dotenv/config";
import { writeFileSync, mkdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { checkDomainStatus } from "./utils/whois.js";
import type { DomainStatusResult } from "./utils/whois.js";
import {
  generateDomainNames,
  generateDomainNamesStream,
} from "./utils/ai.js";
import { wait } from "./utils/wait.js";
import * as logger from "./utils/logger.js";

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
  save?: boolean;
  stream?: boolean;
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
  save: true,
  stream: true,
};

// ============================================================================
// Functions
// ============================================================================

/**
 * Parses CLI arguments
 */
function parseCliArgs() {
  return yargs(hideBin(process.argv))
    .scriptName("find-my-domain")
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
    .option("stream", {
      alias: "s",
      type: "boolean",
      description: "Enable streaming mode (use --no-stream for batch mode)",
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
      "$0 --keywords ai ml --count 10 --no-stream",
      "Use batch mode instead of streaming",
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
    save:
      cliArgs.save === false
        ? false
        : (fileConfig.save ?? DEFAULT_CONFIG.save),
    stream:
      cliArgs.stream === false
        ? false
        : (fileConfig.stream ?? DEFAULT_CONFIG.stream),
  };

  return config;
}

async function checkDomainsBatch(
  names: string[],
  tlds: string[],
): Promise<DomainStatusResult[]> {
  const totalChecks = names.length * tlds.length;
  logger.startTimer("checking");
  logger.spacer();
  logger.log(
    "🔍",
    `Checking ${totalChecks} domain(s) across ${tlds.map((t) => `.${t}`).join(", ")}`,
  );
  logger.spacer();

  const results: DomainStatusResult[] = [];
  let checksCompleted = 0;

  for (const tld of tlds) {
    logger.spacer();
    logger.log("📍", `Checking .${tld} domains (${names.length} names)`);
    logger.spacer();

    for (const name of names) {
      const domain = `${name.toLowerCase()}.${tld}`;
      const result = await checkDomainStatus(domain);

      const emoji = result.available ? "✅" : result.sale ? "💰" : "❌";
      const status = result.available
        ? "AVAILABLE"
        : result.sale
          ? "FOR SALE "
          : "TAKEN    ";

      checksCompleted++;
      const responseTime = logger.formatTime(result.duration / 1000);
      console.log(
        `  ${emoji} ${status} - ${domain} (${responseTime}) [${checksCompleted}/${totalChecks}]`,
      );

      results.push(result);

      await wait(500);
    }
  }

  const totalElapsed = logger.getElapsed("checking");
  const avgTime = totalElapsed / results.length;
  logger.spacer();
  logger.log(
    "🏁",
    `Completed ${results.length} checks in ${logger.formatTime(totalElapsed)} (avg: ${logger.formatTime(avgTime)}/domain)`,
  );

  return results;
}

async function checkDomainsStreaming(
  domainGenerator: AsyncGenerator<string>,
  tlds: string[],
): Promise<{ results: DomainStatusResult[]; names: string[] }> {
  const results: DomainStatusResult[] = [];
  const names: string[] = [];

  logger.spacer();
  logger.log("🔍", "Starting streaming domain checks...");
  logger.startTimer("checking");
  logger.spacer();

  // Process each domain as it's generated
  for await (const name of domainGenerator) {
    names.push(name);

    // Show generation immediately
    logger.log("✨", `Generated: ${name}`);
    logger.spacer();

    // Check each TLD sequentially
    for (const tld of tlds) {
      const domain = `${name}.${tld}`;
      const result = await checkDomainStatus(domain);
      results.push(result);

      // Display result immediately
      const emoji = result.available ? "✅" : result.sale ? "💰" : "❌";
      const status = result.available
        ? "AVAILABLE"
        : result.sale
          ? "FOR SALE "
          : "TAKEN    ";
      const responseTime = logger.formatTime(result.duration / 1000);

      console.log(`  ${emoji} ${status} - ${domain} (${responseTime})`);

      // Small delay to avoid rate limiting
      await wait(500);
    }

    logger.spacer();
  }

  const totalElapsed = logger.getElapsed("checking");
  const avgTime = results.length > 0 ? totalElapsed / results.length : 0;
  logger.log(
    "🏁",
    `Completed ${results.length} checks in ${logger.formatTime(totalElapsed)} (avg: ${logger.formatTime(avgTime)}/domain)`,
  );

  return { results, names };
}

/**
 * Validates and normalizes configuration
 */
function validateConfig(config: InputConfig): void {
  // Validate API key
  if (!config.apiKey) {
    console.error("❌ Error: OPENAI_API_KEY is required");
    console.error("   Provide it via:");
    console.error("   • --api-key flag");
    console.error("   • OPENAI_API_KEY environment variable");
    console.error("   • .env file\n");
    process.exit(1);
  }

  // Validate count
  if (!config.count || config.count <= 0) {
    console.error("❌ Error: Count must be greater than 0");
    console.error(`   Current value: ${config.count}\n`);
    process.exit(1);
  }

  if (config.count > 100) {
    console.warn(
      "⚠️  Warning: Generating more than 100 domains may take a while and use significant API credits\n",
    );
  }

  // Validate TLDs
  if (!config.tlds || config.tlds.length === 0) {
    console.error("❌ Error: At least one TLD is required");
    console.error("   Example: --tlds com io dev\n");
    process.exit(1);
  }

  // Normalize TLDs (remove leading dots)
  config.tlds = config.tlds.map((tld) => tld.replace(/^\.+/, "").toLowerCase());

  // Warn if both domains and keywords are empty
  if (
    (!config.domains || config.domains.length === 0) &&
    (!config.keywords || config.keywords.length === 0)
  ) {
    console.warn("⚠️  Warning: No domains or keywords provided");
    console.warn("   AI will generate generic domain names\n");
  }
}

async function main() {
  logger.banner("🔍 FIND MY DOMAIN - AI-Powered Domain Generator");

  // Parse CLI arguments
  const cliArgs = parseCliArgs();

  // Load configuration (CLI args override input.json)
  logger.startTimer("config");
  logger.log("📋", "Loading configuration...");
  const config = loadConfig(cliArgs);

  // Validate configuration
  validateConfig(config);

  logger.spacer();
  logger.success("Configuration loaded", "config");
  logger.spacer();
  console.log(`  📂 Directory: ${config.directory}`);
  console.log(`  🌐 TLDs: ${config.tlds.join(", ")}`);
  console.log(`  📝 Example Domains: ${config.domains.length}`);
  console.log(`  🔑 Keywords: ${config.keywords.length}`);
  console.log(`  🎯 Count: ${config.count}`);
  console.log(`  🤖 AI Model: ${config.model}`);
  console.log(`  📄 Custom Prompt: ${config.prompt ? "Yes" : "No"}`);
  console.log(`  💾 Save: ${config.save}`);
  console.log(`  ⚡ Stream: ${config.stream ? "Enabled" : "Disabled (Batch)"}`);

  // Generate and check domains
  logger.spacer();
  logger.startTimer("total");

  let results: DomainStatusResult[];
  let names: string[];

  try {
    if (config.stream) {
      // Streaming mode: generate and check domains as they come
      logger.log("🤖", "Starting AI domain generation stream...");

      const domainGenerator = generateDomainNamesStream({
        domains: config.domains,
        keywords: config.keywords,
        count: config.count,
        apiKey: config.apiKey,
        model: config.model,
        customPrompt: config.prompt,
      });

      const streamResult = await checkDomainsStreaming(
        domainGenerator,
        config.tlds,
      );
      results = streamResult.results;
      names = streamResult.names;
    } else {
      // Batch mode: generate all first, then check
      logger.startTimer("ai");
      logger.log("🤖", `Generating ${config.count} domain names with AI...`);

      names = await generateDomainNames({
        domains: config.domains,
        keywords: config.keywords,
        count: config.count,
        apiKey: config.apiKey,
        model: config.model,
        customPrompt: config.prompt,
      });

      logger.spacer();
      logger.success(`Generated ${names.length} domain names`, "ai");
      logger.spacer();
      names.forEach((name, i) => console.log(`  ${i + 1}. ${name}`));

      results = await checkDomainsBatch(names, config.tlds);
    }

    // Validate we got results
    if (!results || results.length === 0) {
      logger.spacer();
      logger.error("No domains were generated or checked");
      console.error("   This could be due to:");
      console.error("   • API rate limits");
      console.error("   • Invalid model name");
      console.error("   • Network issues\n");
      process.exit(1);
    }

    // Group results
    const available = results.filter((r) => r.available);
    const sale = results.filter((r) => !r.available && r.sale);
    const taken = results.filter((r) => !r.available && !r.sale);

    // Display grouped results
    logger.banner("📊 RESULTS SUMMARY");

    console.log(`✅ AVAILABLE (${available.length}):\n`);
    if (available.length > 0) {
      available.forEach((r, i) => console.log(`  ${i + 1}. ${r.domain}`));
    } else {
      console.log("  None found");
    }

    logger.spacer();
    console.log(`💰 FOR SALE (${sale.length}):\n`);
    if (sale.length > 0) {
      sale.forEach((r, i) => console.log(`  ${i + 1}. ${r.domain}`));
    } else {
      console.log("  None found");
    }

    logger.spacer();
    console.log(`❌ TAKEN (${taken.length}):\n`);
    if (taken.length > 0) {
      taken.forEach((r, i) => console.log(`  ${i + 1}. ${r.domain}`));
    } else {
      console.log("  None found");
    }

    logger.separator();

    // Save results to JSON file if enabled
    if (config.save) {
      logger.spacer();
      logger.startTimer("saving");
      logger.log("💾", `Saving results to ${config.directory}/`);

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

        logger.spacer();
        logger.success(`Saved results to ${outputJsonFile}`, "saving");
        logger.spacer();
        console.log(`  ✅ Available: ${available.length}`);
        console.log(`  💰 For Sale: ${sale.length}`);
        console.log(`  ❌ Taken: ${taken.length}`);
      } catch (error) {
        logger.spacer();
        logger.error(`Failed to save file: ${error}`);
      }
    } else {
      logger.spacer();
      logger.info("Results displayed above (not saved to file)");
    }

    // Final summary with timing
    const totalTime = logger.getTotalElapsed();
    const availablePercent = (
      (available.length / results.length) *
      100
    ).toFixed(1);

    logger.banner("🎉 EXECUTION COMPLETED");

    console.log(`  📊 Total Domains: ${results.length}`);
    console.log(`  ✅ Available: ${available.length} (${availablePercent}%)`);
    console.log(
      `  💰 For Sale: ${sale.length} (${((sale.length / results.length) * 100).toFixed(1)}%)`,
    );
    console.log(
      `  ❌ Taken: ${taken.length} (${((taken.length / results.length) * 100).toFixed(1)}%)`,
    );
    console.log(`  ⏱️  Total Time: ${logger.formatTime(totalTime)}`);
    logger.spacer();

    if (available.length > 0) {
      logger.success(`Found ${available.length} available domain(s)! 🎯`);
    } else if (sale.length > 0) {
      logger.info(
        `Found ${sale.length} domain(s) for sale - might be worth checking! 💡`,
      );
    } else {
      logger.warn("All domains are taken. Try different keywords or TLDs. 💭");
    }

    logger.spacer();
    logger.separator();
  } catch (error) {
    logger.spacer();
    logger.error(
      `An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
    process.exit(1);
  }
}

main().catch(console.error);
