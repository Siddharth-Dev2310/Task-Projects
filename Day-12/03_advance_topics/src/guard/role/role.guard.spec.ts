import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  it('should be defined', () => {
    const mockReflector = { get: jest.fn() } as any;
    expect(new RoleGuard(mockReflector)).toBeDefined();
  });
});
