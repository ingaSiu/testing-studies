import { calculateComplexity, toUpperCaseWithCallback } from '../../app/doubles/OtherUtils';

import { toUpperCase } from '../../app/Utils';

describe('OtherUtils test suite', () => {
  // mocks - examples

  const callBackMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Tracking callbacks with Jest mocks', () => {
    it(' calls callback for invalid argument -track calls', () => {
      const actual = toUpperCaseWithCallback('', callBackMock);
      expect(actual).toBeUndefined();
      expect(callBackMock).toHaveBeenCalledWith('Invalid argument!');
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });

    it('calls callback for valid argument - track calls', () => {
      const actual = toUpperCaseWithCallback('abc', callBackMock);
      expect(actual).toBe('ABC');
      expect(callBackMock).toHaveBeenCalledWith('called function with abc');
      expect(callBackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('Tracking callback', () => {
    let callbackArg = [];
    let timesCalled = 0;

    function callBackMock(arg: string) {
      callbackArg.push(arg);
      timesCalled++;
    }

    // need to clear the fields, because tests should be independent
    // if not cleared, the mock func in second test will be called not first but second time
    // because it was called before in first test
    afterEach(() => {
      // clearing tracking fields
      callbackArg = [];
      timesCalled = 0;
    });
    it(' calls callback for invalid argument -track calls', () => {
      const actual = toUpperCaseWithCallback('', callBackMock);
      expect(actual).toBeUndefined();
      expect(callbackArg).toContain('Invalid argument!');
      expect(timesCalled).toBe(1);
    });

    it('calls callback for valid argument - track calls', () => {
      const actual = toUpperCaseWithCallback('abc', callBackMock);
      expect(actual).toBe('ABC');
      expect(callbackArg).toContain('called function with abc');
      expect(timesCalled).toBe(1);
    });
  });

  // fakes - examples
  it('toUpperCase - calls callback for invalid argument', () => {
    const actual = toUpperCaseWithCallback('', () => {});
    expect(actual).toBeUndefined();
  });
  it('toUpperCase - calls callback for invalid argument', () => {
    const actual = toUpperCaseWithCallback('abc', () => {});
    expect(actual).toBe('ABC');
  });

  it('Calculates complexity', () => {
    const someInfo = {
      length: 5,
      extraInfo: {
        field1: 'someInfo',
        field2: 'someOtherInfo',
      },
    };

    const actual = calculateComplexity(someInfo);
    expect(actual).toBe(10);
  });
});
