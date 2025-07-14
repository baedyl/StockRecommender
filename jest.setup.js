// Mock InteractionManager
jest.mock('react-native/Libraries/Interaction/InteractionManager', () => ({
  runAfterInteractions: jest.fn((callback) => callback()),
  createInteractionHandle: jest.fn(() => 1),
  clearInteractionHandle: jest.fn(),
}));

// Mock Dimensions
jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 375, height: 812 })),
}));

// Mock AccessibilityInfo
jest.mock('react-native/Libraries/Components/AccessibilityInfo/AccessibilityInfo', () => ({
  announceForAccessibility: jest.fn(),
  setAccessibilityFocus: jest.fn(),
  isScreenReaderEnabled: jest.fn(() => Promise.resolve(false)),
}));

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    PanGestureHandler: View,
    TapGestureHandler: View,
    LongPressGestureHandler: View,
    State: {
      UNDETERMINED: 0,
      FAILED: 1,
      BEGAN: 2,
      CANCELLED: 3,
      ACTIVE: 4,
      END: 5,
    },
    Directions: {
      RIGHT: 1,
      LEFT: 2,
      UP: 4,
      DOWN: 8,
    },
  };
});

// Mock react-native-chart-kit
jest.mock('react-native-chart-kit', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  
  const LineChart = ({ data, width, height, chartConfig, style }) => {
    return React.createElement(View, {
      style: [style, { width, height }],
      testID: 'line-chart',
      accessible: true,
      accessibilityLabel: 'Mock line chart',
    }, [
      React.createElement(Text, { key: 'title' }, 'Mock Line Chart'),
      React.createElement(Text, { key: 'data' }, `Data points: ${data.datasets[0].data.length}`),
    ]);
  };

  return {
    LineChart,
    BarChart: LineChart,
    PieChart: LineChart,
    ProgressChart: LineChart,
    ContributionGraph: LineChart,
    AbstractChart: LineChart,
  };
});

// Mock react-native-svg
jest.mock('react-native-svg', () => {
  const React = require('react');
  const { View } = require('react-native');

  const Svg = ({ children, ...props }) => {
    return React.createElement(View, {
      ...props,
      testID: 'svg',
    }, children);
  };

  const Path = (props) => React.createElement(View, { ...props, testID: 'path' });
  const Circle = (props) => React.createElement(View, { ...props, testID: 'circle' });
  const Rect = (props) => React.createElement(View, { ...props, testID: 'rect' });
  const Line = (props) => React.createElement(View, { ...props, testID: 'line' });
  const Text = (props) => React.createElement(View, { ...props, testID: 'svg-text' });

  return {
    Svg,
    Path,
    Circle,
    Rect,
    Line,
    Text,
    default: Svg,
  };
});

// Global test setup
global.console = {
  ...console,
  // Uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
}; 