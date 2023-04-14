import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import * as d from 'doubter';

const configShape = d.object({
  CLIENT_PORT: d.string().transform(toNumber),

  API_PORT: d.string().transform(toNumber),
  API_PREFIX: d.string().regex(/^\/\w+/),
  API_GQL_PLAYGROUND_ENABLED: d
    .string()
    .optional()
    .transform((input) => (input ? toBoolean(input) : null)),

  DATABASE_USER: d.string(),
  DATABASE_PASSWORD: d.string(),
  DATABASE_HOST: d.string(),
  DATABASE_NAME: d.string(),
  DATABASE_PORT: d.string().transform(toNumber),
  DATABASE_URL: d.string(),

  REDIS_HOST: d.string(),
  REDIS_PORT: d.string().transform(toNumber),
  REDIS_URL: d.string(),

  HTTP_AUTH_PASSWORD: d.string(),
});

/**
 * Config types.
 */
export type IConfig = d.Output<typeof configShape>;

/**
 * Parses the contents of the .env file located at the specified path and
 * returns an object with key-value pairs.
 *
 * @param {string} path - The path to the .env file to be parsed.
 * @returns {dotenv.DotenvParseOutput} - An object containing key-value pairs
 *   representing the contents of the .env file.
 * @throws {Error} - If the .env file cannot be loaded or its contents cannot be
 *   parsed.
 */
export function parseEnvFile(
  path: string,
): d.Output<typeof configShape> | never {
  const { error, parsed } = dotenvExpand.expand({
    ignoreProcessEnv: true,
    ...dotenv.config({
      path,
    }),
  });

  if (error) {
    throw error;
  }

  if (!parsed) {
    throw new Error(
      `An error occurred while parsing the .env file at the following path: ${path}`,
    );
  }

  const result = configShape.try(parsed);

  if (!result.ok) {
    throw new Error(
      `A validation error occurred while parsing .env file at the following path: ${path}.
      
Error details: 
${result.issues.map((value) => JSON.stringify(value, null, 2)).join('\n')}`,
    );
  }

  return result.value;
}

function toNumber(input: string): number {
  const output = Number.parseInt(input, 10);

  if (Number.isNaN(output)) {
    throw new d.ValidationError([
      {
        message: `Unable to convert "${input}" to number.`,
      },
    ]);
  }

  return output;
}

function toBoolean(input: string): boolean {
  if (input !== 'true' && input !== 'false') {
    throw new d.ValidationError([
      {
        message: `Unable to convert "${input}" to boolean, use either "true" or "false".`,
      },
    ]);
  }

  return input === 'true';
}
