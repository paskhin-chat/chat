import { config } from '../../../main/shared';

describe('Config', () => {
  it('should be test mode', () => {
    expect(config.mode).toBe('test');
    expect(config.test).toBe(true);
    expect(config.dev).toBe(false);
    expect(config.prod).toBe(false);
  });

  it('should get urls', () => {
    expect(typeof config.apiGqlUri).toBe('string');
    expect(typeof config.apiWsGqlUri).toBe('string');
  });
});
