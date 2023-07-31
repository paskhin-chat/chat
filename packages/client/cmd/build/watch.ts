import { program } from 'commander';
import { ports } from 'constant';

import { spawn } from '../utils';

const opts = program
  .option(
    '-s',
    `Initiate the React Cosmos sandbox environment at the local address: http://localhost:${ports.dev.ui}.`,
  )
  .parse()
  .opts<{ s?: boolean }>();

(async function main() {
  if (opts.s) {
    void spawn('npm', ['exec', '-c', 'cosmos']);
  }

  await spawn('npm', ['exec', '-c', 'vite']);
})();
