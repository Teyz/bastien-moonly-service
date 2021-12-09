import { Controller, Get } from '@nestjs/common';

@Controller('cryptos')
export class CryptosController {
  @Get()
  findAll(): string {
    return 'This action returns all cryptos';
  }
}
