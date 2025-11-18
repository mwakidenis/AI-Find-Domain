#!/usr/bin/env node

/**
 * CLI entry point for find-my-domain
 * This file is executed when users run: npx find-my-domain
 */

/* eslint-env node */

// Import and run the main function
import("../dist/index.js")
  .then((module) => {
    return module.main();
  })
  .catch((error) => {
    console.error("Failed to load find-my-domain:", error.message);
    process.exit(1);
  });
