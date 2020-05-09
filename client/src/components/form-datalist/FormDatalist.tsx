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

export const FormDatalist = forwardRef<{}, FormControlProps>(
  ({ className, isValid, isInvalid, options, value: initialValue = '', ...props }, ref: any) => {
    const [isOpen, setOpen] = useState(false);
    // const [selected, setSelected] = useState(null);
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
        currentPanelRef.classList.add('is-active', 'datalist-panel-enter');

        onAnimationEnd(currentPanelRef, () => {
          console.log('animationend');
          currentPanelRef.classList.remove('datalist-panel-enter');
        });
      } else if (!isOpen && prevOpenState != null) {
        currentPanelRef.classList.add('datalist-panel-leave');

        onAnimationEnd(currentPanelRef, () => {
          currentPanelRef.classList.remove('datalist-panel-leave');
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
        className={classNames('datalist', props.className, isOpen && 'is-open')}
        {...htmlProps}
      >
        <div className="datalist-form-group">
          <div className="datalist-color-control">
            <div className="datalist-color-target" style={{ backgroundColor: color }}></div>
            <input
              type="color"
              className="datalist-color-input"
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
        <div ref={panelRef} className={classNames('datalist-panel')}>
          <ul className="datalist-options">
            {options?.length &&
              (options as OptionProps[]).map(({ name, value: colorValue }) => (
                <li
                  key={name}
                  className={classNames('datalist-option', value === colorValue && 'is-selected')}
                  data-value={colorValue}
                  onClick={(event) => handleSelect(event, colorValue)}
                >
                  <span className="preview-box" style={{ backgroundColor: colorValue }} />
                  <span className="datalist-option-name">{name}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  },
);
