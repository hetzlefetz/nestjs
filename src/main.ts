import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { extraModels } from '../prisma/generated/dtos';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Demo API')
    .setDescription('A Demo API with CRUD functionality')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: extraModels,
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
