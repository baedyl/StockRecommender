import { RecommendationAlgorithm } from '../types/recommendationAlgorithm';

export const SimpleAlgorithm: RecommendationAlgorithm = {
  id: 'simple',
  name: 'Simple Algorithm',
  calculateRecommendation: (current, historical) => {
    // Example: Buy if price increased, Sell if decreased, Hold otherwise
    if (historical.length < 2) return 'HOLD';
    const prev = historical[historical.length - 2];
    if (current.price > prev.price) return 'BUY';
    if (current.price < prev.price) return 'SELL';
    return 'HOLD';
  }
}; 