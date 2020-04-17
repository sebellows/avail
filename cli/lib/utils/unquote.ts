const quoteExp = /[\'\"]/

export const unquote = (str: string): string => {
  if (!str) return '';

  if (quoteExp.test(str.charAt(0))) {
    return str.substr(1);
  }
  if (quoteExp.test(str.charAt(str.length - 1))) {
    return str.substr(0, str.length - 1);
  }
};
