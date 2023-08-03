module.exports = {
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  ignorePatterns: ['src/schema'],
  rules: {
    '@typescript-eslint/unbound-method': 'off',
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
