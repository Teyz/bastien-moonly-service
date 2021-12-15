import { CryptosService } from 'src/services/cryptos/cryptos.service';
import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from 'src/model/entities/crypto.entity';
import { UsersService } from 'src/services/users/users.service';
import { AlgoliaModule } from 'nestjs-algoliasearch-2';
import { UsersController } from '../../controller/users/users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Crypto]),
    HttpModule,
    AlgoliaModule.register({
      applicationId: 'AV1XZGONJ6',
      apiKey: '2ee4592b78fc32e704d9044fc55f9807',
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, CryptosService],
  exports: [UsersService],
})
export class UsersModule {}
