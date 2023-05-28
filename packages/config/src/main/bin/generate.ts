import fs from 'node:fs';
import path from 'node:path';
import { Primitive } from 'utility-types';

import { parseEnvFile } from './parseEnvFile';

const prodConfig = parseEnvFile(path.resolve('../../.env'));
const devConfig = parseEnvFile(path.resolve('../../.env.dev'));
const testConfig = parseEnvFile(path.resolve('../../.env.test'));

const dir = './src/main/gen';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const prodConfigFilePath = path.resolve(process.cwd(), dir, 'prod-config.ts');
const devConfigFilePath = path.resolve(process.cwd(), dir, 'dev-config.ts');
const testConfigFilePath = path.resolve(process.cwd(), dir, 'test-config.ts');

if (fs.existsSync(prodConfigFilePath)) {
  fs.unlinkSync(prodConfigFilePath);
}

if (fs.existsSync(devConfigFilePath)) {
  fs.unlinkSync(devConfigFilePath);
}

if (fs.existsSync(testConfigFilePath)) {
  fs.unlinkSync(testConfigFilePath);
}

fs.appendFileSync(prodConfigFilePath, generateConsts(prodConfig));
fs.appendFileSync(devConfigFilePath, generateConsts(devConfig));
fs.appendFileSync(testConfigFilePath, generateConsts(testConfig));

function generateConsts<
  Source extends Record<string, Exclude<Primitive, symbol>>,
>(source: Source): string {
  return Object.entries(source)
    .map(([key, value]) => {
      const formattedValue = typeof value === 'string' ? `'${value}'` : value;

      return `export const ${key} = ${formattedValue};`;
    })
    .join('\n');
}
