import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number in Indian numbering system (lakhs and crores)
 * Example: 5000000 -> 50,00,000
 */
export function formatIndianCurrency(amount: number): string {
  const amountStr = Math.abs(amount).toString();
  const isNegative = amount < 0;
  
  if (amountStr.length <= 3) {
    return (isNegative ? '-' : '') + amountStr;
  }
  
  // Split into last 3 digits and the rest
  const lastThree = amountStr.substring(amountStr.length - 3);
  const otherDigits = amountStr.substring(0, amountStr.length - 3);
  
  // Add commas every 2 digits for the remaining part
  const formattedOtherDigits = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
  
  return (isNegative ? '-' : '') + formattedOtherDigits + ',' + lastThree;
}

/**
 * Formats input value as Indian currency while typing
 * Removes non-numeric characters and formats with commas
 */
export function formatCurrencyInput(value: string): string {
  // Remove all non-numeric characters
  const numericValue = value.replace(/[^\d]/g, '');
  
  if (!numericValue) return '';
  
  // Convert to number and format
  const number = parseInt(numericValue, 10);
  return formatIndianCurrency(number);
}

/**
 * Parses Indian formatted currency string to number
 * Example: "50,00,000" -> 5000000
 */
export function parseIndianCurrency(value: string): number {
  const numericValue = value.replace(/,/g, '');
  return parseInt(numericValue, 10) || 0;
}
