import React, { forwardRef, Ref, useState, useRef, useEffect, useCallback } from 'react';
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
  Color,
} from '../../core/utils';
import { ControlProps } from '../Control';
import { OptionProps } from '../../core/contracts';
import { useClickOutside } from '../../hooks/useClickOutside';
import { Styled } from './styles';

function coerceToHexColor(value: string) {
  if (Color.isHexColor(value)) {
    return value;
  } else if (Color.isColor(value)) {
    return Color(value).hex().toString();
  }
  return '#000000';
}

const Colorpicker = forwardRef<HTMLDivElement, ControlProps>(
  (
    { className, isValid, isInvalid: initialInvalid, options, value: initialValue, ...props },
    ref: Ref<HTMLDivElement>,
  ) => {
    const [isOpen, setOpen] = useState(false);
    const [value, setValue] = useState(initialValue);
    const [color, setColor] = useState(initialValue);
    const [modelValue, setModelValue] = useState(initialValue);
    const [isInvalid, setInvalid] = useState(initialInvalid);
    const [focusedIndex, setFocusedIndex] = useState(-1);

    // const prevValue = usePrevious(value);

    // Need to enforce existence of `ref` for `useClickOutside` hook to work.
    if (!ref || !('current' in ref)) {
      ref = React.createRef<HTMLDivElement>();
    }

    const inputRef = useRef(null);
    const panelRef = useRef(null);

    /**
     * Check that the color value is valid since there are a number of ways to set
     * it within this component (color input, text input, & auto-suggest list options).
     */
    const checkValidity = useCallback(() => {
      if (!isInvalid && !Color.isColor(value as string)) {
        inputRef.current.setCustomValidity(`${value} is not a valid CSS color!`);
        setInvalid(true);
      } else if (isInvalid && Color.isColor(value as string)) {
        inputRef.current.setCustomValidity('');
        setInvalid(false);
      }
    }, [value, isInvalid, setInvalid]);

    /**
     * We need to format the value in order to reflect whether it comes
     * from a preconfigured list of colors.
     */
    const updateViewModel = useCallback(
      (_value: string) => {
        setValue(_value);

        setColor(coerceToHexColor(_value).toLowerCase());

        const currentModel = Object.values(options).find((option) => option.value === _value);
        const formattedValue = currentModel
          ? `${currentModel.name} (${currentModel.value})`
          : _value;
        setModelValue(formattedValue);
      },
      [options],
    );

    useEffect(() => {
      checkValidity();
    }, [checkValidity]);

    useEffect(() => {
      const { current: currentPanelRef } = panelRef;

      if (isOpen && !currentPanelRef.classList.contains('is-active')) {
        currentPanelRef.classList.add('is-active', 'colorpicker-panel-enter');

        onAnimationEnd(currentPanelRef, () => {
          currentPanelRef.classList.remove('colorpicker-panel-enter');
        });
      } else if (!isOpen && currentPanelRef.classList.contains('is-active')) {
        currentPanelRef.classList.add('colorpicker-panel-leave');

        onAnimationEnd(currentPanelRef, () => {
          currentPanelRef.classList.remove('colorpicker-panel-leave');
          currentPanelRef.classList.remove('is-active');
        });
      }
    }, [panelRef, isOpen, ref]);

    useClickOutside(ref, handleClose);

    function handleChange(event: any) {
      updateViewModel(event.target.value);

      if (props.onChange) props.onChange(event);
    }

    function handleFocus(event: any) {
      if (!isOpen) setOpen(true);

      if (props.onFocus) props.onFocus(event);
    }

    function handleBlur(event: any) {
      event.persist();

      if (props.onBlur) props.onBlur(event);
    }

    function handleClose() {
      setFocusedIndex(-1);

      if (panelRef.current.classList.contains('is-active')) {
        setOpen(false);

        panelRef.current.classList.remove('is-active');

        checkValidity();
      }
    }

    function handleSelect(event: any, val: any) {
      updateViewModel(val);

      handleClose();
    }

    function handleKeyDown(event: any) {
      event.stopPropagation();

      switch (event.keyCode) {
        case ESCAPE:
          handleClose();
          break;
        case DOWN:
          if (!isOpen) {
            event.preventDefault();
            setOpen(true);
          }
          setFocusedIndex(focusedIndex === options.length - 1 ? 0 : focusedIndex + 1);
          break;
        case UP:
          setFocusedIndex(focusedIndex === 0 ? options.length - 1 : focusedIndex - 1);
          break;
        case TAB:
          handleClose();
          break;
        case ENTER:
          const targetValue = event.target.value;
          const colorValue =
            focusedIndex > -1 ? (options[focusedIndex] as OptionProps).value : targetValue;
          updateViewModel(colorValue);
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

      if (props.onKeyUp) props.onKeyUp(event);
    }

    const htmlProps = containerProps(props);
    const formProps = validFormProps(props, {
      exclude: ['onChange', 'onFocus', 'onBlur', 'onKeyUp'],
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
              value={Color.isColor(value as string) ? color : 'transparent'}
              className="colorpicker-target"
            />
            <Styled.ColorInput
              type="color"
              className="colorpicker-input"
              value={color}
              onChange={handleChange}
            />
          </Styled.ColorControl>
          <Styled.Control
            ref={inputRef}
            {...formProps}
            value={modelValue}
            data-value={value}
            isInvalid={isInvalid}
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
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
              (options as OptionProps[]).map(({ name, value: colorValue }, i: number) => (
                <Styled.Option
                  key={name}
                  className={classNames(
                    'colorpicker-option',
                    focusedIndex === i && 'is-focused',
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
