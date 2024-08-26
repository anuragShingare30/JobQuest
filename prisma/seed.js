const { PrismaClient } = require('@prisma/client');
const data = require('../public/mockdata.json');
const prisma = new PrismaClient();

async function main() {
  const clerkId = 'user_2kV17tAfTbi3qD04maLj3TyejUZ';
  const jobs = data.map((job) => {
    return {
      ...job,
      clerkId,
    };
  });
  for (const job of jobs) {
    await prisma.jobs.create({
      data: job,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });