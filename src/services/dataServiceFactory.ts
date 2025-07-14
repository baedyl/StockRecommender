import { RealDataService } from '../api/realDataService';
import { MockDataService } from '../api/mockDataService';

export interface IDataService {
  getStockData(symbol: string, days?: number): Promise<any[]>;
}

export class DataServiceFactory {
  static createDataService(): IDataService {
    if (process.env.ALPHA_VANTAGE_API_KEY) {
      try {
        return new RealDataService();
      } catch (e) {
        console.warn('RealDataService failed, falling back to MockDataService');
        return new MockDataService();
      }
    }
    return new MockDataService();
  }
} 