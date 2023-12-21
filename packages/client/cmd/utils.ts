import childProcess from 'node:child_process';

/**
 * Spawn a command as child process.
 */
export function spawn(command: string, args: string[]): Promise<void> {
  return new Promise<void>(resolve => {
    childProcess.spawn(command, args, { stdio: 'inherit' }).on('close', resolve);
  });
}
