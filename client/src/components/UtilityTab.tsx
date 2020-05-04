/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useState, useEffect, Ref, useRef } from 'react';
import Prism from 'prismjs';

import { AvailUtility, AvailUtilities } from '../core/contracts';
import { generateUtility, generateResponsiveUtility } from '../core/build';
import { CheckboxInput } from './CheckboxInput';
import { TextInput } from './TextInput';
import { Repeater } from './Repeater';
import { SettingsIcon } from './Icon';
import { Modal } from './Modal';
import { Dialog } from './Dialog';

import { useClickOutside } from '../hooks/useClickOutside';

import { hasOwn, isNil } from '../core/utils/common';
import { classNames } from '../core/utils';

import '../styles/prism.css';
import '../styles/checklist.css';

const initialOutput = 'Code goes here.';

function updateUtility(model: AvailUtility) {
  const util = {
    class: '',
    responsive: false,
    options: [],
  };
  for (const key in util) {
    if (hasOwn(model, key) && util[key] !== model[key]) {
      util[key] = model[key];
      break;
    }
  }
  return util;
}

export interface UtilityTabProps {
  expanded?: boolean;
  error?: Record<string, any>;
  id?: string;
  model: AvailUtility;
  tag?: JSX.IntrinsicAttributes;
}

const UtilityTab = forwardRef<{}, UtilityTabProps>(
  ({ expanded = false, id: controlId, model, tag = 'li', error, ...props }, ref) => {
    const [open, setOpen] = useState(expanded);
    const [responsive, setResponsive] = useState(model.responsive);
    // const [utility, setUtility] = useState(model);
    const [output, setOutput] = useState(initialOutput);

    const dialogRef = useRef(null);
    const fieldsetRef = useRef(null);

    useClickOutside(dialogRef, handleClose, error && Object.keys(error).length > 0);

    useEffect(() => {
      Prism.highlightAll();
    });

    useEffect(() => {
      if (responsive) {
        setOutput(generateResponsiveUtility(model));
      } else {
        setOutput(generateUtility(model));
      }
    }, [model, responsive]);

    const id = controlId || model.id;

    function handleClick(event: any) {
      event.persist();
      setOpen(!open);
    }

    function handleClose(event: any) {
      setOpen(false);
    }

    const Component = tag as 'div';

    const trigger = (
      <Component className="checklist-item-header">
        <div className="d-flex align-items-end">
          <CheckboxInput
            name={`${id}-enabled`}
            checked={model.enabled}
            value={model.id}
            label={model.property as string}
            className="mr-2"
          />

          <code>{model.property}</code>
        </div>

        <button
          type="button"
          className="btn fab mini-fab checklist-menu-toggle"
          onClick={handleClick}
          aria-controls={`checklist-item-${id}`}
          aria-expanded={open}
        >
          <SettingsIcon />
        </button>
      </Component>
    );

    const dialogTitle = (
      <h3 className="text-lg font-weight-bold mb-0">
        <code>{model.property}</code>
      </h3>
    );

    return (
      <Modal show={open} trigger={trigger}>
        <Dialog ref={dialogRef} title={dialogTitle} onClose={handleClose}>
          <div id={`utility-${id}`}>
            {model.description && <p>{model.description}</p>}
            <fieldset ref={fieldsetRef}>
              <TextInput
                name={`${id}-root-class`}
                value={isNil(model.class) ? '' : model.class}
                label="Root class prefix:"
                required
              />
              <CheckboxInput
                name={`${id}-responsive`}
                value="responsive"
                checked={model.responsive}
                label="Make responsive classes?"
              />
              <Repeater options={model.options} error={error && error[id]} />
            </fieldset>
            <output className="output">
              <pre>
                <code className="language-css">{output}</code>
              </pre>
            </output>
          </div>
        </Dialog>
      </Modal>
    );
  },
);

UtilityTab.displayName = 'UtilityTab';

export interface UtilityTabsProps {
  id?: string;
  items: AvailUtilities;
  className?: string;
}

export const UtilityTabs = React.forwardRef<HTMLUListElement, UtilityTabsProps>(
  ({ id, items = {}, ...props }, ref: Ref<HTMLUListElement>) => {
    const models = Object.values(items) as AvailUtility[];

    return (
      <ul ref={ref} id={id} className={classNames('checklist', props.className)}>
        {models.length > 0 &&
          models.map((model: AvailUtility, i: number) => (
            <UtilityTab key={model.id} id={model.id} model={model} />
          ))}
      </ul>
    );
  },
);

export { UtilityTab };
