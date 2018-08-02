module.exports = {
  testURL: 'http://localhost:8081', // https://github.com/jsdom/jsdom/issues/2304
  setupTestFrameworkScriptFile: '<rootDir>/setupFile.js',
  moduleNameMapper: {
    '\\.(mp3|png|bin)$': '<rootDir>/mocks/file.js',
  },
};
