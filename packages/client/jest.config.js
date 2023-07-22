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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'cjs'],
  resetMocks: false,
  setupFiles: ['jest-localstorage-mock'],
  moduleNameMapper: {
    '^app$': `${process.cwd()}/src/main/app`,
    '^app/(.*)': `${process.cwd()}/src/main/app/$1`,
    '^page$': `${process.cwd()}/src/main/page`,
    '^page/(.*)': `${process.cwd()}/src/main/page/$1`,
    '^widget$': `${process.cwd()}/src/main/widget`,
    '^widget/(.*)': `${process.cwd()}/src/main/widget/$1`,
    '^feature$': `${process.cwd()}/src/main/feature`,
    '^feature/(.*)': `${process.cwd()}/src/main/feature/$1`,
    '^entity$': `${process.cwd()}/src/main/entity`,
    '^entity/(.*)': `${process.cwd()}/src/main/entity/$1`,
    '^shared$': `${process.cwd()}/src/main/shared`,
    '^shared/(.*)': `${process.cwd()}/src/main/shared/$1`,
  },
};
