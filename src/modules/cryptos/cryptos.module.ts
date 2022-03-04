import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptosService } from 'src/services/cryptos/cryptos.service';
import { CryptosController } from 'src/controller/cryptos/cryptos.controller';
import { Crypto } from 'src/model/entities/crypto.entity';
import { AlgoliaModule } from 'nestjs-algolia';

@Module({
  imports: [
    TypeOrmModule.forFeature([Crypto]),
    HttpModule,
    AlgoliaModule.registerAsync({
      useFactory: () => ({
        applicationId: 'AV1XZGONJ6',
        apiKey: '2ee4592b78fc32e704d9044fc55f9807',
      }),
    }),
  ],
  providers: [CryptosService],
  controllers: [CryptosController],
  exports: [],
})
export class CryptoModule {}
