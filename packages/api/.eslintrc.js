module.exports = {
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  ignorePatterns: ['src/schema'],
  rules: {
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
        },
      },
    ],
  },
};
