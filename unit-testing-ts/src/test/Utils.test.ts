import { getStringInfo, toUpperCase } from '../app/Utils';

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

  it.only('Should return information for valid string', () => {
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
