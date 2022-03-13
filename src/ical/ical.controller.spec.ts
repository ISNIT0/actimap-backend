import { Test, TestingModule } from '@nestjs/testing';
import { IcalController } from './ical.controller';

describe('IcalController', () => {
  let controller: IcalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IcalController],
    }).compile();

    controller = module.get<IcalController>(IcalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
