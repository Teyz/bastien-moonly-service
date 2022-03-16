import { Test, TestingModule } from '@nestjs/testing';
import { CryptosService } from '../cryptos.service';

describe('CryptosService', () => {
  let service: CryptosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptosService],
    }).compile();

    service = module.get<CryptosService>(CryptosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
