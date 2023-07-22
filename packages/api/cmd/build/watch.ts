import { program } from 'commander';

import { containerRunScriptCreator, envLoader, spawn } from '../utils';

envLoader();

const opts = program
  .option(
    '-m',
    'Create a migration file that corresponds to the differences between the database and schema.',
  )
  .option(
    '-r',
    'Reset the database and seed it by executing the corresponding script.',
  )
  .option('-s', 'Start the database studio with a UI on localhost:1234.')
  .parse()
  .opts<{ m?: boolean; r?: boolean; s?: boolean }>();

(async function main() {
  await spawn('bash', [
    '-c',
    containerRunScriptCreator('chat-dev-redis', 'redis', [
      ['-h', process.env.REDIS_HOST],
      ['-p', `${process.env.REDIS_PORT}:6379`],
      ['--rm'],
      ['-d'],
    ]),
  ]);

  await spawn('bash', [
    '-c',
    containerRunScriptCreator('chat-dev-db', 'postgres', [
      ['-e', `POSTGRES_DB=${process.env.DATABASE_NAME}`],
      ['-e', `POSTGRES_USER=${process.env.DATABASE_USER}`],
      ['-e', `POSTGRES_PASSWORD=${process.env.DATABASE_PASSWORD}`],
      ['-p', `${process.env.DATABASE_PORT}:5432`],
      ['-v', 'pgdata-dev:/var/lib/postgresql/data'],
      ['--rm'],
      ['-d'],
    ]),
  ]);

  await (opts.m
    ? spawn('npm', ['exec', '-c', 'prisma migrate dev'])
    : spawn('npm', ['exec', '-c', 'prisma db push']));

  if (opts.r) {
    await spawn('npm', ['exec', '-c', 'prisma migrate reset']);
  }

  if (opts.s) {
    void spawn('npm', [
      'exec',
      '-c',
      'prisma studio --browser none --port 1234',
    ]);
  }

  await spawn('npm', [
    'exec',
    '-c',
    'ts-node-dev --inspect=0.0.0.0:5555 --transpile-only --exit-child -- ./src/index.ts',
  ]);
})();
