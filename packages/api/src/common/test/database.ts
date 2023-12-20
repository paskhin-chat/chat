import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Clears all database tables.
 */
export async function resetDatabase(): Promise<void> {
  const tablenames = await prisma.$queryRaw<
    Array<{
      tablename: string;
    }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tablenames
    .map(({ tablename }) => tablename)
    .filter(name => name !== '_prisma_migrations')
    .map(name => `"public"."${name}"`)
    .join(', ');

  try {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
  }
}
