import * as d from 'doubter';
import * as dotenv from 'dotenv';
import * as process from 'node:process';
import * as fs from 'node:fs';
import * as path from 'node:path';

interface IOptions {
  corePath?: string;
  defaultsPathsMap?: Record<
    string | 'test' | 'development' | 'production',
    string
  >;
  processEnvKey?: string;
}

/**
 * Loads .env.
 */
export function loadEnv(schema: d.AnyShape, opt?: IOptions): void {
  const currentEnvironment = process.env[opt?.processEnvKey || 'NODE_ENV'];

  if (!currentEnvironment) {
    throw new Error(
      'For loading the actual .env defaults file, there is necessary environment in process.env',
    );
  }

  const coreEnvFilePath = opt?.corePath || path.resolve(process.cwd(), '.env');
  const defaultsEnvFilePath =
    opt?.defaultsPathsMap?.[currentEnvironment] ||
    path.resolve(process.cwd(), `.env.${currentEnvironment}.defaults`);

  const coreEnvFileBuffer = loadFile(coreEnvFilePath);
  const defaultsEnvFileBuffer = loadFile(defaultsEnvFilePath);

  if (!coreEnvFileBuffer && !defaultsEnvFileBuffer) {
    throw new Error(
      'There are necessary either the core (.env) file or defaults (.env.[environment].defaults) file',
    );
  }

  const loadedEnvVariables = Object.assign(
    dotenv.parse(defaultsEnvFileBuffer || ''),
    dotenv.parse(coreEnvFileBuffer || ''),
  );

  const parsedEnvVariablesResult = schema.try(loadedEnvVariables);

  if (!parsedEnvVariablesResult.ok) {
    throw new Error(
      `Validation errors: ${parsedEnvVariablesResult.issues
        .map((value) => JSON.stringify(value, null, 2))
        .join('\n')}`,
    );
  }

  Object.assign(process.env, parsedEnvVariablesResult.value);
}

function loadFile(filePath: string): Buffer | undefined {
  try {
    return fs.readFileSync(filePath);
  } catch {
    return undefined;
  }
}
