import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors.option';

async function bootstrap() {
 
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  await app.listen(3000);
}
bootstrap();
