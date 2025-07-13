import { RecommendationAlgorithm } from '../types/recommendationAlgorithm';

export const AdvancedAlgorithm: RecommendationAlgorithm = {
  id: 'advanced',
  name: 'Advanced Algorithm',
  calculateRecommendation: (current, historical) => {
    // Example: Use average price as threshold
    if (historical.length < 2) return 'HOLD';
    const avg = historical.reduce((sum, d) => sum + d.price, 0) / historical.length;
    if (current.price > avg * 1.01) return 'BUY';
    if (current.price < avg * 0.99) return 'SELL';
    return 'HOLD';
  }
}; 