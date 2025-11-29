import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for proper class merging
 * 
 * @param {...(string|object|Array)} inputs - Class names or conditional objects
 * @returns {string} Merged class string
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-gold-500', className)
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
