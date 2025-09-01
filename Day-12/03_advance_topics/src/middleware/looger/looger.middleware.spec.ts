import { LoogerMiddleware } from './looger.middleware';

describe('LoogerMiddleware', () => {
  it('should be defined', () => {
    expect(new LoogerMiddleware()).toBeDefined();
  });
});
