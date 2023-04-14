import fs from 'node:fs';
import path from 'node:path';
import { Primitive } from 'utility-types';

import { parseEnvFile } from './parseEnvFile';

const config = parseEnvFile(path.resolve('../../.env'));

const dir = './src/main/gen';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const prodConfigFilePath = path.resolve(process.cwd(), dir, 'config.ts');

if (fs.existsSync(prodConfigFilePath)) {
  fs.unlinkSync(prodConfigFilePath);
}

fs.appendFileSync(prodConfigFilePath, generateConsts(config));

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
