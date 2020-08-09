/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Fragment, useContext, useCallback } from 'react';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';

import { mixin } from '../core/style';
import { classNames } from '../core/utils';
import {
  AvailConfig,
  AvailSetting,
  ComponentProps,
  StateConfig,
  AvailSettingField,
} from '../core/contracts';
import { SettingsContext, ADD_ITEM, REMOVE_ITEM, SET_CONFIG } from '../store';
import { Field, FieldDescription, FormControlResolver, InfoIcon } from '../components';

export interface SettingsFormProps extends ComponentProps {
  settings?: AvailConfig<AvailSetting>;
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

    .fullwidth {
      grid-column: 1 / 4;
    }
  `,
};

const SettingsForm: FC<SettingsFormProps> = React.memo(() => {
  const [settings, setSettings] = useContext(SettingsContext);

  const onUpdate = useCallback(
    (config: StateConfig) => {
      console.log('SettingsForm->onUpdate', config);
      setSettings({ type: SET_CONFIG, config });
    },
    [setSettings],
  );

  const repeaterHandlers = {
    onAdd: (config: StateConfig) => {
      setSettings({ type: ADD_ITEM, config });
    },
    onRemove: (config: string | Partial<StateConfig>) => {
      config = typeof config == 'string' ? { name: config } : config;
      console.log('onRemove', config);
      setSettings({ type: REMOVE_ITEM, config });
    },
  };

  return (
    <Fragment>
      {Object.entries(settings.config).map(([id, setting], i: number) => {
        const { legend, fields: fieldsMap } = setting;
        const fields = Object.values(fieldsMap);

        if (fields?.length === 1 && ['radiogroup', 'repeater'].includes(fields[0].type)) {
          return fields.map((field: AvailSettingField, idx: number) => {
            if (idx === 0) {
              field.legend = legend;
            }

            return (
              <FormControlResolver
                key={field.id}
                {...field}
                className="mb-3"
                onUpdate={onUpdate}
                {...repeaterHandlers}
              />
            );
          });
        }
        return (
          <Styled.Fieldset id={id} key={id}>
            <legend className="font-size-lg">{setting.legend}</legend>
            <Styled.Fields className="fields">
              {fields.map((field: AvailSettingField) => {
                if (field.attrs) {
                  field = { ...field, ...field.attrs };
                  delete field.attrs;
                }
                return (
                  <Field
                    key={field.id}
                    className={classNames(
                      field?.classMap?.container,
                      field.type === 'repeater' && 'fullwidth',
                    )}
                  >
                    {field?.label && field.type !== 'checkbox' && (
                      <label
                        htmlFor={field.id}
                        className={classNames('mb-2', field?.classMap?.label)}
                      >
                        {field.label}
                        {field.description && (
                          <Fragment>
                            &nbsp;
                            <InfoIcon
                              data-tip={field.description}
                              data-for={`${field.id}-info`}
                              size={16}
                            />
                            <ReactTooltip id={`${field.id}-info`} delayHide={1000} effect="solid" />
                          </Fragment>
                        )}
                      </label>
                    )}
                    {
                      <FormControlResolver
                        {...field}
                        type={field.type}
                        id={field.id}
                        className={classNames(field?.classMap?.control)}
                        onUpdate={onUpdate}
                        {...repeaterHandlers}
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
      })}
    </Fragment>
  );
});

SettingsForm.displayName = 'SettingsForm';

export { SettingsForm };
