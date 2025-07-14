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

module.exports = {
  LineChart,
  BarChart: LineChart,
  PieChart: LineChart,
  ProgressChart: LineChart,
  ContributionGraph: LineChart,
  AbstractChart: LineChart,
}; 