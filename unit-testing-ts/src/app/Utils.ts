export class StringUtils {
  public toUpperCase(arg: string) {
    return toUpperCase(arg);
  }
}

export const toUpperCase = (arg: string) => {
  return arg.toUpperCase();
};

export type stringInfo = {
  lowerCase: string;
  upperCase: string;
  characters: string[];
  length: number;
  extraInfo: Object | undefined;
};

export const getStringInfo = (arg: string): stringInfo => {
  return {
    lowerCase: arg.toLowerCase(),
    upperCase: arg.toUpperCase(),
    characters: Array.from(arg),
    length: arg.length,
    extraInfo: {},
  };
};
