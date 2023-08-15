import { Course } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CourseEntity implements Course {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  desc: string | null;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  beginner: boolean;

  @ApiProperty()
  date: Date;

  @ApiProperty({ required: false, nullable: true })
  instructorId: number | null;
}
