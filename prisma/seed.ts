import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const name = 'Default Project';
  const apiKey = `sk_${randomUUID().replace(/-/g, '')}`;

  const project = await prisma.project.upsert({
    where: { apiKey },
    update: {},
    create: {
      name,
      apiKey,
    },
  });

  console.log('-----------------------------------');
  console.log('Project Created Successfully!');
  console.log('Name:', project.name);
  console.log('API Key:', project.apiKey);
  console.log('-----------------------------------');
  console.log('Keep this API Key secret. Use it in the x-api-key header.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
