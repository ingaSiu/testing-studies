import { PasswordChecker } from '../../app/pass_checker/PasswordChecker';

describe('Password checker test suite', () => {
  let sut: PasswordChecker;

  beforeEach(() => {
    sut = new PasswordChecker();
  });

  it('Should do nothing', () => {
    sut.checkPassword();
  });
});
