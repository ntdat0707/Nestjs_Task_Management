import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('User Logged');
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || serverConfig.port;

  //setting swagger 
  const options = new DocumentBuilder()
    .setTitle('Task Management Example')
    .setDescription('The Task Management API description')
    .setVersion('1.0')
    // .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
