import { devConfig } from 'config';
import * as process from 'node:process';

import { containerRunScriptCreator, spawn } from '../utils';

(async function main() {
  await spawn('bash', [
    '-c',
    containerRunScriptCreator('chat-dev-redis', 'redis', [
      ['-h', devConfig.REDIS_HOST],
      ['-p', `${devConfig.REDIS_PORT}:6379`],
      ['--rm'],
      ['-d'],
    ]),
  ]);

  await spawn('bash', [
    '-c',
    containerRunScriptCreator('chat-dev-db', 'postgres', [
      ['-e', `POSTGRES_DB=${devConfig.DATABASE_NAME}`],
      ['-e', `POSTGRES_USER=${devConfig.DATABASE_USER}`],
      ['-e', `POSTGRES_PASSWORD=${devConfig.DATABASE_PASSWORD}`],
      ['-p', `${devConfig.DATABASE_PORT}:5432`],
      ['-v', 'pgdata-dev:/var/lib/postgresql/data'],
      ['--rm'],
      ['-d'],
    ]),
  ]);

  process.env.DATABASE_URL = devConfig.DATABASE_URL;

  await spawn('npm', ['exec', '-c', 'prisma migrate dev']);

  await spawn('npm', ['exec', '-c', 'prisma generate']);

  await spawn('npm', [
    'exec',
    '-c',
    'ts-node-dev --inspect=0.0.0.0:5555 --transpile-only --exit-child -- ./src/index.ts',
  ]);
})();
