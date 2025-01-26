module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    'module:react-native-builder-bob/babel-preset',
    '@babel/preset-typescript',
  ],
};
