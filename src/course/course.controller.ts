import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseEntity } from './entities/course.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('course')
@ApiTags('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

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
    @Body() updateUserDto: UpdateCourseDto,
  ) {
    return this.courseService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CourseEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.remove(id);
  }


  /*
   @Get('course/:id')
   async getCourseById(@Param('id') id: string): Promise<CourseModel> {
     return this.courseService.course({ id: Number(id) });
   }

   @Get('courses-beginner')
   async getBeginnerCourses(): Promise<CourseModel[]> {
     return this.courseService.courses({
       where: { beginner: true },
     });
   }

   @Get('filtered-courses/:searchString')
   async getFilteredCourses(
     @Param('searchString') searchString: string,
   ): Promise<CourseModel[]> {
     return this.courseService.courses({
       where: {
         OR: [
           {
             title: { contains: searchString },
           },
           {
             desc: { contains: searchString },
           },
         ],
       },
     });
   }



   @Delete('course/:id')
   async deleteCourse(@Param('id') id: string): Promise<CourseModel> {
     return this.courseService.deleteCourse({ id: Number(id) });
   }*/
}