import { IsString } from 'class-validator';

export class CreateUserAlerteDto {
  @IsString()
  userId: string;

  @IsString()
  cryptoId: string;

  @IsString()
  upper_price: string;

  @IsString()
  lower_price: string;
}
