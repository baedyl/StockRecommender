import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { RecommendationData } from '../../types';
import { formatDateForChartLabels } from '../../utils/dateUtils';

interface RecommendationChartProps {
  data: RecommendationData[];
  stockSymbol: string;
}

const RecommendationChart: React.FC<RecommendationChartProps> = ({ data, stockSymbol }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available for chart</Text>
      </View>
    );
  }

  // Prepare chart data with vertical date labels
  const chartData = {
    labels: data.map(item => formatDateForChartLabels(item.date)),
    datasets: [
      {
        data: data.map(item => item.price),
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Blue for price line
        strokeWidth: 2,
      },
    ],
  };

  // Find recommendation change points
  const changePoints = data.map((item, index) => {
    if (index === 0) return null;
    
    const currentRecommendation = item.recommendation;
    const previousRecommendation = data[index - 1].recommendation;
    
    if (currentRecommendation !== previousRecommendation) {
      return {
        index,
        date: item.date,
        price: item.price,
        fromRecommendation: previousRecommendation,
        toRecommendation: currentRecommendation,
        x: (index / (data.length - 1)) * (Dimensions.get('window').width - 40), // Approximate x position
      };
    }
    return null;
  }).filter(Boolean);

  // Get recommendation color
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY':
        return '#34C759'; // Green
      case 'SELL':
        return '#FF3B30'; // Red
      case 'HOLD':
        return '#FF9500'; // Orange
      default:
        return '#8E8E93'; // Gray
    }
  };

  // Get recommendation description
  const getRecommendationDescription = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY':
        return 'Buy';
      case 'SELL':
        return 'Sell';
      case 'HOLD':
        return 'Hold';
      default:
        return 'Unknown';
    }
  };

  // Calculate statistics
  const totalChanges = changePoints.length;
  const buySignals = data.filter(item => item.recommendation === 'BUY').length;
  const sellSignals = data.filter(item => item.recommendation === 'SELL').length;
  const holdSignals = data.filter(item => item.recommendation === 'HOLD').length;

  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityLabel={`Stock price chart for ${stockSymbol} with recommendation changes`}
    >
      <Text 
        style={styles.title}
        accessibilityRole="header"
        accessibilityLabel={`${stockSymbol} Price Chart with Recommendations`}
      >
        {stockSymbol} Price Chart with Recommendations
      </Text>
      
      {/* Chart */}
      <View 
        style={styles.chartContainer}
        accessible={true}
        accessibilityLabel="Stock price line chart"
      >
        <LineChart
          data={chartData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#007AFF',
            },
            propsForLabels: {
              fontSize: 8,
              fontWeight: '600',
              textAnchor: 'middle',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Recommendation Change Points */}
      {changePoints.length > 0 && (
        <View 
          style={styles.changePointsContainer}
          accessible={true}
          accessibilityLabel={`${totalChanges} recommendation change points detected`}
        >
          <Text 
            style={styles.changePointsTitle}
            accessibilityRole="header"
          >
            Recommendation Changes ({totalChanges})
          </Text>
          {changePoints.map((point, index) => (
            <View 
              key={`${point?.date}-${index}`}
              style={styles.changePoint}
              accessible={true}
              accessibilityLabel={`Change ${index + 1}: From ${getRecommendationDescription(point?.fromRecommendation || '')} to ${getRecommendationDescription(point?.toRecommendation || '')} on ${point?.date} at price $${point?.price.toFixed(2)}`}
            >
              <View style={styles.changePointHeader}>
                <Text style={styles.changePointDate}>{point?.date}</Text>
                <Text style={styles.changePointPrice}>${point?.price.toFixed(2)}</Text>
              </View>
              <View style={styles.changePointRecommendations}>
                <View style={styles.recommendationBadge}>
                  <View 
                    style={[
                      styles.recommendationDot, 
                      { backgroundColor: getRecommendationColor(point?.fromRecommendation || '') }
                    ]} 
                  />
                  <Text style={styles.recommendationText}>
                    {getRecommendationDescription(point?.fromRecommendation || '')}
                  </Text>
                </View>
                <Text style={styles.changeArrow}>→</Text>
                <View style={styles.recommendationBadge}>
                  <View 
                    style={[
                      styles.recommendationDot, 
                      { backgroundColor: getRecommendationColor(point?.toRecommendation || '') }
                    ]} 
                  />
                  <Text style={styles.recommendationText}>
                    {getRecommendationDescription(point?.toRecommendation || '')}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Statistics */}
      <View 
        style={styles.statisticsContainer}
        accessible={true}
        accessibilityLabel={`Recommendation statistics: ${buySignals} buy signals, ${sellSignals} sell signals, ${holdSignals} hold signals`}
      >
        <Text 
          style={styles.statisticsTitle}
          accessibilityRole="header"
        >
          Recommendation Statistics
        </Text>
        <View style={styles.statisticsRow}>
          <View style={styles.statistic}>
            <View style={[styles.statisticDot, { backgroundColor: '#34C759' }]} />
            <Text style={styles.statisticLabel}>Buy</Text>
            <Text style={styles.statisticValue}>{buySignals}</Text>
          </View>
          <View style={styles.statistic}>
            <View style={[styles.statisticDot, { backgroundColor: '#FF3B30' }]} />
            <Text style={styles.statisticLabel}>Sell</Text>
            <Text style={styles.statisticValue}>{sellSignals}</Text>
          </View>
          <View style={styles.statistic}>
            <View style={[styles.statisticDot, { backgroundColor: '#FF9500' }]} />
            <Text style={styles.statisticLabel}>Hold</Text>
            <Text style={styles.statisticValue}>{holdSignals}</Text>
          </View>
        </View>
      </View>
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
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
  changePointsContainer: {
    marginBottom: 20,
  },
  changePointsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  changePoint: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  changePointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  changePointDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  changePointPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  changePointRecommendations: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recommendationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  recommendationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  recommendationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  changeArrow: {
    fontSize: 16,
    color: '#666',
    marginHorizontal: 8,
  },
  statisticsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingTop: 15,
  },
  statisticsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  statisticsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statistic: {
    alignItems: 'center',
  },
  statisticDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  statisticLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  statisticValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default RecommendationChart; 