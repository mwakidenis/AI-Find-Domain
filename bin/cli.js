#!/usr/bin/env node

/**
 * CLI entry point for find-my-domain
 * This file is executed when users run: npx find-my-domain
 */

/* eslint-env node */

// Import the main application
import('../dist/index.js').catch((error) => {
  console.error('Failed to load find-my-domain:', error.message);
  process.exit(1);
});

