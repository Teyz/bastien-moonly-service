import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServiceAccount } from 'firebase-admin';
import * as admin from 'firebase-admin';
import { AppModule } from './modules/app.module';
import { configService } from './config/config.service';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: '*',
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

  const configServices: ConfigService = app.get(ConfigService);

  const adminConfig: ServiceAccount = {
    projectId: configServices.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configServices
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configServices.get<string>('FIREBASE_CLIENT_EMAIL'),
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: 'https://xxxxx.firebaseio.com',
  });

  await app.listen(3000);
}
bootstrap();
