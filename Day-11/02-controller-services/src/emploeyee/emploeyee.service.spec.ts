import { Test, TestingModule } from '@nestjs/testing';
import { EmploeyeeService } from './emploeyee.service';

describe('EmploeyeeService', () => {
  let service: EmploeyeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmploeyeeService],
    }).compile();

    service = module.get<EmploeyeeService>(EmploeyeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
