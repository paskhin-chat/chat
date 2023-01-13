const process = require('node:process');

module.exports = {
  rootDir: process.cwd(),
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: ['.test.tsx?$'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
};
