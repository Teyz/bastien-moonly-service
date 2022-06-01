import { Test, TestingModule } from '@nestjs/testing';
import { UserAlerteController } from './user-alerte.controller';
import { UserAlerteService } from './user-alerte.service';

describe('UserAlerteController', () => {
  let controller: UserAlerteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAlerteController],
      providers: [UserAlerteService],
    }).compile();

    controller = module.get<UserAlerteController>(UserAlerteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
