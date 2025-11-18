#!/usr/bin/env node

/**
 * Example: Using find-my-domain as a library
 *
 * Run with: node example.mjs
 * Make sure to set OPENAI_API_KEY environment variable
 */

/* eslint-disable no-undef */

import {
  generateDomainNames,
  checkDomainStatus,
  checkDomainsBatch,
} from "./dist/index.js";

async function example() {
  console.log("🚀 find-my-domain Library Example\n");

  // Check if API key is available
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ Error: OPENAI_API_KEY environment variable is required");
    console.error("   Set it in your .env file or export it:");
    console.error("   export OPENAI_API_KEY=sk-...\n");
    process.exit(1);
  }

  try {
    // Example 1: Generate domain names
    console.log("📝 Step 1: Generating domain names with AI...\n");
    const domains = await generateDomainNames({
      domains: ["stripe", "vercel"],
      keywords: ["fast", "modern"],
      count: 5,
      apiKey: process.env.OPENAI_API_KEY,
      model: "gpt-4o-mini",
    });

    console.log(`✅ Generated ${domains.length} domain names:`);
    domains.forEach((domain, i) => console.log(`   ${i + 1}. ${domain}`));
    console.log();

    // Example 2: Check availability for generated domains
    console.log("🔍 Step 2: Checking domain availability...\n");
    const tlds = ["com", "io"];
    const results = await checkDomainsBatch(domains.slice(0, 3), tlds); // Check first 3 only

    // Group results
    const available = results.filter((r) => r.available);
    const forSale = results.filter((r) => !r.available && r.sale);
    const taken = results.filter((r) => !r.available && !r.sale);

    console.log(`✅ Available (${available.length}):`);
    if (available.length > 0) {
      available.forEach((r) => console.log(`   - ${r.domain}`));
    } else {
      console.log("   None found");
    }
    console.log();

    console.log(`💰 For Sale (${forSale.length}):`);
    if (forSale.length > 0) {
      forSale.forEach((r) => console.log(`   - ${r.domain}`));
    } else {
      console.log("   None found");
    }
    console.log();

    console.log(`❌ Taken (${taken.length}):`);
    if (taken.length > 0) {
      taken.forEach((r) => console.log(`   - ${r.domain}`));
    } else {
      console.log("   None found");
    }
    console.log();

    // Example 3: Check a specific domain
    console.log("🎯 Step 3: Checking a specific domain...\n");
    const specificDomain = "example.com";
    const result = await checkDomainStatus(specificDomain);

    console.log(`Domain: ${result.domain}`);
    console.log(`Available: ${result.available ? "✅ Yes" : "❌ No"}`);
    console.log(`For Sale: ${result.sale ? "💰 Yes" : "No"}`);
    console.log(`Response Time: ${result.duration}ms`);
    console.log();

    console.log("✨ Example completed successfully!\n");
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// Run the example
example();
