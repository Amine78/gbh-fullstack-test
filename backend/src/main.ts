import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  app.enableCors({
    origin:'http://localhost:3000',
    methods:'GET,HEAD',
    credentials: true,
    allowedHeaders: 'Content-Type',
  });

  await app.listen(process.env.PORT ?? 3500);
}
bootstrap();
