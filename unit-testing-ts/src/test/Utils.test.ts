import { toUpperCase } from '../app/Utils';

describe('Utils test suite', () => {
  // example of a proper structure unit test
  it('Should return uppercase of valid string', () => {
    // arrange
    const sut = toUpperCase;
    const expected = 'ABC';

    // act: (result)
    const actual = toUpperCase('abc');

    // assert
    expect(actual).toBe(expected);
  });
});
