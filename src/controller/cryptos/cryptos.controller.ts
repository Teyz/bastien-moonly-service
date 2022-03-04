import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { CryptoDTO } from 'src/model/dto/crypto.dto';
import { CryptosService } from 'src/services/cryptos/cryptos.service';

@Controller('cryptos')
export class CryptosController {
  constructor(private cryptoService: CryptosService) {}

  @Get()
  public async getAll() {
    return await this.cryptoService.filterByRank();
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

  @Get('search/:search')
  getSearch(@Param() params, @Req() req) {
    return this.cryptoService.algoliaSearch(params.search);
  }

  @Get('price/:filter')
  filterByPrice(@Param() params, @Req() req) {
    return this.cryptoService.filterByPrice(params.filter);
  }

  @Get('name/:filter')
  filterByName(@Param() params, @Req() req) {
    return this.cryptoService.filterByName(params.filter);
  }
}
