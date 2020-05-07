/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useState, useEffect, Ref, useRef } from 'react';
import Prism from 'prismjs';

import { AvailUtility, AvailUtilities } from '../core/contracts';
import { generateUtility, generateResponsiveUtility } from '../core/build';
import { Repeater } from './Repeater';
import { SettingsIcon } from './Icon';
import { Modal } from './Modal';
import { Dialog } from './Dialog';
import { FormGroup } from './FormGroup';

import { useClickOutside } from '../hooks/useClickOutside';

import { hasOwn } from '../core/utils/common';
import { classNames, collection, LEFT, RIGHT } from '../core/utils';

import '../styles/prism.css';
import '../styles/utility-tabs.css';
import usePrevious from '../hooks/usePrevious';

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
  model: AvailUtility;
  onClick?: (event: any) => void;
  tag?: JSX.IntrinsicAttributes;
}

const UtilityTab = forwardRef<{}, UtilityTabProps>(
  ({ expanded = false, model, onClick, tag = 'li', error, ...props }, ref) => {
    const Component = tag as 'div';

    return (
      <Component className="utility-tab">
        <div className="d-flex align-items-end">
          <FormGroup
            type="checkbox"
            name={`${model.id}-enabled`}
            checked={model.enabled}
            className="mb-0 mr-2"
            value={model.id}
          >
            <code className="font-size-base">{model.property}</code>
          </FormGroup>
        </div>

        <button
          type="button"
          className="btn fab mini-fab utility-tab-toggle"
          onClick={onClick}
          aria-controls={`utility-tab-${model.id}`}
          aria-expanded={props['expanded']}
        >
          <SettingsIcon />
        </button>
      </Component>
    );
  },
);

UtilityTab.displayName = 'UtilityTab';

export interface UtilityTabsProps {
  id?: string;
  items: AvailUtilities;
  className?: string;
}

const DialogTitle = ({ children }) => (
  <h3 className="font-size-lg font-weight-bold mb-0">
    <code>{children}</code>
  </h3>
);

export const UtilityTabs = React.forwardRef<HTMLOListElement, UtilityTabsProps>(
  ({ id, items = {}, ...props }, ref: Ref<HTMLOListElement>) => {
    const [activeModel, setActiveModel] = useState(null);
    const lastActiveModel = usePrevious(activeModel);
    const [utilities, setUtilities] = useState(collection(items, 'id'));
    const [open, setOpen] = useState(false);
    const [output, setOutput] = useState(initialOutput);

    const dialogRef = useRef(null);
    const fieldsetRef = useRef(null);

    useEffect(() => {
      Prism.highlightAll();
    });

    useEffect(() => {
      if (activeModel && lastActiveModel !== activeModel) {
        if (activeModel.responsive) {
          setOutput(generateResponsiveUtility(activeModel));
        } else {
          setOutput(generateUtility(activeModel));
        }
      }
    }, [activeModel, lastActiveModel]);

    useClickOutside(dialogRef, handleClose);

    function handleSelect(model: any) {
      // event.persist();
      utilities.current = model;
      setOpen(!open);
      setActiveModel(utilities.current);
    }

    const handleClickPrev = () => {
      utilities.prev();
      setActiveModel(utilities.current);
    };

    const handleClickNext = () => {
      utilities.next();
      setActiveModel(utilities.current);
    };

    function handleKeyUp(event: any) {
      if (event.keyCode === LEFT) {
        handleClickPrev();
      }
      if (event.keyCode === RIGHT) {
        handleClickNext();
      }
    }

    function handleClose(event: any) {
      setOpen(false);
    }

    function handleUtilityChange(event: any) {
      if (event?.target) {
        if (event?.target.type === 'checkbox') {
          setActiveModel({ ...activeModel, responsive: event.target.checked });
        } else {
          setActiveModel({ ...activeModel, class: event.target.value });
        }
      } else if (Array.isArray(event)) {
        setActiveModel({ ...activeModel, options: event });
      }
    }

    return (
      <>
        <ol ref={ref} id={id} className={classNames('utility-tabs', props.className)}>
          {utilities.size > 0 &&
            utilities.map((utility: AvailUtility) => (
              <UtilityTab
                key={utility.id}
                expanded={activeModel?.id === utility.id}
                model={utility}
                onClick={() => handleSelect(utility)}
              />
            ))}
        </ol>

        <Modal
          show={open && activeModel}
          onKeyUp={handleKeyUp}
          onClickPrev={handleClickPrev}
          onClickNext={handleClickNext}
        >
          {activeModel && (
            <Dialog
              ref={dialogRef}
              title={<DialogTitle>{activeModel.property}</DialogTitle>}
              onClose={handleClose}
            >
              <div id={`utility-${activeModel.id}`}>
                {activeModel.description && <p>{activeModel.description}</p>}
                <fieldset ref={fieldsetRef}>
                  <FormGroup
                    name={`${activeModel.id}-root-class`}
                    value={activeModel.class}
                    label="Root class prefix:"
                    onChange={handleUtilityChange}
                    required
                  />
                  <FormGroup
                    type="checkbox"
                    name={`${activeModel.id}-responsive`}
                    value="responsive"
                    checked={activeModel.responsive}
                    onChange={handleUtilityChange}
                  >
                    <span>Make responsive classes?</span>
                  </FormGroup>
                  <Repeater
                    options={activeModel.options}
                    presets={activeModel?.presets}
                    onChange={handleUtilityChange}
                  />
                </fieldset>
                <output className="output">
                  <pre>
                    <code className="language-css">{output}</code>
                  </pre>
                </output>
              </div>
            </Dialog>
          )}
        </Modal>
      </>
    );
  },
);

export { UtilityTab };
