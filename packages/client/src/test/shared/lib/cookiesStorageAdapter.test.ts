import Cookies from 'js-cookie';

import { createCookiesStorageAdapter } from '../../../main/shared';

describe('Cookies storage adapter', () => {
  it('should set and get a value', () => {
    const cookiesStorageAdapter = createCookiesStorageAdapter();

    const simpleValue = 'simple-value';
    const complicatedValue = {
      id: '1234',
      url: 'https://www.google.com/',
      memes: ['big doggo', 'Лаврентий Палыч', 'gachimuchi'],
    };

    cookiesStorageAdapter.set('simple', simpleValue);
    cookiesStorageAdapter.set('complicated', complicatedValue);

    expect(cookiesStorageAdapter.get('simple')).toBe(simpleValue);
    expect(typeof Cookies.get('simple')).toBe('string');

    expect(cookiesStorageAdapter.get('complicated')).toStrictEqual(complicatedValue);
    expect(typeof Cookies.get('complicated')).toBe('string');
  });

  it('should delete a value', () => {
    const cookiesStorageAdapter = createCookiesStorageAdapter();

    cookiesStorageAdapter.set('simple', 'value');

    expect(cookiesStorageAdapter.get('simple')).toBe('value');

    cookiesStorageAdapter.delete('simple');

    expect(cookiesStorageAdapter.get('simple')).toBe(null);
  });
});
