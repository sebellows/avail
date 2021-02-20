// import maxSize from 'popper-max-size-modifier'
import React, { cloneElement, forwardRef, useEffect, useMemo, useState } from 'react'
import { Placement } from '@popperjs/core'
import styled, { css } from 'styled-components'
import { Modifier, usePopper } from 'react-popper'
import { useForwardedRef } from '../../hooks'
import { ThemeColorSchemeKey, ThemeColorVariantKey } from '../../theme'
import { Layer, Portal, useBoundaryElement, usePortal } from '../../providers'
import { maxWidthStyle } from '../../styles/size'
import { BorderRadiusProps, ShadowProps, WidthProps, WidthStyleProps } from '../../styles'
import { Card } from '../Card'
import { PopoverArrow } from './PopoverArrow'
import { maxSize } from './maxSizeModifier'

interface PopoverProps extends BorderRadiusProps, ShadowProps, WidthProps {
  allowedAutoPlacements?: Placement[]
  arrow?: boolean
  boundaryElement?: HTMLElement | null
  children?: React.ReactElement
  constrainSize?: boolean
  content?: React.ReactNode
  disabled?: boolean
  fallbackPlacements?: Placement[]
  open?: boolean
  padding?: number | number[]
  placement?: Placement
  portal?: boolean
  preventOverflow?: boolean
  referenceElement?: HTMLElement | null
  scheme?: ThemeColorSchemeKey
  variant?: ThemeColorVariantKey
}

const Root = styled(Layer)<{ $preventOverflow?: boolean }>(
  ({ $preventOverflow }) => css`
    pointer-events: none;
    display: flex;
    flex-direction: column;

    & > * {
      min-height: 0;
    }

    /* Hide the popover when the reference element is out of bounds */
    ${$preventOverflow &&
    css`
      &[data-popper-reference-hidden='true'] {
        display: none;
      }
    `}
  `,
)

const PopoverCard = styled(Card)<
  WidthStyleProps & {
    $constrainSize?: boolean
    $preventOverflow?: boolean
  }
>(
  ({ $constrainSize }) => css`
    flex: 1;
    max-height: ${$constrainSize && '100%'};
    pointer-events: all;

    && {
      display: flex;
    }

    flex-direction: column;

    & > * {
      min-height: 0;
    }

    ${maxWidthStyle}
  `,
)

const applyMaxSize: Modifier<any, any> = {
  name: 'applyMaxSize',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['maxSize'],
  fn(opts) {
    const { state } = opts
    const { width, height } = state.modifiersData.maxSize

    state.styles.popper = {
      ...state.styles.popper,
      maxWidth: `${width}px`,
      maxHeight: `${height}px`,
    }
  },
}

export const Popover = forwardRef<
  HTMLDivElement,
  PopoverProps & Omit<React.HTMLProps<HTMLDivElement>, 'as' | 'children' | 'content' | 'width'>
>(
  (
    {
      allowedAutoPlacements,
      arrow = true,
      boundaryElement: boundaryElementProp,
      children: child,
      content,
      constrainSize,
      disabled,
      fallbackPlacements,
      open,
      padding,
      placement: placementProp,
      portal: portalProp = false,
      preventOverflow,
      radius = 'md',
      referenceElement: referenceElementProp,
      shadow = 3,
      scheme,
      style = {},
      variant,
      width = 0,
      ...restProps
    },
    ref,
  ) => {
    const boundaryElementContext = useBoundaryElement()
    boundaryElementProp = boundaryElementProp ?? boundaryElementContext
    const forwardedRef = useForwardedRef(ref as any)
    const placement = typeof placementProp === 'string' ? placementProp : 'bottom'
    const portal = usePortal()
    const boundaryElement = boundaryElementProp || portal.boundaryElement
    const [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
    const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null)
    const popperReferenceElement = referenceElementProp || referenceElement

    const customMaxSize = useMemo(
      () => ({
        ...maxSize,
        options: { boundary: boundaryElement || undefined, padding: 8 },
      }),
      [boundaryElement],
    ) as Modifier<`${'preventOverflow'}`>

    const modifiers = [
      constrainSize && customMaxSize,
      constrainSize && applyMaxSize,
      arrow && {
        name: 'arrow',
        options: {
          element: arrowElement,
          padding: 4,
        },
      },
      preventOverflow && {
        name: 'preventOverflow',
        options: {
          altAxis: true,
          boundary: boundaryElement || undefined,
          padding: 8,
        },
      },
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
      {
        name: 'flip',
        options: {
          allowedAutoPlacements,
          fallbackPlacements,
        },
      },
    ].filter(Boolean) as Modifier<any, any>[]

    const popper = usePopper(popperReferenceElement, popperElement, {
      placement,
      modifiers,
    })

    const { attributes, forceUpdate, styles } = popper

    useEffect(() => {
      if (forceUpdate) forceUpdate()
    }, [content, forceUpdate, open, popperReferenceElement])

    if (disabled) {
      return child || <></>
    }

    const setRef = (el: HTMLElement | null) => {
      const childRef = (child as any).ref

      setReferenceElement(el)

      if (typeof childRef === 'function') {
        childRef(el)
      } else if (childRef) {
        childRef.current = el
      }
    }

    const setRootRef = (el: HTMLDivElement | null) => {
      setPopperElement(el)
      forwardedRef.current = el
    }

    const node = (
      <Root
        data-ui="Popover"
        {...restProps}
        $preventOverflow={preventOverflow}
        ref={setRootRef}
        style={{ ...style, ...styles.popper }}
        {...attributes.popper}
      >
        <PopoverCard
          $constrainSize={constrainSize}
          data-ui="PopoverCard"
          padding={padding}
          radius={radius}
          scheme={scheme}
          shadow={shadow}
          variant={variant}
          width={width as any}
        >
          {arrow && <PopoverArrow ref={setArrowElement} variant="default" style={styles.arrow} />}
          {content}
        </PopoverCard>
      </Root>
    )

    return (
      <>
        {child && !referenceElementProp ? cloneElement(child, { ref: setRef }) : child || <></>}
        {open && (
          <>
            {portalProp && <Portal>{node}</Portal>}

            {!portalProp && node}
          </>
        )}
      </>
    )
  },
)

Popover.displayName = 'Popover'
