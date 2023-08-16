import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CourseDto } from './';

export class InstructorDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ required: true, type: () => CourseDto })
  @IsOptional()
  courses?: CourseDto[];
}
