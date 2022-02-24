import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';
import { Crypto } from '../entities/crypto.entity';

type Percentage = {
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
};

type CryptoPastPrice = {
  price: number;
  date: Date;
};

export class CryptoDTO implements Readonly<CryptoDTO> {
  @ApiProperty()
  @IsNumber()
  cmc_rank: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  icon_url: string;

  @ApiProperty()
  @IsString()
  symbol: string;

  @ApiProperty()
  @IsBoolean()
  isIncrease: boolean;

  @ApiProperty()
  @IsString()
  percentage: string;

  @ApiProperty()
  @IsArray()
  past_price: CryptoPastPrice[];

  @ApiProperty()
  @IsNumber()
  current_price: number;

  @ApiProperty()
  percentages: Percentage;

  public static from(dto: Partial<CryptoDTO>) {
    const it = new CryptoDTO();
    it.cmc_rank = dto.cmc_rank;
    it.name = dto.name;
    it.icon_url = dto.icon_url;
    it.isIncrease = dto.isIncrease;
    it.past_price = dto.past_price;
    it.current_price = dto.current_price;
    it.symbol = dto.symbol;
    it.percentage = dto.percentage;
    it.percentages = dto.percentages;
    return it;
  }

  public static fromEntity(entity: Crypto) {
    return this.from({
      cmc_rank: entity.cmc_rank,
      name: entity.name,
      icon_url: entity.icon_url,
      isIncrease: entity.isIncrease,
      percentage: entity.percentage,
      percentages: entity.percentages,
      symbol: entity.symbol,
      past_price: entity.past_price,
      current_price: entity.current_price,
    });
  }

  public toEntity() {
    const it = new Crypto();
    it.cmc_rank = this.cmc_rank;
    it.name = this.name;
    it.icon_url = this.icon_url;
    it.isIncrease = this.isIncrease;
    it.current_price = this.current_price;
    it.past_price = this.past_price;
    it.percentage = this.percentage;
    it.percentages = this.percentages;
    it.symbol = this.symbol;
    return it;
  }
}
