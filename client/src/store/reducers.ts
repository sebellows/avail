/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  StateActionConfig,
  AvailSetting,
  AvailUtility,
  StateConfig,
  AvailConfig,
  AvailConfigType,
} from '../core/contracts'
import { addItem, removeItem, setInProgress, setConfig } from './actions'
import { ADD_ITEM, REMOVE_ITEM, SET_IN_PROGRESS, SET_CONFIG } from './types'

interface AvailStateOLD<T extends AvailConfigType> {
  config: AvailConfig<T>
  inProgress?: boolean
}

export function stateReducer<T extends AvailConfigType>(
  state: AvailStateOLD<T>,
  action: Partial<StateActionConfig>,
) {
  switch (action.type) {
    case SET_CONFIG:
      console.log('SET_CONFIG', action)
      return setConfig(state, action.config as StateConfig)
    case ADD_ITEM:
      return addItem(state, action.config as StateConfig)
    case REMOVE_ITEM:
      return removeItem(state, action.config)
    case SET_IN_PROGRESS:
      return setInProgress(state, action.inProgress)
    default:
      return state
  }
}
