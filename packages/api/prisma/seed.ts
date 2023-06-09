import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const client = new PrismaClient();

async function seed(): Promise<void> {
  const users = Array.from({ length: 20 }).map<Prisma.UserCreateManyInput>(
    () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      return {
        firstName,
        lastName,
        dob: faker.date.birthdate(),
        password: faker.internet.password(),
        login: faker.internet.userName({ firstName, lastName }),
      };
    },
  );

  await client.user.createMany({
    data: users,
  });
}

(async () => {
  try {
    await client.$connect();

    await seed();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    await client.$disconnect();
  }
})();
