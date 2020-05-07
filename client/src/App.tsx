/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AnimationEvent, useEffect, useState } from 'react';
import { generateConfig } from './core/new-config';
import { Spinner, UtilityTabs } from './components';
import './App.scss';

const classes = generateConfig();

export default function App() {
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
        <UtilityTabs id="avail-modules" items={model} />
      </form>
    </div>
  );
}
