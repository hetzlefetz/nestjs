import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

// CJS
const prisma = new PrismaClient();

async function seed() {
  try {
    // Generate and save instructors
    const instructorPromises = [];
    for (let i = 0; i < 100; i++) {
      instructorPromises.push(
        prisma.instructor.create({
          data: {
            name: faker.internet.userName(),
            email: faker.internet.email()
          }
        })
      );
    }
    await Promise.all(instructorPromises);

    // Generate and save courses with associated videos in smaller chunks
    const totalCourses = 10000;
    const chunkSize = 100;

    for (let chunk = 0; chunk < totalCourses / chunkSize; chunk++) {
      const coursesChunk = [];
      for (let i = 0; i < chunkSize; i++) {
        const courseId = chunk * chunkSize + i + 1;
        const instructorId = faker.number.int({ min: 1, max: 100 });
        const courseData = {
          title: faker.lorem.words(3),
          desc: faker.lorem.sentence(),
          duration: faker.number.int({ min: 1, max: 30 }),
          date: faker.date.recent(),
          beginner: faker.datatype.boolean(),
          instructorId,
        };
        coursesChunk.push(courseData);
      }

      await prisma.course.createMany({
        data: coursesChunk,
      });
    }

    // Generate and save videos in smaller chunks and associate them with courses
    const totalVideos = 5000000;
    const videosChunkSize = 500;

    for (let chunk = 0; chunk < totalVideos / videosChunkSize; chunk++) {
      const videosChunk = [];
      for (let i = 0; i < videosChunkSize; i++) {
        const videoData = {
          title: faker.lorem.words(3),
          desc: faker.lorem.sentence(),
          url: faker.internet.url(),
        };
        videosChunk.push(videoData);
      }

      await prisma.video.createMany({
        data: videosChunk,
      });
    }

    console.log('Seed complete.');
  } catch (error) {
    console.error('Error seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
