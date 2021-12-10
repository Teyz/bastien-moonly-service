import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptosService } from 'src/services/cryptos/cryptos.service';
import { CryptosController } from 'src/controller/cryptos/cryptos.controller';
import { Crypto } from 'src/model/entities/crypto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto]), HttpModule],
  providers: [CryptosService],
  controllers: [CryptosController],
  exports: [],
})
export class CryptoModule {}
