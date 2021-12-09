import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptosController } from 'src/controller/cryptos/cryptos.controller';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { configService } from '../config/config.service';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
  controllers: [AppController, CryptosController],
  providers: [AppService],
})
export class AppModule {}
