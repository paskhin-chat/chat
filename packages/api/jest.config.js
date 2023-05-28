module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './src',
  testRegex: '.spec.ts$',
  preset: 'ts-jest',
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  collectCoverageFrom: ['**/*.(t|j)s', '!**/node_modules/**'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
