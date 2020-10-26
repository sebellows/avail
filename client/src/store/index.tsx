import React, { createContext, useReducer, FC } from 'react'

import { generateConfig } from '../core/config'
import { generateSettings } from '../core/settings'

import { stateReducer } from './reducers'
import { ADD_ITEM, REMOVE_ITEM, SET_IN_PROGRESS, SET_CONFIG } from './types'
import { ComponentProps, AvailSetting, AvailConfig, AvailUtility } from '../core/contracts'

interface AvailStateOLD<T = AvailSetting | AvailUtility> {
  config: AvailConfig<T>
  inProgress?: boolean
}

export type StoreContextState<T> = [AvailStateOLD<T>, (prev: any, next?: any) => void]

export const SettingsContext = createContext<StoreContextState<AvailSetting>>(null)
export const UtilitiesContext = createContext<StoreContextState<AvailUtility>>(null)

const initialSettingsState: AvailStateOLD<AvailSetting> = {
  config: generateSettings(),
  inProgress: true,
}

const initialUtilitiesState: AvailStateOLD<AvailUtility> = {
  config: generateConfig(initialSettingsState.config),
  inProgress: true,
}

const Store: FC<ComponentProps> = ({ children }) => {
  // const [loading, setLoading] = useState(false);
  // const [addExitClass, setExitClass] = useState(false);

  const [settings, setSettings] = useReducer(stateReducer, initialSettingsState)
  const [utilities, setUtilities] = useReducer(stateReducer, initialUtilitiesState)

  return (
    <SettingsContext.Provider value={[settings as AvailStateOLD<AvailSetting>, setSettings]}>
      <UtilitiesContext.Provider value={[utilities as AvailStateOLD<AvailUtility>, setUtilities]}>
        {children}
      </UtilitiesContext.Provider>
    </SettingsContext.Provider>
  )
}

Store.displayName = 'Store'

export { Store, ADD_ITEM, REMOVE_ITEM, SET_IN_PROGRESS, SET_CONFIG }
