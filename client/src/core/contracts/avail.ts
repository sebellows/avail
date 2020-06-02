/**************************************************
 *
 * CONFIGURATION - AVAIL SETTINGS & MODULES
 *
 **************************************************/

import { OptionProps } from './form';

export interface AvailSetting {
  id?: string;
  legend?: string;
  fields?: Record<string, AvailSettingField>;
}

export interface AvailSettingField {
  id: string;
  type: string;
  classMap?: Record<string, string>;
  description?: string;
  inputType?: string;
  label?: string;
  legend?: string;
  items?: OptionProps[];
  options?: OptionProps[];
  // presets?: string[] | Record<string, any>;
  attrs?: Record<string, any>;
  readOnly?: boolean;
  validators?: Record<string, any>;
  value?: string | number;
}

export interface AvailSettings {
  [key: string]: AvailSetting;
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
