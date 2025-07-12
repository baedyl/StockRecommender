const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// Compatibility patch
const os = require('os');
if (typeof os.availableParallelism !== 'function') {
  os.availableParallelism = () => os.cpus().length;
}

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);