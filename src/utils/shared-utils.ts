export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === 'undefined';
export const isFunction = (fn: any): boolean => typeof fn === 'function';
export const isConstructor = (fn: any): boolean => fn === 'constructor';
export const isString = (fn: any): fn is string => typeof fn === 'string';
export const isNullOrUndefined = (obj: any): obj is null | undefined =>
  isUndefined(obj) || obj === null;

export const addLeadingSlash = (path?: string): string => {
  if (path && typeof path === 'string') {
    path = path.trim();
    path = path.replace(/\/+/g, '/');
    path = path.charAt(0) !== '/' ? '/' + path : path;
    if (path.length > 1) {
      path = path.replace(/\/+$/, '');
    }
    return path;
  }
  return '';
};
