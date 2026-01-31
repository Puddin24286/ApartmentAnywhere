import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency values
 */
export function formatCurrency(value?: number | null): string {
  if (value == null) return "N/A";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Format area values (square footage)
 */
export function formatArea(value?: number | null, useMetric = false): string {
  if (value == null) return "N/A";

  const formatted = new Intl.NumberFormat("en-US").format(Math.round(value));
  return useMetric ? `${formatted} m²` : `${formatted} SF`;
}

/**
 * Abbreviate number with K, M, B suffix
 */
export function abbreviateNumber(value?: number | null): string {
  if (value == null) return "N/A";

  if (value >= 1000000000) {
    return `${(value / 1000000000).toFixed(1)}B`;
  }

  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }

  return value.toString();
}
