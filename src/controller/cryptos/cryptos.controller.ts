import { Controller, Get, Post } from '@nestjs/common';
import { CryptoDTO } from 'src/model/dto/crypto.dto';
import { CryptosService } from 'src/services/cryptos/cryptos.service';

@Controller('cryptos')
export class CryptosController {
  constructor(private cryptoService: CryptosService) {}

  @Get()
  public async getAll(): Promise<CryptoDTO[]> {
    return await this.cryptoService.getAll();
  }

  @Post()
  async initCryptoDB() {
    return await this.cryptoService.initCryptoDB();
  }
}
