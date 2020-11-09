/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ComponentProps } from '../../core/contracts'
import { classNames, hyphenate } from '../../core/utils'
import { useFirstMountState, useLifecycles } from '../../hooks'
import { useUpdateLayoutEffect } from '../../hooks/useUpdate'

type Dimension = 'width' | 'height'

const MARGINS: { [d in Dimension]: string[] } = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
}

function getDefaultDimensionValue(dimension: Dimension, elem: HTMLElement): number {
  const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`
  const value = elem[offset]
  const margins = MARGINS[dimension]

  const getPropertyValue = (property: string) =>
    parseInt(getComputedStyle(elem).getPropertyValue(hyphenate(property)), 10)

  return value + getPropertyValue(margins[0]) + getPropertyValue(margins[1])
}

interface CollapseProps extends ComponentProps {
  duration?: number
  dimension?: Dimension
  open?: boolean
  transitionClassNames?: {
    collapse: string
    content: string
  }
  onTransition?: Function
  onTransitionEnd?: Function
}

const defaultCollapseClassNames = {
  exited: 'collapse',
  exiting: 'collapsing',
  entering: 'collapsing',
  entered: 'collapse show',
}

const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  ({ duration = 0.8, children, open = false, transitionClassNames = {} }, ref) => {
    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    return (
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            ref={ref}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  },
)

export { Collapse }
