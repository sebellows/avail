/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Fragment, useMemo } from 'react';
import { AvailConfig, AvailSetting, ComponentProps } from '../core/contracts';
import { FormControlResolver } from '../components/formControlResolver';
import { Field, FieldDescription } from '../components';
import { classNames, hyphenate, typeOf, toPath, get } from '../core/utils';
import styled from 'styled-components';
import { FormContext, FormContextState } from '../context/FormContext';
import { mixin } from '../core/style';

export interface SettingsFormProps extends ComponentProps {
  settings: AvailConfig<AvailSetting>;
}

const Styled = {
  Fieldset: styled.fieldset`
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: 1fr;
    grid-template-rows: 2.625rem 1fr;
    grid-template-areas:
      'legend'
      'fields';
    ${mixin.margin.y('base')}

    > legend {
      grid-area: legend;
    }
  `,
  Fields: styled.div`
    grid-area: fields;
    display: grid;
    grid-gap: ${mixin.spacer('base')};
    grid-template-columns: repeat(auto-fill, minmax(16.875rem, 1fr)); /* 270px */

    .has-fieldset {
      grid-column: 1 / 4;
    }
  `,
};

const SettingsForm: FC<{}> = React.memo(() => {
  return (
    <FormContext.Consumer>
      {(context: FormContextState) =>
        Object.entries(context.settings).map(([id, setting], i: number) => {
          const fieldsetID = `settings_${id}`;
          const { legend, fields: fieldsMap } = setting;

          if (!setting.fields) {
            console.log('No fieldsMap', id, context.settings, setting);
            return (
              <h1 key={id} className="text-danger">
                No fieldsMap
              </h1>
            );
          }
          const fields = Object.entries(fieldsMap);

          if (fields.length === 1 && ['radiogroup', 'repeater'].includes(fields[0][1].type)) {
            return fields.map(([key, field], idx: number) => {
              if (idx === 0) {
                field.legend = legend;
              }

              const fieldID = `${fieldsetID}_fields_${key}`;

              return (
                <FormControlResolver
                  key={fieldID}
                  {...field}
                  type={field.type}
                  id={fieldID}
                  className="mb-3"
                  // onChange={(event: any) => {
                  //   const paths = [...event.target.name.split('_'), 'value'];
                  //   context.updateSettings(paths, event.target.value);
                  // }}
                />
              );
            });
          }
          return (
            <Styled.Fieldset id={fieldsetID} key={fieldsetID}>
              <legend className="font-size-lg">{setting.legend}</legend>
              <Styled.Fields className="fields">
                {fields.map(([key, field], idx: number) => {
                  const fieldID = `${fieldsetID}_fields_${key}`;
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
                      {
                        <FormControlResolver
                          {...field}
                          type={field.type}
                          id={fieldID}
                          className={classNames(field?.classMap?.control)}
                          onBlur={(event: any) => {
                            const paths = event.target.name.split('_');
                            if (field.type !== 'repeater') {
                              paths.push('value');
                            }
                            console.log('updateSettings', paths, event, context.settings);
                            context.updateSettings(paths, event.target.value);
                          }}
                          onChange={(event: any) => {
                            if (
                              field.type === 'radiogroup' ||
                              field.type === 'checkbox' ||
                              field.type === 'select'
                            ) {
                              const paths = event.target.name.split('_');
                              console.log('updateSettings', paths, event, context.settings);
                              context.updateSettings([...paths, 'value'], event.target.value);
                            }
                          }}
                        />
                      }
                      {/* `radiogroup` already sets a description */}
                      {field.description && field.type !== 'radiogroup' && (
                        <FieldDescription className={classNames(field?.classMap?.description)}>
                          {field.description}
                        </FieldDescription>
                      )}
                    </Field>
                  );
                })}
              </Styled.Fields>
            </Styled.Fieldset>
          );
        })
      }
    </FormContext.Consumer>
  );
});

SettingsForm.displayName = 'SettingsForm';

export { SettingsForm };
