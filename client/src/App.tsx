/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AnimationEvent, useEffect, useState, SyntheticEvent, useRef } from 'react';
import styled from 'styled-components';

import { Store } from './store';
import { zIndexes, spacers, toREM } from './core/style';
import { SettingsForm } from './containers/SettingsForm';
import { UtilitiesForm } from './containers/UtilitiesForm';
import { Button, Spinner, Tabs, Tab, Toast } from './components';

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';

const SubmitButton = styled(Button)`
  position: fixed;
  top: 90vh;
  right: ${toREM(spacers.base * 2)};
  z-index: ${zIndexes.submitBtn};
`;

export default function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [loading, setLoading] = useState(false);
  const [addExitClass, setExitClass] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (loading) {
      const fadeSpinner = setTimeout(() => {
        setExitClass(true);
      }, 2000);
      return () => clearTimeout(fadeSpinner);
    }
  }, [loading]);

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

  return (
    <div
      id="App"
      className="container"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <h1>Avail</h1>

      <h2>CSS Utility Class Generator</h2>

      {loading && <Spinner exit={addExitClass} onAnimationEnd={handleLoad} />}

      <Store>
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
              <UtilitiesForm id="avail-utilities" />
            </Tab>
          </Tabs>
          <SubmitButton type="submit" variant="primary">
            Submit
          </SubmitButton>
        </form>
      </Store>
      <Toast autoClose={5000} />
    </div>
  );
}
