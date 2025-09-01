import { RolesGuard } from './roles.guard';

describe('RolesGuard', () => {
  it('should be defined', () => {
    const mockReflector = { get: jest.fn() } as any;
    expect(new RolesGuard(mockReflector)).toBeDefined();
  });
});
