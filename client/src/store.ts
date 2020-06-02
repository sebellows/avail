// import { isPlainObject } from './core/utils';

import { AvailSettings, AvailUtilities } from './core/contracts';

export const getNestedProp = (obj: any, key: string) => {
  try {
    return key.split('.').reduce((o, prop) => {
      if (o instanceof Map) {
        return o.get(prop);
      }
      return o[prop];
    }, obj);
  } catch (err) {
    return null;
  }
};

export const setNestedProp = (obj: Record<string, any>, prop: string, value: any) => {
  const fields = prop.split('.');
  const reducer = (acc, item, index, arr) => {
    return {
      [item]: index + 1 < arr.length ? acc : value,
    };
  };
  return fields.reduceRight(reducer, obj);
};

class Store {
  state: Partial<{ settings: AvailSettings; utilities: AvailUtilities }> = {};

  constructor() {
    this.state = { settings: {}, utilities: {} };
  }

  getSetting(key: string) {
    return getNestedProp(this.state.settings, key);
  }

  getSettings() {
    return this.state.settings;
  }

  setSetting(key: string, value: string) {
    this.state.settings = {
      ...this.state.settings,
      ...setNestedProp(this.state.settings, key, value),
    };
  }

  setSettings(settings: Record<string, any>) {
    return { ...this.state.settings, ...settings };
  }

  getUtility(key: string) {
    return getNestedProp(this.state.utilities, key);
  }

  setUtility(key: string, value: string) {
    this.state.utilities = {
      ...this.state.utilities,
      ...setNestedProp(this.state.utilities, key, value),
    };
  }

  setUtilities(utilities: Record<string, any>) {
    return { ...this.state.utilities, ...utilities };
  }
}

// const Store = () => {
//   let _settings = {};
//   let _utilities = {};
//   let state = {
//     settings: _settings,
//     utilities: _utilities,
//   };

//   return {
//     state,
//     actions: {
//       getSetting: function (key: string) {
//         return getNestedProp(state.settings, key);
//       },
//       getSettings: function () {
//         return state.settings;
//       },
//       setSetting: function (key: string, value: string) {
//         const updated = setNestedProp(state.settings, key, value);
//         _settings = { ..._settings, ...updated };
//         console.log('setSetting', this, _settings);
//       },
//       setSettings: function (settings: Record<string, any>) {
//         return { ...state.settings, ...settings };
//       },
//       getUtility: function (key: string) {
//         return getNestedProp(state.utilities, key);
//       },
//       setUtility: function (key: string, value: string) {
//         setNestedProp(state.utilities, key, value);
//       },
//       setUtilities: function (utilities: Record<string, any>) {
//         return { ...state.utilities, ...utilities };
//       },
//     },
//   };
// };

export const store = new Store();
