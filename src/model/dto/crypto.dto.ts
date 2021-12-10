import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import { Crypto } from '../entities/crypto.entity';

export class CryptoDTO implements Readonly<CryptoDTO> {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  iconUrl: string;

  @ApiProperty()
  @IsString()
  symbol: string;

  @ApiProperty()
  @IsBoolean()
  isIncrease: boolean;

  @ApiProperty()
  @IsNumber()
  percentage: number;

  @ApiProperty()
  @IsArray()
  past_price: number[];

  @ApiProperty()
  @IsNumber()
  current_price: number;

  public static from(dto: Partial<CryptoDTO>) {
    const it = new CryptoDTO();
    it.name = dto.name;
    it.iconUrl = dto.iconUrl;
    it.isIncrease = dto.isIncrease;
    it.past_price = dto.past_price;
    it.current_price = dto.current_price;
    it.symbol = dto.symbol;
    it.percentage = dto.percentage;
    return it;
  }

  public static fromEntity(entity: Crypto) {
    return this.from({
      name: entity.name,
      isIncrease: entity.isIncrease,
      percentage: entity.percentage,
      symbol: entity.symbol,
      past_price: entity.past_price,
      current_price: entity.current_price,
      iconUrl: entity.iconUrl,
    });
  }

  public toEntity() {
    const it = new Crypto();
    it.name = this.name;
    it.iconUrl = this.iconUrl;
    it.isIncrease = this.isIncrease;
    it.current_price = this.current_price;
    it.past_price = this.past_price;
    it.percentage = this.percentage;
    it.symbol = this.symbol;
    return it;
  }
}
