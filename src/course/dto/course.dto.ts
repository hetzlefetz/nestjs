import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsDate,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { VideoDto, InstructorDto } from '../../../prisma/generated/dtos';

export class CourseDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  desc: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsBoolean()
  beginner: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  videos?: VideoDto[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  instructorId?: number;
}
