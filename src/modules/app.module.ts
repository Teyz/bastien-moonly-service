import { Module } from '@nestjs/common';
import { CryptosController } from 'src/controller/cryptos/cryptos.controller';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';

@Module({
  imports: [],
  controllers: [AppController, CryptosController],
  providers: [AppService],
})
export class AppModule {}
