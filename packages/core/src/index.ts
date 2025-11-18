// Export all types
export type {
  InputConfig,
  DomainStatusResult,
  DomainStatusOptions,
  GenerateDomainNamesOptions,
  OutputResult,
  CliArguments,
} from "./types.js";

// Export schemas
export { InputConfigSchema } from "./types.js";

// Export constants
export {
  DEFAULT_CONFIG,
  POPULAR_TLDS,
  AVAILABLE_MODELS,
  STATUS,
} from "./constants.js";

// Export AI utilities
export { generateDomainNames, generateDomainNamesStream } from "./utils/ai.js";

// Export WHOIS utilities
export { checkDomainStatus } from "./utils/whois.js";

// Export wait utility
export { wait } from "./utils/wait.js";

// Export logger utilities
export * as logger from "./utils/logger.js";
