import { Instructor } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class InstructorEntity implements Instructor {
  @ApiProperty({ required: false, nullable: true })
  instructorId: number | null;
  email: string;
  name: string;
  id: number;
}
