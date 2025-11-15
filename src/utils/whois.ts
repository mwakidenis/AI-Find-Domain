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
const findValue = (obj: any, keys: string[]): string | undefined => {
  if (!obj || typeof obj !== "object") return undefined;

  for (const key of Object.keys(obj)) {
    // Direct match
    if (keys.includes(key) && obj[key]) {
      return Array.isArray(obj[key]) ? obj[key][0] : obj[key];
    }

    // Recursive search
    if (typeof obj[key] === "object") {
      const result = findValue(obj[key], keys);
      if (result) return result;
    }
  }

  return undefined;
};

const hasError = (obj: any): boolean => !!findValue(obj, ERRORS_KEYS);

const hasDatesKey = (obj: any): boolean => !!findValue(obj, DATES_KEYS);

const isDomainNotFound = (obj: any): boolean => {
  if (!obj || typeof obj !== "object") return false;
  if (Array.isArray(obj.text)) {
    return obj.text.some((text: string) =>
      DOMAIN_NOT_FOUND_PHRASES.some((phrase) =>
        text.toLowerCase().includes(phrase.toLowerCase()),
      ),
    );
  }
  return Object.values(obj).some((value) => isDomainNotFound(value));
};

const isForSale = (obj: any): boolean => {
  if (!obj || typeof obj !== "object") return false;
  if (Array.isArray(obj["Name Server"])) {
    return obj["Name Server"].some((ns) =>
      FOR_SALE_INDICATORS.some((indicator) =>
        ns.toLowerCase().includes(indicator.toLowerCase()),
      ),
    );
  }
  return Object.values(obj).some((value) => isForSale(value));
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
