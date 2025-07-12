import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { RecommendationData } from '../../types';

interface RecommendationTableProps {
  recommendations: RecommendationData[];
}

const RecommendationTable: React.FC<RecommendationTableProps> = ({ recommendations }) => {
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

  const renderItem = ({ item }: { item: RecommendationData }) => (
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

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">Recommendations</Text>
      <View style={styles.header}>
        <Text style={styles.headerCell}>Date</Text>
        <Text style={styles.headerCell}>Price</Text>
        <Text style={styles.headerCell}>Social</Text>
        <Text style={styles.headerCell}>Action</Text>
      </View>
      <FlatList
        data={recommendations}
        renderItem={renderItem}
        keyExtractor={(item) => item.date}
        accessibilityRole="list"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  header: {
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

export default RecommendationTable;