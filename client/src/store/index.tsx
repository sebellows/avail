import React, {
  // AnimationEvent,
  createContext,
  // useEffect,
  useReducer,
  // useRef,
  // useState,
  FC,
} from 'react';

import { generateConfig } from '../core/config';
import { generateSettings } from '../core/settings';

import { stateReducer } from './reducers';
import { ADD_ITEM, REMOVE_ITEM, SET_IN_PROGRESS, SET_CONFIG } from './types';
import { ComponentProps, AvailSetting, AvailState, AvailUtility } from '../core/contracts';

export type StoreContextState<T> = [AvailState<T>, (prev: any, next?: any) => void];

export const SettingsContext = createContext<StoreContextState<AvailSetting>>(null);
export const UtilitiesContext = createContext<StoreContextState<AvailUtility>>(null);

const initialSettingsState: AvailState<AvailSetting> = {
  config: generateSettings(),
  inProgress: true,
};

const initialUtilitiesState: AvailState<AvailUtility> = {
  config: generateConfig(initialSettingsState.config),
  inProgress: true,
};

const Store: FC<ComponentProps> = ({ children }) => {
  // const [loading, setLoading] = useState(false);
  // const [addExitClass, setExitClass] = useState(false);

  const [settings, setSettings] = useReducer(stateReducer, initialSettingsState);
  const [utilities, setUtilities] = useReducer(stateReducer, initialUtilitiesState);

  // useEffect(() => {
  //   if (loading) {
  //     const fadeSpinner = setTimeout(() => {
  //       setExitClass(true);
  //     }, 2000);
  //     return () => clearTimeout(fadeSpinner);
  //   }
  // }, [loading, settings]);

  // function handleLoad(event: AnimationEvent) {
  //   event.persist();
  //   setLoading(false);
  //   setExitClass(false);
  // }

  return (
    <SettingsContext.Provider value={[settings as AvailState<AvailSetting>, setSettings]}>
      <UtilitiesContext.Provider value={[utilities as AvailState<AvailUtility>, setUtilities]}>
        {children}
      </UtilitiesContext.Provider>
    </SettingsContext.Provider>
  );
};

Store.displayName = 'Store';

export { Store, ADD_ITEM, REMOVE_ITEM, SET_IN_PROGRESS, SET_CONFIG };
