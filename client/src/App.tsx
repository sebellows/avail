/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  AnimationEvent,
  useEffect,
  useState,
  SyntheticEvent,
  useCallback,
  useRef,
  useReducer,
} from 'react';
import { generateConfig } from './core/config';
import { generateSettings } from './core/settings';
import { Spinner, Tabs, Tab, Button } from './components';
import { SettingsForm } from './containers/SettingsForm';
import { UtilitiesForm } from './containers/UtilitiesForm';
import { FormContext } from './context/FormContext';
// import { store } from './store';

import './App.scss';
import {
  AvailSetting,
  AvailSettings,
  AvailSettingField,
  AvailUtility,
  AvailUtilities,
  OptionProps,
} from './core/contracts';
import { set } from './core/utils';

const initialUtilities = generateConfig();
const initialSettings = generateSettings() as AvailSettings;

function reducer(state: AvailSettings, action) {
  switch (action.type) {
    case 'export':
      return {
        export: { ...state.export, ...{ fields: { ...state.export.fields, ...action.payload } } },
      };
    case 'colorSchemes':
      return { colorSchemes: action.payload };
    case 'global':
      return { global: action.payload };
    case 'border':
      return { border: action.payload };
    case 'mediaQuery':
      return { mediaQuery: action.payload };
    case 'spacing':
      return { spacing: action.payload };
    default:
      throw new Error();
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [utilities, setUtilities] = useState(initialUtilities);
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [addExitClass, setExitClass] = useState(false);

  // const [state, dispatch] = useReducer(reducer, initialSettings);

  const formRef = useRef(null);

  useEffect(() => {
    if (loading) {
      const fadeSpinner = setTimeout(() => {
        setExitClass(true);
      }, 2000);
      return () => clearTimeout(fadeSpinner);
    }
  }, [loading, settings]);

  const updateSettings = useCallback(
    (path: string | string[], value: string) => {
      console.log('updateSettings', settings, path, value);
      setSettings({ ...settings, ...set(settings, path, value) });
    },
    [settings],
  );

  const updateUtilities = useCallback(
    (utility: AvailUtility) => {
      setUtilities({ ...utilities, utility });
    },
    [utilities],
  );

  function handleLoad(event: AnimationEvent) {
    event.persist();
    setLoading(false);
    setExitClass(false);
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    event.persist();
    const values = Object.values(formRef.current).reduce((obj, field: any) => {
      obj[field.name] = field.value;
      return obj;
    }, {});
    console.log('submitted', values);
  }

  const submitStyles = {
    position: 'fixed',
    top: '90vh',
    right: '2rem',
    zIndex: '1100',
  };

  const context = {
    settings,
    updateSettings,
    utilities,
    updateUtilities,
  };

  return (
    <div
      className="App container"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <h1>Avail</h1>

      <h2>CSS Utility Class Generator</h2>

      {loading && <Spinner exit={addExitClass} onAnimationEnd={handleLoad} />}

      <FormContext.Provider value={context}>
        <form ref={formRef} noValidate onSubmit={handleSubmit}>
          <Tabs
            id="avail-config"
            activeKey={activeTab}
            onSelect={(target: string) => setActiveTab(target)}
          >
            <Tab target="settings" title="Global Settings">
              <SettingsForm />
            </Tab>
            <Tab target="utilities" title="Utility Class Configuration">
              <UtilitiesForm id="avail-utilities" utilities={utilities} />
            </Tab>
          </Tabs>
          <Button type="submit" variant="primary" style={submitStyles}>
            Submit
          </Button>
        </form>
      </FormContext.Provider>
    </div>
  );
}
