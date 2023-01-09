import { Test, TestingModule } from '@nestjs/testing';
import { HttpTriggerService } from './http-trigger.service';

describe('HttpTriggerService', () => {
  let service: HttpTriggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpTriggerService],
    }).compile();

    service = module.get<HttpTriggerService>(HttpTriggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
