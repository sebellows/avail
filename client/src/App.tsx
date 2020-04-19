/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { AnimationEvent, useEffect, useState } from 'react';
import { generateConfig } from './core/new-config';
import { Checklist, Modal, Spinner } from './components';
import './App.scss';

const classes = generateConfig();

export default function App() {
  const [model, setModel] = useState(classes);
  // const [formModel, setFormModel] = useState(classes);
  const [loading, setLoading] = useState(false);
  const [addExitClass, setExitClass] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    console.log('isModalOpen', isModalOpen);
    setModalOpen(!isModalOpen);
  };

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

      <button onClick={toggleModal}>open modal</button>

      <h2>CSS Utility Class Generator</h2>

      {loading && <Spinner exit={addExitClass} onAnimationEnd={handleLoad} />}

      <form noValidate>
        <Checklist id="avail-modules" items={model} />
      </form>

      <Modal isOpen={isModalOpen}>
        <button onClick={toggleModal}>close modal</button>
      </Modal>
    </div>
  );
}
