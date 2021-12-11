import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from 'src/model/dto/auth-login.dto';
import { UserDto } from 'src/model/dto/user.dto';

import { User } from 'src/model/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.validateUser(authLoginDto);

    const payload = {
      userId: user.id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.usersService.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async getUser(userId: number): Promise<UserDto> {
    const user = await this.usersService.findById(userId);

    return user;
  }
}
