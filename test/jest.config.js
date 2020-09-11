module.exports = {
  testURL: 'http://localhost:8080', // https://github.com/jsdom/jsdom/issues/2304
  setupFilesAfterEnv: [
    '<rootDir>/setupFile.js',
  ],
  moduleNameMapper: {
    '\\.(mp3|png|bin)$': '<rootDir>/mocks/file.js',
  },
};
