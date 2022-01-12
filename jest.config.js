module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(png|bin|mp3)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};
