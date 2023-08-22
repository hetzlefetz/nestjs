import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, Prisma } from '@prisma/client';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    prisma.$on<any>('query', (event: Prisma.QueryEvent) => {
      console.log('Query: ' + event.query);
      console.log('Duration: ' + event.duration + 'ms');
    });
  }

  async getCourses() {
    return this.prisma.course.findMany();
  }

  async course(id): Promise<Course> {
    return this.prisma.course.findUnique({
      where: id,
    });
  }

  async getFilteredCourses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CourseWhereUniqueInput;
    where?: Prisma.CourseWhereInput;
    orderBy?: Prisma.CourseOrderByWithRelationInput;
  }): Promise<Course[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.course.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCourse(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prisma.course.create({
      data
    });
  }

  async updateCourse(data: UpdateCourseDto, id): Promise<Course> {
    const {} = data;
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async deleteCourse(where: Prisma.CourseWhereUniqueInput): Promise<Course> {
    return this.prisma.course.delete({
      where,
    });
  }
}
