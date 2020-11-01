/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, Fragment, FC, useContext, useCallback } from 'react'
import Prism from 'prismjs'

import { usePrevious } from '../hooks/usePrevious'
import { useClickOutside } from '../hooks/useClickOutside'
import {
  AvailUtility,
  AvailUtilities,
  ComponentProps,
  StateConfig,
  AvailConfig,
} from '../core/contracts'
import { generateUtility, generateResponsiveUtility } from '../core/build'
import { classNames, get } from '../core/utils'

import {
  Control,
  Dialog,
  Field,
  Modal,
  PillTab,
  PillTabs,
  Repeater,
  ToggleControl,
} from '../components'

import '../styles/prism.css'
import { useStore } from '../store/useStore'
import { generateConfig } from '../core/config'
import { useFirstMountState } from '../hooks'

const DialogTitle = ({ children }) => (
  <h3 className="font-size-lg font-weight-bold mb-0">
    <code>{children}</code>
  </h3>
)

export interface UtilitiesFormProps extends ComponentProps {
  utilities?: AvailUtilities
}

const UtilitiesForm: FC<UtilitiesFormProps> = React.memo(({ id, ...props }) => {
  const {
    settings,
    utilities,
    updateUtilities,
    addUtility,
    initializeUtilities,
    removeUtility,
  } = useStore()

  const [activeModelID, setActiveModelID] = useState(null)
  // const lastActiveModelID = usePrevious(activeModelID);
  const [open, setOpen] = useState(false)
  const [output, setOutput] = useState('// No styles were generated') // TODO: remove default here
  const isFirstMount = useFirstMountState()

  const dialogRef = useRef(null)
  const fieldsetRef = useRef(null)
  const activeIndex = useRef(0)

  React.useEffect(() => {
    console.log('UtilitiesForm->utilities', Object.keys(utilities))
    // if (Object.keys(utilities).length === 0) {
    initializeUtilities(() => generateConfig(settings))
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings])

  const onUpdate = useCallback(
    (config: StateConfig, event: any) => {
      console.log('UtilitiesForm->onUpdate', event, config, utilities)
      updateUtilities(config)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updateUtilities],
  )

  useEffect(() => {
    Prism.highlightAll()
  })

  useEffect(() => {
    if (activeModelID) {
      if ((utilities[activeModelID] as AvailUtility).responsive) {
        setOutput(generateResponsiveUtility(settings, utilities[activeModelID] as AvailUtility))
      } else {
        setOutput(generateUtility(settings, utilities[activeModelID] as AvailUtility))
      }
    }
  }, [activeModelID, settings, utilities])

  useEffect(() => {
    console.log('UtilitiesForm->settings', settings)
  }, [settings])

  useClickOutside(dialogRef, handleClose)

  const indices = Object.keys(utilities)

  function handleSelect(utilityID: string) {
    setOpen(!open)
    activeIndex.current = indices.indexOf(utilityID)
    setActiveModelID(utilityID)
  }

  const handleClickPrev = () => {
    const { current: _activeIndex } = activeIndex

    if (_activeIndex) {
      activeIndex.current = _activeIndex === 0 ? indices.length - 1 : _activeIndex - 1
      setActiveModelID(indices[activeIndex.current])
    }
  }

  const handleClickNext = () => {
    const { current: _activeIndex } = activeIndex

    if (_activeIndex) {
      activeIndex.current = _activeIndex === indices.length - 1 ? 0 : _activeIndex + 1
      setActiveModelID(indices[activeIndex.current])
    }
  }

  function handleClose() {
    setOpen(false)
  }

  const repeaterHandlers = {
    onAdd: (config: StateConfig) => {
      addUtility(config)
    },
    onRemove: (config: string | Partial<StateConfig>) => {
      config = typeof config == 'string' ? { name: config } : config
      console.log('onRemove', config)
      removeUtility(config)
    },
  }

  return (
    <Fragment>
      <PillTabs id={id} className={classNames('utility-tabs', props.className)}>
        {Object.values(utilities).map((utility: any, i: number) => (
          <PillTab
            key={`${utility.id}-${i}`}
            id={`pill-tab-${utility.id}`}
            value={`${utility.id}_enabled`}
            checkboxID={`${utility.id}_enabled`}
            checked={utility.enabled}
            onChange={({ target: { name, checked } }) => {
              updateUtilities({ name, value: `${checked}` })
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
            title={<DialogTitle>{(utilities[activeModelID] as AvailUtility).property}</DialogTitle>}
            onClose={handleClose}
          >
            <div id={`utility-${activeModelID}`}>
              {(utilities[activeModelID] as AvailUtility).description && (
                <p>{(utilities[activeModelID] as AvailUtility).description}</p>
              )}
              <fieldset ref={fieldsetRef}>
                <Field className="mb-3">
                  <label htmlFor={`${activeModelID}_class`}>Root class prefix:</label>
                  <Control
                    name={`${activeModelID}_class`}
                    value={(utilities[activeModelID] as AvailUtility).class}
                    aria-label={'Root class prefix'}
                    onBlur={({ target: { name, value } }) => {
                      updateUtilities({ name, value })
                    }}
                    required
                  />
                </Field>
                <ToggleControl
                  name={`${activeModelID}_responsive`}
                  className="mb-3"
                  value={`${activeModelID}-responsive`}
                  checked={!!(utilities[activeModelID] as AvailUtility).responsive}
                  onChange={({ target: { name, checked: value } }) => {
                    updateUtilities({ name, value })
                  }}
                >
                  <span>Make responsive classes?</span>
                </ToggleControl>
                {(utilities[activeModelID] as AvailUtility).subproperties && (
                  <div className="d-flex align-items-center mb-3">
                    {Object.entries((utilities[activeModelID] as AvailUtility).subproperties).map(
                      ([prop, val]) => (
                        <ToggleControl
                          key={`${activeModelID}-${prop}`}
                          name={`${activeModelID}_subproperties_${prop}`}
                          value={prop}
                          checked={val}
                          onChange={({ target: { name, checked } }) => {
                            updateUtilities({ name, value: checked })
                          }}
                        >
                          <span>Make utility classes for {prop}?</span>
                        </ToggleControl>
                      ),
                    )}
                  </div>
                )}
                <Repeater
                  {...utilities[activeModelID]}
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
  )
})

UtilitiesForm.displayName = 'UtilitiesForm'

export { UtilitiesForm }
