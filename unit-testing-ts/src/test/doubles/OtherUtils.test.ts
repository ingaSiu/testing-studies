import { OtherStringUtils, calculateComplexity, toUpperCaseWithCallback } from '../../app/doubles/OtherUtils';

import { toUpperCase } from '../../app/Utils';

// Spies vs mocks
// - spies are not directly injected into SUT
// - Original functionality is preserved with spies
// - Spies usually track method calls
// - with mocks original functionality is lost and we are using a differnct object,
//  which has its own functionality

describe('OtherUtils test suite', () => {
  describe('OtherStringUnitls tests with spies', () => {
    let sut: OtherStringUtils;

    beforeEach(() => {
      sut = new OtherStringUtils();
    });

    test('Use spy to track calls', () => {
      const toUpperCaseSpy = jest.spyOn(sut, 'toUpperCase');
      sut.toUpperCase('asa');
      expect(toUpperCaseSpy).toHaveBeenCalledWith('asa');
    });

    test('Use spy to track calls to other module', () => {
      const consoleLogSpy = jest.spyOn(console, 'log');
      sut.logString('abc');
      expect(consoleLogSpy).toHaveBeenCalledWith('abc');
    });

    test('Use spy to replace the implementation of a method', () => {
      jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
        console.log('calling mocked implementation');
      });
      sut.callExternalService();
    });
  });

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
