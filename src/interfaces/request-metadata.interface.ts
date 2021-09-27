import { RequestMethod } from '../enums/request-method.enum';

/**
 *
 * Added by Jason.Song (成长的小猪) on 2021/09/17 16:52:29
 */
export interface RequestMetadata {
  path?: string | string[];
  method?: RequestMethod;
}
