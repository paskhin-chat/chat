import { appConfig } from 'shared/config';

describe('Config', () => {
  it('should be test mode', () => {
    expect(appConfig.mode).toBe('test');
    expect(appConfig.test).toBe(true);
    expect(appConfig.dev).toBe(false);
    expect(appConfig.prod).toBe(false);
  });

  it('should get urls', () => {
    expect(typeof appConfig.apiUri).toBe('string');
    expect(typeof appConfig.apiWsUri).toBe('string');
  });
});
