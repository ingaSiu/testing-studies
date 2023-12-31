import { v4 } from 'uuid';

export type stringInfo = {
  lowerCase?: string;
  upperCase?: string;
  characters?: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCallback = (arg: string) => void;

export const toUpperCase = (arg: string) => {
  return arg.toUpperCase();
};

export const toLowerCaseWithId = (arg: string) => {
  return arg.toLowerCase() + v4();
};

export const calculateComplexity = (stringInfo: stringInfo) => {
  return Object.keys(stringInfo.extraInfo).length * stringInfo.length;
};

export const toUpperCaseWithCallback = (arg: string, callBack: LoggerServiceCallback) => {
  if (!arg) {
    callBack('Invalid argument!');
    return;
  }
  callBack(`called function with ${arg}`);

  return arg.toUpperCase();
};

export class OtherStringUtils {
  public callExternalService() {
    console.log('Calling external service!');
  }

  public toUpperCase(arg: string) {
    return arg.toUpperCase();
  }

  public logString(arg: string) {
    console.log(arg);
  }
}
