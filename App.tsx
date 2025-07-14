// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';
import MainScreen from './src/screens/MainScreen';
import RecommendationResultsScreen from './src/screens/RecommendationResultsScreen';

type RootStackParamList = {
  Home: undefined;
  RecommendationResults: {
    stockSymbol: string;
    stockData: any[];
    recommendations: any[];
    recentSocialCount: number;
    selectedAlgorithmId: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#f5f5f5' },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={MainScreen}
          options={{
            title: 'Stock Recommender',
          }}
        />
        <Stack.Screen 
          name="RecommendationResults" 
          component={RecommendationResultsScreen}
          options={{
            title: 'Recommendation Results',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;