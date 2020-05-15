import React, { FC, Fragment } from 'react';
import { AvailSetting } from '../core/contracts';
import { formControlResolver } from '../components/formControlResolver';
import { Field, FieldDescription } from '../components';
import { classNames } from '../core/utils';

export interface SettingsFormProps {
  settings: AvailSetting[];
}

export function renderSettings(setting: AvailSetting, i: number) {
  if (setting.fields.length === 1 && ['radiogroup', 'repeater'].includes(setting.fields[0].type)) {
    setting.fields[0].legend = setting.legend;
    return setting.fields.map((field, i) => (
      <Fragment key={`setting-${field.id}-${i}`}>
        {formControlResolver(setting.fields[0].type, field, field.id)}
      </Fragment>
    ));
  } else {
    return (
      <fieldset key={`setting-${i}`}>
        <legend className="font-size-lg">{setting.legend}</legend>
        {setting.fields.map((field, i) => (
          <Field
            key={`setting-${field.id}-${i}`}
            className={classNames(field?.classMap?.container)}
          >
            {field?.label && (
              <label htmlFor={field.id} className={classNames(field?.classMap?.label)}>
                {field.label}
              </label>
            )}
            {formControlResolver(
              field.type,
              { ...field, className: classNames(field?.classMap?.control) },
              field.id,
            )}
            {/* `radiogroup` already sets a description */}
            {field.description && field.type !== 'radiogroup' && (
              <FieldDescription className={classNames(field?.classMap?.description)}>
                {field.description}
              </FieldDescription>
            )}
          </Field>
        ))}
      </fieldset>
    );
  }
}

const SettingsForm: FC<SettingsFormProps> = ({ settings = [] }) => {
  return <Fragment>{settings.map(renderSettings)}</Fragment>;
};

SettingsForm.displayName = 'SettingsForm';

export { SettingsForm };
