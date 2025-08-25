import { Test, TestingModule } from '@nestjs/testing';
import { EmploeyeeController } from './emploeyee.controller';

describe('EmploeyeeController', () => {
  let controller: EmploeyeeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmploeyeeController],
    }).compile();

    controller = module.get<EmploeyeeController>(EmploeyeeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
