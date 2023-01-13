import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv-extended';

const env = dotenv.load({
  path: '../../.env',
  defaults: '../../.env.defaults',
  schema: '../../.env.schema',
  silent: false,
  errorOnExtra: true,
  errorOnRegex: true,
  errorOnMissing: true,
});

const dir = './src/main/gen';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const filePath = path.resolve(process.cwd(), dir, 'envConfig.ts');

if (fs.existsSync(filePath)) {
  fs.unlinkSync(filePath);
}

const ENV_TYPES: dotenv.IEnvironmentMap = {
  CLIENT_PORT: 'number',
  CLIENT_DOMAIN: 'string',
  API_PORT: 'number',
  API_DOMAIN: 'string',
  API_PREFIX: 'string',
  DATABASE_URL: 'string',
};

fs.appendFileSync(
  filePath,
  Object.entries(env)
    .map(
      ([key, value]) => `
/**
 * ${key}
 */    
export const ${key} = ${
        ENV_TYPES[key] === 'number' ? Number.parseInt(value, 10) : `'${value}'`
      };`,
    )
    .join(''),
);
