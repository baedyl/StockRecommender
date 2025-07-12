// App.tsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import MainScreen from './src/screens/MainScreen';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <MainScreen />
    </SafeAreaView>
  );
};

export default App;