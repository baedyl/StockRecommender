import { RecommendationAlgorithm } from '../types/recommendationAlgorithm';
import { StockData } from '../types';

export interface AlgorithmScore {
  priceScore: number;
  socialScore: number;
  momentumScore: number;
  totalScore: number;
  recommendation: string;
  confidence: number;
}

export const EnhancedAlgorithm: RecommendationAlgorithm = {
  id: 'enhanced',
  name: 'Enhanced Algorithm',
  calculateRecommendation: (current: StockData, historical: StockData[]) => {
    if (historical.length < 2) return 'HOLD';
    
    const score = calculateDetailedScore(current, historical);
    return score.recommendation;
  }
};

// Separate function to get detailed scoring information
export function getDetailedScore(current: StockData, historical: StockData[]): AlgorithmScore {
  return calculateDetailedScore(current, historical);
}

function calculateDetailedScore(current: StockData, historical: StockData[]): AlgorithmScore {
  // Price-based scoring
  const priceScore = calculatePriceScore(current, historical);
  
  // Social media scoring
  const socialScore = calculateSocialScore(current, historical);
  
  // Momentum scoring
  const momentumScore = calculateMomentumScore(historical);
  
  // Weighted total score
  const totalScore = (priceScore * 0.4) + (socialScore * 0.3) + (momentumScore * 0.3);
  
  // Determine recommendation with confidence
  let recommendation: string;
  let confidence: number;
  
  if (totalScore > 0.2) {
    recommendation = 'BUY';
    confidence = Math.min(Math.abs(totalScore) * 2, 1);
  } else if (totalScore < -0.2) {
    recommendation = 'SELL';
    confidence = Math.min(Math.abs(totalScore) * 2, 1);
  } else {
    recommendation = 'HOLD';
    confidence = 1 - Math.abs(totalScore) * 2;
  }
  
  return {
    priceScore,
    socialScore,
    momentumScore,
    totalScore,
    recommendation,
    confidence
  };
}

function calculatePriceScore(current: StockData, historical: StockData[]): number {
  if (historical.length < 2) return 0;
  
  const previousPrice = historical[historical.length - 2].price;
  const priceChange = (current.price - previousPrice) / previousPrice;
  
  // Normalize to -1 to 1 range
  return Math.max(-1, Math.min(1, priceChange * 10));
}

function calculateSocialScore(current: StockData, historical: StockData[]): number {
  if (historical.length < 6) return 0;
  
  const recentData = historical.slice(-3);
  const olderData = historical.slice(-6, -3);
  
  const recentAvg = recentData.reduce((sum, d) => sum + d.socialMediaCount, 0) / recentData.length;
  const olderAvg = olderData.reduce((sum, d) => sum + d.socialMediaCount, 0) / olderData.length;
  
  if (olderAvg === 0) return 0;
  
  const socialChange = (recentAvg - olderAvg) / olderAvg;
  return Math.max(-1, Math.min(1, socialChange * 5));
}

function calculateMomentumScore(historical: StockData[]): number {
  if (historical.length < 5) return 0;
  
  const recentPrices = historical.slice(-5).map(d => d.price);
  let increases = 0;
  
  for (let i = 1; i < recentPrices.length; i++) {
    if (recentPrices[i] > recentPrices[i - 1]) {
      increases++;
    }
  }
  
  // Convert to -1 to 1 range
  return (increases / 4) - 0.5;
} 