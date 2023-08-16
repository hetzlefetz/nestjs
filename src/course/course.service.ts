import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course, Prisma } from "@prisma/client";
import { CourseDto } from './dto/course.dto';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}
/*

  create(createCourseDto: CreateCourseDto) {
    return this.prisma.course.create({ data: createCourseDto });
  }

  findOne(id: number) {
    return this.prisma.course.findUnique({ where: { id } });
  }

  findAll() {
    return this.prisma.course.findMany();
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({ where: { id }, data: updateCourseDto });
  }

  remove(id: number) {
    return this.prisma.course.delete({ where: { id } });
  }
*/

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

  async createCourse(data: Prisma.CourseCreateInput): Promise<CourseDto> {
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
