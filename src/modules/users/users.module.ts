import { CryptosService } from 'src/services/cryptos/cryptos.service';
import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from 'src/model/entities/crypto.entity';
import { UsersService } from 'src/services/users/users.service';

import { UsersController } from '../../controller/users/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Crypto]), HttpModule],
  controllers: [UsersController],
  providers: [UsersService, CryptosService],
  exports: [UsersService],
})
export class UsersModule {}
