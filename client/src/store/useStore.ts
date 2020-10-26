/* eslint-disable @typescript-eslint/no-unused-vars */
import { produce } from 'immer'
import create, { GetState, State, PartialState, UseStore, SetState, StateCreator } from 'zustand'
import { combine, devtools } from 'zustand/middleware'

import { get as getValue, set as setValue, toMap, unset } from '../core/utils'
import { generateConfig } from '../core/config'
import { generateSettings } from '../core/settings'
import {
  AvailConfig,
  AvailSetting,
  AvailSettings,
  AvailUtility,
  AvailUtilities,
  StateConfig,
} from '../core/contracts'

const initialSettings = generateSettings()
const initialUtilities = generateConfig(initialSettings)
const Source = {
  settings: initialSettings,
  utilities: initialUtilities,
}

interface AvailStore {
  settings: Record<string, AvailSetting>
  utilities: Record<string, AvailUtility>
}
type AvailType = keyof AvailStore

type Config<T extends State> = StateCreator<T, (fn: (draft: T) => void) => void>

/** Immer middleware to pass to Zustand's `create` method. */
export const immer = <T extends State>(config: Config<T>): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api)

const normalizePath = (path: string) => {
  return path.split('_').reduce((acc, key, i) => {
    if (i === 0) {
      return (acc += key)
    }
    if (isNaN(+key)) {
      return (acc += `.${key}`)
    }
    return (acc += `[${key}]`)
  }, '')
}

/**
 * Convert `event.target.name` to a path array.
 *
 * NOTE: form controls should have a `name` attribute corresponding to their
 * configuration's absolute schema path!
 *
 * @example
 * name:  'colorSchemes_fields_colors_items_0_name'
 * paths: `['colorSchemes', 'fields', 'colors', 'items', '0', 'name]`
 * OR
 * paths: `colorSchemes.fields.colors.items.0.name`
 */
export function update<T = AvailType>(
  config: AvailType,
  set,
  get,
  api,
): (state: StateConfig) => void {
  return function ({ name, value }) {
    const path = normalizePath(name)
    const prevValue = getValue(get()[config], path)

    set((state) => {
      setValue(state[config], path, value)
      console.log(`Previous ${config} value ${prevValue} updated to ${value} on path "${path}"`)
    })
  }
}

export function initialize<T>(configType: AvailType, set): (fn: () => AvailConfig<T>) => void {
  return function (fn: () => AvailConfig<T>) {
    set((state) => {
      state[configType] = fn()
      console.log(`Avail ${configType} has been initialized`)
    })
  }
}

export function add(config: AvailType, set): (config: StateConfig) => void {
  return function ({ name, value }) {
    const path = normalizePath(name)

    set((state) => {
      setValue(state[config], path, value)
      console.log(`Value ${value} added to path "${path}"`)
    })
  }
}

export function remove(config: AvailType, set, get): (config: Partial<StateConfig>) => void {
  return function ({ name }) {
    const path = normalizePath(name)
    const prevValue = getValue(get()[config], path)

    set((state) => {
      unset(state[config], path)
      console.log(`Value ${prevValue} removed from path "${path}"`)
    })
  }
}

/**
 * Employ devtools and log middleware versions of the store in development mode
 * @see {@link https://github.com/pmndrs/zustand#redux-devtools}
 */
export const createStore = <T extends State>(config: Config<T>, storeName?: string) =>
  create(
    process.env.NODE_ENV === 'development' ? devtools(immer(config), storeName) : immer(config),
  )

const store = (set, get, api) => ({
  settings: {},
  initializeSettings: initialize('settings', set),
  updateSettings: update('settings', set, get, api),
  addSetting: add('settings', set),
  removeSetting: remove('settings', set, get),
  utilities: {},
  initializeUtilities: initialize('utilities', set),
  updateUtilities: update('utilities', set, get, api),
  addUtility: add('utilities', set),
  removeUtility: remove('utilities', set, get),
})

export const useStore = createStore(store, 'AvailStore')
// export const useUtilities = createStore<AvailUtility>('utilities', 'AvailUtilities')
