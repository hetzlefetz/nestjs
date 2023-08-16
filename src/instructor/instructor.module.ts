import { Module } from '@nestjs/common';
import { InstructorController } from './Instructor.controller';
import { InstructorService } from './instructor.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InstructorController],
  providers: [InstructorService],
})
export class InstructorModule {}
