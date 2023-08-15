import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const course = await prisma.course.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'test Title',
      desc: 'Test description',
      duration: 6.8,
    },
  });
}
