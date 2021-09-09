// DATE ISO8601
/**
 * Checks if date is format "YYYY"
 * @param txt
 */
export function dateIsYear(txt: string): boolean {
	return /^\d{4}$/.test(txt);
}

/**
 * Checks if date is format "YYYY-MM"
 * @param txt
 */
export function dateIsYearMonth(txt: string): boolean {
	return /^\d{4}-\d{2}$/.test(txt);
}
