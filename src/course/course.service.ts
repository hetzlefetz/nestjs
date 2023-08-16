import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, Prisma } from '@prisma/client';
import { CourseDto } from '../../prisma/generated/dtos';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getCourses() {
    return this.prisma.course.findMany();
  }

  async course(id): Promise<CourseDto> {
    return this.prisma.course.findUnique({
      where: { id },
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

  async createCourse(data: Prisma.CourseCreateInput): Promise<CreateCourseDto> {
    return this.prisma.course.create({
      data,
    });
  }

  async updateCourse(data: UpdateCourseDto, id): Promise<CourseDto> {
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
