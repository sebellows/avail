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
  useContext,
  useCallback,
} from 'react';
import Prism from 'prismjs';

import { usePrevious } from '../hooks/usePrevious';
import { useClickOutside } from '../hooks/useClickOutside';
import { AvailUtility, AvailUtilities, ComponentProps, StateConfig } from '../core/contracts';
import { generateUtility, generateResponsiveUtility } from '../core/build';
import { classNames, get } from '../core/utils';

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
import { UtilitiesContext, SET_CONFIG, SettingsContext, ADD_ITEM, REMOVE_ITEM } from '../store';

const DialogTitle = ({ children }) => (
  <h3 className="font-size-lg font-weight-bold mb-0">
    <code>{children}</code>
  </h3>
);

export interface UtilitiesFormProps extends ComponentProps {
  utilities?: AvailUtilities;
}

const UtilitiesForm: FC<UtilitiesFormProps> = React.memo(({ id, ...props }) => {
  const [settings] = useContext(SettingsContext);
  const [utilities, setUtilities] = useContext(UtilitiesContext);

  const [activeModelID, setActiveModelID] = useState(null);
  // const lastActiveModelID = usePrevious(activeModelID);
  const [open, setOpen] = useState(false);
  const [output, setOutput] = useState('// No styles were generated'); // TODO: remove default here

  const dialogRef = useRef(null);
  const fieldsetRef = useRef(null);
  const activeIndex = useRef(0);

  const onUpdate = useCallback(
    (config: StateConfig) => {
      setUtilities({ type: SET_CONFIG, config });
    },
    [setUtilities],
  );

  useEffect(() => {
    Prism.highlightAll();
  });

  useEffect(() => {
    if (activeModelID) {
      if (utilities.config[activeModelID].responsive) {
        setOutput(generateResponsiveUtility(settings.config, utilities.config[activeModelID]));
      } else {
        setOutput(generateUtility(settings.config, utilities.config[activeModelID]));
      }
    }
  }, [activeModelID, settings, utilities]);

  useClickOutside(dialogRef, handleClose);

  const indices = Object.keys(utilities.config);

  function handleSelect(utilityID: string) {
    setOpen(!open);
    activeIndex.current = indices.indexOf(utilityID);
    setActiveModelID(utilityID);
  }

  const handleClickPrev = () => {
    const { current: _activeIndex } = activeIndex;

    if (_activeIndex) {
      activeIndex.current = _activeIndex === 0 ? indices.length - 1 : _activeIndex - 1;
      setActiveModelID(indices[activeIndex.current]);
    }
  };

  const handleClickNext = () => {
    const { current: _activeIndex } = activeIndex;

    if (_activeIndex) {
      activeIndex.current = _activeIndex === indices.length - 1 ? 0 : _activeIndex + 1;
      setActiveModelID(indices[activeIndex.current]);
    }
  };

  function handleClose() {
    setOpen(false);
  }

  const repeaterHandlers = {
    onAdd: (config: StateConfig) => {
      setUtilities({ type: ADD_ITEM, config });
    },
    onRemove: (config: string | Partial<StateConfig>) => {
      config = typeof config == 'string' ? { name: config } : config;
      console.log('onRemove', config);
      setUtilities({ type: REMOVE_ITEM, config });
    },
  };

  return (
    <Fragment>
      <PillTabs id={id} className={classNames('utility-tabs', props.className)}>
        {Object.values(utilities.config).map((utility: AvailUtility, i: number) => (
          <PillTab
            key={`${utility.id}-${i}`}
            id={`pill-tab-${utility.id}`}
            value={`${utility.id}_enabled`}
            checkboxID={`${utility.id}_enabled`}
            checked={utility.enabled}
            onChange={({ target: { name, checked } }) => {
              setUtilities({ type: SET_CONFIG, config: { name, value: `${checked}` } });
            }}
            selected={activeModelID === utility.id}
            onSelect={() => handleSelect(utility.id)}
          >
            <code className="font-size-base">{utility.property}</code>
          </PillTab>
        ))}
      </PillTabs>

      <Modal
        show={open && activeModelID}
        onClose={handleClose}
        onClickPrev={handleClickPrev}
        onClickNext={handleClickNext}
      >
        {activeModelID && (
          <Dialog
            ref={dialogRef}
            title={<DialogTitle>{utilities.config[activeModelID].property}</DialogTitle>}
            onClose={handleClose}
          >
            <div id={`utility-${activeModelID}`}>
              {utilities.config[activeModelID].description && (
                <p>{utilities.config[activeModelID].description}</p>
              )}
              <fieldset ref={fieldsetRef}>
                <Field className="mb-3">
                  <label htmlFor={`${activeModelID}_class`}>Root class prefix:</label>
                  <Control
                    name={`${activeModelID}_class`}
                    value={utilities.config[activeModelID].class}
                    aria-label={'Root class prefix'}
                    onBlur={({ target: { name, value } }) => {
                      setUtilities({ type: SET_CONFIG, config: { name, value } });
                    }}
                    required
                  />
                </Field>
                <ToggleControl
                  name={`${activeModelID}_responsive`}
                  className="mb-3"
                  value={`${activeModelID}-responsive`}
                  checked={!!utilities.config[activeModelID].responsive}
                  onChange={({ target: { name, checked } }) => {
                    setUtilities({ type: SET_CONFIG, config: { name, value: checked } });
                  }}
                >
                  <span>Make responsive classes?</span>
                </ToggleControl>
                {utilities.config[activeModelID].subproperties && (
                  <div className="d-flex align-items-center mb-3">
                    {Object.entries(utilities.config[activeModelID].subproperties).map(
                      ([prop, val]) => (
                        <ToggleControl
                          key={`${activeModelID}-${prop}`}
                          name={`${activeModelID}_subproperties_${prop}`}
                          value={prop}
                          checked={val}
                          onChange={({ target: { name, checked } }) => {
                            setUtilities({ type: SET_CONFIG, config: { name, value: checked } });
                          }}
                        >
                          <span>Make utility classes for {prop}?</span>
                        </ToggleControl>
                      ),
                    )}
                  </div>
                )}
                <Repeater
                  {...utilities.config[activeModelID]}
                  id={activeModelID}
                  onUpdate={onUpdate}
                  {...repeaterHandlers}
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
  );
});

UtilitiesForm.displayName = 'UtilitiesForm';

export { UtilitiesForm };
