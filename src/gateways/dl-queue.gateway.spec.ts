import { Test, TestingModule } from '@nestjs/testing';
import { DlQueueGateway } from './dl-queue.gateway';

describe('DlQueueGateway', () => {
  let gateway: DlQueueGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DlQueueGateway],
    }).compile();

    gateway = module.get<DlQueueGateway>(DlQueueGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
