/**
 * Utility functions for date formatting in charts
 */

/**
 * Format date for vertical display in charts - each character on its own line
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted string for vertical display with each character on a new line
 */
export const formatDateForVerticalChart = (dateString: string): string => {
  const dateParts = dateString.split('-');
  const month = dateParts[1];
  const day = dateParts[2];
  
  // Create truly vertical format: each character on its own line
  const monthVertical = month.split('').join('\n');
  const dayVertical = day.split('').join('\n');
  
  return `${monthVertical}\n${dayVertical}`;
};

/**
 * Format date for chart labels with minimal vertical space
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted string optimized for chart labels
 */
export const formatDateForChartLabels = (dateString: string): string => {
  const dateParts = dateString.split('-');
  const month = dateParts[1];
  const day = dateParts[2];
  
  // Use month/day format with line break
  return `${month}\n${day}`;
};

/**
 * Format date for horizontal display
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted string for horizontal display (MM/DD)
 */
export const formatDateForHorizontalDisplay = (dateString: string): string => {
  const dateParts = dateString.split('-');
  const month = dateParts[1];
  const day = dateParts[2];
  return `${month}/${day}`;
};

/**
 * Format date for full display
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted string for full display (YYYY-MM-DD)
 */
export const formatDateForFullDisplay = (dateString: string): string => {
  return dateString;
};

/**
 * Get month name from month number
 * @param month - Month number (01-12)
 * @returns Month name abbreviation
 */
export const getMonthName = (month: string): string => {
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const monthIndex = parseInt(month, 10) - 1;
  return monthNames[monthIndex] || month;
};

/**
 * Format date for chart with month names
 * @param dateString - Date string in YYYY-MM-DD format
 * @returns Formatted string with month name (Jan\nDD)
 */
export const formatDateWithMonthName = (dateString: string): string => {
  const dateParts = dateString.split('-');
  const month = getMonthName(dateParts[1]);
  const day = dateParts[2];
  return `${month}\n${day}`;
}; 