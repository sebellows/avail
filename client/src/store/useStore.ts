/* eslint-disable @typescript-eslint/no-unused-vars */
import { produce } from 'immer'
import create, { GetState, State, PartialState, UseStore, SetState, StateCreator } from 'zustand'
import { combine, devtools } from 'zustand/middleware'

import { clone, get as getValue, set as setValue, toMap, unset } from '../core/utils'
import { generateConfig } from '../core/config'
import { generateSettings } from '../core/settings'

// interface AvailState {
//   settings: Record<string, Avail.Setting>
//   utilities: Record<string, Avail.Utility>
// }
// type Avail.StateType = keyof AvailState
// enum AvailType {
//   settings = 'Avail.Setting',
//   utilities = 'Avail.Utility',
// }

type Config<T extends State> = StateCreator<T, (fn: (draft: T) => void) => void>

/** Immer middleware to pass to Zustand's `create` method. */
export const immer = <T extends State>(config: Config<T>): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api)

// const normalizePath = (path: string) => {
//   return path.split('_').reduce((acc, key, i) => {
//     if (i === 0) {
//       return (acc += key)
//     }
//     if (isNaN(+key)) {
//       return (acc += `.${key}`)
//     }
//     return (acc += `[${key}]`)
//   }, '')
// }

const getUpdateItem = (state: any, name: string) => {
  let paths = name.split('_')
  const lastKey = paths.pop()
  const item = getValue(state, paths)
  return [lastKey, item]
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
export function update<T = Avail.StateType>(config: T, set): (state: Avail.StateConfig) => void {
  return function ({ name, value }) {
    set((state) => {
      const [key, item] = getUpdateItem(state[config], name)
      item[key] = value
    })
  }
}

export function initialize<T>(
  configType: Avail.StateType,
  set,
): (fn: () => Avail.Config<T>) => void {
  return function (fn: () => Avail.Config<T>) {
    set((state) => {
      state[configType] = fn()
      console.log(`Avail ${configType} has been initialized`)
    })
  }
}

export function add(config: Avail.StateType, set): (config: Avail.StateConfig) => void {
  return function ({ name, value }) {
    // const path = normalizePath(name)

    set((state) => {
      const [key, item] = getUpdateItem(state[config], name)
      item[key] = value

      // setValue(state[config], name.split('_'), value)
      console.log(`Value ${value} added to path "${name.split('_')}"`)
    })
  }
}

export function remove(
  config: Avail.StateType,
  set,
  get,
): (config: Partial<Avail.StateConfig>) => void {
  return function ({ name }) {
    // const path = normalizePath(name)
    const prevValue = getValue(get()[config], name.split('_'))

    set((state) => {
      const [key, item] = getUpdateItem(state[config], name)
      delete item[key]
      // unset(state[config], name.split('_'))
      console.log(`Value ${prevValue} removed from path "${name.split('_')}"`)
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

const settings = generateSettings()
// const utilities = generateConfig(initialSettings)

const store = (set, get, api) => {
  const state = {
    settings,
    initializeSettings: initialize('settings', set),
    updateSettings: update('settings', set),
    addSetting: add('settings', set),
    removeSetting: remove('settings', set, get),
    utilities: {},
    initializeUtilities: initialize('utilities', set),
    updateUtilities: update('utilities', set),
    addUtility: add('utilities', set),
    removeUtility: remove('utilities', set, get),
  }
  // state.utilities = generateConfig(state.settings)
  return state
}

export const useStore = createStore(store, 'AvailState')
// export const useUtilities = createStore<Avail.Utility>('utilities', 'AvailUtilities')
