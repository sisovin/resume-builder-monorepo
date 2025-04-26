import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await argon2.hash('password123');

  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      password: passwordHash,
      resumes: {
        create: [
          {
            title: 'Software Engineer',
            content: 'Experienced software engineer with a focus on backend development.',
          },
          {
            title: 'Frontend Developer',
            content: 'Skilled frontend developer with expertise in React and TypeScript.',
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
