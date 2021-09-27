import { PATH_METADATA } from '../constants';

/**
 *
 * Added by Jason.Song (成长的小猪) on 2021/09/17 16:53:38
 * @param prefix
 * @returns
 */
export function Controller(prefix?: string | string[]): ClassDecorator {
  const defaultPath = '/';

  const path =
    typeof prefix === 'string' || Array.isArray(prefix) ? prefix : defaultPath;

  return (target: object) => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
}
