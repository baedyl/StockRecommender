export interface StockData {
    date: string;
    price: number;
    socialMediaCount: number;
  }
  
  export interface RecommendationData extends StockData {
    recommendation: RecommendationType;
  }
  
  export type RecommendationType = 'BUY' | 'SELL' | 'HOLD';
  
  export interface AlgorithmParams {
    priceWeight?: number;
    socialMediaWeight?: number;
    momentumWeight?: number;
  }