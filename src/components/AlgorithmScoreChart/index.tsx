import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { RecommendationData } from '../../types';
import { getDetailedScore } from '../../algorithms/enhancedAlgorithm';
import { formatDateForChartLabels } from '../../utils/dateUtils';

interface AlgorithmScoreChartProps {
  data: RecommendationData[];
  stockSymbol: string;
}

const AlgorithmScoreChart: React.FC<AlgorithmScoreChartProps> = ({ data, stockSymbol }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available for algorithm analysis</Text>
      </View>
    );
  }

  // Calculate scores for each data point
  const scoreData = data.map((item, index) => {
    const historical = data.slice(0, index + 1);
    const score = getDetailedScore(item, historical);
    return {
      date: item.date,
      priceScore: score.priceScore,
      socialScore: score.socialScore,
      momentumScore: score.momentumScore,
      totalScore: score.totalScore,
      recommendation: score.recommendation,
      confidence: score.confidence,
    };
  });

  // Prepare chart data for multiple lines with vertical date labels
  const chartData = {
    labels: scoreData.map(item => formatDateForChartLabels(item.date)),
    datasets: [
      {
        data: scoreData.map(item => item.priceScore),
        color: (opacity = 1) => `rgba(255, 59, 48, ${opacity})`, // Red for price
        strokeWidth: 2,
      },
      {
        data: scoreData.map(item => item.socialScore),
        color: (opacity = 1) => `rgba(88, 86, 214, ${opacity})`, // Purple for social
        strokeWidth: 2,
      },
      {
        data: scoreData.map(item => item.momentumScore),
        color: (opacity = 1) => `rgba(255, 149, 0, ${opacity})`, // Orange for momentum
        strokeWidth: 2,
      },
      {
        data: scoreData.map(item => item.totalScore),
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Blue for total
        strokeWidth: 3,
      },
    ],
  };

  // Find decision threshold crossings
  const decisionPoints = scoreData.map((item, index) => {
    if (index === 0) return null;
    
    const currentTotal = item.totalScore;
    const previousTotal = scoreData[index - 1].totalScore;
    
    // Check if crossing BUY threshold (0.2) or SELL threshold (-0.2)
    const buyThreshold = 0.2;
    const sellThreshold = -0.2;
    
    if ((previousTotal <= buyThreshold && currentTotal > buyThreshold) ||
        (previousTotal >= buyThreshold && currentTotal < buyThreshold) ||
        (previousTotal >= sellThreshold && currentTotal < sellThreshold) ||
        (previousTotal <= sellThreshold && currentTotal > sellThreshold)) {
      return {
        index,
        date: item.date,
        fromScore: previousTotal,
        toScore: currentTotal,
        recommendation: item.recommendation,
        confidence: item.confidence,
      };
    }
    return null;
  }).filter(Boolean);

  // Calculate average scores
  const avgPriceScore = scoreData.reduce((sum, item) => sum + item.priceScore, 0) / scoreData.length;
  const avgSocialScore = scoreData.reduce((sum, item) => sum + item.socialScore, 0) / scoreData.length;
  const avgMomentumScore = scoreData.reduce((sum, item) => sum + item.momentumScore, 0) / scoreData.length;
  const avgTotalScore = scoreData.reduce((sum, item) => sum + item.totalScore, 0) / scoreData.length;

  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityLabel={`Algorithm scoring analysis for ${stockSymbol}`}
    >
      <Text 
        style={styles.title}
        accessibilityRole="header"
        accessibilityLabel={`${stockSymbol} Algorithm Scoring Analysis`}
      >
        {stockSymbol} Algorithm Scoring Analysis
      </Text>
      
      {/* Chart */}
      <View 
        style={styles.chartContainer}
        accessible={true}
        accessibilityLabel="Algorithm scoring line chart with multiple components"
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
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '3',
              strokeWidth: '1',
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

      {/* Legend */}
      <View 
        style={styles.legendContainer}
        accessible={true}
        accessibilityLabel="Chart legend showing different scoring components"
      >
        <Text style={styles.legendTitle}>Scoring Components:</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF3B30' }]} />
            <Text style={styles.legendText}>Price Score</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#5856D6' }]} />
            <Text style={styles.legendText}>Social Score</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF9500' }]} />
            <Text style={styles.legendText}>Momentum Score</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#007AFF' }]} />
            <Text style={styles.legendText}>Total Score</Text>
          </View>
        </View>
      </View>

      {/* Decision Points */}
      {decisionPoints.length > 0 && (
        <View 
          style={styles.decisionPointsContainer}
          accessible={true}
          accessibilityLabel={`${decisionPoints.length} algorithm decision threshold crossings detected`}
        >
          <Text 
            style={styles.decisionPointsTitle}
            accessibilityRole="header"
          >
            Decision Threshold Crossings ({decisionPoints.length})
          </Text>
          {decisionPoints.map((point, index) => (
            <View 
              key={`${point?.date}-${index}`}
              style={styles.decisionPoint}
              accessible={true}
              accessibilityLabel={`Decision ${index + 1}: Score changed from ${point?.fromScore.toFixed(3)} to ${point?.toScore.toFixed(3)} on ${point?.date}, resulting in ${point?.recommendation} recommendation with ${((point?.confidence || 0) * 100).toFixed(1)}% confidence`}
            >
              <View style={styles.decisionPointHeader}>
                <Text style={styles.decisionPointDate}>{point?.date}</Text>
                <Text style={styles.decisionPointConfidence}>
                  {((point?.confidence || 0) * 100).toFixed(1)}% confidence
                </Text>
              </View>
              <View style={styles.decisionPointScores}>
                <Text style={styles.decisionPointScore}>
                  Score: {point?.fromScore.toFixed(3)} → {point?.toScore.toFixed(3)}
                </Text>
                <Text style={styles.decisionPointRecommendation}>
                  Result: {point?.recommendation}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Average Scores */}
      <View 
        style={styles.averagesContainer}
        accessible={true}
        accessibilityLabel={`Average scores: Price ${avgPriceScore.toFixed(3)}, Social ${avgSocialScore.toFixed(3)}, Momentum ${avgMomentumScore.toFixed(3)}, Total ${avgTotalScore.toFixed(3)}`}
      >
        <Text 
          style={styles.averagesTitle}
          accessibilityRole="header"
        >
          Average Scores
        </Text>
        <View style={styles.averagesRow}>
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>Price</Text>
            <Text style={styles.averageValue}>{avgPriceScore.toFixed(3)}</Text>
          </View>
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>Social</Text>
            <Text style={styles.averageValue}>{avgSocialScore.toFixed(3)}</Text>
          </View>
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>Momentum</Text>
            <Text style={styles.averageValue}>{avgMomentumScore.toFixed(3)}</Text>
          </View>
          <View style={styles.averageItem}>
            <Text style={styles.averageLabel}>Total</Text>
            <Text style={styles.averageValue}>{avgTotalScore.toFixed(3)}</Text>
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
  legendContainer: {
    marginBottom: 20,
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  legendItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    minWidth: '45%',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  decisionPointsContainer: {
    marginBottom: 20,
  },
  decisionPointsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  decisionPoint: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  decisionPointHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  decisionPointDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  decisionPointConfidence: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: '600',
  },
  decisionPointScores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  decisionPointScore: {
    fontSize: 12,
    color: '#666',
  },
  decisionPointRecommendation: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  averagesContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e1e1e1',
    paddingTop: 15,
  },
  averagesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  averagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  averageItem: {
    alignItems: 'center',
  },
  averageLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  averageValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AlgorithmScoreChart; 