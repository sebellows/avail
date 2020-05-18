/**************************************************
 *
 * CONFIGURATION - AVAIL SETTINGS & MODULES
 *
 **************************************************/

import { OptionProps } from './form';

export interface AvailSetting {
  legend?: string;
  fields?: AvailSettingField[];
}

export interface AvailSettingField {
  id: string;
  type: string;
  classMap?: Record<string, string>;
  description?: string;
  inputType?: string;
  label?: string;
  legend?: string;
  options?: OptionProps[];
  presets?: string[] | Record<string, any>;
  readonly?: boolean;
  validators?: Record<string, any>;
  value?: string | number;
}

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

export interface AvailConfig<T> {
  [key: string]: T;
}
