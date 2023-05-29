import { devConfig } from 'config';

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

  await spawn('bash', [
    '-c',
    `
    #!/bin/bash

    read -p "Need to create a migration? (Y/n): " migration_necessity

    if [[ $migration_necessity == [Yy] ]]; then
      read -p "Enter migration name: " migration_name

      if [[ $migration_name ]]; then
        DATABASE_URL=${devConfig.DATABASE_URL} npx prisma migrate dev --name "$migration_name"
        DATABASE_URL=${devConfig.DATABASE_URL} npx prisma generate

        exit 0
      else
        echo "Migration name cannot be empty. Skipping migration creation."
      fi
    fi
    
    DATABASE_URL=${devConfig.DATABASE_URL} npx prisma db push
    DATABASE_URL=${devConfig.DATABASE_URL} npx prisma generate
    `,
  ]);

  process.env.DATABASE_URL = devConfig.DATABASE_URL;

  await spawn('npm', [
    'exec',
    '-c',
    'ts-node-dev --inspect=0.0.0.0:5555 --transpile-only --exit-child -- ./src/index.ts',
  ]);
})();
