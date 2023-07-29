import childProcess from 'node:child_process';
import * as path from 'node:path';
import { loadEnv } from 'exdenv';

import { envSchema } from '../src/common/env';

/**
 * Spawn a command as child process.
 */
export function spawn(command: string, args: string[]): Promise<void> {
  return new Promise<void>((resolve) => {
    childProcess
      .spawn(command, args, { stdio: 'inherit' })
      .on('close', resolve);
  });
}

/**
 * Creates a script string for run simple docker container.
 */
export function containerRunScriptCreator(
  name: string,
  image: string,
  options: Array<[string, string?]>,
): string {
  return `
    #!/bin/bash
      export CONTAINER_NAME="${name}"

      if [ ! "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
        if [ "$(docker ps -aq -f status=exited -f name=$CONTAINER_NAME)" ]; then
          docker rm $CONTAINER_NAME
        fi

        docker run --name $CONTAINER_NAME ${options
          .map(([flag, value]) => `${flag} ${value || ''}`)
          .join(' ')} ${image}

      else
        echo $(docker ps -q -f name=$CONTAINER_NAME)
      fi
    `;
}

/**
 * Loads env variables.
 */
export function envLoader(): void {
  loadEnv(envSchema, {
    corePath: path.resolve(process.cwd(), '../../.env'),
    defaultsPathsMap: {
      development: path.resolve(process.cwd(), '../../.env.dev.defaults'),
      test: path.resolve(process.cwd(), '../../.env.test.defaults'),
    },
  });
}
