/**
 * Formats a given date into a human-readable string using the specified locale, month style, and time display.
 *
 * @param date - The date to format, either as a Date object or an ISO string.
 * @param locale - The locale to use for formatting (default: 'en-GB').
 * @param monthStyle - The style of the month format ('short' | 'long', default: 'short').
 * @param withTime - Whether to include the time in the output (default: false).
 * @returns The formatted date string.
 *
 * @example
 * formatDate('2025-05-08'); // "08 May 2025"
 * formatDate('2025-05-08', 'es-ES', 'long', true); // "08 de mayo de 2025 23:33"
 */
export const formatDate = (
  date: Date | string,
  locale: string = 'en-US',
  monthStyle: 'short' | 'long' = 'short',
  withTime: boolean = false
): string => {
  const dateObject = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: monthStyle,
    year: 'numeric',
    ...(withTime && {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  return dateObject.toLocaleDateString(locale, options);
};
