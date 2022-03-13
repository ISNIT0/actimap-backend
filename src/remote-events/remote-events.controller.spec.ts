import { Test, TestingModule } from '@nestjs/testing';
import { RemoteEventsController } from './remote-events.controller';

describe('RemoteEventsController', () => {
  let controller: RemoteEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoteEventsController],
    }).compile();

    controller = module.get<RemoteEventsController>(RemoteEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
