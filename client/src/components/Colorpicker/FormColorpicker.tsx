import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { FormControlProps, OptionProps } from '../../core/contracts';
import {
  classNames,
  containerProps,
  validFormProps,
  ESCAPE,
  DOWN,
  UP,
  ENTER,
  SPACE,
  onAnimationEnd,
  TAB,
} from '../../core/utils';
import { FormControl } from '../FormControl';

import './style.css';
import usePrevious from '../../hooks/usePrevious';
import { useClickOutside } from '../../hooks/useClickOutside';

const FormColorpicker = forwardRef<{}, FormControlProps>(
  ({ className, isValid, isInvalid, options, value: initialValue = '', ...props }, ref: any) => {
    const [isOpen, setOpen] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [color, setColor] = useState('#ffffff');
    const [focusedIndex, setFocusedIndex] = useState(0);

    const prevOpenState = usePrevious(isOpen);

    if (!ref || !ref.current) {
      ref = React.createRef();
    }
    const inputRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
      const { current: currentPanelRef } = panelRef;

      if (isOpen) {
        currentPanelRef.classList.add('is-active', 'colorpicker-panel-enter');

        onAnimationEnd(currentPanelRef, () => {
          console.log('animationend');
          currentPanelRef.classList.remove('colorpicker-panel-enter');
        });
      } else if (!isOpen && prevOpenState != null) {
        currentPanelRef.classList.add('colorpicker-panel-leave');

        onAnimationEnd(currentPanelRef, () => {
          currentPanelRef.classList.remove('colorpicker-panel-leave');
          currentPanelRef.classList.remove('is-active');
        });
      }
    }, [panelRef, prevOpenState, isOpen, ref]);

    useClickOutside(ref, handleClose);

    function handleChange(event: any) {
      setValue(event.target.value);
      if (props.onChange) props.onChange(event);
    }

    function handleColorChange(event: any) {
      console.log(event.target.value);
      const colorValue = event.target.value;
      if (colorValue.length) {
        setValue(event.target.value);
      }
      if (props.onChange) props.onChange(event);
    }

    function handleFocus(event: any) {
      console.log(event);
      setOpen(true);
      if (props.onFocus) props.onFocus(event);
    }

    function handleBlur(event: any) {
      event.persist();
      console.log('handleBlur', event.keyCode);
      if (props.onBlur) props.onBlur(event);
    }

    function handleClose() {
      setOpen(false);
      setFocusedIndex(0);
      if (panelRef.current.classList.contains('is-active')) {
        panelRef.current.classList.remove('is-active');
      }
    }

    function handleSelect(event: any, val: any) {
      // event.preventDefault();
      console.log('handleSelect', val);
      setValue(val);
      setColor(val);
      handleClose();
    }

    function handleKeyUp(event: any) {
      console.log('handleKeyUp->keyCode', event.keyCode);
      switch (event.keyCode) {
        case ESCAPE:
          // setSelected(null);
          handleClose();
          break;
        case DOWN:
          setFocusedIndex(focusedIndex === options.length - 1 ? 0 : focusedIndex + 1);
          break;
        case UP:
          setFocusedIndex(focusedIndex === 0 ? options.length - 1 : focusedIndex - 1);
          break;
        case TAB:
          handleClose();
          // handleBlur(event);
          break;
        case ENTER:
          // setSelected(options[focusedIndex]);
          setValue(event.target.value);
          handleClose();
          break;
        case SPACE:
          if (!isOpen) {
            event.preventDefault();
            setOpen(true);
          }
          break;
        default:
        // do nothing
      }

      if (props.onKeyDown) props.onKeyDown(event);
    }

    const htmlProps = containerProps(props);
    const formProps = validFormProps(props, {
      exclude: ['value', 'onChange', 'onFocus', 'onBlur', 'onKeyUp'],
    });

    return (
      <div
        ref={ref}
        className={classNames('colorpicker', props.className, isOpen && 'is-open')}
        {...htmlProps}
      >
        <div className="colorpicker-form-group">
          <div className="colorpicker-control">
            <div className="colorpicker-target" style={{ backgroundColor: color }}></div>
            <input
              type="color"
              className="colorpicker-input"
              value={color}
              onChange={handleColorChange}
            />
          </div>
          <FormControl
            ref={inputRef}
            {...formProps}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyUp}
            aria-expanded={isOpen}
          />
        </div>
        <div ref={panelRef} className={classNames('colorpicker-panel')}>
          <ul className="colorpicker-options">
            {options?.length &&
              (options as OptionProps[]).map(({ name, value: colorValue }) => (
                <li
                  key={name}
                  className={classNames(
                    'colorpicker-option',
                    value === colorValue && 'is-selected',
                  )}
                  data-value={colorValue}
                  onClick={(event) => handleSelect(event, colorValue)}
                >
                  <span className="preview-box" style={{ backgroundColor: colorValue as string }} />
                  <span className="colorpicker-option-name">{name}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  },
);

FormColorpicker.displayName = 'FormColorpicker';

export { FormColorpicker };
