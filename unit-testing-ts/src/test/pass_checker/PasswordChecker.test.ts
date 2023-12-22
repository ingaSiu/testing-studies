import { PasswordChecker, PasswordErrors } from '../../app/pass_checker/PasswordChecker';

// SUT - system under test

describe('Password checker test suite', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('Password with less than 8 characters is invalid ', () => {
    const actual = sut.checkPassword('2352542');

    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.SHORT);
  });

  it('Password with more than 8 characters is OK', () => {
    const actual = sut.checkPassword('12345678Aa');
    expect(actual.reasons).not.toContain(PasswordErrors.SHORT);
  });

  it('Password with no uppercase letter is invalid', () => {
    const actual = sut.checkPassword('12345abcd');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it('Password with uppercase letter is valid', () => {
    const actual = sut.checkPassword('12345Abcd');
    expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
  });

  it('Password without lowercase letter is invalid', () => {
    const actual = sut.checkPassword('12345ABCD');
    expect(actual.valid).toBe(false);
    expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('Password with lowercase letter is valid', () => {
    const actual = sut.checkPassword('12345ABcD');
    expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
  });

  it('Complex password is valid', () => {
    const actual = sut.checkPassword('12345ABcD');
    expect(actual.valid).toBe(true);
    expect(actual.reasons).toHaveLength(0);
  });
});
