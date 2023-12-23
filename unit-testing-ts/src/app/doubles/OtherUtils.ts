export type stringInfo = {
  lowerCase?: string;
  upperCase?: string;
  characters?: string[];
  length: number;
  extraInfo: Object | undefined;
};

type LoggerServiceCallback = (arg: string) => void;

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
