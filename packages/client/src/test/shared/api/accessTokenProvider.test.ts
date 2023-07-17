import {
  ACCESS_TOKEN_NAME,
  accessTokenProvider,
} from 'shared/api/accessTokenProvider';

describe('Access token provider', () => {
  it('should save the access token', () => {
    accessTokenProvider.set('access_token');

    expect(typeof localStorage.getItem(ACCESS_TOKEN_NAME)).toBe('string');
    expect(accessTokenProvider.get()).toBe('access_token');
  });

  it('should delete the access token', () => {
    accessTokenProvider.set('access_token');

    expect(typeof localStorage.getItem(ACCESS_TOKEN_NAME)).toBe('string');
    expect(accessTokenProvider.get()).toBe('access_token');

    accessTokenProvider.delete();

    expect(localStorage.getItem(ACCESS_TOKEN_NAME)).toBe(null);
    expect(accessTokenProvider.get()).toBe(undefined);
  });
});
