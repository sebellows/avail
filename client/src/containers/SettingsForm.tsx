/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, Fragment, useContext, useCallback } from 'react'
import styled from 'styled-components'
import ReactTooltip from 'react-tooltip'
import { mountStoreDevtool } from 'simple-zustand-devtools'

import { mixin } from '../core/style'
import { useFirstMountState } from '../hooks'
import { classNames, set } from '../core/utils'
import { generateSettings } from '../core/settings'
import {
  AvailConfig,
  AvailSetting,
  ComponentProps,
  StateConfig,
  AvailSettingField,
  AvailSettings,
} from '../core/contracts'
import { useStore } from '../store/useStore'
// import { SettingsContext, ADD_ITEM, REMOVE_ITEM, SET_CONFIG } from '../store'
import { Field, FieldDescription, FormControlResolver, InfoIcon } from '../components'

export interface SettingsFormProps extends ComponentProps {
  settings?: AvailConfig<AvailSetting>
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
  // const { initializeSettings, updateSettings, addSetting, removeSetting } = useStore(
  //   (state) => state,
  // )
  const state = useStore((state) => state)
  const settings = useStore((state) => state.settings)
  const updateSettings = useStore((state) => state.updateSettings)
  const addSetting = useStore((state) => state.addSetting)
  const removeSetting = useStore((state) => state.removeSetting)
  // const initializeSettings = useStore((state) => state.initializeSettings)
  // const [settings, setSettings] = React.useState(initialSettings)

  // React.useEffect(() => {
  //   // initializeSettings(() => generateSettings())
  //   console.log('initializeSettings', settings)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  // const onUpdate = useCallback(
  //   (config: StateConfig, event: any) => {
  //     updateSettings(config)
  //     console.log('SettingsForm->onUpdate', event, config, settings)
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [updateSettings],
  // )

  const onUpdate = (config: StateConfig, event: any) => {
    updateSettings(config)
    // setHasUpdated(true)
    // setSettings(_settings)
    console.log('SettingsForm->onUpdate', config, settings)
  }

  // React.useEffect(() => {
  //   console.log('isFirstMount && hasUpdated', isFirstMount, hasUpdated)
  //   if (!isFirstMount && hasUpdated) {
  //     console.log('settings', settings)
  //     setHasUpdated(false)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [settings, hasUpdated])

  const onAdd = useCallback(
    (config: StateConfig) => {
      addSetting(config)
    },
    [addSetting],
  )

  const onRemove = useCallback(
    (config: string | Partial<StateConfig>) => {
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
          const { legend, fields: fieldsMap } = setting as AvailSetting
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
              <legend className="font-size-lg">{(setting as AvailSetting).legend}</legend>
              <Styled.Fields className="fields">
                {fields.map((field: AvailSettingField) => {
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
