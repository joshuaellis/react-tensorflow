module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/app/'],
  coverageThreshold: {
    global: {
      statements: 92,
      branches: 92,
      functions: 92,
      lines: 92
    }
  },
  moduleDirectories: ['node_modules', 'src']
}
