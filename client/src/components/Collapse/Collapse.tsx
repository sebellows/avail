/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { transitions } from '../../core/style'

type Dimension = 'width' | 'height'

interface CollapseProps extends Avail.ComponentProps {
  duration?: number
  ease?: [number, number, number, number]
  dimension?: Dimension
  open?: boolean
}

const Collapse = forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      duration = transitions.duration.seconds('fastOutSlowIn'),
      ease = transitions.timing.fastOutSlowIn,
      children,
      className,
      open = false,
    },
    ref,
  ) => {
    React.useEffect(() => {
      console.log('Collapse=>open', open)
    }, [open])
    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    return (
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            ref={ref}
            className={className}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration, ease }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  },
)

export { Collapse }
