import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header: React.FC = () => {
  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityLabel="Stock Recommender app header"
    >
      <Text 
        style={styles.title} 
        accessibilityRole="header"
        accessibilityLabel="Stock Recommender app title"
      >
        Stock Recommender
      </Text>
      <Text 
        style={styles.subtitle}
        accessibilityLabel="AI-Powered Trading Insights subtitle"
      >
        AI-Powered Trading Insights
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 50,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)'
  }
});

export default Header;