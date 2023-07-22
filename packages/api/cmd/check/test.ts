import { containerRunScriptCreator, envLoader, spawn } from '../utils';

envLoader();

(async function main() {
  await spawn('bash', [
    '-c',
    containerRunScriptCreator('chat-test-redis', 'redis', [
      ['-h', process.env.REDIS_HOST],
      ['-p', `${process.env.REDIS_PORT}:6379`],
      ['--rm'],
      ['-d'],
    ]),
  ]);

  await spawn('bash', [
    '-c',
    containerRunScriptCreator('chat-test-db', 'postgres', [
      ['-e', `POSTGRES_DB=${process.env.DATABASE_NAME}`],
      ['-e', `POSTGRES_USER=${process.env.DATABASE_USER}`],
      ['-e', `POSTGRES_PASSWORD=${process.env.DATABASE_PASSWORD}`],
      ['-p', `${process.env.DATABASE_PORT}:5432`],
      ['-v', 'pgdata-test:/var/lib/postgresql/data'],
      ['--rm'],
      ['-d'],
    ]),
  ]);

  await spawn('npm', ['exec', '-c', 'prisma migrate dev']);

  await spawn('jest', ['-i']);
})();
