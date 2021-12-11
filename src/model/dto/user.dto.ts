import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;
}
