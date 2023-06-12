import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function seed(): Promise<void> {
  await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.room.create({
        data: {
          name: faker.color.human(),
          creationDate: faker.date.past(),
          members: {
            create: Array.from({
              length: 2,
            }).map<Prisma.MemberCreateWithoutRoomInput>(() => {
              const firstName = faker.person.firstName();
              const lastName = faker.person.lastName();

              return {
                joinDate: faker.date.past(),
                user: {
                  create: {
                    /**
                     * TODO: have to be solved in
                     * {@link https://github.com/dPaskhin/chat/issues/17}.
                     */
                    login: faker.string.uuid(),
                    password: faker.internet.password(),
                    email: faker.internet.email({ lastName, firstName }),
                    lastName,
                    firstName,
                    dob: faker.date.birthdate(),
                    registrationDate: faker.date.past(),
                  },
                },
              };
            }),
          },
        },
      }),
    ),
  );
}

(async () => {
  try {
    await prisma.$connect();

    await seed();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    await prisma.$disconnect();
  }
})();
