import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StockData } from '../../types';

interface DataDisplayProps {
  data: StockData[];
  recentSocialCount?: number;
}

const DataDisplay: React.FC<DataDisplayProps> = ({ data, recentSocialCount }) => {
  if (!data.length) return null;

  const latestData = data[data.length - 1];
  const firstData = data[0];
  const priceChange = ((latestData.price - firstData.price) / firstData.price) * 100;
  const avgSocialMedia = data.reduce((sum, d) => sum + d.socialMediaCount, 0) / data.length;

  return (
    <View style={styles.container} accessible={true}>
      <Text style={styles.title} accessibilityRole="header">Market Overview</Text>
      <View style={styles.row}>
        <View style={styles.stat}>
          <Text style={styles.label}>Latest Price</Text>
          <Text style={styles.value} accessibilityLabel={`Latest price: $${latestData.price.toFixed(2)}`}>
            ${latestData.price.toFixed(2)}
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.label}>Price Change</Text>
          <Text 
            style={[styles.value, priceChange >= 0 ? styles.positive : styles.negative]}
            accessibilityLabel={`Price change: ${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%`}
          >
            {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.label}>Avg Social</Text>
          <Text style={styles.value} accessibilityLabel={`Average social media count: ${Math.round(avgSocialMedia)}`}>
            {Math.round(avgSocialMedia).toLocaleString()}
          </Text>
        </View>
      </View>
      {recentSocialCount !== undefined && (
        <View style={styles.row}>
          <View style={styles.stat}>
            <Text style={styles.label}>Recent Social Media Count</Text>
            <Text style={styles.value} accessibilityLabel={`Recent social media count: ${recentSocialCount}`}>
              {recentSocialCount.toLocaleString()}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  stat: {
    alignItems: 'center',
    flex: 1
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  positive: {
    color: '#28a745'
  },
  negative: {
    color: '#dc3545'
  }
});

export default DataDisplay;