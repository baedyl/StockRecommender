// src/api/mockDataService.ts
import { StockData } from '../types';

export class MockDataService {
  private seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  private generateStockPrice(symbol: string, date: Date): number {
    const seed = symbol.charCodeAt(0) + date.getTime();
    const random = this.seededRandom(seed);
    const basePrice = 100 + (symbol.charCodeAt(0) % 100);
    const volatility = 0.02;
    return basePrice * (1 + (random - 0.5) * volatility);
  }

  private generateSocialMediaCount(symbol: string, date: Date): number {
    const seed = symbol.charCodeAt(0) + date.getTime() + 1000;
    const random = this.seededRandom(seed);
    return Math.floor(random * 10000) + 100;
  }

  async getStockData(symbol: string, days: number = 10): Promise<StockData[]> {
    const data: StockData[] = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: this.generateStockPrice(symbol, date),
        socialMediaCount: this.generateSocialMediaCount(symbol, date)
      });
    }
    
    return data;
  }
}

// src/api/index.ts
export * from './mockDataService';