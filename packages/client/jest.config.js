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
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
};
