import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '../controller/app.controller';
import { AppService } from '../services/app.service';
import { configService } from '../config/config.service';
import { CryptoModule } from './cryptos/cryptos.module';
import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';

const entities = [User];

@Module({
  imports: [
    AuthModule,
    UsersModule,
    CryptoModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
