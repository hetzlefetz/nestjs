import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Course } from '@prisma/client';
import { CourseDto } from './dto/course.dto';
import { ApiBaseResponse } from '../shared/decorators/api-base-response.decorator';
import { Response } from '../shared/responses/base.response';

@Controller('course')
@ApiTags('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string): Promise<CourseEntity> {
    return this.courseService.course({ id: Number(id) });
  }

  @Get('filtered-courses/:isBeginner')
  async getBeginnerCourses(): Promise<CourseEntity[]> {
    return this.courseService.courses({
      where: { beginner: true }
    });
  }

  @Get('filtered-courses/:searchString')
  async getFilteredCourses(
    @Param('searchString') searchString: string
  ): Promise<CourseEntity[]> {
    return this.courseService.courses({
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

  @ApiBaseResponse(CourseEntity, {
    statusCode: 201,
    description: 'Create Course'
  })
  @Post('/')
  async createCourse(
    @Body() body: CreateCourseDto): Promise<Response<Course, CourseEntity>> {
    const course = await this.courseService.createCourse(body);
    return new Response<Course, CourseEntity>(course, CourseEntity);
  }

  @ApiBaseResponse(CourseEntity, {
    description: 'Update course info',
    statusCode: 201,
  })
  @Patch('/:id')
  async updateCourse(
    @Body() body: UpdateCourseDto,
    @Param('id') id: number
  ): Promise<Response<Course, CourseEntity>> {
    const update = await this.courseService.updateCourse(body, );
    return new Response<Course, CourseEntity>(update, CourseEntity);
  }

  @Delete('course/:id')
  async deleteCourse(@Param('id') id: string): Promise<CourseEntity> {
    return this.courseService.deleteCourse({ id: Number(id) });
  }

  /* old stuff - not async
   @Post()
  @ApiCreatedResponse({ type: CourseEntity })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  @ApiOkResponse({ type: CourseEntity, isArray: true })
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: CourseEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CourseEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto
  ) {
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CourseEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.remove(id);
  }

   */
}