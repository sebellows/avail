import React, { FC, Fragment } from 'react';
import { AvailConfig, AvailSetting, ComponentProps } from '../core/contracts';
import { formControlResolver } from '../components/formControlResolver';
import { Field, FieldDescription } from '../components';
import { classNames, hyphenate } from '../core/utils';
import styled from 'styled-components';

export interface SettingsFormProps extends ComponentProps {
  settings: AvailConfig<AvailSetting>;
}

const FieldGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

  .has-fieldset {
    grid-column: 1 / 4;
  }
`;

export function renderSettings(settings: AvailConfig<AvailSetting>) {
  return Object.entries(settings).map(([id, setting], i: number) => {
    const fieldsetID = `setting-${hyphenate(id)}`;
    const { legend, fields: fieldsMap } = setting;
    const fields = Object.entries(fieldsMap);

    if (fields.length === 1 && ['radiogroup', 'repeater'].includes(fields[0][1].type)) {
      return fields.map(([key, field], idx: number) => {
        if (idx === 0) {
          field.legend = legend;
        }
        const fieldID = `${fieldsetID}-${hyphenate(key)}`;
        return (
          <Fragment key={fieldID}>
            {formControlResolver(field.type, { ...field, id: fieldID }, fieldID)}
          </Fragment>
        );
      });
    }
    return (
      <fieldset id={fieldsetID} key={fieldsetID}>
        <legend className="font-size-lg">{setting.legend}</legend>
        <FieldGrid className="fields">
          {fields.map(([key, field]) => {
            const fieldID = `${fieldsetID}-${hyphenate(key)}`;
            if (field.attrs) {
              field = { ...field, ...field.attrs };
              delete field.attrs;
            }
            return (
              <Field
                key={fieldID}
                className={classNames(
                  field?.classMap?.container,
                  field.type === 'repeater' && 'has-fieldset',
                )}
              >
                {field?.label && (
                  <label htmlFor={fieldID} className={classNames(field?.classMap?.label)}>
                    {field.label}
                  </label>
                )}
                {formControlResolver(
                  field.type,
                  { ...field, className: classNames(field?.classMap?.control), id: fieldID },
                  fieldID,
                )}
                {/* `radiogroup` already sets a description */}
                {field.description && field.type !== 'radiogroup' && (
                  <FieldDescription className={classNames(field?.classMap?.description)}>
                    {field.description}
                  </FieldDescription>
                )}
              </Field>
            );
          })}
        </FieldGrid>
      </fieldset>
    );
  });
}

const SettingsForm: FC<SettingsFormProps> = ({ settings }) => {
  return <Fragment>{renderSettings(settings)}</Fragment>;
};

SettingsForm.displayName = 'SettingsForm';

export { SettingsForm };
