/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  forwardRef,
  useState,
  useEffect,
  Ref,
  useRef,
  Fragment,
  FC,
  ChangeEvent,
} from 'react';
import Prism from 'prismjs';

import { usePrevious } from '../hooks/usePrevious';
import { useClickOutside } from '../hooks/useClickOutside';
import { AvailUtility, AvailUtilities, ComponentProps } from '../core/contracts';
import { generateUtility, generateResponsiveUtility } from '../core/build';
import { classNames } from '../core/utils';

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
import { FormContext, FormContextState } from '../context/FormContext';

const DialogTitle = ({ children }) => (
  <h3 className="font-size-lg font-weight-bold mb-0">
    <code>{children}</code>
  </h3>
);

export interface UtilitiesFormProps extends ComponentProps {
  utilities: AvailUtilities;
}

const UtilitiesForm: FC<UtilitiesFormProps> = React.memo(({ id, utilities, ...props }) => {
  const [activeModel, setActiveModel] = useState(null);
  const lastActiveModel = usePrevious(activeModel);
  const [open, setOpen] = useState(false);
  const [output, setOutput] = useState('Code goes here'); // TODO: remove default here

  const dialogRef = useRef(null);
  const fieldsetRef = useRef(null);
  const activeIndex = useRef(0);

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

  const indices = Object.keys(utilities);

  function handleSelect(utility: any) {
    setOpen(!open);
    activeIndex.current = indices.indexOf(utility.id);
    setActiveModel(utility);
  }

  const handleClickPrev = (event: any) => {
    const { current: _activeIndex } = activeIndex;

    if (_activeIndex) {
      activeIndex.current = _activeIndex === 0 ? indices.length - 1 : _activeIndex - 1;
      setActiveModel(utilities[indices[activeIndex.current]]);
    }
  };

  const handleClickNext = (event: any) => {
    const { current: _activeIndex } = activeIndex;

    if (_activeIndex) {
      activeIndex.current = _activeIndex === indices.length - 1 ? 0 : _activeIndex + 1;
      setActiveModel(utilities[indices[activeIndex.current]]);
    }
  };

  function handleClose() {
    setOpen(false);
  }

  // function handleUtilityChange(event: any) {
  //   if (event?.target) {
  //     if (event?.target.type === 'checkbox') {
  //       setActiveModel({ ...activeModel, responsive: event.target.checked });
  //     } else {
  //       setActiveModel({ ...activeModel, class: event.target.value });
  //     }
  //   } else if (Array.isArray(event)) {
  //     setActiveModel({ ...activeModel, items: event });
  //   }
  // }

  return (
    <FormContext.Consumer>
      {({ dispatchUtilities }) => (
        <Fragment>
          <PillTabs id={id} className={classNames('utility-tabs', props.className)}>
            {Object.values(utilities).map((utility: AvailUtility, i: number) => (
              <PillTab
                key={`${utility.id}-${i}`}
                id={`pill-tab-${utility.id}`}
                value={`${utility.id}_enabled`}
                checkboxID={`${utility.id}_enabled`}
                checked={utility.enabled}
                onChange={({ target: { name, checked } }) =>
                  dispatchUtilities({ name, value: `${checked}` })
                }
                selected={activeModel?.id === utility.id}
                onSelect={() => handleSelect(utility)}
              >
                <code className="font-size-base">{utility.property}</code>
              </PillTab>
            ))}
          </PillTabs>

          <Modal
            show={open && activeModel}
            onClose={handleClose}
            onClickPrev={handleClickPrev}
            onClickNext={handleClickNext}
          >
            {activeModel?.id && (
              <Dialog
                ref={dialogRef}
                title={<DialogTitle>{activeModel.property}</DialogTitle>}
                onClose={handleClose}
              >
                <div id={`utility-${activeModel.id}`}>
                  {activeModel.description && <p>{activeModel.description}</p>}
                  <fieldset ref={fieldsetRef}>
                    <Field>
                      <label htmlFor={`${activeModel.id}_class`}>Root class prefix:</label>
                      <Control
                        name={`${activeModel.id}_class`}
                        value={activeModel.class}
                        aria-label={'Root class prefix'}
                        onBlur={(event: any) => {
                          // handleUtilityChange(event);
                          const { name, value } = event.target;
                          dispatchUtilities({ name, value });
                        }}
                        required
                      />
                    </Field>
                    <ToggleControl
                      name={`${activeModel.id}_responsive`}
                      value="responsive"
                      checked={activeModel.responsive}
                      onChange={(event) => {
                        // handleUtilityChange(event);
                        const { name, value } = event.target;
                        dispatchUtilities({ name, value });
                      }}
                    >
                      <span>Make responsive classes?</span>
                    </ToggleControl>
                    <Repeater
                      {...activeModel}
                      id={`${activeModel.id}`}
                      onChange={(event) => {
                        // handleUtilityChange(event);
                        const { name, value } = event.target;
                        dispatchUtilities({ name, value });
                      }}
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
        </Fragment>
      )}
    </FormContext.Consumer>
  );
});

UtilitiesForm.displayName = 'UtilitiesForm';

export { UtilitiesForm };
