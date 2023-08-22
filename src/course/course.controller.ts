import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Course } from '@prisma/client';
import { ApiBaseResponse } from '../shared/decorators/api-base-response.decorator';
import { Response } from '../shared/responses/base.response';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseModel } from './model/course.model';

@Controller('course')
@ApiTags('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {
  }

  @Get('/')
  async getCourses() {
    return this.courseService.getCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string): Promise<CourseModel> {
    return this.courseService.course({ id: Number(id) });
  }

  @Get('beginner-courses/:isBeginner')
  async getBeginnerCourses(): Promise<Course[]> {
    const startTime = Date.now();

    const res = await this.courseService.getFilteredCourses({
      where: { beginner: true }
    });
    const msElapsed = Date.now() - startTime;
    console.log(`Async function took ${msElapsed / 1000} seconds to complete.`);

    return res;
  }

  @Get('filtered-courses/:searchString')
  async getFilteredCourses(
    @Param('searchString') searchString: string
  ): Promise<Course[]> {
    return this.courseService.getFilteredCourses({
      where: {
        OR: [
          {
            title: { contains: searchString }
          },
          {
            desc: { contains: searchString }
          }
        ]
      }
    });
  }

  @ApiBaseResponse(CourseModel, {
    statusCode: 201,
    description: 'Create Course'
  })
  @Post('/')
  async createCourse(
    @Body() body: CreateCourseDto
  ): Promise<Response<Course, CourseModel>> {
    const course = await this.courseService.createCourse(body);
    return new Response<Course, CourseModel>(course, CourseModel);
  }

  @ApiBaseResponse(CourseModel, {
    description: 'Update course info',
    statusCode: 200
  })
  @Patch('/:id')
  @ApiExtraModels(CourseModel, Response)
  async updateCourse(
    @Body() body: UpdateCourseDto,
    @Param('id') id: number
  ): Promise<Response<Course, CourseModel>> {
    const update = await this.courseService.updateCourse(body, Number(id));
    return new Response<Course, CourseModel>(update, CourseModel);
  }

  @Delete('course/:id')
  async deleteCourse(@Param('id') id: string): Promise<Course> {
    return this.courseService.deleteCourse({ id: Number(id) });
  }
}
