/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useState, useEffect, Ref, useRef } from 'react';
import Prism from 'prismjs';

import { usePrevious } from '../hooks/usePrevious';
import { useClickOutside } from '../hooks/useClickOutside';
import { AvailUtility, AvailUtilities, ComponentProps } from '../core/contracts';
import { generateUtility, generateResponsiveUtility } from '../core/build';
import { classNames, collection, LEFT, RIGHT } from '../core/utils';

import {
  Control,
  Dialog,
  Field,
  Modal,
  PillTab,
  PillTabs,
  Repeater,
  ToggleControl,
} from '../components';

import '../styles/prism.css';

// function updateUtility(model: AvailUtility) {
//   const util = {
//     class: '',
//     responsive: false,
//     items: [],
//   };
//   for (const key in util) {
//     if (hasOwn(model, key) && util[key] !== model[key]) {
//       util[key] = model[key];
//       break;
//     }
//   }
//   return util;
// }

const DialogTitle = ({ children }) => (
  <h3 className="font-size-lg font-weight-bold mb-0">
    <code>{children}</code>
  </h3>
);

export interface UtilitiesFormProps extends ComponentProps {
  utilities: AvailUtilities;
}

const UtilitiesForm = forwardRef<HTMLOListElement, UtilitiesFormProps>(
  ({ id, utilities: initialUtilities = {}, ...props }, ref: Ref<HTMLOListElement>) => {
    const [activeModel, setActiveModel] = useState(null);
    const lastActiveModel = usePrevious(activeModel);
    const [utilities, setUtilities] = useState(collection(initialUtilities, 'id'));
    const [open, setOpen] = useState(false);
    const [output, setOutput] = useState('Code goes here'); // TODO: remove default here

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
    }, [activeModel, lastActiveModel, utilities]);

    useClickOutside(dialogRef, handleClose);

    function handleSelect(utility: any) {
      utilities.current = utility;
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

    function handleClose() {
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
        <PillTabs id={id} className={classNames('utility-tabs', props.className)}>
          {utilities.size > 0 &&
            utilities.map((utility: AvailUtility) => (
              <PillTab
                key={utility.id}
                id={`pill-tab-${id}`}
                checked={utility.enabled}
                selected={activeModel?.id === utility.id}
                value={utility}
                onSelect={() => handleSelect(utility)}
              >
                <code className="font-size-base">{utility.property}</code>
              </PillTab>
            ))}
        </PillTabs>

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

UtilitiesForm.displayName = 'UtilitiesForm';

export { UtilitiesForm };
