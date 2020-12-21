import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

import { useEnsuredRef } from '../../hooks'
import { classNames } from '../../core/utils'
import { transitions } from '../../core/style'

const StyledPanel = styled(motion.section)`
  visibility: hidden;

  &.active {
    visibility: visible;
  }
`

export interface TabPanelProps extends Avail.ComponentProps {
  active?: boolean
  duration?: number
  ease?: [number, number, number, number]
  id?: string
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  (
    {
      active,
      duration = transitions.duration.seconds('fastOutSlowIn'),
      ease = transitions.timing.fastOutSlowIn,
      id,
      ...props
    },
    ref,
  ) => {
    const componentRef = useEnsuredRef(ref)

    return (
      <StyledPanel
        {...props}
        ref={componentRef}
        id={`${id}-tabpanel`}
        role="tabpanel"
        aria-hidden={!active}
        aria-labelledby={id}
        className={classNames('tab-panel', active && 'active')}
        // tabIndex={active ? 0 : -1}
        initial="inactive"
        animate="active"
        exit="inactive"
        variants={{
          active: { opacity: 1 },
          inactive: { opacity: 1 },
        }}
        transition={{ duration, ease }}
      />
    )
  },
)

TabPanel.displayName = 'TabPanel'

export { TabPanel }
