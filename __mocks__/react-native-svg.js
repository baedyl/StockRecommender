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

module.exports = {
  Svg,
  Path,
  Circle,
  Rect,
  Line,
  Text,
  default: Svg,
}; 