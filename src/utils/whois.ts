import { whoisDomain } from "whoiser";
import { wait } from "./wait.js";

const ERRORS_KEYS = ["error", "errors", "Error", "Errors"];
const DATES_KEYS = ["Updated Date", "Created Date", "Expiry Date"];
const DOMAIN_NOT_FOUND_PHRASES = ["not found", "no match"];
const FOR_SALE_INDICATORS = ["afternic"];
const MAX_ATTEMPTS = 5;
const DELAY_BETWEEN_ATTEMPTS = 1500;

// Type definitions from whoiser package
interface DomainWhoisData {
  "Domain Name"?: string;
  "Domain Status"?: string[];
  "Name Server"?: string[];
  text?: string[];
  [key: string]: string | string[] | undefined;
}

interface DomainWhois {
  [key: string]: DomainWhoisData;
}

interface DomainWhoisOptions {
  host?: string;
  timeout?: number;
  follow?: 1 | 2;
  raw?: boolean;
  ignorePrivacy?: boolean;
  whoisQuery?: (
    host: string,
    query: string,
    timeout?: number,
  ) => Promise<string>;
}

export interface DomainStatusOptions {
  attempts?: number;
  delay?: number;
}

export interface DomainStatusResult {
  ok: boolean;
  domain: string;
  available: boolean;
  sale: boolean;
  duration: number;
  createdDate?: string;
  updatedDate?: string;
  expiryDate?: string;
}

// Helper function to search for a key in the WHOIS data
const findValue = (obj: unknown, keys: string[]): string | undefined => {
  if (!obj || typeof obj !== "object") return undefined;

  const record = obj as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    // Direct match
    if (keys.includes(key) && record[key]) {
      const value = record[key];
      return Array.isArray(value) ? String(value[0]) : String(value);
    }

    // Recursive search
    if (typeof record[key] === "object") {
      const result = findValue(record[key], keys);
      if (result) return result;
    }
  }

  return undefined;
};

const hasError = (obj: unknown): boolean => !!findValue(obj, ERRORS_KEYS);

const hasDatesKey = (obj: unknown): boolean => !!findValue(obj, DATES_KEYS);

const isDomainNotFound = (obj: unknown): boolean => {
  if (!obj || typeof obj !== "object") return false;
  const record = obj as Record<string, unknown>;
  if (Array.isArray(record.text)) {
    return record.text.some((text: unknown) =>
      DOMAIN_NOT_FOUND_PHRASES.some((phrase) =>
        String(text).toLowerCase().includes(phrase.toLowerCase()),
      ),
    );
  }
  return Object.values(record).some((value) => isDomainNotFound(value));
};

const isForSale = (obj: unknown): boolean => {
  if (!obj || typeof obj !== "object") return false;
  const record = obj as Record<string, unknown>;
  if (Array.isArray(record["Name Server"])) {
    return record["Name Server"].some((ns: unknown) =>
      FOR_SALE_INDICATORS.some((indicator) =>
        String(ns).toLowerCase().includes(indicator.toLowerCase()),
      ),
    );
  }
  return Object.values(record).some((value) => isForSale(value));
};

export const checkDomainStatus = async (
  domain: string,
  options?: DomainWhoisOptions,
  {
    attempts = MAX_ATTEMPTS,
    delay = DELAY_BETWEEN_ATTEMPTS,
  }: DomainStatusOptions = {},
): Promise<DomainStatusResult> => {
  const time = Date.now();

  for (let attempt = 0; attempt < attempts; attempt++) {
    try {
      const data: DomainWhois = await whoisDomain(domain, options);

      const dates = hasDatesKey(data);

      const sale = isForSale(data);

      if (
        !dates &&
        !sale &&
        (!data || !Object.keys(data).length || hasError(data))
      ) {
        console.error(`Attempt ${attempt + 1}/${attempts} failed:`, data);
        if (attempt < attempts - 1) await wait(delay);
        continue;
      }

      const available = !dates || isDomainNotFound(data);

      return {
        ok: true,
        domain,
        available,
        sale,
        duration: Date.now() - time,
        createdDate: findValue(data, ["Created Date"]),
        updatedDate: findValue(data, ["Updated Date"]),
        expiryDate: findValue(data, ["Expiry Date"]),
      };
    } catch (error) {
      console.error(`Attempt ${attempt + 1}/${attempts} failed:`, error);

      if (attempt < attempts - 1) await wait(delay);
    }
  }

  console.error(
    `All ${attempts} attempts failed. Unable to determine domain status.`,
  );

  return {
    ok: false,
    domain,
    available: false,
    sale: false,
    duration: Date.now() - time,
  };
};
