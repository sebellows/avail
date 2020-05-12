import React, { FC } from 'react';
import { FormGroup, FormColorpicker, FormRadioGroup, Repeater } from '../components';
import { OptionProps } from '../core/contracts';

export interface SettingsFormProps {
  settings: AvailSetting[];
}

export interface AvailSetting {
  legend?: string;
  fields?: AvailSettingField[];
}

export interface AvailSettingField {
  type: string;
  id: string;
  classes?: Record<string, string>;
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

export const SettingsForm: FC<SettingsFormProps> = ({ settings = [] }) => {
  function resolveSetting(setting: AvailSetting, i: number) {
    if (setting.fields.length === 1 && ['radio', 'repeater'].includes(setting.fields[0].type)) {
      setting.fields[0].legend = setting.legend;
      return setting.fields.map(resolveFormField);
    } else {
      return (
        <fieldset key={`setting-${i}`}>
          <legend className="font-size-lg">{setting.legend}</legend>
          {setting.fields.map(resolveFormField)}
        </fieldset>
      );
    }
  }
  function resolveFormField(field: AvailSettingField) {
    switch (field.type) {
      case 'text':
      case 'number':
      case 'select':
        return <FormGroup key={field.id} {...field} />;
      case 'radio':
        return <FormRadioGroup key={field.id} {...field} />;
      case 'colorpicker':
        return <FormColorpicker key={field.id} {...field} />;
      case 'repeater':
        return <Repeater key={field.id} {...field} />;
    }
  }

  return <>{settings.map(resolveSetting)}</>;
};
