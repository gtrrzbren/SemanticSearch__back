/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Buscador de Prensa Cubana')
    .setDescription('API para buscar noticias en la prensa cubana')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);

  console.log("    🚀 App running at http://localhost:3000");
  console.log("    📖 Docs running at http://localhost:3000/api");
  
}
bootstrap();