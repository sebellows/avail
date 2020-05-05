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
import { classNames, collection } from '../core/utils';

import '../styles/prism.css';
import '../styles/checklist.css';
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
  // onClickPrev?: Function;
  // onClickNext?: Function;
  tag?: JSX.IntrinsicAttributes;
}

const UtilityTab = forwardRef<{}, UtilityTabProps>(
  ({ expanded = false, model, onClick, tag = 'li', error, ...props }, ref) => {
    // const [open, setOpen] = useState(expanded);
    // const [responsive, setResponsive] = useState(model.responsive);
    // const [utility, setUtility] = useState(model);
    // const [output, setOutput] = useState(initialOutput);

    // useEffect(() => {
    //   Prism.highlightAll();
    // });

    // useEffect(() => {
    //   if (responsive) {
    //     setOutput(generateResponsiveUtility(model));
    //   } else {
    //     setOutput(generateUtility(model));
    //   }
    // }, [model, responsive]);

    // function handleClick(event: any) {
    //   event.persist();
    //   setOpen(!open);
    // }

    const Component = tag as 'div';

    return (
      <Component className="checklist-item-header">
        <div className="d-flex align-items-end">
          <CheckboxInput
            name={`${model.id}-enabled`}
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
          onClick={onClick}
          aria-controls={`checklist-item-${model.id}`}
          aria-expanded={props['expanded']}
        >
          <SettingsIcon />
        </button>
      </Component>
    );

    // return (
    //   <Modal show={open} trigger={trigger} onClickPrev={onClickPrev} onClickNext={onClickNext}>
    //     <Dialog ref={dialogRef} title={dialogTitle} onClose={handleClose}>
    //       <div id={`utility-${model.id}`}>
    //         {model.description && <p>{model.description}</p>}
    //         <fieldset ref={fieldsetRef}>
    //           <TextInput
    //             name={`${model.id}-root-class`}
    //             value={isNil(model.class) ? '' : model.class}
    //             label="Root class prefix:"
    //             required
    //           />
    //           <CheckboxInput
    //             name={`${model.id}-responsive`}
    //             value="responsive"
    //             checked={model.responsive}
    //             label="Make responsive classes?"
    //           />
    //           <Repeater options={model.options} error={error && error[model.id]} />
    //         </fieldset>
    //         <output className="output">
    //           <pre>
    //             <code className="language-css">{output}</code>
    //           </pre>
    //         </output>
    //       </div>
    //     </Dialog>
    //   </Modal>
    // );
  },
);

UtilityTab.displayName = 'UtilityTab';

export interface UtilityTabsProps {
  id?: string;
  items: AvailUtilities;
  className?: string;
}

const DialogTitle = ({ children }) => (
  <h3 className="text-lg font-weight-bold mb-0">
    <code>{children}</code>
  </h3>
);

export const UtilityTabs = React.forwardRef<HTMLUListElement, UtilityTabsProps>(
  ({ id, items = {}, ...props }, ref: Ref<HTMLUListElement>) => {
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
        <ul ref={ref} id={id} className={classNames('checklist', props.className)}>
          {utilities.size > 0 &&
            utilities.map((utility: AvailUtility) => (
              <UtilityTab
                key={utility.id}
                expanded={activeModel?.id === utility.id}
                model={utility}
                onClick={() => handleSelect(utility)}
              />
            ))}
        </ul>

        <Modal
          show={open && activeModel}
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
                  <TextInput
                    name={`${activeModel.id}-root-class`}
                    value={activeModel.class}
                    label="Root class prefix:"
                    onChange={handleUtilityChange}
                    required
                  />
                  <CheckboxInput
                    name={`${activeModel.id}-responsive`}
                    value="responsive"
                    checked={activeModel.responsive}
                    label="Make responsive classes?"
                    onChange={handleUtilityChange}
                  />
                  <Repeater options={activeModel.options} onChange={handleUtilityChange} />
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
