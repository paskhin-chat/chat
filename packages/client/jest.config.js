module.exports = {
  rootDir: './src/test',
  preset: 'ts-jest',
  transform: {
    '^.+\\.[t|j]sx?$': [
      'ts-jest',
      {
        diagnostics: {
          ignoreCodes: [1_343],
        },
        astTransformers: {
          before: [
            {
              path: 'ts-jest-mock-import-meta',
              options: {
                metaObjectReplacement: { env: { MODE: 'test' } },
              },
            },
          ],
        },
      },
    ],
  },
  testEnvironment: 'jsdom',
  testRegex: ['.test.tsx?$'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  resetMocks: false,
  setupFiles: ['jest-localstorage-mock'],
  moduleNameMapper: {
    '^app$': `${__dirname}/src/main/app`,
    '^app/(.*)': `${__dirname}/src/main/app/$1`,
    '^page$': `${__dirname}/src/main/page`,
    '^page/(.*)': `${__dirname}/src/main/page/$1`,
    '^widget$': `${__dirname}/src/main/widget`,
    '^widget/(.*)': `${__dirname}/src/main/widget/$1`,
    '^feature$': `${__dirname}/src/main/feature`,
    '^feature/(.*)': `${__dirname}/src/main/feature/$1`,
    '^entity$': `${__dirname}/src/main/entity`,
    '^entity/(.*)': `${__dirname}/src/main/entity/$1`,
    '^shared$': `${__dirname}/src/main/shared`,
    '^shared/(.*)': `${__dirname}/src/main/shared/$1`,
  },
};
