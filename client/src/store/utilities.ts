// import { generateConfig } from '../core/config'
import { add, createStore, initialize, remove, update } from './useStore'

const store = (set, get, api) => ({
  utilities: null,
  initialize: initialize('utilities', set),
  update: update('utilities', set),
  add: add('utilities', set),
  remove: remove('utilities', set, get),
})

export const useUtilitiesStore = createStore(store, 'AvailUtilitiesStore')
