import { Module } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';

import { UsersController } from '../../controller/users/users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
