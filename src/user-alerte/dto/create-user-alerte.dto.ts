import { IsNumber, IsString } from 'class-validator';

export class CreateUserAlerteDto {
  @IsString()
  userId: string;

  @IsString()
  cryptoId: string;

  @IsNumber()
  upper_price: number;

  @IsNumber()
  lower_price: number;
}
