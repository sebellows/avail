/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useState, useEffect, Ref, useRef } from 'react';
import styled from 'styled-components';
import Prism from 'prismjs';

import { usePrevious } from '../hooks/usePrevious';
import { useClickOutside } from '../hooks/useClickOutside';
import { AvailUtility, AvailUtilities, ComponentProps } from '../core/contracts';
import { color, mixin, radius, transition } from '../core/style';
import { generateUtility, generateResponsiveUtility } from '../core/build';
import { hasOwn, classNames, collection, LEFT, RIGHT } from '../core/utils';

import { Field } from './Field';
import { Modal } from './Modal';
import { Dialog } from './Dialog';
import { Control } from './Control';
import { SettingsIcon } from './Icon';
import { Repeater } from './Repeater';
import { ToggleControl } from './ToggleControl';

import '../styles/prism.css';

const initialOutput = 'Code goes here.';

function updateUtility(model: AvailUtility) {
  const util = {
    class: '',
    responsive: false,
    items: [],
  };
  for (const key in util) {
    if (hasOwn(model, key) && util[key] !== model[key]) {
      util[key] = model[key];
      break;
    }
  }
  return util;
}

export interface UtilityTabProps extends ComponentProps {
  expanded?: boolean;
  error?: Record<string, any>;
  model: AvailUtility;
  onClick?: (event: any) => void;
  tag?: JSX.IntrinsicAttributes;
}

/** Utility Tabs */
export const Styled = {
  Tabs: styled.ol`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    grid-gap: 1rem;
    list-style: none;
    ${mixin.padding.all(3)}
  `,
  Tab: styled.li`
    background-color: ${color.bg.body};
    border-radius: ${radius.lg};
    ${mixin.shadow(0, 1)}
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mixin.padding.all(1, 2)}
    width: 100%;
    transition: box-shadow ${transition.duration.easeIn} ${transition.timing.fastOutSlowIn};

    &:hover {
      background-color: ${color.bg.light};
      ${mixin.shadow(2, 3)}
    }
  `,
  Toggle: styled.button`
    ${mixin.padding.all(2)}
    ${mixin.inlineFlexCenter}
    flex-direction: column;
    flex: none;
  `,
};

const UtilityTab = forwardRef<{}, UtilityTabProps>(
  ({ expanded = false, model, onClick, as = 'li', error, ...props }, ref) => {
    return (
      <Styled.Tab as={as} className={classNames('utility-tab', props.className)}>
        <div className="d-flex align-items-end">
          <ToggleControl
            name={`${model.id}-enabled`}
            checked={model.enabled}
            className="mb-0 mr-2"
            value={model.id}
          >
            <code className="font-size-base">{model.property}</code>
          </ToggleControl>
        </div>

        <Styled.Toggle
          type="button"
          className="btn fab mini-fab utility-tab-toggle"
          onClick={onClick}
          aria-controls={`utility-tab-${model.id}`}
          aria-expanded={props['expanded']}
        >
          <SettingsIcon />
        </Styled.Toggle>
      </Styled.Tab>
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

const UtilityTabs = React.forwardRef<HTMLOListElement, UtilityTabsProps>(
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
        setActiveModel({ ...activeModel, items: event });
      }
    }

    return (
      <>
        <Styled.Tabs ref={ref} id={id} className={classNames('utility-tabs', props.className)}>
          {utilities.size > 0 &&
            utilities.map((utility: AvailUtility) => (
              <UtilityTab
                key={utility.id}
                expanded={activeModel?.id === utility.id}
                model={utility}
                onClick={() => handleSelect(utility)}
              />
            ))}
        </Styled.Tabs>

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
                  <Field>
                    <label htmlFor={`${activeModel.id}-root-class`}>Root class prefix:</label>
                    <Control
                      name={`${activeModel.id}-root-class`}
                      value={activeModel.class}
                      aria-label="Root class prefix"
                      onChange={handleUtilityChange}
                      required
                    />
                  </Field>
                  <ToggleControl
                    name={`${activeModel.id}-responsive`}
                    value="responsive"
                    checked={activeModel.responsive}
                    onChange={handleUtilityChange}
                  >
                    <span>Make responsive classes?</span>
                  </ToggleControl>
                  <Repeater
                    {...activeModel}
                    id={`${activeModel.id}-items`}
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

UtilityTab.displayName = 'UtilityTab';
UtilityTabs.displayName = 'UtilityTabs';

export { UtilityTab, UtilityTabs };
