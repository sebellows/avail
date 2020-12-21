/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Fragment, useContext, useCallback } from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { mountStoreDevtool } from 'simple-zustand-devtools'

import { mixin } from '../core/style'
import { useFirstMountState } from '../hooks'
import { classNames, set } from '../core/utils'
import { generateSettings } from '../core/settings'
import { useStore } from '../store/useStore'
// import { SettingsContext, ADD_ITEM, REMOVE_ITEM, SET_CONFIG } from '../store'
import { Field, FieldDescription, FormControlResolver, Icon, Switch } from '../components'

export interface SettingsFormProps extends Avail.ComponentProps {
  settings?: Avail.Config<Avail.Setting>
}

const Styled = {
  Fieldset: styled.fieldset`
    ${mixin.margin.y('base')}
  `,
  Fields: styled.div`
    display: grid;
    grid-gap: ${mixin.spacer('base')};
    grid-template-columns: repeat(auto-fill, minmax(16.875rem, 1fr));

    .fullwidth {
      grid-column: 1 / 4;
    }
  `,
}

const SettingsForm: FC<SettingsFormProps> = React.memo(() => {
  const settings = useStore((state) => state.settings)
  const updateSettings = useStore((state) => state.updateSettings)
  const addSetting = useStore((state) => state.addSetting)
  const removeSetting = useStore((state) => state.removeSetting)

  const onUpdate = (config: Avail.StateConfig, event?: any) => {
    updateSettings(config)
    // console.log('SettingsForm->onUpdate', config, settings)
  }

  const onAdd = useCallback(
    (config: Avail.StateConfig) => {
      addSetting(config)
    },
    [addSetting],
  )

  const onRemove = useCallback(
    (config: string | Partial<Avail.StateConfig>) => {
      config = typeof config == 'string' ? { name: config } : config
      console.log('onRemove', config)
      removeSetting(config)
    },
    [removeSetting],
  )

  return (
    <Fragment>
      {settings &&
        Object.entries(settings).map(([id, setting]) => {
          const { legend, fields: fieldsMap } = setting as Avail.Setting
          const fields = Object.values(fieldsMap) as any[]

          if (fields?.length === 1 && ['radiogroup', 'repeater'].includes(fields[0].type)) {
            // AvailSettingField
            return fields.map((field: any, idx: number) => (
              <FormControlResolver
                key={field.id}
                {...field}
                legend={idx === 0 ? legend : null}
                className="mb-3"
                onAdd={onAdd}
                onRemove={onRemove}
                onUpdate={onUpdate}
              />
            ))
          }
          return (
            <Styled.Fieldset id={id} key={id}>
              <legend className="font-size-lg">{(setting as Avail.Setting).legend}</legend>
              <Styled.Fields className="fields">
                {fields.map((field: Avail.SettingField) => {
                  if (field.attrs) {
                    field = { ...field, ...field.attrs }
                    delete field.attrs
                  }
                  return (
                    <Field
                      key={field.id}
                      className={classNames(
                        field?.classMap?.container,
                        field.type === 'repeater' && 'fullwidth',
                      )}
                    >
                      {field?.label && !['checkbox', 'switch'].includes(field.type) && (
                        <label
                          htmlFor={field.id}
                          className={classNames('mb-2', field?.classMap?.label)}
                        >
                          {field.label}
                          {field.description && (
                            <Fragment>
                              &nbsp;
                              <Icon
                                name="info"
                                data-tip={field.description}
                                data-for={`${field.id}-info`}
                                size={16}
                              />
                              <ReactTooltip
                                id={`${field.id}-info`}
                                delayHide={1000}
                                effect="solid"
                              />
                            </Fragment>
                          )}
                        </label>
                      )}
                      <FormControlResolver
                        {...field}
                        type={field.type}
                        id={field.id}
                        className={classNames(field?.classMap?.control, {
                          'pt-0': field.type === 'repeater',
                        })}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        onUpdate={onUpdate}
                      />
                      {/* `radiogroup` already sets a description */}
                      {field.description && field.type !== 'radiogroup' && (
                        <FieldDescription className={classNames(field?.classMap?.description)}>
                          {field.description}
                        </FieldDescription>
                      )}
                    </Field>
                  )
                })}
              </Styled.Fields>
            </Styled.Fieldset>
          )
        })}
    </Fragment>
  )
})

SettingsForm.displayName = 'SettingsForm'

export { SettingsForm }

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useStore)
}
