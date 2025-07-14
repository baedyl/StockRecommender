import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DataDisplay from '../components/DataDisplay';
import RecommendationChart from '../components/RecommendationChart';
import AlgorithmScoreChart from '../components/AlgorithmScoreChart';
import { StockData, RecommendationData } from '../types';

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

type RecommendationResultsScreenRouteProp = RouteProp<RootStackParamList, 'RecommendationResults'>;
type RecommendationResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'RecommendationResults'>;

const RecommendationResultsScreen: React.FC = () => {
  const navigation = useNavigation<RecommendationResultsScreenNavigationProp>();
  const route = useRoute<RecommendationResultsScreenRouteProp>();
  
  const { 
    stockSymbol, 
    stockData, 
    recommendations, 
    recentSocialCount, 
    selectedAlgorithmId 
  } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleGoBack}
          accessibilityRole="button"
          accessibilityLabel="Go back to home screen"
          accessibilityHint="Double tap to return to the main screen"
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text 
          style={styles.headerTitle}
          accessibilityRole="header"
          accessibilityLabel={`Recommendation results for ${stockSymbol}`}
        >
          {stockSymbol} Results
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        accessibilityLabel="Recommendation results content"
      >
        {/* Market Overview */}
        <DataDisplay 
          data={stockData} 
          recentSocialCount={recentSocialCount} 
        />

        {/* Recommendation Chart */}
        <RecommendationChart 
          data={recommendations} 
          stockSymbol={stockSymbol} 
        />

        {/* Algorithm Score Chart (Enhanced Algorithm only) */}
        {selectedAlgorithmId === 'enhanced' && (
          <AlgorithmScoreChart 
            data={recommendations} 
            stockSymbol={stockSymbol} 
          />
        )}

        {/* Recommendations Table */}
        <View style={styles.recommendationsSection}>
          <Text 
            style={styles.sectionTitle}
            accessibilityRole="header"
            accessibilityLabel="Detailed recommendations table"
          >
            Detailed Recommendations
          </Text>
          
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={styles.headerCell}>Date</Text>
            <Text style={styles.headerCell}>Price</Text>
            <Text style={styles.headerCell}>Social</Text>
            <Text style={styles.headerCell}>Action</Text>
          </View>

          {/* Table Rows */}
          {recommendations.map((item, index) => (
            <View 
              key={item.date}
              style={styles.tableRow}
              accessible={true}
              accessibilityLabel={`Recommendation ${index + 1}: Date ${item.date}, Price $${item.price.toFixed(2)}, Social media mentions ${item.socialMediaCount.toLocaleString()}, Recommendation ${item.recommendation}`}
            >
              <Text style={styles.cell}>{item.date}</Text>
              <Text style={styles.cell}>${item.price.toFixed(2)}</Text>
              <Text style={styles.cell}>{item.socialMediaCount.toLocaleString()}</Text>
              <Text 
                style={[
                  styles.cell, 
                  styles.recommendationCell,
                  item.recommendation === 'BUY' && styles.buyRecommendation,
                  item.recommendation === 'SELL' && styles.sellRecommendation,
                  item.recommendation === 'HOLD' && styles.holdRecommendation,
                ]}
              >
                {item.recommendation}
              </Text>
            </View>
          ))}
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text 
            style={styles.sectionTitle}
            accessibilityRole="header"
            accessibilityLabel="Recommendation summary"
          >
            Summary
          </Text>
          
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total Days</Text>
              <Text style={styles.summaryValue}>{recommendations.length}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Buy Signals</Text>
              <Text style={[styles.summaryValue, styles.buyValue]}>
                {recommendations.filter(r => r.recommendation === 'BUY').length}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Sell Signals</Text>
              <Text style={[styles.summaryValue, styles.sellValue]}>
                {recommendations.filter(r => r.recommendation === 'SELL').length}
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Hold Signals</Text>
              <Text style={[styles.summaryValue, styles.holdValue]}>
                {recommendations.filter(r => r.recommendation === 'HOLD').length}
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 20,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 60, // Same width as back button for centering
  },
  content: {
    flex: 1,
  },
  recommendationsSection: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 10,
    marginBottom: 5,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
  recommendationCell: {
    fontWeight: 'bold',
  },
  buyRecommendation: {
    color: '#34C759',
  },
  sellRecommendation: {
    color: '#FF3B30',
  },
  holdRecommendation: {
    color: '#FF9500',
  },
  summarySection: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  buyValue: {
    color: '#34C759',
  },
  sellValue: {
    color: '#FF3B30',
  },
  holdValue: {
    color: '#FF9500',
  },
  bottomSpacing: {
    height: 20,
  },
});

export default RecommendationResultsScreen; 