import { OptionProps } from './form';

export interface AvailSetting {
  legend?: string;
  fields?: AvailSettingField[];
}

export interface AvailSettingField {
  type: string;
  id: string;
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
