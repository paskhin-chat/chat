import { localStorageAdapter } from 'shared/lib/localStorageAdapter';

describe('Localstorage adapter', () => {
  it('should set and get a value', () => {
    const simpleValue = 'simple-value';
    const complicatedValue = {
      id: '1234',
      url: 'https://www.google.com/',
      memes: ['big doggo', 'Лаврентий Палыч', 'gachimuchi'],
    };

    localStorageAdapter.set('simple', simpleValue);
    localStorageAdapter.set('complicated', complicatedValue);

    expect(localStorageAdapter.get('simple')).toBe(simpleValue);
    expect(typeof localStorage.getItem('simple')).toBe('string');

    expect(localStorageAdapter.get('complicated')).toStrictEqual(
      complicatedValue,
    );
    expect(typeof localStorage.getItem('complicated')).toBe('string');
  });

  it('should delete a value', () => {
    localStorageAdapter.set('simple', 'value');

    expect(localStorageAdapter.get('simple')).toBe('value');

    localStorageAdapter.delete('simple');

    expect(localStorageAdapter.get('simple')).toBe(undefined);
  });
});
