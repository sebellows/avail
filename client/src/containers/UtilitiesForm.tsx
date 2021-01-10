/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, Fragment, FC, useContext, useCallback } from 'react'
import Prism from 'prismjs'
import styled from 'styled-components'

import { mixin } from '../core/style'
import { classNames } from '../core/utils'
import { useStore } from '../store/useStore'
import { generateConfig } from '../core/config'
import { generateUtility, generateResponsiveUtility } from '../core/build'

import { useClickOutside } from '../hooks/useClickOutside'
import { Control, Dialog, Field, Modal, PillTab, PillTabs, Repeater, Switch } from '../components'

import '../styles/prism.css'

const SwitchRow = styled.div`
  ${mixin.flex({ align: 'center', wrap: true })}
  ${mixin.grid.row}

  .field {
    ${mixin.grid.col}
  }
`

const DialogTitle = styled.h3`
  ${mixin.font.size('h3')}
  ${mixin.font.weight('bold')}
  ${mixin.margin.bottom(0)}
`

const ModifierLabel = ({ text, ...props }: { text: string } & Avail.ComponentProps) => {
  const [label, dispatch] = React.useReducer((labelText: string) => {
    console.log('ModifierLabel', text, labelText)
    switch (labelText) {
      case 'responsive':
        return 'Make responsive utility classes?'
      case 'directions':
        return 'Make utility classes for each direction/side?'
      case 'abbreviate':
        return 'Abbreviate direction/side to first letter?'
      case 'negativeUnits':
        return 'Make utility classes for negative margins?'
      case 'variants':
        return 'Make utility classes for color variants?'
      default:
        return `❀ ${labelText}`
    }
  }, text)

  React.useEffect(() => {
    dispatch()
  }, [])

  return <>{!!label && <span {...props}>{label}</span>}</>
}

export interface UtilitiesFormProps extends Avail.ComponentProps {
  id?: string
  utilities?: Avail.Utilities
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

  const [open, setOpen] = useState(false)
  const [output, setOutput] = useState('// No styles were generated') // TODO: remove default here

  const dialogRef = useRef(null)
  const fieldsetRef = useRef(null)
  const activeIndex = useRef(0)

  React.useEffect(() => {
    // console.log('UtilitiesForm->utilities', Object.keys(utilities))
    initializeUtilities(() => generateConfig(settings))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings])

  const onUpdate = useCallback(
    (config: Avail.StateConfig, event?: any) => {
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
      if ((utilities[activeModelID] as Avail.Utility).responsive) {
        setOutput(generateResponsiveUtility(settings, utilities[activeModelID] as Avail.Utility))
      } else {
        setOutput(generateUtility(settings, utilities[activeModelID] as Avail.Utility))
      }
    }
  }, [activeModelID, settings, utilities])

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
    onAdd: (config: Avail.StateConfig) => {
      addUtility(config)
    },
    onRemove: (config: string | Partial<Avail.StateConfig>) => {
      config = typeof config == 'string' ? { name: config } : config
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
            title={
              <DialogTitle>
                <code>{(utilities[activeModelID] as Avail.Utility).property}</code>
              </DialogTitle>
            }
            onClose={handleClose}
          >
            <div id={`utility-${activeModelID}`}>
              {(utilities[activeModelID] as Avail.Utility).description && (
                <p>{(utilities[activeModelID] as Avail.Utility).description}</p>
              )}
              <fieldset ref={fieldsetRef}>
                <Field className="mb-3">
                  <label htmlFor={`${activeModelID}_class`}>Root class prefix:</label>
                  <Control
                    name={`${activeModelID}_class`}
                    value={(utilities[activeModelID] as Avail.Utility).class}
                    aria-label={'Root class prefix'}
                    onBlur={({ target: { name, value } }) => {
                      updateUtilities({ name, value })
                    }}
                    required
                  />
                </Field>
                {(utilities[activeModelID] as Avail.Utility).modifiers && (
                  <SwitchRow>
                    {Object.entries((utilities[activeModelID] as Avail.Utility).modifiers).map(
                      ([prop, val]) => (
                        <Field className="mb-3">
                          <Switch
                            key={`${activeModelID}-${prop}`}
                            name={`${activeModelID}_modifiers_${prop}`}
                            value={prop}
                            checked={val}
                            onChange={({ target: { name, checked } }) => {
                              updateUtilities({ name, value: checked })
                            }}
                          >
                            <ModifierLabel text={prop}></ModifierLabel>
                          </Switch>
                        </Field>
                      ),
                    )}
                  </SwitchRow>
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
