import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  const apiKey = process.env.SEED_PROJECT_API_KEY || 'sk_371f4a919d604435918bd3f95a312297';
  const projectName = 'Initial Project';

  // Check if project already exists using apiKey (which is guaranteed to be unique)
  let project = await prisma.project.findUnique({
    where: { apiKey: apiKey },
  });

  if (!project) {
    project = await prisma.project.create({
      data: {
        name: projectName,
        apiKey: apiKey,
      },
    });
    console.log('New project created.');
  } else {
    console.log('Project already exists, skipping creation.');
  }

  console.log('--------------------------------------------------');
  console.log('Seeding completed successfully!');
  console.log(`Project: ${project.name}`);
  console.log(`API Key: ${project.apiKey}`);
  console.log('--------------------------------------------------');
}

main()
  .catch((e) => {
    console.error('Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
