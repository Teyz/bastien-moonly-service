import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { CryptosService } from 'src/services/cryptos/cryptos.service';

@Controller('cryptos')
export class CryptosController {
  constructor(private cryptoService: CryptosService) {}

  @Get('tags')
  async getAllTags() {
    return await this.cryptoService.getAllTags();
  }

  @Get('filters')
  filterByPrice(@Query() query) {
    return this.cryptoService.filter(query);
  }

  @Get('date')
  getEnableDate(@Query() query) {
    return this.cryptoService.getEnableDate(query.cryptoName);
  }

  @Get()
  public async getAll(@Param() params) {
    return await this.cryptoService.filterByRank(params.orderBy);
  }

  @Post()
  public async initCryptoDB() {
    return await this.cryptoService.initCryptoDB();
  }

  @Get('single/:cryptoName')
  getCrypto(@Param() params) {
    return this.cryptoService.findByName(params.cryptoName);
  }

  @Get('search/:search')
  getSearch(@Param() params, @Req() req) {
    return this.cryptoService.algoliaSearch(params.search);
  }

  @Get('name/:filter')
  filterByName(@Param() params, @Req() req) {
    return this.cryptoService.filterByName(params.filter);
  }

  @Get('percents/:name/:startDate/:endDate')
  getPercentsByDate(@Param() params) {
    return this.cryptoService.getPercentsByDate(
      params.name,
      params.startDate,
      params.endDate,
    );
  }
}
