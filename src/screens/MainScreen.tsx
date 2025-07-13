import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Alert, FlatList, Text } from 'react-native';
import Header from '../components/Header';
import StockInput from '../components/StockInput';
import DataDisplay from '../components/DataDisplay';
import { RealDataService } from '../api/realDataService';
import { MockDataService } from '../api/mockDataService';
import { RecommendationAlgorithm } from '../algorithms/recommendationAlgorithm';
import { StockData, RecommendationData } from '../types';
import { getStockTwitsMessageCount } from '../api/stocktwitsService';

const MainScreen: React.FC = () => {
  const [stockSymbol, setStockSymbol] = useState<string>('');
  const [timeWindow, setTimeWindow] = useState<number>(10);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recentSocialCount, setRecentSocialCount] = useState<number>(0);

  // Determine which data service to use based on API key
  const dataService = React.useMemo(() => {
    if (process.env.ALPHA_VANTAGE_API_KEY) {
      try {
        return new RealDataService();
      } catch (e) {
        // If RealDataService throws, fall back to MockDataService
        return new MockDataService();
      }
    }
    return new MockDataService();
  }, []);

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
      // Fetch StockTwits message count
      const messageCount = await getStockTwitsMessageCount(stockSymbol.toUpperCase());
      setRecentSocialCount(messageCount);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch stock data');
    } finally {
      setIsLoading(false);
    }
  }, [stockSymbol, timeWindow, algorithm, dataService]);

  // Render recommendation row
  const getRecommendationStyle = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY':
        return styles.buy;
      case 'SELL':
        return styles.sell;
      case 'HOLD':
        return styles.hold;
      default:
        return {};
    }
  };

  const renderRecommendation = ({ item }: { item: RecommendationData }) => (
    <View style={styles.row} accessible={true} accessibilityRole="text">
      <Text style={styles.cell}>{item.date}</Text>
      <Text style={styles.cell}>${item.price.toFixed(2)}</Text>
      <Text style={styles.cell}>{item.socialMediaCount.toLocaleString()}</Text>
      <Text 
        style={[styles.cell, getRecommendationStyle(item.recommendation)]}
        accessibilityLabel={`Recommendation: ${item.recommendation}`}
      >
        {item.recommendation}
      </Text>
    </View>
  );

  // Header for the recommendations table
  const renderTableHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerCell}>Date</Text>
      <Text style={styles.headerCell}>Price</Text>
      <Text style={styles.headerCell}>Social</Text>
      <Text style={styles.headerCell}>Action</Text>
    </View>
  );

  // ListHeaderComponent for FlatList
  const listHeader = (
    <View>
      <Header />
      <StockInput 
        symbol={stockSymbol}
        onSymbolChange={setStockSymbol}
        timeWindow={timeWindow}
        onTimeWindowChange={setTimeWindow}
        onSubmit={fetchData}
        isLoading={isLoading}
      />
      {stockData.length > 0 && <DataDisplay data={stockData} recentSocialCount={recentSocialCount} />}
      {stockData.length > 0 && (
        <>
          <Text style={styles.title} accessibilityRole="header">Recommendations</Text>
          {renderTableHeader()}
        </>
      )}
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={stockData.length > 0 ? recommendations : []}
      renderItem={renderRecommendation}
      keyExtractor={(item) => item.date}
      ListHeaderComponent={listHeader}
      contentContainerStyle={{ paddingBottom: 40 }}
      accessibilityRole="list"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    color: '#333'
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 10,
    marginBottom: 5
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14
  },
  buy: {
    color: '#28a745',
    fontWeight: 'bold'
  },
  sell: {
    color: '#dc3545',
    fontWeight: 'bold'
  },
  hold: {
    color: '#ffc107',
    fontWeight: 'bold'
  }
});

export default MainScreen;