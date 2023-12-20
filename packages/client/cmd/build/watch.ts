import { program } from "commander";
import { ports } from "constant";

import { spawn } from "../utils";

const opts = program
  .option(
    "-s",
    `Initiate the React Cosmos sandbox environment at the local address: http://localhost:${ports.dev.ui}.`
  )
  .parse()
  .opts<{ s?: boolean }>();

(async function main() {
  if (opts.s) {
    void spawn("npm", ["exec", "-c", "cosmos"]);
  }

  // TODO: add a cli flag for this feature
  void spawn("npm", [
    "exec",
    "-c",
    "graphql-codegen --config graphql.codegen.yaml",
  ]);

  await spawn("npm", ["exec", "-c", "vite"]);
})();
