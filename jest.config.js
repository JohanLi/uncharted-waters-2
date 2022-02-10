module.exports = {
  // ts-jest is much slower and not needed as we run tsc as part of build
  // @swc/jest is faster than Babel
  transform: {
    '\\.tsx?$': '@swc/jest',
  },
  moduleNameMapper: {
    '\\.(png|bin|ogg|mp3)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  testMatch: ['**/*.test.{ts,tsx}'],
};
