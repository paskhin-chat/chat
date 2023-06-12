import * as process from 'node:process';
import { testConfig } from 'config';

import { containerRunScriptCreator, spawn } from '../utils';

(async function main() {
  await spawn('bash', [
    '-c',
    containerRunScriptCreator('chat-test-redis', 'redis', [
      ['-h', testConfig.REDIS_HOST],
      ['-p', `${testConfig.REDIS_PORT}:6379`],
      ['--rm'],
      ['-d'],
    ]),
  ]);

  await spawn('bash', [
    '-c',
    containerRunScriptCreator('chat-test-db', 'postgres', [
      ['-e', `POSTGRES_DB=${testConfig.DATABASE_NAME}`],
      ['-e', `POSTGRES_USER=${testConfig.DATABASE_USER}`],
      ['-e', `POSTGRES_PASSWORD=${testConfig.DATABASE_PASSWORD}`],
      ['-p', `${testConfig.DATABASE_PORT}:5432`],
      ['-v', 'pgdata-test:/var/lib/postgresql/data'],
      ['--rm'],
      ['-d'],
    ]),
  ]);

  process.env.DATABASE_URL = testConfig.DATABASE_URL;

  await spawn('npm', ['exec', '-c', 'prisma db push']);

  await spawn('jest', []);
})();
