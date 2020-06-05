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
import styled from 'styled-components';
import { produce } from 'immer';
import { generateConfig } from './core/config';
import { generateSettings } from './core/settings';
import { Spinner, Tabs, Tab, Button } from './components';
import { SettingsForm } from './containers/SettingsForm';
import { UtilitiesForm } from './containers/UtilitiesForm';
import { FormContext } from './context/FormContext';

import './App.scss';
import { reducer } from './reducers';
import { AvailSettings } from './core/contracts';

const SubmitButton = styled(Button)`
  position: fixed;
  top: 90vh;
  right: 2rem;
  z-index: 1100;
`;

const initialUtilities = generateConfig();
const initialSettings = generateSettings() as AvailSettings;

export default function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [loading, setLoading] = useState(false);
  const [addExitClass, setExitClass] = useState(false);

  const [settings, dispatchSettings] = useReducer(reducer, initialSettings);
  const [utilities, dispatchUtilities] = useReducer(reducer, initialUtilities);

  const formRef = useRef(null);

  useEffect(() => {
    if (loading) {
      const fadeSpinner = setTimeout(() => {
        setExitClass(true);
      }, 2000);
      return () => clearTimeout(fadeSpinner);
    }
  }, [loading, settings]);

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

  const context = {
    dispatchSettings,
    dispatchUtilities,
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
              <SettingsForm settings={settings} />
            </Tab>
            <Tab target="utilities" title="Utility Class Configuration">
              <UtilitiesForm id="avail-utilities" utilities={utilities} />
            </Tab>
          </Tabs>
          <SubmitButton type="submit" variant="primary">
            Submit
          </SubmitButton>
        </form>
      </FormContext.Provider>
    </div>
  );
}
