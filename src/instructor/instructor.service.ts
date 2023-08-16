import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService) {}

  create(createInstructorDto: CreateInstructorDto) {
    return this.prisma.instructor.create({ data: createInstructorDto });
  }

  findOne(id: number) {
    return this.prisma.instructor.findUnique({ where: { id } });
  }

  findAll() {
    return this.prisma.instructor.findMany();
  }

  update(id: number, updateInstructorDto: UpdateInstructorDto) {
    return this.prisma.instructor.update({
      where: { id },
      data: updateInstructorDto,
    });
  }

  remove(id: number) {
    return this.prisma.instructor.delete({ where: { id } });
  }
}
