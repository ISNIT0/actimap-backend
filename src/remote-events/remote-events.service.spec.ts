import { Test, TestingModule } from '@nestjs/testing';
import { RemoteEventsService } from './remote-events.service';

describe('RemoteEventsService', () => {
  let service: RemoteEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RemoteEventsService],
    }).compile();

    service = module.get<RemoteEventsService>(RemoteEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
