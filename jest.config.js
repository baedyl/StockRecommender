module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|react-native-gesture-handler|react-native-chart-kit|react-native-svg)/)',
  ],
  moduleNameMapper: {
    '^react-native-gesture-handler$': '<rootDir>/__mocks__/react-native-gesture-handler.js',
    '^react-native-chart-kit$': '<rootDir>/__mocks__/react-native-chart-kit.js',
    '^react-native-svg$': '<rootDir>/__mocks__/react-native-svg.js',
  },
  setupFiles: ['<rootDir>/jest.pixelratio-mock.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'node',
};
