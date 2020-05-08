/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AnimationEvent, useEffect, useState } from 'react';
import { generateConfig } from './core/new-config';
import { Spinner, Tabs, Tab, UtilityTabs } from './components';
import './App.scss';

const classes = generateConfig();

export default function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [model, setModel] = useState(classes);
  const [loading, setLoading] = useState(false);
  const [addExitClass, setExitClass] = useState(false);

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

  return (
    <div
      className="App"
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
            <h1>Configure global settings here!</h1>
          </Tab>
          <Tab target="utilities" title="Utility Class Configuration">
            <UtilityTabs id="avail-modules" items={model} />
          </Tab>
          {/* <ol>
            <Tab>Global Settings</Tab>
            <Tab>Utility Class Configuration</Tab>
          </ol>

          <Panel>Settings</Panel>
          <Panel>
            <UtilityTabs id="avail-modules" items={model} />
          </Panel> */}
        </Tabs>
      </form>
    </div>
  );
}
