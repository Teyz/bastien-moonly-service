import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { configService } from '../config/config.service';
import { CryptoModule } from './cryptos/cryptos.module';
import { User } from 'src/model/entities/user.entity';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserAlerteModule } from 'src/user-alerte/user-alerte.module';
import { ScheduleModule } from '@nestjs/schedule';

const entities = [User];

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CryptoModule,
    UserAlerteModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
