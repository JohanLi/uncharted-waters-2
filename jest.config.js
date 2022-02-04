module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(png|bin|ogg|mp3)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};
