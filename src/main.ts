import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsOptions } from './config/cors.option';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './config/app.config';

async function bootstrap() {
 
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle("Star-wars")
    .setDescription("Há muito tempo em uma galáxia muito distante.")
    .setVersion('Episodio I.')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .addTag("User")
    .addTag("Auth")
    .addTag("Planet")
    .addTag("Galaxy")
    .addTag("System")
    .addTag("Planet")
    .build()
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/document', app, document)
  appConfig(app)
  await app.listen(3000);
}
bootstrap();
