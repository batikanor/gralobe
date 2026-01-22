/**
 * Value Formatters
 *
 * Centralized formatting utilities for statistic values.
 * Used by Legend, tooltips, and any other display components.
 */

/**
 * Create a formatter function based on the unit type.
 *
 * @param unit - The unit string (e.g., "%", "$", "years")
 * @returns A function that formats numeric values with the appropriate unit
 *
 * @example
 * const fmt = createFormatter('%');
 * fmt(42.567); // "42.6%"
 *
 * const currencyFmt = createFormatter('$');
 * currencyFmt(1234567); // "$1,234,567"
 */
const FORMATTERS: Record<string, (v: number) => string> = {
  "%": (v) => `${v.toFixed(1)}%`,
  $: (v) => `$${v.toLocaleString()}`,
  years: (v) => `${v.toFixed(1)} yrs`,
  "% GDP": (v) => `${v.toFixed(1)}%`,
  "% of GDP": (v) => `${v.toFixed(1)}%`,
  index: (v) => v.toFixed(3),
  "": (v) => v.toFixed(3),
};

const RATED_KEYWORDS = ["per capita", "per 100", "per 1000"];

/**
 * Create a formatter function based on the unit type.
 *
 * @param unit - The unit string (e.g., "%", "$", "years")
 * @returns A function that formats numeric values with the appropriate unit
 *
 * @example
 * const fmt = createFormatter('%');
 * fmt(42.567); // "42.6%"
 *
 * const currencyFmt = createFormatter('$');
 * currencyFmt(1234567); // "$1,234,567"
 */
export function createFormatter(unit: string): (value: number) => string {
  // Direct match
  if (FORMATTERS[unit]) {
    return FORMATTERS[unit];
  }

  // Rate-based units
  if (RATED_KEYWORDS.some((k) => unit.includes(k))) {
    return (v: number) => `${v.toFixed(1)}`;
  }

  // Default fallback
  return (v: number) => {
    const formatted = Number.isInteger(v) ? v.toLocaleString() : v.toFixed(1);
    return unit ? `${formatted} ${unit}` : formatted;
  };
}

/**
 * Format a value using the provided formatter or create a default one.
 *
 * @param value - The numeric value to format
 * @param unit - The unit string
 * @param customFormatter - Optional custom formatter function
 * @returns Formatted string
 */
export function formatValue(
  value: number,
  unit: string,
  customFormatter?: (value: number) => string,
): string {
  const formatter = customFormatter ?? createFormatter(unit);
  return formatter(value);
}
