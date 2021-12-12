import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/model/dto/user.dto';
import { User } from 'src/model/entities/user.entity';

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const user = User.create(createUserDto);
    await user.save();

    delete user.password;
    return user;
  }

  async showById(id: number): Promise<User> {
    const user = await this.findById(id);

    delete user.id;
    delete user.password;
    delete user.updatedAt;
    return user;
  }

  async findById(id: number) {
    return await User.findOne(id);
  }

  async findByEmail(email: string) {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }

  async saveorupdateRefreshToke(
    refreshToken: string,
    id: string,
    refreshtokenexpires,
  ) {
    await User.update(id, {
      refreshtoken: refreshToken,
      refreshtokenexpires,
    });
  }
}
