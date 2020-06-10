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
  property: string;
  responsive: boolean;
  options?: string[] | OptionProps[];
  subitems?: OptionProps[];
  subproperties?: Record<string, any>;
  // values?: Record<string, any> | string[]; // TODO: remove, part of old build.ts
  items?: OptionProps[];
}

export interface AvailUtilities {
  [key: string]: AvailUtility;
}

export interface AvailConfig<T extends AvailSetting | AvailUtility> {
  [key: string]: T;
}

export interface AvailState<T = AvailSetting | AvailUtility> {
  config: AvailConfig<T>;
  inProgress?: boolean;
}

export interface StateConfig {
  name: string;
  value: string | boolean;
}

export interface StateActionConfig {
  type: string;
  config?: StateConfig;
  inProgress?: boolean;
}
