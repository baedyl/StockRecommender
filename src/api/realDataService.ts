import axios from 'axios';
import { StockData } from '../types';

const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

export class RealDataService {
  async getStockData(symbol: string, days: number = 10): Promise<StockData[]> {
    if (!API_KEY) {
      throw new Error('Alpha Vantage API key is not set. Please set ALPHA_VANTAGE_API_KEY in your environment variables.');
    }
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    const timeSeries = response.data['Time Series (Daily)'];
    if (!timeSeries) throw new Error('Invalid symbol or API limit reached');

    const dates = Object.keys(timeSeries).slice(0, days);
    return dates.map(date => ({
      date,
      price: parseFloat(timeSeries[date]['4. close']),
      socialMediaCount: 0 // Placeholder, as Alpha Vantage does not provide this
    }));
  }
} 