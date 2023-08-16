import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  desc: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  duration: number;

  @IsNumber()
  @ApiProperty()
  instructorId: number;

  @IsBoolean()
  @ApiProperty()
  @IsNotEmpty()
  beginner;
}
