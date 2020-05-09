/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AnimationEvent, useEffect, useState } from 'react';
import { generateConfig, generateSettings, toOptions } from './core/new-config';
import { Spinner, Tabs, Tab, UtilityTabs, FormGroup, Repeater } from './components';
import './App.scss';
import { FormDatalist } from './components/form-datalist/FormDatalist';
import { COLORS } from './core/constants';

const classes = generateConfig();
const initialSettings = generateSettings();

export default function App() {
  const [activeTab, setActiveTab] = useState('settings');
  const [model, setModel] = useState(classes);
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [addExitClass, setExitClass] = useState(false);

  useEffect(() => {
    console.log('settings', settings);
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
      className="App"
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <h1>Avail</h1>

      <h2>CSS Utility Class Generator</h2>

      {loading && <Spinner exit={addExitClass} onAnimationEnd={handleLoad} />}

      <div className="d-flex justify-content-center mb-5">
        <FormDatalist options={toOptions(COLORS)} />
      </div>

      <form noValidate>
        <Tabs
          id="avail-config"
          activeKey={activeTab}
          onSelect={(target: string) => setActiveTab(target)}
        >
          <Tab target="settings" title="Global Settings">
            <h1>Configure global settings here!</h1>
            {Object.entries(settings).map(([key, setting]) => {
              const { type, options, label, ...props } = setting as any;
              return (
                <fieldset key={key}>
                  {type === 'text' && (
                    <FormGroup name={`${key}-setting`} label={label} {...props} />
                  )}
                  {type === 'checkbox' && (
                    <FormGroup type="checkbox" name={`${key}-setting`} {...props}>
                      <span>{label}</span>
                    </FormGroup>
                  )}
                  {type === 'checkbox' && <Repeater options={options} {...props} />}
                </fieldset>
              );
            })}
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
