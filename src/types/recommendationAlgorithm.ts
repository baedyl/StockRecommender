import { StockData } from './index';

export interface RecommendationAlgorithm {
  id: string;
  name: string;
  calculateRecommendation: (current: StockData, historical: StockData[]) => string;
} 