export const CONFIG = {
  DEFAULT_TIME_WINDOW: 10,
  MIN_TIME_WINDOW: 1,
  MAX_TIME_WINDOW: 30,
  SOCIAL_MEDIA_COUNT_RANGE: {
    MIN: 100,
    MAX: 50000,
  },
  STOCK_PRICE: {
    BASE_PRICE: 100,
    VOLATILITY: 0.02,
  },
} as const;

export const ERROR_MESSAGES = {
  EMPTY_STOCK_SYMBOL: 'Please enter a stock symbol',
  FETCH_DATA_FAILED: 'Failed to fetch stock data',
  INVALID_SYMBOL: 'Invalid stock symbol',
} as const;

export const ACCESSIBILITY_LABELS = {
  ALGORITHM_SELECTION: 'Algorithm selection',
  ALGORITHM_PICKER: 'Select recommendation algorithm',
  ALGORITHM_HINT: 'Choose the algorithm to use for stock analysis',
} as const; 