// ============================================================================
// LIMITS - COUNTS
// ============================================================================

export const MAX_ATTEMPTS = 5;
export const MAX_DOMAINS_GENERATE = 25;
export const MAX_DOMAINS_CHECK = 25;
export const MAX_DOMAINS_EXAMPLE = 25;
export const MAX_KEYWORDS = 10;
export const MIN_DOMAINS = 1;

// ============================================================================
// LIMITS - LENGTHS
// ============================================================================

export const MIN_KEYWORD_LENGTH = 1;
export const MIN_DOMAIN_LENGTH = 3;
export const MAX_KEYWORD_LENGTH = 50;
export const MAX_DOMAIN_PART_LENGTH = 63;
export const MAX_DOMAIN_LENGTH = 253;

// ============================================================================
// TIMING & RATE LIMITS
// ============================================================================

export const RATE_LIMIT_DELAY_MS = 2000;
export const WHOIS_STAGGER_DELAY_MS = 250;
export const OPENAI_TIMEOUT_MS = 30000;

// ============================================================================
// API CONFIGURATION
// ============================================================================

export const OPENAI_MODEL = "gpt-4o-mini" as const;

export const RUNTIME_CONFIG = {
  ATTEMPTS_MAX_DURATION: 10,
  GENERATE_MAX_DURATION: 30,
  CHECK_DOMAIN_MAX_DURATION: 30,
} as const;

// ============================================================================
// SECURITY - BLOCKED DOMAINS
// ============================================================================

export const BLOCKED_DOMAINS = [
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "192.168.",
  "10.",
  "172.16.",
  "169.254.",
  "metadata",
  ".local",
  ".internal",
  ".private",
  "example.com",
  "test.com",
] as const;

// ============================================================================
// VALIDATION PATTERNS
// ============================================================================

export const REGEX = {
  IP: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
  SUSPICIOUS: /(.)\1{5,}|[<>{}[\]\\]/,
  KEYWORD: /^[a-zA-Z0-9\s-]+$/,
  DOMAIN_PART: /^[a-z0-9][a-z0-9-]*[a-z0-9]$/i,
  DOMAIN_FULL:
    /^[a-z0-9][a-z0-9-]*[a-z0-9](\.[a-z0-9][a-z0-9-]*[a-z0-9])*\.[a-z]{2,}$/i,
} as const;

// ============================================================================
// POPULAR TLDs
// ============================================================================

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
  "to",
  "cc",
  "tv",
  "vc",
  "ws",
  "us",
  "biz",
  "info",
  "online",
  "site",
] as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized",
  EMAIL_NOT_VERIFIED: "Verify email first",
  NO_ATTEMPTS: "No attempts remaining",
  TOO_FAST: "Wait before generating",
  INVALID_REQUEST: "Invalid request",
  VALIDATION_ERROR: "Invalid input data",
} as const;

// ============================================================================
// ERROR CODES
// ============================================================================

export const ERROR_CODES = {
  UNAUTHORIZED: "UNAUTHORIZED",
  EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
  NO_ATTEMPTS: "NO_ATTEMPTS",
  TOO_FAST: "TOO_FAST",
  INVALID_REQUEST: "INVALID_REQUEST",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;
