// src/algorithms/__tests__/recommendationAlgorithm.test.ts
import { RecommendationAlgorithm } from '../recommendationAlgorithm';
import { StockData } from '../../types';

describe('RecommendationAlgorithm', () => {
  let algorithm: RecommendationAlgorithm;

  beforeEach(() => {
    algorithm = new RecommendationAlgorithm();
  });

  test('should return BUY when price and social media trend up', () => {
    const current: StockData = { 
      date: '2024-01-05',
      price: 110, 
      socialMediaCount: 5000 
    };
    
    const historical: StockData[] = [
      { date: '2024-01-01', price: 100, socialMediaCount: 1000 },
      { date: '2024-01-02', price: 102, socialMediaCount: 2000 },
      { date: '2024-01-03', price: 105, socialMediaCount: 3000 },
      { date: '2024-01-04', price: 107, socialMediaCount: 4000 },
      { date: '2024-01-05', price: 110, socialMediaCount: 5000 }
    ];
    
    expect(algorithm.calculateRecommendation(current, historical)).toBe('BUY');
  });

  test('should return SELL when price and social media trend down', () => {
    const current: StockData = { 
      date: '2024-01-05',
      price: 90, 
      socialMediaCount: 1000 
    };
    
    const historical: StockData[] = [
      { date: '2024-01-01', price: 110, socialMediaCount: 5000 },
      { date: '2024-01-02', price: 105, socialMediaCount: 4000 },
      { date: '2024-01-03', price: 100, socialMediaCount: 3000 },
      { date: '2024-01-04', price: 95, socialMediaCount: 2000 },
      { date: '2024-01-05', price: 90, socialMediaCount: 1000 }
    ];
    
    expect(algorithm.calculateRecommendation(current, historical)).toBe('SELL');
  });

  test('should return HOLD for stable conditions', () => {
    const current: StockData = { 
      date: '2024-01-05',
      price: 100, 
      socialMediaCount: 3000 
    };
    
    const historical: StockData[] = [
      { date: '2024-01-01', price: 100, socialMediaCount: 3000 },
      { date: '2024-01-02', price: 101, socialMediaCount: 3100 },
      { date: '2024-01-03', price: 99, socialMediaCount: 2900 },
      { date: '2024-01-04', price: 100, socialMediaCount: 3000 },
      { date: '2024-01-05', price: 100, socialMediaCount: 3000 }
    ];
    
    expect(algorithm.calculateRecommendation(current, historical)).toBe('HOLD');
  });

  test('should use custom weights when provided', () => {
    const customAlgorithm = new RecommendationAlgorithm({
      priceWeight: 0.8,
      socialMediaWeight: 0.1,
      momentumWeight: 0.1
    });

    const current: StockData = { 
      date: '2024-01-06',
      price: 130, // Increased from 115 to 130 for a more significant jump
      socialMediaCount: 6000 
    };
    
    // Need at least 6 data points for all calculations to work
    const historical: StockData[] = [
      { date: '2024-01-01', price: 100, socialMediaCount: 2000 },
      { date: '2024-01-02', price: 102, socialMediaCount: 2500 },
      { date: '2024-01-03', price: 105, socialMediaCount: 3000 },
      { date: '2024-01-04', price: 108, socialMediaCount: 3500 },
      { date: '2024-01-05', price: 110, socialMediaCount: 4000 },
      { date: '2024-01-06', price: 130, socialMediaCount: 6000 } // 18% increase from previous day
    ];
    
    // With high price weight and strong upward price movement (18%), should trigger BUY
    expect(customAlgorithm.calculateRecommendation(current, historical)).toBe('BUY');
  });

  test('should handle insufficient data gracefully', () => {
    const current: StockData = { 
      date: '2024-01-01',
      price: 100, 
      socialMediaCount: 1000 
    };
    
    const historical: StockData[] = [current];
    
    // With only one data point, should return HOLD
    expect(algorithm.calculateRecommendation(current, historical)).toBe('HOLD');
  });

  test('should handle edge case of zero social media count', () => {
    const current: StockData = { 
      date: '2024-01-06',
      price: 110, 
      socialMediaCount: 0 
    };
    
    const historical: StockData[] = [
      { date: '2024-01-01', price: 100, socialMediaCount: 0 },
      { date: '2024-01-02', price: 102, socialMediaCount: 0 },
      { date: '2024-01-03', price: 105, socialMediaCount: 0 },
      { date: '2024-01-04', price: 107, socialMediaCount: 0 },
      { date: '2024-01-05', price: 109, socialMediaCount: 0 },
      { date: '2024-01-06', price: 110, socialMediaCount: 0 }
    ];
    
    // Should still work based on price and momentum
    expect(algorithm.calculateRecommendation(current, historical)).toBe('BUY');
  });

  test('should calculate correct score components', () => {
    // This test helps us understand how the algorithm works
    const current: StockData = { 
      date: '2024-01-06',
      price: 120, 
      socialMediaCount: 5000 
    };
    
    const historical: StockData[] = [
      { date: '2024-01-01', price: 100, socialMediaCount: 1000 },
      { date: '2024-01-02', price: 100, socialMediaCount: 1000 },
      { date: '2024-01-03', price: 100, socialMediaCount: 1000 },
      { date: '2024-01-04', price: 100, socialMediaCount: 2000 },
      { date: '2024-01-05', price: 100, socialMediaCount: 3000 },
      { date: '2024-01-06', price: 120, socialMediaCount: 5000 }
    ];
    
    const result = algorithm.calculateRecommendation(current, historical);
    // Price change: (120-100)/100 = 0.2 (20%)
    // With default weights: 0.2 * 0.4 = 0.08
    // Social media trend is also positive
    // This should be enough to trigger BUY (score > 0.15)
    expect(result).toBe('BUY');
  });
});