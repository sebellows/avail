/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, Ref, useRef } from 'react';
import Prism from 'prismjs';

import { CollectionObj, AvailUtility, AvailUtilities } from '../core/contracts';
import { generateUtility } from '../core/build';
import { CheckboxInput } from './CheckboxInput';
import { TextInput } from './TextInput';
import { Repeater } from './Repeater';
import { SelectInput } from './SelectInput';
import { SettingsIcon } from './Icon';
import { Collapse } from './Collapse';

import '../styles/prism.css';
import '../styles/checklist.css';
import { hasOwn } from '../core/utils/common';
import { classNames } from '../core/utils';

export interface ChecklistItemProps {
  expanded?: boolean;
  id?: string;
  model: AvailUtility;
}

export interface ChecklistProps {
  id?: string;
  items: AvailUtilities;
  className?: string;
}

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

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  expanded = false,
  id: controlId,
  model,
  ...props
}) => {
  const [open, setOpen] = useState(expanded);
  // const [utility, setUtility] = useState(model);
  const [output, setOutput] = useState(initialOutput);

  // const modelRef = useRef({
  //   class: model.class,
  //   enabled: model.enabled,
  //   options: model.options,
  //   property: model.property,
  //   responsive: model.responsive,
  // });

  useEffect(() => {
    Prism.highlightAll();
  });

  useEffect(() => {
    // if (model != null) {
    const css = generateUtility(model);
    setOutput(css);
    // }
  }, [model]);

  const id = controlId || model.id;

  function handleClick(event: any) {
    event.persist();
    setOpen(!open);
  }

  return (
    <li id={`${id}-module`} className="checklist-item">
      <div className="checklist-item-header">
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
      </div>

      <Collapse in={open}>
        <div id={`checklist-item-${id}`} className="checklist-item-menu">
          <div className="checklist-item-menu-inner">
            This is a C Note
            {model.description && <p>{model.description}</p>}
            <div className="row">
              <div className="col">
                <fieldset>
                  <TextInput
                    name={`${id}-root-class`}
                    value={model.class}
                    label="Root class prefix:"
                  />
                  <CheckboxInput
                    name={`${id}-responsive`}
                    value="responsive"
                    checked={model.responsive}
                    label="Make responsive classes?"
                  />
                  <Repeater options={model.options} />
                </fieldset>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <output className="output">
                  <pre>
                    <code className="language-css">{output}</code>
                  </pre>
                </output>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </li>
  );
};

export const Checklist = React.forwardRef<HTMLUListElement, ChecklistProps>(
  ({ id, items = {}, ...props }, ref: Ref<HTMLUListElement>) => {
    const models = Object.values(items) as AvailUtility[];

    return (
      <ul ref={ref} id={id} className={classNames('checklist', props.className)}>
        {models.length > 0 &&
          models.map((model: AvailUtility, i: number) => (
            <ChecklistItem key={model.id} id={model.id} expanded={i === 0} model={model} />
          ))}
      </ul>
    );
  },
);
