import { Test, TestingModule } from '@nestjs/testing';
import { HttpTriggerController } from './http-trigger.controller';

describe('HttpTriggerController', () => {
  let controller: HttpTriggerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HttpTriggerController],
    }).compile();

    controller = module.get<HttpTriggerController>(HttpTriggerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
