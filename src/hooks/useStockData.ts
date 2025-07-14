import { useState, useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import { DataServiceFactory } from '../services/dataServiceFactory';
import { recommendationAlgorithms } from '../algorithms';
import { StockData, RecommendationData, RecommendationType } from '../types';
import { getStockTwitsMessageCount } from '../api/stocktwitsService';
import { ERROR_MESSAGES } from '../constants/config';

interface UseStockDataReturn {
  isLoading: boolean;
  fetchStockData: (symbol: string, timeWindow: number, selectedAlgorithmId: string) => Promise<{
    stockData: StockData[];
    recommendations: RecommendationData[];
    recentSocialCount: number;
  } | null>;
}

export const useStockData = (): UseStockDataReturn => {
  const [isLoading, setIsLoading] = useState(false);

  const dataService = useMemo(() => DataServiceFactory.createDataService(), []);

  const fetchStockData = useCallback(async (
    symbol: string, 
    timeWindow: number, 
    selectedAlgorithmId: string
  ): Promise<{
    stockData: StockData[];
    recommendations: RecommendationData[];
    recentSocialCount: number;
  } | null> => {
    if (!symbol.trim()) {
      Alert.alert('Error', ERROR_MESSAGES.EMPTY_STOCK_SYMBOL);
      return null;
    }

    setIsLoading(true);
    try {
      const stockSymbol = symbol.toUpperCase();
      const data = await dataService.getStockData(stockSymbol, timeWindow);
      
      const selectedAlgorithm = recommendationAlgorithms.find(a => a.id === selectedAlgorithmId) || recommendationAlgorithms[0];
      
      const recommendations: RecommendationData[] = data.map((dayData, index) => {
        const historical = data.slice(0, index + 1);
        const recommendation = selectedAlgorithm.calculateRecommendation(dayData, historical) as RecommendationType;
        return {
          ...dayData,
          recommendation
        };
      });
      
      const messageCount = await getStockTwitsMessageCount(stockSymbol);
      
      return {
        stockData: data,
        recommendations,
        recentSocialCount: messageCount,
      };
    } catch (error) {
      Alert.alert('Error', ERROR_MESSAGES.FETCH_DATA_FAILED);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [dataService]);

  return {
    isLoading,
    fetchStockData,
  };
}; 