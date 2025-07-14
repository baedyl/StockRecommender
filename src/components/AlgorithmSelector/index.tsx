import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { recommendationAlgorithms } from '../../algorithms';
import { ACCESSIBILITY_LABELS } from '../../constants/config';

interface AlgorithmSelectorProps {
  selectedAlgorithmId: string;
  onAlgorithmChange: (algorithmId: string) => void;
}

const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedAlgorithmId,
  onAlgorithmChange,
}) => {
  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityLabel={ACCESSIBILITY_LABELS.ALGORITHM_SELECTION}
    >
      <Text 
        style={styles.label}
        accessibilityRole="header"
      >
        Recommendation Algorithm:
      </Text>
      <Picker
        selectedValue={selectedAlgorithmId}
        onValueChange={onAlgorithmChange}
        style={styles.picker}
        accessibilityLabel={ACCESSIBILITY_LABELS.ALGORITHM_PICKER}
        accessibilityHint={ACCESSIBILITY_LABELS.ALGORITHM_HINT}
      >
        {recommendationAlgorithms.map(alg => (
          <Picker.Item 
            key={alg.id} 
            label={alg.name} 
            value={alg.id}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    backgroundColor: 'white',
  },
});

export default AlgorithmSelector; 