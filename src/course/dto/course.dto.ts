import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime/library';

export class CourseDto {
  @ApiProperty({ example: 5 })
  id: number;

  @ApiProperty({ example: 'testTitle' })
  title: string;

  @ApiProperty({ example: 'testDesc' })
  desc: string;

  @ApiProperty({ example: 2.5 })
  duration: Decimal;
}