import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './config/config.service';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',

    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  if (!configService.isProduction()) {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Moonly Service')
        .setDescription('Moonly service API')
        .build(),
    );

    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(3000);
}
bootstrap();
