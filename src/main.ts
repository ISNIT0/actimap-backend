import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import logger from 'morgan';

const PORT = process.env.PORT || 3008;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger());
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
