import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { InstructorModel } from '../../prisma/generated/models';
import { Instructor } from '@prisma/client';
import { ApiBaseResponse } from '../shared/decorators/api-base-response.decorator';
import { Response } from '../shared/responses/base.response';

@Controller('instructor')
@ApiTags('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Get('/')
  async getInstructors() {
    return this.instructorService.getInstructors();
  }

  @Get(':id')
  async getInstructorById(@Param('id') id: string): Promise<InstructorModel> {
    return this.instructorService.instructor({ id: Number(id) });
  }

  // TODO find out how to get instructor that has only beginner courses
  /*  @Get('filtered-instructors/:isBeginner')
  async getBeginnerInstructors(): Promise<Instructor[]> {
    return this.instructorService.getFilteredInstructors({
      where: { beginner: true },
    });
  }*/

  @Get('filtered-instructors/:searchString')
  async getFilteredInstructors(
    @Param('searchString') searchString: string,
  ): Promise<Instructor[]> {
    return this.instructorService.getFilteredInstructors({
      where: {
        OR: [
          {
            name: { contains: searchString },
          },
          {
            email: { contains: searchString },
          },
        ],
      },
    });
  }

  @ApiBaseResponse(InstructorModel, {
    statusCode: 201,
    description: 'Create Instructor',
  })
  @Post('/')
  async createInstructor(
    @Body() body: CreateInstructorDto,
  ): Promise<Response<Instructor, InstructorModel>> {
    const instructor = await this.instructorService.createInstructor(body);
    return new Response<Instructor, InstructorModel>(
      instructor,
      InstructorModel,
    );
  }

  @ApiBaseResponse(InstructorModel, {
    description: 'Update instructor info',
    statusCode: 200,
  })
  @Patch('/:id')
  @ApiExtraModels(InstructorModel, Response)
  async updateInstructor(
    @Body() body: UpdateInstructorDto,
    @Param('id') id: number,
  ): Promise<Response<Instructor, InstructorModel>> {
    const update = await this.instructorService.updateInstructor(
      body,
      Number(id),
    );
    return new Response<Instructor, InstructorModel>(update, InstructorModel);
  }

  @Delete('instructor/:id')
  async deleteInstructor(@Param('id') id: string): Promise<Instructor> {
    return this.instructorService.deleteInstructor({ id: Number(id) });
  }
}
