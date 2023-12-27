import { StringUtils, getStringInfo, toUpperCase } from '../app/Utils';

describe('Utils test suite', () => {
  describe('StringUtils tests', () => {
    let sut: StringUtils;

    // at every test we initialize a new class to make sure that every test is independent
    // beforeEach, afterEach are Jest hooks
    // afterEach hook is mostly used for clearing mocks
    beforeEach(() => {
      sut = new StringUtils();
      console.log('Setup');
    });

    afterEach(() => {
      console.log('Teardown');
    });

    it('Should return correct uppercase', () => {
      const actual = sut.toUpperCase('abc');

      expect(actual).toBe('ABC');
      console.log('Actual test');
    });

    // testing for errors

    it('Should throw error on invalid argument - function', () => {
      const expectError = () => {
        const actual = sut.toUpperCase('');
      };

      expect(expectError).toThrow();
      expect(expectError).toThrow('Invalid argument!');
    });

    it('Should throw error on invalid argument - arrow function', () => {
      expect(() => {
        sut.toUpperCase('');
      }).toThrow();
    });

    // done() is a workaround for bug, because if you dont throw error the try catch blocks tests would
    // still pass, so as argument add done and test will fail
    it('Should throw error on invalid argument - try catch block', (done) => {
      try {
        sut.toUpperCase('');
        done('GetStringInfo should throw error for invalid arg!');
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'Invalid argument!');
        done();
      }
    });
  });

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

  // when we have a lot of use cases to test
  describe('ToUpperCase exaples', () => {
    it.each([
      { input: 'abc', expected: 'ABC' },
      { input: 'My-String', expected: 'MY-STRING' },
      { input: 'def', expected: 'DEF' },
    ])('$input toUpperCase should be $expected', ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

  describe('getStringInfo for arg My-String should', () => {
    test('return right length', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters).toHaveLength(9);
    });
    test('return right lowercase', () => {
      const actual = getStringInfo('My-String');
      expect(actual.lowerCase).toBe('my-string');
    });
    test('return right uppercase', () => {
      const actual = getStringInfo('My-String');
      expect(actual.upperCase).toBe('MY-STRING');
    });
    test('return right characters', () => {
      const actual = getStringInfo('My-String');
      expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
      expect(actual.characters).toContain<string>('M');
      expect(actual.characters).toEqual(expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-']));
    });
    test('return defined extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toBeDefined();
    });
    test('return right extra info', () => {
      const actual = getStringInfo('My-String');
      expect(actual.extraInfo).toEqual({});
    });
  });

  it.skip('Should return information for valid string', () => {
    const actual = getStringInfo('My-String');

    // use toBe then comparing primitive values
    expect(actual.lowerCase).toBe('my-string');
    // then comparing objects use toEqual
    expect(actual.extraInfo).toEqual({});

    expect(actual.characters.length).toBe(9);
    expect(actual.characters).toHaveLength(9);

    expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
    expect(actual.characters).toContain<string>('M');
    expect(actual.characters).toEqual(expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g', 'M', 'y', '-']));

    // check object definition
    expect(actual.extraInfo).not.toBe(undefined);
    expect(actual.extraInfo).not.toBeUndefined();
    expect(actual.extraInfo).toBeDefined();
    expect(actual.extraInfo).toBeTruthy(); // can check for defined or undefined objects if not sure about their struicture
  });
});
