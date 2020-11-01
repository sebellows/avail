import { add, createStore, initialize, remove, update } from './useStore'

const store = (set, get) => ({
  settings: null,
  initialize: initialize('settings', set),
  update: update('settings', set),
  add: add('settings', set),
  remove: remove('settings', set, get),
})

export const useSettings = createStore(store, 'AvailSettingsStore')
