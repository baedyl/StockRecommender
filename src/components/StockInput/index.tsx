import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
} from 'react-native';

interface StockInputProps {
  symbol: string;
  onSymbolChange: (symbol: string) => void;
  timeWindow: number;
  onTimeWindowChange: (window: number) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

const StockInput: React.FC<StockInputProps> = ({ 
  symbol, 
  onSymbolChange, 
  timeWindow, 
  onTimeWindowChange, 
  onSubmit,
  isLoading = false
}) => {
  return (
    <View style={styles.container} accessible={true}>
      <Text style={styles.label} accessibilityRole="text">Stock Symbol</Text>
      <TextInput
        style={styles.input}
        value={symbol}
        onChangeText={onSymbolChange}
        placeholder="e.g., AAPL"
        autoCapitalize="characters"
        accessibilityLabel="Stock symbol input"
        accessibilityHint="Enter a stock symbol like AAPL or GOOGL"
      />
      
      <Text style={styles.label} accessibilityRole="text">Time Window (days)</Text>
      <TextInput
        style={styles.input}
        value={timeWindow.toString()}
        onChangeText={(text) => {
          const parsed = parseInt(text, 10);
          if (!isNaN(parsed) && parsed > 0) {
            onTimeWindowChange(parsed);
          }
        }}
        keyboardType="numeric"
        placeholder="10"
        accessibilityLabel="Time window input"
        accessibilityHint="Enter the number of days to analyze"
      />
      
      <TouchableOpacity 
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={isLoading}
        accessibilityRole="button"
        accessibilityLabel="Get recommendations"
        accessibilityState={{ disabled: isLoading }}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Get Recommendations</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 4,
    fontSize: 16
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600'
  }
});

export default StockInput;