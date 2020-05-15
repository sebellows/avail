/**************************************************
 *
 * CONFIGURATION - AVAIL SETTINGS & MODULES
 *
 **************************************************/

import { OptionProps } from './form';

export interface AvailUtility {
  id?: string;
  class?: string;
  description?: string;
  enabled?: boolean;
  inputType?: string;
  property: string | string[];
  responsive: boolean;
  options?: string[] | OptionProps[];
  values?: Record<string, any> | string[]; // TODO: remove, part of old build.ts
  items?: OptionProps[];
}

export interface AvailUtilities {
  [key: string]: AvailUtility;
}
