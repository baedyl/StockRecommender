import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Header from '../components/Header';
import StockInput from '../components/StockInput';
import AlgorithmSelector from '../components/AlgorithmSelector';
import { recommendationAlgorithms } from '../algorithms';
import { StockData, RecommendationData } from '../types';
import { useStockData } from '../hooks/useStockData';
import { CONFIG } from '../constants/config';

type RootStackParamList = {
  Home: undefined;
  RecommendationResults: {
    stockSymbol: string;
    stockData: StockData[];
    recommendations: RecommendationData[];
    recentSocialCount: number;
    selectedAlgorithmId: string;
  };
};

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const MainScreen: React.FC = () => {
  const navigation = useNavigation<MainScreenNavigationProp>();
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [timeWindow, setTimeWindow] = useState<number>(CONFIG.DEFAULT_TIME_WINDOW);
  const [selectedAlgorithmId, setSelectedAlgorithmId] = useState<string>(recommendationAlgorithms[0].id);
  
  const { isLoading, fetchStockData } = useStockData();

  const handleSubmit = async () => {
    const result = await fetchStockData(stockSymbol, timeWindow, selectedAlgorithmId);
    
    if (result) {
      navigation.navigate('RecommendationResults', {
        stockSymbol: stockSymbol.toUpperCase(),
        stockData: result.stockData,
        recommendations: result.recommendations,
        recentSocialCount: result.recentSocialCount,
        selectedAlgorithmId: selectedAlgorithmId,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <StockInput 
        symbol={stockSymbol}
        onSymbolChange={setStockSymbol}
        timeWindow={timeWindow}
        onTimeWindowChange={setTimeWindow}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <AlgorithmSelector
        selectedAlgorithmId={selectedAlgorithmId}
        onAlgorithmChange={setSelectedAlgorithmId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
});

export default MainScreen;