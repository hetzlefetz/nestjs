import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourseModule } from './course/course.module';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [CourseModule, InstructorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
