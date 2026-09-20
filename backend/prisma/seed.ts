import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@whyschool.co';
  const adminPass = process.env.ADMIN_PASSWORD || 'Admin@WhySchool2026';

  const passwordHash = await bcrypt.hash(adminPass, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
    },
    create: {
      email: adminEmail,
      name: 'Super Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  });

  console.log('✅ Super Admin account initialized in Supabase PostgreSQL:', admin.email);
}

main()
  .catch((e) => {
    console.error('Error seeding DB:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
