module.exports = {
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
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
