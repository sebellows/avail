import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { ComponentProps } from '../../core/contracts'
import { TabPanel } from './TabPanel'

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

export interface TabsPagerProps extends ComponentProps {
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

const TabsPager = ({ activeTabIndex, children, transition = {} }: TabsPagerProps) => {
  const slidingTransition = { ...defaultTransition, ...transition }

  return (
    <Styled.Pager>
      <Styled.Container
        transition={slidingTransition}
        initial={false}
        animate={{ x: `${activeTabIndex * -100}%` }}
      >
        {React.Children.map(children, (child: any, i: number) => {
          const {
            title,
            disabled,
            tabClassName,
            id: tabID,
            children: panelChildren,
            ...childProps
          } = child.props

          return (
            <TabPanel key={tabID} {...childProps} active={activeTabIndex === i} id={tabID}>
              {panelChildren}
            </TabPanel>
          )
        })}
      </Styled.Container>
    </Styled.Pager>
  )
}

TabsPager.displayName = 'TabsPager'
export { TabsPager }
