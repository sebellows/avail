/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AnimationEvent, useEffect, useState } from 'react';
import { generateConfig } from './core/new-config';
import { Checklist, Dialog, Modal, Spinner, UtilityTabs } from './components';
import './App.scss';
import usePrevious from './hooks/usePrevious';

const classes = generateConfig();

export default function App() {
  const [model, setModel] = useState(classes);
  // const [formModel, setFormModel] = useState(classes);
  const [loading, setLoading] = useState(false);
  const [addExitClass, setExitClass] = useState(false);
  // const [show, setShow] = useState(false);
  // const prevShow = usePrevious(show);

  // const handleClose = () => {
  //   if (prevShow !== show) {
  //     setShow(false);
  //   }
  // };
  // const handleShow = () => {
  //   if (prevShow !== show) {
  //     setShow(true);
  //   }
  // };

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
        {/* <Checklist id="avail-modules" items={model} /> */}
      </form>
    </div>
  );
}
