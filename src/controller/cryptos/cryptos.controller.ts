import { Controller, Get, Param, Post, Req } from '@nestjs/common';
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

  @Get(':cryptoName')
  getCrypto(@Param() params) {
    return this.cryptoService.findByName(params.cryptoName);
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
