/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { TabPanel } from './TabPanel'
import { toPercent, transitions } from '../../core/style'
import { usePrevious } from '../../hooks'

const Styled = {
  Pager: styled.div`
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 100%;
  `,
  Container: styled(motion.div)`
    flex-direction: row;
    direction: ltr;
    will-change: transform;
    min-height: 0;
    flex: 1;
    display: flex;
  `,
  Page: styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-self: stretch;
    justify-content: flex-start;
    flex-shrink: 0;
    height: 100%;
    overflow: hidden;
    outline: none;
  `,
}

export interface TabsPagerProps extends Avail.ComponentProps {
  activeTab?: string
  activeTabIndex?: number
  transition?: {
    tension?: number
    friction?: number
    mass?: number
  }
}

const defaultTransition = {
  tension: 190,
  friction: 70,
  mass: 0.4,
}

const TabsPager: Avail.RefForwardingComponent<'div', TabsPagerProps> = React.forwardRef(
  ({ as: Component = 'div', activeTabIndex, children }: TabsPagerProps, ref) => {
    const tabCount = React.Children.count(children)

    const calcPosition = React.useCallback(
      () => (tabCount && activeTabIndex > 0 ? `-${(activeTabIndex / tabCount) * 100}%` : '0'),
      [activeTabIndex, tabCount],
    )

    return (
      <Styled.Pager as={Component} ref={ref}>
        <Styled.Container
          initial={{ x: calcPosition() }}
          animate={{
            x: calcPosition(),
          }}
          style={{ width: `${100 * tabCount}%` }}
          transition={{
            duration: transitions.duration.seconds('fastOutSlowIn'),
            ease: transitions.timing.fastOutSlowIn,
          }}
        >
          {React.Children.map(children, (child: any, i: number) => {
            const { title, disabled, tabClassName, id: tabID, ...childProps } = child.props

            return (
              <TabPanel
                key={tabID}
                {...childProps}
                active={activeTabIndex === i}
                id={tabID}
                style={{ width: toPercent(1, tabCount) }}
              />
            )
          })}
        </Styled.Container>
      </Styled.Pager>
    )
  },
)

TabsPager.displayName = 'TabsPager'
export { TabsPager }
