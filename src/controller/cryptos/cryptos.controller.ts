import { Controller, Get } from '@nestjs/common';
import { CryptosService } from 'src/services/cryptos/cryptos.service';

@Controller('cryptos')
export class CryptosController {
  constructor(private serv: CryptosService) { }

  @Get()
  public async getAll() {
    return await this.serv.getAll();
  }
}
