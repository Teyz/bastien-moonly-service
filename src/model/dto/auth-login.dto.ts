import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @IsString()
  username: string;

  @IsNotEmpty()
  password: string;
}
