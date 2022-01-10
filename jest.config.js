module.exports = {
  preset: 'ts-jest',
  moduleNameMapper: {
    '\\.(png|bin)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
};
