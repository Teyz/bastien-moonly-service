import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { configService } from '../config/config.service';
import { CryptoModule } from './cryptos/cryptos.module';

@Module({
  imports: [CryptoModule,TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
