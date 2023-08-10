import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaClient, User } from '@prisma/client'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  async getUsers(): Promise<User[]> {
    const prisma = new PrismaClient();
    return await prisma.user.findMany();

  }
}
