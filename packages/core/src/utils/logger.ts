// ============================================================================
// Time Tracking & Formatting
// ============================================================================

const timers = new Map<string, number>();
const globalStartTime = Date.now();

/**
 * Start a timer with the given ID
 */
export function startTimer(id: string): void {
  timers.set(id, Date.now());
}

/**
 * Get elapsed time in seconds for a timer
 */
export function getElapsed(id: string): number {
  const startTime = timers.get(id);
  if (!startTime) return 0;
  return (Date.now() - startTime) / 1000;
}

/**
 * Get total elapsed time since module initialization
 */
export function getTotalElapsed(): number {
  return (Date.now() - globalStartTime) / 1000;
}

/**
 * Format seconds into human-readable time string
 */
export function formatTime(seconds: number): string {
  if (seconds < 1) {
    return `${Math.round(seconds * 1000)}ms`;
  }
  if (seconds < 60) {
    return `${seconds.toFixed(2)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

// ============================================================================
// Generic Logging Functions
// ============================================================================

/**
 * Log with emoji prefix
 */
export function log(emoji: string, message: string, elapsed?: number): void {
  const timeStr = elapsed !== undefined ? ` (${formatTime(elapsed)})` : "";
  console.log(`${emoji} ${message}${timeStr}`);
}

/**
 * Log success message
 */
export function success(message: string, timerId?: string): void {
  const elapsed = timerId ? getElapsed(timerId) : undefined;
  log("✅", message, elapsed);
}

/**
 * Log error message
 */
export function error(message: string): void {
  console.error(`❌ ${message}`);
}

/**
 * Log warning message
 */
export function warn(message: string): void {
  console.warn(`⚠️  ${message}`);
}

/**
 * Log info message
 */
export function info(message: string): void {
  log("ℹ️ ", message);
}

/**
 * Print empty line
 */
export function spacer(): void {
  console.log();
}

/**
 * Print separator line
 */
export function separator(char = "=", length = 70): void {
  console.log(char.repeat(length));
}

/**
 * Print banner with title
 */
export function banner(title: string): void {
  spacer();
  separator();
  console.log(`  ${title}`);
  separator();
  spacer();
}
