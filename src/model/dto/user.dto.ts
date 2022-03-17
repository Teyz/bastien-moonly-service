import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class UserDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;
}
export class UpdateProfileDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
