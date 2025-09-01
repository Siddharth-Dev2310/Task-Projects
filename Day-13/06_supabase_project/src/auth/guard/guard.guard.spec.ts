import { GuardGuard } from './guard.guard';
import { ConfigService } from '@nestjs/config';

describe('GuardGuard', () => {
  let guard: GuardGuard;

  beforeEach(() => {
    const configService = new ConfigService();
    guard = new GuardGuard(configService);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});
