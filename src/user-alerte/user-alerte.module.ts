import { Module } from '@nestjs/common';
import { UserAlerteService } from './user-alerte.service';
import { UserAlerteController } from './user-alerte.controller';
import { User } from 'src/model/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crypto } from 'src/model/entities/crypto.entity';
import { CryptoModule } from 'src/modules/cryptos/cryptos.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Crypto]), CryptoModule],
  controllers: [UserAlerteController],
  providers: [UserAlerteService],
})
export class UserAlerteModule {}
