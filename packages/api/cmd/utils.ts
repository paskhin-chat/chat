import childProcess from 'node:child_process';

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
