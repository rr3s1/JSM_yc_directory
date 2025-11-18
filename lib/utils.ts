// Imports utilities for merging Tailwind CSS classes.
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// A helper function to conditionally combine and merge class names.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// A utility function to format a date string into a readable format.
export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}