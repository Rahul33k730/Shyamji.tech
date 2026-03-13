require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({});

async function main() {
  const username = 'rahuldrrahulyadav@gmail.com';
  const password = 'Rahul986718'; // New admin password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const admin = await prisma.adminUser.upsert({
    where: { username },
    update: {
      password: hashedPassword,
    },
    create: {
      username,
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('Admin user created/updated:', admin.username);

  // Seed initial Hero content
  await prisma.hero.create({
    data: {
      backgroundUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
      backgroundType: 'IMAGE',
      missionTagline: 'Turning Great Ideas Into Reality.',
      floatingTaglines: 'Innovate, Automate, Empower, Transform, Scale',
      cta1Text: 'Explore Services',
      cta1Link: '#services',
      cta2Text: 'Get a Quote',
      cta2Link: '#contact',
    },
  });

  console.log('Initial hero content seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
