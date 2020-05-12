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
  property: string | string[];
  responsive: boolean;
  presets?: string[];
  values?: Record<string, any> | string[]; // TODO: remove, part of old build.ts
  options?: OptionProps[];
}

export interface AvailUtilities {
  [key: string]: AvailUtility;
}
