/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AnimationEvent, useEffect, useState } from 'react';
import { generateConfig } from './core/config';
import { generateSettings } from './core/settings';
import { Spinner, Tabs, Tab } from './components';
import { SettingsForm } from './containers/SettingsForm';
import { UtilitiesForm } from './containers/UtilitiesForm';

import './App.scss';

const initialUtilities = generateConfig();
const initialSettings = generateSettings();

export default function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [utilities, setUtilities] = useState(initialUtilities);
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [addExitClass, setExitClass] = useState(false);

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

      <form noValidate>
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
      </form>
    </div>
  );
}
