import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import Header from '../components/Header';
import StockInput from '../components/StockInput';
import DataDisplay from '../components/DataDisplay';
import { MockDataService } from '../api/mockDataService';
import { RecommendationAlgorithm } from '../algorithms/recommendationAlgorithm';
import { StockData, RecommendationData } from '../types';
import RecommendationTable from '../components/ RecommendationTable';

const MainScreen: React.FC = () => {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [timeWindow, setTimeWindow] = useState<number>(10);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dataService = React.useMemo(() => new MockDataService(), []);
  const algorithm = React.useMemo(() => new RecommendationAlgorithm(), []);

  const fetchData = useCallback(async () => {
    if (!stockSymbol.trim()) {
      Alert.alert('Error', 'Please enter a stock symbol');
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await dataService.getStockData(stockSymbol.toUpperCase(), timeWindow);
      setStockData(data);
      
      const recs: RecommendationData[] = data.map((dayData, index) => {
        const historical = data.slice(0, index + 1);
        const recommendation = algorithm.calculateRecommendation(dayData, historical);
        
        return {
          ...dayData,
          recommendation
        };
      });
      
      setRecommendations(recs);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch stock data');
    } finally {
      setIsLoading(false);
    }
  }, [stockSymbol, timeWindow, algorithm, dataService]);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <StockInput 
        symbol={stockSymbol}
        onSymbolChange={setStockSymbol}
        timeWindow={timeWindow}
        onTimeWindowChange={setTimeWindow}
        onSubmit={fetchData}
        isLoading={isLoading}
      />
      {stockData.length > 0 && (
        <>
          <DataDisplay data={stockData} />
          <RecommendationTable recommendations={recommendations} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});

export default MainScreen;