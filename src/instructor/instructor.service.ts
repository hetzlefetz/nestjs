import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { UpdateInstructorDto } from './dto/update-instructor.dto';
import { InstructorDto } from '../../prisma/generated/dtos';
import { Instructor, Prisma } from '@prisma/client';

@Injectable()
export class InstructorService {
  constructor(private prisma: PrismaService) {}

  async getInstructors() {
    return this.prisma.instructor.findMany();
  }

  async instructor(id): Promise<InstructorDto> {
    return this.prisma.instructor.findUnique({
      where: { id },
    });
  }

  async getFilteredInstructors(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.InstructorWhereUniqueInput;
    where?: Prisma.InstructorWhereInput;
    orderBy?: Prisma.InstructorOrderByWithRelationInput;
  }): Promise<Instructor[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.instructor.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createInstructor(
    data: Prisma.InstructorCreateInput,
  ): Promise<CreateInstructorDto> {
    return this.prisma.instructor.create({
      data,
    });
  }

  async updateInstructor(
    data: UpdateInstructorDto,
    id,
  ): Promise<InstructorDto> {
    const {} = data;
    return this.prisma.instructor.update({
      where: { id },
      data,
    });
  }

  async deleteInstructor(
    where: Prisma.InstructorWhereUniqueInput,
  ): Promise<Instructor> {
    return this.prisma.instructor.delete({
      where,
    });
  }
}