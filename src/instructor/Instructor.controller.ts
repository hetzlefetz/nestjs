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
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InstructorEntity } from './entities/instructor.entity';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('instructor')
@ApiTags('instructor')
export class InstructorController {
  constructor(private readonly instructorService: InstructorService) {}

  @Post()
  @ApiCreatedResponse({ type: InstructorEntity })
  create(@Body() createInstructorDto: CreateInstructorDto) {
    return this.instructorService.create(createInstructorDto);
  }

  @Get()
  @ApiOkResponse({ type: InstructorEntity, isArray: true })
  findAll() {
    return this.instructorService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: InstructorEntity })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.instructorService.findOne(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: InstructorEntity })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateInstructorDto,
  ) {
    return this.instructorService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: InstructorEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.instructorService.remove(id);
  }
}
