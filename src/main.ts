import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipes
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Configure Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Cloudinary Gateway Service')
    .setDescription('Centralized image management gateway for multi-project environments')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'x-api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  const port = process.env.PORT || 3000;

  // Listen on 0.0.0.0 to allow access from outside the container
  await app.listen(port, '0.0.0.0');

  console.log('--------------------------------------------------');
  console.log(`Swagger UI: http://localhost:${port}/`);
  console.log('--------------------------------------------------');
}
bootstrap();
