import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Formats a price value as Indian Rupees
 * @param price - Price value in rupees
 * @returns Formatted price string (e.g., "₹500")
 */
export function formatPrice(price: number | string): string {
	const numPrice = typeof price === "string" ? parseFloat(price) : price;
	if (isNaN(numPrice)) return "₹0";
	return `₹${numPrice.toLocaleString("en-IN")}`;
}

/**
 * Validates email format
 * @param email - Email to validate
 * @returns true if email is valid
 */
export function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Validates phone number (Indian format)
 * @param phone - Phone number to validate
 * @returns true if phone number is valid
 */
export function isValidPhone(phone: string): boolean {
	const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
	return phoneRegex.test(phone.replace(/[\s-]/g, ""));
}

/**
 * Truncates text to specified length
 * @param text - Text to truncate
 * @param length - Maximum length
 * @returns Truncated text with ellipsis
 */
export function truncateText(text: string, length: number): string {
	return text.length > length ? text.slice(0, length) + "..." : text;
}

/**
 * Formats date to readable format
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
	const dateObj = typeof date === "string" ? new Date(date) : date;
	return new Intl.DateTimeFormat("en-IN", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(dateObj);
}

/**
 * Converts file size to readable format
 * @param bytes - Size in bytes
 * @returns Formatted size string
 */
export function formatFileSize(bytes: number): string {
	const units = ["B", "KB", "MB", "GB"];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`;
}
