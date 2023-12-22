import { PasswordChecker } from '../../app/pass_checker/PasswordChecker';

// SUT - system under test

describe('Password checker test suite', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('Password with less than 8 characters is invalid ', () => {
    const actual = sut.checkPassword('2352542');
    expect(actual).toBe(false);
  });

  it('Password with more than 8 characters is OK', () => {
    const actual = sut.checkPassword('12345678Aa');
    expect(actual).toBe(true);
  });

  it('Password with no uppercase letter is invalid', () => {
    const actual = sut.checkPassword('12345abcd');
    expect(actual).toBe(false);
  });

  it('Password with uppercase letter is valid', () => {
    const actual = sut.checkPassword('12345Abcd');
    expect(actual).toBe(true);
  });

  it('Password without lowercase letter is invalid', () => {
    const actual = sut.checkPassword('12345ABCD');
    expect(actual).toBe(false);
  });

  it('Password with lowercase letter is valid', () => {
    const actual = sut.checkPassword('12345ABcD');
    expect(actual).toBe(true);
  });
});
