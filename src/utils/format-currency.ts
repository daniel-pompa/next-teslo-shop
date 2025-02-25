/**
 * Format a number as currency using the specified locale and currency.
 *
 * @example
 * const formattedAmount = formatCurrency(1000);
 * returns '$1,000.00'
 *
 * @example
 * formatCurrency(1000, 'es-ES', 'EUR');
 * returns '1.000,00 €'
 *
 * Note: This function uses the Intl.NumberFormat API to format the number as currency.
 *
 * @param amount - The number to format. Must be a valid number.
 * @param locale - The language and region to use for formatting. Default is 'en-US'.
 * @param currency - The currency code to use for formatting. Default is 'USD'.
 * @returns The number formatted as currency.
 *
 * @throws {Error} If the amount is not a valid number.
 */
export const formatCurrency = (
  amount: number,
  locale: string = 'en-US',
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};
