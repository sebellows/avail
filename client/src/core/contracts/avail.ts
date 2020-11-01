/**************************************************
 *
 * CONFIGURATION - AVAIL SETTINGS & MODULES
 *
 **************************************************/

import { OptionProps } from './form'
import { ReactElement } from 'react'

export interface AvailClassMap {
  control?: string
  container?: string
  description?: string
  error?: string
  field?: string
  label?: string
  legend?: string
}

export type AvailConfigRecord = Record<string | number | symbol, unknown>

export interface AvailSetting extends AvailConfigRecord {
  id?: string
  legend?: string
  fields?: Record<string, AvailSettingField>
}

export interface AvailSettingField {
  id: string
  type: string
  checked?: boolean // used on checkboxes and switches
  classMap?: AvailClassMap
  description?: string
  inputType?: string
  label?: string | ReactElement
  legend?: string
  items?: OptionProps[] // used on repeater fields
  options?: OptionProps[] // used on select and radiogroup fields
  // presets?: string[] | Record<string, any>;
  attrs?: Record<string, any>
  readOnly?: boolean
  validators?: Record<string, any>
  value?: string | number
}

export interface AvailSettings {
  [key: string]: AvailSetting
}

export interface AvailUtility extends AvailConfigRecord {
  id?: string
  class?: string
  description?: string
  enabled?: boolean
  inputType?: string
  property?: string
  responsive?: boolean
  options?: string[] | OptionProps[]
  subitems?: OptionProps[]
  subproperties?: Record<string, any>
  // values?: Record<string, any> | string[]; // TODO: remove, part of old build.ts
  items?: OptionProps[] // used on repeater fields
}

export interface AvailUtilities {
  [key: string]: AvailUtility
}

export interface AvailState {
  settings: Record<string, AvailSetting>
  utilities: Record<string, AvailUtility>
}
export type AvailStateType = keyof AvailState

// export interface AvailConfig<T extends AvailSetting | AvailUtility> {
//   [key: string]: T;
// }
// [keyof JSX.IntrinsicElements]
export type AvailConfigType = AvailSetting | AvailUtility
// export type AvailConfig<AvailConfigType> = Record<string, AvailConfigType>
export type AvailConfig<P = any> = {
  [K in AvailStateType]: P extends AvailState[K] ? K : AvailState[K]
}[AvailStateType]

// export interface AvailState<T = AvailSetting | AvailUtility> {
//   config: AvailConfig<T>
//   inProgress?: boolean
// }

export interface StateConfig {
  name: string
  value: string | boolean
}

export interface StateActionConfig {
  type: string
  config: StateConfig
  inProgress?: boolean
}
