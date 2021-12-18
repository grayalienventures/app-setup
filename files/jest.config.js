module.exports = {
    preset: 'react-native',
    // roots: ['<rootDir>/src'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    "transformIgnorePatterns": [
      "node_modules/(?!(react-native|react-native-button|native-base|@react-native|native-base-shoutem-theme|react-native-easy-grid)/)"
    ]
  }