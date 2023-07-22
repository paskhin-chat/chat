import * as d from 'doubter';

/**
 * .env shape for validating.
 *
 * It's the temporary approach until the
 * [@doubter/json-schema]{@link https://github.com/smikhalevski/doubter-json-schema}
 * lib will have a fromJSONSchema.
 */
export const envSchema = d.object({
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

  JWT_SECRET_TOKEN: d.string(),
  COOKIES_SECRET_TOKEN: d.string(),
});

/**
 * Env types.
 */
export type IEnv = d.Output<typeof envSchema>;

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
