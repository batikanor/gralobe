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
export function createFormatter(unit: string): (value: number) => string {
  // Percentage
  if (unit === '%') {
    return (v: number) => `${v.toFixed(1)}%`;
  }

  // Currency
  if (unit === '$') {
    return (v: number) => `$${v.toLocaleString()}`;
  }

  // Time in years
  if (unit === 'years') {
    return (v: number) => `${v.toFixed(1)} yrs`;
  }

  // Rate-based units (per capita, per 100k, etc.)
  if (unit.includes('per capita') || unit.includes('per 100') || unit.includes('per 1000')) {
    return (v: number) => `${v.toFixed(1)}`;
  }

  // Percentage of GDP
  if (unit === '% GDP' || unit === '% of GDP') {
    return (v: number) => `${v.toFixed(1)}%`;
  }

  // Index values (0-1 scale)
  if (unit === '' || unit === 'index') {
    return (v: number) => v.toFixed(3);
  }

  // Default: localized number with unit suffix
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
  customFormatter?: (value: number) => string
): string {
  const formatter = customFormatter ?? createFormatter(unit);
  return formatter(value);
}
