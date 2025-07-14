import { AccessibilityInfo } from 'react-native';

export class AccessibilityService {
  /**
   * Announce a message to screen readers
   * @param message The message to announce
   */
  static announceForAccessibility(message: string) {
    AccessibilityInfo.announceForAccessibility(message);
  }

  /**
   * Set accessibility focus to a specific element
   * @param reactTag The React tag of the element to focus
   */
  static setAccessibilityFocus(reactTag: number) {
    AccessibilityInfo.setAccessibilityFocus(reactTag);
  }

  /**
   * Check if screen reader is enabled
   * @returns Promise<boolean> True if screen reader is enabled
   */
  static isScreenReaderEnabled(): Promise<boolean> {
    return AccessibilityInfo.isScreenReaderEnabled();
  }

  /**
   * Announce stock recommendation to user
   * @param symbol Stock symbol
   * @param recommendation Recommendation type (BUY/SELL/HOLD)
   * @param price Current price
   */
  static announceRecommendation(symbol: string, recommendation: string, price: number) {
    const message = `${symbol} recommendation: ${recommendation}. Current price: $${price.toFixed(2)}`;
    this.announceForAccessibility(message);
  }

  /**
   * Announce loading state
   * @param symbol Stock symbol being analyzed
   */
  static announceLoading(symbol: string) {
    const message = `Loading recommendations for ${symbol}. Please wait.`;
    this.announceForAccessibility(message);
  }

  /**
   * Announce error state
   * @param errorMessage Error message to announce
   */
  static announceError(errorMessage: string) {
    const message = `Error: ${errorMessage}`;
    this.announceForAccessibility(message);
  }
} 