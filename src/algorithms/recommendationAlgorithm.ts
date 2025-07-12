import { StockData, RecommendationType, AlgorithmParams } from '../types';

export interface IRecommendationAlgorithm {
  calculateRecommendation(currentData: StockData, historicalData: StockData[]): RecommendationType;
}

export class RecommendationAlgorithm implements IRecommendationAlgorithm {
  private params: Required<AlgorithmParams>;

  constructor(params?: AlgorithmParams) {
    this.params = {
      priceWeight: params?.priceWeight || 0.4,
      socialMediaWeight: params?.socialMediaWeight || 0.3,
      momentumWeight: params?.momentumWeight || 0.3
    };
  }

  calculateRecommendation(currentData: StockData, historicalData: StockData[]): RecommendationType {
    const priceChange = this.calculatePriceChange(currentData, historicalData);
    const socialMediaTrend = this.calculateSocialMediaTrend(currentData, historicalData);
    const momentum = this.calculateMomentum(historicalData);
    
    const score = 
      (priceChange * this.params.priceWeight) + 
      (socialMediaTrend * this.params.socialMediaWeight) + 
      (momentum * this.params.momentumWeight);
    
    if (score > 0.15) return 'BUY';
    if (score < -0.15) return 'SELL';
    return 'HOLD';
  }

  private calculatePriceChange(current: StockData, historical: StockData[]): number {
    if (historical.length < 2) return 0;
    const previousPrice = historical[historical.length - 2].price;
    return (current.price - previousPrice) / previousPrice;
  }

  private calculateSocialMediaTrend(current: StockData, historical: StockData[]): number {
    if (historical.length < 6) return 0;
    
    const recentData = historical.slice(-3);
    const olderData = historical.slice(-6, -3);
    
    const recentAvg = recentData.reduce((sum, d) => sum + d.socialMediaCount, 0) / recentData.length;
    const olderAvg = olderData.reduce((sum, d) => sum + d.socialMediaCount, 0) / olderData.length;
    
    if (olderAvg === 0) return 0;
    return (recentAvg - olderAvg) / olderAvg;
  }

  private calculateMomentum(historical: StockData[]): number {
    if (historical.length < 5) return 0;
    
    const recentPrices = historical.slice(-5).map(d => d.price);
    let increases = 0;
    
    for (let i = 1; i < recentPrices.length; i++) {
      if (recentPrices[i] > recentPrices[i - 1]) {
        increases++;
      }
    }
    
    return (increases / 4) - 0.5;
  }
}