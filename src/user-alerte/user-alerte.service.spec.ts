import { Test, TestingModule } from '@nestjs/testing';
import { UserAlerteService } from './user-alerte.service';

describe('UserAlerteService', () => {
  let service: UserAlerteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAlerteService],
    }).compile();

    service = module.get<UserAlerteService>(UserAlerteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
