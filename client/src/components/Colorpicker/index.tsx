import React, { forwardRef, Ref, useState, useRef, useEffect } from 'react';
import { OptionProps } from '../../core/contracts';
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

import usePrevious from '../../hooks/usePrevious';
import { useClickOutside } from '../../hooks/useClickOutside';
import { ControlProps } from '../Control';
import { Styled } from './styles';

const Colorpicker = forwardRef<{}, ControlProps>(
  (
    { className, isValid, isInvalid, options, value: initialValue = '', ...props },
    ref: Ref<any>,
  ) => {
    const [isOpen, setOpen] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [color, setColor] = useState('#ffffff');
    const [focusedIndex, setFocusedIndex] = useState(0);

    const prevOpenState = usePrevious(isOpen);

    if (!ref || !('current' in ref)) {
      ref = React.createRef();
    }
    const inputRef = useRef(null);
    const panelRef = useRef(null);

    useEffect(() => {
      if (value !== color) {
        setColor(value as string);
      }
    }, [color, setColor, value]);

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
      console.log('handleSelect', val);
      setValue(val);
      setColor(val);
      handleClose();
    }

    function handleKeyUp(event: any) {
      console.log('handleKeyUp->keyCode', event.keyCode);
      switch (event.keyCode) {
        case ESCAPE:
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
          break;
        case ENTER:
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
      <Styled.Wrapper
        ref={ref}
        className={classNames('colorpicker', className, isOpen && 'is-open')}
        {...htmlProps}
      >
        <Styled.Field className="colorpicker-form-group">
          <Styled.ColorControl className="colorpicker-control">
            <Styled.ColorTarget
              className="colorpicker-target"
              style={{ backgroundColor: color }}
            ></Styled.ColorTarget>
            <Styled.ColorInput
              type="color"
              className="colorpicker-input"
              value={color}
              onChange={handleColorChange}
            />
          </Styled.ColorControl>
          <Styled.Control
            ref={inputRef}
            {...formProps}
            value={value}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyUp}
            aria-expanded={isOpen}
          />
        </Styled.Field>
        <Styled.Panel
          ref={panelRef}
          {...{ open: isOpen }}
          className={classNames('colorpicker-panel')}
        >
          <Styled.Options className="colorpicker-options">
            {options?.length &&
              (options as OptionProps[]).map(({ name, value: colorValue }) => (
                <Styled.Option
                  key={name}
                  className={classNames(
                    'colorpicker-option',
                    value === colorValue && 'is-selected',
                  )}
                  data-value={colorValue}
                  onClick={(event) => handleSelect(event, colorValue)}
                >
                  <Styled.PreviewBox
                    className="preview-box"
                    style={{ backgroundColor: colorValue as string }}
                  />
                  <span className="colorpicker-option-name">{name}</span>
                </Styled.Option>
              ))}
          </Styled.Options>
        </Styled.Panel>
      </Styled.Wrapper>
    );
  },
);

Colorpicker.displayName = 'Colorpicker';

export { Colorpicker };
