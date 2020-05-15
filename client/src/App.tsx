/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AnimationEvent, useEffect, useState } from 'react';
// import { toOptions } from './core/models/Option';
import { generateConfig } from './core/config';
import { generateSettings } from './core/settings';
import { Spinner, Tabs, Tab, UtilityTabs } from './components';
// import { COLORS } from './core/constants';
import { SettingsForm } from './containers/SettingsForm';
import './App.scss';

const classes = generateConfig();
const initialSettings = generateSettings();

export default function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [model, setModel] = useState(classes);
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
            <UtilityTabs id="avail-modules" items={model} />
          </Tab>
        </Tabs>
      </form>
    </div>
  );
}
