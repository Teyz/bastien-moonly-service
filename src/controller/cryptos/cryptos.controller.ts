import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
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
  public async initCryptoDB() {
    return await this.cryptoService.initCryptoDB();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  addBookmarkedCrypto(@Param() params, @Req() req) {
    return this.cryptoService.addBookmarkedCrypto(params.id);
  }
}
