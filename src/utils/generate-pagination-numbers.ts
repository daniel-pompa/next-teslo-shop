/**
 * Generates an array of pagination numbers with ellipsis for large ranges.
 * @param currentPage - The current active page.
 * @param totalPages - The total number of pages.
 * @returns An array of numbers and/or ellipsis strings representing the pagination.
 */
export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  // Validate inputs
  if (totalPages <= 1) return [1];
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;
  // Case 1: Few pages (show all)
  if (totalPages <= 10) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  // Case 2: Current page is near the start
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }
  // Case 3: Current page is near the end
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  // Case 4: Current page is in the middle
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
};
