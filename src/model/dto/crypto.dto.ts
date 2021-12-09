import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, } from 'class-validator';
import { Crypto } from '../entities/crypto.entity';

export class CryptoDTO implements Readonly<CryptoDTO> {
  @ApiProperty({ required: true })
  @IsUUID()
  id: string;


  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  description: string;

  public static from(dto: Partial<CryptoDTO>) {
    const it = new CryptoDTO();
    it.id = dto.id;
    it.name = dto.name;
    it.description = dto.description;
    return it;
  }

  public static fromEntity(entity: Crypto) {
    return this.from({
      id: entity.id,
      name: entity.name,
      description: entity.description
    });
  }

//   public toEntity(user: User = null) {
//     const it = new Item();
//     it.id = this.id;
//     it.name = this.name;
//     it.description = this.description;
//     it.createDateTime = new Date();
//     it.createdBy = user ? user.id : null;
//     it.lastChangedBy = user ? user.id : null;
//     return it;
//   }
}